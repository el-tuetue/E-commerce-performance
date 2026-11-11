import type { Metadata } from "next";
import { Suspense } from "react";
import { Catalogo } from "@/components/tienda/catalogo";

export const metadata: Metadata = { title: "Catálogo" };

export default function PaginaCatalogo() {
  return (
    <main>
      {/* El catálogo lee los filtros de la URL, por eso va dentro de Suspense. */}
      <Suspense fallback={<div className="min-h-[70vh]" />}>
        <Catalogo />
      </Suspense>
    </main>
  );
}
