import { Emblema } from "@/components/logo";

export function Pie() {
  return (
    <footer className="border-t border-borde bg-white">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-x-4 gap-y-5 px-4 pb-4 pt-6 text-sm leading-relaxed sm:gap-6 sm:px-6 sm:pb-5 sm:pt-10 lg:grid-cols-4">
        <div className="col-span-2 flex items-center gap-3 lg:col-span-1 lg:block">
          <Emblema className="size-14 lg:mb-3 lg:size-16" />
          <div>
            <p className="font-serif text-2xl font-semibold leading-tight lg:mb-2 lg:text-[26px]">Nube Aromática</p>
            <p className="text-gris">Perfumes originales con stock real del local.</p>
          </div>
        </div>
        <div>
          <p className="mb-1 font-semibold sm:mb-2">Visítanos</p>
          <p className="text-gris">
            [DIRECCIÓN DEL LOCAL]
            <br />
            [HORARIO DE ATENCIÓN]
          </p>
        </div>
        <div>
          <p className="mb-1 font-semibold sm:mb-2">Contacto</p>
          <p className="text-gris">
            WhatsApp [NÚMERO]
            <br />
            Instagram [@CUENTA]
          </p>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <p className="mb-1 font-semibold sm:mb-2">Ayuda</p>
          <p className="text-gris">
            Cambios y devoluciones · Seguimiento de pedido
          </p>
        </div>
      </div>
      <details className="mx-auto max-w-[1200px] px-4 pb-5 text-xs text-gris sm:px-6">
        <summary className="inline-flex min-h-11 cursor-pointer items-center underline-offset-2 hover:underline">
          Créditos de fotos · precios referenciales
        </summary>
        <p className="pb-2">
          Fotos referenciales de Wikimedia Commons (CC0, CC BY, CC BY-SA): DYVER, Kevin Rheese, Brownchl, Dsuarez04, Jacek
          Halicki, Javier Velez, Rypptc, Miansari66, Tauseef perfumes, Fseddiqi1983, <bdi>آية سعيد البيطار</bdi>. Las
          ilustraciones de frascos son referenciales.
        </p>
      </details>
    </footer>
  );
}
