'use client';

import { useState, useEffect } from 'react';
import { imageUrls, videoUrls } from './ImageManager';
import { ChevronDown, Play, MapPin, Star, Calendar, Users, Search, ArrowRight } from 'lucide-react';

interface AnimatedHeroProps {
  language: 'fr' | 'ar';
  onBookingClick: () => void;
}

export default function AnimatedHero({ language, onBookingClick }: AnimatedHeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const slides = [
    {
      image: imageUrls.hero1,
      title: language === 'fr' ? 'Découvrez le Maroc Authentique' : 'اكتشف المغرب الأصيل',
      subtitle: language === 'fr' ? 'Circuits personnalisés et expériences inoubliables' : 'رحلات مخصصة وتجارب لا تُنسى'
    },
    {
      image: imageUrls.hero2,
      title: language === 'fr' ? 'Aventures dans le Sahara' : 'مغامرات في الصحراء',
      subtitle: language === 'fr' ? 'Nuits sous les étoiles du désert' : 'ليالي تحت نجوم الصحراء'
    },
    {
      image: imageUrls.hero3,
      title: language === 'fr' ? 'Villes Impériales Majestueuses' : 'المدن الإمبراطورية المهيبة',
      subtitle: language === 'fr' ? 'Histoire millénaire et architecture sublime' : 'تاريخ عريق وعمارة رائعة'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="hero" className="relative h-screen overflow-hidden pt-52 sm:pt-56 pb-28 sm:pb-16 scroll-mt-44 sm:scroll-mt-48">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          style={{ 
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      ))}
      
      {/* Overlay - stronger gradient for better text contrast */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-black/10" />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-white opacity-60 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-morocco-gold opacity-80 rounded-full animate-bounce" />
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-white opacity-40 rounded-full animate-ping" />
      </div>

      {/* Content */}
      <div className={`relative z-20 flex items-center justify-center h-full text-center text-white ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-4 sm:mb-6 leading-tight text-shadow-xl">
              {language === 'fr' ? (
                <>
                  Découvrez le <span className="text-morocco-gold">Maroc</span><br />
                  Authentique
                </>
              ) : (
                <>
                  اكتشف <span className="text-morocco-gold">المغرب</span><br />
                  الأصيل
                </>
              )}
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 leading-relaxed text-shadow-lg">
              {language === 'fr'
                ? 'Voyages sur mesure dans les villes impériales, le Sahara et l\'Atlas'
                : 'رحلات مخصصة في المدن الإمبراطورية والصحراء والأطلس'
              }
            </p>
            
            {/* Advanced Search Engine */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 max-w-4xl mx-auto shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="relative">
                  <label className="block text-white text-sm font-medium mb-2">
                    {language === 'fr' ? 'Destination' : 'الوجهة'}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-5 w-5" />
                    <select className="w-full pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-white text-gray-900 border border-white/0 shadow-sm focus:outline-none focus:ring-2 focus:ring-morocco-gold">
                      <option value="">{language === 'fr' ? 'Choisir...' : 'اختر...'}</option>
                      <option value="marrakech">{language === 'fr' ? 'Marrakech' : 'مراكش'}</option>
                      <option value="fes">{language === 'fr' ? 'Fès' : 'فاس'}</option>
                      <option value="sahara">{language === 'fr' ? 'Sahara' : 'الصحراء'}</option>
                      <option value="chefchaouen">{language === 'fr' ? 'Chefchaouen' : 'شفشاون'}</option>
                    </select>
                  </div>
                </div>
                
                <div className="relative">
                  <label className="block text-white text-sm font-medium mb-2">
                    {language === 'fr' ? 'Dates' : 'التواريخ'}
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-5 w-5" />
                    <input 
                      type="date" 
                      className="w-full pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-white text-gray-900 border border-white/0 shadow-sm focus:outline-none focus:ring-2 focus:ring-morocco-gold"
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <label className="block text-white text-sm font-medium mb-2">
                    {language === 'fr' ? 'Voyageurs' : 'المسافرون'}
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-5 w-5" />
                    <select className="w-full pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-white text-gray-900 border border-white/0 shadow-sm focus:outline-none focus:ring-2 focus:ring-morocco-gold">
                      <option value="1">1 {language === 'fr' ? 'personne' : 'شخص'}</option>
                      <option value="2">2 {language === 'fr' ? 'personnes' : 'أشخاص'}</option>
                      <option value="4">4 {language === 'fr' ? 'personnes' : 'أشخاص'}</option>
                      <option value="6">6+ {language === 'fr' ? 'personnes' : 'أشخاص'}</option>
                    </select>
                  </div>
                </div>
                
                <div className="relative">
                  <label className="block text-white text-sm font-medium mb-2">
                    {language === 'fr' ? 'Budget' : 'الميزانية'}
                  </label>
                  <select className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-white text-gray-900 border border-white/0 shadow-sm focus:outline-none focus:ring-2 focus:ring-morocco-gold">
                    <option value="budget">{language === 'fr' ? 'Économique' : 'اقتصادي'}</option>
                    <option value="standard">{language === 'fr' ? 'Standard' : 'عادي'}</option>
                    <option value="luxury">{language === 'fr' ? 'Luxe' : 'فاخر'}</option>
                  </select>
                </div>
              </div>
              
              <button className="w-full bg-morocco-gold hover:bg-yellow-500 text-black font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-base sm:text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2">
                <Search className="h-5 w-5" />
                {language === 'fr' ? 'Trouver mon voyage parfait' : 'ابحث عن رحلتي المثالية'}
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12">
              <button className="border-2 border-white text-white hover:bg-white hover:text-black font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-all duration-300 flex items-center gap-2">
                <Play className="h-5 w-5" />
                {language === 'fr' ? 'Voir la vidéo' : 'شاهد الفيديو'}
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <button 
                onClick={onBookingClick}
                className="group bg-morocco-gold text-black px-6 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl inline-flex items-center"
              >
                {language === 'fr' ? 'Explorez nos circuits' : 'استكشف رحلاتنا'}
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => setIsVideoOpen(true)}
                className="group flex items-center text-white hover:text-morocco-gold transition-colors duration-300"
              >
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4 group-hover:bg-opacity-30 transition-all duration-300 group-hover:scale-110">
                  <Play className="h-6 w-6 ml-1" />
                </div>
                <span className="text-base sm:text-lg font-medium">
                  {language === 'fr' ? 'Regarder la vidéo' : 'شاهد الفيديو'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-morocco-gold scale-125' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-morocco-gold text-2xl font-bold"
            >
              ✕
            </button>
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
              {/(\.mp4$|\.webm$|archive\.org\/.+\.(mp4|webm))/i.test(videoUrls.hero) ? (
                <video
                  className="w-full h-auto"
                  controls
                  playsInline
                  preload="metadata"
                  style={{ maxHeight: '80vh' }}
                >
                  <source src={videoUrls.hero} />
                  {language === 'fr' ? 'Votre navigateur ne supporte pas la vidéo HTML5.' : 'متصفحك لا يدعم فيديو HTML5.'}
                </video>
              ) : (
                <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={videoUrls.hero}
                    title={language === 'fr' ? 'Vidéo de présentation' : 'فيديو تعريفي'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Trust Indicators */}
      <div className="flex flex-wrap justify-center items-center gap-8 text-white/80">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-morocco-gold fill-current" />
          <span className="text-sm font-medium">
            {language === 'fr' ? '4.9/5 sur 2,847 avis' : '4.9/5 من 2,847 تقييم'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-morocco-gold" />
          <span className="text-sm font-medium">
            {language === 'fr' ? '15+ ans d\'expérience' : '15+ سنة خبرة'}
          </span>
        </div>
        <div className="text-sm font-medium">
          {language === 'fr' ? 'Guides locaux certifiés' : 'مرشدون محليون معتمدون'}
        </div>
        <div className="bg-green-500/20 px-3 py-1 rounded-full text-sm font-medium border border-green-400/30">
          {language === 'fr' ? '✓ Annulation gratuite' : '✓ إلغاء مجاني'}
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
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .text-shadow-lg { text-shadow: 0 2px 10px rgba(0,0,0,0.6); }
        .text-shadow-xl { text-shadow: 0 4px 18px rgba(0,0,0,0.75); }
      `}</style>
    </section>
  );
}
