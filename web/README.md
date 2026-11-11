# Nube Aromática: app web (demo)

App Next.js con la tienda online y el sistema interno. **Por ahora es una demo**: usa datos de ejemplo guardados en el navegador. Todavía no está conectada a Supabase ni a un medio de pago real.

## Cómo abrirla

```bash
npm install
npm run dev
```

Después abre http://localhost:3000.

## Pantallas

| Dirección | Qué es |
|---|---|
| `/` | Tienda: portada y catálogo (filtros, búsqueda y orden) |
| `/producto/[slug]` | Detalle del producto con tamaños y stock |
| `/carrito` | Carrito, tipo de entrega y pago (simulado) |
| `/sistema` | Ingreso del personal (en la demo se elige el rol) |
| `/sistema/caja` | Caja con lector de código de barras (vendedor y admin) |
| `/sistema/admin` | Resumen, inventario, pedidos online y agregar producto (solo admin) |

La tienda no tiene ningún enlace al sistema interno: se entra escribiendo `/sistema`.

## Guion para mostrársela a un cliente

1. Abre la tienda en una pestaña y `/sistema` en otra (entra como **Administrador**).
2. En la tienda, compra un Dior Sauvage. En el panel aparece el pedido nuevo y el stock baja.
3. En la caja, presiona **Simular escaneo** o escribe `7800001000017` y Enter, y luego cobra. La tienda de la otra pestaña muestra el stock nuevo al instante.
4. En **Agregar producto**, presiona **Rellenar con un ejemplo** y publica. El perfume aparece en la tienda y en la caja.
5. **Reiniciar demo** (en el sistema) deja todo como al principio.

## Dónde está cada cosa

- `src/lib/datos.ts`: productos, stock y pedidos de ejemplo.
- `src/lib/demo-store.tsx`: estado de la demo (stock, carrito, ventas y sesión). Cuando se conecte Supabase, estas funciones pasan a llamar a la base de datos (`confirmar_pago`, `mover_stock`, etc.).
- `src/components/tienda/` y `src/components/sistema/`: las pantallas.
- `src/app/globals.css`: colores y tipografías de la marca (Tailwind v4, `@theme`).

## Pendiente para la versión real

- Conectar Supabase (login real, productos, stock y fotos en Storage).
- Integrar Webpay o Mercado Pago.
- Reemplazar los `[CORCHETES]`, las fotos referenciales y los precios.
