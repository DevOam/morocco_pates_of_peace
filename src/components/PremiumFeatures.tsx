'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Award, 
  Shield, 
  Zap, 
  TrendingUp, 
  Users, 
  Globe, 
  Camera,
  Headphones,
  Video,
  MessageSquare,
  Star,
  CheckCircle,
  ArrowRight,
  Play
} from 'lucide-react';

interface PremiumFeaturesProps {
  language: 'fr' | 'ar' | 'en' | 'es';
}

export default function PremiumFeatures({ language }: PremiumFeaturesProps) {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('premium-features');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Video,
      title: { fr: 'Visites Virtuelles 360°', ar: 'جولات افتراضية 360°', en: '360° Virtual Tours', es: 'Visitas Virtuales 360°' },
      description: { 
        fr: 'Explorez les destinations en réalité virtuelle avant votre voyage',
        ar: 'استكشف الوجهات بالواقع الافتراضي قبل رحلتك',
        en: 'Explore destinations in virtual reality before your trip',
        es: 'Explora los destinos en realidad virtual antes de tu viaje'
      },
      stats: { fr: '50+ lieux', ar: '50+ مكان', en: '50+ places', es: '50+ lugares' },
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Headphones,
      title: { fr: 'Audio Immersif', ar: 'صوت غامر', en: 'Immersive Audio', es: 'Audio Inmersivo' },
      description: { 
        fr: 'Sons authentiques du Maroc pour une expérience sensorielle complète',
        ar: 'أصوات المغرب الأصيلة لتجربة حسية كاملة',
        en: 'Authentic sounds of Morocco for a full sensory experience',
        es: 'Sonidos auténticos de Marruecos para una experiencia sensorial completa'
      },
      stats: { fr: '100+ ambiances', ar: '100+ أجواء', en: '100+ ambiences', es: '100+ ambientes' },
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Camera,
      title: { fr: 'Galerie Interactive', ar: 'معرض تفاعلي', en: 'Interactive Gallery', es: 'Galería Interactiva' },
      description: { 
        fr: 'Photos haute résolution avec zoom et filtres avancés',
        ar: 'صور عالية الدقة مع تكبير ومرشحات متقدمة',
        en: 'High‑resolution photos with zoom and advanced filters',
        es: 'Fotos de alta resolución con zoom y filtros avanzados'
      },
      stats: { fr: '1000+ photos', ar: '1000+ صورة', en: '1000+ photos', es: '1000+ fotos' },
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: MessageSquare,
      title: { fr: 'Chat IA Personnalisé', ar: 'دردشة ذكية مخصصة', en: 'Personalized AI Chat', es: 'Chat IA Personalizado' },
      description: { 
        fr: 'Assistant virtuel pour planifier votre voyage parfait',
        ar: 'مساعد افتراضي لتخطيط رحلتك المثالية',
        en: 'Virtual assistant to plan your perfect trip',
        es: 'Asistente virtual para planificar tu viaje perfecto'
      },
      stats: { fr: '24/7 disponible', ar: '24/7 متاح', en: 'Available 24/7', es: 'Disponible 24/7' },
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Globe,
      title: { fr: 'Carte Interactive Premium', ar: 'خريطة تفاعلية متميزة', en: 'Premium Interactive Map', es: 'Mapa Interactivo Premium' },
      description: { 
        fr: 'Navigation avancée avec itinéraires personnalisés en temps réel',
        ar: 'تنقل متقدم مع مسارات مخصصة في الوقت الفعلي',
        en: 'Advanced navigation with real‑time personalized routes',
        es: 'Navegación avanzada con rutas personalizadas en tiempo real'
      },
      stats: { fr: 'GPS intégré', ar: 'GPS مدمج', en: 'Built‑in GPS', es: 'GPS integrado' },
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Zap,
      title: { fr: 'Réservation Instantanée', ar: 'حجز فوري', en: 'Instant Booking', es: 'Reserva Instantánea' },
      description: { 
        fr: 'Système de réservation ultra-rapide avec confirmation immédiate',
        ar: 'نظام حجز فائق السرعة مع تأكيد فوري',
        en: 'Ultra‑fast booking system with instant confirmation',
        es: 'Sistema de reserva ultrarrápido con confirmación inmediata'
      },
      stats: { fr: '< 30 secondes', ar: '< 30 ثانية', en: '< 30 seconds', es: '< 30 segundos' },
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: { fr: 'Prix Excellence 2024', ar: 'جائزة التميز 2024', en: 'Excellence Award 2024', es: 'Premio a la Excelencia 2024' },
      subtitle: { fr: 'Meilleur Site Touristique', ar: 'أفضل موقع سياحي', en: 'Best Tourism Website', es: 'Mejor Sitio de Turismo' }
    },
    {
      icon: Users,
      title: { fr: '50,000+', ar: '50,000+', en: '50,000+', es: '50,000+' },
      subtitle: { fr: 'Clients Satisfaits', ar: 'عميل راضي', en: 'Happy Customers', es: 'Clientes Satisfechos' }
    },
    {
      icon: Star,
      title: { fr: '4.9/5', ar: '4.9/5', en: '4.9/5', es: '4.9/5' },
      subtitle: { fr: 'Note Moyenne', ar: 'التقييم المتوسط', en: 'Average Rating', es: 'Calificación Promedio' }
    },
    {
      icon: Shield,
      title: { fr: '100%', ar: '100%', en: '100%', es: '100%' },
      subtitle: { fr: 'Sécurisé', ar: 'آمن', en: 'Secure', es: 'Seguro' }
    }
  ];

  return (
    <section 
      id="premium-features"
      className={`py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden ${language === 'ar' ? 'rtl' : 'ltr'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`flex items-center justify-center gap-3 mb-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <Sparkles className="h-8 w-8 text-morocco-gold animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-morocco-gold to-yellow-300 bg-clip-text text-transparent">
              {language === 'fr' ? 'Fonctionnalités Premium' : language === 'ar' ? 'ميزات متميزة' : language === 'en' ? 'Premium Features' : 'Funciones Premium'}
            </h2>
            <Sparkles className="h-8 w-8 text-morocco-gold animate-pulse" />
          </div>
          <p className={`text-xl text-gray-300 max-w-3xl mx-auto ${isVisible ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
            {language === 'fr' 
              ? 'Découvrez pourquoi notre plateforme surpasse tous les autres sites de tourisme au Maroc'
              : language === 'ar'
                ? 'اكتشف لماذا تتفوق منصتنا على جميع مواقع السياحة الأخرى في المغرب'
                : language === 'en'
                  ? 'Discover why our platform outperforms other tourism websites in Morocco'
                  : 'Descubre por qué nuestra plataforma supera a otros sitios de turismo en Marruecos'
            }
          </p>
        </div>

        {/* Interactive Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-20">
          {/* Feature Cards */}
          <div className="space-y-3 lg:space-y-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = activeFeature === index;
              
              return (
                <div
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`p-4 sm:p-6 rounded-2xl cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                    isActive 
                      ? `bg-gradient-to-r ${feature.color} shadow-2xl shadow-purple-500/25` 
                      : 'bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm'
                  } ${isVisible ? `animate-fade-in-left animation-delay-${index * 100}` : 'opacity-0'}`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`p-2 sm:p-3 rounded-xl ${isActive ? 'bg-white/20' : 'bg-gray-700'}`}>
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold mb-2">
                        {feature.title[language]}
                      </h3>
                      <p className={`text-sm mb-3 ${isActive ? 'text-white/90' : 'text-gray-400'} leading-relaxed`}>
                        {feature.description[language]}
                      </p>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                        isActive ? 'bg-white/20 text-white' : 'bg-gray-700 text-gray-300'
                      }`}>
                        <CheckCircle className="h-3 w-3" />
                        {feature.stats[language]}
                      </div>
                    </div>
                    {isActive && (
                      <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full">
                        <Play className="h-3 w-3 sm:h-4 sm:w-4 ml-0.5" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feature Preview - Hidden on Mobile */}
          <div className={`relative hidden lg:block ${isVisible ? 'animate-fade-in-right animation-delay-300' : 'opacity-0'}`}>
            <div className="sticky top-8">
              <div className={`relative h-96 rounded-2xl overflow-hidden bg-gradient-to-r ${features[activeFeature].color}`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    {React.createElement(features[activeFeature].icon, { 
                      className: "h-24 w-24 mx-auto mb-6 animate-bounce" 
                    })}
                    <h3 className="text-2xl font-bold mb-4">
                      {features[activeFeature].title[language]}
                    </h3>
                    <p className="text-lg opacity-90 max-w-sm mx-auto">
                      {features[activeFeature].description[language]}
                    </p>
                  </div>
                </div>
                
                {/* Animated particles */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
                      style={{
                        left: `${(i * 5) % 100}%`,
                        top: `${(i * 7) % 100}%`,
                        animationDelay: `${(i * 0.15) % 3}s`,
                        animationDuration: `${3 + (i % 2)}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className={`bg-gradient-to-r from-morocco-red/20 to-morocco-gold/20 rounded-3xl p-4 sm:p-8 backdrop-blur-sm ${isVisible ? 'animate-fade-in-up animation-delay-600' : 'opacity-0'}`}>
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">
              {language === 'fr' ? 'Nos Réalisations' : language === 'ar' ? 'إنجازاتنا' : language === 'en' ? 'Our Achievements' : 'Nuestros Logros'}
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">
              {language === 'fr' ? 'Des chiffres qui parlent d\'eux-mêmes' : language === 'ar' ? 'أرقام تتحدث عن نفسها' : language === 'en' ? 'Numbers that speak for themselves' : 'Cifras que hablan por sí solas'}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={index}
                  className={`text-center p-3 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:scale-105 ${
                    isVisible ? `animate-fade-in-up animation-delay-${700 + index * 100}` : 'opacity-0'
                  }`}
                >
                  <Icon className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-3 text-morocco-gold" />
                  <div className="text-lg sm:text-2xl font-bold text-white mb-1">
                    {achievement.title[language]}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">
                    {achievement.subtitle[language]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center mt-12 sm:mt-16 ${isVisible ? 'animate-fade-in-up animation-delay-1000' : 'opacity-0'}`}>
          <div className="bg-gradient-to-r from-morocco-gold to-yellow-400 rounded-2xl p-6 sm:p-8 text-black">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              {language === 'fr' ? 'Prêt à Vivre l\'Excellence ?' : language === 'ar' ? 'مستعد لتجربة التميز؟' : language === 'en' ? 'Ready to Experience Excellence?' : '¿Listo para Vivir la Excelencia?'}
            </h3>
            <p className="text-base sm:text-lg mb-6 opacity-90">
              {language === 'fr' 
                ? 'Rejoignez les milliers de voyageurs qui ont choisi l\'expérience premium'
                : language === 'ar'
                  ? 'انضم إلى آلاف المسافرين الذين اختاروا التجربة المتميزة'
                  : language === 'en'
                    ? 'Join thousands of travelers who chose the premium experience'
                    : 'Únete a miles de viajeros que eligieron la experiencia premium'
              }
            </p>
            <button 
              className="bg-black text-white hover:bg-gray-800 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto group"
              onClick={() => {
                const target = document.querySelector('#booking') || document.querySelector('#tours');
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              {language === 'fr' ? 'Découvrir Maintenant' : language === 'ar' ? 'اكتشف الآن' : language === 'en' ? 'Discover Now' : 'Descubrir Ahora'}
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out forwards;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-700 { animation-delay: 0.7s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-900 { animation-delay: 0.9s; }
        .animation-delay-1000 { animation-delay: 1.0s; }
      `}</style>
    </section>
  );
}
