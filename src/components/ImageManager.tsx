// Image Manager - Gestion centralisée des images avec fallbacks + configuration externe
import React from 'react';
import mediaConfig from '../media.config.json';

// Définitions de fallbacks par défaut (sources sûres) pour chaque clé
const defaultImageUrls = {
  // Hero images - Photos spécifiques du Maroc
  hero1: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&h=1080&fit=crop&crop=center',
  hero2: 'https://images.unsplash.com/photo-1682687982167-d7fb3ed8541d?w=1920&h=1080&fit=crop&crop=center',
  hero3: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=1920&h=1080&fit=crop&crop=center',

  // Map background (topographic Morocco)
  mapMorocco: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Morocco_topographic_map-en.jpg',

  // Destinations
  marrakech: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop&crop=center',
  fes: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=600&h=400&fit=crop&crop=center',
  casablanca: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center',
  rabat: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center',
  chefchaouen: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=600&h=400&fit=crop&crop=center',
  essaouira: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center',
  merzouga: 'https://images.unsplash.com/photo-1682687982167-d7fb3ed8541d?w=600&h=400&fit=crop&crop=center',

  // Gallery
  gallery1: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop&crop=center',
  gallery2: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center',
  gallery3: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&h=400&fit=crop&crop=center',
  gallery4: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=600&h=400&fit=crop&crop=center',
  gallery5: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=400&fit=crop&crop=center',
  gallery6: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center',
  gallery7: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&h=400&fit=crop&crop=center',
  gallery8: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=400&fit=crop&crop=center',

  // Tours
  tour1: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop&crop=center',
  tour2: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&h=400&fit=crop&crop=center',
  tour3: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center',

  // Testimonials
  client1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  client2: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  client3: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
} as const;

const defaultAudioUrls = {
  marrakech: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
  sahara: 'https://www.soundjay.com/nature/sounds/wind.mp3',
  gnawa: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
  fes: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
  ouzoud: 'https://www.soundjay.com/nature/sounds/water-1.mp3'
} as const;

const defaultVideoUrls = {
  // Safe sample YouTube video; replace via media.config.json > videos.hero
  hero: 'https://www.youtube.com/embed/ysz5S6PUM-U'
} as const;

// Utilitaires simples: on accepte https et domaines publics (Wikimedia, Archive, Unsplash, etc.)
const isValidUrl = (value?: string) => {
  if (!value) return false;
  try {
    const u = new URL(value);
    return u.protocol === 'https:';
  } catch {
    return false;
  }
};

// Extraire images/audio de la config avec fallback sûr
const cfgImages = (mediaConfig as any)?.images ?? {};
const cfgAudio = (mediaConfig as any)?.audio ?? {};
const cfgVideos = (mediaConfig as any)?.videos ?? {};

export const imageUrls = {
  hero1: isValidUrl(cfgImages.hero1) ? cfgImages.hero1 : defaultImageUrls.hero1,
  hero2: isValidUrl(cfgImages.hero2) ? cfgImages.hero2 : defaultImageUrls.hero2,
  hero3: isValidUrl(cfgImages.hero3) ? cfgImages.hero3 : defaultImageUrls.hero3,

  mapMorocco: isValidUrl((mediaConfig as any)?.images?.mapMorocco) ? (mediaConfig as any).images.mapMorocco : defaultImageUrls.mapMorocco,

  marrakech: isValidUrl(cfgImages.marrakech) ? cfgImages.marrakech : defaultImageUrls.marrakech,
  fes: isValidUrl(cfgImages.fes) ? cfgImages.fes : defaultImageUrls.fes,
  casablanca: isValidUrl(cfgImages.casablanca) ? cfgImages.casablanca : defaultImageUrls.casablanca,
  rabat: isValidUrl(cfgImages.rabat) ? cfgImages.rabat : defaultImageUrls.rabat,
  chefchaouen: isValidUrl(cfgImages.chefchaouen) ? cfgImages.chefchaouen : defaultImageUrls.chefchaouen,
  essaouira: isValidUrl(cfgImages.essaouira) ? cfgImages.essaouira : defaultImageUrls.essaouira,
  merzouga: isValidUrl(cfgImages.merzouga) ? cfgImages.merzouga : defaultImageUrls.merzouga,

  gallery1: isValidUrl(cfgImages.gallery1) ? cfgImages.gallery1 : defaultImageUrls.gallery1,
  gallery2: isValidUrl(cfgImages.gallery2) ? cfgImages.gallery2 : defaultImageUrls.gallery2,
  gallery3: isValidUrl(cfgImages.gallery3) ? cfgImages.gallery3 : defaultImageUrls.gallery3,
  gallery4: isValidUrl(cfgImages.gallery4) ? cfgImages.gallery4 : defaultImageUrls.gallery4,
  gallery5: isValidUrl(cfgImages.gallery5) ? cfgImages.gallery5 : defaultImageUrls.gallery5,
  gallery6: isValidUrl(cfgImages.gallery6) ? cfgImages.gallery6 : defaultImageUrls.gallery6,
  gallery7: isValidUrl(cfgImages.gallery7) ? cfgImages.gallery7 : defaultImageUrls.gallery7,
  gallery8: isValidUrl(cfgImages.gallery8) ? cfgImages.gallery8 : defaultImageUrls.gallery8,

  tour1: isValidUrl(cfgImages.tour1) ? cfgImages.tour1 : defaultImageUrls.tour1,
  tour2: isValidUrl(cfgImages.tour2) ? cfgImages.tour2 : defaultImageUrls.tour2,
  tour3: isValidUrl(cfgImages.tour3) ? cfgImages.tour3 : defaultImageUrls.tour3,

  client1: isValidUrl(cfgImages.client1) ? cfgImages.client1 : defaultImageUrls.client1,
  client2: isValidUrl(cfgImages.client2) ? cfgImages.client2 : defaultImageUrls.client2,
  client3: isValidUrl(cfgImages.client3) ? cfgImages.client3 : defaultImageUrls.client3
} as const;

export const audioUrls = {
  marrakech: isValidUrl(cfgAudio.marrakech) ? cfgAudio.marrakech : defaultAudioUrls.marrakech,
  sahara: isValidUrl(cfgAudio.sahara) ? cfgAudio.sahara : defaultAudioUrls.sahara,
  gnawa: isValidUrl(cfgAudio.gnawa) ? cfgAudio.gnawa : defaultAudioUrls.gnawa,
  fes: isValidUrl(cfgAudio.fes) ? cfgAudio.fes : defaultAudioUrls.fes,
  ouzoud: isValidUrl(cfgAudio.ouzoud) ? cfgAudio.ouzoud : defaultAudioUrls.ouzoud
} as const;

export const videoUrls = {
  hero: isValidUrl(cfgVideos.hero) ? cfgVideos.hero : defaultVideoUrls.hero
} as const;

// Composant Image avec fallback
interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackGradient?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  fallbackGradient = 'linear-gradient(135deg, #C1272D 0%, #D2691E 100%)' 
}) => {
  return (
    <div 
      className={`bg-cover bg-center ${className}`}
      style={{
        backgroundImage: `url(${src}), ${fallbackGradient}`,
        backgroundBlendMode: 'overlay'
      }}
      role="img"
      aria-label={alt}
    />
  );
};
