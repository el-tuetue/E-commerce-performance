-- =====================================================================
-- Perfumería: tienda online + caja en local físico (stock compartido)
-- Base de datos: PostgreSQL en Supabase
-- Cómo usarlo: Supabase > SQL Editor > pegar todo este archivo > Run
-- =====================================================================

-- ---------- Catálogo ----------

create table marcas (
  id      bigint generated always as identity primary key,
  nombre  text not null unique
);

create table categorias (
  id      bigint generated always as identity primary key,
  nombre  text not null unique          -- ej: Mujer, Hombre, Unisex, Sets de regalo
);

create table productos (
  id              bigint generated always as identity primary key,
  nombre          text not null,
  marca_id        bigint not null references marcas(id),
  categoria_id    bigint references categorias(id),
  genero          text not null default 'unisex'
                  check (genero in ('mujer','hombre','unisex')),
  concentracion   text not null
                  check (concentracion in ('parfum','eau_de_parfum','eau_de_toilette','eau_de_cologne','body_mist')),
  descripcion     text,
  notas_olfativas text,                 -- ej: "vainilla, ámbar, sándalo"
  foto_url        text,
  activo          boolean not null default true,
  creado_en       timestamptz not null default now()
);

-- Cada tamaño de un perfume es una variante con su propio precio, stock y código de barras
create table variantes (
  id             bigint generated always as identity primary key,
  producto_id    bigint not null references productos(id) on delete cascade,
  sku            text not null unique,
  codigo_barras  text unique,           -- lo que lee la pistola en la caja
  ml             integer not null check (ml > 0),
  precio         integer not null check (precio >= 0),          -- en pesos chilenos, sin decimales
  precio_oferta  integer check (precio_oferta >= 0),
  stock          integer not null default 0 check (stock >= 0),
  stock_minimo   integer not null default 2,
  activo         boolean not null default true
);

-- ---------- Personas ----------

-- Una fila por cada usuario que inicia sesión (clientes online, vendedores, admin)
create table perfiles (
  id        uuid primary key references auth.users(id) on delete cascade,
  nombre    text,
  telefono  text,
  rol       text not null default 'cliente'
            check (rol in ('cliente','vendedor','admin'))
);

-- Clientes: pueden tener cuenta (compran online) o no (compran en el local)
create table clientes (
  id         bigint generated always as identity primary key,
  perfil_id  uuid unique references perfiles(id) on delete set null,
  nombre     text not null,
  rut        text unique,
  email      text,
  telefono   text,
  creado_en  timestamptz not null default now()
);

create table direcciones (
  id          bigint generated always as identity primary key,
  cliente_id  bigint not null references clientes(id) on delete cascade,
  calle       text not null,
  numero      text,
  depto       text,
  comuna      text not null,
  region      text not null,
  referencia  text
);

-- ---------- Ventas (las del local y las online van en la misma tabla) ----------

create table ventas (
  id            bigint generated always as identity primary key,
  canal         text not null check (canal in ('tienda','online')),
  cliente_id    bigint references clientes(id),        -- opcional en el local
  vendedor_id   uuid references perfiles(id),          -- quién cobró en la caja
  estado        text not null default 'pendiente_pago'
                check (estado in ('pendiente_pago','pagada','preparando','enviada','lista_para_retiro','entregada','anulada')),
  medio_pago    text check (medio_pago in ('efectivo','debito','credito','transferencia','webpay','mercadopago')),
  tipo_entrega  text check (tipo_entrega in ('despacho','retiro')),   -- solo online
  direccion_id  bigint references direcciones(id),
  subtotal      integer not null default 0,
  descuento     integer not null default 0 check (descuento >= 0),
  envio         integer not null default 0 check (envio >= 0),
  total         integer not null default 0,
  creado_en     timestamptz not null default now(),
  pagada_en     timestamptz
);

create table detalle_venta (
  id               bigint generated always as identity primary key,
  venta_id         bigint not null references ventas(id) on delete cascade,
  variante_id      bigint not null references variantes(id),
  cantidad         integer not null check (cantidad > 0),
  precio_unitario  integer not null check (precio_unitario >= 0)
);

