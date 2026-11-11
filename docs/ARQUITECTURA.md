# Proyecto Perfumería — tienda online + local físico

## Stack

| Pieza | Elección |
|---|---|
| Lenguaje | **TypeScript** |
| Framework | **Next.js** (una sola app para todo) |
| Base de datos | **PostgreSQL en Supabase** (incluye login, fotos y panel) |
| Hosting | **Vercel** (la app) + **Supabase** (la base de datos) |
| Pagos online | **Webpay Plus (Transbank)** o **Mercado Pago** |

## Cómo se organiza

Son **dos partes separadas** que comparten **la misma base de datos y el mismo stock**:

1. **Tienda online, pública** (ej. `tu-dominio.cl`): catálogo, carrito, pago y "mis pedidos". No tiene ningún enlace al sistema interno.
2. **Sistema interno, solo personal** (ej. `sistema.tu-dominio.cl`): se entra con correo y contraseña, y cada persona ve según su rol.
   - **Vendedor**: solo la **caja**. Se escanea el código de barras y se cobra. Las pistolas USB funcionan como un teclado, así que basta con un campo de texto que tenga el foco.
   - **Admin (dueño)**: caja + **administración** (productos, stock, ingreso de mercadería, pedidos online y reportes).

Esconder el enlace no da seguridad por sí solo. La protección real son tres capas:
- el login del personal;
- el rol guardado en la tabla `perfiles`;
- las reglas RLS de `schema.sql`. Aunque alguien encuentre la dirección del sistema, sin una cuenta de vendedor o admin la base de datos no le entrega nada.

Para partir simple puede ser un solo proyecto Next.js, con las rutas del sistema (`/panel/...`) protegidas por login y publicadas en el subdominio. Si el sistema crece, se separa en dos proyectos que usan el mismo Supabase.

Si alguien compra el último frasco online, la caja ya no lo puede vender, y al revés.

## Base de datos (`schema.sql`)

- **Catálogo:** `marcas`, `categorias`, `productos` y `variantes`. Cada tamaño (30, 50 o 100 ml) es una variante con su propio precio, stock y código de barras.
- **Personas:** `perfiles` (usuarios con login y su rol: cliente, vendedor o admin), `clientes` (con o sin cuenta) y `direcciones`.
- **Ventas:** `ventas` (con canal `tienda` u `online` y estado del pedido), `detalle_venta` y `movimientos_stock` (historial de cada entrada y salida).
- **Funciones listas:**
  - `confirmar_pago(venta, medio)`: descuenta el stock de forma segura. Si falta stock no se descuenta nada.
  - `anular_venta(venta, motivo)`: devuelve el stock.
  - `mover_stock(variante, cantidad, 'compra'|'ajuste', nota)`: ingreso de mercadería o correcciones.
  - Vista `stock_bajo`: para avisar qué hay que reponer.
- **Seguridad (RLS):** el público solo ve el catálogo, cada cliente ve solo sus pedidos y el personal ve todo. Un usuario no puede cambiarse su propio rol.

### Flujo de una venta
1. **Caja:** se crea la venta (`canal = 'tienda'`) con su detalle y se llama a `confirmar_pago` al cobrar.
2. **Online:** el servidor de Next.js crea la venta (`canal = 'online'`) en estado `pendiente_pago` y manda al cliente a Webpay o Mercado Pago. Cuando el pago se confirma, el servidor llama a `confirmar_pago`. Después el estado avanza: `preparando`, luego `enviada` o `lista_para_retiro`, y al final `entregada`.

## Pasos para partir

1. Crea un proyecto en https://supabase.com.
2. En **SQL Editor**, pega todo `schema.sql` y presiona **Run**.
3. Regístrate en tu app (o en Authentication > Add user) y hazte admin:
   ```sql
   update perfiles set rol = 'admin' where id = (select id from auth.users where email = 'TU_CORREO');
   ```
4. Instala **Node.js LTS** y en esta carpeta ejecuta:
   ```
   npx create-next-app@latest web --typescript --tailwind --app
   cd web
   npm install @supabase/supabase-js @supabase/ssr
   ```
5. Crea `web/.env.local` con los datos de Supabase (Project Settings > API):
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   ```
   ⚠️ La `SERVICE_ROLE_KEY` solo se usa en el servidor. Nunca la pongas en código del navegador ni la subas a GitHub.

## Orden sugerido para construir

1. /admin: cargar marcas, productos y variantes.
2. /caja: escanear, cobrar y ver ventas del día. Aquí la app ya sirve en el local.
3. /tienda: catálogo y carrito.
4. Integrar pagos online y seguimiento de pedidos.
