// Productos de ejemplo de la demo (perfumería). Para otra tienda, reemplázalos.
// Cuando se conecte Supabase, esto pasa a ser una consulta a las tablas
// `productos` y `variantes` de database/schema.sql.

import { TIENDA } from "@/config/tienda";

export type Variante = {
  id: string; // ej: "sauvage-100"
  nombre: string; // lo que elige el cliente: tamaño, talla, color… (ej: "100 ml", "Talla M")
  precio: number;
  codigo: string; // código de barras
  minimo: number; // con esta cantidad o menos aparece en "Por reponer"
};

export type Atributo = { nombre: string; valor: string };

export type Producto = {
  slug: string;
  nombre: string;
  marca: string;
  categorias: string[]; // ids de categorías de src/config/tienda.ts (la primera es la principal)
  resumen: string; // línea corta bajo el nombre (ej: "Eau de Parfum · 100 ml")
  foto: string;
  creditoFoto?: string;
  avisoFoto?: string; // etiqueta sobre la foto en la tarjeta (ej: "Ilustración")
  badge?: string;
  descripcion: string;
  caracteristicas: string[]; // etiquetas cortas
  atributos: Atributo[]; // ficha técnica (en perfumes: notas, origen…)
  online: boolean;
  caja: boolean;
  nuevo?: boolean;
  variantes: Variante[];
  varianteDestacada?: string; // id de la variante que se agrega desde la tarjeta (si tiene stock)
};

const ILUSTRACION = "Ilustración referencial: se reemplaza por la foto del proveedor";

// Ayuda para no repetir: las notas olfativas van como ficha técnica.
const notas = (salida: string, corazon: string, fondo: string, origen: string): Atributo[] => [
  { nombre: "Notas de salida", valor: salida },
  { nombre: "Notas de corazón", valor: corazon },
  { nombre: "Notas de fondo", valor: fondo },
  { nombre: "Origen", valor: origen },
];

