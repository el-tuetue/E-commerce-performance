import type { Metadata } from "next";
import { Ingreso } from "@/components/sistema/ingreso";

export const metadata: Metadata = { title: "Ingreso del personal", robots: { index: false } };

export default function PaginaIngreso() {
  return <Ingreso />;
}
