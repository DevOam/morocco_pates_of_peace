'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Users } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  location: string;
  category: 'imperial' | 'sahara' | 'atlas' | 'culture';
}

interface InteractiveGalleryProps {
  language: 'fr' | 'ar';
}

export default function InteractiveGallery({ language }: InteractiveGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const images: GalleryImage[] = [
    { id: 1, src: 'gradient-1', title: language === 'fr' ? 'Palais de la Bahia' : 'قصر الباهية', location: 'Marrakech', category: 'imperial' },
    { id: 2, src: 'gradient-2', title: language === 'fr' ? 'Dunes de Merzouga' : 'كثبان مرزوقة', location: 'Sahara', category: 'sahara' },
    { id: 3, src: 'gradient-3', title: language === 'fr' ? 'Vallée de l\'Ourika' : 'وادي أوريكة', location: 'Atlas', category: 'atlas' },
    { id: 4, src: 'gradient-4', title: language === 'fr' ? 'Médina de Fès' : 'مدينة فاس', location: 'Fès', category: 'imperial' },
    { id: 5, src: 'gradient-5', title: language === 'fr' ? 'Coucher de soleil Sahara' : 'غروب الصحراء', location: 'Erg Chebbi', category: 'sahara' },
    { id: 6, src: 'gradient-6', title: language === 'fr' ? 'Souk traditionnel' : 'السوق التقليدي', location: 'Marrakech', category: 'culture' },
  ];

  const imageUrls = {
    'gradient-1': 'https://i.pinimg.com/1200x/21/ff/df/21ffdf3398a67d36dd724720ab8f2e50.jpg',
    'gradient-2': 'https://i.pinimg.com/736x/83/fe/40/83fe408561c34a615be5045f1fda14e7.jpg',
    'gradient-3': 'https://i.pinimg.com/1200x/e8/c6/16/e8c61665bb59f180f9e5318c71fa85ea.jpg',
    'gradient-4': 'https://i.pinimg.com/736x/d7/71/f3/d771f35bffb4592779e1c7e5e0d429ed.jpg',
    'gradient-5': 'https://i.pinimg.com/736x/08/4c/f6/084cf6850cf1015392767aefd34581d5.jpg',
    'gradient-6': 'https://i.pinimg.com/1200x/1e/ed/44/1eed44b9d33a6c76501048d76a6484c0.jpg',
  };

  const filters = [
    { key: 'all', label: language === 'fr' ? 'Tout' : 'الكل' },
    { key: 'imperial', label: language === 'fr' ? 'Villes Impériales' : 'المدن الإمبراطورية' },
    { key: 'sahara', label: language === 'fr' ? 'Sahara' : 'الصحراء' },
    { key: 'atlas', label: language === 'fr' ? 'Atlas' : 'الأطلس' },
    { key: 'culture', label: language === 'fr' ? 'Culture' : 'الثقافة' },
  ];

  const filteredImages = activeFilter === 'all' 
    ? images 
    : images.filter(img => img.category === activeFilter);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    setSelectedImage(filteredImages[prevIndex]);
  };

  return (
    <section className={`py-12 sm:py-16 lg:py-20 bg-gray-50 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {language === 'fr' ? 'Galerie Immersive' : 'معرض تفاعلي'}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            {language === 'fr' 
              ? 'Découvrez la beauté du Maroc à travers notre collection de moments authentiques'
              : 'اكتشف جمال المغرب من خلال مجموعتنا من اللحظات الأصيلة'
            }
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-4">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                activeFilter === filter.key
                  ? 'bg-morocco-red text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
              onClick={() => openLightbox(image)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div 
                className="h-48 sm:h-64 lg:h-80 w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${imageUrls[image.src as keyof typeof imageUrls]})` }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-lg sm:text-xl font-bold mb-2">{image.title}</h3>
                <div className="flex items-center text-sm opacity-90">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{image.location}</span>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-morocco-gold opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
          <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl font-bold text-morocco-red mb-2">500+</div>
            <div className="text-gray-600">
              {language === 'fr' ? 'Photos authentiques' : 'صور أصيلة'}
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl font-bold text-morocco-green mb-2">50+</div>
            <div className="text-gray-600">
              {language === 'fr' ? 'Destinations uniques' : 'وجهات فريدة'}
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl font-bold text-morocco-gold mb-2">15</div>
            <div className="text-gray-600">
              {language === 'fr' ? 'Années d\'expérience' : 'سنة من الخبرة'}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-morocco-gold text-2xl font-bold z-10"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-morocco-gold transition-colors z-10"
            >
              <ChevronLeft className="h-12 w-12" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-morocco-gold transition-colors z-10"
            >
              <ChevronRight className="h-12 w-12" />
            </button>

            {/* Image */}
            <div className="bg-white rounded-lg overflow-hidden">
              <div 
                className="h-96 w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${imageUrls[selectedImage.src as keyof typeof imageUrls]})` }}
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedImage.title}</h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="text-lg">{selectedImage.location}</span>
                </div>
                <p className="text-gray-600">
                  {language === 'fr' 
                    ? 'Une destination authentique qui capture l\'essence du Maroc traditionnel.'
                    : 'وجهة أصيلة تجسد جوهر المغرب التقليدي.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
