// Datos de ejemplo para la demo. Cuando se conecte Supabase, esto se reemplaza
// por consultas a las tablas `productos` y `variantes` de database/schema.sql.

export type Genero = "mujer" | "hombre" | "unisex";
export type Linea = "arabe" | "disenador";

export type Variante = {
  id: string; // ej: "sauvage-100"
  ml: number;
  etiqueta?: string; // ej: "Recarga 300 ml"
  precio: number;
  codigo: string; // código de barras
  minimo: number; // bajo esta cantidad aparece en "Por reponer"
};

export type Producto = {
  slug: string;
  nombre: string;
  marca: string;
  concentracion: string;
  genero: Genero;
  linea: Linea;
  familia: string;
  foto: string;
  creditoFoto?: string;
  ilustracion?: boolean; // true = dibujo referencial, falta la foto real del proveedor
  badge?: string;
  descripcion: string;
  notas: { salida: string; corazon: string; fondo: string };
  ocasion: string;
  temporada: string;
  origen: string;
  online: boolean;
  caja: boolean;
  nuevo?: boolean;
  variantes: Variante[];
};

const ILUSTRACION = "Ilustración referencial: se reemplaza por la foto del proveedor";

export const PRODUCTOS: Producto[] = [
  // ---------- Perfumería árabe ----------
  {
    slug: "lattafa-khamrah",
    nombre: "Khamrah",
    marca: "Lattafa",
    concentracion: "Eau de Parfum",
    genero: "unisex",
    linea: "arabe",
    familia: "Oriental especiada",
    foto: "/fotos/ilustraciones/lattafa-khamrah.svg",
    ilustracion: true,
    creditoFoto: ILUSTRACION,
    badge: "Más vendido",
    descripcion:
      "Dulce, cálido y especiado, con dátiles, canela y vainilla. Dura todo el día y es el árabe más pedido del local.",
    notas: { salida: "Canela, nuez moscada, bergamota", corazon: "Dátiles, praliné, tuberosa", fondo: "Vainilla, haba tonka, benjuí" },
    ocasion: "Noche",
    temporada: "Otoño e invierno",
    origen: "Emiratos Árabes Unidos",
    online: true,
    caja: true,
    variantes: [{ id: "khamrah-100", ml: 100, precio: 39990, codigo: "7800001000208", minimo: 3 }],
  },
  {
    slug: "lattafa-asad",
    nombre: "Asad",
    marca: "Lattafa",
    concentracion: "Eau de Parfum",
    genero: "hombre",
    linea: "arabe",
    familia: "Ámbar especiada",
    foto: "/fotos/ilustraciones/lattafa-asad.svg",
    ilustracion: true,
    creditoFoto: ILUSTRACION,
    badge: "Favorito",
    descripcion: "Intenso y elegante: pimienta negra, tabaco y vainilla. Un perfume con mucha presencia a muy buen precio.",
    notas: { salida: "Pimienta negra, piña, tabaco", corazon: "Café, pachulí, iris", fondo: "Ámbar, vainilla, benjuí" },
    ocasion: "Noche",
    temporada: "Otoño e invierno",
    origen: "Emiratos Árabes Unidos",
    online: true,
    caja: true,
    variantes: [{ id: "asad-100", ml: 100, precio: 34990, codigo: "7800001000215", minimo: 3 }],
  },
  {
    slug: "lattafa-yara",
    nombre: "Yara",
    marca: "Lattafa",
    concentracion: "Eau de Parfum",
    genero: "mujer",
    linea: "arabe",
    familia: "Floral gourmand",
    foto: "/fotos/ilustraciones/lattafa-yara.svg",
    ilustracion: true,
    creditoFoto: ILUSTRACION,
    badge: "Tendencia",
    descripcion: "Cremoso y dulce, con orquídea, frutas tropicales y vainilla. Suave para el día y muy fácil de regalar.",
    notas: { salida: "Orquídea, heliotropo, mandarina", corazon: "Acorde gourmand, frutas tropicales", fondo: "Vainilla, almizcle, sándalo" },
    ocasion: "Día y noche",
    temporada: "Todo el año",
    origen: "Emiratos Árabes Unidos",
    online: true,
    caja: true,
    variantes: [{ id: "yara-100", ml: 100, precio: 32990, codigo: "7800001000222", minimo: 3 }],
  },
  {
    slug: "armaf-club-de-nuit-intense",
    nombre: "Club de Nuit Intense Man",
    marca: "Armaf",
    concentracion: "Eau de Toilette",
    genero: "hombre",
    linea: "arabe",
    familia: "Chipre frutal",
    foto: "/fotos/ilustraciones/armaf-club-de-nuit.svg",
    ilustracion: true,
    creditoFoto: ILUSTRACION,
    badge: "Clásico",
    descripcion: "Frutal y ahumado, con piña, limón y abedul. Uno de los árabes masculinos más conocidos.",
    notas: { salida: "Limón, piña, grosella negra, manzana", corazon: "Abedul, jazmín, rosa", fondo: "Almizcle, ámbar gris, pachulí" },
    ocasion: "Día y noche",
    temporada: "Todo el año",
    origen: "Emiratos Árabes Unidos",
    online: true,
    caja: true,
    variantes: [{ id: "cdn-105", ml: 105, precio: 44990, codigo: "7800001000239", minimo: 2 }],
  },
  {
    slug: "al-haramain-amber-oud",
    nombre: "Amber Oud Gold Edition",
    marca: "Al Haramain",
    concentracion: "Eau de Parfum",
    genero: "unisex",
    linea: "arabe",
    familia: "Ámbar dulce",
    foto: "/fotos/ilustraciones/al-haramain-amber-oud.svg",
    ilustracion: true,
    creditoFoto: ILUSTRACION,
    descripcion: "Luminoso y dulce, con melón, ámbar y almizcle. Una estela que se nota apenas entras a una sala.",
    notas: { salida: "Bergamota, notas verdes", corazon: "Melón, piña", fondo: "Ámbar, almizcle, vainilla" },
    ocasion: "Día y noche",
    temporada: "Todo el año",
    origen: "Emiratos Árabes Unidos",
    online: true,
    caja: true,
    variantes: [
      { id: "amber-oud-60", ml: 60, precio: 59990, codigo: "7800001000246", minimo: 2 },
      { id: "amber-oud-120", ml: 120, precio: 89990, codigo: "7800001000253", minimo: 1 },
    ],
  },
  {
    slug: "afnan-9pm",
    nombre: "9PM",
    marca: "Afnan",
    concentracion: "Eau de Parfum",
    genero: "hombre",
    linea: "arabe",
    familia: "Oriental vainilla",
    foto: "/fotos/ilustraciones/afnan-9pm.svg",
    ilustracion: true,
    creditoFoto: ILUSTRACION,
    descripcion: "Manzana, canela y vainilla: dulce, juvenil y pensado para salir de noche.",
    notas: { salida: "Manzana, canela, lavanda", corazon: "Azahar, lirio de los valles", fondo: "Vainilla, haba tonka, ámbar" },
    ocasion: "Noche",
    temporada: "Otoño e invierno",
    origen: "Emiratos Árabes Unidos",
    online: true,
    caja: true,
    variantes: [{ id: "9pm-100", ml: 100, precio: 37990, codigo: "7800001000260", minimo: 2 }],
  },
  {
    slug: "rasasi-dhan-oud-kambodi",
    nombre: "Dhan Oud Kambodi",
    marca: "Rasasi",
    concentracion: "Aceite perfumado (attar)",
    genero: "unisex",
    linea: "arabe",
    familia: "Oud",
    foto: "/fotos/rasasi-dhan-oud.jpg",
    creditoFoto: "Miansari66, Wikimedia Commons, CC0",
    badge: "Exclusivo",
    descripcion:
      "Aceite de oud camboyano, sin alcohol, en frasco de cristal tallado. Unas gotas bastan: profundo, amaderado y muy duradero.",
    notas: { salida: "Oud", corazon: "Oud camboyano, rosa", fondo: "Ámbar, almizcle" },
    ocasion: "Ocasiones especiales",
    temporada: "Todo el año",
    origen: "Emiratos Árabes Unidos",
    online: true,
    caja: true,
    variantes: [{ id: "dhan-oud-12", ml: 12, precio: 49990, codigo: "7800001000277", minimo: 1 }],
  },
  {
    slug: "oud-al-arabia",
    nombre: "Oud Al Arabia",
    marca: "Tauseef",
    concentracion: "Eau de Parfum",
    genero: "unisex",
    linea: "arabe",
    familia: "Oud floral",
    foto: "/fotos/oud-al-arabia.jpg",
    creditoFoto: "Tauseef perfumes, Wikimedia Commons, CC BY-SA 4.0",
    descripcion: "Oud con rosa y azafrán, en su caja tradicional. Una buena puerta de entrada al mundo del oud.",
    notas: { salida: "Azafrán", corazon: "Rosa", fondo: "Oud, maderas" },
    ocasion: "Noche",
    temporada: "Otoño e invierno",
    origen: "Pakistán",
    online: true,
    caja: true,
    variantes: [{ id: "oud-arabia-100", ml: 100, precio: 29990, codigo: "7800001000284", minimo: 2 }],
  },

  // ---------- Diseñador ----------
  {
    slug: "dior-sauvage",
    nombre: "Sauvage",
    marca: "Dior",
    concentracion: "Eau de Toilette",
    genero: "hombre",
    linea: "disenador",
    familia: "Aromática fougère",
    foto: "/fotos/sauvage.jpg",
    creditoFoto: "DYVER, Wikimedia Commons, CC BY-SA 4.0",
    badge: "Más vendido",
    descripcion:
      "Fresco y especiado, con una estela amaderada que dura todo el día. Uno de los perfumes masculinos más vendidos: sirve para la oficina, para salir o para regalar.",
    notas: { salida: "Bergamota, pimienta", corazon: "Lavanda, geranio, pimienta rosa", fondo: "Ambroxan, cedro, ládano" },
    ocasion: "Día y noche",
    temporada: "Todo el año",
    origen: "Francia",
    online: true,
    caja: true,
    variantes: [
      { id: "sauvage-30", ml: 30, precio: 69990, codigo: "7800001000116", minimo: 2 },
      { id: "sauvage-100", ml: 100, precio: 129990, codigo: "7800001000017", minimo: 2 },
      { id: "sauvage-300", ml: 300, etiqueta: "Recarga 300 ml", precio: 219990, codigo: "7800001000123", minimo: 1 },
    ],
  },
  {
    slug: "chanel-n5",
    nombre: "N°5",
    marca: "Chanel",
    concentracion: "Eau de Parfum",
    genero: "mujer",
    linea: "disenador",
    familia: "Floral aldehídica",
    foto: "/fotos/chanel5.jpg",
    creditoFoto: "Kevin Rheese, Wikimedia Commons, CC BY 2.0",
    badge: "Clásico",
    descripcion: "El perfume más famoso del mundo. Floral, empolvado y elegante: un regalo que no pasa de moda.",
    notas: { salida: "Aldehídos, neroli", corazon: "Jazmín, rosa de mayo", fondo: "Sándalo, vainilla" },
    ocasion: "Noche y ocasiones especiales",
    temporada: "Otoño e invierno",
    origen: "Francia",
    online: true,
    caja: true,
    variantes: [
      { id: "n5-50", ml: 50, precio: 139990, codigo: "7800001000130", minimo: 1 },
      { id: "n5-100", ml: 100, precio: 189990, codigo: "7800001000024", minimo: 2 },
    ],
  },
  {
    slug: "chanel-coco-mademoiselle",
    nombre: "Coco Mademoiselle",
    marca: "Chanel",
    concentracion: "Eau de Parfum",
    genero: "mujer",
    linea: "disenador",
    familia: "Chipre floral",
    foto: "/fotos/coco.jpg",
    creditoFoto: "Brownchl, Wikimedia Commons, CC BY 3.0",
    badge: "Favorito",
    descripcion: "Fresco y sofisticado, con naranja, rosa y pachulí. Uno de los más pedidos para regalo.",
    notas: { salida: "Naranja, bergamota", corazon: "Rosa, jazmín", fondo: "Pachulí, vetiver" },
    ocasion: "Día y noche",
    temporada: "Todo el año",
    origen: "Francia",
    online: true,
    caja: true,
    variantes: [{ id: "coco-100", ml: 100, precio: 184990, codigo: "7800001000079", minimo: 2 }],
  },
  {
    slug: "ysl-black-opium",
    nombre: "Black Opium",
    marca: "Yves Saint Laurent",
    concentracion: "Eau de Parfum",
    genero: "mujer",
    linea: "disenador",
    familia: "Oriental gourmand",
    foto: "/fotos/black-opium.jpg",
    creditoFoto: "Dsuarez04, Wikimedia Commons, CC BY-SA 4.0",
    descripcion: "Café, vainilla y flores blancas. Dulce, adictivo y perfecto para la noche.",
    notas: { salida: "Pera, pimienta rosa, azahar", corazon: "Café, jazmín", fondo: "Vainilla, pachulí, cedro" },
    ocasion: "Noche",
    temporada: "Otoño e invierno",
    origen: "Francia",
    online: true,
    caja: true,
    variantes: [{ id: "opium-90", ml: 90, precio: 134990, codigo: "7800001000291", minimo: 2 }],
  },
  {
    slug: "rabanne-1-million",
    nombre: "1 Million",
    marca: "Rabanne",
    concentracion: "Eau de Toilette",
    genero: "hombre",
    linea: "disenador",
    familia: "Especiada amaderada",
    foto: "/fotos/million.jpg",
    creditoFoto: "Jacek Halicki, Wikimedia Commons, CC BY-SA 4.0",
    descripcion: "El clásico dorado: especiado, dulce y cálido. Ideal para salir de noche.",
    notas: { salida: "Mandarina, menta", corazon: "Canela, rosa", fondo: "Cuero, ámbar" },
    ocasion: "Noche",
    temporada: "Otoño e invierno",
    origen: "España",
    online: true,
    caja: true,
    variantes: [{ id: "million-100", ml: 100, precio: 99990, codigo: "7800001000048", minimo: 2 }],
  },
  {
    slug: "armani-acqua-di-gio",
    nombre: "Acqua di Giò",
    marca: "Giorgio Armani",
    concentracion: "Eau de Toilette",
    genero: "hombre",
    linea: "disenador",
    familia: "Acuática cítrica",
    foto: "/fotos/acqua.jpg",
    creditoFoto: "Javier Velez, Wikimedia Commons, CC BY-SA 3.0",
    descripcion: "Notas marinas y cítricas para el día a día. Liviano, limpio y fácil de usar.",
    notas: { salida: "Lima, bergamota", corazon: "Notas marinas, romero", fondo: "Cedro, almizcle" },
    ocasion: "Día",
    temporada: "Primavera y verano",
    origen: "Italia",
    online: true,
    caja: true,
    variantes: [{ id: "acqua-100", ml: 100, precio: 109990, codigo: "7800001000055", minimo: 2 }],
  },
  {
    slug: "hugo-boss-hugo-man",
    nombre: "Hugo Man",
    marca: "Hugo Boss",
    concentracion: "Eau de Toilette",
    genero: "hombre",
    linea: "disenador",
    familia: "Aromática verde",
    foto: "/fotos/hugo.jpg",
    creditoFoto: "Rypptc, Wikimedia Commons, CC BY-SA 4.0",
    descripcion: "Verde, fresco y con manzana. El clásico de la cantimplora, para el día a día.",
    notas: { salida: "Manzana verde, menta, lavanda", corazon: "Salvia, geranio, clavel", fondo: "Abeto, cedro, pachulí" },
    ocasion: "Día",
    temporada: "Primavera y verano",
    origen: "Alemania",
    online: true,
    caja: true,
    variantes: [{ id: "hugo-125", ml: 125, precio: 79990, codigo: "7800001000086", minimo: 2 }],
  },
];

