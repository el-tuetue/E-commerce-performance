// ============================================================================
//  CONFIGURACIÓN DE LA TIENDA
//  Este es el archivo que se edita para cada cliente: nombre, contacto,
//  categorías, portada y textos. Los colores están en src/app/globals.css
//  (@theme) y los productos en src/lib/datos.ts.
//  Configuración actual: perfumería Nube Aromática.
// ============================================================================

import { CreditCard, ShieldCheck, Store, Truck, type LucideIcon } from "lucide-react";

export type Categoria = {
  id: string; // se usa en la URL: /catalogo?filtro=<id>
  nombre: string;
  descripcion: string; // texto corto bajo el nombre en la portada
  foto: string;
  pos?: string; // encuadre de la foto (CSS object-position)
  enPortada?: boolean; // false = solo aparece como filtro del catálogo (no en la portada ni en el menú)
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
  pos?: string; // encuadre de la foto; en celular se ve solo una parte
};

export type Beneficio = { icono: LucideIcon; titulo: string; texto: string };

export type Vitrina = {
  id: string;
  eyebrow: string;
  titulo: string;
  texto: string;
  slugs: string[]; // productos que se muestran (4 se ve mejor)
  href: string;
  cta: string;
};

// Producto que se carga con "Rellenar con un ejemplo" en el panel (Agregar producto).
export type EjemploProducto = {
  nombre: string;
  marca: string;
  categorias: string[];
  resumen: string;
  descripcion: string;
  caracteristicas: string[];
  foto: string;
  variantes: { nombre: string; precio: string; stock: string; codigo: string }[];
};

