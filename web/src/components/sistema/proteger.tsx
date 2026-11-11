"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDemo, type Rol } from "@/lib/demo-store";

// Protección de la demo: sin sesión vuelve al ingreso y el vendedor no entra a administración.
// En producción la protección real es el login de Supabase + las reglas RLS de la base de datos.
export function Proteger({ roles, children }: { roles: Rol[]; children: React.ReactNode }) {
  const { listo, estado } = useDemo();
  const router = useRouter();
  const permitido = estado.rol !== null && roles.includes(estado.rol);

  useEffect(() => {
    if (!listo || permitido) return;
    router.replace(estado.rol === "vendedor" ? "/sistema/caja" : "/sistema");
  }, [listo, permitido, estado.rol, router]);

  if (!listo || !permitido) return <div className="min-h-dvh bg-panel" />;
  return <>{children}</>;
}
