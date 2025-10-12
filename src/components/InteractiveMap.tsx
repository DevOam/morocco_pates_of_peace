'use client';

import { useState } from 'react';
import { MapPin, Clock, Users, Star, ArrowRight } from 'lucide-react';
import { imageUrls } from './ImageManager';

interface Destination {
  id: number;
  name: string;
  nameAr: string;
  coordinates: { x: number; y: number };
  duration: string;
  price: string;
  rating: number;
  highlights: string[];
  highlightsAr: string[];
  category: 'imperial' | 'sahara' | 'atlas' | 'coast';
}

interface InteractiveMapProps {
  language: 'fr' | 'ar';
}

export default function InteractiveMap({ language }: InteractiveMapProps) {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [hoveredDestination, setHoveredDestination] = useState<number | null>(null);

  const destinations: Destination[] = [
    {
      id: 1,
      name: 'Marrakech',
      nameAr: 'مراكش',
      coordinates: { x: 25, y: 65 },
      duration: '2-3 jours',
      price: '180€',
      rating: 4.9,
      highlights: ['Médina UNESCO', 'Palais de la Bahia', 'Jardins Majorelle'],
      highlightsAr: ['المدينة العتيقة', 'قصر الباهية', 'حدائق ماجوريل'],
      category: 'imperial'
    },
    {
      id: 2,
      name: 'Fès',
      nameAr: 'فاس',
      coordinates: { x: 35, y: 35 },
      duration: '2-3 jours',
      price: '220€',
      rating: 4.8,
      highlights: ['Médina médiévale', 'Université Al Quaraouiyine', 'Tanneries'],
      highlightsAr: ['المدينة القديمة', 'جامعة القرويين', 'المدابغ'],
      category: 'imperial'
    },
    {
      id: 3,
      name: 'Merzouga',
      nameAr: 'مرزوقة',
      coordinates: { x: 75, y: 45 },
      duration: '3-4 jours',
      price: '450€',
      rating: 5.0,
      highlights: ['Dunes Erg Chebbi', 'Nuit sous les étoiles', 'Caravanes de chameaux'],
      highlightsAr: ['كثبان عرق الشبي', 'ليلة تحت النجوم', 'قوافل الجمال'],
      category: 'sahara'
    },
    {
      id: 4,
      name: 'Chefchaouen',
      nameAr: 'شفشاون',
      coordinates: { x: 30, y: 20 },
      duration: '1-2 jours',
      price: '150€',
      rating: 4.7,
      highlights: ['Ville bleue', 'Montagnes du Rif', 'Artisanat local'],
      highlightsAr: ['المدينة الزرقاء', 'جبال الريف', 'الحرف المحلية'],
      category: 'atlas'
    },
    {
      id: 5,
      name: 'Essaouira',
      nameAr: 'الصويرة',
      coordinates: { x: 15, y: 70 },
      duration: '2 jours',
      price: '200€',
      rating: 4.6,
      highlights: ['Port historique', 'Remparts', 'Plages atlantiques'],
      highlightsAr: ['الميناء التاريخي', 'الأسوار', 'شواطئ الأطلسي'],
      category: 'coast'
    }
  ];

  const categoryColors = {
    imperial: '#C1272D',
    sahara: '#FFD700',
    atlas: '#006233',
    coast: '#4A90E2'
  };

  // Real thumbnails for hover cards
  const thumbs: Record<string, string> = {
    Marrakech: imageUrls.marrakech,
    Fès: imageUrls.fes,
    Merzouga: imageUrls.merzouga,
    Chefchaouen: imageUrls.chefchaouen,
    Essaouira: imageUrls.essaouira,
  };

  return (
    <section className={`py-20 bg-white ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'fr' ? 'Carte Interactive du Maroc' : 'خريطة المغرب التفاعلية'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'fr' 
              ? 'Explorez nos destinations et planifiez votre itinéraire personnalisé'
              : 'استكشف وجهاتنا وخطط لرحلتك المخصصة'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Interactive Map */}
          <div className="lg:col-span-2">
            <div
              className="relative rounded-2xl p-8 h-96 overflow-hidden shadow-xl"
              style={{
                backgroundImage: `url(${imageUrls.mapMorocco})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Vignette/overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/10 to-black/40" />

              {/* Morocco Outline (Simplified) */}
              <svg 
                viewBox="0 0 100 100" 
                className="absolute inset-0 w-full h-full opacity-30"
                fill="none" 
                stroke="white" 
                strokeWidth="0.5"
              >
                <path d="M10,30 Q15,25 25,20 L35,15 L45,18 L55,15 L70,20 L80,25 L85,35 L90,50 L85,65 L80,75 L70,85 L60,90 L45,88 L35,85 L25,80 L15,70 L10,55 Z" />
              </svg>

              {/* Destination Pins */}
              {destinations.map((destination) => (
                <div key={destination.id}>
                  {/* Pin */}
                  <button
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                      hoveredDestination === destination.id ? 'scale-125 z-20' : 'scale-100 z-10'
                    }`}
                    style={{
                      left: `${destination.coordinates.x}%`,
                      top: `${destination.coordinates.y}%`,
                    }}
                    onMouseEnter={() => setHoveredDestination(destination.id)}
                    onMouseLeave={() => setHoveredDestination(null)}
                    onClick={() => setSelectedDestination(destination)}
                  >
                    <div 
                      className="w-4 h-4 rounded-full border-2 border-white shadow-[0_0_0_2px_rgba(0,0,0,0.15)]"
                      style={{ backgroundColor: categoryColors[destination.category], boxShadow: `0 8px 20px rgba(0,0,0,0.35)` }}
                    />
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
                      <div className={`backdrop-blur-md bg-black/70 text-white px-2 py-1 rounded text-xs whitespace-nowrap transition-opacity duration-300 shadow ${
                        hoveredDestination === destination.id ? 'opacity-100' : 'opacity-0'
                      }`}>
                        {language === 'fr' ? destination.name : destination.nameAr}
                      </div>
                    </div>
                  </button>

                  {/* Pulse Animation */}
                  <div
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full animate-ping ${
                      hoveredDestination === destination.id ? 'opacity-75' : 'opacity-0'
                    }`}
                    style={{
                      left: `${destination.coordinates.x}%`,
                      top: `${destination.coordinates.y}%`,
                      backgroundColor: categoryColors[destination.category],
                    }}
                  />

                  {/* Premium Hover Card */}
                  {hoveredDestination === destination.id && (
                    <div
                      className="absolute -translate-x-1/2 -translate-y-full mt-[-16px] w-56 rounded-xl overflow-hidden shadow-2xl border border-white/30 backdrop-blur-md"
                      style={{
                        left: `${destination.coordinates.x}%`,
                        top: `${destination.coordinates.y}%`,
                      }}
                    >
                      <div
                        className="h-28 bg-cover bg-center"
                        style={{ backgroundImage: `url(${thumbs[destination.name] || imageUrls.gallery1})` }}
                      />
                      <div className="bg-white/90 p-3">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-semibold text-gray-900 truncate">
                            {language === 'fr' ? destination.name : destination.nameAr}
                          </div>
                          <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: categoryColors[destination.category] }}
                          />
                        </div>
                        <div className="text-xs text-gray-600 flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> {destination.duration}
                        </div>
                        <div className="text-sm font-bold text-morocco-red mt-1">{destination.price}</div>
                        <button
                          onClick={() => setSelectedDestination(destination)}
                          className="mt-2 w-full text-xs bg-morocco-red text-white py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-1"
                        >
                          <ArrowRight className="h-3 w-3" /> {language === 'fr' ? 'Voir les détails' : 'عرض التفاصيل'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 rounded-xl p-3 backdrop-blur-md bg-white/85 shadow-lg border border-white/40">
                <h4 className="text-sm font-semibold mb-2">
                  {language === 'fr' ? 'Légende' : 'المفتاح'}
                </h4>
                <div className="space-y-1">
                  <div className="flex items-center text-xs">
                    <div className="w-3 h-3 rounded-full bg-morocco-red mr-2" />
                    <span>{language === 'fr' ? 'Villes Impériales' : 'المدن الإمبراطورية'}</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="w-3 h-3 rounded-full bg-morocco-gold mr-2" />
                    <span>{language === 'fr' ? 'Sahara' : 'الصحراء'}</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="w-3 h-3 rounded-full bg-morocco-green mr-2" />
                    <span>{language === 'fr' ? 'Montagnes' : 'الجبال'}</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="w-3 h-3 rounded-full bg-morocco-blue mr-2" />
                    <span>{language === 'fr' ? 'Côte' : 'الساحل'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Destination Details */}
          <div className="space-y-6">
            {selectedDestination ? (
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {language === 'fr' ? selectedDestination.name : selectedDestination.nameAr}
                    </h3>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${
                              i < Math.floor(selectedDestination.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {selectedDestination.rating}/5
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-morocco-red">
                      {selectedDestination.price}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {selectedDestination.duration}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {language === 'fr' ? 'Points forts' : 'النقاط المميزة'}
                    </h4>
                    <ul className="space-y-1">
                      {(language === 'fr' ? selectedDestination.highlights : selectedDestination.highlightsAr).map((highlight, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <ArrowRight className="h-3 w-3 mr-2 text-morocco-red" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="w-full bg-morocco-red text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                    {language === 'fr' ? 'Réserver cette destination' : 'احجز هذه الوجهة'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {language === 'fr' ? 'Sélectionnez une destination' : 'اختر وجهة'}
                </h3>
                <p className="text-gray-600">
                  {language === 'fr' 
                    ? 'Cliquez sur un point de la carte pour voir les détails'
                    : 'انقر على نقطة في الخريطة لرؤية التفاصيل'
                  }
                </p>
              </div>
            )}

            {/* Popular Destinations */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h4 className="font-semibold text-gray-900 mb-4">
                {language === 'fr' ? 'Destinations populaires' : 'الوجهات الشعبية'}
              </h4>
              <div className="space-y-3">
                {destinations.slice(0, 3).map((destination) => (
                  <button
                    key={destination.id}
                    onClick={() => setSelectedDestination(destination)}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-3"
                          style={{ backgroundColor: categoryColors[destination.category] }}
                        />
                        <div>
                          <div className="font-medium text-gray-900">
                            {language === 'fr' ? destination.name : destination.nameAr}
                          </div>
                          <div className="text-sm text-gray-600">
                            {destination.duration}
                          </div>
                        </div>
                      </div>
                      <div className="text-morocco-red font-semibold">
                        {destination.price}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
