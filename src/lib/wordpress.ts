const WP_API_URL = import.meta.env.PUBLIC_WP_API_URL || 'http://localhost:8000/wp-json/wp/v2';

export interface Servicio {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  acf: {
    descripcion_corta: string;
    descripcion_larga: string;
    icono: string;
  };
}

export interface ContactoInfo {
  telefono: string;
  email: string;
  direccion: string;
  horario: string;
  whatsapp?: string;
}

export async function getServicios(): Promise<Servicio[]> {
  try {
    const response = await fetch(`${WP_API_URL}/servicios?_embed&per_page=100`);
    if (!response.ok) {
      console.warn('WordPress API not available, using fallback data');
      return getFallbackServicios();
    }
    return await response.json();
  } catch (error) {
    console.warn('Error fetching servicios:', error);
    return getFallbackServicios();
  }
}

export async function getServicioBySlug(slug: string): Promise<Servicio | null> {
  try {
    const response = await fetch(`${WP_API_URL}/servicios?slug=${slug}&_embed`);
    if (!response.ok) {
      return getFallbackServicios().find(s => s.slug === slug) || null;
    }
    const data = await response.json();
    return data[0] || null;
  } catch (error) {
    console.warn('Error fetching servicio:', error);
    return getFallbackServicios().find(s => s.slug === slug) || null;
  }
}

export async function getContactoInfo(): Promise<ContactoInfo> {
  try {
    const response = await fetch(`${WP_API_URL}/contacto-info`);
    if (!response.ok) {
      return getFallbackContacto();
    }
    return await response.json();
  } catch (error) {
    console.warn('Error fetching contacto info:', error);
    return getFallbackContacto();
  }
}

function getFallbackServicios(): Servicio[] {
  return [
    {
      id: 1,
      slug: 'lineas-electricas',
      title: { rendered: 'Líneas Eléctricas' },
      acf: {
        descripcion_corta: 'Torres de alta tensión, servidumbres eléctricas y tendido de cables',
        descripcion_larga: 'Asesoramos a propietarios afectados por proyectos de líneas eléctricas de alta tensión. Conocemos los valores reales de indemnización por servidumbres eléctricas, instalación de torres y tendido de cables. Nuestro equipo tiene 13 años de experiencia negociando estos proyectos desde el lado de las empresas constructoras, por lo que sabemos exactamente cuánto corresponde pagar por cada tipo de afectación.',
        icono: 'zap'
      }
    },
    {
      id: 2,
      slug: 'carreteras',
      title: { rendered: 'Carreteras' },
      acf: {
        descripcion_corta: 'Autopistas, caminos rurales, ampliaciones viales y conexiones',
        descripcion_larga: 'Defendemos los derechos de propietarios afectados por proyectos viales: autopistas, ampliaciones de carreteras, caminos rurales y nuevas conexiones. Sabemos que las empresas constructoras tienen presupuestos definidos para expropiaciones e indemnizaciones. Utilizamos ese conocimiento para conseguir compensaciones justas que reflejen el verdadero impacto en tu propiedad.',
        icono: 'route'
      }
    },
    {
      id: 3,
      slug: 'acueductos',
      title: { rendered: 'Acueductos' },
      acf: {
        descripcion_corta: 'Ductos de agua, canales de riego y sistemas de distribución',
        descripcion_larga: 'Representamos a propietarios afectados por proyectos de acueductos, canales de riego y sistemas de distribución de agua. Estos proyectos generan servidumbres permanentes que afectan el uso y valor de tu terreno. Conocemos los valores de mercado y los presupuestos reales de las empresas, lo que nos permite negociar indemnizaciones que compensen adecuadamente la afectación.',
        icono: 'droplet'
      }
    },
    {
      id: 4,
      slug: 'otras-obras',
      title: { rendered: 'Otras Obras' },
      acf: {
        descripcion_corta: 'Gasoductos, oleoductos, fibra óptica y proyectos especiales',
        descripcion_larga: 'Asesoramos en todo tipo de proyectos de infraestructura: gasoductos, oleoductos, fibra óptica y otros proyectos especiales que requieran servidumbres o afectaciones a propiedades privadas. Cada proyecto es único, pero nuestra experiencia de 13 años trabajando para empresas constructoras nos permite identificar rápidamente el valor justo de cada indemnización.',
        icono: 'scale'
      }
    }
  ];
}

function getFallbackContacto(): ContactoInfo {
  return {
    telefono: '+56 9 1234 5678',
    email: 'contacto@cetraconsultores.cl',
    direccion: 'Santiago, Chile',
    horario: 'Lunes a Viernes, 9:00 - 18:00',
    whatsapp: '+56 9 1234 5678'
  };
}
