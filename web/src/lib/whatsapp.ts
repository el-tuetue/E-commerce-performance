import { TIENDA } from "@/config/tienda";
import { nombreVariante, type Producto, type Variante } from "./datos";

// Link de WhatsApp con el mensaje ya escrito. El número se define en
// src/config/tienda.ts (contacto.whatsappUrl, ej: https://wa.me/56912345678).
export function linkWhatsApp(texto: string) {
  return `${TIENDA.contacto.whatsappUrl}?text=${encodeURIComponent(texto)}`;
}

export function mensajeProducto(producto: Producto, variante?: Variante) {
  const opcion = variante && producto.variantes.length > 1 ? ` (${nombreVariante(variante)})` : "";
  return `Hola ${TIENDA.nombre}, me interesa el ${producto.marca} ${producto.nombre}${opcion}. ¿Está disponible?`;
}
