"use client";

import Link from "next/link";
import { formatoPrecio, nombreVariante, type Producto } from "@/lib/datos";
import { useDemo } from "@/lib/demo-store";

export function TarjetaProducto({ producto, indice = 0 }: { producto: Producto; indice?: number }) {
  const { stockDe, agregarAlCarrito, avisar, estado } = useDemo();

  // La tarjeta muestra la variante principal (la de 100 ml si existe).
  const principal = producto.variantes.find((v) => v.ml === 100) ?? producto.variantes[0];
  const stockTotal = producto.variantes.reduce((s, v) => s + stockDe(v.id), 0);
  const stockPrincipal = stockDe(principal.id);
  const agotado = stockTotal === 0;
  const enCarrito = (estado.carrito[principal.id] ?? 0) > 0;
  const minimo = Math.min(...producto.variantes.map((v) => v.precio));
  const varios = producto.variantes.length > 1;

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
      className="group animate-subir flex flex-col overflow-hidden rounded-2xl border border-borde bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(29,27,32,.10)]"
      style={{ animationDelay: `${indice * 0.05}s` }}
    >
      <Link href={href} className="relative block aspect-[4/5] overflow-hidden bg-crema">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={producto.foto}
          alt={`${producto.marca} ${producto.nombre}`}
          loading="lazy"
          className={`size-full object-cover transition duration-700 group-hover:scale-105 ${agotado ? "opacity-75 grayscale-[0.7]" : ""}`}
        />
        {badge && (
          <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClase}`}>{badge}</span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-1.5 px-[18px] pb-[18px] pt-4">
        <p className="text-xs uppercase tracking-[1.2px] text-gris">{producto.marca}</p>
        <Link href={href} className="font-serif text-2xl font-semibold leading-tight text-tinta">
          {producto.nombre}
        </Link>
        <p className="text-sm text-gris">
          {producto.concentracion} · {varios ? producto.variantes.map((v) => v.ml).join(" / ") : principal.ml} ml
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <span className="text-lg font-semibold">
            {varios && <span className="text-sm font-normal text-gris">Desde </span>}
            {formatoPrecio(minimo)}
          </span>
          {stockPrincipal === 0 && !agotado ? (
            <Link
              href={href}
              className="inline-flex h-11 items-center rounded-[10px] border border-ciruela bg-white px-4 text-sm font-medium text-ciruela"
            >
              Ver tamaños
            </Link>
          ) : (
            <button
              type="button"
              onClick={agregar}
              disabled={agotado}
              className={`h-11 rounded-[10px] border px-4 text-sm font-medium transition-colors ${
                agotado
                  ? "cursor-not-allowed border-linea bg-linea text-gris"
                  : enCarrito
                    ? "border-ciruela bg-white text-ciruela"
                    : "border-ciruela bg-ciruela text-white hover:bg-ciruela-oscuro"
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
