"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Emblema } from "@/components/logo";
import { formatoPrecio, nombreVariante, type EstadoPedido } from "@/lib/datos";
import { BASE_LOCAL, BASE_ONLINE, useDemo } from "@/lib/demo-store";
import { BotonReiniciar } from "./encabezado-sistema";
import { NuevoProducto } from "./nuevo-producto";

type Tab = "resumen" | "inventario" | "pedidos" | "nuevo";
const TABS: [Tab, string][] = [
  ["resumen", "Resumen"],
  ["inventario", "Inventario"],
  ["pedidos", "Pedidos online"],
  ["nuevo", "Agregar producto"],
];

const chip = "inline-block min-w-7 rounded-full px-2.5 py-1 text-center text-[13px] font-semibold";
function claseStock(n: number, minimo: number) {
  if (n === 0) return `${chip} bg-error-fondo text-error`;
  if (n <= minimo) return `${chip} bg-alerta-fondo text-alerta`;
  return `${chip} bg-ok-fondo text-ok`;
}

const FLUJO: Record<EstadoPedido, { txt: string; accion: string; clase: string }> = {
  pagado: { txt: "Pagado", accion: "Empezar a preparar", clase: "bg-info-fondo text-info" },
  preparando: { txt: "Preparando", accion: "Marcar listo / enviado", clase: "bg-alerta-fondo text-alerta" },
  enviado: { txt: "Enviado o listo para retiro", accion: "Marcar entregado", clase: "bg-marca-suave text-marca" },
  entregado: { txt: "Entregado", accion: "", clase: "bg-ok-fondo text-ok" },
};

export function Admin() {
  const [tab, setTab] = useState<Tab>("resumen");
  const { cerrarSesion } = useDemo();
  const router = useRouter();

  return (
    <div className="min-h-dvh bg-panel">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-start gap-6 p-4 sm:p-6">
        <nav
          aria-label="Menú de administración"
          className="flex max-w-full flex-[1_1_210px] flex-col gap-1.5 rounded-2xl border border-borde bg-white p-4 lg:sticky lg:top-6"
        >
          <div className="mb-0.5 ml-2 flex items-center gap-2">
            <Emblema className="size-10" />
            <span className="font-serif text-[22px] font-semibold leading-tight">Nube Aromática</span>
          </div>
          <p className="mb-3 ml-2 text-[13px] text-gris">Sistema interno · Administrador</p>
          {TABS.map(([t, label]) => (
            <button
              key={t}
              type="button"
              aria-current={tab === t ? "page" : undefined}
              onClick={() => setTab(t)}
              className={`min-h-11 rounded-[10px] px-3 text-left text-[15px] transition-colors ${
                tab === t ? "bg-marca-suave font-semibold text-marca" : "text-tinta hover:bg-panel"
              }`}
            >
              {label}
            </button>
          ))}
          <Link href="/sistema/caja" className="flex min-h-11 items-center rounded-[10px] px-3 text-[15px] text-tinta hover:bg-panel">
            Abrir caja
          </Link>
          <Link
            href="/"
            target="_blank"
            className="flex min-h-11 items-center rounded-[10px] px-3 text-[15px] text-tinta hover:bg-panel"
          >
            Ver tienda pública ↗
          </Link>
          <BotonReiniciar className="justify-start px-3" />
          <button
            type="button"
            onClick={() => {
              cerrarSesion();
              router.push("/sistema");
            }}
            className="mt-1.5 flex min-h-11 items-center rounded-[10px] border-t border-linea px-3 text-left text-[15px] text-error"
          >
            Cerrar sesión
          </button>
        </nav>

        <main className="flex min-w-0 flex-[999_1_640px] flex-col gap-5">
          {tab === "resumen" && <Resumen irA={setTab} />}
          {tab === "inventario" && <Inventario irA={setTab} />}
          {tab === "pedidos" && <Pedidos />}
          {tab === "nuevo" && <NuevoProducto alPublicar={() => setTab("inventario")} />}
        </main>
      </div>
    </div>
  );
}

