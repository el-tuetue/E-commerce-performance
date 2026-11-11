"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Genero } from "@/lib/datos";
import { useDemo } from "@/lib/demo-store";
import { TarjetaProducto } from "./tarjeta-producto";

type Filtro = "todos" | Genero;
const FILTROS: [Filtro, string][] = [
  ["todos", "Todos"],
  ["mujer", "Mujer"],
  ["hombre", "Hombre"],
  ["unisex", "Unisex"],
];

// Lee ?genero= y ?q= de la URL (los usan el menú y el buscador del encabezado).
export function Catalogo() {
  const params = useSearchParams();
  // Al cambiar la URL se vuelve a montar con los filtros nuevos.
  return <CatalogoInterno key={params.toString()} generoInicial={params.get("genero")} qInicial={params.get("q") ?? ""} />;
}

function CatalogoInterno({ generoInicial, qInicial }: { generoInicial: string | null; qInicial: string }) {
  const { productos, stockDe } = useDemo();
  const [filtro, setFiltro] = useState<Filtro>(
    FILTROS.some(([f]) => f === generoInicial) ? (generoInicial as Filtro) : "todos",
  );
  const [busqueda, setBusqueda] = useState(qInicial);
  const [orden, setOrden] = useState<"destacados" | "menor" | "mayor">("destacados");

  const visibles = useMemo(() => {
    const q = busqueda.toLowerCase().trim();
    const lista = productos.filter(
      (p) =>
        p.online &&
        (filtro === "todos" || p.genero === filtro) &&
        (q === "" || `${p.nombre} ${p.marca}`.toLowerCase().includes(q)),
    );
    const precio = (p: (typeof lista)[number]) => Math.min(...p.variantes.map((v) => v.precio));
    if (orden === "menor") lista.sort((a, b) => precio(a) - precio(b));
    if (orden === "mayor") lista.sort((a, b) => precio(b) - precio(a));
    if (orden === "destacados") {
      // Los agotados van al final.
      const disponible = (p: (typeof lista)[number]) => (p.variantes.some((v) => stockDe(v.id) > 0) ? 0 : 1);
      lista.sort((a, b) => disponible(a) - disponible(b));
    }
    return lista;
  }, [productos, filtro, busqueda, orden, stockDe]);

  return (
    <section id="catalogo" className="mx-auto max-w-[1200px] scroll-mt-28 px-4 pb-14 pt-12 sm:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="mb-1.5 font-serif text-[40px] font-semibold leading-tight">Catálogo</h2>
          <p className="text-[15px] text-gris">{visibles.length} perfumes · precios referenciales</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="relative block w-full sm:w-56">
            <span className="sr-only">Buscar en el catálogo</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gris" aria-hidden />
            <input
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar"
              className="campo h-11 pl-9 text-sm"
            />
          </label>
          <div role="group" aria-label="Filtrar por categoría" className="flex flex-wrap gap-2">
            {FILTROS.map(([f, label]) => (
              <button
                key={f}
                type="button"
                aria-pressed={filtro === f}
                onClick={() => setFiltro(f)}
                className={`h-11 rounded-full border px-[18px] text-sm transition-colors ${
                  filtro === f ? "border-tinta bg-tinta font-semibold text-white" : "border-borde-fuerte bg-white text-tinta"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <label className="inline-flex items-center gap-2 text-sm text-gris">
            Ordenar
            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value as typeof orden)}
              className="h-11 rounded-[10px] border border-borde-fuerte bg-white px-3 text-sm text-tinta"
            >
              <option value="destacados">Destacados</option>
              <option value="menor">Menor precio</option>
              <option value="mayor">Mayor precio</option>
            </select>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(240px,100%),1fr))] gap-5">
        {visibles.map((p, i) => (
          <TarjetaProducto key={p.slug} producto={p} indice={i} />
        ))}
      </div>
      {visibles.length === 0 && <p className="mt-6 text-center text-gris">No encontramos perfumes con esa búsqueda.</p>}
    </section>
  );
}
