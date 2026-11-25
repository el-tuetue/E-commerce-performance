# LA Perfumes (sobre plantilla e-commerce): contexto para Claude Code

## Qué es
Prototipo de tienda online + sistema de caja para la perfumería **LA Perfumes** (perfumes de diseñador y árabes). Antes se usó para otra perfumería (Nube Aromática, que no siguió); esa versión está en el historial de git. Está construida sobre una **plantilla genérica**: todo lo propio de la perfumería vive en la configuración y los datos, no en los componentes. Así la misma base sirve para otro rubro cambiando `tienda.ts`, `datos.ts`, colores e imágenes.

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
- `web/public/logo.png`: logo de LA Perfumes, versión de Navidad con gorro (solo 138 px; no mostrarlo a más de 72 px). Pedir el original en alta resolución y la versión sin gorro para después de las fiestas.

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
- Colores en `web/src/app/globals.css`: marca negro `#16181C`, crema `#FDFBF7`, dorado `#9A7431` (acento) y dorado claro `#E4CF9E` (detalles sobre fondo oscuro).
- Tipografías: Bodoni Moda (títulos, parecida a la del logo) e Inter (texto).
- Hay **dos versiones**: la normal en `main` (https://e-commerce-performance.vercel.app) y la navideña en la rama `festivo`, publicada en su propio proyecto de Vercel. Los cambios generales se hacen en `main` y luego se pasan a `festivo` (`git merge main` estando en `festivo`).
- Versión navideña (`festivo`): `temporada.activa: true` en `tienda.ts` activa la franja roja con copos, la nieve del banner (`nieve.tsx`), la cuenta regresiva y guía de regalos por presupuesto (`guia-regalos.tsx`, usa `/catalogo?min=&max=`) y la opción "Envolver para regalo" en el carrito (se ve en el pedido del panel). Decoración en SVG propio (`decoracion.tsx`): guirnalda de pino con luces bajo el encabezado y en el pie, esferas colgando sobre el banner, moños en las tarjetas de vitrinas con `decoracion: "regalo"` y en el destacado; la guía de regalos es una caja verde pino con cinta roja. Colores `pino`, `oro` y `temporada` en `globals.css`. Se publica en el proyecto de Vercel `la-perfumes-festivo` con `npx vercel deploy --prod` desde `web/` estando en la rama `festivo` (la carpeta `web/.vercel` queda enlazada a ese proyecto).
- Botones de al menos 44 px; contraste mínimo de 4.5:1.
