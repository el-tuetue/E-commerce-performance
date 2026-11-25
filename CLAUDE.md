# Nube Aromática (sobre plantilla e-commerce): contexto para Claude Code

## Qué es
Demo de tienda online + sistema de caja para la perfumería **Nube Aromática** (especialistas en perfumería árabe). Está construida sobre una **plantilla genérica**: todo lo propio de la perfumería vive en la configuración y los datos, no en los componentes. Así la misma base sirve para otro rubro cambiando `tienda.ts`, `datos.ts`, colores e imágenes.

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
- `web/src/config/tienda.ts`: **todo lo de la marca y la portada**: nombre, logo, contacto, envío, categorías (con `enPortada`), banners, beneficios, vitrinas, producto destacado, nombre de los productos en los textos ("perfumes"), ejemplo del formulario, créditos de fotos y `claveDemo`. Ningún componente debe tener textos, nombres o categorías de un cliente escritos a mano: siempre se leen de aquí.
- `web/src/app/globals.css`: colores (`@theme`: `marca`, `tinta`, `acento`, `claro`…).
- `web/src/app/layout.tsx`: tipografía de títulos (`--font-titulos`).
- `web/src/lib/datos.ts`: tipos `Producto` / `Variante` y productos de ejemplo. Un producto tiene `categorias` (varias, la primera es la principal), `resumen`, `caracteristicas`, `atributos` (en perfumes: notas olfativas y origen), `avisoFoto` (ej: "Ilustración"), `variantes` (en perfumes: los ml) y `varianteDestacada`.
- `web/public/fotos/`: fotos de Wikimedia Commons (créditos en `web/FOTOS-CREDITOS.md`) e ilustraciones de frascos en `fotos/ilustraciones/` para los árabes sin foto libre. Hay que reemplazarlas por fotos del proveedor.
- `web/public/logo.png`: logo de la perfumería (solo 150 px; no mostrarlo a más de 72 px).

## Estado actual
- `web/`: demo navegable. Estado en `web/src/lib/demo-store.tsx` (`useSyncExternalStore` + localStorage, sincronizado entre pestañas); solo los avisos (toasts) usan contexto.
- Celular primero: tarjetas en 2 columnas, barra de navegación inferior (`barra-inferior.tsx`), portada corta y catálogo paginado. El usuario pidió expresamente no usar tarjetas a ancho completo ni páginas largas en celular.
- Next 16 conserva el estado de las páginas al navegar (Activity): los mensajes de "compra lista" / "venta registrada" se limpian con `useLayoutEffect` al ocultarse la página.
- Rutas: `/`, `/catalogo`, `/producto/[slug]`, `/carrito` (tienda) y `/sistema`, `/sistema/caja`, `/sistema/admin` (interno).
- Demo publicada en Vercel: https://e-commerce-performance.vercel.app (proyecto `e-commerce-performance`, conectado al repo; el dominio ya cambió una vez, revisar con `npx vercel project ls` si deja de responder).
- Repo: https://github.com/el-tuetue/E-commerce-performance. Commits con el correo privado de GitHub (`173995679+el-tuetue@users.noreply.github.com`), configurado solo en este repo. Nunca usar el correo personal.

## Próximos pasos (cuando haya un cliente)
1. Copiar la plantilla y personalizar `tienda.ts`, colores, productos e imágenes.
2. Conectar Supabase: login real, productos y stock desde `schema.sql`, fotos en Storage. Orden: login → admin (productos) → caja → tienda → pagos online.
3. Variables en `web/.env.local` (nunca subirlas): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (esta última solo en el servidor).
4. Con cada cliente: datos de los `[CORCHETES]` de `tienda.ts`, fotos y precios reales, logo, boleta electrónica del SII, contrato de Webpay o Mercado Pago y políticas (cambios y devoluciones, retracto, privacidad).

## Identidad visual (sacada del logo)
- Colores en `web/src/app/globals.css`: marca petróleo `#1F6F78`, aguamarina `#BBE9E9`, rosado flor `#D9779A`, texto `#12383D`, fondo crema `#FCFAF5`.
- Tipografías: Cormorant Garamond (títulos) e Inter (texto).
- Botones de al menos 44 px; contraste mínimo de 4.5:1.
