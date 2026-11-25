import { Emblema } from "@/components/logo";
import { TIENDA } from "@/config/tienda";
import { Guirnalda } from "./decoracion";

export function Pie() {
  const { contacto } = TIENDA;
  return (
    <footer className="border-t border-borde bg-superficie">
      {TIENDA.temporada.activa && (
        <>
          <Guirnalda />
          <p className="mx-auto max-w-[1200px] px-4 pt-3 text-center font-serif text-2xl font-semibold text-pino sm:px-6 dark:text-[#8fc7a3] sm:text-[28px]">
            ¡Felices fiestas te desea {TIENDA.nombre}!
          </p>
        </>
      )}
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
      {TIENDA.creditosFotos ? (
        <details className="mx-auto max-w-[1200px] px-4 pb-5 text-xs text-gris sm:px-6">
          <summary className="inline-flex min-h-11 cursor-pointer items-center underline-offset-2 hover:underline">
            © {TIENDA.nombre} · Créditos de fotos · precios referenciales
          </summary>
          <p className="pb-2">
            <bdi>{TIENDA.creditosFotos}</bdi>
          </p>
        </details>
      ) : (
        <p className="mx-auto max-w-[1200px] px-4 pb-5 text-xs text-gris sm:px-6">© {TIENDA.nombre} · Precios referenciales.</p>
      )}
    </footer>
  );
}
