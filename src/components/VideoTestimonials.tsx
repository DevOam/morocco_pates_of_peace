'use client';

import { useState } from 'react';
import { Play, Star, X, Quote } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import { imageUrls } from './ImageManager';

interface VideoTestimonialProps {
  language: 'fr' | 'ar' | 'en' | 'es';
}

export default function VideoTestimonials({ language }: VideoTestimonialProps) {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const testimonials = {
    fr: [
      {
        id: 1,
        name: 'Marie Dubois',
        country: 'France',
        tour: 'Circuit Impérial',
        rating: 5,
        image: imageUrls.client1,
        quote: 'Une expérience absolument magique ! Les guides étaient exceptionnels.',
        videoTitle: 'Témoignage - Circuit des Villes Impériales'
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        country: 'Canada',
        tour: 'Aventure Sahara',
        rating: 5,
        image: imageUrls.client2,
        quote: 'Le désert du Sahara nous a coupé le souffle. Inoubliable !',
        videoTitle: 'Témoignage - Expérience Sahara'
      },
      {
        id: 3,
        name: 'Hans Mueller',
        country: 'Allemagne',
        tour: 'Atlas & Vallées',
        rating: 5,
        image: imageUrls.client3,
        quote: 'Organisation parfaite, paysages à couper le souffle !',
        videoTitle: 'Témoignage - Montagnes de l\'Atlas'
      }
    ],
    ar: [
      {
        id: 1,
        name: 'ماري دوبوا',
        country: 'فرنسا',
        tour: 'الجولة الإمبراطورية',
        rating: 5,
        image: imageUrls.client1,
        quote: 'تجربة سحرية مطلقة! كان المرشدون استثنائيين.',
        videoTitle: 'شهادة - جولة المدن الإمبراطورية'
      },
      {
        id: 2,
        name: 'سارة جونسون',
        country: 'كندا',
        tour: 'مغامرة الصحراء',
        rating: 5,
        image: imageUrls.client2,
        quote: 'صحراء الساحل أخذت أنفاسنا. لا تُنسى!',
        videoTitle: 'شهادة - تجربة الصحراء'
      },
      {
        id: 3,
        name: 'هانز مولر',
        country: 'ألمانيا',
        tour: 'الأطلس والوديان',
        rating: 5,
        image: imageUrls.client3,
        quote: 'تنظيم مثالي، مناظر طبيعية خلابة!',
        videoTitle: 'شهادة - جبال الأطلس'
      }
    ],
    en: [
      {
        id: 1,
        name: 'Marie Dubois',
        country: 'France',
        tour: 'Imperial Cities Tour',
        rating: 5,
        image: imageUrls.client1,
        quote: 'An absolutely magical experience! The guides were exceptional.',
        videoTitle: 'Testimonial - Imperial Cities Tour'
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        country: 'Canada',
        tour: 'Sahara Adventure',
        rating: 5,
        image: imageUrls.client2,
        quote: 'The Sahara desert took our breath away. Unforgettable!',
        videoTitle: 'Testimonial - Sahara Experience'
      },
      {
        id: 3,
        name: 'Hans Mueller',
        country: 'Germany',
        tour: 'Atlas & Valleys',
        rating: 5,
        image: imageUrls.client3,
        quote: 'Perfect organization, breathtaking landscapes!',
        videoTitle: 'Testimonial - Atlas Mountains'
      }
    ],
    es: [
      {
        id: 1,
        name: 'Marie Dubois',
        country: 'Francia',
        tour: 'Circuito Imperial',
        rating: 5,
        image: imageUrls.client1,
        quote: '¡Una experiencia absolutamente mágica! Los guías fueron excepcionales.',
        videoTitle: 'Testimonio - Circuito de Ciudades Imperiales'
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        country: 'Canadá',
        tour: 'Aventura en el Sahara',
        rating: 5,
        image: imageUrls.client2,
        quote: 'El desierto del Sahara nos dejó sin aliento. ¡Inolvidable!',
        videoTitle: 'Testimonio - Experiencia en el Sahara'
      },
      {
        id: 3,
        name: 'Hans Mueller',
        country: 'Alemania',
        tour: 'Atlas y Valles',
        rating: 5,
        image: imageUrls.client3,
        quote: '¡Organización perfecta y paisajes impresionantes!',
        videoTitle: 'Testimonio - Montañas del Atlas'
      }
    ]
  };

  const currentTestimonials = testimonials[language];

  const openVideo = (id: number) => {
    setSelectedVideo(id);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <section className={`py-20 bg-gradient-to-br from-morocco-sand to-white ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'fr' 
              ? 'Témoignages Vidéo' 
              : language === 'ar' 
                ? 'شهادات فيديو' 
                : language === 'en' 
                  ? 'Video Testimonials' 
                  : 'Testimonios en Video'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'fr' 
              ? 'Découvrez les expériences authentiques de nos voyageurs'
              : language === 'ar' 
                ? 'اكتشف التجارب الأصيلة لمسافرينا'
                : language === 'en' 
                  ? 'Discover authentic experiences from our travelers'
                  : 'Descubre experiencias auténticas de nuestros viajeros'}
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {currentTestimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="group relative">
              {/* Video Thumbnail */}
              <div 
                className="relative h-64 rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl"
                onClick={() => openVideo(testimonial.id)}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${testimonial.image})` }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:bg-morocco-gold">
                    <Play className="h-8 w-8 text-morocco-red ml-1" />
                  </div>
                </div>

                {/* Overlay Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                  <p className="text-sm opacity-90">{testimonial.country} • {testimonial.tour}</p>
                </div>
              </div>

              {/* Quote Card */}
              <div className="mt-6 bg-white rounded-xl p-6 shadow-lg transform transition-all duration-300 group-hover:shadow-xl">
                <Quote className="h-8 w-8 text-morocco-gold mb-4" />
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div 
                    className="w-12 h-12 rounded-full bg-cover bg-center mr-4"
                    style={{ backgroundImage: `url(${testimonial.image})` }}
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.tour}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-3xl font-bold text-morocco-red mb-2">98%</div>
            <div className="text-gray-600 text-sm">
              {language === 'fr' 
                ? 'Satisfaction client' 
                : language === 'ar' 
                  ? 'رضا العملاء' 
                  : language === 'en' 
                    ? 'Customer satisfaction' 
                    : 'Satisfacción del cliente'}
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-3xl font-bold text-morocco-green mb-2">5000+</div>
            <div className="text-gray-600 text-sm">
              {language === 'fr' 
                ? 'Clients heureux' 
                : language === 'ar' 
                  ? 'عملاء سعداء' 
                  : language === 'en' 
                    ? 'Happy clients' 
                    : 'Clientes felices'}
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-3xl font-bold text-morocco-gold mb-2">4.9/5</div>
            <div className="text-gray-600 text-sm">
              {language === 'fr' 
                ? 'Note moyenne' 
                : language === 'ar' 
                  ? 'التقييم المتوسط' 
                  : language === 'en' 
                    ? 'Average rating' 
                    : 'Calificación promedio'}
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-3xl font-bold text-morocco-blue mb-2">15+</div>
            <div className="text-gray-600 text-sm">
              {language === 'fr' 
                ? 'Années d\'expérience' 
                : language === 'ar' 
                  ? 'سنوات الخبرة' 
                  : language === 'en' 
                    ? 'Years of experience' 
                    : 'Años de experiencia'}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            {/* Close Button */}
            <button
              onClick={closeVideo}
              className="absolute -top-12 right-0 text-white hover:text-morocco-gold text-2xl font-bold z-10"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Video Player Simulation */}
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="h-20 w-20 mx-auto mb-4 opacity-60" />
                  <h3 className="text-xl font-semibold mb-2">
                    {currentTestimonials.find(t => t.id === selectedVideo)?.videoTitle}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {language === 'fr' 
                      ? 'Lecteur vidéo simulé - Intégration complète disponible'
                      : 'مشغل فيديو محاكي - التكامل الكامل متاح'
                    }
                  </p>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-3 h-3 bg-morocco-red rounded-full animate-pulse" />
                    <span className="text-sm">
                      {language === 'fr' ? 'Lecture en cours...' : 'جاري التشغيل...'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Video Controls */}
              <div className="p-4 bg-gray-800">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-4">
                    <button className="hover:text-morocco-gold">
                      <Play className="h-5 w-5" />
                    </button>
                    <span className="text-sm">2:34 / 4:12</span>
                  </div>
                  <div className="text-sm">
                    {currentTestimonials.find(t => t.id === selectedVideo)?.name}
                  </div>
                </div>
                <div className="mt-2 bg-gray-700 rounded-full h-1">
                  <div className="bg-morocco-gold h-1 rounded-full w-3/5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
