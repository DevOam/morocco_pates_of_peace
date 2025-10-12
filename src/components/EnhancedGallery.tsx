'use client';

import { useState, useEffect, useRef } from 'react';
import { MapPin, Calendar, Camera, X, ChevronLeft, ChevronRight, Filter, Heart, Share2, Download, Eye, Maximize2 } from 'lucide-react';
import { imageUrls } from './ImageManager';
import destinationsData from '../data/destinations.json';

interface EnhancedGalleryProps {
  language: 'fr' | 'ar';
}

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  location: string;
  coordinates: { lat: number; lng: number };
  date: string;
  category: string;
  photographer: string;
  description: string;
}

export default function EnhancedGallery({ language }: EnhancedGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoadStates, setImageLoadStates] = useState<{[key: number]: boolean}>({});
  const galleryRef = useRef<HTMLDivElement>(null);

  // Deterministic date formatter to avoid SSR/client mismatch
  const formatDate = (dateStr: string) => {
    try {
      const formatter = new Intl.DateTimeFormat('fr-FR', { timeZone: 'UTC' });
      return formatter.format(new Date(dateStr));
    } catch {
      return dateStr;
    }
  };

  const images: GalleryImage[] = [
    {
      id: 1,
      src: imageUrls.marrakech,
      title: destinationsData.destinations.marrakech.monuments?.[0]?.name?.[language] || (language === 'fr' ? 'Mosquée Koutoubia' : 'مسجد الكتبية'),
      location: `${destinationsData.destinations.marrakech.name[language]}, ${language === 'fr' ? 'Maroc' : 'المغرب'}`,
      coordinates: { lat: 31.6259, lng: -7.9891 },
      date: '2024-03-15',
      category: 'imperial',
      photographer: 'Wikimedia Commons (Crédit auteur sur la page du fichier)',
      description: destinationsData.destinations.marrakech.monuments?.[0]?.description?.[language] || destinationsData.destinations.marrakech.description[language]
    },
    {
      id: 2,
      src: imageUrls.casablanca,
      title: destinationsData.destinations.casablanca.monuments?.[0]?.name?.[language] || (language === 'fr' ? 'Mosquée Hassan II' : 'مسجد الحسن الثاني'),
      location: `${destinationsData.destinations.casablanca.name[language]}, ${language === 'fr' ? 'Maroc' : 'المغرب'}`,
      coordinates: { lat: 33.6084, lng: -7.6325 },
      date: '2024-02-20',
      category: 'imperial',
      photographer: 'Wikimedia Commons (Crédit auteur sur la page du fichier)',
      description: destinationsData.destinations.casablanca.monuments?.[0]?.description?.[language] || destinationsData.destinations.casablanca.description[language]
    },
    {
      id: 3,
      src: imageUrls.merzouga,
      title: `${destinationsData.destinations.merzouga.name[language]} - ${destinationsData.destinations.merzouga.subtitle[language]}`,
      location: `${destinationsData.destinations.merzouga.name[language]}, ${language === 'fr' ? 'Sahara' : 'الصحراء'}`,
      coordinates: { lat: 31.0801, lng: -4.0133 },
      date: '2024-01-10',
      category: 'sahara',
      photographer: 'Wikimedia Commons (Crédit auteur sur la page du fichier)',
      description: destinationsData.destinations.merzouga.description[language]
    },
    {
      id: 4,
      src: imageUrls.fes,
      title: destinationsData.destinations.fes.monuments?.[1]?.name?.[language] || (language === 'fr' ? 'Bab Boujloud' : 'باب بوجلود'),
      location: `${destinationsData.destinations.fes.name[language]}, ${language === 'fr' ? 'Maroc' : 'المغرب'}`,
      coordinates: { lat: 34.0631, lng: -4.9998 },
      date: '2024-03-05',
      category: 'imperial',
      photographer: 'Wikimedia Commons (Crédit auteur sur la page du fichier)',
      description: destinationsData.destinations.fes.monuments?.[1]?.description?.[language] || destinationsData.destinations.fes.description[language]
    },
    {
      id: 5,
      src: imageUrls.essaouira,
      title: `${destinationsData.destinations.essaouira.name[language]} - ${destinationsData.destinations.essaouira.subtitle[language]}`,
      location: `${destinationsData.destinations.essaouira.name[language]}, ${language === 'fr' ? 'Maroc' : 'المغرب'}`,
      coordinates: { lat: 31.5084, lng: -9.7595 },
      date: '2024-04-12',
      category: 'coast',
      photographer: 'Wikimedia Commons (Crédit auteur sur la page du fichier)',
      description: destinationsData.destinations.essaouira.description[language]
    },
    {
      id: 6,
      src: imageUrls.rabat,
      title: destinationsData.destinations.rabat.monuments?.[0]?.name?.[language] || (language === 'fr' ? 'Tour Hassan' : 'صومعة حسان'),
      location: `${destinationsData.destinations.rabat.name[language]}, ${language === 'fr' ? 'Maroc' : 'المغرب'}`,
      coordinates: { lat: 34.0233, lng: -6.8223 },
      date: '2024-02-28',
      category: 'imperial',
      photographer: 'Wikimedia Commons (Crédit auteur sur la page du fichier)',
      description: destinationsData.destinations.rabat.monuments?.[0]?.description?.[language] || destinationsData.destinations.rabat.description[language]
    }
  ];

  const categories = [
    { id: 'all', name: language === 'fr' ? 'Toutes' : 'الكل', count: images.length },
    { id: 'imperial', name: language === 'fr' ? 'Villes Impériales' : 'المدن الإمبراطورية', count: images.filter(img => img.category === 'imperial').length },
    { id: 'sahara', name: language === 'fr' ? 'Sahara' : 'الصحراء', count: images.filter(img => img.category === 'sahara').length },
    { id: 'atlas', name: language === 'fr' ? 'Atlas' : 'الأطلس', count: images.filter(img => img.category === 'atlas').length },
    { id: 'coast', name: language === 'fr' ? 'Côte' : 'الساحل', count: images.filter(img => img.category === 'coast').length }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'imperial':
        return 'bg-morocco-red text-white';
      case 'sahara':
        return 'bg-yellow-500 text-white';
      case 'atlas':
        return 'bg-green-600 text-white';
      case 'coast':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    setCurrentImageIndex(filteredImages.findIndex(img => img.id === image.id));
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % filteredImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? filteredImages.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  // Toggle favorite
  const toggleFavorite = (imageId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  // Handle image load
  const handleImageLoad = (imageId: number) => {
    setImageLoadStates(prev => ({ ...prev, [imageId]: true }));
  };

  // Smooth scroll to category
  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, currentImageIndex]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  return (
    <section className={`pt-20 pb-0 bg-gradient-to-br from-gray-50 to-white overflow-hidden ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={galleryRef}>
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'fr' ? 'Galerie Géolocalisée' : 'معرض مُحدد الموقع'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'fr' 
              ? 'Explorez le Maroc à travers nos photos authentiques avec localisation précise'
              : 'استكشف المغرب من خلال صورنا الأصيلة مع تحديد الموقع الدقيق'
            }
          </p>
        </div>

        {/* Enhanced Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12 w-full overflow-x-hidden">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 w-full px-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    setSelectedCategory(category.id);
                    setIsLoading(false);
                    scrollToGallery();
                  }, 300);
                }}
                className={`group px-6 py-3 rounded-full font-medium transition-all duration-500 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-morocco-red to-morocco-terracotta text-white shadow-xl'
                    : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-morocco-sand hover:to-morocco-gold hover:text-white border border-gray-200 hover:border-transparent shadow-md hover:shadow-lg'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Filter className={`h-4 w-4 transition-transform duration-300 ${
                    selectedCategory === category.id ? 'rotate-180' : 'group-hover:rotate-12'
                  }`} />
                  <span>{category.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold transition-colors duration-300 ${
                    selectedCategory === category.id 
                      ? 'bg-white bg-opacity-20 text-white' 
                      : 'bg-gray-100 text-gray-600 group-hover:bg-white group-hover:text-morocco-red'
                  }`}>
                    {category.count}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-4 w-full lg:w-auto justify-center lg:justify-end">
            <div className="flex bg-white rounded-full p-1 shadow-md border">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-morocco-red text-white shadow-md'
                    : 'text-gray-600 hover:text-morocco-red'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                  <span>{language === 'fr' ? 'Grille' : 'شبكة'}</span>
                </div>
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  viewMode === 'masonry'
                    ? 'bg-morocco-red text-white shadow-md'
                    : 'text-gray-600 hover:text-morocco-red'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Maximize2 className="h-4 w-4" />
                  <span>{language === 'fr' ? 'Mosaïque' : 'فسيفساء'}</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-morocco-sand border-t-morocco-red rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="h-6 w-6 text-morocco-red animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Image Grid */}
        <div className={`transition-all duration-500 w-full overflow-x-hidden ${
          isLoading ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
        } ${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6' 
            : 'columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6'
        }`}>
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className={`group relative cursor-pointer transform transition-all duration-700 hover:scale-[1.02] hover:z-10 ${
                viewMode === 'masonry' ? 'break-inside-avoid mb-6' : ''
              }`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
              onClick={() => openLightbox(image)}
            >
              {/* Enhanced Image Container */}
              <div className={`relative overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-700 w-full ${
                viewMode === 'grid' ? 'h-64 sm:h-80 rounded-2xl' : 'rounded-2xl'
              }`}>
                {/* Loading Skeleton */}
                {!imageLoadStates[image.id] && (
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
                )}
                
                {/* Main Image */}
                <img
                  src={image.src}
                  alt={image.title}
                  className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${
                    imageLoadStates[image.id] ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => handleImageLoad(image.id)}
                />
                
                {/* Enhanced Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                {/* Floating Action Buttons */}
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex flex-col space-y-1 sm:space-y-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                  <button
                    onClick={(e) => toggleFavorite(image.id, e)}
                    className={`p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 ${
                      favorites.includes(image.id)
                        ? 'bg-red-500 text-white shadow-lg'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Heart className={`h-3 w-3 sm:h-4 sm:w-4 ${favorites.includes(image.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 sm:p-2 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-md transition-all duration-300 hover:scale-110"
                  >
                    <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 sm:p-2 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-md transition-all duration-300 hover:scale-110"
                  >
                    <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                </div>

                {/* Enhanced Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 w-full">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg sm:text-xl mb-2 line-clamp-2 break-words">{image.title}</h3>
                      <div className="flex items-center text-xs sm:text-sm mb-2 opacity-90 break-words">
                        <MapPin className="h-4 w-4 mr-2 text-morocco-gold" />
                        <span>{image.location}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md ${
                      getCategoryColor(image.category)
                    } bg-opacity-90`}>
                      {categories.find(cat => cat.id === image.category)?.name}
                    </span>
                  </div>
                  
                  <p className="text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200 line-clamp-2 leading-relaxed break-words">
                    {image.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs mt-2 sm:mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300 w-full">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-2 text-morocco-gold" />
                      <span>{formatDate(image.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-2 text-morocco-gold" />
                      <span>{language === 'fr' ? 'Voir détails' : 'عرض التفاصيل'}</span>
                    </div>
                  </div>
                </div>

                {/* Animated Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-morocco-gold rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-center mt-12 mb-0">
          <p className="text-gray-600">
            {language === 'fr' 
              ? `${filteredImages.length} photo${filteredImages.length > 1 ? 's' : ''} trouvée${filteredImages.length > 1 ? 's' : ''}`
              : `تم العثور على ${filteredImages.length} صورة`
            }
            {favorites.length > 0 && (
              <span className="ml-4 text-morocco-red font-medium">
                • {favorites.length} {language === 'fr' ? 'favoris' : 'مفضلة'}
              </span>
            )}
          </p>
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
            <div className="relative max-w-6xl w-full overflow-hidden">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white hover:text-morocco-gold z-10"
              >
                <X className="h-8 w-8" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-morocco-gold z-10 bg-black bg-opacity-50 rounded-full p-3"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-morocco-gold z-10 bg-black bg-opacity-50 rounded-full p-3"
              >
                <ChevronRight className="h-8 w-8" />
              </button>

              {/* Image and Info */}
              <div className="bg-white rounded-lg overflow-hidden w-full max-w-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 w-full">
                  {/* Image */}
                  <div className="lg:col-span-2 w-full">
                    <div 
                      className="h-64 sm:h-96 lg:h-[600px] bg-cover bg-center w-full"
                      style={{ backgroundImage: `url(${selectedImage.src})` }}
                    />
                  </div>

                  {/* Details Panel */}
                  <div className="p-4 sm:p-8 bg-gray-50 w-full overflow-hidden">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {selectedImage.title}
                    </h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-5 w-5 mr-3 text-morocco-red" />
                        <span>{selectedImage.location}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-5 w-5 mr-3 text-morocco-red" />
                        <span>{formatDate(selectedImage.date)}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <Camera className="h-5 w-5 mr-3 text-morocco-red" />
                        <span>{selectedImage.photographer}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {selectedImage.description}
                    </p>

                    {/* Coordinates */}
                    <div className="bg-white rounded-lg p-4 border">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {language === 'fr' ? 'Coordonnées GPS' : 'إحداثيات GPS'}
                      </h4>
                      <div className="text-sm text-gray-600">
                        <div>Lat: {selectedImage.coordinates.lat}</div>
                        <div>Lng: {selectedImage.coordinates.lng}</div>
                      </div>
                      <button className="mt-2 text-morocco-red hover:text-red-700 text-sm font-medium">
                        {language === 'fr' ? 'Voir sur Google Maps' : 'عرض على خرائط جوجل'}
                      </button>
                    </div>

                    {/* Navigation Info */}
                    <div className="mt-6 text-center text-sm text-gray-500">
                      {currentImageIndex + 1} / {filteredImages.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
