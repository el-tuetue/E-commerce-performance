"use client";

import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import { CircleCheck, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { COSTO_ENVIO, formatoPrecio, nombreVariante } from "@/lib/datos";
import { useDemo } from "@/lib/demo-store";

type Entrega = "retiro" | "despacho";
type Medio = "webpay" | "mp";

function Opcion({
  activa,
  onClick,
  titulo,
  texto,
}: {
  activa: boolean;
  onClick: () => void;
  titulo: string;
  texto: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={activa}
      onClick={onClick}
      className={`min-h-11 rounded-xl p-4 text-left text-tinta transition-colors ${
        activa ? "border-2 border-marca bg-marca-suave" : "border border-borde-fuerte bg-white"
      }`}
    >
      <span className="mb-1 block font-semibold">{titulo}</span>
      <span className="block text-sm text-gris">{texto}</span>
    </button>
  );
}

export function Carrito() {
  const { estado, listo, buscarVariante, stockDe, cambiarCantidadCarrito, pagarCarrito } = useDemo();
  const [entrega, setEntrega] = useState<Entrega>("retiro");
  const [medio, setMedio] = useState<Medio>("webpay");
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");
  const [pagado, setPagado] = useState<{ num: number; medio: Medio; entrega: Entrega } | null>(null);

  // Next.js deja la página "dormida" al salir y la muestra igual al volver.
  // Al ocultarse, se borra el "¡Gracias por tu compra!" para partir de cero la próxima vez.
  useLayoutEffect(() => {
    return () => {
      setPagado(null);
      setError("");
    };
  }, []);

  const items = Object.entries(estado.carrito)
    .map(([id, cantidad]) => ({ id, cantidad, info: buscarVariante(id) }))
    .filter((i) => i.info);
  const subtotal = items.reduce((s, i) => s + i.info!.variante.precio * i.cantidad, 0);
  const unidades = items.reduce((s, i) => s + i.cantidad, 0);
  const envio = entrega === "despacho" ? COSTO_ENVIO : 0;

  const pagar = () => {
    const r = pagarCarrito({ entrega, cliente: nombre.trim() });
    if (!r.ok) {
      setError(r.error);
      return;
    }
    setError("");
    setPagado({ num: r.num!, medio, entrega });
    window.scrollTo({ top: 0 });
  };

  if (pagado) {
    return (
      <main className="mx-auto max-w-[1200px] px-4 pb-16 pt-8 sm:px-6">
        <div className="animate-subir mx-auto my-10 flex max-w-[560px] flex-col items-center gap-3.5 rounded-[20px] border border-borde bg-white px-8 py-10 text-center">
          <CircleCheck className="size-14 text-ok" strokeWidth={2} aria-label="Pago aprobado" />
          <h1 className="font-serif text-[40px] font-semibold leading-tight">¡Gracias por tu compra!</h1>
          <p className="leading-relaxed text-gris">
            Pedido <strong className="text-tinta">N° {pagado.num}</strong> pagado con{" "}
            {pagado.medio === "webpay" ? "Webpay" : "Mercado Pago"}.{" "}
            {pagado.entrega === "despacho"
              ? "Lo enviaremos a tu dirección."
              : "Te avisaremos cuando esté listo para retirar en el local."}
          </p>
          <p className="text-sm text-gris">Te avisaremos por correo y WhatsApp cuando cambie el estado del pedido.</p>
          <p className="rounded-xl bg-marca-suave px-4 py-3 text-sm text-marca">
            Demo: el stock ya se descontó y el pedido aparece en el panel del administrador.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Link href="/" className="inline-flex h-12 items-center rounded-[10px] bg-marca px-[22px] font-medium text-white">
              Volver a la tienda
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (listo && items.length === 0) {
    return (
      <main className="mx-auto max-w-[1200px] px-4 pb-16 pt-8 sm:px-6">
        <div className="mx-auto my-10 flex max-w-[520px] flex-col items-center gap-4 rounded-[20px] border border-borde bg-white px-8 py-12 text-center">
          <ShoppingBag className="size-12 text-marca" strokeWidth={1.6} aria-hidden />
          <h1 className="font-serif text-4xl font-semibold">Tu carrito está vacío</h1>
          <p className="text-gris">Mira el catálogo y agrega tus perfumes favoritos.</p>
          <Link href="/catalogo" className="inline-flex h-12 items-center rounded-[10px] bg-marca px-6 font-medium text-white">
            Ver catálogo
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1200px] px-4 pb-16 pt-8 sm:px-6">
      <h1 className="mb-6 font-serif text-[44px] font-semibold leading-tight">Tu carrito</h1>
      <div className="flex flex-wrap items-start gap-8">
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-6">
          <div className="rounded-2xl border border-borde bg-white">
            {items.map(({ id, cantidad, info }) => {
              const { producto, variante } = info!;
              const max = stockDe(id);
              return (
                <div key={id} className="flex flex-wrap items-center gap-4 border-b border-linea px-5 py-[18px] last:border-b-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={producto.foto}
                    alt={`${producto.marca} ${producto.nombre}`}
                    className="h-24 w-20 rounded-xl bg-crema object-cover"
                  />
                  <div className="flex-[1_1_180px]">
                    <p className="mb-0.5 text-xs uppercase tracking-[1px] text-gris">{producto.marca}</p>
                    <Link href={`/producto/${producto.slug}`} className="mb-0.5 block text-[17px] font-semibold text-tinta">
                      {producto.nombre}
                    </Link>
                    <p className="text-sm text-gris">
                      {producto.concentracion} · {nombreVariante(variante)}
                      {cantidad >= max && <span className="text-alerta"> · máximo disponible</span>}
                    </p>
                  </div>
                  <div className="flex items-center rounded-[10px] border border-borde-fuerte">
                    <button
                      type="button"
                      aria-label={`Quitar uno de ${producto.nombre}`}
                      onClick={() => cambiarCantidadCarrito(id, cantidad - 1)}
                      className="inline-flex size-11 items-center justify-center"
                    >
                      {cantidad === 1 ? <Trash2 className="size-4 text-error" aria-hidden /> : <Minus className="size-4" aria-hidden />}
                    </button>
                    <span className="min-w-7 text-center font-semibold">{cantidad}</span>
                    <button
                      type="button"
                      aria-label={`Agregar uno de ${producto.nombre}`}
                      disabled={cantidad >= max}
                      onClick={() => cambiarCantidadCarrito(id, cantidad + 1)}
                      className="inline-flex size-11 items-center justify-center disabled:opacity-35"
                    >
                      <Plus className="size-4" aria-hidden />
                    </button>
                  </div>
                  <span className="min-w-24 text-right text-[17px] font-semibold">{formatoPrecio(variante.precio * cantidad)}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-3.5 rounded-2xl border border-borde bg-white p-5">
            <h2 className="text-lg font-semibold">¿Cómo lo quieres recibir?</h2>
            <div role="group" aria-label="Tipo de entrega" className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
              <Opcion activa={entrega === "retiro"} onClick={() => setEntrega("retiro")} titulo="Retiro en tienda" texto="Gratis · [DIRECCIÓN DEL LOCAL]" />
              <Opcion
                activa={entrega === "despacho"}
                onClick={() => setEntrega("despacho")}
                titulo="Despacho a domicilio"
                texto={`${formatoPrecio(COSTO_ENVIO)} · costo de ejemplo`}
              />
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
              <label className="flex flex-col gap-1.5 text-sm font-medium">
                Nombre
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu nombre"
                  autoComplete="name"
                  className="campo h-11 font-normal"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-medium">
                Teléfono
                <input type="tel" placeholder="+56 9" autoComplete="tel" className="campo h-11 font-normal" />
              </label>
              {entrega === "despacho" && (
                <>
                  <label className="flex flex-col gap-1.5 text-sm font-medium">
                    Dirección
                    <input type="text" placeholder="Calle y número" autoComplete="street-address" className="campo h-11 font-normal" />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm font-medium">
                    Comuna
                    <input type="text" placeholder="Ej: Cabrero" className="campo h-11 font-normal" />
                  </label>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3.5 rounded-2xl border border-borde bg-white p-5">
            <h2 className="text-lg font-semibold">Medio de pago</h2>
            <div role="group" aria-label="Medio de pago" className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
              <Opcion activa={medio === "webpay"} onClick={() => setMedio("webpay")} titulo="Webpay" texto="Débito, crédito y prepago" />
              <Opcion activa={medio === "mp"} onClick={() => setMedio("mp")} titulo="Mercado Pago" texto="Tarjetas o saldo de la cuenta" />
            </div>
          </div>
        </div>

        <aside className="flex flex-[1_1_320px] flex-col gap-3 rounded-2xl border border-borde bg-white p-[22px] lg:sticky lg:top-28">
          <h2 className="mb-1 text-lg font-semibold">Resumen</h2>
          <div className="flex justify-between text-gris">
            <span>Productos ({unidades})</span>
            <span>{formatoPrecio(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gris">
            <span>Envío</span>
            <span>{entrega === "despacho" ? formatoPrecio(envio) : "Gratis"}</span>
          </div>
          <div className="flex justify-between border-t border-borde pt-3 text-xl font-semibold">
            <span>Total</span>
            <span>{formatoPrecio(subtotal + envio)}</span>
          </div>
          <button
            type="button"
            onClick={pagar}
            className="mt-1.5 h-[52px] rounded-[10px] bg-marca text-base font-semibold text-white transition-colors hover:bg-marca-oscuro"
          >
            Ir a pagar
          </button>
          {error && (
            <p role="alert" className="text-sm text-error">
              {error}
            </p>
          )}
          <p className="text-[13px] leading-normal text-gris">
            El stock se descuenta al confirmarse el pago, así nadie compra un perfume que ya se vendió en el local.
          </p>
          <p className="text-xs text-gris">Demo: el pago es simulado, no se cobra nada.</p>
        </aside>
      </div>
    </main>
  );
}
