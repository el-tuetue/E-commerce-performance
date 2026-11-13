# App web (demo)

App Next.js con la tienda online y el sistema interno. **Por ahora es una demo**: usa datos de ejemplo guardados en el navegador. Todavía no está conectada a Supabase ni a un medio de pago real.

## Cómo abrirla

```bash
npm install
npm run dev
```

Después abre http://localhost:3000.

> En Windows, si PowerShell bloquea `npm`, usa `npm.cmd run dev`.

## Personalizar para un cliente

| Qué | Dónde |
|---|---|
| Nombre, contacto, envío, categorías, banners, vitrinas, textos | `src/config/tienda.ts` |
| Colores de la marca | `src/app/globals.css`, bloque `@theme` (`marca`, `tinta`, `acento`…) |
| Tipografía de títulos | `src/app/layout.tsx` (cualquier fuente de `next/font/google`) |
| Productos, stock y pedidos de ejemplo | `src/lib/datos.ts` |
| Imágenes de ejemplo | `public/ejemplo/` (reemplázalas por fotos reales, JPG o WebP de máx. 1600 px) |
| Logo | Copia el archivo a `public/` y pon su ruta en `logo` dentro de `tienda.ts` |
| Ícono de la pestaña | `src/app/icon.svg` y `src/app/apple-icon.png` |

Cada producto tiene **variantes**, una por cada opción que elige el cliente: talla, color o tamaño. Si el producto no tiene opciones, lleva una sola variante, por ejemplo "Única", y la ficha no muestra el selector.

Si cambias los datos de ejemplo, cambia también `claveDemo` en `tienda.ts`. Así los navegadores que ya abrieron la demo no siguen mostrando los datos viejos.

## Pantallas

| Dirección | Qué es |
|---|---|
| `/` | Portada corta: banners, beneficios, categorías, vitrinas y producto destacado |
| `/catalogo` | Catálogo con filtros por categoría, búsqueda, orden y paginación |
| `/producto/[slug]` | Ficha del producto con opciones, stock, características y ficha técnica |
| `/carrito` | Carrito, tipo de entrega y pago (simulado) |
| `/sistema` | Ingreso del personal (en la demo se elige el rol) |
| `/sistema/caja` | Caja con lector de código de barras (vendedor y admin) |
| `/sistema/admin` | Resumen, inventario, pedidos online y agregar producto (solo admin) |

La tienda no tiene ningún enlace al sistema interno: se entra escribiendo `/sistema`.

## Guion para mostrársela a un cliente

1. Abre la tienda en una pestaña y `/sistema` en otra. En esa segunda pestaña, entra como **Administrador**.
2. En la tienda, compra algo. En el panel aparece el pedido nuevo y el stock baja.
3. En la caja, presiona **Simular escaneo** o escribe un código de barras de `datos.ts` y presiona Enter. Luego cobra. La tienda de la otra pestaña muestra el stock nuevo al instante.
4. En **Agregar producto**, presiona **Rellenar con un ejemplo** y publica. El producto aparece en la tienda y en la caja.
5. **Reiniciar demo** (en el sistema) deja todo como al principio.

## Dónde está cada cosa

- `src/config/tienda.ts`: configuración de la tienda.
- `src/lib/datos.ts`: tipos `Producto` y `Variante`, productos y stock de ejemplo.
- `src/lib/demo-store.tsx`: estado de la demo (stock, carrito, ventas y sesión). Cuando se conecte Supabase, estas funciones pasan a llamar a la base de datos (`confirmar_pago`, `mover_stock`, etc.).
- `src/components/tienda/` y `src/components/sistema/`: las pantallas.

## Pendiente para una versión real

- Conectar Supabase: login real, productos, stock y fotos en Storage.
- Integrar Webpay o Mercado Pago.
- Reemplazar los `[CORCHETES]` de `tienda.ts`, las imágenes y los precios de ejemplo.
