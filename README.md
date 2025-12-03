# Prueba técnica – Catálogo y carrito

## Objetivo del proyecto

- Construir un catálogo de productos con detalle y carrito de compras.
- Cuidar la experiencia móvil: menú hamburguesa, tema oscuro y corrección de `100vh`.

## Tecnologías usadas

- Next.js (App Router) y React 18 con TypeScript.
- Tailwind CSS v4 (utilidades vía `@import "tailwindcss"`).
- `next/font` con familias Geist.
- API pública FakeStore para productos.

## Cómo iniciar el repo

- Requisitos: Node.js 18+ y npm.
- Instalar dependencias: `npm install`.
- Desarrollo (convencional): `npm run dev` y abrir `http://localhost:3000`.
- Desarrollo (Windows con `&` en la ruta): `node .\\node_modules\\next\\dist\\bin\\next dev`.
- Puerto alterno (PowerShell): `$env:PORT=3001; node .\\node_modules\\next\\dist\\bin\\next dev`.
- Producción: `node .\\node_modules\\next\\dist\\bin\\next build` y `node .\\node_modules\\next\\dist\\bin\\next start -p 3000`.
- Variables de entorno (opcional):
  - `.env.local`: `FAKESTORE_BASE=https://fakestoreapi.com`, `FETCH_TIMEOUT_MS=5000`.
  - En Vercel, define estas variables en Project Settings → Environment Variables.

## Funciones implementadas

- Listado de productos con filtro de categorías (`src/app/productos/page.tsx:21`).
- Detalle de producto (`src/app/productos/[id]/page.tsx`).
- Carrito con persistencia en `localStorage` y badge de cantidad (`src/components/cart/CartProvider.tsx:58`, `src/components/cart/CartBadge.tsx:6`).
- Animación “fly to cart” al agregar (`src/components/AddToCartButton.tsx:19`).
- Tema oscuro/claro con persistencia y cookie (`src/components/theme/ThemeProvider.tsx:18`, `src/components/theme/ThemeProvider.tsx:28`).
- Encabezado que detecta scroll y aplica blur (`src/components/Encabezado.tsx:13`, `src/components/Encabezado.tsx:50`).
- Menú hamburguesa móvil con opciones de tema y acceso al carrito (`src/components/Encabezado.tsx:67`).
- Corrección de `viewport` en móviles vía variables `--vh`/`--vw` (`src/app/layout.tsx:43`).
- Paddings laterales móviles en `px` (`src/app/layout.tsx:49`).

## Estructura del repo

- Rutas (App Router): `src/app/*` con páginas de catálogo, detalle y carrito.
- Componentes UI: `src/components/*` (tarjetas, filtros, encabezado y pie).
- Estado de tema y carrito: `src/components/theme/ThemeProvider.tsx`, `src/components/cart/CartProvider.tsx`.
- Cliente API y tipos: `src/lib/api.ts`.
- Estilos globales y utilidades: `src/app/globals.css`.

## Decisiones técnicas / arquitectura

- Context API para tema y carrito; persistencia en `localStorage` y cookie para el tema (`src/components/theme/ThemeProvider.tsx:33`).
- Normalización de imagenes de FakeStore para robustez (`src/lib/api.ts:44`).
- Corrección de `100vh` en iOS/Android con variables `--vh`/`--vw` y `beforeInteractive` (`src/app/layout.tsx:43`, `src/app/globals.css:31`).
- Tailwind v4 sin configuración explícita, utilidades en CSS y clases en JSX.
- Detección de scroll en contenedor `.app-scroll` y ventana con `Math.max` (`src/components/Encabezado.tsx:15`, `src/components/Encabezado.tsx:18`).

## Notas finales

- Limitaciones:
  - API pública sin caché; tiempos de respuesta variables.
  - Carga simulada en catálogo para demostrar estados (`src/app/productos/page.tsx:9`).
  - Accesibilidad básica en menú y filtros; falta pulir ARIA.
- Qué mejorarías si tuvieras más tiempo:
  - Tests unitarios e integración; verificación de accesibilidad.
  - Skeletons/placeholder y prefetch en navegación.
  - i18n, SEO meta y breadcrumbs.
  - Caché en cliente/servidor y Retry/Toast de errores.
- Observaciones:
  - Arquitectura modular y responsabilidades claras.
  - Enfoque mobile-first y estado global mínimo.
  - Sin dependencias pesadas adicionales.
