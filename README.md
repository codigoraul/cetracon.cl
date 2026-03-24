# Cetraconsultores - Sitio Web

Sitio web onepage en Astro con integración a WordPress headless para gestión de servicios y datos de contacto.

## Características

- **Onepage** con navegación por anclas
- **Páginas dinámicas** de detalle de servicios
- **Integración WordPress headless** vía API REST
- **TailwindCSS** para estilos
- **Responsive** y optimizado para SEO
- **Datos fallback** cuando WordPress no está disponible

## Estructura del Proyecto

```
/
├── public/
│   └── images/
│       └── logo-cetracon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── Problema.astro
│   │   ├── ServiciosSection.astro
│   │   ├── Nosotros.astro
│   │   ├── Proceso.astro
│   │   ├── CTASection.astro
│   │   └── Contacto.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── lib/
│   │   └── wordpress.ts
│   ├── pages/
│   │   ├── index.astro
│   │   └── servicios/
│   │       └── [slug].astro
│   └── styles/
│       └── global.css
└── package.json
```

## Configuración

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno (opcional):
```bash
cp .env.example .env
```

Editar `.env` y configurar la URL de WordPress:
```
PUBLIC_WP_API_URL=https://tu-wordpress.com/wp-json/wp/v2
```

## Desarrollo

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:4321`

## Build

```bash
npm run build
```

## WordPress Setup

### Custom Post Type: Servicios

Crear un CPT llamado `servicios` con los siguientes campos ACF:

- `descripcion_corta` (Text)
- `descripcion_larga` (Textarea)
- `icono` (Text) - Valores: `zap`, `route`, `droplet`, `scale`

### Custom Endpoint: Contacto Info

Crear un endpoint personalizado en `functions.php`:

```php
add_action('rest_api_init', function () {
  register_rest_route('wp/v2', '/contacto-info', array(
    'methods' => 'GET',
    'callback' => 'get_contacto_info',
  ));
});

function get_contacto_info() {
  return array(
    'telefono' => get_option('contacto_telefono'),
    'email' => get_option('contacto_email'),
    'direccion' => get_option('contacto_direccion'),
    'horario' => get_option('contacto_horario'),
    'whatsapp' => get_option('contacto_whatsapp'),
  );
}
```

## Paleta de Colores

- **Primary (Azul):** `#063E7A`
- **Secondary (Verde):** `#2EAA7A`
- **Dark (Gris):** `#3F444A`

## Secciones de la Onepage

1. **Hero** - Mensaje principal con CTAs
2. **Problema** - Contexto del problema que resuelven
3. **Servicios** - 4 tipos de obras (dinámico desde WordPress)
4. **Nosotros** - Experiencia y credenciales
5. **Proceso** - 4 pasos del servicio
6. **CTA Intermedio** - Llamado a la acción
7. **Contacto** - Formulario e información (dinámico desde WordPress)

## Notas

- El sitio funciona sin WordPress usando datos fallback
- Los servicios se generan estáticamente en build time
- La navegación es por anclas (#servicios, #nosotros, etc.)
- Cada servicio tiene su propia página de detalle
