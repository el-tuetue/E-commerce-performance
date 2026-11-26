"use client";

import Link from "next/link";
import { MessageCircle, ShoppingBag } from "lucide-react";
import { BotonTema } from "@/components/boton-tema";
import { Logo } from "@/components/logo";
import { TIENDA, VENTA_WHATSAPP } from "@/config/tienda";
import { linkWhatsApp } from "@/lib/whatsapp";
import { useDemo } from "@/lib/demo-store";

// Menú: una entrada por categoría (src/config/tienda.ts) + el catálogo completo.
const MENU = [
  ...TIENDA.categorias
    .filter((c) => c.enPortada !== false)
    .map((c) => ({ href: `/catalogo?filtro=${c.id}`, texto: c.nombre, destacado: c.id === TIENDA.categoriaDestacada })),
  { href: "/catalogo", texto: "Ver todo", destacado: false },
];

// Importante: la tienda no tiene ningún enlace al sistema interno.
export function Encabezado() {
  const { unidadesCarrito } = useDemo();

  return (
    <>
      <div className="bg-marca px-4 py-1.5 text-center text-xs text-sobre-marca sm:py-2 sm:text-[13px]">
        <span className="sm:hidden">{TIENDA.aviso.corto}</span>
        <span className="hidden sm:inline">{TIENDA.aviso.largo}</span>
      </div>
      <header className="sticky top-0 z-30 border-b border-borde bg-superficie/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center gap-x-8 px-4 py-2 sm:py-3.5 sm:px-6">
          <Link href="/" className="no-underline" aria-label={`${TIENDA.nombre}, inicio`}>
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
                aria-label="Buscar productos"
                placeholder="Buscar producto o marca"
                className="campo h-11 bg-fondo text-sm"
              />
            </form>
            <BotonTema />
            {/* En celular el carrito está en la barra de abajo; aquí solo desde tablet. */}
            {VENTA_WHATSAPP ? (
              <a
                href={linkWhatsApp(`Hola ${TIENDA.nombre}, tengo una consulta.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden h-11 items-center gap-2 rounded-[10px] bg-whatsapp px-4 text-sm font-medium text-white no-underline transition-colors hover:bg-whatsapp-oscuro sm:inline-flex"
              >
                <MessageCircle className="size-[18px]" aria-hidden />
                WhatsApp
              </a>
            ) : (
            <Link
              href="/carrito"
              aria-label={`Carrito, ${unidadesCarrito} productos`}
              className="hidden h-11 items-center gap-2 rounded-[10px] bg-marca px-4 text-sm font-medium text-sobre-marca no-underline transition-colors hover:bg-marca-oscuro sm:inline-flex"
            >
              <ShoppingBag className="size-[18px]" aria-hidden />
              Carrito
              <span
                key={unidadesCarrito}
                className={`inline-flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-superficie px-1.5 text-xs font-bold text-marca ${unidadesCarrito > 0 ? "animate-pop" : ""}`}
              >
                {unidadesCarrito}
              </span>
            </Link>
            )}
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
