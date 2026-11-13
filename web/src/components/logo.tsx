import { TIENDA, iniciales } from "@/config/tienda";

// Emblema de la tienda: la imagen de TIENDA.logo si existe, o un círculo con las iniciales.
export function Emblema({ className = "size-12" }: { className?: string }) {
  if (TIENDA.logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={TIENDA.logo} alt="" className={`${className} shrink-0 rounded-full object-cover ring-1 ring-borde`} />
    );
  }
  return (
    <span
      aria-hidden
      className={`${className} inline-flex shrink-0 items-center justify-center rounded-full bg-marca font-serif text-[1.1em] font-semibold text-white`}
    >
      {iniciales(TIENDA.nombre)}
    </span>
  );
}

export function Logo({ tamano = "grande" }: { tamano?: "grande" | "chico" }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-tinta">
      <Emblema className={tamano === "grande" ? "size-10 text-base sm:size-12 sm:text-lg" : "size-10 text-base"} />
      <span className="flex flex-col leading-none">
        <span
          className={`whitespace-nowrap font-serif font-semibold tracking-[0.3px] ${tamano === "grande" ? "text-[22px] sm:text-[28px]" : "text-2xl"}`}
        >
          {TIENDA.nombre}
        </span>
        <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[3px] text-marca sm:mt-1 sm:text-[10px]">
          {TIENDA.bajada}
        </span>
      </span>
    </span>
  );
}
