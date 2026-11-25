"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { TIENDA } from "@/config/tienda";
import { formatoPrecio, type Producto } from "@/lib/datos";
import { useDemo } from "@/lib/demo-store";
import { TarjetaProducto } from "./tarjeta-producto";

// "todos" o el id de una categoría (se definen en src/config/tienda.ts).
type Filtro = string;
const FILTROS: [Filtro, string][] = [["todos", "Todos"], ...TIENDA.categorias.map((c): [Filtro, string] => [c.id, c.nombre])];

// Productos por página: así el pie de página siempre queda cerca, sobre todo en celular.
const POR_PAGINA = TIENDA.porPagina;

function pasaFiltro(p: Producto, f: Filtro) {
  return f === "todos" || p.categorias.includes(f);
}

type Rango = { min?: number; max?: number };

// El producto entra si alguna de sus opciones tiene un precio dentro del rango.
function pasaPrecio(p: Producto, r: Rango) {
  return p.variantes.some((v) => (r.min === undefined || v.precio >= r.min) && (r.max === undefined || v.precio <= r.max));
}

function textoRango(r: Rango) {
  if (r.min !== undefined && r.max !== undefined) return `${formatoPrecio(r.min)} a ${formatoPrecio(r.max)}`;
  if (r.max !== undefined) return `Hasta ${formatoPrecio(r.max)}`;
  if (r.min !== undefined) return `Más de ${formatoPrecio(r.min)}`;
  return "";
}

// Lee ?filtro=, ?q=, ?min= y ?max= de la URL (los usan el menú, el buscador y la guía de regalos).
export function Catalogo() {
  const params = useSearchParams();
  const numero = (v: string | null) => (v && Number.isFinite(Number(v)) ? Number(v) : undefined);
  // Al cambiar la URL se vuelve a montar con los filtros nuevos.
  return (
    <CatalogoInterno
      key={params.toString()}
      filtroInicial={params.get("filtro")}
      qInicial={params.get("q") ?? ""}
      rangoInicial={{ min: numero(params.get("min")), max: numero(params.get("max")) }}
    />
  );
}

function CatalogoInterno({
  filtroInicial,
  qInicial,
  rangoInicial,
}: {
  filtroInicial: string | null;
  qInicial: string;
  rangoInicial: Rango;
}) {
  const { productos, stockDe } = useDemo();
  const [rango, setRango] = useState<Rango>(rangoInicial);
  const hayRango = rango.min !== undefined || rango.max !== undefined;
  const [filtro, setFiltro] = useState<Filtro>(
    filtroInicial && FILTROS.some(([f]) => f === filtroInicial) ? filtroInicial : "todos",
  );
  const [busqueda, setBusqueda] = useState(qInicial);
  const [orden, setOrden] = useState<"destacados" | "menor" | "mayor">("destacados");
  const [pagina, setPagina] = useState(1);
  const inicio = useRef<HTMLElement>(null);

  const visibles = useMemo(() => {
    const q = busqueda.toLowerCase().trim();
    const lista = productos.filter(
      (p) =>
        p.online &&
        pasaFiltro(p, filtro) &&
        pasaPrecio(p, rango) &&
        (q === "" || `${p.nombre} ${p.marca}`.toLowerCase().includes(q)),
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
  }, [productos, filtro, busqueda, orden, stockDe, rango]);

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
            {visibles.length} {visibles.length === 1 ? TIENDA.producto.singular : TIENDA.producto.plural}
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
              aria-label="Buscar producto o marca"
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
              className="h-11 rounded-[10px] border border-borde-fuerte bg-superficie px-2.5 text-sm text-tinta"
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
              filtro === f ? "border-marca bg-marca font-semibold text-sobre-marca" : "border-borde-fuerte bg-superficie text-tinta"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {hayRango && (
        <div className="-mt-1 mb-4">
          <button
            type="button"
            onClick={() => {
              setRango({});
              setPagina(1);
            }}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-marca-suave px-4 text-sm font-medium text-marca"
          >
            Precio: {textoRango(rango)}
            <X className="size-4" aria-hidden />
            <span className="sr-only">Quitar filtro de precio</span>
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(230px,1fr))] sm:gap-5">
        {enPagina.map((p, i) => (
          <TarjetaProducto key={p.slug} producto={p} indice={i} />
        ))}
      </div>
      {visibles.length === 0 && <p className="mt-6 text-center text-gris">No encontramos {TIENDA.producto.plural} con esa búsqueda.</p>}

      {paginas > 1 && (
        <nav aria-label="Páginas del catálogo" className="mt-8 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => irAPagina(actual - 1)}
            disabled={actual === 1}
            aria-label="Página anterior"
            className="inline-flex size-11 items-center justify-center rounded-[10px] border border-borde-fuerte bg-superficie text-tinta disabled:opacity-35"
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
                n === actual ? "border-marca bg-marca font-semibold text-sobre-marca" : "border-borde-fuerte bg-superficie text-tinta"
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
            className="inline-flex size-11 items-center justify-center rounded-[10px] border border-borde-fuerte bg-superficie text-tinta disabled:opacity-35"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </nav>
      )}
    </section>
  );
}
