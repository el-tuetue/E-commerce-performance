"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import type { Genero, Linea, Producto } from "@/lib/datos";
import { useDemo } from "@/lib/demo-store";
import { TarjetaProducto } from "./tarjeta-producto";

type Filtro = "todos" | Genero | Linea;
const FILTROS: [Filtro, string][] = [
  ["todos", "Todos"],
  ["arabe", "Árabes"],
  ["disenador", "Diseñador"],
  ["mujer", "Mujer"],
  ["hombre", "Hombre"],
  ["unisex", "Unisex"],
];

// Perfumes por página: así el pie de página siempre queda cerca, sobre todo en celular.
const POR_PAGINA = 8;

function pasaFiltro(p: Producto, f: Filtro) {
  if (f === "todos") return true;
  if (f === "arabe" || f === "disenador") return p.linea === f;
  return p.genero === f;
}

// Lee ?filtro= y ?q= de la URL (los usan el menú y el buscador del encabezado).
export function Catalogo() {
  const params = useSearchParams();
  // Al cambiar la URL se vuelve a montar con los filtros nuevos.
  return <CatalogoInterno key={params.toString()} filtroInicial={params.get("filtro")} qInicial={params.get("q") ?? ""} />;
}

function CatalogoInterno({ filtroInicial, qInicial }: { filtroInicial: string | null; qInicial: string }) {
  const { productos, stockDe } = useDemo();
  const [filtro, setFiltro] = useState<Filtro>(
    FILTROS.some(([f]) => f === filtroInicial) ? (filtroInicial as Filtro) : "todos",
  );
  const [busqueda, setBusqueda] = useState(qInicial);
  const [orden, setOrden] = useState<"destacados" | "menor" | "mayor">("destacados");
  const [pagina, setPagina] = useState(1);
  const inicio = useRef<HTMLElement>(null);

  const visibles = useMemo(() => {
    const q = busqueda.toLowerCase().trim();
    const lista = productos.filter(
      (p) => p.online && pasaFiltro(p, filtro) && (q === "" || `${p.nombre} ${p.marca}`.toLowerCase().includes(q)),
    );
    const precio = (p: Producto) => Math.min(...p.variantes.map((v) => v.precio));
    if (orden === "menor") lista.sort((a, b) => precio(a) - precio(b));
    if (orden === "mayor") lista.sort((a, b) => precio(b) - precio(a));
    if (orden === "destacados") {
      // Los agotados van al final.
      const disponible = (p: Producto) => (p.variantes.some((v) => stockDe(v.id) > 0) ? 0 : 1);
      lista.sort((a, b) => disponible(a) - disponible(b));
    }
    return lista;
  }, [productos, filtro, busqueda, orden, stockDe]);

  const paginas = Math.max(1, Math.ceil(visibles.length / POR_PAGINA));
  const actual = Math.min(pagina, paginas);
  const enPagina = visibles.slice((actual - 1) * POR_PAGINA, actual * POR_PAGINA);

  // Al cambiar de página, y una vez pintada la nueva, vuelve al inicio del catálogo.
  const subir = useRef(false);
  const irAPagina = (n: number) => {
    subir.current = true;
    setPagina(n);
  };
  useEffect(() => {
    if (!subir.current) return;
    subir.current = false;
    inicio.current?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [actual]);

  return (
    <section ref={inicio} id="catalogo" className="mx-auto max-w-[1200px] scroll-mt-32 px-4 pb-12 pt-6 sm:px-6 sm:pt-10">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="mb-1 font-serif text-[34px] font-semibold leading-tight sm:text-[40px]">Catálogo</h1>
          <p className="text-sm text-gris sm:text-[15px]">
            {visibles.length} {visibles.length === 1 ? "perfume" : "perfumes"} · precios referenciales
          </p>
        </div>
        <div className="flex gap-2.5">
          <label className="relative block flex-1 lg:w-60 lg:flex-none">
            <span className="sr-only">Buscar en el catálogo</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gris" aria-hidden />
            <input
              type="search"
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                setPagina(1);
              }}
              placeholder="Buscar"
              aria-label="Buscar perfume o marca"
              className="campo h-11 pl-9 text-sm"
            />
          </label>
          <label>
            <span className="sr-only">Ordenar</span>
            <select
              value={orden}
              onChange={(e) => {
                setOrden(e.target.value as typeof orden);
                setPagina(1);
              }}
              className="h-11 rounded-[10px] border border-borde-fuerte bg-white px-2.5 text-sm text-tinta"
            >
              <option value="destacados">Destacados</option>
              <option value="menor">Menor precio</option>
              <option value="mayor">Mayor precio</option>
            </select>
          </label>
        </div>
      </div>

      {/* En celular los filtros van en una sola fila que se desliza hacia el lado. */}
      <div
        role="group"
        aria-label="Filtrar por categoría"
        className="sin-barra -mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {FILTROS.map(([f, label]) => (
          <button
            key={f}
            type="button"
            aria-pressed={filtro === f}
            onClick={() => {
              setFiltro(f);
              setPagina(1);
            }}
            className={`h-11 shrink-0 rounded-full border px-[18px] text-sm transition-colors ${
              filtro === f ? "border-marca bg-marca font-semibold text-white" : "border-borde-fuerte bg-white text-tinta"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(230px,1fr))] sm:gap-5">
        {enPagina.map((p, i) => (
          <TarjetaProducto key={p.slug} producto={p} indice={i} />
        ))}
      </div>
      {visibles.length === 0 && <p className="mt-6 text-center text-gris">No encontramos perfumes con esa búsqueda.</p>}

      {paginas > 1 && (
        <nav aria-label="Páginas del catálogo" className="mt-8 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => irAPagina(actual - 1)}
            disabled={actual === 1}
            aria-label="Página anterior"
            className="inline-flex size-11 items-center justify-center rounded-[10px] border border-borde-fuerte bg-white text-tinta disabled:opacity-35"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          {Array.from({ length: paginas }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => irAPagina(n)}
              aria-label={`Página ${n}`}
              aria-current={n === actual ? "page" : undefined}
              className={`size-11 rounded-[10px] border text-sm ${
                n === actual ? "border-marca bg-marca font-semibold text-white" : "border-borde-fuerte bg-white text-tinta"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            onClick={() => irAPagina(actual + 1)}
            disabled={actual === paginas}
            aria-label="Página siguiente"
            className="inline-flex size-11 items-center justify-center rounded-[10px] border border-borde-fuerte bg-white text-tinta disabled:opacity-35"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </nav>
      )}
    </section>
  );
}
