"use client";

// Estado de la demo: stock, carrito, pedidos y sesión.
// Se guarda en el navegador (localStorage) y se sincroniza entre pestañas, así que
// si vendes en la caja en una pestaña, la tienda en otra pestaña ve el stock nuevo.
// Cuando se conecte Supabase, estas funciones pasan a llamar a la base de datos
// (por ejemplo `confirmar_pago` y `mover_stock` de database/schema.sql).

import { createContext, useCallback, useContext, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Check } from "lucide-react";
import {
  COSTO_ENVIO,
  PEDIDOS_INICIALES,
  PRODUCTOS,
  STOCK_INICIAL,
  type Pedido,
  type Producto,
  type Variante,
  nombreVariante,
} from "./datos";

const CLAVE = "nube-demo-v2"; // cambia la versión si cambian los datos de ejemplo

export type Rol = "vendedor" | "admin";
export type MedioCaja = "efectivo" | "debito" | "credito" | "transferencia";

type VentaCaja = { total: number; medio: MedioCaja };

type Estado = {
  stock: Record<string, number>;
  carrito: Record<string, number>;
  pedidos: Pedido[];
  nuevos: Producto[];
  ventasCaja: VentaCaja[];
  siguientePedido: number;
  rol: Rol | null;
};

// Cifras de ejemplo con las que parte el día.
export const BASE_LOCAL = { ventas: 7, monto: 849930 };
export const BASE_ONLINE = { pedidos: 3, monto: 548940 };

function estadoInicial(): Estado {
  return {
    stock: { ...STOCK_INICIAL },
    carrito: {},
    pedidos: PEDIDOS_INICIALES.map((p) => ({ ...p })),
    nuevos: [],
    ventasCaja: [],
    siguientePedido: 1046,
    rol: null,
  };
}

export type Linea = { varianteId: string; cantidad: number };
export type Resultado = { ok: true; num?: number } | { ok: false; error: string };

type Contexto = {
  listo: boolean;
  estado: Estado;
  productos: Producto[];
  buscarVariante: (id: string) => { producto: Producto; variante: Variante } | undefined;
  stockDe: (varianteId: string) => number;
  unidadesCarrito: number;
  agregarAlCarrito: (varianteId: string, cantidad?: number) => boolean;
  cambiarCantidadCarrito: (varianteId: string, cantidad: number) => void;
  pagarCarrito: (datos: { entrega: "retiro" | "despacho"; cliente: string }) => Resultado;
  venderEnCaja: (lineas: Linea[], medio: MedioCaja) => Resultado;
  reponer: (varianteId: string, cantidad: number) => void;
  publicarProducto: (producto: Producto, stock: Record<string, number>) => void;
  avanzarPedido: (num: number) => void;
  iniciarSesion: (rol: Rol) => void;
  cerrarSesion: () => void;
  reiniciarDemo: () => void;
  avisar: (mensaje: string) => void;
};

const AvisoCtx = createContext<(mensaje: string) => void>(() => {});

const SIGUIENTE: Record<Pedido["estado"], Pedido["estado"]> = {
  pagado: "preparando",
  preparando: "enviado",
  enviado: "entregado",
  entregado: "entregado",
};

// --- Almacén fuera de React: una sola copia del estado, guardada en localStorage ---
const ESTADO_SERVIDOR = estadoInicial();
let estadoActual: Estado | null = null;
const oyentes = new Set<() => void>();

function leerEstado(): Estado {
  if (estadoActual) return estadoActual;
  let e = estadoInicial();
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (crudo) e = { ...e, ...JSON.parse(crudo) };
  } catch {
    /* sin almacenamiento: la demo parte de cero */
  }
  estadoActual = e;
  return e;
}

function guardar(cambio: (e: Estado) => Estado) {
  estadoActual = cambio(leerEstado());
  try {
    localStorage.setItem(CLAVE, JSON.stringify(estadoActual));
  } catch {
    /* sin almacenamiento: los cambios duran hasta recargar */
  }
  oyentes.forEach((o) => o());
}

// Cambios hechos en otra pestaña.
function alCambiarOtraPestana(e: StorageEvent) {
  if (e.key !== CLAVE) return;
  estadoActual = null;
  oyentes.forEach((o) => o());
}

function suscribir(oyente: () => void) {
  if (oyentes.size === 0) window.addEventListener("storage", alCambiarOtraPestana);
  oyentes.add(oyente);
  return () => {
    oyentes.delete(oyente);
    if (oyentes.size === 0) window.removeEventListener("storage", alCambiarOtraPestana);
  };
}

const sinSuscripcion = () => () => {};

