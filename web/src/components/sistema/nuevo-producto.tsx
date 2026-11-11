"use client";

import { useState } from "react";
import { Check, Trash2, Upload } from "lucide-react";
import { MARCAS, formatoPrecio, type Genero, type Linea, type Producto } from "@/lib/datos";
import { useDemo } from "@/lib/demo-store";

type FilaVariante = { ml: string; precio: string; stock: string; codigo: string };
type Form = {
  nombre: string;
  marca: string;
  concentracion: string;
  genero: Genero;
  linea: Linea;
  descripcion: string;
  salida: string;
  corazon: string;
  fondo: string;
  foto: string;
  online: boolean;
  caja: boolean;
  variantes: FilaVariante[];
};

const vacio = (): Form => ({
  nombre: "",
  marca: "",
  concentracion: "Eau de Parfum",
  genero: "mujer",
  linea: "arabe",
  descripcion: "",
  salida: "",
  corazon: "",
  fondo: "",
  foto: "",
  online: true,
  caja: true,
  variantes: [{ ml: "", precio: "", stock: "", codigo: "" }],
});

const EJEMPLO: Form = {
  nombre: "1 Million Parfum",
  marca: "Rabanne",
  concentracion: "Parfum",
  genero: "hombre",
  linea: "disenador",
  descripcion: "La versión más intensa del clásico dorado: cuero, ámbar y flor de naranjo. Ideal para la noche.",
  salida: "Mandarina",
  corazon: "Flor de naranjo, tuberosa",
  fondo: "Cuero, ámbar",
  foto: "/fotos/banner-million.jpg",
  online: true,
  caja: true,
  variantes: [
    { ml: "50", precio: "104990", stock: "4", codigo: "7800001000093" },
    { ml: "100", precio: "139990", stock: "3", codigo: "7800001000109" },
  ],
};

// Achica la foto a máx. 800 px para que quepa en el almacenamiento de la demo.
// Con Supabase, la foto se sube a Storage y se guarda su dirección.
function leerFoto(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const escala = Math.min(1, 800 / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * escala);
      canvas.height = Math.round(img.height * escala);
      canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("No se pudo leer la imagen"));
    };
    img.src = url;
  });
}

