// ============================================================================
//  CONFIGURACIÓN DE LA TIENDA
//  Este es el archivo que se edita para cada cliente nuevo: nombre, contacto,
//  categorías, portada y textos. Los colores están en src/app/globals.css
//  (@theme) y los productos de ejemplo en src/lib/datos.ts.
// ============================================================================

import { CreditCard, ShieldCheck, Store, Truck, type LucideIcon } from "lucide-react";

export type Categoria = {
  id: string; // se usa en la URL: /catalogo?filtro=<id>
  nombre: string;
  descripcion: string; // texto corto bajo el nombre en la portada
  foto: string;
  pos?: string; // encuadre de la foto (CSS object-position)
};

export type Slide = {
  foto: string;
  alt: string;
  eyebrow: string;
  titulo: string;
  texto: string;
  cta: string;
  href: string;
  lado: "left" | "right"; // de qué lado va la tarjeta de texto
  pos?: string;
};

export type Beneficio = { icono: LucideIcon; titulo: string; texto: string };

export type Vitrina = {
  id: string;
  eyebrow: string;
  titulo: string;
  texto: string;
  slugs: string[]; // productos que se muestran (máx. 4 se ve mejor)
  href: string;
  cta: string;
};

export const TIENDA = {
  // --- Marca ---
  nombre: "Mi Tienda",
  bajada: "Tienda online", // texto pequeño bajo el nombre en el logo
  descripcion: "Productos seleccionados con stock real del local. Retiro gratis en tienda o despacho a domicilio.",
  // Logo: deja "" para usar las iniciales del nombre, o pon una imagen en /public (ej: "/logo.png").
  logo: "",

  // Franja superior (en celular se muestra la versión corta).
  aviso: {
    corto: "Retiro gratis en tienda · Pago seguro",
    largo: "Retiro gratis en tienda · Despacho a [COMUNAS DE DESPACHO] · Pago seguro con Webpay o Mercado Pago",
  },

  // --- Contacto y local ---
  contacto: {
    direccion: "[DIRECCIÓN DEL LOCAL]",
    horario: "[HORARIO DE ATENCIÓN]",
    whatsapp: "[NÚMERO]",
    whatsappUrl: "https://wa.me/", // ej: https://wa.me/56912345678
    instagram: "[@CUENTA]",
  },

  // --- Envío y pago ---
  envio: {
    costo: 3990, // costo de ejemplo del despacho
    cobertura: "[COMUNAS DE DESPACHO]",
    preparacion: "[TIEMPO DE PREPARACIÓN]",
  },
  cuotas: "hasta 3 cuotas sin interés",

  // --- Catálogo ---
  categorias: [
    { id: "hogar", nombre: "Hogar", descripcion: "Tazas, cojines y decoración", foto: "/ejemplo/categoria-hogar.svg" },
    { id: "oficina", nombre: "Oficina", descripcion: "Cuadernos, lápices y escritorio", foto: "/ejemplo/categoria-oficina.svg" },
    { id: "accesorios", nombre: "Accesorios", descripcion: "Bolsos, botellas y relojes", foto: "/ejemplo/categoria-accesorios.svg" },
  ] as Categoria[],
  // Categoría con acceso directo en la barra inferior del celular.
  categoriaDestacada: "hogar",
  porPagina: 8, // productos por página en el catálogo

  // --- Portada ---
  slides: [
    {
      foto: "/ejemplo/banner-1.svg",
      alt: "Productos de ejemplo para el hogar",
      eyebrow: "Nueva temporada",
      titulo: "Lo nuevo para tu casa",
      texto: "Cambia este texto en src/config/tienda.ts. Cada banner tiene foto, título, texto y un botón.",
      cta: "Ver hogar",
      href: "/catalogo?filtro=hogar",
      lado: "left",
      pos: "72% center", // en celular se ve el lado derecho de la imagen
    },
    {
      foto: "/ejemplo/banner-2.svg",
      alt: "Productos de ejemplo para la oficina",
      eyebrow: "Oficina",
      titulo: "Ordena tu escritorio",
      texto: "Cuadernos, lápices y lámparas con stock real del local.",
      cta: "Ver oficina",
      href: "/catalogo?filtro=oficina",
      lado: "right",
      pos: "28% center",
    },
    {
      foto: "/ejemplo/banner-3.svg",
      alt: "Accesorios de ejemplo",
      eyebrow: "Para regalar",
      titulo: "Accesorios para todos los días",
      texto: "Retira gratis en el local o recíbelo en tu casa.",
      cta: "Ver accesorios",
      href: "/catalogo?filtro=accesorios",
      lado: "left",
      pos: "72% center",
    },
  ] as Slide[],

  beneficios: [
    { icono: ShieldCheck, titulo: "Compra segura", texto: "Productos originales, con boleta." },
    { icono: Store, titulo: "Retiro gratis", texto: "Compra online y pasa a buscarlo al local." },
    { icono: Truck, titulo: "Despacho a domicilio", texto: "Cobertura: [COMUNAS DE DESPACHO]." },
    { icono: CreditCard, titulo: "Pago seguro", texto: "Débito y crédito con Webpay o Mercado Pago." },
  ] as Beneficio[],

  vitrinas: [
    {
      id: "titulo-mas-vendidos",
      eyebrow: "Los favoritos",
      titulo: "Lo más vendido",
      texto: "Los productos que más salen del local este mes.",
      slugs: ["taza-ceramica", "botella-termica", "cuaderno-a5", "bolso-lona"],
      href: "/catalogo",
      cta: "Ver todo el catálogo",
    },
    {
      id: "titulo-hogar",
      eyebrow: "Hogar",
      titulo: "Para tu casa",
      texto: "Detalles que hacen la diferencia.",
      slugs: ["cojin-lino", "planta-maceta", "lampara-mesa", "taza-ceramica"],
      href: "/catalogo?filtro=hogar",
      cta: "Ver todo hogar",
    },
  ] as Vitrina[],

  // Bloque grande entre las vitrinas.
  destacado: {
    slug: "lampara-mesa",
    eyebrow: "Producto destacado",
    texto: "Usa este bloque para el producto que el dueño quiera empujar: una novedad, una oferta o el más vendido.",
  },

  // Bloque final de contacto.
  ayuda: {
    titulo: "¿Necesitas ayuda?",
    texto: "Escríbenos y te ayudamos a elegir. También armamos paquetes de regalo.",
  },

  // Clave del almacenamiento de la demo en el navegador. Cámbiala si cambias los datos de ejemplo.
  claveDemo: "tienda-demo-v1",
};

export function categoriaPorId(id: string) {
  return TIENDA.categorias.find((c) => c.id === id);
}

export function iniciales(nombre: string) {
  return nombre
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
}
