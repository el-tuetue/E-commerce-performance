"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    foto: "/fotos/tienda-oud.jpg",
    alt: "Vitrina con perfumes árabes, oud y bakhoor",
    eyebrow: "Perfumería árabe",
    titulo: "El arte del oud",
    texto: "Lattafa, Armaf, Al Haramain, Rasasi y más. Perfumes intensos y duraderos, originales y con stock real del local.",
    cta: "Ver perfumes árabes",
    href: "/?filtro=arabe#catalogo",
    lado: "left",
    pos: "center",
  },
  {
    foto: "/fotos/banner-million.jpg",
    alt: "Frasco dorado de Rabanne 1 Million Parfum",
    eyebrow: "Para él",
    titulo: "Brilla con 1 Million",
    texto: "El clásico dorado de Rabanne, especiado y cálido. Disponible en el local y online.",
    cta: "Ver perfumes de hombre",
    href: "/?filtro=hombre#catalogo",
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
    href: "/?filtro=mujer#catalogo",
    lado: "left",
    pos: "center",
  },
] as const;

export function Carrusel() {
  const [actual, setActual] = useState(0);
  const [pausa, setPausa] = useState(false);
  const n = SLIDES.length;

  useEffect(() => {
    if (pausa) return;
    const t = setInterval(() => setActual((a) => (a + 1) % n), 5500);
    return () => clearInterval(t);
  }, [pausa, n]);

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Destacados"
      onMouseEnter={() => setPausa(true)}
      onMouseLeave={() => setPausa(false)}
      onFocus={() => setPausa(true)}
      onBlur={() => setPausa(false)}
      className="mx-auto max-w-[1200px] px-4 pt-6 sm:px-6 sm:pt-7"
    >
      <div className="relative h-[clamp(440px,44vw,560px)] overflow-hidden rounded-[22px] bg-tinta">
        {SLIDES.map((s, i) => {
          const on = i === actual;
          return (
            <div
              key={s.titulo}
              aria-hidden={!on}
              inert={!on}
              className={`absolute inset-0 transition-opacity duration-900 ${on ? "z-[1] opacity-100" : "pointer-events-none z-0 opacity-0"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.foto}
                alt={s.alt}
                className="absolute inset-0 size-full object-cover transition-transform duration-[6s] ease-out"
                style={{ objectPosition: s.pos, transform: `scale(${on ? 1.06 : 1})` }}
              />
              <div
                className={`absolute bottom-4 flex w-[calc(100%-32px)] max-w-[470px] flex-col gap-[clamp(8px,1vw,12px)] rounded-[18px] bg-[rgba(22,20,26,0.86)] p-[clamp(16px,2.2vw,28px)] text-white transition duration-900 ${
                  s.lado === "right" ? "right-4" : "left-4"
                } ${on ? "translate-y-0" : "translate-y-4"}`}
              >
                <p className="text-xs font-semibold uppercase tracking-[2px] text-lila">{s.eyebrow}</p>
                {i === 0 ? (
                  <h1 className="font-serif text-[clamp(28px,4.2vw,46px)] font-semibold leading-none">{s.titulo}</h1>
                ) : (
                  <h2 className="font-serif text-[clamp(28px,4.2vw,46px)] font-semibold leading-none">{s.titulo}</h2>
                )}
                <p className="text-[clamp(14px,1.4vw,16px)] leading-relaxed text-niebla">{s.texto}</p>
                <div className="mt-1">
                  <Link
                    href={s.href}
                    className="inline-flex h-12 items-center rounded-[10px] bg-white px-[22px] font-semibold text-tinta"
                  >
                    {s.cta}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
        <div className="absolute right-6 top-6 z-[2] flex gap-2">
          <button
            type="button"
            aria-label="Destacado anterior"
            onClick={() => setActual((a) => (a + n - 1) % n)}
            className="inline-flex size-11 items-center justify-center rounded-full bg-white/90 text-tinta"
          >
            <ChevronLeft className="size-[18px]" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Destacado siguiente"
            onClick={() => setActual((a) => (a + 1) % n)}
            className="inline-flex size-11 items-center justify-center rounded-full bg-white/90 text-tinta"
          >
            <ChevronRight className="size-[18px]" aria-hidden />
          </button>
        </div>
        <div role="group" aria-label="Elegir destacado" className="absolute left-3 top-6 z-[2] flex gap-0 sm:left-4">
          {SLIDES.map((s, i) => (
            <button
              key={s.titulo}
              type="button"
              aria-label={`Ver destacado ${i + 1}`}
              aria-current={i === actual}
              onClick={() => setActual(i)}
              className="inline-flex size-11 items-center justify-center"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${i === actual ? "w-7 bg-white" : "w-2 bg-white/55"}`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