export const PRODUCTOS: Producto[] = [
  // ---------- Perfumería árabe ----------
  {
    slug: "lattafa-khamrah",
    nombre: "Khamrah",
    marca: "Lattafa",
    categorias: ["arabe", "unisex"],
    resumen: "Eau de Parfum · 100 ml",
    foto: "/fotos/ilustraciones/lattafa-khamrah.svg",
    creditoFoto: ILUSTRACION,
    avisoFoto: "Ilustración",
    badge: "Más vendido",
    descripcion:
      "Dulce, cálido y especiado, con dátiles, canela y vainilla. Dura todo el día y es el árabe más pedido del local.",
    caracteristicas: ["Oriental especiada", "Noche", "Otoño e invierno"],
    atributos: notas("Canela, nuez moscada, bergamota", "Dátiles, praliné, tuberosa", "Vainilla, haba tonka, benjuí", "Emiratos Árabes Unidos"),
    online: true,
    caja: true,
    variantes: [{ id: "khamrah-100", nombre: "100 ml", precio: 39990, codigo: "7800001000208", minimo: 3 }],
  },
  {
    slug: "lattafa-asad",
    nombre: "Asad",
    marca: "Lattafa",
    categorias: ["arabe", "hombre"],
    resumen: "Eau de Parfum · 100 ml",
    foto: "/fotos/ilustraciones/lattafa-asad.svg",
    creditoFoto: ILUSTRACION,
    avisoFoto: "Ilustración",
    badge: "Favorito",
    descripcion: "Intenso y elegante: pimienta negra, tabaco y vainilla. Un perfume con mucha presencia a muy buen precio.",
    caracteristicas: ["Ámbar especiada", "Noche", "Otoño e invierno"],
    atributos: notas("Pimienta negra, piña, tabaco", "Café, pachulí, iris", "Ámbar, vainilla, benjuí", "Emiratos Árabes Unidos"),
    online: true,
    caja: true,
    variantes: [{ id: "asad-100", nombre: "100 ml", precio: 34990, codigo: "7800001000215", minimo: 3 }],
  },
  {
    slug: "lattafa-yara",
    nombre: "Yara",
    marca: "Lattafa",
    categorias: ["arabe", "mujer"],
    resumen: "Eau de Parfum · 100 ml",
    foto: "/fotos/ilustraciones/lattafa-yara.svg",
    creditoFoto: ILUSTRACION,
    avisoFoto: "Ilustración",
    badge: "Tendencia",
    descripcion: "Cremoso y dulce, con orquídea, frutas tropicales y vainilla. Suave para el día y muy fácil de regalar.",
    caracteristicas: ["Floral gourmand", "Día y noche", "Todo el año"],
    atributos: notas("Orquídea, heliotropo, mandarina", "Acorde gourmand, frutas tropicales", "Vainilla, almizcle, sándalo", "Emiratos Árabes Unidos"),
    online: true,
    caja: true,
    variantes: [{ id: "yara-100", nombre: "100 ml", precio: 32990, codigo: "7800001000222", minimo: 3 }],
  },
  {
    slug: "armaf-club-de-nuit-intense",
    nombre: "Club de Nuit Intense Man",
    marca: "Armaf",
    categorias: ["arabe", "hombre"],
    resumen: "Eau de Toilette · 105 ml",
    foto: "/fotos/ilustraciones/armaf-club-de-nuit.svg",
    creditoFoto: ILUSTRACION,
    avisoFoto: "Ilustración",
    badge: "Clásico",
    descripcion: "Frutal y ahumado, con piña, limón y abedul. Uno de los árabes masculinos más conocidos.",
    caracteristicas: ["Chipre frutal", "Día y noche", "Todo el año"],
    atributos: notas("Limón, piña, grosella negra, manzana", "Abedul, jazmín, rosa", "Almizcle, ámbar gris, pachulí", "Emiratos Árabes Unidos"),
    online: true,
    caja: true,
    variantes: [{ id: "cdn-105", nombre: "105 ml", precio: 44990, codigo: "7800001000239", minimo: 2 }],
  },
  {
    slug: "al-haramain-amber-oud",
    nombre: "Amber Oud Gold Edition",
    marca: "Al Haramain",
    categorias: ["arabe", "unisex"],
    resumen: "Eau de Parfum · 60 / 120 ml",
    foto: "/fotos/ilustraciones/al-haramain-amber-oud.svg",
    creditoFoto: ILUSTRACION,
    avisoFoto: "Ilustración",
    descripcion: "Luminoso y dulce, con melón, ámbar y almizcle. Una estela que se nota apenas entras a una sala.",
    caracteristicas: ["Ámbar dulce", "Día y noche", "Todo el año"],
    atributos: notas("Bergamota, notas verdes", "Melón, piña", "Ámbar, almizcle, vainilla", "Emiratos Árabes Unidos"),
    online: true,
    caja: true,
    variantes: [
      { id: "amber-oud-60", nombre: "60 ml", precio: 59990, codigo: "7800001000246", minimo: 2 },
      { id: "amber-oud-120", nombre: "120 ml", precio: 89990, codigo: "7800001000253", minimo: 1 },
    ],
  },
  {
    slug: "afnan-9pm",
    nombre: "9PM",
    marca: "Afnan",
    categorias: ["arabe", "hombre"],
    resumen: "Eau de Parfum · 100 ml",
    foto: "/fotos/ilustraciones/afnan-9pm.svg",
    creditoFoto: ILUSTRACION,
    avisoFoto: "Ilustración",
    descripcion: "Manzana, canela y vainilla: dulce, juvenil y pensado para salir de noche.",
    caracteristicas: ["Oriental vainilla", "Noche", "Otoño e invierno"],
    atributos: notas("Manzana, canela, lavanda", "Azahar, lirio de los valles", "Vainilla, haba tonka, ámbar", "Emiratos Árabes Unidos"),
    online: true,
    caja: true,
    variantes: [{ id: "9pm-100", nombre: "100 ml", precio: 37990, codigo: "7800001000260", minimo: 2 }],
  },
  {
    slug: "rasasi-dhan-oud-kambodi",
    nombre: "Dhan Oud Kambodi",
    marca: "Rasasi",
    categorias: ["arabe", "unisex"],
    resumen: "Aceite perfumado (attar) · 12 ml",
    foto: "/fotos/rasasi-dhan-oud.jpg",
    creditoFoto: "Miansari66, Wikimedia Commons, CC0",
    badge: "Exclusivo",
    descripcion:
      "Aceite de oud camboyano, sin alcohol, en frasco de cristal tallado. Unas gotas bastan: profundo, amaderado y muy duradero.",
    caracteristicas: ["Oud", "Sin alcohol", "Ocasiones especiales"],
    atributos: notas("Oud", "Oud camboyano, rosa", "Ámbar, almizcle", "Emiratos Árabes Unidos"),
    online: true,
    caja: true,
    variantes: [{ id: "dhan-oud-12", nombre: "12 ml", precio: 49990, codigo: "7800001000277", minimo: 1 }],
  },
  {
    slug: "oud-al-arabia",
    nombre: "Oud Al Arabia",
    marca: "Tauseef",
    categorias: ["arabe", "unisex"],
    resumen: "Eau de Parfum · 100 ml",
    foto: "/fotos/oud-al-arabia.jpg",
    creditoFoto: "Tauseef perfumes, Wikimedia Commons, CC BY-SA 4.0",
    descripcion: "Oud con rosa y azafrán, en su caja tradicional. Una buena puerta de entrada al mundo del oud.",
    caracteristicas: ["Oud floral", "Noche", "Otoño e invierno"],
    atributos: notas("Azafrán", "Rosa", "Oud, maderas", "Pakistán"),
    online: true,
    caja: true,
    variantes: [{ id: "oud-arabia-100", nombre: "100 ml", precio: 29990, codigo: "7800001000284", minimo: 2 }],
  },

  // ---------- Diseñador ----------
  {
    slug: "dior-sauvage",
    nombre: "Sauvage",
    marca: "Dior",
    categorias: ["disenador", "hombre"],
    resumen: "Eau de Toilette · 30 / 100 / 300 ml",
    foto: "/fotos/sauvage.jpg",
    creditoFoto: "DYVER, Wikimedia Commons, CC BY-SA 4.0",
    badge: "Más vendido",
    descripcion:
      "Fresco y especiado, con una estela amaderada que dura todo el día. Uno de los perfumes masculinos más vendidos: sirve para la oficina, para salir o para regalar.",
    caracteristicas: ["Aromática fougère", "Día y noche", "Todo el año"],
    atributos: notas("Bergamota, pimienta", "Lavanda, geranio, pimienta rosa", "Ambroxan, cedro, ládano", "Francia"),
    online: true,
    caja: true,
    variantes: [
      { id: "sauvage-30", nombre: "30 ml", precio: 69990, codigo: "7800001000116", minimo: 2 },
      { id: "sauvage-100", nombre: "100 ml", precio: 129990, codigo: "7800001000017", minimo: 2 },
      { id: "sauvage-300", nombre: "Recarga 300 ml", precio: 219990, codigo: "7800001000123", minimo: 1 },
    ],
    varianteDestacada: "sauvage-100",
  },
  {
    slug: "chanel-n5",
    nombre: "N°5",
    marca: "Chanel",
    categorias: ["disenador", "mujer"],
    resumen: "Eau de Parfum · 50 / 100 ml",
    foto: "/fotos/chanel5.jpg",
    creditoFoto: "Kevin Rheese, Wikimedia Commons, CC BY 2.0",
    badge: "Clásico",
    descripcion: "El perfume más famoso del mundo. Floral, empolvado y elegante: un regalo que no pasa de moda.",
    caracteristicas: ["Floral aldehídica", "Ocasiones especiales", "Otoño e invierno"],
    atributos: notas("Aldehídos, neroli", "Jazmín, rosa de mayo", "Sándalo, vainilla", "Francia"),
    online: true,
    caja: true,
    variantes: [
      { id: "n5-50", nombre: "50 ml", precio: 139990, codigo: "7800001000130", minimo: 1 },
      { id: "n5-100", nombre: "100 ml", precio: 189990, codigo: "7800001000024", minimo: 2 },
    ],
    varianteDestacada: "n5-100",
  },
  {
    slug: "chanel-coco-mademoiselle",
    nombre: "Coco Mademoiselle",
    marca: "Chanel",
    categorias: ["disenador", "mujer"],
    resumen: "Eau de Parfum · 100 ml",
    foto: "/fotos/coco.jpg",
    creditoFoto: "Brownchl, Wikimedia Commons, CC BY 3.0",
    badge: "Favorito",
    descripcion: "Fresco y sofisticado, con naranja, rosa y pachulí. Uno de los más pedidos para regalo.",
    caracteristicas: ["Chipre floral", "Día y noche", "Todo el año"],
    atributos: notas("Naranja, bergamota", "Rosa, jazmín", "Pachulí, vetiver", "Francia"),
    online: true,
    caja: true,
    variantes: [{ id: "coco-100", nombre: "100 ml", precio: 184990, codigo: "7800001000079", minimo: 2 }],
  },
  {
    slug: "ysl-black-opium",
    nombre: "Black Opium",
    marca: "Yves Saint Laurent",
    categorias: ["disenador", "mujer"],
    resumen: "Eau de Parfum · 90 ml",
    foto: "/fotos/black-opium.jpg",
    creditoFoto: "Dsuarez04, Wikimedia Commons, CC BY-SA 4.0",
    descripcion: "Café, vainilla y flores blancas. Dulce, adictivo y perfecto para la noche.",
    caracteristicas: ["Oriental gourmand", "Noche", "Otoño e invierno"],
    atributos: notas("Pera, pimienta rosa, azahar", "Café, jazmín", "Vainilla, pachulí, cedro", "Francia"),
    online: true,
    caja: true,
    variantes: [{ id: "opium-90", nombre: "90 ml", precio: 134990, codigo: "7800001000291", minimo: 2 }],
  },
  {
    slug: "rabanne-1-million",
    nombre: "1 Million",
    marca: "Rabanne",
    categorias: ["disenador", "hombre"],
    resumen: "Eau de Toilette · 100 ml",
    foto: "/fotos/million.jpg",
    creditoFoto: "Jacek Halicki, Wikimedia Commons, CC BY-SA 4.0",
    descripcion: "El clásico dorado: especiado, dulce y cálido. Ideal para salir de noche.",
    caracteristicas: ["Especiada amaderada", "Noche", "Otoño e invierno"],
    atributos: notas("Mandarina, menta", "Canela, rosa", "Cuero, ámbar", "España"),
    online: true,
    caja: true,
    variantes: [{ id: "million-100", nombre: "100 ml", precio: 99990, codigo: "7800001000048", minimo: 2 }],
  },
  {
    slug: "armani-acqua-di-gio",
    nombre: "Acqua di Giò",
    marca: "Giorgio Armani",
    categorias: ["disenador", "hombre"],
    resumen: "Eau de Toilette · 100 ml",
    foto: "/fotos/acqua.jpg",
    creditoFoto: "Javier Velez, Wikimedia Commons, CC BY-SA 3.0",
    descripcion: "Notas marinas y cítricas para el día a día. Liviano, limpio y fácil de usar.",
    caracteristicas: ["Acuática cítrica", "Día", "Primavera y verano"],
    atributos: notas("Lima, bergamota", "Notas marinas, romero", "Cedro, almizcle", "Italia"),
    online: true,
    caja: true,
    variantes: [{ id: "acqua-100", nombre: "100 ml", precio: 109990, codigo: "7800001000055", minimo: 2 }],
  },
  {
    slug: "hugo-boss-hugo-man",
    nombre: "Hugo Man",
    marca: "Hugo Boss",
    categorias: ["disenador", "hombre"],
    resumen: "Eau de Toilette · 125 ml",
    foto: "/fotos/hugo.jpg",
    creditoFoto: "Rypptc, Wikimedia Commons, CC BY-SA 4.0",
    descripcion: "Verde, fresco y con manzana. El clásico de la cantimplora, para el día a día.",
    caracteristicas: ["Aromática verde", "Día", "Primavera y verano"],
    atributos: notas("Manzana verde, menta, lavanda", "Salvia, geranio, clavel", "Abeto, cedro, pachulí", "Alemania"),
    online: true,
    caja: true,
    variantes: [{ id: "hugo-125", nombre: "125 ml", precio: 79990, codigo: "7800001000086", minimo: 2 }],
  },
];

