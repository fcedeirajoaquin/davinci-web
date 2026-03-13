const defaultContent = {
  hero: {
    badge: 'Desde 1985 Transformando Espacios',
    titleLine1: 'Aberturas de Alta Prestación,',
    titleLine2: 'Herrería y Vidriería',
    subtitle: 'Diseño, construcción y calidad desde la fábrica a tu obra sin intermediarios.',
    features: [
      'Trato directo con el cliente',
      'Menor tiempo de obra',
      'Post venta garantizada',
      'Urgencias las 24 horas',
    ],
    ctaPrimary: 'Solicitar Presupuesto',
    ctaSecondary: 'Ver Servicios',
    stats: [
      { number: 40, suffix: '+', label: 'Años de Trabajos Realizados' },
      { number: 8000, suffix: '+', label: 'Clientes Conformes' },
      { number: 100, suffix: '%', label: 'Satisfacción Asegurada' },
    ],
  },

  about: {
    sectionLabel: 'Quienes Somos',
    titlePart1: 'Sobre ',
    titlePart2: 'Nosotros',
    description: 'Somos una empresa familiar de segunda generación, que desde la Ciudad de Buenos Aires atiende las necesidades de cientos de clientes en la ciudad y todo el conurbano.',
    contentTitle: 'De la fábrica a tu obra',
    contentP1: 'Contamos con fábrica de aberturas de alta prestación y vidriería propia, un excelente equipo de instaladores que combinados con nuestro equipo de herrería artística cubren un gran espectro de servicios y productos que garantizan la satisfacción total del cliente.',
    contentP2: 'Invertimos constantemente en tecnología y herramientas para estar siempre a la altura de los proyectos y las más altas expectativas de diseño, instalación y calidad.',
    imageUrl: '/images/about.webp',
    imageAlt: 'Casa moderna con ventanales de aluminio',
  },

  services: {
    sectionLabel: 'Lo Que Hacemos',
    titlePart1: 'Nuestros ',
    titlePart2: 'Servicios',
    bottomText: 'No encontraste lo que buscabas? Trabajamos con proyectos personalizados',
    bottomCta: 'Contactanos para un proyecto a medida',
    items: [
      {
        title: 'Fábrica de Aberturas de Alta Calidad',
        description: 'Fabricación propia de aberturas en aluminio con los más altos estándares de calidad.',
        features: ['Corredizas', 'Oscilobatientes', 'Paños fijos', 'A medida'],
      },
      {
        title: 'Herrería Artística y de Obra',
        description: 'Construcción bajo plano o diseño personalizado. Rejas, barandas, escaleras y estructuras metálicas.',
        features: ['Muebles de hierro', 'Estructuras metálicas', 'Rejas de seguridad', 'Tabiques divisorios'],
      },
      {
        title: 'Vidriería',
        description: 'Trabajos en vidrio de alta calidad para todo tipo de proyectos.',
        features: ['Pulidos / Biselados', 'Espejos touch', 'Demanda espontánea'],
      },
      {
        title: 'DVH',
        description: 'Doble vidriado hermético para máximo aislamiento térmico y acústico.',
        features: ['Bajo emisivo', 'Templado', 'Laminado', 'Control solar', 'Armado de DVH'],
      },
      {
        title: 'Puertas y Portones',
        description: 'Puertas de entrada, portones automatizados y cerramientos de seguridad.',
        features: ['Automáticas', 'Blindadas', 'Vidriadas', 'A medida'],
      },
      {
        title: 'Cerramientos',
        description: 'Cerramientos de balcones, terrazas y espacios exteriores con máxima durabilidad.',
        features: ['Balcones', 'Terrazas', 'Galerías', 'Patios'],
      },
      {
        title: 'Diseño Personalizado',
        description: 'Creamos diseños únicos adaptados a tu estilo y necesidades específicas.',
        features: ['Asesoramiento', 'Medidas exactas', 'Variedad de colores', 'Diseño a medida'],
      },
      {
        title: 'Instalación',
        description: 'Servicio completo de instalación profesional con garantía.',
        features: ['Instalación', 'Reparación', 'Garantía', 'Rejillas reglamentarias ENARGAS'],
      },
      {
        title: 'Urgencias 24 Horas',
        description: 'Atención inmediata para reparaciones y emergencias, todos los días.',
        features: ['Reparaciones urgentes', 'Rotura de Blindex 24x7', 'Respuesta rápida', 'Reemplazo de vidrios tradicionales y DVH'],
        isUrgency: true,
      },
    ],
  },

  parallaxCTA: {
    titlePart1: 'Tu proximo proyecto empieza ',
    titleAccent: 'aqui',
    subtitle: 'Contanos tu idea y te ayudamos a hacerla realidad con las mejores aberturas del mercado',
    cta: 'Solicitar Presupuesto Gratis',
    imageUrl: '/images/parallax-cta.webp',
  },

  testimonials: {
    sectionLabel: 'Testimonios',
    titlePart1: 'Lo Que Dicen ',
    titleAccent: 'Nuestros Clientes',
    subtitle: 'La satisfacción de nuestros clientes es nuestra mejor carta de presentación',
    items: [
      {
        name: 'Maria Gonzalez',
        role: 'Propietaria en Nordelta',
        text: 'Excelente trabajo en todas las ventanas de mi casa. La diferencia en aislación térmica es increible. Muy profesionales y puntuales.',
        stars: 5,
      },
      {
        name: 'Carlos Ruiz',
        role: 'Arquitecto',
        text: 'Trabajo con Da Vinci en todos mis proyectos. La calidad del aluminio y los acabados son superiores. Siempre cumplen con los plazos.',
        stars: 5,
      },
      {
        name: 'Laura Fernandez',
        role: 'Propietaria en Palermo',
        text: 'Cerraron mi balcón y quedo espectacular. El equipo fue muy prolijo y el resultado supero mis expectativas. 100% recomendables.',
        stars: 5,
      },
    ],
  },

  faq: {
    sectionLabel: 'FAQ',
    titlePart1: 'Preguntas ',
    titlePart2: 'Frecuentes',
    subtitle: 'Respondemos las consultas más comunes sobre nuestros servicios',
    bottomText: '¿Tenés otra pregunta?',
    bottomCta: 'Consultanos',
    items: [
      {
        question: '¿Qué tipos de aluminio utilizan?',
        answer: 'Trabajamos con aluminio de primera calidad, incluyendo líneas Modena, Herrero y A30 New. Todos nuestros perfiles son de origen nacional certificado, garantizando durabilidad y resistencia a la intemperie.',
      },
      {
        question: '¿Cuánto tiempo tarda un proyecto?',
        answer: 'Los tiempos varían según la complejidad del proyecto. Una ventana estándar puede estar lista en 7-10 días hábiles, mientras que proyectos más grandes como cerramientos completos pueden tomar entre 15-30 días. Siempre proporcionamos un cronograma detallado al inicio.',
      },
      {
        question: '¿Ofrecen garantía en sus trabajos?',
        answer: 'Sí, todos nuestros trabajos incluyen garantía. Los perfiles de aluminio tienen garantía de 10 años, los vidrios DVH 5 años, y la mano de obra de instalación 2 años. Además, brindamos servicio de mantenimiento post-instalación.',
      },
      {
        question: '¿Qué es el vidrio DVH y por qué conviene?',
        answer: 'El DVH (Doble Vidriado Hermético) consiste en dos vidrios separados por una cámara de aire seco. Esto proporciona un aislamiento térmico y acústico superior, reduciendo hasta un 50% la pérdida de energía y disminuyendo significativamente el ruido exterior.',
      },
      {
        question: '¿Hacen trabajos a medida?',
        answer: 'Absolutamente. Cada proyecto es único y nos adaptamos a las medidas y diseños específicos que necesites. Ofrecemos asesoramiento personalizado, renders 3D y una amplia variedad de colores y acabados para que el resultado sea exactamente lo que imaginás.',
      },
      {
        question: '¿Cuál es la zona de cobertura?',
        answer: 'Trabajamos en CABA y zona norte. Nuestra base está en Belgrano pero realizamos instalaciones en todo Capital Federal, Vicente López, San Isidro, Olivos, Martínez y alrededores. Para proyectos más alejados, consultanos y evaluamos la viabilidad.',
      },
    ],
  },

  contact: {
    sectionLabel: 'Hablemos',
    title: 'Contactanos',
    subtitle: 'Tenes un proyecto en mente? Escribinos y te respondemos a la brevedad',
    formTitle: 'Solicitar Presupuesto',
    phone: '011 6154-9740',
    whatsappNumber: '5491161549740',
    whatsappLabel: 'Chatea con nosotros',
    address: 'Amenábar 1929, Belgrano',
    instagram: '@davinci_vidrieríayherrería',
    instagramUrl: 'https://www.instagram.com/davinci_vidrieríayherrería/',
    mapQuery: 'Vidriería+%26+Herrería+Da+Vinci+Amenábar+1929+Belgrano+Buenos+Aires',
  },

  footer: {
    companyName: 'DA VINCI',
    companySubtitle: 'Aberturas',
    description: 'Creadores de espacios únicos. Especializados en vidriería y herrería de aluminio con mas de 10 años de experiencia.',
    address: 'Amenábar 1929, Belgrano',
    phone: '011 6154-9740',
    copyright: 'Da Vinci Vidrieria y Herreria. Todos los derechos reservados.',
  },
}

export default defaultContent
