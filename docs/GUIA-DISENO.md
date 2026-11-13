# Guía para hacer buenos diseños

## 1. Tecnologías recomendadas (encajan con el stack del proyecto)

| Herramienta | Para qué sirve | Por qué |
|---|---|---|
| **Tailwind CSS v4** | Estilos | Hoy es el estándar en proyectos Next.js. La v4 se configura dentro del CSS (`@theme`) y ya no usa `tailwind.config.js`. |
| **shadcn/ui** | Componentes listos (botones, formularios, tablas, modales) | Copias el código del componente a tu proyecto y lo adaptas. Es accesible y la IA lo maneja muy bien. |
| **Lucide** | Íconos | Es el set que usa shadcn por defecto: líneas finas y consistentes. |
| **Motion** (ex Framer Motion) | Animaciones suaves | Sirve para las transiciones del carrito, la aparición de productos, etc. Úsalo con moderación. |
| **Google Fonts** | Tipografías | En la plantilla: *Fraunces* (títulos) + *Inter* (texto legible). Se cambian en `web/src/app/layout.tsx`. |

Comando para empezar en el proyecto `web`:
```
npx shadcn@latest init
npx shadcn@latest add button card input select table dialog badge
```

## 2. Herramientas con IA para diseñar más rápido

- **v0 (Vercel):** genera pantallas en código shadcn/Tailwind a partir de una descripción. Sirve para probar ideas y copiar el código a tu proyecto.
- **Figma Make / Figma:** sirve para diseñar y mostrar prototipos clicables a un cliente.
- **Google Stitch:** sirve para explorar varias ideas de interfaz muy rápido.
- **Claude Design:** sirve para maquetas y presentaciones que se pueden editar y compartir.

Flujo recomendado: **explorar** (Stitch o v0), luego **elegir y afinar** (lienzo o Figma), luego **mostrar al cliente** y por último **programar** (Next.js + shadcn).

## 3. Método: reglas que hacen que un diseño se vea profesional

1. **Mira referencias antes de diseñar.** Revisa 5 o 6 tiendas del mismo rubro del cliente y anota qué hacen bien: fotos, orden del catálogo, filtros.
2. **Pocas fuentes y pocos colores.** Usa 2 fuentes como máximo y 1 color de marca (en la plantilla, `--color-marca` en `web/src/app/globals.css`). Todo lo demás en neutros (negro, gris, blanco cálido).
3. **Espaciado de 8 en 8.** Márgenes y separaciones de 8, 16, 24, 32, 48 o 64 px. Esto solo ya ordena todo.
4. **Jerarquía clara.** En cada pantalla debe haber una sola cosa que se vea primero (título o precio) y un solo botón principal.
5. **Primero el celular.** La mayoría de los clientes va a entrar desde el teléfono. Diseña primero para 390 px de ancho y después agranda.
6. **Contraste y accesibilidad.** El texto gris sobre blanco debe tener un contraste de al menos 4.5:1. Los botones deben medir 44 px de alto como mínimo. Revísalo con la extensión *WAVE* o con Lighthouse en Chrome.
7. **Fotos reales y parejas.** Es lo que más impacto tiene en una tienda online. Usa fotos del proveedor (pregunta si las autoriza) o sácalas tú: fondo blanco o beige, misma luz y mismo encuadre para todas.
8. **Estados visibles.** Agotado, quedan 2, agregado al carrito, pago aprobado: el cliente siempre debe saber qué pasó.
9. **Textos cortos y en el idioma del cliente.** Por ejemplo "Retiro gratis en tienda" en vez de "Opción de entrega sin costo".

## 4. Checklist antes de mostrar o publicar

- [ ] Se ve bien en el celular (prueba en Chrome con F12 → modo dispositivo).
- [ ] Todos los botones hacen algo y tienen texto claro.
- [ ] Los precios, el stock y los totales cuadran entre pantallas.
- [ ] No queda ningún texto de ejemplo ni [CORCHETES].
- [ ] Las fotos tienen el mismo estilo.
- [ ] Lighthouse muestra Accesibilidad sobre 90.
