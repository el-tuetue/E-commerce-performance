# Nube Aromática: contexto para Claude Code

## Qué es
Proyecto freelance para la perfumería **Nube Aromática**. Tiene dos partes separadas que comparten el mismo inventario:
1. **Tienda online pública** (clientes): catálogo, carrito, pago con Webpay o Mercado Pago, retiro en tienda o despacho. El cliente solo compra: la tienda no debe tener ningún enlace ni botón al sistema interno.
2. **Sistema interno** (solo personal, con login y una dirección propia, ej. `sistema.dominio.cl`):
   - Vendedor: caja con lector de código de barras.
   - Admin (dueño): caja, inventario, pedidos online, reportes y formulario para agregar productos.

El dueño del repo trabaja con IA ("vibecoder"): explica los pasos de forma simple y en español.

## Stack decidido
- Next.js + TypeScript (una sola app; rutas internas protegidas por login)
- Tailwind CSS v4 (configuración en CSS con `@theme`, sin `tailwind.config.js`) + shadcn/ui + Lucide
- PostgreSQL en Supabase (auth, storage de fotos, RLS)
- Hosting en Vercel

## Estado actual
- `database/schema.sql`: esquema completo **probado** en PostgreSQL 16 local con un stub de `auth` de Supabase. Incluye tablas, RLS por rol (cliente, vendedor, admin) y las funciones:
  - `confirmar_pago(venta, medio)`: descuenta el stock de forma atómica.
  - `anular_venta(venta, motivo)`: devuelve el stock.
  - `mover_stock(variante, cantidad, tipo, nota)`.
  - Vista `stock_bajo`.
  - Falta probarlo en un proyecto real de Supabase.
- `maqueta/`: maqueta aprobada visualmente (formato `.dc.html` del lienzo de diseño de Claude). Es la **referencia visual** para construir las pantallas reales; no se abre directo en el navegador.
  - Pantallas: Main (tienda), Producto, Carrito, Login, Caja, Admin.
  - Portada: es solo para presentarle la propuesta al dueño, no es parte del sitio.
  - Versión navegable: https://claude.ai/artifact/12GocothS3D3jDWxmgNo9m
- `maqueta/fotos/`: fotos referenciales de Wikimedia Commons (créditos en `CREDITOS.md`). Hay que reemplazarlas por fotos propias antes de publicar.
- `docs/ARQUITECTURA.md` y `docs/GUIA-DISENO.md`: decisiones y guía de diseño.
- `web/`: app Next.js 16 (Turbopack, `cacheComponents`) **en modo demo**: todas las pantallas de la maqueta funcionan con datos de ejemplo guardados en localStorage y sincronizados entre pestañas. Detalles y guion de demo en `web/README.md`.
  - Rutas: `/`, `/producto/[slug]`, `/carrito` (tienda) y `/sistema`, `/sistema/caja`, `/sistema/admin` (interno).
  - Estado: `web/src/lib/demo-store.tsx` (`useSyncExternalStore`, sin contexto para el estado; solo los toasts usan contexto). Datos: `web/src/lib/datos.ts`.
  - Por ahora sin shadcn/ui: componentes propios con Tailwind v4 + Lucide.
  - Next 16 cambia APIs: leer `web/node_modules/next/dist/docs/` antes de usar algo nuevo (ver `web/AGENTS.md`).

## Identidad visual (sacada del logo oficial, `web/public/logo.png`)
- El logo es un emblema circular en acuarela: aguamarina, crema, hojas verdes y una flor rosada. La web sigue esa paleta (antes era ciruela, según la maqueta; la maqueta quedó desactualizada en color).
- Colores (tokens en `web/src/app/globals.css`): marca petróleo `#1F6F78`, aguamarina `#BBE9E9`, rosado flor `#D9779A`, texto `#12383D`, fondo crema `#FCFAF5`, bordes `#DBE7E5`.
- Tipografías: Cormorant Garamond (títulos) e Inter (texto).
- El archivo del logo es chico (150 px) y el usuario no tiene el original: no mostrarlo a más de 72 px. Si el dueño consigue el original (por ejemplo desde Canva), reemplazar `web/public/logo.png`.
- Botones de al menos 44 px; contraste mínimo de 4.5:1.

## Próximos pasos
1. ✅ Subido a GitHub (público): https://github.com/el-tuetue/E-commerce-performance
   - Los commits usan el correo privado de GitHub (`173995679+el-tuetue@users.noreply.github.com`), configurado solo en este repo. Nunca usar el correo personal.
2. ✅ Front de la demo hecho en `web/`.
3. ✅ Demo publicada en Vercel: https://e-commerce-performance.vercel.app (proyecto `e-commerce-performance`, conectado al repo, Root Directory `web`).
4. Conectar Supabase: login real, productos y stock desde `schema.sql`, fotos en Storage. Orden: admin (productos) → caja → tienda → pagos online.
5. Variables en `web/.env.local` (nunca subirlas): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (esta última solo en el servidor).

## Pendientes con el dueño
- Datos marcados como `[CORCHETES]` en la maqueta: dirección, horario, comunas de despacho, WhatsApp, Instagram y costo de envío.
- Fotos reales, precios reales, nombre del vendedor y logo, si el dueño tiene uno.
- Boleta electrónica del SII, contrato de Webpay o Mercado Pago, y políticas de cambios y devoluciones, retracto y privacidad.

## Notas privadas
La cotización y las notas comerciales están en `NOTAS-PRIVADAS.md`, que **no se sube** a GitHub (está en `.gitignore`), porque el repo es público.