export function useDemo(): Contexto {
  const estado = useSyncExternalStore(suscribir, leerEstado, () => ESTADO_SERVIDOR);
  // `listo` es false en el servidor y durante la hidratación; true cuando ya se leyó el navegador.
  const listo = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const avisar = useContext(AvisoCtx);

  const productos = useMemo(() => [...estado.nuevos, ...PRODUCTOS], [estado.nuevos]);

  const indice = useMemo(() => {
    const m = new Map<string, { producto: Producto; variante: Variante }>();
    for (const producto of productos) for (const variante of producto.variantes) m.set(variante.id, { producto, variante });
    return m;
  }, [productos]);

  const buscarVariante = useCallback((id: string) => indice.get(id), [indice]);
  const stockDe = useCallback((id: string) => estado.stock[id] ?? 0, [estado.stock]);

  return useMemo<Contexto>(() => {
    // Revisa que haya stock para todas las líneas. Igual que `confirmar_pago`:
    // si falta stock de algo, no se descuenta nada.
    const faltante = (e: Estado, lineas: Linea[]) => {
      for (const l of lineas) {
        const disp = e.stock[l.varianteId] ?? 0;
        if (l.cantidad > disp) {
          const info = indice.get(l.varianteId);
          const nombre = info ? `${info.producto.marca} ${info.producto.nombre} ${nombreVariante(info.variante)}` : l.varianteId;
          return `No hay stock suficiente de ${nombre} (quedan ${disp}).`;
        }
      }
      return null;
    };
    const descontar = (stock: Record<string, number>, lineas: Linea[]) => {
      const s = { ...stock };
      for (const l of lineas) s[l.varianteId] = (s[l.varianteId] ?? 0) - l.cantidad;
      return s;
    };

    return {
      listo,
      estado,
      productos,
      buscarVariante,
      stockDe,
      unidadesCarrito: Object.values(estado.carrito).reduce((a, b) => a + b, 0),

      agregarAlCarrito(varianteId, cantidad = 1) {
        const e = leerEstado();
        const ya = e.carrito[varianteId] ?? 0;
        const disp = e.stock[varianteId] ?? 0;
        if (ya + cantidad > disp) return false;
        guardar((p) => ({ ...p, carrito: { ...p.carrito, [varianteId]: ya + cantidad } }));
        return true;
      },

      cambiarCantidadCarrito(varianteId, cantidad) {
        guardar((p) => {
          const carrito = { ...p.carrito };
          const max = p.stock[varianteId] ?? 0;
          const c = Math.min(cantidad, max);
          if (c <= 0) delete carrito[varianteId];
          else carrito[varianteId] = c;
          return { ...p, carrito };
        });
      },

      pagarCarrito({ entrega, cliente }) {
        const e = leerEstado();
        const lineas = Object.entries(e.carrito).map(([varianteId, cantidad]) => ({ varianteId, cantidad }));
        if (lineas.length === 0) return { ok: false, error: "Tu carrito está vacío." };
        const error = faltante(e, lineas);
        if (error) return { ok: false, error };
        const subtotal = lineas.reduce((s, l) => s + (indice.get(l.varianteId)?.variante.precio ?? 0) * l.cantidad, 0);
        const total = subtotal + (entrega === "despacho" ? COSTO_ENVIO : 0);
        const resumen = lineas
          .map((l) => {
            const i = indice.get(l.varianteId)!;
            return `${i.producto.marca} ${i.producto.nombre} ${nombreVariante(i.variante)}${l.cantidad > 1 ? ` ×${l.cantidad}` : ""}`;
          })
          .join(", ");
        const num = e.siguientePedido;
        guardar((p) => ({
          ...p,
          stock: descontar(p.stock, lineas),
          carrito: {},
          siguientePedido: p.siguientePedido + 1,
          pedidos: [{ num, cliente: cliente || "Cliente web", resumen, entrega, total, estado: "pagado" }, ...p.pedidos],
        }));
        return { ok: true, num };
      },

      venderEnCaja(lineas, medio) {
        const e = leerEstado();
        if (lineas.length === 0) return { ok: false, error: "Agrega al menos un producto antes de cobrar." };
        const error = faltante(e, lineas);
        if (error) return { ok: false, error };
        const total = lineas.reduce((s, l) => s + (indice.get(l.varianteId)?.variante.precio ?? 0) * l.cantidad, 0);
        guardar((p) => {
          // Si alguien tenía en su carrito más de lo que ahora queda, se ajusta.
          const stock = descontar(p.stock, lineas);
          const carrito = { ...p.carrito };
          for (const id of Object.keys(carrito)) {
            const max = stock[id] ?? 0;
            if (carrito[id] > max) {
              if (max <= 0) delete carrito[id];
              else carrito[id] = max;
            }
          }
          return { ...p, stock, carrito, ventasCaja: [...p.ventasCaja, { total, medio }] };
        });
        return { ok: true };
      },

      reponer(varianteId, cantidad) {
        guardar((p) => ({ ...p, stock: { ...p.stock, [varianteId]: (p.stock[varianteId] ?? 0) + cantidad } }));
      },

      publicarProducto(producto, stock) {
        guardar((p) => ({ ...p, nuevos: [producto, ...p.nuevos], stock: { ...p.stock, ...stock } }));
      },

      avanzarPedido(num) {
        guardar((p) => ({
          ...p,
          pedidos: p.pedidos.map((o) => (o.num === num ? { ...o, estado: SIGUIENTE[o.estado] } : o)),
        }));
      },

      iniciarSesion(rol) {
        guardar((p) => ({ ...p, rol }));
      },

      cerrarSesion() {
        guardar((p) => ({ ...p, rol: null }));
      },

      reiniciarDemo() {
        const rol = leerEstado().rol;
        guardar(() => ({ ...estadoInicial(), rol }));
      },

      avisar,
    };
  }, [listo, estado, productos, buscarVariante, stockDe, indice, avisar]);
}

// El proveedor solo maneja los avisos (toasts). El estado lo lee cada componente
// directamente del almacén, así cada uno se hidrata con los mismos datos del servidor.
export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{ id: number; texto: string } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const avisar = useCallback((texto: string) => {
    setToast({ id: Date.now(), texto });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  return (
    <AvisoCtx.Provider value={avisar}>
      {children}
      {toast && (
        <div
          key={toast.id}
          role="status"
          className="animate-subir fixed bottom-7 left-1/2 z-50 flex max-w-[calc(100%-32px)] -translate-x-1/2 items-center gap-2.5 rounded-xl bg-tinta px-5 py-3.5 text-[15px] text-white shadow-lg"
        >
          <Check className="size-[18px] shrink-0 text-[#9ED3AE]" strokeWidth={2.4} aria-hidden />
          {toast.texto}
        </div>
      )}
    </AvisoCtx.Provider>
  );
}
