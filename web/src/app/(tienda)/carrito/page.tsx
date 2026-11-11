import type { Metadata } from "next";
import { Carrito } from "@/components/tienda/carrito";

export const metadata: Metadata = { title: "Carrito y pago" };

export default function PaginaCarrito() {
  return <Carrito />;
}