// Stock inicial por variante (lo que hay en el local). Algunos bajos o en cero para mostrar las alertas.
export const STOCK_INICIAL: Record<string, number> = {
  "khamrah-100": 14,
  "asad-100": 9,
  "yara-100": 7,
  "cdn-105": 5,
  "amber-oud-60": 2,
  "amber-oud-120": 1,
  "9pm-100": 6,
  "dhan-oud-12": 1,
  "oud-arabia-100": 8,
  "sauvage-30": 2,
  "sauvage-100": 6,
  "sauvage-300": 0,
  "n5-50": 2,
  "n5-100": 3,
  "coco-100": 4,
  "opium-90": 2,
  "million-100": 5,
  "acqua-100": 1,
  "hugo-125": 0,
};

export type EstadoPedido = "pagado" | "preparando" | "enviado" | "entregado";

export type Pedido = {
  num: number;
  cliente: string;
  resumen: string;
  entrega: "retiro" | "despacho";
  total: number;
  estado: EstadoPedido;
  regalo?: { mensaje: string }; // si el cliente pidió envolver para regalo
};

export const PEDIDOS_INICIALES: Pedido[] = [
  { num: 1045, cliente: "Camila R.", resumen: "Lattafa Khamrah 100 ml ×2, Dior Sauvage 100 ml", entrega: "retiro", total: 209970, estado: "pagado" },
  { num: 1044, cliente: "Jorge P.", resumen: "Armaf Club de Nuit Intense Man 105 ml", entrega: "despacho", total: 48980, estado: "preparando" },
  { num: 1043, cliente: "Valentina S.", resumen: "Al Haramain Amber Oud Gold Edition 60 ml", entrega: "retiro", total: 59990, estado: "enviado" },
  { num: 1042, cliente: "Andrés M.", resumen: "Rabanne 1 Million 100 ml", entrega: "despacho", total: 103980, estado: "entregado" },
];

export const COSTO_ENVIO = TIENDA.envio.costo;

// Marcas que aparecen en la portada y como sugerencia al agregar productos.
export const MARCAS = [...new Set(PRODUCTOS.map((p) => p.marca))];

export function formatoPrecio(n: number) {
  const signo = n < 0 ? "-" : "";
  return signo + "$" + String(Math.abs(Math.round(n))).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function nombreVariante(v: Variante) {
  return v.nombre;
}

// Variante que se muestra primero (en la tarjeta y al abrir el producto):
// la destacada si tiene stock; si no, la primera con stock.
export function variantePrincipal(p: Producto, stockDe: (id: string) => number) {
  const destacada = p.variantes.find((v) => v.id === p.varianteDestacada);
  if (destacada && stockDe(destacada.id) > 0) return destacada;
  return p.variantes.find((v) => stockDe(v.id) > 0) ?? destacada ?? p.variantes[0];
}
