"use client";

import { MessageCircle } from "lucide-react";
import type { Producto, Variante } from "@/lib/datos";
import { useDemo } from "@/lib/demo-store";
import { linkWhatsApp, mensajeProducto } from "@/lib/whatsapp";

// Versión catálogo (VENTA_WHATSAPP): reemplaza "Agregar al carrito".
// Abre el chat de la tienda con el producto ya escrito y suma la consulta a las estadísticas del panel.
export function BotonWhatsApp({
  producto,
  variante,
  texto = "Consultar por WhatsApp",
  className = "",
}: {
  producto: Producto;
  variante?: Variante;
  texto?: string;
  className?: string;
}) {
  const { registrarConsulta } = useDemo();
  return (
    <a
      href={linkWhatsApp(mensajeProducto(producto, variante))}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => registrarConsulta(producto.slug)}
      className={`inline-flex items-center justify-center gap-2 rounded-[10px] bg-whatsapp font-semibold text-white no-underline transition-colors hover:bg-whatsapp-oscuro ${className}`}
    >
      <MessageCircle className="size-[18px] shrink-0" aria-hidden />
      {texto}
    </a>
  );
}
