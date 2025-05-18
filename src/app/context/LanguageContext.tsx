'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type LanguageContextType = {
  language: 'en' | 'es';
  toggleLanguage: () => void;
  t: (key: string) => string;
};

type TranslationsType = {
  [language: string]: {
    [key: string]: string;
  };
};

const translations: TranslationsType = {
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',
    'nav.cv': 'Resume',
    
    // Hero Section
    'hero.title': 'Data Scientist & ML Engineer',
    'hero.subtitle': 'Building intelligent data solutions that deliver real business impact',
    'hero.cta': 'View My Work',
    'hero.university': 'University of the Basque Country',
    'hero.degree': 'B.Sc. in Artificial Intelligence',
    'hero.github': 'GitHub',
    'hero.position.ml': 'ML Engineer',
    'hero.position.data': 'Data Scientist',
    
    // About Section
    'about.title': 'About Me',
    'about.description': "I'm a Data Scientist and Machine Learning Engineer passionate about transforming data into actionable insights. With expertise in AI/ML model development and deployment, I help organizations leverage data-driven decision making for competitive advantage.",
    'about.card1.title': 'AI & ML Expertise',
    'about.card1.description': 'Developed and deployed AI solutions including anomaly detection systems, predictive models, and natural language processing applications.',
    'about.card2.title': 'Data Pipeline Engineer',
    'about.card2.description': 'Experience building robust data pipelines and ETL processes that ensure data quality and availability for analytics workloads.',
    'about.card3.title': 'Cloud-Native Deployment',
    'about.card3.description': 'Skilled in containerizing ML applications and deploying them to production environments using Docker and Kubernetes.',
    'about.profile.title': 'Professional Profile',
    'about.profile.p1': 'As a Data Scientist and ML Engineer with a degree in Artificial Intelligence, I specialize in developing data-driven solutions that solve real business problems. My expertise includes machine learning, data engineering, and deploying AI systems in production environments.',
    'about.profile.p2': 'Currently working at Devol as a Data & AI Engineer, I\'m leading the development of LLM-based document extraction systems and natural language interfaces. I\'m passionate about using cutting-edge technologies to create practical applications that deliver measurable business value.',
    'about.profile.p3': 'I have a strong foundation in Python, ML frameworks, and cloud technologies, with experience in the entire ML lifecycle from data preparation to model deployment and monitoring.',
    'about.contact.job': 'Data & AI Engineer',
    'about.contact.location': 'Bilbao, Spain',
    'about.contact.email': 'hola@markelramiro.com',
    
    // Skills Section
    'skills.title': 'Technical Skills',
    'skills.description': 'My toolkit for solving complex data challenges',
    'skills.categories.ml': 'AI & Machine Learning',
    'skills.categories.backend': 'Backend & Infrastructure',
    'skills.categories.databases': 'Databases & Frontend',
    'skills.stack': 'Technology Stack',
    
    // Projects Section
    'projects.title': 'Featured Projects',
    'projects.subtitle': 'A selection of data science and machine learning projects showcasing my technical abilities',
    'projects.viewcode': 'View Code',
    'projects.viewdemo': 'Live Demo',
    'projects.case': 'Case Study',
    'projects.download': 'Download',
    'projects.filters.all': 'All Projects',
    'projects.filters.ml': 'Machine Learning',
    'projects.filters.data': 'Data Engineering',
    'projects.filters.nlp': 'NLP',
    'projects.github': 'View More on GitHub',
    'projects.featured': 'Featured Project',
    'projects.anomaly.title': 'Anomaly Detection System',
    'projects.anomaly.desc': 'Developed an anomaly detection system for API performance monitoring using statistical methods and machine learning. The system processes time-series data in real-time and sends alerts when unusual patterns are detected.',
    'projects.docmind.title': 'DocMind LLM Document Extraction',
    'projects.docmind.desc': 'Led development of an LLM-based system that automatically extracts structured data from unstructured documents, reducing manual processing time by 85% for enterprise clients.',
    'projects.timeseries.title': 'Time Series Forecasting',
    'projects.timeseries.desc': 'Built a time series forecasting model using LSTM neural networks and Transformer architecture to predict future values with high accuracy. The model was deployed as a web service for real-time predictions.',
    'projects.nlp.title': 'Natural Language to SQL',
    'projects.nlp.desc': 'Built a RAG-based system that converts natural language questions into SQL queries, allowing non-technical users to query databases using conversational language.',
    
    // Experience Section
    'experience.title': 'Professional Experience',
    'experience.description': 'My journey in the world of data science and machine learning',
    'experience.current': 'Current Role',
    'experience.devol': 'Data & AI Engineer at',
    'experience.devol.desc': 'Leading AI development initiatives for enterprise clients, focusing on document processing automation, natural language interfaces, and predictive analytics. Responsible for end-to-end model development, from data preparation to production deployment.',
    'experience.milestone': 'Growth & Milestones',
    'experience.transactions': '€30,000+ in transactions with Wippass',
    'experience.transactions.desc': 'Processed over €30,000 in transactions with my ticketing platform Wippass, serving local events and managing 7,000+ registered users.',
    'experience.professional': 'Professional Experience',
    'experience.internship': 'AI Integration Specialist at Nomada Omnimotion',
    'experience.internship.desc': 'Contributed to VR technology innovation by developing AI-powered pose estimation systems for omnidirectional treadmills. Engineered sensor fusion algorithms for real-time motion data integration.',
    'experience.freelance': 'Freelance & Self-employment',
    'experience.selfemployed': 'Freelance Developer',
    'experience.selfemployed.desc': 'Developed MVP for a grant-winning portal connecting workers with financial/psychological support services. Deployed and maintained production environment with monitoring and automated scaling capabilities.',
    'experience.origin': 'The Origin',
    'experience.wippass': 'Founder at Wippass',
    'experience.wippass.desc': 'Built and deployed a complete ticketing platform handling €30,000+ in transactions for local events. Achieved multiple sold-out events (900+ attendees) and was featured in El Referente magazine for entrepreneurial innovation.',
    'experience.years': 'Years of Experience',
    'experience.projects': 'ML Projects Delivered',
    'experience.tech': 'Technologies Mastered',
    
    // Contact Section
    'contact.title': 'Contact Me',
    'contact.description': 'Interested in working together? Reach out through any of these channels.',
    'contact.email': 'Email',
    'contact.location': 'Location',
    'contact.connect': 'Connect',
    'contact.download': 'Download Resume',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.built': 'Built with',
    'footer.using': 'using Next.js and Tailwind CSS',
  },
  es: {
    // Navigation
    'nav.about': 'Sobre mí',
    'nav.skills': 'Habilidades',
    'nav.projects': 'Proyectos',
    'nav.experience': 'Experiencia',
    'nav.contact': 'Contacto',
    'nav.cv': 'Currículum',
    
    // Hero Section
    'hero.title': 'Científico de Datos e Ingeniero ML',
    'hero.subtitle': 'Construyendo soluciones inteligentes con datos que generan impacto real en los negocios',
    'hero.cta': 'Ver mi trabajo',
    'hero.university': 'Universidad del País Vasco',
    'hero.degree': 'Grado en Inteligencia Artificial',
    'hero.github': 'GitHub',
    'hero.position.ml': 'Ingeniero ML',
    'hero.position.data': 'Científico de Datos',
    
    // About Section
    'about.title': 'Sobre Mí',
    'about.description': 'Soy un Científico de Datos e Ingeniero de Machine Learning apasionado por transformar datos en información accionable. Con experiencia en desarrollo y despliegue de modelos de IA/ML, ayudo a las organizaciones a aprovechar la toma de decisiones basada en datos para obtener ventajas competitivas.',
    'about.card1.title': 'Experiencia en IA y ML',
    'about.card1.description': 'He desarrollado e implementado soluciones de IA que incluyen sistemas de detección de anomalías, modelos predictivos y aplicaciones de procesamiento de lenguaje natural.',
    'about.card2.title': 'Ingeniero de Data Pipelines',
    'about.card2.description': 'Experiencia construyendo pipelines de datos robustos y procesos ETL que garantizan la calidad y disponibilidad de los datos para cargas de trabajo analíticas.',
    'about.card3.title': 'Despliegue Cloud-Native',
    'about.card3.description': 'Especializado en containerizar aplicaciones ML y desplegarlas en entornos de producción utilizando Docker y Kubernetes.',
    'about.profile.title': 'Perfil Profesional',
    'about.profile.p1': 'Como Científico de Datos e Ingeniero ML con un grado en Inteligencia Artificial, me especializo en desarrollar soluciones basadas en datos que resuelven problemas empresariales reales. Mi experiencia incluye machine learning, ingeniería de datos y despliegue de sistemas de IA en entornos de producción.',
    'about.profile.p2': 'Actualmente trabajando en Devol como Ingeniero de Datos e IA, lidero el desarrollo de sistemas de extracción de documentos basados en LLM e interfaces de lenguaje natural. Me apasiona utilizar tecnologías de vanguardia para crear aplicaciones prácticas que aportan valor empresarial medible.',
    'about.profile.p3': 'Tengo una sólida base en Python, frameworks de ML y tecnologías cloud, con experiencia en todo el ciclo de vida de ML, desde la preparación de datos hasta el despliegue y monitorización de modelos.',
    'about.contact.job': 'Ingeniero de Datos e IA',
    'about.contact.location': 'Bilbao, España',
    'about.contact.email': 'hola@markelramiro.com',
    
    // Skills Section
    'skills.title': 'Habilidades Técnicas',
    'skills.description': 'Mi caja de herramientas para resolver desafíos complejos de datos',
    'skills.categories.ml': 'IA y Machine Learning',
    'skills.categories.backend': 'Backend e Infraestructura',
    'skills.categories.databases': 'Bases de Datos y Frontend',
    'skills.stack': 'Stack Tecnológico',
    
    // Projects Section
    'projects.title': 'Proyectos Destacados',
    'projects.subtitle': 'Una selección de proyectos de ciencia de datos y machine learning que muestran mis habilidades técnicas',
    'projects.viewcode': 'Ver Código',
    'projects.viewdemo': 'Demo en Vivo',
    'projects.case': 'Caso Práctico',
    'projects.download': 'Descargar',
    'projects.filters.all': 'Todos los Proyectos',
    'projects.filters.ml': 'Machine Learning',
    'projects.filters.data': 'Ingeniería de Datos',
    'projects.filters.nlp': 'PLN',
    'projects.github': 'Ver Más en GitHub',
    'projects.featured': 'Proyecto Destacado',
    'projects.anomaly.title': 'Sistema de Detección de Anomalías',
    'projects.anomaly.desc': 'Desarrollé un sistema de detección de anomalías para monitoreo del rendimiento de APIs utilizando métodos estadísticos y machine learning. El sistema procesa datos de series temporales en tiempo real y envía alertas cuando se detectan patrones inusuales.',
    'projects.docmind.title': 'Extracción de Documentos con LLM (DocMind)',
    'projects.docmind.desc': 'Lideré el desarrollo de un sistema basado en LLM que extrae automáticamente datos estructurados de documentos no estructurados, reduciendo el tiempo de procesamiento manual en un 85% para clientes empresariales.',
    'projects.timeseries.title': 'Predicción de Series Temporales',
    'projects.timeseries.desc': 'Construí un modelo de predicción de series temporales utilizando redes neuronales LSTM y arquitectura Transformer para predecir valores futuros con alta precisión. El modelo se desplegó como servicio web para predicciones en tiempo real.',
    'projects.nlp.title': 'Lenguaje Natural a SQL',
    'projects.nlp.desc': 'Construí un sistema basado en RAG que convierte preguntas en lenguaje natural a consultas SQL, permitiendo a usuarios no técnicos consultar bases de datos utilizando lenguaje conversacional.',
    
    // Experience Section
    'experience.title': 'Experiencia Profesional',
    'experience.description': 'Mi trayectoria en el mundo de la ciencia de datos y el machine learning',
    'experience.current': 'Rol Actual',
    'experience.devol': 'Ingeniero de Datos e IA en',
    'experience.devol.desc': 'Liderando iniciativas de desarrollo de IA para clientes empresariales, enfocándome en automatización de procesamiento de documentos, interfaces de lenguaje natural y análisis predictivo. Responsable del desarrollo de modelos de extremo a extremo, desde la preparación de datos hasta el despliegue en producción.',
    'experience.milestone': 'Crecimiento e Hitos',
    'experience.transactions': '€30.000+ en transacciones con Wippass',
    'experience.transactions.desc': 'Procesé más de €30.000 en transacciones con mi plataforma de venta de entradas Wippass, atendiendo eventos locales y gestionando más de 7.000 usuarios registrados.',
    'experience.professional': 'Experiencia Profesional',
    'experience.internship': 'Especialista en Integración de IA en Nomada Omnimotion',
    'experience.internship.desc': 'Contribuí a la innovación en tecnología VR desarrollando sistemas de estimación de postura basados en IA para cintas omnidireccionales. Diseñé algoritmos de fusión de sensores para la integración de datos de movimiento en tiempo real.',
    'experience.freelance': 'Freelance y Autoempleo',
    'experience.selfemployed': 'Desarrollador Freelance',
    'experience.selfemployed.desc': 'Desarrollé MVP para un portal premiado con subvención que conecta trabajadores con servicios de apoyo financiero/psicológico. Desplegué y mantuve entorno de producción con monitorización y capacidades de escalado automático.',
    'experience.origin': 'El Origen',
    'experience.wippass': 'Fundador de Wippass',
    'experience.wippass.desc': 'Construí y desplegué una plataforma completa de venta de entradas gestionando más de €30.000 en transacciones para eventos locales. Logré múltiples eventos con entradas agotadas (900+ asistentes) y fui destacado en la revista El Referente por innovación emprendedora.',
    'experience.years': 'Años de Experiencia',
    'experience.projects': 'Proyectos ML Entregados',
    'experience.tech': 'Tecnologías Dominadas',
    
    // Contact Section
    'contact.title': 'Contáctame',
    'contact.description': '¿Interesado en trabajar juntos? Ponte en contacto a través de cualquiera de estos canales.',
    'contact.email': 'Email',
    'contact.location': 'Ubicación',
    'contact.connect': 'Conectar',
    'contact.download': 'Descargar Currículum',
    
    // Footer
    'footer.rights': 'Todos los derechos reservados',
    'footer.built': 'Construido con',
    'footer.using': 'usando Next.js y Tailwind CSS',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Try to get the stored language preference or default to 'en'
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  // Load saved language preference from localStorage on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguage(savedLanguage as 'en' | 'es');
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'es' : 'en';
    setLanguage(newLanguage);
    // Save preference to localStorage
    localStorage.setItem('language', newLanguage);
  };

  const t = (key: string): string => {
    // Safely access translations with proper fallbacks
    if (!translations[language]) {
      return key;
    }
    
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};