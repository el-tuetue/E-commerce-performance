# Plantilla e-commerce: contexto para Claude Code

## Qué es
Plantilla base reutilizable (maqueta en blanco) para tiendas que venden **online y en un local físico con el mismo stock**. No pertenece a ningún cliente: se copia y se personaliza para cada proyecto nuevo.

Tiene dos partes que comparten el inventario:
1. **Tienda online pública**: portada, catálogo, ficha de producto, carrito y pago. No tiene ningún enlace al sistema interno.
2. **Sistema interno** (`/sistema`, solo personal): caja con lector de código de barras para el vendedor; panel del administrador con resumen, inventario, pedidos online y formulario para agregar productos.

El dueño del repo trabaja con IA ("vibecoder"): explica los pasos de forma simple y en español.

## Stack
- Next.js 16 + TypeScript (Turbopack, `cacheComponents`). Next 16 cambia APIs: leer `web/node_modules/next/dist/docs/` antes de usar algo nuevo (ver `web/AGENTS.md`).
- Tailwind CSS v4 (configuración en CSS con `@theme`, sin `tailwind.config.js`) + Lucide. Sin shadcn/ui: componentes propios.
- PostgreSQL en Supabase (auth, storage de fotos, RLS): esquema listo en `database/schema.sql`, **todavía no conectado**.
- Hosting en Vercel (Root Directory: `web`).

## Cómo se personaliza (lo más importante)
- `web/src/config/tienda.ts`: **todo lo de la marca y la portada**: nombre, logo, contacto, envío, categorías, banners, beneficios, vitrinas, producto destacado y `claveDemo`. Ningún componente debe tener textos, nombres o categorías de un cliente escritos a mano: siempre se leen de aquí.
- `web/src/app/globals.css`: colores (`@theme`: `marca`, `tinta`, `acento`, `claro`…).
- `web/src/app/layout.tsx`: tipografía de títulos (`--font-titulos`).
- `web/src/lib/datos.ts`: tipos `Producto` / `Variante` y productos de ejemplo. Un producto tiene `categoria` (id de la config), `resumen`, `caracteristicas`, `atributos` y `variantes` (cada opción: talla, color, tamaño; o una sola "Única").
- `web/public/ejemplo/`: imágenes SVG de ejemplo (generadas, neutras). Se reemplazan por fotos reales.

## Estado actual
- `web/`: demo navegable. Estado en `web/src/lib/demo-store.tsx` (`useSyncExternalStore` + localStorage, sincronizado entre pestañas); solo los avisos (toasts) usan contexto.
- Celular primero: tarjetas en 2 columnas, barra de navegación inferior (`barra-inferior.tsx`), portada corta y catálogo paginado. El usuario pidió expresamente no usar tarjetas a ancho completo ni páginas largas en celular.
- Next 16 conserva el estado de las páginas al navegar (Activity): los mensajes de "compra lista" / "venta registrada" se limpian con `useLayoutEffect` al ocultarse la página.
- Rutas: `/`, `/catalogo`, `/producto/[slug]`, `/carrito` (tienda) y `/sistema`, `/sistema/caja`, `/sistema/admin` (interno).
- Demo publicada en Vercel: https://nube-aromatica-prototipo.vercel.app (proyecto `e-commerce-performance`, conectado al repo; el nombre del dominio viene de un proyecto anterior y se puede cambiar en Vercel).
- Repo: https://github.com/el-tuetue/E-commerce-performance. Commits con el correo privado de GitHub (`173995679+el-tuetue@users.noreply.github.com`), configurado solo en este repo. Nunca usar el correo personal.

## Próximos pasos (cuando haya un cliente)
1. Copiar la plantilla y personalizar `tienda.ts`, colores, productos e imágenes.
2. Conectar Supabase: login real, productos y stock desde `schema.sql`, fotos en Storage. Orden: login → admin (productos) → caja → tienda → pagos online.
3. Variables en `web/.env.local` (nunca subirlas): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (esta última solo en el servidor).
4. Con cada cliente: datos de los `[CORCHETES]` de `tienda.ts`, fotos y precios reales, logo, boleta electrónica del SII, contrato de Webpay o Mercado Pago y políticas (cambios y devoluciones, retracto, privacidad).

## Identidad visual de la plantilla
- Neutra a propósito: marca índigo `#4338CA`, texto `#0F172A`, gris `#5B6474`, fondo `#FAFAF9`, acento `#E11D48`.
- Tipografías: Fraunces (títulos) e Inter (texto).
- Botones de al menos 44 px; contraste mínimo de 4.5:1.
