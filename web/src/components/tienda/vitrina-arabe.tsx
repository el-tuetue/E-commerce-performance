"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useDemo } from "@/lib/demo-store";
import { TarjetaProducto } from "./tarjeta-producto";

// Los árabes más pedidos, justo después de las categorías: es lo que más vende la tienda.
const DESTACADOS = ["lattafa-khamrah", "lattafa-asad", "lattafa-yara", "armaf-club-de-nuit-intense"];

export function VitrinaArabe() {
  const { productos } = useDemo();
  const lista = DESTACADOS.map((s) => productos.find((p) => p.slug === s)).filter((p) => p !== undefined);

  return (
    <section aria-labelledby="titulo-arabes" className="mx-auto max-w-[1200px] px-4 pt-12 sm:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[2px] text-alerta">Nuestra especialidad</p>
          <h2 id="titulo-arabes" className="font-serif text-[40px] font-semibold leading-tight">
            Los árabes más pedidos
          </h2>
          <p className="mt-1 max-w-[560px] text-[15px] text-gris">
            Intensos, duraderos y a muy buen precio. Si no sabes por cuál partir, empieza por estos.
          </p>
        </div>
        <Link
          href="/?filtro=arabe#catalogo"
          className="inline-flex h-11 items-center gap-2 rounded-[10px] border border-ciruela px-4 text-sm font-medium text-ciruela hover:bg-rosado"
        >
          Ver todos los árabes
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(240px,100%),1fr))] gap-5">
        {lista.map((p, i) => (
          <TarjetaProducto key={p.slug} producto={p} indice={i} />
        ))}
      </div>
    </section>
  );
}
