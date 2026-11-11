import { Encabezado } from "@/components/tienda/encabezado";
import { Pie } from "@/components/tienda/pie";

export default function TiendaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-fondo">
      <Encabezado />
      <div className="flex-1">{children}</div>
      <Pie />
    </div>
  );
}
