// Type pour les langues supportées
export type Language = 'fr' | 'ar' | 'en' | 'es';

// Traductions pour toutes les langues
export const translations = {
  // Navigation
  home: {
    fr: "Accueil",
    ar: "الرئيسية",
    en: "Home",
    es: "Inicio"
  },
  about: {
    fr: "À propos",
    ar: "حولنا",
    en: "About",
    es: "Acerca de"
  },
  gallery: {
    fr: "Galerie",
    ar: "المعرض",
    en: "Gallery",
    es: "Galería"
  },
  booking: {
    fr: "Réservation",
    ar: "الحجز",
    en: "Booking",
    es: "Reservas"
  },
  
  // Actions
  bookNow: {
    fr: "Réserver maintenant",
    ar: "احجز الآن",
    en: "Book Now",
    es: "Reservar Ahora"
  },
  getQuote: {
    fr: "Demander un devis",
    ar: "طلب عرض سعر",
    en: "Get Quote",
    es: "Solicitar Cotización"
  },
  learnMore: {
    fr: "En savoir plus",
    ar: "اعرف المزيد",
    en: "Learn More",
    es: "Saber Más"
  },
  
  // Hero Section
  heroTitle: {
    fr: "Découvrez le Maroc Authentique",
    ar: "اكتشف المغرب الأصيل",
    en: "Discover Authentic Morocco",
    es: "Descubre el Marruecos Auténtico"
  },
  heroSubtitle: {
    fr: "Voyages sur mesure, guides experts, expériences inoubliables",
    ar: "رحلات مخصصة، مرشدون خبراء، تجارب لا تُنسى",
    en: "Tailor-made trips, expert guides, unforgettable experiences",
    es: "Viajes a medida, guías expertos, experiencias inolvidables"
  },
  
  // Common
  price: {
    fr: "Prix",
    ar: "السعر",
    en: "Price",
    es: "Precio"
  },
  duration: {
    fr: "Durée",
    ar: "المدة",
    en: "Duration",
    es: "Duración"
  },
  difficulty: {
    fr: "Difficulté",
    ar: "الصعوبة",
    en: "Difficulty",
    es: "Dificultad"
  },
  
  // Contact
  contact: {
    fr: "Contact",
    ar: "اتصل بنا",
    en: "Contact",
    es: "Contacto"
  },
  phone: {
    fr: "Téléphone",
    ar: "الهاتف",
    en: "Phone",
    es: "Teléfono"
  },
  email: {
    fr: "Email",
    ar: "البريد الإلكتروني",
    en: "Email",
    es: "Correo"
  }
};

// Fonction helper pour obtenir une traduction
export const getTranslation = (key: keyof typeof translations, language: Language): string => {
  return translations[key][language] || translations[key].fr;
};
