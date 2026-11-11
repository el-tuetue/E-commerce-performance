"use client";

import { useMemo, useRef, useState } from "react";
import { CircleCheck, Minus, Plus, ScanBarcode } from "lucide-react";
import { formatoPrecio, nombreVariante } from "@/lib/datos";
import { useDemo, type Linea, type MedioCaja } from "@/lib/demo-store";

const MEDIOS: [MedioCaja, string][] = [
  ["efectivo", "Efectivo"],
  ["debito", "Débito"],
  ["credito", "Crédito"],
  ["transferencia", "Transferencia"],
];

// Las pistolas USB de código de barras funcionan como un teclado: escriben el código
// y presionan Enter. Por eso basta con un campo de texto que tenga el foco.
export function Caja() {
  const { productos, stockDe, buscarVariante, venderEnCaja } = useDemo();
  const [lineas, setLineas] = useState<Linea[]>([]);
  const [codigo, setCodigo] = useState("");
  const [aviso, setAviso] = useState("");
  const [medio, setMedio] = useState<MedioCaja>("efectivo");
  const [recibido, setRecibido] = useState<{ monto: number; total: number } | null>(null);
  const [cobrado, setCobrado] = useState<{ total: number; medio: MedioCaja; vuelto: number | null } | null>(null);
  const simulados = useRef(0);
  const campo = useRef<HTMLInputElement>(null);

  // Todo lo que se vende en el local, por variante.
  const catalogo = useMemo(
    () =>
      productos
        .filter((p) => p.caja)
        .flatMap((p) =>
          p.variantes.map((v) => ({ id: v.id, nombre: `${p.marca} ${p.nombre}`, variante: v })),
        ),
    [productos],
  );

  const enfocar = () => setTimeout(() => campo.current?.focus(), 0);

  const agregar = (id: string) => {
    const info = buscarVariante(id);
    if (!info) return;
    const nombre = `${info.producto.marca} ${info.producto.nombre}`;
    const stock = stockDe(id);
    const actual = lineas.find((l) => l.varianteId === id)?.cantidad ?? 0;
    if (actual >= stock) {
      setAviso(stock === 0 ? `${nombre} ${nombreVariante(info.variante)} está agotado.` : `No queda más stock de ${nombre} (${stock} en total).`);
      return;
    }
    setLineas((ls) =>
      actual > 0
        ? ls.map((l) => (l.varianteId === id ? { ...l, cantidad: l.cantidad + 1 } : l))
        : [...ls, { varianteId: id, cantidad: 1 }],
    );
    setAviso("");
  };

  const cambiar = (id: string, delta: number) => {
    const stock = stockDe(id);
    setLineas((ls) =>
      ls.flatMap((l) => {
        if (l.varianteId !== id) return [l];
        const c = Math.min(stock, l.cantidad + delta);
        return c > 0 ? [{ ...l, cantidad: c }] : [];
      }),
    );
    setAviso("");
  };

  const escanear = () => {
    const cod = codigo.trim();
    setCodigo("");
    if (!cod) return;
    const item = catalogo.find((c) => c.variante.codigo === cod);
    if (item) agregar(item.id);
    else setAviso(`Código ${cod} no encontrado. Revisa o búscalo en Acceso rápido.`);
  };

  const simular = () => {
    const disponibles = catalogo.filter((c) => stockDe(c.id) > 0);
    if (disponibles.length === 0) return;
    const item = disponibles[simulados.current % disponibles.length];
    simulados.current += 1;
    agregar(item.id);
    enfocar();
  };

  const total = lineas.reduce((s, l) => s + (buscarVariante(l.varianteId)?.variante.precio ?? 0) * l.cantidad, 0);
  const unidades = lineas.reduce((s, l) => s + l.cantidad, 0);

  // Montos sugeridos para efectivo: exacto y redondeos hacia arriba.
  const billetes = useMemo(() => {
    if (total === 0) return [20000, 50000, 100000];
    const opciones = new Set<number>([total]);
    for (const paso of [10000, 20000, 50000, 100000]) opciones.add(Math.ceil(total / paso) * paso);
    return [...opciones].sort((a, b) => a - b).slice(0, 3);
  }, [total]);
  // Si cambia el total, se vuelve a sugerir el monto exacto.
  const efectivo = recibido && recibido.total === total ? recibido.monto : billetes[0];
  const vuelto = efectivo - total;

  const cobrar = () => {
    if (medio === "efectivo" && total > 0 && vuelto < 0) {
      setAviso("El efectivo recibido no alcanza para el total.");
      return;
    }
    const r = venderEnCaja(lineas, medio);
    if (!r.ok) {
      setAviso(r.error);
      return;
    }
    setCobrado({ total, medio, vuelto: medio === "efectivo" ? vuelto : null });
  };

  const nuevaVenta = () => {
    setCobrado(null);
    setLineas([]);
    setAviso("");
    setRecibido(null);
    setMedio("efectivo");
    enfocar();
  };

  if (cobrado) {
    return (
      <main className="mx-auto max-w-[1240px] p-4 sm:p-6">
        <div className="animate-subir mx-auto my-12 flex max-w-[520px] flex-col items-center gap-3 rounded-[20px] border border-[#E2DDD6] bg-white px-8 py-10 text-center">
          <CircleCheck className="size-14 text-ok" aria-label="Venta registrada" />
          <h1 className="text-[28px] font-semibold">Venta registrada</h1>
          <p className="text-4xl font-semibold">{formatoPrecio(cobrado.total)}</p>
          <p className="text-gris">
            {MEDIOS.find((m) => m[0] === cobrado.medio)?.[1]} ·{" "}
            {cobrado.vuelto !== null ? `Vuelto ${formatoPrecio(cobrado.vuelto)}` : "Pago aprobado"}
          </p>
          <p className="text-sm text-gris">El stock ya se descontó y la tienda online muestra las unidades actualizadas.</p>
          <button
            type="button"
            autoFocus
            onClick={nuevaVenta}
            className="mt-2.5 h-[52px] rounded-xl bg-ciruela px-7 text-base font-semibold text-white"
          >
            Nueva venta
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1240px] p-4 sm:p-6">
      <div className="flex flex-wrap items-start gap-6">
        <section className="flex min-w-0 flex-[999_1_600px] flex-col gap-5">
          <div className="rounded-2xl border border-[#E2DDD6] bg-white p-[18px]">
            <label htmlFor="scan" className="mb-2 block font-semibold">
              Escanea el código de barras o escríbelo y presiona Enter
            </label>
            <div className="flex flex-wrap gap-2.5">
              <div className="relative flex-[1_1_260px]">
                <ScanBarcode className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ciruela" aria-hidden />
                <input
                  id="scan"
                  ref={campo}
                  autoFocus
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      escanear();
                    }
                  }}
                  placeholder="Ej: 7800001000017"
                  className="h-[52px] w-full rounded-xl border-2 border-ciruela pl-12 pr-4 text-lg tracking-[1px] focus:outline-none focus:ring-4 focus:ring-ciruela/15"
                />
              </div>
              <button
                type="button"
                onClick={simular}
                className="h-[52px] rounded-xl border border-tinta bg-white px-5 font-medium text-tinta"
              >
                Simular escaneo
              </button>
            </div>
            {aviso && (
              <p role="status" className="mt-2.5 text-sm text-error">
                {aviso}
              </p>
            )}
          </div>

          <div>
            <p className="mb-2.5 text-[15px] font-semibold">Acceso rápido</p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-2.5">
              {catalogo.map((c) => {
                const stock = stockDe(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    disabled={stock === 0}
                    onClick={() => {
                      agregar(c.id);
                      enfocar();
                    }}
                    className="min-h-16 rounded-xl border border-[#E2DDD6] bg-white px-3.5 py-3 text-left text-tinta transition-colors hover:border-ciruela disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span className="block text-sm font-semibold">{c.nombre}</span>
                    <span className="block text-[13px] text-gris">
                      {nombreVariante(c.variante)} · {formatoPrecio(c.variante.precio)}
                    </span>
                    <span className={`mt-0.5 block text-xs ${stock === 0 ? "text-error" : stock <= c.variante.minimo ? "text-alerta" : "text-gris"}`}>
                      {stock === 0 ? "Agotado" : `Stock: ${stock}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#E2DDD6] bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-[15px]">
                <caption className="sr-only">Productos de la venta</caption>
                <thead className="bg-tabla text-left text-[13px] font-semibold text-gris">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Producto</th>
                    <th className="px-2 py-3 font-semibold">Precio</th>
                    <th className="px-2 py-3 font-semibold">Cant.</th>
                    <th className="px-2 py-3 text-right font-semibold">Subtotal</th>
                    <th className="px-4 py-3">
                      <span className="sr-only">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lineas.map((l) => {
                    const info = buscarVariante(l.varianteId)!;
                    return (
                      <tr key={l.varianteId} className="animate-subir border-t border-linea">
                        <td className="px-4 py-2.5">
                          <span className="font-semibold">
                            {info.producto.marca} {info.producto.nombre}
                          </span>
                          <br />
                          <span className="text-[13px] text-gris">
                            {nombreVariante(info.variante)} · {info.variante.codigo}
                          </span>
                        </td>
                        <td className="px-2 py-2.5">{formatoPrecio(info.variante.precio)}</td>
                        <td className="px-2 py-2.5">
                          <div className="inline-flex items-center rounded-[10px] border border-borde-fuerte">
                            <button
                              type="button"
                              aria-label="Quitar uno"
                              onClick={() => cambiar(l.varianteId, -1)}
                              className="inline-flex size-11 items-center justify-center"
                            >
                              <Minus className="size-4" aria-hidden />
                            </button>
                            <span className="min-w-6 text-center font-semibold">{l.cantidad}</span>
                            <button
                              type="button"
                              aria-label="Agregar uno"
                              onClick={() => agregar(l.varianteId)}
                              className="inline-flex size-11 items-center justify-center"
                            >
                              <Plus className="size-4" aria-hidden />
                            </button>
                          </div>
                        </td>
                        <td className="px-2 py-2.5 text-right font-semibold">
                          {formatoPrecio(info.variante.precio * l.cantidad)}
                        </td>
                        <td className="px-4 py-2.5 text-right">
                          <button
                            type="button"
                            onClick={() => cambiar(l.varianteId, -9999)}
                            className="h-11 px-2.5 text-sm text-error"
                          >
                            Quitar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {lineas.length === 0 && (
              <p className="px-4 py-7 text-center text-gris">Todavía no hay productos. Escanea uno para empezar.</p>
            )}
          </div>
        </section>

        <aside className="flex flex-[1_1_340px] flex-col gap-4 rounded-[20px] bg-tinta p-6 text-white lg:sticky lg:top-6">
          <div>
            <p className="mb-1 text-sm text-humo">Total a cobrar · {unidades} productos</p>
            <p className="text-5xl font-semibold tracking-[-0.5px]">{formatoPrecio(total)}</p>
          </div>
          <div>
            <p className="mb-2.5 text-sm font-semibold">Medio de pago</p>
            <div role="group" aria-label="Medio de pago" className="grid grid-cols-2 gap-2.5">
              {MEDIOS.map(([m, label]) => (
                <button
                  key={m}
                  type="button"
                  aria-pressed={medio === m}
                  onClick={() => setMedio(m)}
                  className={`h-12 rounded-xl text-[15px] ${
                    medio === m ? "border-2 border-white bg-white font-semibold text-tinta" : "border border-gris text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          {medio === "efectivo" && (
            <div className="flex flex-col gap-2.5 rounded-[14px] bg-tinta-2 p-3.5">
              <p className="text-sm font-semibold">Efectivo recibido</p>
              <div className="grid grid-cols-3 gap-2">
                {billetes.map((b) => (
                  <button
                    key={b}
                    type="button"
                    aria-pressed={efectivo === b}
                    onClick={() => setRecibido({ monto: b, total })}
                    className={`h-11 rounded-[10px] text-sm ${
                      efectivo === b ? "border border-white bg-white font-semibold text-tinta" : "border border-gris text-white"
                    }`}
                  >
                    {b === total ? "Exacto" : formatoPrecio(b)}
                  </button>
                ))}
              </div>
              <p className="text-[15px]">
                Vuelto: <strong className="text-xl">{vuelto >= 0 ? formatoPrecio(vuelto) : `Falta ${formatoPrecio(-vuelto)}`}</strong>
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={cobrar}
            disabled={lineas.length === 0}
            className="h-[60px] rounded-[14px] bg-white text-lg font-semibold text-tinta disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cobrar {formatoPrecio(total)}
          </button>
          <button
            type="button"
            onClick={() => {
              setLineas([]);
              setAviso("");
              enfocar();
            }}
            className="h-11 rounded-xl border border-gris text-white"
          >
            Cancelar venta
          </button>
        </aside>
      </div>
    </main>
  );
}