// Stock inicial por variante (lo que hay en el local).
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
};

export const PEDIDOS_INICIALES: Pedido[] = [
  { num: 1045, cliente: "Camila R.", resumen: "Lattafa Khamrah 100 ml ×2, Dior Sauvage 100 ml", entrega: "retiro", total: 209970, estado: "pagado" },
  { num: 1044, cliente: "Jorge P.", resumen: "Armaf Club de Nuit Intense Man 105 ml", entrega: "despacho", total: 48980, estado: "preparando" },
  { num: 1043, cliente: "Valentina S.", resumen: "Al Haramain Amber Oud Gold Edition 60 ml", entrega: "retiro", total: 59990, estado: "enviado" },
  { num: 1042, cliente: "Andrés M.", resumen: "Rabanne 1 Million 100 ml", entrega: "despacho", total: 103980, estado: "entregado" },
];

export const COSTO_ENVIO = 3990; // costo de ejemplo

export const MARCAS_ARABES = ["Lattafa", "Armaf", "Al Haramain", "Rasasi", "Afnan"];
export const MARCAS = [
  ...MARCAS_ARABES,
  "Dior",
  "Chanel",
  "Yves Saint Laurent",
  "Rabanne",
  "Giorgio Armani",
  "Hugo Boss",
];

export function formatoPrecio(n: number) {
  const signo = n < 0 ? "-" : "";
  return signo + "$" + String(Math.abs(Math.round(n))).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function nombreVariante(v: Variante) {
  return v.etiqueta ?? `${v.ml} ml`;
}
