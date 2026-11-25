"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

// Modo claro / oscuro. La elección se guarda en el navegador (localStorage "tema")
// y un script en src/app/layout.tsx la aplica antes de dibujar la página, para que no parpadee.
const EVENTO = "cambio-tema";

function suscribir(avisar: () => void) {
  window.addEventListener(EVENTO, avisar);
  window.addEventListener("storage", avisar);
  return () => {
    window.removeEventListener(EVENTO, avisar);
    window.removeEventListener("storage", avisar);
  };
}

const esOscuro = () => document.documentElement.classList.contains("dark");

export function BotonTema({ className = "" }: { className?: string }) {
  const oscuro = useSyncExternalStore(suscribir, esOscuro, () => false);

  const cambiar = () => {
    const nuevo = !esOscuro();
    document.documentElement.classList.toggle("dark", nuevo);
    try {
      localStorage.setItem("tema", nuevo ? "oscuro" : "claro");
    } catch {
      /* sin almacenamiento: dura hasta recargar */
    }
    window.dispatchEvent(new Event(EVENTO));
  };

  return (
    <button
      type="button"
      onClick={cambiar}
      aria-pressed={oscuro}
      aria-label={oscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={oscuro ? "Modo claro" : "Modo oscuro"}
      className={`inline-flex size-11 shrink-0 items-center justify-center rounded-[10px] border border-borde-fuerte bg-superficie text-tinta transition-colors hover:border-marca ${className}`}
    >
      {oscuro ? <Sun className="size-[18px]" aria-hidden /> : <Moon className="size-[18px]" aria-hidden />}
    </button>
  );
}

// Script que va en <head>: aplica el tema guardado antes de que se vea la página.
export const SCRIPT_TEMA = `try{if(localStorage.getItem("tema")==="oscuro")document.documentElement.classList.add("dark")}catch(e){}`;
