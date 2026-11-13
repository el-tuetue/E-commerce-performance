// Productos de ejemplo para la demo. Reemplázalos por los del cliente.
// Cuando se conecte Supabase, esto pasa a ser una consulta a las tablas
// `productos` y `variantes` de database/schema.sql.

import { TIENDA } from "@/config/tienda";

export type Variante = {
  id: string; // ej: "taza-ceramica-blanca"
  nombre: string; // lo que elige el cliente: talla, color, tamaño… (ej: "Blanca", "Talla M", "500 ml")
  precio: number;
  codigo: string; // código de barras
  minimo: number; // con esta cantidad o menos aparece en "Por reponer"
};

export type Atributo = { nombre: string; valor: string };

export type Producto = {
  slug: string;
  nombre: string;
  marca: string;
  categoria: string; // id de una categoría de src/config/tienda.ts
  resumen: string; // línea corta bajo el nombre (ej: "Cerámica esmaltada")
  foto: string;
  creditoFoto?: string;
  badge?: string;
  descripcion: string;
  caracteristicas: string[]; // etiquetas cortas (ej: "Apta para lavavajillas")
  atributos: Atributo[]; // ficha técnica (ej: Material, Medidas, Origen)
  online: boolean;
  caja: boolean;
  nuevo?: boolean;
  variantes: Variante[];
};

const foto = (slug: string) => `/ejemplo/${slug}.svg`;