function slugDe(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function NuevoProducto({ alPublicar }: { alPublicar: () => void }) {
  const { publicarProducto, avisar, productos } = useDemo();
  const [f, setF] = useState<Form>(vacio);
  const [error, setError] = useState(false);
  const [arrastrando, setArrastrando] = useState(false);

  const cambiar = (c: Partial<Form>) => {
    setF((p) => ({ ...p, ...c }));
    setError(false);
  };
  const cambiarVariante = (i: number, campo: keyof FilaVariante, valor: string) =>
    cambiar({ variantes: f.variantes.map((v, j) => (j === i ? { ...v, [campo]: valor } : v)) });

  const cargarArchivo = async (file?: File | null) => {
    if (!file || !file.type.startsWith("image/")) {
      avisar("Elige un archivo de imagen (JPG o PNG)");
      return;
    }
    try {
      cambiar({ foto: await leerFoto(file) });
    } catch {
      avisar("No se pudo leer la imagen");
    }
  };

  const precioOk = f.variantes.some((v) => Number(v.precio) > 0);
  const mlOk = f.variantes.every((v) => Number(v.ml) > 0);
  const checks: [string, boolean][] = [
    ["Foto del producto", !!f.foto],
    ["Nombre y marca", f.nombre.trim() !== "" && f.marca.trim() !== ""],
    ["Tamaño en ml", mlOk],
    ["Precio", precioOk],
    ["Al menos un canal de venta", f.online || f.caja],
  ];
  const listos = checks.filter((c) => c[1]).length;
  const completo = listos === checks.length;
  const precios = f.variantes.map((v) => Number(v.precio)).filter((n) => n > 0);
  const v0 = f.variantes[0];

  const publicar = () => {
    if (!completo) {
      setError(true);
      return;
    }
    let slug = slugDe(`${f.marca} ${f.nombre}`) || "producto";
    if (productos.some((p) => p.slug === slug)) slug = `${slug}-${Date.now().toString(36)}`;
    const stock: Record<string, number> = {};
    const variantes = f.variantes
      .filter((v) => Number(v.precio) > 0)
      .map((v, i) => {
        const id = `${slug}-${v.ml}-${i}`;
        stock[id] = Math.max(0, Math.floor(Number(v.stock) || 0));
        return { id, ml: Number(v.ml), precio: Number(v.precio), codigo: v.codigo.trim(), minimo: 2 };
      });
    const producto: Producto = {
      slug,
      nombre: f.nombre.trim(),
      marca: f.marca.trim(),
      concentracion: f.concentracion,
      genero: f.genero,
      linea: f.linea,
      familia: "",
      foto: f.foto,
      descripcion: f.descripcion.trim(),
      notas: { salida: f.salida.trim(), corazon: f.corazon.trim(), fondo: f.fondo.trim() },
      ocasion: "",
      temporada: "",
      origen: "",
      online: f.online,
      caja: f.caja,
      nuevo: true,
      variantes,
    };
    try {
      publicarProducto(producto, stock);
    } catch {
      avisar("No se pudo guardar: prueba con una foto más liviana");
      return;
    }
    avisar(`${producto.marca} ${producto.nombre} publicado en la tienda y la caja`);
    setF(vacio());
    alPublicar();
  };

  const borde = (malo: boolean) => (malo ? "border-error" : "");

  return (
    <div className="animate-subir flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="mb-1 text-[28px] font-semibold">Agregar producto</h1>
          <p className="text-gris">Se publica en la tienda online y queda disponible en la caja con el mismo stock</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setF(EJEMPLO);
            setError(false);
          }}
          className="h-11 rounded-[10px] border border-borde-fuerte bg-white px-4 text-sm text-tinta"
        >
          Rellenar con un ejemplo
        </button>
      </div>

      <div className="flex flex-wrap items-start gap-5">
        <div className="flex min-w-0 flex-[999_1_460px] flex-col gap-4">
          <section className="flex flex-col gap-3.5 rounded-2xl border border-borde bg-white p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-[17px] font-semibold">1. Foto</h2>
              <span className="text-[13px] text-gris">JPG o PNG, fondo claro, mínimo 800 px</span>
            </div>
            <label
              onDragOver={(e) => {
                e.preventDefault();
                setArrastrando(true);
              }}
              onDragLeave={() => setArrastrando(false)}
              onDrop={(e) => {
                e.preventDefault();
                setArrastrando(false);
                cargarArchivo(e.dataTransfer.files?.[0]);
              }}
              className={`relative flex min-h-[180px] cursor-pointer flex-wrap items-center justify-center gap-6 rounded-[14px] border-2 border-dashed p-5 transition-colors focus-within:border-marca hover:border-marca hover:bg-marca-tenue ${
                arrastrando ? "border-marca bg-marca-suave" : error && !f.foto ? "border-error bg-fondo" : "border-borde-fuerte bg-fondo"
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => cargarArchivo(e.target.files?.[0])}
                className="absolute size-px opacity-0"
              />
              {f.foto && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={f.foto} alt="Foto del producto" className="animate-subir h-[180px] w-[150px] rounded-xl bg-crema object-cover" />
              )}
              <span className="flex flex-col items-center gap-1.5 text-center">
                <Upload className="size-9 text-marca" strokeWidth={1.8} aria-hidden />
                <span className="font-semibold">{f.foto ? "Cambiar foto" : "Subir foto del perfume"}</span>
                <span className="text-sm text-gris">Arrastra la imagen aquí o haz clic para elegirla</span>
              </span>
            </label>
          </section>

          <section className="flex flex-col gap-3.5 rounded-2xl border border-borde bg-white p-5">
            <h2 className="text-[17px] font-semibold">2. Información</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3.5">
              <label className="flex flex-col gap-1.5 text-sm font-medium">
                Nombre del perfume
                <input
                  type="text"
                  value={f.nombre}
                  onChange={(e) => cambiar({ nombre: e.target.value })}
                  placeholder="Ej: Sauvage"
                  className={`campo font-normal ${borde(error && !f.nombre.trim())}`}
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-medium">
                Marca
                <input
                  type="text"
                  list="marcas-lista"
                  value={f.marca}
                  onChange={(e) => cambiar({ marca: e.target.value })}
                  placeholder="Escribe o elige"
                  className={`campo font-normal ${borde(error && !f.marca.trim())}`}
                />
              </label>
              <datalist id="marcas-lista">
                {[...MARCAS, "Carolina Herrera"].map((m) => (
                  <option key={m} value={m} />
                ))}
              </datalist>
              <label className="flex flex-col gap-1.5 text-sm font-medium">
                Concentración
                <select
                  value={f.concentracion}
                  onChange={(e) => cambiar({ concentracion: e.target.value })}
                  className="campo font-normal"
                >
                  {["Eau de Parfum", "Eau de Toilette", "Parfum", "Aceite perfumado (attar)", "Eau de Cologne", "Body Mist"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <div className="flex flex-col gap-1.5">
                <span id="lbl-genero" className="text-sm font-medium">
                  Para
                </span>
                <div role="group" aria-labelledby="lbl-genero" className="grid grid-cols-3 gap-1.5 rounded-xl bg-panel p-[3px]">
                  {(
                    [
                      ["mujer", "Mujer"],
                      ["hombre", "Hombre"],
                      ["unisex", "Unisex"],
                    ] as const
                  ).map(([g, label]) => (
                    <button
                      key={g}
                      type="button"
                      aria-pressed={f.genero === g}
                      onClick={() => cambiar({ genero: g })}
                      className={`h-10 rounded-[9px] text-sm transition ${
                        f.genero === g ? "bg-white font-semibold text-tinta shadow-[0_1px_3px_rgba(0,0,0,.12)]" : "text-gris"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <span id="lbl-linea" className="text-sm font-medium">
                Línea
              </span>
              <div role="group" aria-labelledby="lbl-linea" className="grid max-w-[360px] grid-cols-2 gap-1.5 rounded-xl bg-panel p-[3px]">
                {(
                  [
                    ["arabe", "Perfumería árabe"],
                    ["disenador", "Diseñador"],
                  ] as const
                ).map(([l, label]) => (
                  <button
                    key={l}
                    type="button"
                    aria-pressed={f.linea === l}
                    onClick={() => cambiar({ linea: l })}
                    className={`h-10 rounded-[9px] text-sm transition ${
                      f.linea === l ? "bg-white font-semibold text-tinta shadow-[0_1px_3px_rgba(0,0,0,.12)]" : "text-gris"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Descripción para la tienda
              <textarea
                rows={3}
                value={f.descripcion}
                onChange={(e) => cambiar({ descripcion: e.target.value })}
                placeholder="Cómo huele, para qué ocasión, por qué regalarlo"
                className="campo h-auto resize-y p-3 font-normal"
              />
            </label>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3">
              {(
                [
                  ["salida", "Notas de salida", "Ej: bergamota"],
                  ["corazon", "Notas de corazón", "Ej: lavanda"],
                  ["fondo", "Notas de fondo", "Ej: vainilla"],
                ] as const
              ).map(([k, label, ph]) => (
                <label key={k} className="flex flex-col gap-1.5 text-sm font-medium">
                  {label}
                  <input
                    type="text"
                    value={f[k]}
                    onChange={(e) => cambiar({ [k]: e.target.value })}
                    placeholder={ph}
                    className="campo font-normal"
                  />
                </label>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-3 rounded-2xl border border-borde bg-white p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-[17px] font-semibold">3. Tamaños, precio y stock</h2>
              <span className="text-[13px] text-gris">Con la pistola puedes escanear el código directo en el campo</span>
            </div>
            <div className="overflow-x-auto">
              <div className="flex min-w-[560px] flex-col gap-2 text-sm">
                <div className="grid grid-cols-[minmax(80px,1fr)_minmax(110px,1.3fr)_minmax(80px,1fr)_minmax(150px,1.8fr)_44px] gap-2 text-[13px] font-semibold text-gris">
                  <span>Tamaño (ml)</span>
                  <span>Precio ($)</span>
                  <span>Stock inicial</span>
                  <span>Código de barras</span>
                  <span className="sr-only">Quitar</span>
                </div>
                {f.variantes.map((v, i) => (
                  <div
                    key={i}
                    className="animate-subir grid grid-cols-[minmax(80px,1fr)_minmax(110px,1.3fr)_minmax(80px,1fr)_minmax(150px,1.8fr)_44px] items-center gap-2"
                  >
                    <input
                      type="number"
                      inputMode="numeric"
                      aria-label="Tamaño en ml"
                      value={v.ml}
                      onChange={(e) => cambiarVariante(i, "ml", e.target.value)}
                      placeholder="100"
                      className={`campo h-11 px-2.5 ${borde(error && !(Number(v.ml) > 0))}`}
                    />
                    <input
                      type="number"
                      inputMode="numeric"
                      aria-label="Precio"
                      value={v.precio}
                      onChange={(e) => cambiarVariante(i, "precio", e.target.value)}
                      placeholder="99990"
                      className={`campo h-11 px-2.5 ${borde(error && !precioOk)}`}
                    />
                    <input
                      type="number"
                      inputMode="numeric"
                      aria-label="Stock inicial"
                      value={v.stock}
                      onChange={(e) => cambiarVariante(i, "stock", e.target.value)}
                      placeholder="0"
                      className="campo h-11 px-2.5"
                    />
                    <input
                      type="text"
                      inputMode="numeric"
                      aria-label="Código de barras"
                      value={v.codigo}
                      onChange={(e) => cambiarVariante(i, "codigo", e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                      placeholder="Escanea o escribe"
                      className="campo h-11 px-2.5 font-mono text-sm"
                    />
                    <button
                      type="button"
                      aria-label="Quitar este tamaño"
                      disabled={f.variantes.length === 1}
                      onClick={() => cambiar({ variantes: f.variantes.filter((_, j) => j !== i) })}
                      className="inline-flex size-11 items-center justify-center rounded-[10px] border border-borde bg-white text-error disabled:text-[#C9C3CC]"
                    >
                      <Trash2 className="size-[18px]" aria-hidden />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => cambiar({ variantes: [...f.variantes, { ml: "", precio: "", stock: "", codigo: "" }] })}
              className="h-11 self-start rounded-[10px] border border-dashed border-marca bg-white px-3.5 text-sm font-medium text-marca"
            >
              + Agregar otro tamaño
            </button>
          </section>

          <section className="flex flex-col gap-3 rounded-2xl border border-borde bg-white p-5">
            <h2 className="text-[17px] font-semibold">4. Dónde se vende</h2>
            {(
              [
                ["online", "Tienda online", "Aparece en el catálogo público de Nube Aromática"],
                ["caja", "Caja del local", "Se puede vender escaneando el código de barras"],
              ] as const
            ).map(([k, titulo, texto]) => (
              <label key={k} className="flex min-h-11 cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={f[k]}
                  onChange={(e) => cambiar({ [k]: e.target.checked })}
                  className="size-5 accent-marca"
                />
                <span>
                  <strong className="font-semibold">{titulo}</strong>
                  <span className="block text-[13px] text-gris">{texto}</span>
                </span>
              </label>
            ))}
          </section>
        </div>

        <aside className="flex flex-[1_1_300px] flex-col gap-4 lg:sticky lg:top-6">
          <section className="flex flex-col gap-3 rounded-2xl border border-borde bg-white p-[18px]">
            <h2 className="text-[15px] font-semibold text-gris">Así se verá en la tienda</h2>
            <div className="overflow-hidden rounded-[14px] border border-borde">
              <div className="relative flex aspect-[4/5] items-center justify-center bg-crema">
                {f.foto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={f.foto} alt="" className="animate-subir size-full object-cover" />
                ) : (
                  <span className="text-sm text-gris">Sin foto todavía</span>
                )}
                <span className="absolute left-3 top-3 rounded-full bg-tinta px-2.5 py-1 text-xs font-semibold text-white">Nuevo</span>
              </div>
              <div className="flex flex-col gap-1 px-4 py-3.5">
                <p className="text-xs uppercase tracking-[1.2px] text-gris">{f.marca || "Marca"}</p>
                <p className="font-serif text-2xl font-semibold leading-tight">{f.nombre || "Nombre del perfume"}</p>
                <p className="text-sm text-gris">
                  {f.concentracion}
                  {v0?.ml ? ` · ${v0.ml} ml` : ""}
                </p>
                <p className="mt-2 text-lg font-semibold">
                  {precios.length ? `${precios.length > 1 ? "Desde " : ""}${formatoPrecio(Math.min(...precios))}` : "$ —"}
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-3 rounded-2xl border border-borde bg-white p-[18px]">
            <div className="flex items-baseline justify-between">
              <h2 className="text-[15px] font-semibold">Antes de publicar</h2>
              <span className="text-[13px] text-gris">{listos} de 5</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-linea">
              <div className="h-full rounded-full bg-ok transition-[width] duration-300" style={{ width: `${(listos / 5) * 100}%` }} />
            </div>
            <ul className="flex flex-col gap-3">
              {checks.map(([label, ok]) => (
                <li key={label} className="flex items-center gap-2.5 text-sm">
                  <span
                    aria-hidden
                    className={`inline-flex size-[22px] shrink-0 items-center justify-center rounded-full transition-colors ${
                      ok ? "bg-ok text-white" : `border-2 bg-white ${error ? "border-error" : "border-borde-fuerte"}`
                    }`}
                  >
                    {ok && <Check className="size-3.5" strokeWidth={3} />}
                  </span>
                  <span className={ok ? "text-tinta" : error ? "text-error" : "text-gris"}>
                    {label}
                    <span className="sr-only">{ok ? ": listo" : ": falta"}</span>
                  </span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={publicar}
              className={`h-[50px] rounded-xl bg-marca text-base font-semibold text-white transition-opacity ${completo ? "" : "opacity-60"}`}
            >
              Publicar producto
            </button>
            <button
              type="button"
              onClick={() => {
                setF(vacio());
                setError(false);
              }}
              className="h-11 text-sm text-gris"
            >
              Limpiar formulario
            </button>
            {error && (
              <p role="alert" className="text-sm text-error">
                Completa lo que falta en la lista para poder publicar.
              </p>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}
