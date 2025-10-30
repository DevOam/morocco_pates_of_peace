'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { MapPin, Phone, Mail, Star, Calendar, Users, Clock, ArrowRight } from 'lucide-react';
import AnimatedHero from '@/components/AnimatedHero';
import InteractiveGallery from '@/components/InteractiveGallery';
import InteractiveMap from '@/components/InteractiveMap';
import ProGoogleMap from '@/components/ProGoogleMap';
import TraditionalStore from '@/components/TraditionalStore';
import PremiumFeatures from '@/components/PremiumFeatures';
import VideoTestimonials from '@/components/VideoTestimonials';
import TravelConfigurator from '@/components/TravelConfigurator';
import Parallax3D from '@/components/Parallax3D';
import SoundManager from '@/components/SoundManager';
import AdvancedAudioSystem from '@/components/AdvancedAudioSystem';
import StickyHeader from '@/components/StickyHeader';
import TrustBadges from '@/components/TrustBadges';
import BookingSystem from '@/components/BookingSystem';
const SuperAIAssistant = dynamic(() => import('@/components/SuperAIAssistant'), { ssr: false });
import UltraSimpleFooter from '@/components/UltraSimpleFooter';
import ExcursionsShowcase from '@/components/ExcursionsShowcase';
import ContactForm from '@/components/ContactForm';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import ToastNotification, { useToast } from '@/components/ToastNotification';