export const PRODUCTOS: Producto[] = [
  {
    slug: "taza-ceramica",
    nombre: "Taza de cerámica",
    marca: "Casa Alba",
    categoria: "hogar",
    resumen: "Cerámica esmaltada · 350 ml",
    foto: foto("taza-ceramica"),
    badge: "Más vendido",
    descripcion: "Taza de cerámica esmaltada a mano. Mantiene el calor y se ve bien en cualquier mesa.",
    caracteristicas: ["Apta para lavavajillas", "Apta para microondas", "Hecha a mano"],
    atributos: [
      { nombre: "Material", valor: "Cerámica" },
      { nombre: "Capacidad", valor: "350 ml" },
      { nombre: "Origen", valor: "Chile" },
    ],
    online: true,
    caja: true,
    variantes: [
      { id: "taza-blanca", nombre: "Blanca", precio: 8990, codigo: "7800001000017", minimo: 3 },
      { id: "taza-arena", nombre: "Arena", precio: 8990, codigo: "7800001000024", minimo: 3 },
      { id: "taza-verde", nombre: "Verde", precio: 9490, codigo: "7800001000031", minimo: 2 },
    ],
  },
  {
    slug: "cojin-lino",
    nombre: "Cojín de lino",
    marca: "Casa Alba",
    categoria: "hogar",
    resumen: "Lino lavado · 45 × 45 cm",
    foto: foto("cojin-lino"),
    descripcion: "Funda de lino lavado con relleno de fibra. Suave, fresco y fácil de lavar.",
    caracteristicas: ["Funda desmontable", "Relleno incluido"],
    atributos: [
      { nombre: "Material", valor: "Lino" },
      { nombre: "Medidas", valor: "45 × 45 cm" },
      { nombre: "Cuidado", valor: "Lavar a 30 °C" },
    ],
    online: true,
    caja: true,
    variantes: [
      { id: "cojin-crudo", nombre: "Crudo", precio: 19990, codigo: "7800001000048", minimo: 2 },
      { id: "cojin-terracota", nombre: "Terracota", precio: 19990, codigo: "7800001000055", minimo: 2 },
    ],
  },
  {
    slug: "planta-maceta",
    nombre: "Planta en maceta",
    marca: "Verde Casa",
    categoria: "hogar",
    resumen: "Planta de interior con maceta",
    foto: foto("planta-maceta"),
    badge: "Nuevo",
    descripcion: "Planta de interior de bajo mantenimiento, en maceta de cerámica lista para regalar.",
    caracteristicas: ["Bajo mantenimiento", "Interior"],
    atributos: [
      { nombre: "Riego", valor: "1 vez por semana" },
      { nombre: "Luz", valor: "Indirecta" },
      { nombre: "Maceta", valor: "Cerámica" },
    ],
    online: true,
    caja: true,
    variantes: [
      { id: "planta-pequena", nombre: "Pequeña", precio: 12990, codigo: "7800001000062", minimo: 2 },
      { id: "planta-mediana", nombre: "Mediana", precio: 21990, codigo: "7800001000079", minimo: 1 },
    ],
  },
  {
    slug: "lampara-mesa",
    nombre: "Lámpara de mesa",
    marca: "Estudio Norte",
    categoria: "hogar",
    resumen: "Metal y lino · luz cálida",
    foto: foto("lampara-mesa"),
    descripcion: "Lámpara de mesa con base de metal y pantalla de lino. Luz cálida para el velador o el escritorio.",
    caracteristicas: ["Ampolleta LED incluida", "Cable de 1,5 m", "Interruptor en el cable"],
    atributos: [
      { nombre: "Material", valor: "Metal y lino" },
      { nombre: "Alto", valor: "42 cm" },
      { nombre: "Ampolleta", valor: "E27 LED 9 W" },
    ],
    online: true,
    caja: true,
    variantes: [{ id: "lampara-unica", nombre: "Única", precio: 34990, codigo: "7800001000086", minimo: 1 }],
  },
  {
    slug: "cuaderno-a5",
    nombre: "Cuaderno A5",
    marca: "Estudio Norte",
    categoria: "oficina",
    resumen: "Tapa dura · 120 hojas",
    foto: foto("cuaderno-a5"),
    badge: "Favorito",
    descripcion: "Cuaderno A5 de tapa dura con elástico y cinta marcadora. Papel de 90 g que no traspasa.",
    caracteristicas: ["Papel 90 g", "Cinta marcadora", "Elástico de cierre"],
    atributos: [
      { nombre: "Formato", valor: "A5 (14,8 × 21 cm)" },
      { nombre: "Hojas", valor: "120" },
      { nombre: "Tapa", valor: "Dura" },
    ],
    online: true,
    caja: true,
    variantes: [
      { id: "cuaderno-rayado", nombre: "Rayado", precio: 7990, codigo: "7800001000093", minimo: 3 },
      { id: "cuaderno-puntos", nombre: "Puntos", precio: 7990, codigo: "7800001000109", minimo: 3 },
      { id: "cuaderno-blanco", nombre: "Liso", precio: 7990, codigo: "7800001000116", minimo: 3 },
    ],
  },
  {
    slug: "set-lapices",
    nombre: "Set de lápices",
    marca: "Estudio Norte",
    categoria: "oficina",
    resumen: "12 colores · madera",
    foto: foto("set-lapices"),
    descripcion: "Set de 12 lápices de colores de madera, en estuche de cartón reciclado.",
    caracteristicas: ["12 colores", "Estuche reciclado"],
    atributos: [
      { nombre: "Cantidad", valor: "12 lápices" },
      { nombre: "Material", valor: "Madera" },
    ],
    online: true,
    caja: true,
    variantes: [{ id: "lapices-12", nombre: "12 colores", precio: 5990, codigo: "7800001000123", minimo: 4 }],
  },
  {
    slug: "bolso-lona",
    nombre: "Bolso de lona",
    marca: "Ruta",
    categoria: "accesorios",
    resumen: "Lona de algodón · bolsillo interior",
    foto: foto("bolso-lona"),
    descripcion: "Bolso de lona resistente con bolsillo interior y asas largas para llevar al hombro.",
    caracteristicas: ["Bolsillo interior", "Asas largas", "Lavable"],
    atributos: [
      { nombre: "Material", valor: "Lona de algodón" },
      { nombre: "Medidas", valor: "40 × 38 cm" },
    ],
    online: true,
    caja: true,
    variantes: [
      { id: "bolso-crudo", nombre: "Crudo", precio: 14990, codigo: "7800001000130", minimo: 2 },
      { id: "bolso-negro", nombre: "Negro", precio: 14990, codigo: "7800001000147", minimo: 2 },
    ],
  },
  {
    slug: "botella-termica",
    nombre: "Botella térmica",
    marca: "Ruta",
    categoria: "accesorios",
    resumen: "Acero inoxidable · frío 24 h",
    foto: foto("botella-termica"),
    badge: "Más vendido",
    descripcion: "Botella de acero inoxidable de doble pared: mantiene frío 24 horas y caliente 12 horas.",
    caracteristicas: ["Frío 24 h", "Caliente 12 h", "Sin BPA"],
    atributos: [
      { nombre: "Material", valor: "Acero inoxidable" },
      { nombre: "Tapa", valor: "Rosca hermética" },
    ],
    online: true,
    caja: true,
    variantes: [
      { id: "botella-500", nombre: "500 ml", precio: 15990, codigo: "7800001000154", minimo: 2 },
      { id: "botella-750", nombre: "750 ml", precio: 18990, codigo: "7800001000161", minimo: 2 },
    ],
  },
  {
    slug: "reloj-minimal",
    nombre: "Reloj minimalista",
    marca: "Ruta",
    categoria: "accesorios",
    resumen: "Correa de cuero · resistente al agua",
    foto: foto("reloj-minimal"),
    descripcion: "Reloj análogo de esfera limpia y correa de cuero. Resistente a salpicaduras.",
    caracteristicas: ["Resistente al agua 3 ATM", "Correa de cuero"],
    atributos: [
      { nombre: "Caja", valor: "38 mm" },
      { nombre: "Correa", valor: "Cuero" },
      { nombre: "Garantía", valor: "1 año" },
    ],
    online: true,
    caja: true,
    variantes: [{ id: "reloj-unico", nombre: "Único", precio: 49990, codigo: "7800001000178", minimo: 1 }],
  },
  {
    slug: "audifonos",
    nombre: "Audífonos inalámbricos",
    marca: "Ruta",
    categoria: "accesorios",
    resumen: "Bluetooth · 30 h de batería",
    foto: foto("audifonos"),
    descripcion: "Audífonos inalámbricos plegables, con 30 horas de batería y micrófono para llamadas.",
    caracteristicas: ["30 h de batería", "Plegables", "Micrófono"],
    atributos: [
      { nombre: "Conexión", valor: "Bluetooth 5.3" },
      { nombre: "Batería", valor: "30 horas" },
      { nombre: "Garantía", valor: "6 meses" },
    ],
    online: true,
    caja: true,
    variantes: [{ id: "audifonos-unico", nombre: "Único", precio: 39990, codigo: "7800001000185", minimo: 1 }],
  },
];

