'use client';

import { Shield, Award, Users, Clock, Star, CheckCircle } from 'lucide-react';

interface TrustBadgesProps {
  language: 'fr' | 'ar' | 'en' | 'es';
}

export default function TrustBadges({ language }: TrustBadgesProps) {
  const badges = {
    fr: [
      {
        icon: Shield,
        title: "Paiement Sécurisé",
        subtitle: "SSL & Cryptage 256-bit",
        color: "bg-green-500"
      },
      {
        icon: Award,
        title: "Certifié Excellence",
        subtitle: "TripAdvisor 2024",
        color: "bg-orange-500"
      },
      {
        icon: Users,
        title: "50,000+ Clients",
        subtitle: "Satisfaits depuis 2009",
        color: "bg-blue-500"
      },
      {
        icon: Clock,
        title: "Support 24/7",
        subtitle: "Assistance multilingue",
        color: "bg-purple-500"
      },
      {
        icon: Star,
        title: "Note 4.9/5",
        subtitle: "Sur 2,847 avis vérifiés",
        color: "bg-yellow-500"
      },
      {
        icon: CheckCircle,
        title: "Annulation Gratuite",
        subtitle: "Jusqu'à 24h avant",
        color: "bg-teal-500"
      }
    ],
    ar: [
      {
        icon: Shield,
        title: "دفع آمن",
        subtitle: "SSL وتشفير 256-بت",
        color: "bg-green-500"
      },
      {
        icon: Award,
        title: "معتمد للتميز",
        subtitle: "TripAdvisor 2024",
        color: "bg-orange-500"
      },
      {
        icon: Users,
        title: "50,000+ عميل",
        subtitle: "راضون منذ 2009",
        color: "bg-blue-500"
      },
      {
        icon: Clock,
        title: "دعم 24/7",
        subtitle: "مساعدة متعددة اللغات",
        color: "bg-purple-500"
      },
      {
        icon: Star,
        title: "تقييم 4.9/5",
        subtitle: "على 2,847 تقييم موثق",
        color: "bg-yellow-500"
      },
      {
        icon: CheckCircle,
        title: "إلغاء مجاني",
        subtitle: "حتى 24 ساعة قبل",
        color: "bg-teal-500"
      }
    ],
    en: [
      {
        icon: Shield,
        title: "Secure Payment",
        subtitle: "SSL & 256-bit Encryption",
        color: "bg-green-500"
      },
      {
        icon: Award,
        title: "Certified Excellence",
        subtitle: "TripAdvisor 2024",
        color: "bg-orange-500"
      },
      {
        icon: Users,
        title: "50,000+ Clients",
        subtitle: "Satisfied since 2009",
        color: "bg-blue-500"
      },
      {
        icon: Clock,
        title: "24/7 Support",
        subtitle: "Multilingual assistance",
        color: "bg-purple-500"
      },
      {
        icon: Star,
        title: "Rated 4.9/5",
        subtitle: "Based on 2,847 verified reviews",
        color: "bg-yellow-500"
      },
      {
        icon: CheckCircle,
        title: "Free Cancellation",
        subtitle: "Up to 24h before",
        color: "bg-teal-500"
      }
    ],
    es: [
      {
        icon: Shield,
        title: "Pago Seguro",
        subtitle: "SSL y Cifrado de 256 bits",
        color: "bg-green-500"
      },
      {
        icon: Award,
        title: "Certificado de Excelencia",
        subtitle: "TripAdvisor 2024",
        color: "bg-orange-500"
      },
      {
        icon: Users,
        title: "50,000+ Clientes",
        subtitle: "Satisfechos desde 2009",
        color: "bg-blue-500"
      },
      {
        icon: Clock,
        title: "Soporte 24/7",
        subtitle: "Asistencia multilingüe",
        color: "bg-purple-500"
      },
      {
        icon: Star,
        title: "Nota 4.9/5",
        subtitle: "Sobre 2.847 reseñas verificadas",
        color: "bg-yellow-500"
      },
      {
        icon: CheckCircle,
        title: "Cancelación Gratuita",
        subtitle: "Hasta 24h antes",
        color: "bg-teal-500"
      }
    ]
  };

  return (
    <section className={`py-16 bg-gray-50 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {language === 'fr' 
              ? 'Pourquoi Nous Choisir' 
              : language === 'ar' 
                ? 'لماذا تختارنا' 
                : language === 'en' 
                  ? 'Why Choose Us' 
                  : 'Por qué elegirnos'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'fr' 
              ? 'Votre confiance est notre priorité. Découvrez les garanties qui font notre réputation.'
              : language === 'ar'
                ? 'ثقتك هي أولويتنا. اكتشف الضمانات التي تصنع سمعتنا.'
                : language === 'en'
                  ? 'Your trust is our priority. Discover the guarantees that build our reputation.'
                  : 'Tu confianza es nuestra prioridad. Descubre las garantías que respaldan nuestra reputación.'}
          </p>
        </div>

        {/* Trust Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges[language].map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className={`${badge.color} p-3 rounded-xl text-white flex-shrink-0`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{badge.title}</h3>
                    <p className="text-sm text-gray-600">{badge.subtitle}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Certifications */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 mb-6">
            {language === 'fr' 
              ? 'Certifié et reconnu par' 
              : language === 'ar' 
                ? 'معتمد ومعترف به من قبل' 
                : language === 'en' 
                  ? 'Certified and recognized by' 
                  : 'Certificado y reconocido por'}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {/* Mock certification logos */}
            <div className="bg-gray-200 px-6 py-3 rounded-lg">
              <span className="text-sm font-medium text-gray-600">IATA</span>
            </div>
            <div className="bg-gray-200 px-6 py-3 rounded-lg">
              <span className="text-sm font-medium text-gray-600">ONMT</span>
            </div>
            <div className="bg-gray-200 px-6 py-3 rounded-lg">
              <span className="text-sm font-medium text-gray-600">TripAdvisor</span>
            </div>
            <div className="bg-gray-200 px-6 py-3 rounded-lg">
              <span className="text-sm font-medium text-gray-600">Google Partner</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-morocco-red to-morocco-gold rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              {language === 'fr' 
                ? "Prêt pour l'aventure ?" 
                : language === 'ar' 
                  ? 'مستعد للمغامرة؟' 
                  : language === 'en' 
                    ? 'Ready for the adventure?' 
                    : '¿Listo para la aventura?'}
            </h3>
            <p className="text-lg mb-6 opacity-90">
              {language === 'fr' 
                ? 'Rejoignez des milliers de voyageurs satisfaits et découvrez le Maroc authentique.'
                : language === 'ar'
                  ? 'انضم إلى آلاف المسافرين الراضين واكتشف المغرب الأصيل.'
                  : language === 'en'
                    ? 'Join thousands of satisfied travelers and discover authentic Morocco.'
                    : 'Únete a miles de viajeros satisfechos y descubre el Marruecos auténtico.'}
            </p>
            <button className="bg-white text-morocco-red font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors">
              {language === 'fr' 
                ? 'Demander un Devis Gratuit' 
                : language === 'ar' 
                  ? 'اطلب عرض أسعار مجاني' 
                  : language === 'en' 
                    ? 'Request a Free Quote' 
                    : 'Solicitar un Presupuesto Gratis'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
