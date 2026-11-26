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

## Modo oscuro
- Botón luna/sol en el encabezado (`components/boton-tema.tsx`). Guarda la elección en localStorage (`tema`) y un script en `<head>` (`SCRIPT_TEMA` en `app/layout.tsx`) la aplica antes de dibujar, para que no parpadee. Por defecto: claro.
- Funciona por colores con rol en `globals.css`, que `html.dark` redefine: `superficie` (tarjetas/campos, en vez de `bg-white`), `tinta` (texto), `oscuro` (bloques oscuros), `boton`/`boton-texto` (botón claro sobre bloques oscuros o fotos) y `sobre-marca` (texto sobre `bg-marca`). **No usar `bg-white` ni `bg-tinta` en componentes nuevos**: usar estos roles.
- En oscuro, `marca` pasa a dorado.

## Identidad visual (sacada del logo)
- Colores en `web/src/app/globals.css`: marca negro `#16181C`, crema `#FDFBF7`, dorado `#9A7431` (acento) y dorado claro `#E4CF9E` (detalles sobre fondo oscuro).
- Tipografías: Bodoni Moda (títulos, parecida a la del logo) e Inter (texto).
- Hay **dos versiones**: la normal en `main` (https://e-commerce-performance.vercel.app) y la navideña en la rama `festivo`, publicada en su propio proyecto de Vercel. Los cambios generales se hacen en `main` y luego se pasan a `festivo` (`git merge main` estando en `festivo`).
- Botones de al menos 44 px; contraste mínimo de 4.5:1.

## Versión catálogo (venta por WhatsApp)
- Misma rama `main`, activada con la variable `NEXT_PUBLIC_MODO_VENTA=whatsapp` (constante `VENTA_WHATSAPP` en `tienda.ts`). Sin la variable, la tienda es la normal con carrito.
- Cada perfume tiene un botón "Consultar por WhatsApp" (`components/tienda/boton-whatsapp.tsx`, link en `lib/whatsapp.ts`) con el mensaje ya escrito; el carrito se oculta y `/carrito` redirige al catálogo. El panel cambia "Pedidos online" por "Consultas WhatsApp" (clics por perfume).
- Publicada en el proyecto de Vercel `la-perfumes-catalogo` (https://la-perfumes-catalogo.vercel.app), con la variable ya configurada. Para volver a publicar a mano: `npx vercel link --project la-perfumes-catalogo` en `web/` y `npx vercel deploy --prod` (luego volver a enlazar `la-perfumes-festivo` si hace falta).
- Probar en local: configuración `web-whatsapp` de `.claude/launch.json`.
