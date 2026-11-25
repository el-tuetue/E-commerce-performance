import { TIENDA } from "@/config/tienda";

// Copos de nieve suaves sobre el banner. Solo con la temporada activa y nieve: true.
// Las posiciones salen de una fórmula fija (no al azar) para que el servidor y el navegador dibujen lo mismo.
const COPOS = Array.from({ length: 34 }, (_, i) => ({
  izquierda: (i * 37) % 100,
  tamano: 3 + ((i * 7) % 5),
  duracion: 9 + ((i * 13) % 9),
  retraso: -((i * 29) % 17),
  deriva: ((i * 11) % 41) - 20,
  opacidad: 0.45 + ((i * 3) % 5) / 10,
}));

export function Nieve() {
  const { activa, nieve } = TIENDA.temporada;
  if (!activa || !nieve) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {COPOS.map((c, i) => (
        <span
          key={i}
          className="copo"
          style={
            {
              left: `${c.izquierda}%`,
              width: c.tamano,
              height: c.tamano,
              opacity: c.opacidad,
              animationDuration: `${c.duracion}s`,
              animationDelay: `${c.retraso}s`,
              "--deriva": `${c.deriva}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
