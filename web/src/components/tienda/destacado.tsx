"use client";

import Link from "next/link";
import { formatoPrecio } from "@/lib/datos";
import { useDemo } from "@/lib/demo-store";

export function Destacado() {
  const { stockDe, agregarAlCarrito, avisar } = useDemo();
  const id = "sauvage-100";
  const stock = stockDe(id);

  const agregar = () => {
    if (agregarAlCarrito(id)) avisar("Dior Sauvage agregado al carrito");
    else avisar("No queda más stock de Dior Sauvage 100 ml");
  };

  return (
    <section aria-label="El más vendido del mes" className="mx-auto max-w-[1200px] px-4 pt-12 sm:px-6">
      <div className="flex flex-wrap overflow-hidden rounded-[22px] bg-tinta text-white">
        <div className="group relative min-h-[320px] flex-[1_1_340px] overflow-hidden sm:min-h-[400px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/fotos/sauvage.jpg"
            alt="Caja de Dior Sauvage"
            loading="lazy"
            className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-[1.3_1_380px] flex-col justify-center gap-4 p-[clamp(24px,4vw,52px)]">
          <p className="text-xs font-semibold uppercase tracking-[2px] text-lila">El más vendido del mes</p>
          <h2 className="font-serif text-[clamp(38px,5vw,58px)] font-semibold leading-none">Dior Sauvage</h2>
          <p className="max-w-[480px] text-[17px] leading-relaxed text-niebla">
            Fresco, especiado y con una estela que dura todo el día. El regalo que nunca falla.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Bergamota", "Lavanda", "Ambroxan"].map((n) => (
              <span key={n} className="rounded-full border border-gris px-3 py-1.5 text-[13px]">
                {n}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-[34px] font-semibold">{formatoPrecio(129990)}</span>
            <span className="text-sm text-humo">
              Eau de Toilette · 100 ml · {stock === 0 ? "agotado" : `${stock} disponibles`}
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
              href="/producto/dior-sauvage"
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
