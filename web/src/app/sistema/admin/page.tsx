import type { Metadata } from "next";
import { Admin } from "@/components/sistema/admin";
import { Proteger } from "@/components/sistema/proteger";

export const metadata: Metadata = { title: "Administración", robots: { index: false } };

export default function PaginaAdmin() {
  return (
    <Proteger roles={["admin"]}>
      <Admin />
    </Proteger>
  );
}
