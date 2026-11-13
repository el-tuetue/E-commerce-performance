import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { TIENDA } from "@/config/tienda";
import { DemoProvider } from "@/lib/demo-store";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
// Tipografía de los títulos: cámbiala aquí (cualquier fuente de next/font/google).
const titulos = Fraunces({ variable: "--font-titulos", subsets: ["latin"], weight: ["500", "600"] });

export const metadata: Metadata = {
  title: { default: TIENDA.nombre, template: `%s · ${TIENDA.nombre}` },
  description: TIENDA.descripcion,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${inter.variable} ${titulos.variable} antialiased`}>
      <body className="min-h-dvh font-sans">
        <DemoProvider>{children}</DemoProvider>
      </body>
    </html>
  );
}
