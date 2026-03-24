# Problema de Rutas Relativas en Astro (El Punto ".")

## El Problema

Cuando despliegas un sitio Astro en una **subcarpeta** (como `/prueba/` en lugar de la raíz del dominio), las rutas absolutas no funcionan correctamente.

### Ejemplo del problema:

Si el sitio genera rutas como:
```html
<link href="/_astro/index.DgNq9i2t.css">
<img src="/images/logo.svg">
```

Estas rutas apuntan a:
- `https://cetracon.cl/_astro/index.DgNq9i2t.css` ❌ (incorrecto)
- `https://cetracon.cl/images/logo.svg` ❌ (incorrecto)

Pero el sitio está en:
- `https://cetracon.cl/prueba/` ✅ (correcto)

Entonces los archivos reales están en:
- `https://cetracon.cl/prueba/_astro/index.DgNq9i2t.css`
- `https://cetracon.cl/prueba/images/logo.svg`

**Resultado:** No se cargan los CSS ni las imágenes.

---

## La Solución: Rutas Relativas con "."

### Configuración en `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  output: 'static',
  base: '.',  // ← ESTE ES EL PUNTO MÁGICO
});
```

### ⚠️ IMPORTANTE: Solo el punto, NO agregar slash

- ✅ **CORRECTO:** `base: '.'`
- ❌ **INCORRECTO:** `base: './'`
- ❌ **INCORRECTO:** `base: '/prueba'` (solo si sabes que siempre estará en esa carpeta)

### Qué hace el punto:

Con `base: '.'`, Astro genera rutas relativas:

```html
<link href="./_astro/index.DgNq9i2t.css">
<img src="./images/logo.svg">
```

Estas rutas funcionan en **cualquier ubicación**:
- `https://cetracon.cl/` ✅
- `https://cetracon.cl/prueba/` ✅
- `https://cetracon.cl/cualquier/carpeta/` ✅

---

## Cuándo usar cada opción:

### 1. `base: '.'` (Rutas relativas)
**Usar cuando:**
- El sitio puede estar en diferentes subcarpetas
- Quieres máxima portabilidad
- No sabes la ruta exacta del despliegue

**Genera:**
```html
<link href="./_astro/styles.css">
```

### 2. `base: '/subcarpeta'` (Rutas absolutas con prefijo)
**Usar cuando:**
- El sitio SIEMPRE estará en `/subcarpeta/`
- Necesitas URLs absolutas por alguna razón específica

**Genera:**
```html
<link href="/subcarpeta/_astro/styles.css">
```

### 3. Sin `base` (Rutas absolutas desde raíz)
**Usar cuando:**
- El sitio está en la raíz del dominio
- Es el comportamiento por defecto

**Genera:**
```html
<link href="/_astro/styles.css">
```

---

## Checklist para resolver el problema:

1. ✅ Agregar `base: '.'` en `astro.config.mjs`
2. ✅ Hacer `npm run build` para regenerar los archivos
3. ✅ Verificar en `dist/index.html` que las rutas tengan el punto:
   ```bash
   grep -o 'href="[^"]*"' dist/index.html | head -5
   ```
   Deberías ver: `href="./_astro/..."`
4. ✅ Hacer commit y push de los cambios
5. ✅ Desplegar y verificar que CSS e imágenes carguen correctamente

---

## Prompt para recordar:

**"Configura Astro para usar rutas relativas agregando `base: '.'` (solo el punto, sin slash) en astro.config.mjs para que funcione en subcarpetas"**

---

## Archivos afectados:

- `astro.config.mjs` - Configuración principal
- Todo el contenido de `dist/` después del build

---

## Notas adicionales:

- Este problema es común en Astro, Vite, y otros frameworks modernos
- Las rutas relativas son más portables pero pueden causar problemas con navegación del lado del cliente
- Si usas un router del lado del cliente, considera usar rutas absolutas con `base: '/subcarpeta'`
