export function IconoNube({ className = "size-[34px]", ondas = true }: { className?: string; ondas?: boolean }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 28h17a6 6 0 0 0 .7-12A8.5 8.5 0 0 0 13.4 14 7 7 0 0 0 12 28z" />
      {ondas && <path d="M16 33c1.5-1 3-1 4.5 0s3 1 4.5 0" />}
    </svg>
  );
}

export function Logo({ tamano = "grande" }: { tamano?: "grande" | "chico" }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-tinta">
      <IconoNube className={`${tamano === "grande" ? "size-[34px]" : "size-[26px]"} text-ciruela`} />
      <span
        className={`font-serif font-semibold leading-none tracking-[0.3px] ${tamano === "grande" ? "text-[30px]" : "text-2xl"}`}
      >
        Nube Aromática
      </span>
    </span>
  );
}
