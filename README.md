# Nube Aromática: tienda online + sistema de caja

Proyecto para la perfumería **Nube Aromática** con **dos partes separadas** que comparten el mismo inventario:

- **Tienda online (pública):** catálogo, carrito, pago con Webpay o Mercado Pago, y retiro en tienda o despacho.
- **Sistema interno (solo personal):** caja con lector de código de barras para vendedores, más inventario, pedidos online y reportes para el administrador.

## Stack

- **Next.js + TypeScript** para la aplicación.
- **Tailwind CSS v4 + shadcn/ui** para la interfaz.
- **PostgreSQL en Supabase** para la base de datos, el login y las fotos.
- **Vercel** para el hosting.

## Contenido del repositorio

| Carpeta | Qué hay |
|---|---|
| `database/schema.sql` | Base de datos completa: tablas, funciones de stock (`confirmar_pago`, `anular_venta`, `mover_stock`) y seguridad por roles (RLS). Se pega en el SQL Editor de Supabase. |
| `docs/ARQUITECTURA.md` | Cómo se organiza el sistema, el flujo de una venta y los pasos para partir. |
| `docs/GUIA-DISENO.md` | Tecnologías, herramientas y reglas de diseño del proyecto. |
| `web/` | App Next.js: tienda y sistema interno, en modo demo. |
| `maqueta/` | Maqueta provisional de las 7 pantallas (portada, tienda, ingreso, caja, administración). |

## Estado

🟡 **Demo navegable lista** en `web/` (datos de ejemplo, sin base de datos todavía). Para abrirla: `cd web`, `npm install` y `npm run dev`. Guion de demo en `web/README.md`.

> Los precios de la maqueta son referenciales. Stock, pedidos y cifras de ventas son datos de ejemplo.
