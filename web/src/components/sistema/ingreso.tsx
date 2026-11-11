"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Emblema } from "@/components/logo";
import { useDemo, type Rol } from "@/lib/demo-store";

// Ingreso del personal. En la demo se entra eligiendo un rol.
// Con Supabase, aquí va el login real (correo + contraseña) y el rol sale de la tabla `perfiles`.
export function Ingreso() {
  const { iniciarSesion } = useDemo();
  const router = useRouter();
  const [aviso, setAviso] = useState("");

  const entrar = (rol: Rol) => {
    iniciarSesion(rol);
    router.push(rol === "admin" ? "/sistema/admin" : "/sistema/caja");
  };

  return (
    <main className="flex min-h-dvh items-center justify-center bg-tinta px-4 py-10">
      <div className="flex w-full max-w-[440px] flex-col gap-5">
        <div className="flex flex-col items-center text-center text-white">
          <Emblema className="mb-3 size-24 ring-2 ring-white/30" />
          <p className="mb-1 font-serif text-[40px] font-semibold">Nube Aromática</p>
          <p className="text-sm text-humo">Sistema interno · solo personal autorizado</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setAviso("En la demo no hay cuentas reales: entra con uno de los roles de abajo.");
          }}
          className="flex flex-col gap-4 rounded-[20px] bg-white p-8"
        >
          <h1 className="text-[22px] font-semibold">Ingresar</h1>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Correo
            <input type="email" placeholder="nombre@correo.cl" autoComplete="username" className="campo h-12 font-normal" />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Contraseña
            <input type="password" placeholder="••••••••" autoComplete="current-password" className="campo h-12 font-normal" />
          </label>
          <button type="submit" className="mt-1 h-[50px] rounded-[10px] bg-marca font-semibold text-white hover:bg-marca-oscuro">
            Ingresar
          </button>
          {aviso && (
            <p role="status" className="text-sm text-alerta">
              {aviso}
            </p>
          )}
        </form>

        <div className="flex flex-col gap-3 rounded-2xl bg-tinta-2 p-[18px] text-white">
          <p className="text-[13px] text-humo">Para la demo, entra con un rol. Cada uno ve una pantalla distinta:</p>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => entrar("vendedor")}
              className="flex min-h-16 flex-col justify-center rounded-xl border border-white/40 px-3.5 py-2.5 text-left transition-colors hover:border-white"
            >
              <span className="font-semibold">Vendedor</span>
              <span className="text-[13px] text-humo">Solo caja</span>
            </button>
            <button
              type="button"
              onClick={() => entrar("admin")}
              className="flex min-h-16 flex-col justify-center rounded-xl border border-white/40 px-3.5 py-2.5 text-left transition-colors hover:border-white"
            >
              <span className="font-semibold">Administrador</span>
              <span className="text-[13px] text-humo">Todo el sistema</span>
            </button>
          </div>
        </div>
        <p className="text-center text-[13px] text-humo">
          Esta pantalla no se enlaza desde la tienda: se entra por una dirección propia, por ejemplo sistema.[tu-dominio].cl
        </p>
      </div>
    </main>
  );
}
