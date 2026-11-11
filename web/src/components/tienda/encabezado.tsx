"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Logo } from "@/components/logo";
import { useDemo } from "@/lib/demo-store";

const MENU = [
  { href: "/catalogo?filtro=arabe", texto: "Árabes", destacado: true },
  { href: "/catalogo?filtro=mujer", texto: "Mujer" },
  { href: "/catalogo?filtro=hombre", texto: "Hombre" },
  { href: "/catalogo?filtro=unisex", texto: "Unisex" },
  { href: "/catalogo", texto: "Catálogo" },
];

// Importante: la tienda no tiene ningún enlace al sistema interno.
export function Encabezado() {
  const { unidadesCarrito } = useDemo();

  return (
    <>
      <div className="bg-marca px-4 py-1.5 text-center text-xs text-white sm:py-2 sm:text-[13px]">
        <span className="sm:hidden">Especialistas en perfumería árabe · 100% originales</span>
        <span className="hidden sm:inline">
          Especialistas en perfumería árabe · 100% originales · Retiro gratis en tienda · Despacho a [COMUNAS DE DESPACHO]
        </span>
      </div>
      <header className="sticky top-0 z-30 border-b border-borde bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center gap-x-8 px-4 py-2 sm:py-3.5 sm:px-6">
          <Link href="/" className="no-underline" aria-label="Nube Aromática, inicio">
            <Logo />
          </Link>
          {/* En celular este menú no se muestra: lo reemplaza la barra de abajo. */}
          <nav aria-label="Categorías" className="hidden gap-x-5 text-[15px] lg:flex">
            {MENU.map((m) => (
              <Link
                key={m.texto}
                href={m.href}
                className={`py-2 ${m.destacado ? "font-semibold text-marca hover:text-marca-oscuro" : "text-tinta hover:text-marca"}`}
              >
                {m.texto}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex flex-1 items-center justify-end gap-3">
            <form action="/catalogo" className="hidden flex-[0_1_240px] md:block" role="search">
              <input
                type="search"
                name="q"
                aria-label="Buscar perfumes"
                placeholder="Buscar perfume o marca"
                className="campo h-11 bg-fondo text-sm"
              />
            </form>
            {/* En celular el carrito está en la barra de abajo; aquí solo desde tablet. */}
            <Link
              href="/carrito"
              aria-label={`Carrito, ${unidadesCarrito} productos`}
              className="hidden h-11 items-center gap-2 rounded-[10px] bg-marca px-4 text-sm font-medium text-white no-underline transition-colors hover:bg-marca-oscuro sm:inline-flex"
            >
              <ShoppingBag className="size-[18px]" aria-hidden />
              Carrito
              <span
                key={unidadesCarrito}
                className={`inline-flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-white px-1.5 text-xs font-bold text-marca ${unidadesCarrito > 0 ? "animate-pop" : ""}`}
              >
                {unidadesCarrito}
              </span>
            </Link>
          </div>
        </div>
        {/* Tablet: menú en una fila que se desliza. */}
        <nav
          aria-label="Categorías"
          className="sin-barra hidden gap-x-5 overflow-x-auto border-t border-linea px-6 text-[15px] sm:flex lg:hidden"
        >
          {MENU.map((m) => (
            <Link
              key={m.texto}
              href={m.href}
              className={`shrink-0 py-2.5 ${m.destacado ? "font-semibold text-marca" : "text-tinta"}`}
            >
              {m.texto}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
