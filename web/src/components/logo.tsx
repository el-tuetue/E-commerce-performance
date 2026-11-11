// Emblema oficial de la perfumería (public/logo.png) + nombre.
export function Emblema({ className = "size-12" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt=""
      width={150}
      height={150}
      className={`${className} shrink-0 rounded-full object-cover ring-1 ring-borde`}
    />
  );
}

export function Logo({ tamano = "grande" }: { tamano?: "grande" | "chico" }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-tinta">
      <Emblema className={tamano === "grande" ? "size-12" : "size-10"} />
      <span className="flex flex-col leading-none">
        <span className={`font-serif font-semibold tracking-[0.3px] ${tamano === "grande" ? "text-[28px]" : "text-2xl"}`}>
          Nube Aromática
        </span>
        <span className="mt-1 text-[10px] font-semibold uppercase tracking-[3px] text-marca">Perfumería</span>
      </span>
    </span>
  );
}
