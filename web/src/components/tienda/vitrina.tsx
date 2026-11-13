"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useDemo } from "@/lib/demo-store";
import { TarjetaProducto } from "./tarjeta-producto";

// Fila de productos elegidos para la portada, con un enlace al catálogo.
export function Vitrina({
  id,
  eyebrow,
  titulo,
  texto,
  slugs,
  href,
  cta,
}: {
  id: string;
  eyebrow: string;
  titulo: string;
  texto: string;
  slugs: string[];
  href: string;
  cta: string;
}) {
  const { productos } = useDemo();
  const lista = slugs.map((s) => productos.find((p) => p.slug === s)).filter((p) => p !== undefined);

  return (
    <section aria-labelledby={id} className="mx-auto max-w-[1200px] px-4 pt-10 sm:px-6 sm:pt-12">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-x-4 gap-y-2 sm:mb-6">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[2px] text-alerta">{eyebrow}</p>
          <h2 id={id} className="font-serif text-[30px] font-semibold leading-tight sm:text-[40px]">
            {titulo}
          </h2>
          <p className="mt-1 hidden max-w-[560px] text-[15px] text-gris sm:block">{texto}</p>
        </div>
        <Link
          href={href}
          className="hidden h-11 items-center gap-2 rounded-[10px] border border-marca px-4 text-sm font-medium text-marca hover:bg-marca-suave sm:inline-flex"
        >
          {cta}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(230px,1fr))] sm:gap-5">
        {lista.map((p, i) => (
          <TarjetaProducto key={p.slug} producto={p} indice={i} />
        ))}
      </div>
      <Link
        href={href}
        className="mt-4 flex h-12 items-center justify-center gap-2 rounded-[10px] border border-marca bg-white text-sm font-semibold text-marca sm:hidden"
      >
        {cta}
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </section>
  );
}
