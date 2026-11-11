import type { Metadata } from "next";
import { Caja } from "@/components/sistema/caja";
import { EncabezadoCaja } from "@/components/sistema/encabezado-sistema";
import { Proteger } from "@/components/sistema/proteger";

export const metadata: Metadata = { title: "Caja del local", robots: { index: false } };

export default function PaginaCaja() {
  return (
    <Proteger roles={["vendedor", "admin"]}>
      <div className="min-h-dvh bg-panel">
        <EncabezadoCaja />
        <Caja />
      </div>
    </Proteger>
  );
}
