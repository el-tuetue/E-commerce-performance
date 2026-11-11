import Link from "next/link";
import { ArrowRight, CreditCard, MessageCircle, ShieldCheck, Store, Truck } from "lucide-react";
import { Carrusel } from "@/components/tienda/carrusel";
import { Destacado } from "@/components/tienda/destacado";
import { Vitrina } from "@/components/tienda/vitrina";
import { MARCAS } from "@/lib/datos";

const BENEFICIOS = [
  { icono: ShieldCheck, titulo: "100% originales", texto: "Los mismos perfumes que vendemos en el local." },
  { icono: Store, titulo: "Retiro gratis", texto: "Compra online y pasa a buscarlo al local." },
  { icono: Truck, titulo: "Despacho a domicilio", texto: "Cobertura: [COMUNAS DE DESPACHO]." },
  { icono: CreditCard, titulo: "Pago seguro", texto: "Débito y crédito con Webpay o Mercado Pago." },
];

const CATEGORIAS = [
  { titulo: "Perfumería árabe", texto: "Oud, ámbar y bakhoor", foto: "/fotos/bakhoor.jpg", pos: "center 40%", filtro: "arabe" },
  { titulo: "Para ella", texto: "Lattafa Yara, Chanel, YSL", foto: "/fotos/coco.jpg", pos: "center", filtro: "mujer" },
  { titulo: "Para él", texto: "Lattafa Asad, Armaf, Dior", foto: "/fotos/acqua.jpg", pos: "center 35%", filtro: "hombre" },
];

// La portada es corta a propósito: muestra lo mejor y manda al catálogo (/catalogo),
// que tiene su propia página con filtros y paginación.
export default function Inicio() {
  const marcas = [...MARCAS, ...MARCAS];
  return (
    <main>
      <Carrusel />

      <section aria-label="Beneficios" className="mx-auto max-w-[1200px] px-4 pb-8 pt-4 sm:px-6 sm:pb-10 sm:pt-6">
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
          {BENEFICIOS.map(({ icono: Icono, titulo, texto }) => (
            <div
              key={titulo}
              className="flex items-center gap-2.5 rounded-[14px] border border-borde bg-white p-3 sm:items-start sm:gap-3.5 sm:p-5"
            >
              <Icono className="size-5 shrink-0 text-marca sm:size-6" aria-hidden />
              <div>
                <p className="text-[13px] font-semibold leading-tight sm:mb-1 sm:text-base">{titulo}</p>
                <p className="hidden text-sm leading-normal text-gris sm:block">{texto}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* En celular las categorías se deslizan hacia el lado en vez de apilarse. */}
      <section aria-label="Comprar por categoría" className="mx-auto max-w-[1200px] pb-8 sm:px-6 sm:pb-10">
        <div className="sin-barra flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0">
          {CATEGORIAS.map((c) => (
            <Link
              key={c.titulo}
              href={`/catalogo?filtro=${c.filtro}`}
              className="group relative block h-[210px] w-[72%] shrink-0 snap-center overflow-hidden rounded-[18px] bg-crema sm:h-[300px] sm:w-auto"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.foto}
                alt=""
                loading="lazy"
                className="size-full object-cover transition duration-700 group-hover:scale-[1.06]"
                style={{ objectPosition: c.pos }}
              />
              <span className="absolute inset-x-2.5 bottom-2.5 flex items-center justify-between gap-3 rounded-xl bg-[rgba(12,44,48,0.86)] px-3.5 py-2.5 text-white sm:inset-x-3.5 sm:bottom-3.5 sm:px-4 sm:py-3.5">
                <span>
                  <span className="block font-serif text-[22px] font-semibold leading-tight sm:text-[26px]">{c.titulo}</span>
                  <span className="mt-0.5 block text-[13px] text-niebla">{c.texto}</span>
                </span>
                <ArrowRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1 sm:size-[22px]" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section
        id="marcas"
        aria-label={`Marcas: ${MARCAS.join(", ")}`}
        className="scroll-mt-28 overflow-hidden border-y border-borde bg-white py-3.5 sm:py-5"
      >
        <div className="flex w-max animate-marquesina hover:[animation-play-state:paused]" aria-hidden>
          {[0, 1].map((k) => (
            <div
              key={k}
              className="flex gap-10 whitespace-nowrap pr-10 font-serif text-xl font-semibold text-tinta sm:gap-16 sm:pr-16 sm:text-[26px]"
            >
              {marcas.map((m, i) => (
                <span key={i}>{m}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <Vitrina
        id="titulo-arabes"
        eyebrow="Nuestra especialidad"
        titulo="Los árabes más pedidos"
        texto="Intensos, duraderos y a muy buen precio. Si no sabes por cuál partir, empieza por estos."
        slugs={["lattafa-khamrah", "lattafa-asad", "lattafa-yara", "armaf-club-de-nuit-intense"]}
        href="/catalogo?filtro=arabe"
        cta="Ver todos los árabes"
      />

      <Destacado />

      <Vitrina
        id="titulo-disenador"
        eyebrow="Clásicos de siempre"
        titulo="Perfumes de diseñador"
        texto="Los íconos de Dior, Chanel, Rabanne e Yves Saint Laurent, originales y con stock real."
        slugs={["dior-sauvage", "chanel-n5", "rabanne-1-million", "ysl-black-opium"]}
        href="/catalogo?filtro=disenador"
        cta="Ver todos los de diseñador"
      />

      <section className="mx-auto max-w-[1200px] px-4 pb-10 pt-10 sm:px-6 sm:pb-16 sm:pt-12">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[18px] bg-tinta p-5 text-white sm:gap-5 sm:rounded-[20px] sm:p-8">
          <div className="flex-[1_1_380px]">
            <h2 className="mb-1.5 font-serif text-[28px] font-semibold leading-tight sm:text-[34px]">¿No sabes cuál elegir?</h2>
            <p className="text-[15px] leading-relaxed text-humo sm:text-base">
              Escríbenos y te recomendamos según el gusto de quien lo va a usar. También armamos paquetes de regalo.
            </p>
          </div>
          <div className="flex w-full flex-wrap gap-3 sm:w-auto">
            <a
              href="https://wa.me/"
              className="inline-flex h-12 flex-1 items-center justify-center gap-2.5 rounded-xl bg-white px-5 font-semibold text-tinta sm:h-[52px] sm:flex-none sm:px-6"
            >
              <MessageCircle className="size-5" aria-hidden />
              WhatsApp
            </a>
            <Link
              href="/catalogo"
              className="inline-flex h-12 flex-1 items-center justify-center rounded-xl border border-white/60 px-5 font-medium text-white sm:h-[52px] sm:flex-none sm:px-6"
            >
              Ver catálogo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
