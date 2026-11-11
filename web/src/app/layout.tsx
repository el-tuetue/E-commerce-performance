import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { DemoProvider } from "@/lib/demo-store";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: { default: "Nube Aromática · Perfumes originales", template: "%s · Nube Aromática" },
  description: "Perfumes 100% originales con el stock real del local. Retiro gratis en tienda o despacho a domicilio.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${inter.variable} ${cormorant.variable} antialiased`}>
      <body className="min-h-dvh font-sans">
        <DemoProvider>{children}</DemoProvider>
      </body>
    </html>
  );
}
