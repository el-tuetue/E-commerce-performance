"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { ArrowRight, Gift, Snowflake } from "lucide-react";
import { TIENDA } from "@/config/tienda";
import { Mono } from "./decoracion";

// Días que faltan para la fecha de la temporada. Se calcula solo en el navegador
// (con la fecha de quien mira), por eso en el servidor devuelve null.
const sinSuscripcion = () => () => {};
function useDiasQueFaltan(fecha: string) {
  return useSyncExternalStore(
    sinSuscripcion,
    () => {
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      const [a, m, d] = fecha.split("-").map(Number);
      return Math.round((new Date(a, m - 1, d).getTime() - hoy.getTime()) / 86_400_000);
    },
    () => null,
  );
}

// Bloque de temporada en la portada: cuenta regresiva + guía de regalos por presupuesto.
export function GuiaRegalos() {
  const t = TIENDA.temporada;
  const dias = useDiasQueFaltan(t.fecha);
  if (!t.activa) return null;

  const cuenta =
    dias === null || dias < 0
      ? null
      : dias === 0
        ? `¡Hoy es ${t.nombre}!`
        : `Faltan ${dias} ${dias === 1 ? "día" : "días"} ${t.textoCuenta}`;

  return (
    <section aria-labelledby="titulo-guia-regalos" className="mx-auto max-w-[1200px] px-4 pb-8 pt-6 sm:px-6 sm:pb-10 sm:pt-8">
      {/* La caja: verde pino con una cinta roja vertical y un moño arriba. */}
      <div className="relative">
        <Mono className="absolute -top-9 left-[18px] z-[2] w-[84px] drop-shadow-md sm:-top-11 sm:left-[38px] sm:w-[108px]" />
      <div className="relative overflow-hidden rounded-[18px] bg-pino p-5 pl-[78px] pt-12 text-white sm:rounded-[22px] sm:p-8 sm:pl-[136px]">
        <div aria-hidden className="absolute inset-y-0 left-[46px] w-[22px] bg-temporada shadow-[inset_4px_0_0_rgb(255_255_255/0.12),inset_-4px_0_0_rgb(0_0_0/0.15)] sm:left-[78px] sm:w-[34px]" />
        <Snowflake className="pointer-events-none absolute -right-6 -top-6 size-36 text-white/10" aria-hidden />
        <Snowflake className="pointer-events-none absolute -bottom-8 left-1/2 size-28 text-white/[0.07]" aria-hidden />

        <div className="relative flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div className="max-w-[560px]">
            <p className="mb-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[2px] text-white/85">
              <Gift className="size-4" aria-hidden />
              {t.guiaRegalos.eyebrow}
            </p>
            <h2 id="titulo-guia-regalos" className="font-serif text-[28px] font-semibold leading-tight sm:text-[38px]">
              {t.guiaRegalos.titulo}
            </h2>
            <p className="mt-1 text-[15px] leading-relaxed text-white/85">{t.guiaRegalos.texto}</p>
          </div>
          <div className="flex flex-col items-start gap-1.5 sm:items-end">
            {cuenta && (
              <p aria-live="polite" className="rounded-full bg-boton px-4 py-1.5 text-sm font-semibold text-pino">
                {cuenta}
              </p>
            )}
            <p className="text-[13px] text-white/85">{t.fechaLimite}</p>
          </div>
        </div>

        <div className="relative mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-4">
          {t.guiaRegalos.rangos.map((r) => {
            const params = new URLSearchParams();
            if (r.min !== undefined) params.set("min", String(r.min));
            if (r.max !== undefined) params.set("max", String(r.max));
            return (
              <Link
                key={r.titulo}
                href={`/catalogo?${params.toString()}`}
                className="group flex items-center justify-between gap-3 rounded-[14px] bg-boton px-4 py-3.5 text-boton-texto transition-transform hover:-translate-y-0.5 sm:py-4"
              >
                <span>
                  <span className="block font-serif text-xl font-semibold leading-tight">{r.titulo}</span>
                  <span className="block text-[13px] text-boton-texto/70">{r.texto}</span>
                </span>
                <ArrowRight className="size-5 shrink-0 text-pino transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            );
          })}
        </div>
      </div>
      </div>
    </section>
  );
}
