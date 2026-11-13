"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, Minus, Plus, Store, Truck } from "lucide-react";
import { TIENDA, categoriaPorId } from "@/config/tienda";
import { formatoPrecio, nombreVariante, variantePrincipal, type Producto } from "@/lib/datos";
import { useDemo } from "@/lib/demo-store";

export function DetalleProducto({ slug }: { slug: string }) {
  const { productos, listo } = useDemo();
  const producto = productos.find((p) => p.slug === slug);

  if (!producto) {
    if (!listo) return <main className="min-h-[70vh]" />;
    return (
      <main className="mx-auto max-w-[1200px] px-4 py-24 text-center sm:px-6">
        <h1 className="mb-3 font-serif text-4xl font-semibold">No encontramos este producto</h1>
        <Link href="/catalogo" className="text-marca underline">
          Volver al catálogo
        </Link>
      </main>
    );
  }
  return <Detalle key={producto.slug} producto={producto} />;
}

function Detalle({ producto }: { producto: Producto }) {
  const { stockDe, agregarAlCarrito, avisar, estado } = useDemo();
  const router = useRouter();
  const [sel, setSel] = useState(() => producto.variantes.indexOf(variantePrincipal(producto, stockDe)));
  const [cantidad, setCantidad] = useState(1);

  const v = producto.variantes[sel];
  const stock = stockDe(v.id);
  const enCarrito = estado.carrito[v.id] ?? 0;
  const disponible = Math.max(0, stock - enCarrito);
  const variasOpciones = producto.variantes.length > 1;
  const categoria = categoriaPorId(producto.categoria);

  const stockTxt =
    stock === 0
      ? variasOpciones
        ? "Agotada esta opción"
        : "Agotado"
      : stock <= 2
        ? `Quedan ${stock} ${stock === 1 ? "unidad" : "unidades"} en el local`
        : `Disponible · ${stock} unidades en el local`;
  const stockColor = stock === 0 ? "text-error" : stock <= 2 ? "text-alerta" : "text-ok";

  const agregar = (irAlCarrito: boolean) => {
    if (cantidad > disponible) {
      avisar(enCarrito > 0 ? `Ya tienes ${enCarrito} en el carrito: no queda más stock` : "No hay stock suficiente");
      return;
    }
    agregarAlCarrito(v.id, cantidad);
    avisar(`${producto.nombre}${variasOpciones ? ` ${nombreVariante(v)}` : ""} agregado al carrito`);
    setCantidad(1);
    if (irAlCarrito) router.push("/carrito");
  };

  return (
    <main className="mx-auto max-w-[1200px] px-4 pb-10 pt-4 sm:px-6 sm:pb-16 sm:pt-6">
      <nav aria-label="Ruta" className="mb-4 flex flex-wrap gap-2 text-sm text-gris">
        <Link href="/" className="text-gris underline-offset-2 hover:underline">
          Inicio
        </Link>
        <span aria-hidden>/</span>
        <Link
          href={categoria ? `/catalogo?filtro=${categoria.id}` : "/catalogo"}
          className="text-gris underline-offset-2 hover:underline"
        >
          {categoria?.nombre ?? "Catálogo"}
        </Link>
        <span aria-hidden>/</span>
        <span className="text-tinta">{producto.nombre}</span>
      </nav>

      <div className="flex flex-wrap gap-6 sm:gap-12">
        <div className="flex flex-[1_1_440px] flex-col gap-2 sm:gap-3">
          <div className="animate-subir aspect-[5/4] overflow-hidden rounded-[18px] bg-crema sm:aspect-[4/5] sm:max-h-[640px] sm:rounded-[20px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={producto.foto} alt={`${producto.marca} ${producto.nombre}`} className="size-full object-cover" />
          </div>
          {producto.creditoFoto && <p className="text-xs text-gris">Foto · {producto.creditoFoto}</p>}
        </div>

        <div className="flex flex-[1_1_420px] flex-col gap-4 sm:gap-5">
          <div>
            <p className="mb-1.5 text-[13px] uppercase tracking-[1.5px] text-gris">{producto.marca}</p>
            <h1 className="mb-2 font-serif text-[38px] font-semibold leading-none sm:text-[52px]">{producto.nombre}</h1>
            <p className="text-gris">{producto.resumen}</p>
          </div>

          <div className="flex flex-wrap items-baseline gap-3">
            <p className="text-[28px] font-semibold sm:text-[34px]">{formatoPrecio(v.precio)}</p>
            <p className="text-sm text-gris">{TIENDA.cuotas}</p>
          </div>

          <div>
            {variasOpciones && (
              <>
                <p className="mb-2.5 text-[15px] font-semibold">Elige una opción</p>
                <div role="group" aria-label="Elegir opción" className="flex flex-wrap gap-2.5">
                  {producto.variantes.map((o, i) => {
                    const on = i === sel;
                    const agotada = stockDe(o.id) === 0;
                    return (
                      <button
                        key={o.id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => {
                          setSel(i);
                          setCantidad(1);
                        }}
                        className={`h-12 min-w-[84px] rounded-[10px] border px-4 text-[15px] ${
                          on ? "border-tinta bg-tinta font-semibold text-white" : "border-borde-fuerte bg-white text-tinta"
                        } ${agotada && !on ? "text-gris line-through decoration-1" : ""}`}
                      >
                        {nombreVariante(o)}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
            <p className={`${variasOpciones ? "mt-2.5" : ""} text-sm ${stockColor}`} aria-live="polite">
              {stockTxt}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-[10px] border border-borde-fuerte bg-white">
              <button
                type="button"
                aria-label="Quitar uno"
                onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                className="inline-flex h-12 w-11 items-center justify-center"
              >
                <Minus className="size-4" aria-hidden />
              </button>
              <span aria-live="polite" className="min-w-8 text-center font-semibold">
                {cantidad}
              </span>
              <button
                type="button"
                aria-label="Agregar uno"
                onClick={() => setCantidad((c) => Math.min(Math.max(disponible, 1), c + 1))}
                className="inline-flex h-12 w-11 items-center justify-center"
              >
                <Plus className="size-4" aria-hidden />
              </button>
            </div>
            <button
              type="button"
              disabled={stock === 0}
              onClick={() => agregar(false)}
              className="h-12 flex-[1_1_180px] rounded-[10px] bg-marca font-semibold text-white transition-colors hover:bg-marca-oscuro disabled:cursor-not-allowed disabled:bg-linea disabled:text-gris"
            >
              {stock === 0 ? "Sin stock" : "Agregar al carrito"}
            </button>
            {stock > 0 && (
              <button
                type="button"
                onClick={() => agregar(true)}
                className="h-12 flex-[1_1_140px] rounded-[10px] border border-marca bg-white font-semibold text-marca"
              >
                Comprar ahora
              </button>
            )}
          </div>
          {enCarrito > 0 && (
            <p className="-mt-2 text-sm text-gris">
              Tienes {enCarrito} en el carrito ·{" "}
              <Link href="/carrito" className="text-marca underline">
                Ver carrito
              </Link>
            </p>
          )}

          <div className="flex flex-col gap-2.5 rounded-[14px] border border-borde bg-white px-[18px] py-4 text-sm">
            <div className="flex items-center gap-2.5">
              <Store className="size-5 shrink-0 text-marca" aria-hidden />
              <span>Retiro gratis en el local: listo en {TIENDA.envio.preparacion}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Truck className="size-5 shrink-0 text-marca" aria-hidden />
              <span>Despacho a domicilio desde {formatoPrecio(TIENDA.envio.costo)}</span>
            </div>
          </div>

          {producto.descripcion && <p className="leading-relaxed text-gris">{producto.descripcion}</p>}

          {producto.caracteristicas.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {producto.caracteristicas.map((c) => (
                <li key={c} className="inline-flex items-center gap-1.5 rounded-full bg-marca-suave px-3 py-1.5 text-[13px] text-marca">
                  <Check className="size-3.5" strokeWidth={2.6} aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          )}

          {producto.atributos.length > 0 && (
            <dl className="grid grid-cols-2 gap-x-4 border-t border-borde sm:grid-cols-3">
              {producto.atributos.map((a) => (
                <div key={a.nombre} className="pt-3.5">
                  <dt className="mb-0.5 text-[13px] text-gris">{a.nombre}</dt>
                  <dd className="font-medium">{a.valor}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </main>
  );
}