export const TIENDA = {
  // --- Marca ---
  nombre: "Nube Aromática",
  bajada: "Perfumería", // texto pequeño bajo el nombre en el logo
  descripcion: "Perfumes 100% originales con el stock real del local. Retiro gratis en tienda o despacho a domicilio.",
  // Logo: una imagen en /public, o "" para usar las iniciales del nombre.
  // El archivo actual mide 150 px: no mostrarlo a más de 72 px hasta tener el original.
  logo: "/logo.png",

  // Franja superior (en celular se muestra la versión corta).
  aviso: {
    corto: "Especialistas en perfumería árabe · 100% originales",
    largo: "Especialistas en perfumería árabe · 100% originales · Retiro gratis en tienda · Despacho a [COMUNAS DE DESPACHO]",
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
  cuotas: "Precio referencial · hasta 3 cuotas sin interés",

  // --- Catálogo ---
  // Un perfume puede estar en varias categorías (ej: "Árabes" y "Hombre").
  categorias: [
    { id: "arabe", nombre: "Árabes", descripcion: "Oud, ámbar y bakhoor", foto: "/fotos/bakhoor.jpg", pos: "center 40%" },
    { id: "mujer", nombre: "Mujer", descripcion: "Lattafa Yara, Chanel, YSL", foto: "/fotos/coco.jpg" },
    { id: "hombre", nombre: "Hombre", descripcion: "Lattafa Asad, Armaf, Dior", foto: "/fotos/acqua.jpg", pos: "center 35%" },
    { id: "unisex", nombre: "Unisex", descripcion: "Para compartir", foto: "/fotos/rasasi-dhan-oud.jpg", enPortada: false },
    { id: "disenador", nombre: "Diseñador", descripcion: "Dior, Chanel, YSL y más", foto: "/fotos/chanel5.jpg", enPortada: false },
  ] as Categoria[],
  // Categoría con acceso directo en la barra inferior del celular.
  categoriaDestacada: "arabe",
  porPagina: 8, // productos por página en el catálogo
  // Cómo se llaman los productos en los textos (ej: "12 perfumes", "No encontramos perfumes…").
  producto: { singular: "perfume", plural: "perfumes" },

  // --- Portada ---
  slides: [
    {
      foto: "/fotos/tienda-oud.jpg",
      alt: "Vitrina con perfumes árabes, oud y bakhoor",
      eyebrow: "Perfumería árabe",
      titulo: "El arte del oud",
      texto: "Lattafa, Armaf, Al Haramain, Rasasi y más. Perfumes intensos y duraderos, originales y con stock real del local.",
      cta: "Ver perfumes árabes",
      href: "/catalogo?filtro=arabe",
      lado: "left",
    },
    {
      foto: "/fotos/banner-million.jpg",
      alt: "Frasco dorado de Rabanne 1 Million Parfum",
      eyebrow: "Para él",
      titulo: "Brilla con 1 Million",
      texto: "El clásico dorado de Rabanne, especiado y cálido. Disponible en el local y online.",
      cta: "Ver perfumes de hombre",
      href: "/catalogo?filtro=hombre",
      lado: "right",
      pos: "30% center",
    },
    {
      foto: "/fotos/chanel5.jpg",
      alt: "Frasco de Chanel N°5 iluminado",
      eyebrow: "Para ella",
      titulo: "La elegancia de Chanel",
      texto: "N°5 y Coco Mademoiselle, dos íconos que nunca fallan como regalo.",
      cta: "Ver perfumes de mujer",
      href: "/catalogo?filtro=mujer",
      lado: "left",
    },
  ] as Slide[],

  beneficios: [
    { icono: ShieldCheck, titulo: "100% originales", texto: "Los mismos perfumes que vendemos en el local." },
    { icono: Store, titulo: "Retiro gratis", texto: "Compra online y pasa a buscarlo al local." },
    { icono: Truck, titulo: "Despacho a domicilio", texto: "Cobertura: [COMUNAS DE DESPACHO]." },
    { icono: CreditCard, titulo: "Pago seguro", texto: "Débito y crédito con Webpay o Mercado Pago." },
  ] as Beneficio[],

  vitrinas: [
    {
      id: "titulo-arabes",
      eyebrow: "Nuestra especialidad",
      titulo: "Los árabes más pedidos",
      texto: "Intensos, duraderos y a muy buen precio. Si no sabes por cuál partir, empieza por estos.",
      slugs: ["lattafa-khamrah", "lattafa-asad", "lattafa-yara", "armaf-club-de-nuit-intense"],
      href: "/catalogo?filtro=arabe",
      cta: "Ver todos los árabes",
    },
    {
      id: "titulo-disenador",
      eyebrow: "Clásicos de siempre",
      titulo: "Perfumes de diseñador",
      texto: "Los íconos de Dior, Chanel, Rabanne e Yves Saint Laurent, originales y con stock real.",
      slugs: ["dior-sauvage", "chanel-n5", "rabanne-1-million", "ysl-black-opium"],
      href: "/catalogo?filtro=disenador",
      cta: "Ver todos los de diseñador",
    },
  ] as Vitrina[],

  // Bloque grande entre las vitrinas.
  destacado: {
    slug: "rasasi-dhan-oud-kambodi",
    eyebrow: "La joya de la casa",
  },

  // Bloque final de contacto.
  ayuda: {
    titulo: "¿No sabes cuál elegir?",
    texto: "Escríbenos y te recomendamos según el gusto de quien lo va a usar. También armamos paquetes de regalo.",
  },

  ejemploProducto: {
    nombre: "1 Million Parfum",
    marca: "Rabanne",
    categorias: ["disenador", "hombre"],
    resumen: "Parfum · 50 / 100 ml",
    descripcion: "La versión más intensa del clásico dorado: cuero, ámbar y flor de naranjo. Ideal para la noche.",
    caracteristicas: ["Ámbar amaderada", "Noche"],
    foto: "/fotos/banner-million.jpg",
    variantes: [
      { nombre: "50 ml", precio: "104990", stock: "4", codigo: "7800001000093" },
      { nombre: "100 ml", precio: "139990", stock: "3", codigo: "7800001000109" },
    ],
  } as EjemploProducto,

  // Créditos de las fotos (obligatorios si usas fotos con licencia CC). "" para no mostrar nada.
  creditosFotos:
    "Fotos referenciales de Wikimedia Commons (CC0, CC BY, CC BY-SA): DYVER, Kevin Rheese, Brownchl, Dsuarez04, Jacek Halicki, Javier Velez, Rypptc, Miansari66, Tauseef perfumes, Fseddiqi1983, آية سعيد البيطار. Las ilustraciones de frascos son referenciales.",

  // Clave del almacenamiento de la demo en el navegador. Cámbiala si cambias los datos de ejemplo.
  claveDemo: "nube-demo-v3",
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
