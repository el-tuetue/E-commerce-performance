import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Carrito } from "@/components/tienda/carrito";
import { VENTA_WHATSAPP } from "@/config/tienda";

export const metadata: Metadata = { title: "Carrito y pago" };

export default function PaginaCarrito() {
  if (VENTA_WHATSAPP) redirect("/catalogo");
  return <Carrito />;
}
