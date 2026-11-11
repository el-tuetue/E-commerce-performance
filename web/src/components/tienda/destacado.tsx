"use client";

import Link from "next/link";
import { formatoPrecio } from "@/lib/datos";
import { useDemo } from "@/lib/demo-store";

export function Destacado() {
  const { stockDe, agregarAlCarrito, avisar } = useDemo();
  const id = "dhan-oud-12";
  const stock = stockDe(id);

  const agregar = () => {
    if (agregarAlCarrito(id)) avisar("Rasasi Dhan Oud Kambodi agregado al carrito");
    else avisar("No queda más stock de Rasasi Dhan Oud Kambodi");
  };

  return (
    <section aria-label="La joya de la casa" className="mx-auto max-w-[1200px] px-4 pt-10 sm:px-6 sm:pt-12">
      <div className="flex flex-wrap overflow-hidden rounded-[18px] bg-tinta text-white sm:rounded-[22px]">
        <div className="group relative min-h-[230px] flex-[1_1_340px] overflow-hidden sm:min-h-[460px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/fotos/rasasi-dhan-oud.jpg"
            alt="Frasco de cristal tallado de Rasasi Dhan Oud Kambodi"
            loading="lazy"
            className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-[1.3_1_380px] flex-col justify-center gap-3 p-5 sm:gap-4 sm:p-[clamp(24px,4vw,52px)]">
          <p className="text-xs font-semibold uppercase tracking-[2px] text-agua">La joya de la casa</p>
          <h2 className="font-serif text-[clamp(30px,5vw,58px)] font-semibold leading-none">Rasasi Dhan Oud Kambodi</h2>
          <p className="max-w-[480px] text-[15px] leading-relaxed text-niebla sm:text-[17px]">
            Aceite de oud camboyano, sin alcohol, en frasco de cristal tallado. Unas gotas duran todo el día.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Oud camboyano", "Rosa", "Ámbar"].map((n) => (
              <span key={n} className="rounded-full border border-white/40 px-3 py-1.5 text-[13px]">
                {n}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-[28px] font-semibold sm:text-[34px]">{formatoPrecio(49990)}</span>
            <span className="text-sm text-humo">
              Attar · 12 ml · {stock === 0 ? "agotado" : stock === 1 ? "última unidad" : `${stock} disponibles`}
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
              href="/producto/rasasi-dhan-oud-kambodi"
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
