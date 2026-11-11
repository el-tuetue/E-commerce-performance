"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { RotateCcw } from "lucide-react";
import { BASE_LOCAL, useDemo } from "@/lib/demo-store";

export function BotonReiniciar({ className = "" }: { className?: string }) {
  const { reiniciarDemo, avisar } = useDemo();
  return (
    <button
      type="button"
      onClick={() => {
        if (!window.confirm("¿Volver la demo al estado inicial? Se borran las ventas, pedidos y productos de prueba.")) return;
        reiniciarDemo();
        avisar("Demo reiniciada");
      }}
      className={`inline-flex min-h-11 items-center gap-2 rounded-[10px] px-3 text-sm text-gris hover:text-tinta ${className}`}
    >
      <RotateCcw className="size-4" aria-hidden />
      Reiniciar demo
    </button>
  );
}

export function EncabezadoCaja() {
  const { estado, cerrarSesion } = useDemo();
  const router = useRouter();
  const ventasHoy = BASE_LOCAL.ventas + estado.ventasCaja.length;

  return (
    <header className="border-b border-[#E2DDD6] bg-white">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3.5 sm:px-6">
        <div className="flex flex-wrap items-baseline gap-3.5">
          <span className="font-serif text-[28px] font-semibold">Nube Aromática</span>
          <span className="rounded-full bg-rosado px-2.5 py-1 text-sm font-semibold text-ciruela">Sistema interno · Caja</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gris">
          <span>
            {estado.rol === "admin" ? "Administrador" : "Vendedor"}: <strong className="text-tinta">[NOMBRE]</strong>
          </span>
          <span>
            Ventas de hoy: <strong className="text-tinta">{ventasHoy}</strong>
          </span>
          {estado.rol === "admin" && (
            <Link
              href="/sistema/admin"
              className="inline-flex min-h-11 items-center rounded-[10px] border border-ciruela px-3.5 font-medium text-ciruela"
            >
              Administración
            </Link>
          )}
          <BotonReiniciar />
          <button
            type="button"
            onClick={() => {
              cerrarSesion();
              router.push("/sistema");
            }}
            className="inline-flex min-h-11 items-center rounded-[10px] border border-borde-fuerte px-3.5 text-tinta"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}
