// Datos de ejemplo para la demo. Cuando se conecte Supabase, esto se reemplaza
// por consultas a las tablas `productos` y `variantes` de database/schema.sql.

export type Genero = "mujer" | "hombre" | "unisex";

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
  familia: string;
  foto: string;
  creditoFoto?: string;
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

export const PRODUCTOS: Producto[] = [
  {
    slug: "dior-sauvage",
    nombre: "Sauvage",
    marca: "Dior",
    concentracion: "Eau de Toilette",
    genero: "hombre",
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
    familia: "Floral aldehídica",
    foto: "/fotos/chanel5.jpg",
    creditoFoto: "arz, Wikimedia Commons, dominio público",
    badge: "Clásico",
    descripcion:
      "El perfume más famoso del mundo. Floral, empolvado y elegante: un regalo que no pasa de moda.",
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
    slug: "lancome-tresor",
    nombre: "Trésor",
    marca: "Lancôme",
    concentracion: "Eau de Parfum",
    genero: "mujer",
    familia: "Floral frutal",
    foto: "/fotos/tresor.jpg",
    creditoFoto: "Gonna Fly Now, Wikimedia Commons, CC BY-SA 2.0",
    descripcion: "Cálido y romántico, con rosa, durazno y un fondo suave de vainilla.",
    notas: { salida: "Durazno, bergamota", corazon: "Rosa, iris, heliotropo", fondo: "Vainilla, almizcle" },
    ocasion: "Día y noche",
    temporada: "Todo el año",
    origen: "Francia",
    online: true,
    caja: true,
    variantes: [{ id: "tresor-100", ml: 100, precio: 119990, codigo: "7800001000031", minimo: 3 }],
  },
  {
    slug: "rabanne-1-million",
    nombre: "1 Million",
    marca: "Rabanne",
    concentracion: "Eau de Toilette",
    genero: "hombre",
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
    slug: "chanel-coco-mademoiselle",
    nombre: "Coco Mademoiselle",
    marca: "Chanel",
    concentracion: "Eau de Parfum",
    genero: "mujer",
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
    slug: "armani-acqua-di-gio",
    nombre: "Acqua di Giò",
    marca: "Giorgio Armani",
    concentracion: "Eau de Toilette",
    genero: "hombre",
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
    slug: "calvin-klein-ck-one",
    nombre: "CK One",
    marca: "Calvin Klein",
    concentracion: "Eau de Toilette",
    genero: "unisex",
    familia: "Cítrica aromática",
    foto: "/fotos/ckone.jpg",
    creditoFoto: "Gonna Fly Now, Wikimedia Commons, CC BY-SA 2.0",
    descripcion: "Fresco y limpio, para compartir. El unisex de toda la vida.",
    notas: { salida: "Limón, bergamota", corazon: "Té verde, jazmín", fondo: "Almizcle, ámbar" },
    ocasion: "Día",
    temporada: "Primavera y verano",
    origen: "Estados Unidos",
    online: true,
    caja: true,
    variantes: [{ id: "ckone-200", ml: 200, precio: 59990, codigo: "7800001000062", minimo: 3 }],
  },
  {
    slug: "hugo-boss-bottled",
    nombre: "Boss Bottled",
    marca: "Hugo Boss",
    concentracion: "Eau de Toilette",
    genero: "hombre",
    familia: "Amaderada especiada",
    foto: "/fotos/boss.jpg",
    creditoFoto: "CoffeeAddict, Wikimedia Commons, CC BY-SA 3.0",
    descripcion: "Manzana, canela y maderas. Elegante y seguro para la oficina.",
    notas: { salida: "Manzana, limón", corazon: "Canela, geranio", fondo: "Sándalo, vetiver" },
    ocasion: "Oficina",
    temporada: "Todo el año",
    origen: "Alemania",
    online: true,
    caja: true,
    variantes: [{ id: "boss-100", ml: 100, precio: 94990, codigo: "7800001000086", minimo: 2 }],
  },
];

// Stock inicial por variante (lo que hay en el local).
export const STOCK_INICIAL: Record<string, number> = {
  "sauvage-30": 2,
  "sauvage-100": 6,
  "sauvage-300": 0,
  "n5-50": 2,
  "n5-100": 3,
  "tresor-100": 2,
  "million-100": 5,
  "coco-100": 4,
  "acqua-100": 1,
  "ckone-200": 9,
  "boss-100": 0,
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
  { num: 1045, cliente: "Camila R.", resumen: "Dior Sauvage 100 ml, CK One 200 ml ×2", entrega: "retiro", total: 249970, estado: "pagado" },
  { num: 1044, cliente: "Jorge P.", resumen: "Acqua di Giò 100 ml", entrega: "despacho", total: 113980, estado: "preparando" },
  { num: 1043, cliente: "Valentina S.", resumen: "Coco Mademoiselle 100 ml", entrega: "retiro", total: 184990, estado: "enviado" },
  { num: 1042, cliente: "Andrés M.", resumen: "1 Million 100 ml", entrega: "despacho", total: 103980, estado: "entregado" },
];

export const COSTO_ENVIO = 3990; // costo de ejemplo

export const MARCAS = ["Dior", "Chanel", "Lancôme", "Giorgio Armani", "Rabanne", "Hugo Boss", "Calvin Klein"];

export function formatoPrecio(n: number) {
  const signo = n < 0 ? "-" : "";
  return signo + "$" + String(Math.abs(Math.round(n))).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function nombreVariante(v: Variante) {
  return v.etiqueta ?? `${v.ml} ml`;
}
