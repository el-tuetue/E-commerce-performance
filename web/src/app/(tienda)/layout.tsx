import { Suspense } from "react";
import { BarraInferior } from "@/components/tienda/barra-inferior";
import { Encabezado } from "@/components/tienda/encabezado";
import { Pie } from "@/components/tienda/pie";

export default function TiendaLayout({ children }: { children: React.ReactNode }) {
  return (
    // pb-[60px]: espacio para la barra inferior del celular.
    <div className="flex min-h-dvh flex-col bg-fondo pb-[60px] sm:pb-0">
      <Encabezado />
      <div className="flex-1">{children}</div>
      <Pie />
      {/* Lee la ruta actual, por eso va dentro de Suspense. */}
      <Suspense fallback={null}>
        <BarraInferior />
      </Suspense>
    </div>
  );
}
