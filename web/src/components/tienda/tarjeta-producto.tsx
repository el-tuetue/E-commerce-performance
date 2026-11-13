"use client";

import Link from "next/link";
import { formatoPrecio, nombreVariante, variantePrincipal, type Producto } from "@/lib/datos";
import { useDemo } from "@/lib/demo-store";

export function TarjetaProducto({ producto, indice = 0 }: { producto: Producto; indice?: number }) {
  const { stockDe, agregarAlCarrito, avisar, estado } = useDemo();

  // La tarjeta agrega la primera variante con stock.
  const principal = variantePrincipal(producto, stockDe);
  const stockTotal = producto.variantes.reduce((s, v) => s + stockDe(v.id), 0);
  const stockPrincipal = stockDe(principal.id);
  const agotado = stockTotal === 0;
  const enCarrito = (estado.carrito[principal.id] ?? 0) > 0;
  const minimo = Math.min(...producto.variantes.map((v) => v.precio));
  // "Desde" solo si las opciones tienen precios distintos.
  const varios = new Set(producto.variantes.map((v) => v.precio)).size > 1;

  let badge = producto.nuevo ? "Nuevo" : producto.badge;
  let badgeClase = "bg-tinta text-white";
  if (agotado) {
    badge = "Agotado";
    badgeClase = "border border-error bg-white text-error";
  } else if (stockTotal === 1) {
    badge = "Última unidad";
    badgeClase = "bg-alerta-fondo text-alerta";
  } else if (stockTotal === 2) {
    badge = "Quedan 2";
    badgeClase = "bg-alerta-fondo text-alerta";
  }

  const agregar = () => {
    if (stockPrincipal === 0) return;
    if (agregarAlCarrito(principal.id)) avisar(`${producto.marca} ${producto.nombre} agregado al carrito`);
    else avisar(`No queda más stock de ${producto.nombre} ${nombreVariante(principal)}`);
  };

  const href = `/producto/${producto.slug}`;

  return (
    <article
      className="group animate-subir flex flex-col overflow-hidden rounded-2xl border border-borde bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(15,23,42,.12)]"
      style={{ animationDelay: `${indice * 0.05}s` }}
    >
      <Link href={href} className="relative block aspect-square overflow-hidden bg-crema sm:aspect-[4/5]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={producto.foto}
          alt={`${producto.marca} ${producto.nombre}`}
          loading="lazy"
          className={`size-full object-cover transition duration-700 group-hover:scale-105 ${agotado ? "opacity-75 grayscale-[0.7]" : ""}`}
        />
        {badge && (
          <span className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[11px] font-semibold sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-xs ${badgeClase}`}>{badge}</span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-1 p-3 sm:gap-1.5 sm:px-[18px] sm:pb-[18px] sm:pt-4">
        <p className="text-[11px] uppercase tracking-[1.2px] text-gris sm:text-xs">{producto.marca}</p>
        <Link href={href} className="font-serif text-[19px] font-semibold leading-tight text-tinta sm:text-2xl">
          {producto.nombre}
        </Link>
        <p className="text-xs text-gris sm:text-sm">
          {producto.resumen}
        </p>
        <div className="mt-auto flex flex-col gap-2 pt-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:pt-3">
          <span className="text-base font-semibold sm:text-lg">
            {varios && <span className="text-xs font-normal text-gris sm:text-sm">Desde </span>}
            {formatoPrecio(minimo)}
          </span>
          {stockPrincipal === 0 && !agotado ? (
            <Link
              href={href}
              className="inline-flex h-11 items-center justify-center rounded-[10px] border border-marca bg-white px-4 text-sm font-medium text-marca"
            >
              Ver opciones
            </Link>
          ) : (
            <button
              type="button"
              onClick={agregar}
              disabled={agotado}
              className={`h-11 w-full rounded-[10px] border px-4 text-sm font-medium transition-colors sm:w-auto ${
                agotado
                  ? "cursor-not-allowed border-linea bg-linea text-gris"
                  : enCarrito
                    ? "border-marca bg-white text-marca"
                    : "border-marca bg-marca text-white hover:bg-marca-oscuro"
              }`}
            >
              {agotado ? "Sin stock" : enCarrito ? "Agregar otro" : "Agregar"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
