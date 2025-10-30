'use client';

import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube, Star, Shield, Award } from 'lucide-react';

interface UltraSimpleFooterProps {
  language: 'fr' | 'ar' | 'en' | 'es';
}

export default function UltraSimpleFooter({ language }: UltraSimpleFooterProps) {
  const content = {
    fr: {
      company: {
        name: "Morocco Desert Tours",
        description: "Votre partenaire de confiance pour découvrir les merveilles du Maroc depuis 2009. Expériences authentiques, guides certifiés, satisfaction garantie.",
        address: "123 Avenue Mohammed V, Marrakech 40000, Maroc",
        phone: "+212 772321613",
        email: "contact@moroccotours.com",
        hours: "Lun-Dim: 8h00-20h00"
      },
      destinations: {
        title: "Destinations",
        items: ["Marrakech", "Fès", "Sahara", "Chefchaouen", "Essaouira", "Casablanca"]
      },
      services: {
        title: "Services",
        items: ["Circuits Privés", "Groupes", "Transport", "Hébergement", "Guides", "Excursions d'une journée"]
      },
      support: {
        title: "Support",
        items: ["Centre d'aide", "FAQ", "Politique d'annulation", "Conditions générales", "Confidentialité", "Réclamations"]
      },
      newsletter: {
        title: "Newsletter",
        description: "Recevez nos offres exclusives",
        placeholder: "Votre email",
        button: "S'abonner"
      },
      social: "Suivez-nous",
      copyright: "© 2024 Morocco Desert Tours. Tous droits réservés.",
      trust: {
        rating: "4.9/5 sur 2,847 avis",
        experience: "15 ans d'expérience",
        clients: "50,000+ clients satisfaits"
      }
    },
    ar: {
      company: {
        name: "جولات الصحراء المغربية",
        description: "شريكك الموثوق لاكتشاف عجائب المغرب منذ 2009. تجارب أصيلة، مرشدون معتمدون، رضا مضمون.",
        address: "123 شارع محمد الخامس، مراكش 40000، المغرب",
        phone: "+212 772321613",
        email: "contact@moroccotours.com",
        hours: "الإثنين-الأحد: 8:00-20:00"
      },
      destinations: {
        title: "الوجهات",
        items: ["مراكش", "فاس", "الصحراء", "شفشاون", "الصويرة", "الدار البيضاء"]
      },
      services: {
        title: "الخدمات",
        items: ["جولات خاصة", "مجموعات", "النقل", "الإقامة", "المرشدون", "رحلات يوم واحد"]
      },
      support: {
        title: "الدعم",
        items: ["مركز المساعدة", "الأسئلة الشائعة", "سياسة الإلغاء", "الشروط العامة", "الخصوصية", "الشكاوى"]
      },
      newsletter: {
        title: "النشرة الإخبارية",
        description: "احصل على عروضنا الحصرية",
        placeholder: "بريدك الإلكتروني",
        button: "اشتراك"
      },
      social: "تابعنا",
      copyright: "© 2024 جولات الصحراء المغربية. جميع الحقوق محفوظة.",
      trust: {
        rating: "4.9/5 على 2,847 تقييم",
        experience: "15 سنة من الخبرة",
        clients: "50,000+ عميل راضٍ"
      }
    },
    en: {
      company: {
        name: "Morocco Desert Tours",
        description: "Your trusted partner to discover Morocco's wonders since 2009. Authentic experiences, certified guides, satisfaction guaranteed.",
        address: "123 Avenue Mohammed V, Marrakech 40000, Morocco",
        phone: "+212 772321613",
        email: "contact@moroccotours.com",
        hours: "Mon-Sun: 8:00-20:00"
      },
      destinations: {
        title: "Destinations",
        items: ["Marrakech", "Fez", "Sahara", "Chefchaouen", "Essaouira", "Casablanca"]
      },
      services: {
        title: "Services",
        items: ["Private Tours", "Groups", "Transport", "Accommodation", "Guides", "Day Trips"]
      },
      support: {
        title: "Support",
        items: ["Help Center", "FAQ", "Cancellation Policy", "Terms & Conditions", "Privacy", "Complaints"]
      },
      newsletter: {
        title: "Newsletter",
        description: "Receive our exclusive offers",
        placeholder: "Your email",
        button: "Subscribe"
      },
      social: "Follow us",
      copyright: "© 2024 Morocco Desert Tours. All rights reserved.",
      trust: {
        rating: "4.9/5 from 2,847 reviews",
        experience: "15 years of experience",
        clients: "50,000+ happy clients"
      }
    },
    es: {
      company: {
        name: "Tours del Desierto de Marruecos",
        description: "Tu socio de confianza para descubrir las maravillas de Marruecos desde 2009. Experiencias auténticas, guías certificados, satisfacción garantizada.",
        address: "123 Avenida Mohammed V, Marrakech 40000, Marruecos",
        phone: "+212 772321613",
        email: "contact@moroccotours.com",
        hours: "Lun-Dom: 8:00-20:00"
      },
      destinations: {
        title: "Destinos",
        items: ["Marrakech", "Fez", "Sáhara", "Chefchaouen", "Esauira", "Casablanca"]
      },
      services: {
        title: "Servicios",
        items: ["Tours Privados", "Grupos", "Transporte", "Alojamiento", "Guías", "Excursiones de un día"]
      },
      support: {
        title: "Soporte",
        items: ["Centro de ayuda", "FAQ", "Política de cancelación", "Términos y Condiciones", "Privacidad", "Reclamaciones"]
      },
      newsletter: {
        title: "Boletín",
        description: "Recibe nuestras ofertas exclusivas",
        placeholder: "Tu email",
        button: "Suscribirse"
      },
      social: "Síguenos",
      copyright: "© 2024 Tours del Desierto de Marruecos. Todos los derechos reservados.",
      trust: {
        rating: "4.9/5 sobre 2.847 reseñas",
        experience: "15 años de experiencia",
        clients: "50,000+ clientes satisfechos"
      }
    }
  };

  const currentContent = content[language];

  return (
    <footer className="bg-gray-900 text-white w-full">
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Section 1: Company Info - TOUJOURS VISIBLE */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-yellow-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <h2 className="text-2xl font-bold text-white">{currentContent.company.name}</h2>
          </div>
          
          <p className="text-gray-300 mb-6 text-base leading-relaxed max-w-2xl">
            {currentContent.company.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 text-gray-300">
              <MapPin className="h-5 w-5 text-yellow-500" />
              <span className="text-sm">{currentContent.company.address}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Phone className="h-5 w-5 text-yellow-500" />
              <span className="text-sm">{currentContent.company.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Mail className="h-5 w-5 text-yellow-500" />
              <span className="text-sm">{currentContent.company.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Clock className="h-5 w-5 text-yellow-500" />
              <span className="text-sm">{currentContent.company.hours}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Links - TOUJOURS VISIBLE SUR MOBILE ET DESKTOP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Destinations - TOUJOURS VISIBLE */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">{currentContent.destinations.title}</h3>
            <ul className="space-y-3">
              {currentContent.destinations.items.map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors text-base block py-1">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services - TOUJOURS VISIBLE */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">{currentContent.services.title}</h3>
            <ul className="space-y-3">
              {currentContent.services.items.map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors text-base block py-1">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support - TOUJOURS VISIBLE */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">{currentContent.support.title}</h3>
            <ul className="space-y-3">
              {currentContent.support.items.map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors text-base block py-1">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 3: Newsletter - TOUJOURS VISIBLE */}
        <div className="bg-gray-800 rounded-lg p-8 mb-12">
          <div className="text-center md:text-left">
            <h4 className="text-2xl font-bold text-white mb-4">{currentContent.newsletter.title}</h4>
            <p className="text-gray-300 text-base mb-6">{currentContent.newsletter.description}</p>
            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto md:mx-0">
              <input
                type="email"
                placeholder={currentContent.newsletter.placeholder}
                className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-lg transition-colors">
                {currentContent.newsletter.button}
              </button>
            </div>
          </div>
        </div>

        {/* Section 4: Trust Indicators - TOUJOURS VISIBLE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <Star className="h-6 w-6 text-yellow-500" />
            <span className="text-gray-300 text-base">{currentContent.trust.rating}</span>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <Award className="h-6 w-6 text-yellow-500" />
            <span className="text-gray-300 text-base">{currentContent.trust.experience}</span>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <Shield className="h-6 w-6 text-green-500" />
            <span className="text-gray-300 text-base">{currentContent.trust.clients}</span>
          </div>
        </div>

        {/* Section 5: Certifications - TOUJOURS VISIBLE */}
        <div className="mb-12">
          <h4 className="text-lg font-bold text-gray-400 mb-6 text-center md:text-left">
            Certifications & Partenaires
          </h4>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="bg-gray-800 px-4 py-2 rounded-lg">
              <span className="text-gray-300 font-medium">IATA</span>
            </div>
            <div className="bg-gray-800 px-4 py-2 rounded-lg">
              <span className="text-gray-300 font-medium">ONMT</span>
            </div>
            <div className="bg-gray-800 px-4 py-2 rounded-lg">
              <span className="text-gray-300 font-medium">TripAdvisor</span>
            </div>
            <div className="bg-gray-800 px-4 py-2 rounded-lg">
              <span className="text-gray-300 font-medium">Google Partner</span>
            </div>
          </div>
        </div>

        {/* Section 6: Bottom Bar - TOUJOURS VISIBLE */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Social Media - TOUJOURS VISIBLE */}
            <div className="flex items-center gap-6">
              <span className="text-gray-400 text-base font-medium">{currentContent.social}</span>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="https://www.instagram.com/morocco_plant_peace?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  <Youtube className="h-6 w-6" />
                </a>
              </div>
            </div>
            
            {/* Copyright - TOUJOURS VISIBLE */}
            <div className="text-gray-400 text-base text-center md:text-right">
              {currentContent.copyright}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
