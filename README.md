# Plantilla e-commerce: tienda online + sistema de caja

Base reutilizable para cualquier tienda que venda **online y en un local físico con el mismo stock**:

- **Tienda online (pública):** portada, catálogo con filtros y paginación, ficha de producto con opciones (talla, color, tamaño…), carrito y pago.
- **Sistema interno (solo personal):** caja con lector de código de barras, inventario, pedidos online, reportes y formulario para agregar productos.

Está pensada primero para celular: tarjetas de a dos por fila, barra de navegación inferior y páginas cortas.

## Stack

- **Next.js 16 + TypeScript** para la aplicación.
- **Tailwind CSS v4** para el diseño, con íconos **Lucide**.
- **PostgreSQL en Supabase** para la base de datos, el login y las fotos (pendiente de conectar).
- **Vercel** para el hosting.

## Contenido

| Carpeta | Qué hay |
|---|---|
| `web/` | La app. Por ahora funciona como **demo** con datos de ejemplo guardados en el navegador. |
| `database/schema.sql` | Base de datos completa: tablas, funciones de stock (`confirmar_pago`, `anular_venta`, `mover_stock`) y seguridad por roles (RLS). |
| `docs/ARQUITECTURA.md` | Cómo se organiza el sistema y el flujo de una venta. |
| `docs/GUIA-DISENO.md` | Reglas de diseño y checklist antes de publicar. |

## Usarla para un cliente nuevo

1. Copia este repositorio, por ejemplo con **Use this template** en GitHub, o clonándolo.
2. Edita **`web/src/config/tienda.ts`**: nombre, contacto, categorías, banners, vitrinas y textos.
3. Cambia los colores en **`web/src/app/globals.css`** (bloque `@theme`) y la tipografía de títulos en `web/src/app/layout.tsx`.
4. Reemplaza los productos de ejemplo en **`web/src/lib/datos.ts`** y las imágenes de **`web/public/ejemplo/`**.
5. Si el cliente tiene logo, cópialo a `web/public/` y pon su ruta en `logo` dentro de `tienda.ts`. Si no hay logo, se muestran las iniciales del nombre.

Los pasos con más detalle están en [web/README.md](web/README.md).

## Estado

🟡 **Demo navegable.** La tienda y el sistema funcionan con datos de ejemplo. Falta conectar Supabase (login, productos y stock reales) y los pagos online (Webpay o Mercado Pago).