export default function Home() {
  const [language, setLanguage] = useState<'fr' | 'ar' | 'en' | 'es'>('fr');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { toasts, removeToast, showSuccess, showError } = useToast();

  const content = {
    fr: {
      nav: {
        home: 'Accueil',
        tours: 'Circuits',
        about: 'À propos',
        contact: 'Contact',
        book: 'Réserver'
      },
      hero: {
        title: 'Découvrez le Maroc Authentique',
        subtitle: 'Circuits personnalisés et expériences inoubliables',
        cta: 'Explorez nos circuits'
      },
      features: {
        title: 'Pourquoi choisir Morocco Plant Peace ?',
        items: [
          { icon: Star, title: 'Guides Experts', desc: 'Guides locaux certifiés avec 10+ ans d\'expérience' },
          { icon: Users, title: 'Groupes Privés', desc: 'Circuits sur mesure pour votre groupe' },
          { icon: Clock, title: 'Disponible 24/7', desc: 'Support client disponible à tout moment' }
        ]
      },
      tours: {
        title: 'Nos Circuits Populaires',
        items: [
          {
            title: 'Circuit Impérial',
            duration: '7 jours',
            price: '850€',
            image: 'https://i.pinimg.com/736x/5e/c7/f7/5ec7f7fb6ffd18246b36f6c440a639b8.jpg',
            desc: 'Marrakech, Fès, Meknès et Rabat'
          },
          {
            title: 'Aventure Sahara',
            duration: '4 jours',
            price: '450€',
            image: 'https://i.pinimg.com/736x/c1/93/a1/c193a1476a6302a6fb1a6717e4e48da6.jpg',
            desc: 'Désert de Merzouga et nuit sous les étoiles'
          },
          {
            title: 'Atlas & Vallées',
            duration: '3 jours',
            price: '320€',
            image: 'https://i.pinimg.com/736x/be/a7/3e/bea73e9259c54a11a998ce5b749c0c89.jpg',
            desc: 'Haut Atlas et vallées berbères'
          }
        ]
      }
    },
    ar: {
      nav: {
        home: 'الرئيسية',
        tours: 'الرحلات',
        about: 'من نحن',
        contact: 'اتصل بنا',
        book: 'احجز الآن'
      },
      hero: {
        title: 'اكتشف المغرب الأصيل',
        subtitle: 'رحلات مخصصة وتجارب لا تُنسى',
        cta: 'استكشف رحلاتنا'
      },
      features: {
        title: 'لماذا تختار مراكش تورز؟',
        items: [
          { icon: Star, title: 'مرشدون خبراء', desc: 'مرشدون محليون معتمدون بخبرة +10 سنوات' },
          { icon: Users, title: 'مجموعات خاصة', desc: 'رحلات مصممة خصيصاً لمجموعتك' },
          { icon: Clock, title: 'متاح 24/7', desc: 'دعم العملاء متاح في أي وقت' }
        ]
      },
      tours: {
        title: 'رحلاتنا الشعبية',
        items: [
          {
            title: 'الجولة الإمبراطورية',
            duration: '7 أيام',
            price: '850€',
            image: 'https://i.pinimg.com/736x/5e/c7/f7/5ec7f7fb6ffd18246b36f6c440a639b8.jpg',
            desc: 'مراكش، فاس، مكناس والرباط'
          },
          {
            title: 'مغامرة الصحراء',
            duration: '4 أيام',
            price: '450€',
            image: 'https://i.pinimg.com/736x/c1/93/a1/c193a1476a6302a6fb1a6717e4e48da6.jpg',
            desc: 'صحراء مرزوقة وليلة تحت النجوم'
          },
          {
            title: 'الأطلس والوديان',
            duration: '3 أيام',
            price: '320€',
            image: 'https://i.pinimg.com/736x/be/a7/3e/bea73e9259c54a11a998ce5b749c0c89.jpg',
            desc: 'الأطلس الكبير والوديان البربرية'
          }
        ]
      }
    },
    en: {
      nav: {
        home: 'Home',
        tours: 'Tours',
        about: 'About',
        contact: 'Contact',
        book: 'Book'
      },
      hero: {
        title: 'Discover Authentic Morocco',
        subtitle: 'Personalized tours and unforgettable experiences',
        cta: 'Explore our tours'
      },
      features: {
        title: 'Why choose Morocco Plant Peace?',
        items: [
          { icon: Star, title: 'Expert Guides', desc: 'Certified local guides with 10+ years experience' },
          { icon: Users, title: 'Private Groups', desc: 'Tailor-made tours for your group' },
          { icon: Clock, title: 'Available 24/7', desc: 'Customer support available anytime' }
        ]
      },
      tours: {
        title: 'Our Popular Tours',
        items: [
          {
            title: 'Imperial Circuit',
            duration: '7 days',
            price: '850€',
            image: 'https://i.pinimg.com/736x/5e/c7/f7/5ec7f7fb6ffd18246b36f6c440a639b8.jpg',
            desc: 'Marrakech, Fez, Meknes and Rabat'
          },
          {
            title: 'Sahara Adventure',
            duration: '4 days',
            price: '450€',
            image: 'https://i.pinimg.com/736x/c1/93/a1/c193a1476a6302a6fb1a6717e4e48da6.jpg',
            desc: 'Merzouga desert and night under the stars'
          },
          {
            title: 'Atlas & Valleys',
            duration: '3 days',
            price: '320€',
            image: 'https://i.pinimg.com/736x/be/a7/3e/bea73e9259c54a11a998ce5b749c0c89.jpg',
            desc: 'High Atlas and Berber valleys'
          }
        ]
      }
    },
    es: {
      nav: {
        home: 'Inicio',
        tours: 'Tours',
        about: 'Acerca de',
        contact: 'Contacto',
        book: 'Reservar'
      },
      hero: {
        title: 'Descubre el Marruecos Auténtico',
        subtitle: 'Tours personalizados y experiencias inolvidables',
        cta: 'Explora nuestros tours'
      },
      features: {
        title: '¿Por qué elegir Morocco Plant Peace?',
        items: [
          { icon: Star, title: 'Guías Expertos', desc: 'Guías locales certificados con más de 10 años de experiencia' },
          { icon: Users, title: 'Grupos Privados', desc: 'Tours hechos a medida para tu grupo' },
          { icon: Clock, title: 'Disponible 24/7', desc: 'Soporte al cliente disponible en cualquier momento' }
        ]
      },
      tours: {
        title: 'Nuestros Tours Populares',
        items: [
          {
            title: 'Circuito Imperial',
            duration: '7 días',
            price: '850€',
            image: 'https://i.pinimg.com/736x/5e/c7/f7/5ec7f7fb6ffd18246b36f6c440a639b8.jpg',
            desc: 'Marrakech, Fez, Meknes y Rabat'
          },
          {
            title: 'Aventura Sahara',
            duration: '4 días',
            price: '450€',
            image: 'https://i.pinimg.com/736x/c1/93/a1/c193a1476a6302a6fb1a6717e4e48da6.jpg',
            desc: 'Desierto de Merzouga y noche bajo las estrellas'
          },
          {
            title: 'Atlas y Valles',
            duration: '3 días',
            price: '320€',
            image: 'https://i.pinimg.com/736x/be/a7/3e/bea73e9259c54a11a998ce5b749c0c89.jpg',
            desc: 'Alto Atlas y valles bereberes'
          }
        ]
      }
    }
  };

  const t = content[language];

  return (
    <div className={`min-h-screen flex flex-col ${language === 'ar' ? 'rtl font-arabic' : 'ltr'}`}>
      {/* Sticky Header */}
      <StickyHeader 
        language={language} 
        onLanguageChange={setLanguage}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section id="hero">
          <AnimatedHero 
            language={language} 
            onBookingClick={() => setIsBookingOpen(true)} 
          />
        </section>

        {/* Features Section */}
        <section id="features" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t.features.title}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {t.features.items.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-md">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-morocco-red text-white rounded-full mb-4">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        </section>

        {/* Parallax 3D Section */}
        <Parallax3D language={language} />

        {/* Travel Configurator */}
        <TravelConfigurator language={language} />

        {/* Interactive Map Section */}
        <section id="destinations">
          <ProGoogleMap 
            language={language} 
            onBookingClick={(destination) => {
              console.log('Booking destination:', destination);
              setIsBookingOpen(true);
            }} 
          />
        </section>

        {/* Galerie Interactive */}
        <section id="gallery">
          <InteractiveGallery language={language} />
        </section>

        {/* Trust Badges Section */}
        <TrustBadges language={language} />

        {/* Excursions Showcase */}
        <section id="excursions">
          <ExcursionsShowcase 
            language={language} 
            onBookingClick={(excursionId) => {
              console.log('Booking excursion:', excursionId);
              setIsBookingOpen(true);
            }} 
          />
        </section>

        {/* Video Testimonials */}
        <VideoTestimonials language={language} />

        {/* Tours Section */}
        <section id="tours" className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t.tours.title}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {t.tours.items.map((tour, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${tour.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                      {tour.title}
                    </h3>
                    <span className="text-xl sm:text-2xl font-bold text-morocco-red">
                      {tour.price}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-sm">{tour.duration}</span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">
                    {tour.desc}
                  </p>
                  <button 
                    onClick={() => setIsBookingOpen(true)}
                    className="w-full bg-morocco-gold hover:bg-yellow-500 text-black font-bold py-2 sm:py-3 text-sm sm:text-base rounded-lg transition-all transform hover:scale-105"
                  >
                    {language === 'fr' 
                      ? 'Réserver maintenant' 
                      : language === 'ar' 
                        ? 'احجز الآن' 
                        : language === 'en' 
                          ? 'Book now' 
                          : 'Reservar ahora'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* Contact Form */}
        <ContactForm language={language} />

        {/* Traditional Store */}
        <section id="store">
          <TraditionalStore 
            language={language} 
            onAddToCart={(product) => {
              console.log('Added to cart:', product);
              showSuccess(
                language === 'fr' ? 'Produit ajouté au panier' : 'تم إضافة المنتج للسلة',
                language === 'fr' ? `${product.name.fr} ajouté avec succès` : `تم إضافة ${product.name.ar} بنجاح`
              );
            }} 
          />
        </section>

        {/* Premium Features */}
        <PremiumFeatures language={language} />

        {/* Super AI Assistant is used instead of basic LiveChatSupport */}
        
        {/* Advanced Audio System */}
        <AdvancedAudioSystem language={language} />
      </main>

      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Back to Top Button */}
      <BackToTop />

      {/* Toast Notifications */}
      <ToastNotification toasts={toasts} onRemove={removeToast} />

      {/* WhatsApp Widget (fixed, doesn't affect layout) */}
      <SuperAIAssistant language={language} />

      {/* Booking System Modal */}
      <BookingSystem 
        language={language} 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        onSuccess={(title, message) => showSuccess(title, message)}
        onError={(title, message) => showError(title, message)}
      />

      {/* Footer at the very bottom */}
      <UltraSimpleFooter language={language} />
    </div>
  );
}
