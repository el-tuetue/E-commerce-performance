import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import { TIENDA } from "@/config/tienda";
import { SCRIPT_TEMA } from "@/components/boton-tema";
import { DemoProvider } from "@/lib/demo-store";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
// Tipografía de los títulos: cámbiala aquí (cualquier fuente de next/font/google).
const titulos = Bodoni_Moda({ variable: "--font-titulos", subsets: ["latin"], weight: ["500", "600"] });

export const metadata: Metadata = {
  title: { default: TIENDA.nombre, template: `%s · ${TIENDA.nombre}` },
  description: TIENDA.descripcion,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: el script de abajo puede agregar la clase "dark" antes de que cargue React.
    <html lang="es" className={`${inter.variable} ${titulos.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_TEMA }} />
      </head>
      <body className="min-h-dvh font-sans">
        <DemoProvider>{children}</DemoProvider>
      </body>
    </html>
  );
}
