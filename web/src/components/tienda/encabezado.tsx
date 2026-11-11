"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Logo } from "@/components/logo";
import { useDemo } from "@/lib/demo-store";

// Importante: la tienda no tiene ningún enlace al sistema interno.
export function Encabezado() {
  const { unidadesCarrito } = useDemo();

  return (
    <>
      <div className="bg-marca px-4 py-2 text-center text-[13px] text-white">
        Especialistas en perfumería árabe · 100% originales · Retiro gratis en tienda · Despacho a [COMUNAS DE DESPACHO]
      </div>
      <header className="sticky top-0 z-30 border-b border-borde bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-8 gap-y-3 px-4 py-3.5 sm:px-6">
          <Link href="/" className="no-underline" aria-label="Nube Aromática, inicio">
            <Logo />
          </Link>
          <nav aria-label="Categorías" className="order-3 flex w-full flex-wrap gap-x-5 text-[15px] sm:order-none sm:w-auto">
            <Link href="/?filtro=arabe#catalogo" className="py-2 font-semibold text-marca hover:text-marca-oscuro">
              Árabes
            </Link>
            <Link href="/?filtro=mujer#catalogo" className="py-2 text-tinta hover:text-marca">
              Mujer
            </Link>
            <Link href="/?filtro=hombre#catalogo" className="py-2 text-tinta hover:text-marca">
              Hombre
            </Link>
            <Link href="/?filtro=unisex#catalogo" className="py-2 text-tinta hover:text-marca">
              Unisex
            </Link>
            <Link href="/#marcas" className="py-2 text-tinta hover:text-marca">
              Marcas
            </Link>
          </nav>
          <div className="ml-auto flex flex-1 items-center justify-end gap-3">
            <form action="/" className="hidden flex-[0_1_260px] md:block" role="search">
              <input
                type="search"
                name="q"
                aria-label="Buscar perfumes"
                placeholder="Buscar perfume o marca"
                className="campo h-11 bg-fondo text-sm"
              />
            </form>
            <Link
              href="/carrito"
              className="inline-flex h-11 items-center gap-2 rounded-[10px] bg-marca px-4 text-sm font-medium text-white no-underline transition-colors hover:bg-marca-oscuro"
            >
              <ShoppingBag className="size-[18px]" aria-hidden />
              Carrito
              <span
                key={unidadesCarrito}
                className={`inline-flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-white px-1.5 text-xs font-bold text-marca ${unidadesCarrito > 0 ? "animate-pop" : ""}`}
              >
                <span className="sr-only">productos en el carrito:</span>
                {unidadesCarrito}
              </span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