-- Historial de cada entrada y salida de stock (ventas, compras a proveedor, ajustes)
create table movimientos_stock (
  id           bigint generated always as identity primary key,
  variante_id  bigint not null references variantes(id),
  tipo         text not null check (tipo in ('venta','compra','ajuste','devolucion')),
  cantidad     integer not null,          -- negativo = sale, positivo = entra
  venta_id     bigint references ventas(id),
  usuario_id   uuid references perfiles(id),
  nota         text,
  creado_en    timestamptz not null default now()
);

create index on productos (marca_id);
create index on variantes (producto_id);
create index on ventas (creado_en);
create index on ventas (cliente_id);
create index on detalle_venta (venta_id);
create index on movimientos_stock (variante_id);

-- ---------- Funciones de ayuda para permisos ----------

create or replace function es_staff() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from perfiles where id = auth.uid() and rol in ('vendedor','admin'));
$$;

create or replace function es_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from perfiles where id = auth.uid() and rol = 'admin');
$$;

create or replace function es_servidor() returns boolean
language sql stable as $$
  select coalesce(auth.jwt() ->> 'role', '') = 'service_role';
$$;

-- Crea el perfil automáticamente cuando alguien se registra
create or replace function crear_perfil() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into perfiles (id, nombre) values (new.id, new.raw_user_meta_data ->> 'nombre');
  return new;
end $$;

create trigger al_registrar_usuario
  after insert on auth.users
  for each row execute function crear_perfil();

-- ---------- Confirmar pago: descuenta stock de forma segura ----------
-- La caja la llama al cobrar; la tienda online la llama cuando Webpay/Mercado Pago confirma.
-- Si falta stock de algún producto, no se descuenta nada y la venta sigue pendiente.

create or replace function confirmar_pago(p_venta_id bigint, p_medio_pago text)
returns void
language plpgsql security definer set search_path = public as $$
declare
  d record;
  v_subtotal integer;
begin
  if not (es_staff() or es_servidor()) then
    raise exception 'Sin permiso para confirmar pagos';
  end if;

  perform 1 from ventas where id = p_venta_id and estado = 'pendiente_pago' for update;
  if not found then
    raise exception 'La venta % no existe o no está pendiente de pago', p_venta_id;
  end if;

  for d in select variante_id, cantidad from detalle_venta where venta_id = p_venta_id loop
    update variantes set stock = stock - d.cantidad
     where id = d.variante_id and stock >= d.cantidad;
    if not found then
      raise exception 'Stock insuficiente para la variante %', d.variante_id;
    end if;
    insert into movimientos_stock (variante_id, tipo, cantidad, venta_id, usuario_id)
    values (d.variante_id, 'venta', -d.cantidad, p_venta_id, auth.uid());
  end loop;

  select coalesce(sum(cantidad * precio_unitario), 0) into v_subtotal
    from detalle_venta where venta_id = p_venta_id;

  update ventas
     set estado     = 'pagada',
         medio_pago = p_medio_pago,
         pagada_en  = now(),
         subtotal   = v_subtotal,
         total      = greatest(v_subtotal - descuento + envio, 0)
   where id = p_venta_id;
end $$;

-- Anular una venta: si ya estaba pagada, devuelve el stock
create or replace function anular_venta(p_venta_id bigint, p_motivo text default null)
returns void
language plpgsql security definer set search_path = public as $$
declare
  v_estado text;
  d record;
begin
  if not es_staff() then
    raise exception 'Sin permiso para anular ventas';
  end if;

  select estado into v_estado from ventas where id = p_venta_id for update;
  if v_estado is null then raise exception 'La venta % no existe', p_venta_id; end if;
  if v_estado = 'anulada' then raise exception 'La venta % ya está anulada', p_venta_id; end if;

  if v_estado <> 'pendiente_pago' then
    for d in select variante_id, cantidad from detalle_venta where venta_id = p_venta_id loop
      update variantes set stock = stock + d.cantidad where id = d.variante_id;
      insert into movimientos_stock (variante_id, tipo, cantidad, venta_id, usuario_id, nota)
      values (d.variante_id, 'devolucion', d.cantidad, p_venta_id, auth.uid(), p_motivo);
    end loop;
  end if;

  update ventas set estado = 'anulada' where id = p_venta_id;
end $$;

