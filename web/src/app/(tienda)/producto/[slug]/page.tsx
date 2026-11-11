import type { Metadata } from "next";
import { Suspense } from "react";
import { DetalleProducto } from "@/components/tienda/detalle-producto";
import { PRODUCTOS } from "@/lib/datos";

export async function generateStaticParams() {
  return PRODUCTOS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/producto/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = PRODUCTOS.find((x) => x.slug === slug);
  return { title: p ? `${p.marca} ${p.nombre}` : "Producto" };
}

// Los productos nuevos (agregados desde el panel) no se conocen al compilar,
// por eso el acceso a `params` va dentro de Suspense.
export default function PaginaProducto({ params }: PageProps<"/producto/[slug]">) {
  return (
    <Suspense fallback={<main className="min-h-[70vh]" />}>
      {params.then(({ slug }) => (
        <DetalleProducto slug={slug} />
      ))}
    </Suspense>
  );
}
