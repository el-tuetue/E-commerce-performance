// Ilustraciones navideñas en SVG (sin imágenes externas): guirnalda de pino con luces,
// esferas colgantes y moño de regalo. Solo se usan con la temporada activa.
// Todas las posiciones salen de fórmulas fijas para que el servidor y el navegador dibujen lo mismo.

const VERDES = ["#1e4d34", "#2b6446", "#3a7a55"];
const ESFERAS = ["#b3202c", "#c9a24a", "#1e4d34", "#b3202c"];
const LUCES = ["#ffd36b", "#ff8a7a", "#fff1b8", "#9be3b0"];

const ANCHO_TRAMO = 160;
const curva = (x: number) => 16 + 7 * Math.sin((Math.PI * (x % ANCHO_TRAMO)) / ANCHO_TRAMO);

function Tramo({ n }: { n: number }) {
  const x0 = n * ANCHO_TRAMO;
  // Rama de base (le da cuerpo) + agujas de pino tupidas a lo largo de la curva
  const base = Array.from({ length: 17 }, (_, i) => {
    const x = (i / 16) * ANCHO_TRAMO;
    return `${i === 0 ? "M" : "L"}${(x0 + x).toFixed(1)} ${curva(x).toFixed(1)}`;
  }).join(" ");
  const agujas = Array.from({ length: 90 }, (_, i) => {
    const x = (i / 90) * ANCHO_TRAMO;
    const y = curva(x);
    // Ángulo entre -180° y 180°: las agujas salen hacia todos lados, como una rama real.
    const ang = (((i * 137) % 360) - 180) * (Math.PI / 180);
    const largo = 9 + ((i * 7) % 6);
    return (
      <line
        key={i}
        x1={x0 + x}
        y1={y}
        x2={x0 + x + Math.cos(ang) * largo * 0.8}
        y2={y + Math.sin(ang) * largo}
        stroke={VERDES[i % 3]}
        strokeWidth={2.4}
        strokeLinecap="round"
      />
    );
  });
  // Dos esferas colgando por tramo
  const esferas = [38, 118].map((x, k) => {
    const color = ESFERAS[(n + k) % ESFERAS.length];
    const y = curva(x) + 4;
    const largo = 8 + ((n + k) % 3) * 4;
    return (
      <g key={`e${k}`}>
        <line x1={x0 + x} y1={y} x2={x0 + x} y2={y + largo} stroke="#c9a24a" strokeWidth={1} />
        <rect x={x0 + x - 2.5} y={y + largo - 1} width={5} height={3.5} rx={1} fill="#c9a24a" />
        <circle cx={x0 + x} cy={y + largo + 8} r={7} fill={color} />
        <circle cx={x0 + x - 2.4} cy={y + largo + 5.6} r={2} fill="#fff" opacity={0.55} />
      </g>
    );
  });
  // Luces que titilan
  const luces = [12, 64, 92, 146].map((x, k) => (
    <circle
      key={`l${k}`}
      className="luz"
      cx={x0 + x}
      cy={curva(x) + 1}
      r={3.2}
      fill={LUCES[(n + k) % LUCES.length]}
      style={{ animationDelay: `${((n * 4 + k) * 0.37) % 2.4}s` }}
    />
  ));
  return (
    <g>
      <path d={base} stroke="#173d29" strokeWidth={7} strokeLinecap="round" fill="none" />
      {agujas}
      {luces}
      {esferas}
    </g>
  );
}

// Guirnalda de pino que cruza todo el ancho. Alto fijo de 44 px.
export function Guirnalda({ className = "" }: { className?: string }) {
  const tramos = 16; // 16 × 160 px: cubre pantallas de hasta 2560 px
  return (
    <div aria-hidden className={`pointer-events-none h-14 w-full overflow-hidden ${className}`}>
      <svg width={tramos * ANCHO_TRAMO} height={56} viewBox={`0 0 ${tramos * ANCHO_TRAMO} 56`} className="block">
        {Array.from({ length: tramos }, (_, n) => (
          <Tramo key={n} n={n} />
        ))}
      </svg>
    </div>
  );
}

// Esfera navideña colgando de un hilo, con brillo. Se balancea suavemente.
function Esfera({ color, largo, tamano, retraso }: { color: string; largo: number; tamano: number; retraso: number }) {
  const id = `esf-${color.slice(1)}-${tamano}`;
  return (
    <svg
      width={tamano + 8}
      height={largo + tamano + 10}
      viewBox={`0 0 ${tamano + 8} ${largo + tamano + 10}`}
      className="esfera block"
      style={{ animationDelay: `${retraso}s` }}
    >
      <defs>
        <radialGradient id={id} cx="35%" cy="35%" r="70%">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="0.25" stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity="0.85" />
        </radialGradient>
      </defs>
      <line x1={(tamano + 8) / 2} y1={0} x2={(tamano + 8) / 2} y2={largo} stroke="#e4cf9e" strokeWidth={1.2} />
      <rect x={(tamano + 8) / 2 - 4} y={largo - 1} width={8} height={6} rx={1.5} fill="#c9a24a" />
      <circle cx={(tamano + 8) / 2} cy={largo + 5 + tamano / 2} r={tamano / 2} fill={`url(#${id})`} />
      <path
        d={`M${4 + tamano * 0.2} ${largo + 5 + tamano * 0.55} q${tamano * 0.3} ${tamano * 0.12} ${tamano * 0.6} 0`}
        stroke="#fff"
        strokeOpacity={0.35}
        strokeWidth={1.4}
        fill="none"
      />
    </svg>
  );
}

// Tres esferas colgando sobre el banner principal.
export function EsferasColgantes() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-[2] flex justify-center gap-6 sm:gap-10">
      <Esfera color="#b3202c" largo={46} tamano={30} retraso={0} />
      <div className="hidden sm:block">
        <Esfera color="#c9a24a" largo={86} tamano={38} retraso={-1.2} />
      </div>
      <Esfera color="#1e4d34" largo={64} tamano={26} retraso={-2.1} />
    </div>
  );
}

// Moño de regalo rojo.
export function Mono({ className = "size-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 90" aria-hidden className={className}>
      {/* Colas */}
      <path d="M58 46 L38 86 L50 80 L54 90 L62 50 Z" fill="#8e1823" />
      <path d="M62 46 L82 86 L70 80 L66 90 L58 50 Z" fill="#a61d29" />
      {/* Lazos */}
      <path d="M60 44 C40 8, 4 14, 14 40 C20 56, 48 52, 60 44 Z" fill="#c42a36" />
      <path d="M60 44 C80 8, 116 14, 106 40 C100 56, 72 52, 60 44 Z" fill="#b3202c" />
      {/* Sombras internas de los lazos */}
      <path d="M58 42 C44 22, 22 22, 22 36" stroke="#8e1823" strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M62 42 C76 22, 98 22, 98 36" stroke="#8e1823" strokeWidth={3} fill="none" strokeLinecap="round" />
      {/* Nudo */}
      <ellipse cx={60} cy={44} rx={10} ry={9} fill="#d8404b" />
      <ellipse cx={57} cy={41} rx={3.5} ry={2.5} fill="#fff" opacity={0.35} />
    </svg>
  );
}
