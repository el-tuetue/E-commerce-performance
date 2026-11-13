import { Emblema } from "@/components/logo";
import { TIENDA } from "@/config/tienda";

export function Pie() {
  const { contacto } = TIENDA;
  return (
    <footer className="border-t border-borde bg-white">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-x-4 gap-y-5 px-4 pb-4 pt-6 text-sm leading-relaxed sm:gap-6 sm:px-6 sm:pb-5 sm:pt-10 lg:grid-cols-4">
        <div className="col-span-2 flex items-center gap-3 lg:col-span-1 lg:block">
          <Emblema className="size-14 text-xl lg:mb-3 lg:size-16" />
          <div>
            <p className="font-serif text-2xl font-semibold leading-tight lg:mb-2 lg:text-[26px]">{TIENDA.nombre}</p>
            <p className="text-gris">{TIENDA.descripcion}</p>
          </div>
        </div>
        <div>
          <p className="mb-1 font-semibold sm:mb-2">Visítanos</p>
          <p className="text-gris">
            {contacto.direccion}
            <br />
            {contacto.horario}
          </p>
        </div>
        <div>
          <p className="mb-1 font-semibold sm:mb-2">Contacto</p>
          <p className="text-gris">
            WhatsApp {contacto.whatsapp}
            <br />
            Instagram {contacto.instagram}
          </p>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <p className="mb-1 font-semibold sm:mb-2">Ayuda</p>
          <p className="text-gris">Cambios y devoluciones · Seguimiento de pedido</p>
        </div>
      </div>
      <p className="mx-auto max-w-[1200px] px-4 pb-5 text-xs text-gris sm:px-6">
        © {TIENDA.nombre} · Imágenes y precios de ejemplo.
      </p>
    </footer>
  );
}
