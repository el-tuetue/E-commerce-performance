"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, LayoutGrid, ShoppingBag, Sparkles } from "lucide-react";
import { useDemo } from "@/lib/demo-store";

// Barra fija de abajo, solo en celular: lo más usado queda siempre a un toque del pulgar.
export function BarraInferior() {
  const ruta = usePathname();
  const { unidadesCarrito } = useDemo();

  const items = [
    { href: "/", texto: "Inicio", icono: House, activo: ruta === "/" },
    { href: "/catalogo", texto: "Catálogo", icono: LayoutGrid, activo: ruta.startsWith("/catalogo") || ruta.startsWith("/producto") },
    { href: "/catalogo?filtro=arabe", texto: "Árabes", icono: Sparkles, activo: false },
    { href: "/carrito", texto: "Carrito", icono: ShoppingBag, activo: ruta.startsWith("/carrito"), cantidad: unidadesCarrito },
  ];

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-borde bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur sm:hidden"
    >
      <ul className="grid grid-cols-4">
        {items.map(({ href, texto, icono: Icono, activo, cantidad }) => (
          <li key={texto}>
            <Link
              href={href}
              aria-current={activo ? "page" : undefined}
              className={`relative flex h-[60px] flex-col items-center justify-center gap-0.5 text-[11px] ${
                activo ? "font-semibold text-marca" : "text-gris"
              }`}
            >
              {activo && <span className="absolute top-0 h-[3px] w-10 rounded-b-full bg-marca" aria-hidden />}
              <span className="relative">
                <Icono className="size-[22px]" strokeWidth={activo ? 2.3 : 1.9} aria-hidden />
                {cantidad !== undefined && cantidad > 0 && (
                  <span
                    key={cantidad}
                    className="animate-pop absolute -right-2.5 -top-1.5 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-flor px-1 text-[11px] font-bold text-white"
                  >
                    {cantidad}
                  </span>
                )}
              </span>
              {texto}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
