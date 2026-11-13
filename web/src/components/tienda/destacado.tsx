"use client";

import Link from "next/link";
import { TIENDA } from "@/config/tienda";
import { formatoPrecio, nombreVariante, variantePrincipal } from "@/lib/datos";
import { useDemo } from "@/lib/demo-store";

// Bloque grande de un producto destacado. Se elige en src/config/tienda.ts (destacado.slug).
export function Destacado() {
  const { productos, stockDe, agregarAlCarrito, avisar } = useDemo();
  const producto = productos.find((p) => p.slug === TIENDA.destacado.slug);
  if (!producto) return null;

  const v = variantePrincipal(producto, stockDe);
  const stock = stockDe(v.id);
  const nombre = `${producto.marca} ${producto.nombre}`;

  const agregar = () => {
    if (agregarAlCarrito(v.id)) avisar(`${nombre} agregado al carrito`);
    else avisar(`No queda más stock de ${nombre} ${nombreVariante(v)}`);
  };

  return (
    <section aria-label={TIENDA.destacado.eyebrow} className="mx-auto max-w-[1200px] px-4 pt-10 sm:px-6 sm:pt-12">
      <div className="flex flex-wrap overflow-hidden rounded-[18px] bg-tinta text-white sm:rounded-[22px]">
        <div className="group relative min-h-[230px] flex-[1_1_340px] overflow-hidden sm:min-h-[460px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={producto.foto}
            alt={nombre}
            loading="lazy"
            className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-[1.3_1_380px] flex-col justify-center gap-3 p-5 sm:gap-4 sm:p-[clamp(24px,4vw,52px)]">
          <p className="text-xs font-semibold uppercase tracking-[2px] text-claro">{TIENDA.destacado.eyebrow}</p>
          <h2 className="font-serif text-[clamp(30px,5vw,58px)] font-semibold leading-none">{producto.nombre}</h2>
          <p className="max-w-[480px] text-[15px] leading-relaxed text-niebla sm:text-[17px]">{producto.descripcion}</p>
          {producto.caracteristicas.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {producto.caracteristicas.slice(0, 3).map((n) => (
                <span key={n} className="rounded-full border border-white/40 px-3 py-1.5 text-[13px]">
                  {n}
                </span>
              ))}
            </div>
          )}
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-[28px] font-semibold sm:text-[34px]">{formatoPrecio(v.precio)}</span>
            <span className="text-sm text-humo">
              {producto.resumen} · {stock === 0 ? "agotado" : stock === 1 ? "última unidad" : `${stock} disponibles`}
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={agregar}
              disabled={stock === 0}
              className="h-[50px] rounded-xl bg-white px-6 text-base font-semibold text-tinta disabled:cursor-not-allowed disabled:opacity-60"
            >
              {stock === 0 ? "Sin stock" : "Agregar al carrito"}
            </button>
            <Link
              href={`/producto/${producto.slug}`}
              className="inline-flex h-[50px] items-center rounded-xl border border-white px-[22px] font-medium text-white"
            >
              Ver detalle
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