-- Ingresar mercadería o corregir stock (cantidad positiva = entra, negativa = sale)
create or replace function mover_stock(p_variante_id bigint, p_cantidad integer, p_tipo text, p_nota text default null)
returns void
language plpgsql security definer set search_path = public as $$
begin
  if not es_staff() then raise exception 'Sin permiso para mover stock'; end if;
  if p_tipo not in ('compra','ajuste') then raise exception 'Tipo debe ser compra o ajuste'; end if;

  update variantes set stock = stock + p_cantidad where id = p_variante_id;
  if not found then raise exception 'La variante % no existe', p_variante_id; end if;

  insert into movimientos_stock (variante_id, tipo, cantidad, usuario_id, nota)
  values (p_variante_id, p_tipo, p_cantidad, auth.uid(), p_nota);
end $$;

revoke execute on function confirmar_pago(bigint, text) from public, anon;
revoke execute on function anular_venta(bigint, text) from public, anon;
revoke execute on function mover_stock(bigint, integer, text, text) from public, anon;
grant execute on function confirmar_pago(bigint, text) to authenticated, service_role;
grant execute on function anular_venta(bigint, text) to authenticated, service_role;
grant execute on function mover_stock(bigint, integer, text, text) to authenticated, service_role;

-- ---------- Vista: productos con poco stock (para avisos en el panel) ----------

create view stock_bajo with (security_invoker = true) as
select v.id as variante_id, p.nombre, m.nombre as marca, v.ml, v.stock, v.stock_minimo
  from variantes v
  join productos p on p.id = v.producto_id
  join marcas m on m.id = p.marca_id
 where v.activo and v.stock <= v.stock_minimo;

-- ---------- Seguridad por filas (RLS) ----------
-- Público: puede ver el catálogo activo.
-- Clientes: ven solo sus propios datos y pedidos.
-- Vendedores y admin: todo lo de ventas e inventario.
-- Los pedidos online los crea el servidor (Next.js con la service_role key), nunca el navegador.

alter table marcas            enable row level security;
alter table categorias        enable row level security;
alter table productos         enable row level security;
alter table variantes         enable row level security;
alter table perfiles          enable row level security;
alter table clientes          enable row level security;
alter table direcciones       enable row level security;
alter table ventas            enable row level security;
alter table detalle_venta     enable row level security;
alter table movimientos_stock enable row level security;

create policy "catalogo publico" on marcas     for select using (true);
create policy "catalogo publico" on categorias for select using (true);
create policy "catalogo publico" on productos  for select using (activo or es_staff());
create policy "catalogo publico" on variantes  for select using (activo or es_staff());

create policy "staff edita" on marcas     for all using (es_staff()) with check (es_staff());
create policy "staff edita" on categorias for all using (es_staff()) with check (es_staff());
create policy "staff edita" on productos  for all using (es_staff()) with check (es_staff());
create policy "staff edita" on variantes  for all using (es_staff()) with check (es_staff());

create policy "ver mi perfil" on perfiles for select using (id = auth.uid() or es_staff());
create policy "editar mi perfil" on perfiles for update using (id = auth.uid() or es_admin())
                                              with check (id = auth.uid() or es_admin());
-- Un usuario solo puede cambiar su nombre y teléfono, nunca su propio rol
revoke update on perfiles from authenticated;
grant update (nombre, telefono) on perfiles to authenticated;

create policy "mis datos" on clientes for select using (perfil_id = auth.uid() or es_staff());
create policy "staff edita" on clientes for all using (es_staff()) with check (es_staff());

create policy "mis direcciones" on direcciones for select
  using (es_staff() or exists (select 1 from clientes c where c.id = cliente_id and c.perfil_id = auth.uid()));
create policy "staff edita" on direcciones for all using (es_staff()) with check (es_staff());

create policy "mis pedidos" on ventas for select
  using (es_staff() or exists (select 1 from clientes c where c.id = cliente_id and c.perfil_id = auth.uid()));
create policy "staff edita" on ventas for all using (es_staff()) with check (es_staff());

create policy "detalle de mis pedidos" on detalle_venta for select
  using (es_staff() or exists (
    select 1 from ventas v join clientes c on c.id = v.cliente_id
     where v.id = venta_id and c.perfil_id = auth.uid()));
create policy "staff edita" on detalle_venta for all using (es_staff()) with check (es_staff());

create policy "staff ve movimientos" on movimientos_stock for select using (es_staff());
