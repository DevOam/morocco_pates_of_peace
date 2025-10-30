'use client';

import { useState } from 'react';
import { Clock, Users, MapPin, Star, ArrowRight, Calendar, Shield, Award } from 'lucide-react';
import excursionsData from '@/data/excursions.json';
import { BookNowCTA, GetQuoteCTA } from './OptimizedCTA';
import { imageUrls } from './ImageManager';

interface ExcursionsShowcaseProps {
  language: 'fr' | 'ar' | 'en' | 'es';
  onBookingClick: (excursionId: string) => void;
}

export default function ExcursionsShowcase({ language, onBookingClick }: ExcursionsShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedExcursion, setSelectedExcursion] = useState<string | null>(null);

  const excursions = Object.values(excursionsData.excursions);
  const categories = excursionsData.categories;

  // Map each excursion to a real, verified image URL (from media.config.json via ImageManager)
  const excursionImageMap: Record<string, string> = {
    // Ourika Valley (Atlas rivers & nature). Replace with a closer Ourika image in media.config.json if desired.
    ourika: imageUrls.marrakech,
    // Essaouira ramparts/port
    essaouira: imageUrls.essaouira,
    // Agafay rocky desert – use Sahara dunes as visual cue
    agafay: imageUrls.merzouga,
    // Ouzoud falls – user-provided Pinterest image
    ouzoud: 'https://i.pinimg.com/736x/e5/72/ec/e572ecb1c048bd6c1119294265a82d4b.jpg',
    // Atlas & Imlil – updated user-provided Pinterest image
    'atlas-imlil': 'https://i.pinimg.com/1200x/c6/5b/21/c65b21594674925b58abb3f5167fefa9.jpg',
    // Hot Air Balloon Marrakech – user-provided Pinterest image
    balloon: 'https://i.pinimg.com/736x/bc/0e/67/bc0e67740410e0ab871be4628f15e5ef.jpg',
    // Traditional Moroccan Cooking Class – user-provided image
    'cooking-class': 'https://i.pinimg.com/736x/91/5a/de/915ade6f9f4f32b744f9cefb6904bdf1.jpg',
  };

  const filteredExcursions = selectedCategory === 'all' 
    ? excursions 
    : excursions.filter(exc => exc.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colorMap = {
      nature: 'bg-emerald-500',
      culture: 'bg-amber-500', 
      aventure: 'bg-red-500',
      trekking: 'bg-orange-500',
      luxe: 'bg-purple-500',
      gastronomie: 'bg-rose-500'
    };
    return colorMap[category as keyof typeof colorMap] || 'bg-gray-500';
  };

  const formatPrice = (excursion: any) => {
    return `${excursion.priceUSD.group}$ - ${excursion.priceUSD.private}$`;
  };

  return (
    <section className={`py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {language === 'fr' ? 'Nos Excursions Authentiques' : 
             language === 'ar' ? 'رحلاتنا الأصيلة' :
             language === 'en' ? 'Our Authentic Excursions' : 
             'Nuestras Excursiones Auténticas'}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            {language === 'fr' 
              ? 'Découvrez le Maroc authentique avec nos circuits soigneusement conçus, des prix transparents et des expériences inoubliables.'
              : language === 'ar' ? 'اكتشف المغرب الأصيل مع رحلاتنا المصممة بعناية وأسعار شفافة وتجارب لا تُنسى.'
              : language === 'en' ? 'Discover authentic Morocco with our carefully designed tours, transparent prices and unforgettable experiences.'
              : 'Descubre el Marruecos auténtico con nuestros tours cuidadosamente diseñados, precios transparentes y experiencias inolvidables.'
            }
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-morocco-gold text-black shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {language === 'fr' ? 'Toutes' : 
             language === 'ar' ? 'الكل' :
             language === 'en' ? 'All' : 
             'Todas'}
          </button>
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full font-medium transition-all ${
                selectedCategory === key
                  ? 'bg-morocco-gold text-black shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category[language]}
            </button>
          ))}
        </div>

        {/* Excursions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredExcursions.map((excursion) => (
            <div
              key={excursion.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Real Image with overlay + badges */}
              <div className="relative h-48">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${excursionImageMap[excursion.id] ?? imageUrls.gallery1})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className={`${getCategoryColor(excursion.category)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                    {categories[excursion.category as keyof typeof categories][language]}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-bold text-gray-900">{formatPrice(excursion)}</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{excursion.duration[language]}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {excursion.name[language]}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  {excursion.subtitle[language]}
                </p>

                {/* Highlights */}
                {(excursion as any).highlights && (
                  <div className="mb-6">
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                      {language === 'fr' ? 'Points forts :' : 
                       language === 'ar' ? 'النقاط المميزة:' :
                       language === 'en' ? 'Highlights:' : 
                       'Puntos destacados:'}
                    </h4>
                    <ul className="space-y-1">
                      {(excursion as any).highlights[language].slice(0, 3).map((highlight: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                          <Star className="h-3 w-3 text-morocco-gold mt-1 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Pricing Info */}
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      {language === 'fr' ? 'Groupe' : 
                       language === 'ar' ? 'مجموعة' :
                       language === 'en' ? 'Group' : 
                       'Grupo'}
                    </span>
                    <span className="font-bold text-morocco-red">
                      {excursion.priceUSD.group}$ {language === 'fr' ? '/pers' : 
                                                        language === 'ar' ? '/شخص' :
                                                        language === 'en' ? '/person' : 
                                                        '/persona'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {language === 'fr' ? 'Privé' : 
                       language === 'ar' ? 'خاص' :
                       language === 'en' ? 'Private' : 
                       'Privado'}
                    </span>
                    <span className="font-bold text-morocco-gold">
                      {excursion.priceUSD.private}$ {language === 'fr' ? '/groupe' : 
                                                          language === 'ar' ? '/مجموعة' :
                                                          language === 'en' ? '/group' : 
                                                          '/grupo'}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <BookNowCTA
                    language={language}
                    onClick={() => onBookingClick(excursion.id)}
                    className="flex-1 text-sm"
                  />
                  <button
                    onClick={() => setSelectedExcursion(excursion.id)}
                    className="px-3 sm:px-4 py-2 border-2 border-morocco-gold text-morocco-gold hover:bg-morocco-gold hover:text-black rounded-lg transition-colors text-xs sm:text-sm font-medium"
                  >
                    {language === 'fr' ? 'Détails' : 
                     language === 'ar' ? 'التفاصيل' :
                     language === 'en' ? 'Details' : 
                     'Detalles'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Special Offers */}
        <div className="mt-16 bg-gradient-to-r from-morocco-red to-morocco-gold rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              {language === 'fr' ? 'Offres Spéciales' : language === 'ar' ? 'عروض خاصة' : language === 'en' ? 'Special Offers' : 'Ofertas Especiales'}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(excursionsData.specialOffers).map(([key, offer]) => (
              <div key={key} className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  {key === 'groupDiscount' && <Users className="h-6 w-6" />}
                  {key === 'multiDay' && <Calendar className="h-6 w-6" />}
                  {key === 'familyPackage' && <Shield className="h-6 w-6" />}
                </div>
                <p className="font-medium">{offer[language]}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <GetQuoteCTA
              language={language}
              onClick={() => {}}
              className="bg-white text-morocco-red hover:bg-gray-100"
            />
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-morocco-gold" />
              <span className="text-sm text-gray-600">
                {language === 'fr' ? 'Guides Certifiés' : language === 'ar' ? 'مرشدون معتمدون' : language === 'en' ? 'Certified Guides' : 'Guías Certificados'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="text-sm text-gray-600">
                {language === 'fr' ? 'Assurance Incluse' : language === 'ar' ? 'التأمين مشمول' : language === 'en' ? 'Insurance Included' : 'Seguro Incluido'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-sm text-gray-600">
                {language === 'fr' ? 'Note 4.9/5' : language === 'ar' ? 'تقييم 4.9/5' : language === 'en' ? 'Rating 4.9/5' : 'Calificación 4.9/5'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Modal (if selectedExcursion) */}
      {selectedExcursion && (
        <ExcursionDetailModal
          excursion={excursions.find(exc => exc.id === selectedExcursion)!}
          language={language}
          onClose={() => setSelectedExcursion(null)}
          onBooking={() => {
            onBookingClick(selectedExcursion);
            setSelectedExcursion(null);
          }}
        />
      )}
    </section>
  );
}

// Detailed Modal Component
function ExcursionDetailModal({ 
  excursion, 
  language, 
  onClose, 
  onBooking 
}: {
  excursion: any;
  language: 'fr' | 'ar' | 'en' | 'es';
  onClose: () => void;
  onBooking: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-morocco-red to-morocco-gold text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{excursion.name[language]}</h2>
              <p className="opacity-90">{excursion.subtitle[language]}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Itinerary */}
          {excursion.itinerary && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {language === 'fr' 
                  ? 'Programme détaillé' 
                  : language === 'ar' 
                    ? 'البرنامج المفصل' 
                    : language === 'en' 
                      ? 'Detailed itinerary' 
                      : 'Itinerario detallado'}
              </h3>
              <div className="space-y-4">
                {excursion.itinerary[language].map((item: any, index: number) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="bg-morocco-gold text-black px-3 py-1 rounded-full text-sm font-bold flex-shrink-0">
                      {item.time}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.activity}</h4>
                      <p className="text-sm text-gray-600">{item.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Included/Not Included */}
          {excursion.included && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="font-bold text-green-600 mb-3">
                  {language === 'fr' ? 'Inclus' : language === 'ar' ? 'مشمول' : language === 'en' ? 'Included' : 'Incluido'}
                </h4>
                <ul className="space-y-2">
                  {excursion.included[language].map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {excursion.notIncluded && (
                <div>
                  <h4 className="font-bold text-red-600 mb-3">
                    {language === 'fr' ? 'Non inclus' : language === 'ar' ? 'غير مشمول' : language === 'en' ? 'Not included' : 'No incluido'}
                  </h4>
                  <ul className="space-y-2">
                    {excursion.notIncluded[language].map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-red-500 mt-1">✗</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {language === 'fr' 
              ? 'À partir de' 
              : language === 'ar' 
                ? 'ابتداءً من' 
                : language === 'en' 
                  ? 'From' 
                  : 'Desde'} <span className="font-bold text-morocco-red">{excursion.priceUSD.group}$</span>
          </div>
          <BookNowCTA
            language={language}
            onClick={onBooking}
          />
        </div>
      </div>
    </div>
  );
}