// Stock inicial por variante (lo que hay en el local). Algunos bajos o en cero para mostrar las alertas.
export const STOCK_INICIAL: Record<string, number> = {
  "taza-blanca": 14,
  "taza-arena": 8,
  "taza-verde": 2,
  "cojin-crudo": 6,
  "cojin-terracota": 3,
  "planta-pequena": 5,
  "planta-mediana": 1,
  "lampara-unica": 4,
  "cuaderno-rayado": 12,
  "cuaderno-puntos": 9,
  "cuaderno-blanco": 2,
  "lapices-12": 20,
  "bolso-crudo": 5,
  "bolso-negro": 0,
  "botella-500": 7,
  "botella-750": 4,
  "reloj-unico": 1,
  "audifonos-unico": 0,
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
  { num: 1045, cliente: "Cliente A.", resumen: "Taza de cerámica Blanca ×2, Cuaderno A5 Rayado", entrega: "retiro", total: 25970, estado: "pagado" },
  { num: 1044, cliente: "Cliente B.", resumen: "Botella térmica 750 ml", entrega: "despacho", total: 22980, estado: "preparando" },
  { num: 1043, cliente: "Cliente C.", resumen: "Lámpara de mesa Única", entrega: "retiro", total: 34990, estado: "enviado" },
  { num: 1042, cliente: "Cliente D.", resumen: "Bolso de lona Crudo", entrega: "despacho", total: 18980, estado: "entregado" },
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

// Variante que se muestra primero (en la tarjeta y al abrir el producto): la primera con stock.
export function variantePrincipal(p: Producto, stockDe: (id: string) => number) {
  return p.variantes.find((v) => stockDe(v.id) > 0) ?? p.variantes[0];
}
