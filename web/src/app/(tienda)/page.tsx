import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, CreditCard, MessageCircle, ShieldCheck, Store, Truck } from "lucide-react";
import { Carrusel } from "@/components/tienda/carrusel";
import { Catalogo } from "@/components/tienda/catalogo";
import { Destacado } from "@/components/tienda/destacado";
import { MARCAS } from "@/lib/datos";

const BENEFICIOS = [
  { icono: ShieldCheck, titulo: "100% originales", texto: "Los mismos perfumes que vendemos en el local." },
  { icono: Store, titulo: "Retiro en tienda gratis", texto: "Compra online y pasa a buscarlo al local." },
  { icono: Truck, titulo: "Despacho a domicilio", texto: "Cobertura: [COMUNAS DE DESPACHO]." },
  { icono: CreditCard, titulo: "Pago seguro", texto: "Débito y crédito con Webpay o Mercado Pago." },
];

const CATEGORIAS = [
  { titulo: "Para ella", texto: "Chanel, Lancôme y más", foto: "/fotos/coco.jpg", pos: "center", genero: "mujer" },
  { titulo: "Para él", texto: "Dior, Armani, Rabanne", foto: "/fotos/banner3.jpg", pos: "20% center", genero: "hombre" },
  { titulo: "Unisex", texto: "Frescos para compartir", foto: "/fotos/ckone.jpg", pos: "center", genero: "unisex" },
];

export default function Inicio() {
  const marcas = [...MARCAS, ...MARCAS];
  return (
    <main>
      <Carrusel />

      <section aria-label="Beneficios" className="mx-auto max-w-[1200px] px-4 pb-10 pt-6 sm:px-6">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
          {BENEFICIOS.map(({ icono: Icono, titulo, texto }) => (
            <div key={titulo} className="flex items-start gap-3.5 rounded-[14px] border border-borde bg-white p-5">
              <Icono className="size-6 shrink-0 text-ciruela" aria-hidden />
              <div>
                <p className="mb-1 font-semibold">{titulo}</p>
                <p className="text-sm leading-normal text-gris">{texto}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-label="Comprar por categoría" className="mx-auto max-w-[1200px] px-4 pb-10 sm:px-6">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
          {CATEGORIAS.map((c) => (
            <Link
              key={c.titulo}
              href={`/?genero=${c.genero}#catalogo`}
              className="group relative block h-[300px] overflow-hidden rounded-[18px] bg-crema"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.foto}
                alt=""
                loading="lazy"
                className="size-full object-cover transition duration-700 group-hover:scale-[1.06]"
                style={{ objectPosition: c.pos }}
              />
              <span className="absolute inset-x-3.5 bottom-3.5 flex items-center justify-between gap-3 rounded-xl bg-[rgba(22,20,26,0.86)] px-4 py-3.5 text-white">
                <span>
                  <span className="block font-serif text-[26px] font-semibold leading-tight">{c.titulo}</span>
                  <span className="mt-0.5 block text-[13px] text-niebla">{c.texto}</span>
                </span>
                <ArrowRight className="size-[22px] transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section
        id="marcas"
        aria-label={`Marcas: ${MARCAS.join(", ")}`}
        className="scroll-mt-28 overflow-hidden border-y border-borde bg-white py-5"
      >
        <div className="flex w-max animate-marquesina hover:[animation-play-state:paused]" aria-hidden>
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-16 whitespace-nowrap pr-16 font-serif text-[26px] font-semibold text-[#3A3640]">
              {marcas.map((m, i) => (
                <span key={i}>{m}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <Destacado />

      {/* El catálogo lee los filtros de la URL, por eso va dentro de Suspense. */}
      <Suspense fallback={<div id="catalogo" className="min-h-[600px]" />}>
        <Catalogo />
      </Suspense>

      <section className="mx-auto max-w-[1200px] px-4 pb-16 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-5 rounded-[20px] bg-tinta p-8 text-white">
          <div className="flex-[1_1_380px]">
            <h2 className="mb-1.5 font-serif text-[34px] font-semibold">¿No sabes cuál elegir?</h2>
            <p className="leading-relaxed text-humo">
              Escríbenos y te recomendamos según el gusto de quien lo va a usar. También armamos paquetes de regalo.
            </p>
          </div>
          <a
            href="https://wa.me/"
            className="inline-flex h-[52px] items-center gap-2.5 rounded-xl bg-white px-6 font-semibold text-tinta"
          >
            <MessageCircle className="size-5" aria-hidden />
            Escríbenos por WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