function Resumen({ irA }: { irA: (t: Tab) => void }) {
  const { estado, productos, stockDe, reponer, avisar } = useDemo();

  const ventasLocal = BASE_LOCAL.monto + estado.ventasCaja.reduce((s, v) => s + v.total, 0);
  const cantLocal = BASE_LOCAL.ventas + estado.ventasCaja.length;
  const nuevosPedidos = estado.pedidos.filter((p) => p.num >= 1046);
  const ventasOnline = BASE_ONLINE.monto + nuevosPedidos.reduce((s, p) => s + p.total, 0);
  const cantOnline = BASE_ONLINE.pedidos + nuevosPedidos.length;
  const porPreparar = estado.pedidos.filter((p) => p.estado === "pagado" || p.estado === "preparando").length;

  const bajos = productos.flatMap((p) =>
    p.variantes.filter((v) => stockDe(v.id) <= v.minimo).map((v) => ({ producto: p, variante: v })),
  );

  // Ventas de la semana (ejemplo). Hoy suma lo vendido en la demo.
  const extraHoy = Math.min(60, Math.round((ventasLocal - BASE_LOCAL.monto) / 20000));
  const extraOnlineHoy = Math.min(40, Math.round((ventasOnline - BASE_ONLINE.monto) / 20000));
  const semana: [string, number, number][] = [
    ["L", 70, 30],
    ["M", 92 + extraHoy, 40 + extraOnlineHoy],
    ["M", 64, 22],
    ["J", 84, 46],
    ["V", 118, 52],
    ["S", 130, 34],
    ["D", 40, 18],
  ];

  const tarjetas = [
    { t: "Ventas en el local", v: formatoPrecio(ventasLocal), s: `${cantLocal} ventas` },
    { t: "Ventas online", v: formatoPrecio(ventasOnline), s: `${cantOnline} pedidos` },
    { t: "Pedidos por preparar", v: String(porPreparar), s: "Revisar en Pedidos online", ir: "pedidos" as Tab },
    { t: "Stock bajo", v: String(bajos.length), s: "productos por reponer", alerta: true },
  ];

  return (
    <div className="animate-subir flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="mb-1 text-[28px] font-semibold">Resumen de hoy</h1>
          <p className="text-gris">Martes · cifras de ejemplo + lo que vendas en la demo</p>
        </div>
        <button
          type="button"
          onClick={() => irA("nuevo")}
          className="h-11 rounded-[10px] bg-marca px-4 text-sm font-semibold text-white hover:bg-marca-oscuro"
        >
          + Agregar producto
        </button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5">
        {tarjetas.map((k) => {
          const contenido = (
            <>
              <p className="mb-1.5 text-sm text-gris">{k.t}</p>
              <p className={`text-[30px] font-semibold ${k.alerta ? "text-alerta" : ""}`}>{k.v}</p>
              <p className="mt-1.5 text-[13px] text-gris">{k.s}</p>
            </>
          );
          return k.ir ? (
            <button
              key={k.t}
              type="button"
              onClick={() => irA(k.ir!)}
              className="rounded-2xl border border-borde bg-white p-[18px] text-left transition-colors hover:border-marca"
            >
              {contenido}
            </button>
          ) : (
            <div key={k.t} className="rounded-2xl border border-borde bg-white p-[18px]">
              {contenido}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-5">
        <section className="flex-[1_1_340px] rounded-2xl border border-borde bg-white p-5">
          <h2 className="mb-4 text-lg font-semibold">Ventas de la semana</h2>
          <div
            role="img"
            aria-label="Ventas de lunes a domingo, separadas entre local y online. Datos de ejemplo."
            className="flex h-[200px] items-end gap-3.5"
          >
            {semana.map(([dia, local, online], i) => (
              <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                <div className="flex w-full max-w-[34px] flex-col gap-0.5">
                  <div className="rounded-t bg-flor transition-all duration-500" style={{ height: online }} />
                  <div className="rounded-b bg-marca transition-all duration-500" style={{ height: local }} />
                </div>
                <span className={`text-xs ${i === 1 ? "font-semibold text-tinta" : "text-gris"}`}>{dia}</span>
              </div>
            ))}
          </div>
          <div className="mt-3.5 flex gap-[18px] text-[13px] text-gris">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-3 rounded-[3px] bg-marca" />
              Local
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-3 rounded-[3px] bg-flor" />
              Online
            </span>
          </div>
        </section>

        <section className="flex flex-[1_1_340px] flex-col gap-1 rounded-2xl border border-borde bg-white p-5">
          <h2 className="mb-2 text-lg font-semibold">Por reponer</h2>
          {bajos.map(({ producto, variante }) => {
            const n = stockDe(variante.id);
            return (
              <div key={variante.id} className="flex items-center justify-between gap-3 border-t border-linea py-2.5">
                <div className="flex min-w-0 items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={producto.foto} alt="" className="h-[52px] w-11 shrink-0 rounded-lg bg-crema object-cover" />
                  <div className="min-w-0">
                    <p className="font-semibold">
                      {producto.marca} {producto.nombre}
                    </p>
                    <p className="text-[13px] text-gris">
                      {nombreVariante(variante)} · mínimo {variante.minimo}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2.5">
                  <span className={claseStock(n, variante.minimo)}>{n === 0 ? "Agotado" : `${n} en stock`}</span>
                  <button
                    type="button"
                    aria-label={`Ingresar 5 unidades de ${producto.nombre} ${nombreVariante(variante)}`}
                    onClick={() => {
                      reponer(variante.id, 5);
                      avisar(`${producto.marca} ${producto.nombre} ${nombreVariante(variante)}: +5 unidades ingresadas`);
                    }}
                    className="h-11 rounded-[10px] border border-marca bg-white px-3.5 text-sm font-medium text-marca"
                  >
                    +5
                  </button>
                </div>
              </div>
            );
          })}
          {bajos.length === 0 && <p className="text-ok">Todo el stock está sobre el mínimo.</p>}
        </section>
      </div>
    </div>
  );
}

function Inventario({ irA }: { irA: (t: Tab) => void }) {
  const { productos, stockDe, reponer, avisar } = useDemo();
  const [busqueda, setBusqueda] = useState("");

  const filas = useMemo(() => {
    const q = busqueda.toLowerCase().trim();
    return productos.flatMap((p) =>
      p.variantes
        .filter((v) => q === "" || `${p.nombre} ${p.marca}`.toLowerCase().includes(q) || v.codigo.includes(q))
        .map((v) => ({ producto: p, variante: v })),
    );
  }, [productos, busqueda]);

  return (
    <div className="animate-subir flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="mb-1 text-[28px] font-semibold">Inventario</h1>
          <p className="text-gris">El mismo stock para la caja y la tienda online · {productos.length} productos</p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <input
            type="search"
            aria-label="Buscar en inventario"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre, marca o código"
            className="campo h-11 w-[280px] max-w-full text-sm"
          />
          <button
            type="button"
            onClick={() => irA("nuevo")}
            className="h-11 rounded-[10px] bg-marca px-4 text-sm font-semibold text-white hover:bg-marca-oscuro"
          >
            + Agregar producto
          </button>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-borde bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-sm">
            <caption className="sr-only">Inventario</caption>
            <thead className="bg-tabla text-left text-[13px] text-gris">
              <tr>
                <th className="px-4 py-3 font-semibold">Producto</th>
                <th className="px-2 py-3 font-semibold">Tamaño</th>
                <th className="px-2 py-3 font-semibold">Código de barras</th>
                <th className="px-2 py-3 font-semibold">Canales</th>
                <th className="px-2 py-3 text-right font-semibold">Precio</th>
                <th className="px-2 py-3 text-right font-semibold">Stock</th>
                <th className="px-4 py-3">
                  <span className="sr-only">Ingresar mercadería</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filas.map(({ producto: p, variante: v }) => {
                const n = stockDe(v.id);
                const canales = p.online && p.caja ? "Online y caja" : p.online ? "Solo online" : "Solo caja";
                return (
                  <tr key={v.id} className={`border-t border-linea ${p.nuevo ? "bg-marca-tenue" : ""}`}>
                    <td className="px-4 py-2.5">
                      <div className="flex min-w-0 items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.foto} alt="" className="h-12 w-10 shrink-0 rounded-lg bg-crema object-cover" />
                        <div className="min-w-0">
                          <p className="font-semibold">{p.nombre}</p>
                          <p className="text-[13px] text-gris">{p.marca}</p>
                        </div>
                        {p.nuevo && (
                          <span className="rounded-full bg-marca-suave px-2 py-0.5 text-xs font-semibold text-marca">Nuevo</span>
                        )}
                      </div>
                    </td>
                    <td className="px-2 py-2.5">{nombreVariante(v)}</td>
                    <td className="px-2 py-2.5 font-mono text-gris">{v.codigo || "—"}</td>
                    <td className="px-2 py-2.5 text-gris">{canales}</td>
                    <td className="px-2 py-2.5 text-right">{formatoPrecio(v.precio)}</td>
                    <td className="px-2 py-2.5 text-right">
                      <span className={claseStock(n, v.minimo)}>{n}</span>
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <button
                        type="button"
                        aria-label={`Ingresar 1 unidad de ${p.nombre} ${nombreVariante(v)}`}
                        onClick={() => {
                          reponer(v.id, 1);
                          avisar(`${p.nombre} ${nombreVariante(v)}: +1 unidad ingresada`);
                        }}
                        className="h-9 rounded-lg border border-borde-fuerte px-2.5 text-[13px] text-tinta hover:border-marca"
                      >
                        +1
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filas.length === 0 && <p className="px-4 py-7 text-center text-gris">No hay productos con esa búsqueda.</p>}
      </div>
    </div>
  );
}

function Pedidos() {
  const { estado, avanzarPedido, avisar } = useDemo();
  return (
    <div className="animate-subir flex flex-col gap-4">
      <div>
        <h1 className="mb-1 text-[28px] font-semibold">Pedidos online</h1>
        <p className="text-gris">Avanza cada pedido y el cliente recibe el aviso</p>
      </div>
      {estado.pedidos.map((o) => {
        const f = FLUJO[o.estado];
        const nuevo = o.num >= 1046;
        return (
          <article
            key={o.num}
            className={`flex flex-wrap items-center justify-between gap-3.5 rounded-2xl border bg-white p-[18px] ${
              nuevo ? "border-marca" : "border-borde"
            }`}
          >
            <div className="flex-[1_1_260px]">
              <p className="mb-1 font-semibold">
                Pedido N° {o.num} · {o.cliente}
                {nuevo && (
                  <span className="ml-2 rounded-full bg-marca-suave px-2 py-0.5 text-xs font-semibold text-marca">Nuevo</span>
                )}
              </p>
              <p className="text-sm text-gris">
                {o.resumen} · {o.entrega === "retiro" ? "Retiro en tienda" : "Despacho"}
              </p>
            </div>
            <span className="min-w-[90px] font-semibold">{formatoPrecio(o.total)}</span>
            <span className={`${chip} ${f.clase}`}>{f.txt}</span>
            {f.accion && (
              <button
                type="button"
                onClick={() => {
                  avanzarPedido(o.num);
                  avisar(`Pedido N° ${o.num}: aviso enviado al cliente`);
                }}
                className="h-11 rounded-[10px] bg-marca px-4 text-sm font-medium text-white hover:bg-marca-oscuro"
              >
                {f.accion}
              </button>
            )}
          </article>
        );
      })}
    </div>
  );
}
