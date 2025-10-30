'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, Heart, Star, ArrowRight, ArrowLeft, CheckCircle, Clock, Check, ChevronRight } from 'lucide-react';
import { imageUrls, audioUrls } from './ImageManager';
import destinationsData from '../data/destinations.json';

interface TravelConfiguratorProps {
  language: 'fr' | 'ar' | 'en' | 'es';
}

interface ConfigStep {
  id: string;
  title: string;
  titleAr: string;
  completed: boolean;
}

export default function TravelConfigurator({ language }: TravelConfiguratorProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [config, setConfig] = useState({
    destinations: [] as string[],
    duration: 7,
    travelers: 2,
    budget: 'medium',
    interests: [] as string[],
    accommodation: 'standard',
    transport: 'private'
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const previewRef = useState<HTMLAudioElement | null>(null)[0] as any;

  // Map destinations -> verified audio previews
  const destAudioMap: Record<string, string | undefined> = {
    marrakech: audioUrls.marrakech,
    fes: audioUrls.fes,
    merzouga: audioUrls.sahara,
    essaouira: audioUrls.gnawa, // Gnawa music is emblematic of Essaouira
    chefchaouen: audioUrls.fes, // fallback ambience (can be customized later)
    casablanca: audioUrls.marrakech // fallback urban ambience
  };

  // Lightweight global-ish preview: stop any previous preview and play the new one
  const playDestinationPreview = async (destId: string) => {
    try {
      const url = destAudioMap[destId];
      if (!url) return;
      // Stop previous
      if ((window as any).__destPreviewAudio) {
        try { (window as any).__destPreviewAudio.pause(); } catch {}
      }
      const audio = new Audio(url);
      audio.volume = 0.6;
      (window as any).__destPreviewAudio = audio;
      await audio.play();
    } catch (e) {
      // ignore preview errors (autoplay policies should not block because it's user-initiated)
    }
  };

  const getStepTitle = (stepId: string) => {
    const titles = {
      destinations: { fr: 'Destinations', ar: 'الوجهات', en: 'Destinations', es: 'Destinos' },
      duration: { fr: 'Durée & Voyageurs', ar: 'المدة والمسافرون', en: 'Duration & Travelers', es: 'Duración y Viajeros' },
      interests: { fr: 'Centres d\'intérêt', ar: 'الاهتمامات', en: 'Interests', es: 'Intereses' },
      services: { fr: 'Services', ar: 'الخدمات', en: 'Services', es: 'Servicios' },
      summary: { fr: 'Récapitulatif', ar: 'الملخص', en: 'Summary', es: 'Resumen' }
    };
    return titles[stepId as keyof typeof titles]?.[language] || stepId;
  };

  const steps: ConfigStep[] = [
    { id: 'destinations', title: 'Destinations', titleAr: 'الوجهات', completed: false },
    { id: 'duration', title: 'Durée & Voyageurs', titleAr: 'المدة والمسافرون', completed: false },
    { id: 'interests', title: 'Centres d\'intérêt', titleAr: 'الاهتمامات', completed: false },
    { id: 'services', title: 'Services', titleAr: 'الخدمات', completed: false },
    { id: 'summary', title: 'Récapitulatif', titleAr: 'الملخص', completed: false }
  ];

  const destinations = {
    fr: [
      { 
        id: 'marrakech', 
        name: destinationsData.destinations.marrakech.name.fr, 
        subtitle: destinationsData.destinations.marrakech.subtitle.fr,
        description: destinationsData.destinations.marrakech.description.fr,
        price: 80, 
        image: imageUrls.marrakech 
      },
      { 
        id: 'fes', 
        name: destinationsData.destinations.fes.name.fr, 
        subtitle: destinationsData.destinations.fes.subtitle.fr,
        description: destinationsData.destinations.fes.description.fr,
        price: 75, 
        image: imageUrls.fes 
      },
      { 
        id: 'merzouga', 
        name: destinationsData.destinations.merzouga.name.fr, 
        subtitle: destinationsData.destinations.merzouga.subtitle.fr,
        description: destinationsData.destinations.merzouga.description.fr,
        price: 120, 
        image: imageUrls.merzouga 
      },
      { 
        id: 'chefchaouen', 
        name: destinationsData.destinations.chefchaouen.name.fr, 
        subtitle: destinationsData.destinations.chefchaouen.subtitle.fr,
        description: destinationsData.destinations.chefchaouen.description.fr,
        price: 65, 
        image: imageUrls.chefchaouen 
      },
      { 
        id: 'essaouira', 
        name: destinationsData.destinations.essaouira.name.fr, 
        subtitle: destinationsData.destinations.essaouira.subtitle.fr,
        description: destinationsData.destinations.essaouira.description.fr,
        price: 70, 
        image: imageUrls.essaouira 
      },
      { 
        id: 'casablanca', 
        name: destinationsData.destinations.casablanca.name.fr, 
        subtitle: destinationsData.destinations.casablanca.subtitle.fr,
        description: destinationsData.destinations.casablanca.description.fr,
        price: 85, 
        image: imageUrls.casablanca 
      }
    ],
    ar: [
      { 
        id: 'marrakech', 
        name: destinationsData.destinations.marrakech.name.ar, 
        subtitle: destinationsData.destinations.marrakech.subtitle.ar,
        description: destinationsData.destinations.marrakech.description.ar,
        price: 80, 
        image: imageUrls.marrakech 
      },
      { 
        id: 'fes', 
        name: destinationsData.destinations.fes.name.ar, 
        subtitle: destinationsData.destinations.fes.subtitle.ar,
        description: destinationsData.destinations.fes.description.ar,
        price: 75, 
        image: imageUrls.fes 
      },
      { 
        id: 'merzouga', 
        name: destinationsData.destinations.merzouga.name.ar, 
        subtitle: destinationsData.destinations.merzouga.subtitle.ar,
        description: destinationsData.destinations.merzouga.description.ar,
        price: 120, 
        image: imageUrls.merzouga 
      },
      { 
        id: 'chefchaouen', 
        name: destinationsData.destinations.chefchaouen.name.ar, 
        subtitle: destinationsData.destinations.chefchaouen.subtitle.ar,
        description: destinationsData.destinations.chefchaouen.description.ar,
        price: 65, 
        image: imageUrls.chefchaouen 
      },
      { 
        id: 'essaouira', 
        name: destinationsData.destinations.essaouira.name.ar, 
        subtitle: destinationsData.destinations.essaouira.subtitle.ar,
        description: destinationsData.destinations.essaouira.description.ar,
        price: 70, 
        image: imageUrls.essaouira 
      },
      { 
        id: 'casablanca', 
        name: destinationsData.destinations.casablanca.name.ar, 
        subtitle: destinationsData.destinations.casablanca.subtitle.ar,
        description: destinationsData.destinations.casablanca.description.ar,
        price: 85, 
        image: imageUrls.casablanca 
      }
    ],
    en: [
      { 
        id: 'marrakech', 
        name: destinationsData.destinations.marrakech.name.en, 
        subtitle: destinationsData.destinations.marrakech.subtitle.en,
        description: destinationsData.destinations.marrakech.description.en,
        price: 80, 
        image: imageUrls.marrakech 
      },
      { 
        id: 'fes', 
        name: destinationsData.destinations.fes.name.en, 
        subtitle: destinationsData.destinations.fes.subtitle.en,
        description: destinationsData.destinations.fes.description.en,
        price: 75, 
        image: imageUrls.fes 
      },
      { 
        id: 'merzouga', 
        name: destinationsData.destinations.merzouga.name.en, 
        subtitle: destinationsData.destinations.merzouga.subtitle.en,
        description: destinationsData.destinations.merzouga.description.en,
        price: 120, 
        image: imageUrls.merzouga 
      },
      { 
        id: 'chefchaouen', 
        name: destinationsData.destinations.chefchaouen.name.en, 
        subtitle: destinationsData.destinations.chefchaouen.subtitle.en,
        description: destinationsData.destinations.chefchaouen.description.en,
        price: 65, 
        image: imageUrls.chefchaouen 
      },
      { 
        id: 'essaouira', 
        name: destinationsData.destinations.essaouira.name.en, 
        subtitle: destinationsData.destinations.essaouira.subtitle.en,
        description: destinationsData.destinations.essaouira.description.en,
        price: 70, 
        image: imageUrls.essaouira 
      },
      { 
        id: 'casablanca', 
        name: destinationsData.destinations.casablanca.name.en, 
        subtitle: destinationsData.destinations.casablanca.subtitle.en,
        description: destinationsData.destinations.casablanca.description.en,
        price: 85, 
        image: imageUrls.casablanca 
      }
    ],
    es: [
      { 
        id: 'marrakech', 
        name: destinationsData.destinations.marrakech.name.es, 
        subtitle: destinationsData.destinations.marrakech.subtitle.es,
        description: destinationsData.destinations.marrakech.description.es,
        price: 80, 
        image: imageUrls.marrakech 
      },
      { 
        id: 'fes', 
        name: destinationsData.destinations.fes.name.es, 
        subtitle: destinationsData.destinations.fes.subtitle.es,
        description: destinationsData.destinations.fes.description.es,
        price: 75, 
        image: imageUrls.fes 
      },
      { 
        id: 'merzouga', 
        name: destinationsData.destinations.merzouga.name.es, 
        subtitle: destinationsData.destinations.merzouga.subtitle.es,
        description: destinationsData.destinations.merzouga.description.es,
        price: 120, 
        image: imageUrls.merzouga 
      },
      { 
        id: 'chefchaouen', 
        name: destinationsData.destinations.chefchaouen.name.es, 
        subtitle: destinationsData.destinations.chefchaouen.subtitle.es,
        description: destinationsData.destinations.chefchaouen.description.es,
        price: 65, 
        image: imageUrls.chefchaouen 
      },
      { 
        id: 'essaouira', 
        name: destinationsData.destinations.essaouira.name.es, 
        subtitle: destinationsData.destinations.essaouira.subtitle.es,
        description: destinationsData.destinations.essaouira.description.es,
        price: 70, 
        image: imageUrls.essaouira 
      },
      { 
        id: 'casablanca', 
        name: destinationsData.destinations.casablanca.name.es, 
        subtitle: destinationsData.destinations.casablanca.subtitle.es,
        description: destinationsData.destinations.casablanca.description.es,
        price: 85, 
        image: imageUrls.casablanca 
      }
    ]
  };

  const interests = {
    fr: [
      { id: 'culture', name: 'Culture & Histoire', icon: '🏛️' },
      { id: 'adventure', name: 'Aventure', icon: '🏔️' },
      { id: 'relaxation', name: 'Détente & Spa', icon: '🧘' },
      { id: 'gastronomy', name: 'Gastronomie', icon: '🍽️' },
      { id: 'shopping', name: 'Shopping', icon: '🛍️' },
      { id: 'photography', name: 'Photographie', icon: '📸' }
    ],
    ar: [
      { id: 'culture', name: 'الثقافة والتاريخ', icon: '🏛️' },
      { id: 'adventure', name: 'المغامرة', icon: '🏔️' },
      { id: 'relaxation', name: 'الاسترخاء والسبا', icon: '🧘' },
      { id: 'gastronomy', name: 'فن الطبخ', icon: '🍽️' },
      { id: 'shopping', name: 'التسوق', icon: '🛍️' },
      { id: 'photography', name: 'التصوير', icon: '📸' }
    ],
    en: [
      { id: 'culture', name: 'Culture & History', icon: '🏛️' },
      { id: 'adventure', name: 'Adventure', icon: '🏔️' },
      { id: 'relaxation', name: 'Relaxation & Spa', icon: '🧘' },
      { id: 'gastronomy', name: 'Gastronomy', icon: '🍽️' },
      { id: 'shopping', name: 'Shopping', icon: '🛍️' },
      { id: 'photography', name: 'Photography', icon: '📸' }
    ],
    es: [
      { id: 'culture', name: 'Cultura e Historia', icon: '🏛️' },
      { id: 'adventure', name: 'Aventura', icon: '🏔️' },
      { id: 'relaxation', name: 'Relajación y Spa', icon: '🧘' },
      { id: 'gastronomy', name: 'Gastronomía', icon: '🍽️' },
      { id: 'shopping', name: 'Compras', icon: '🛍️' },
      { id: 'photography', name: 'Fotografía', icon: '📸' }
    ]
  };

  useEffect(() => {
    calculatePrice();
  }, [config]);

  const calculatePrice = () => {
    let basePrice = 0;
    
    // Prix des destinations
    config.destinations.forEach(destId => {
      const dest = destinations.fr.find(d => d.id === destId);
      if (dest) basePrice += dest.price;
    });

    // Multiplicateurs
    basePrice *= config.duration;
    basePrice *= config.travelers;
    
    // Ajustements budget
    const budgetMultiplier = {
      'budget': 0.8,
      'medium': 1.0,
      'luxury': 1.5
    };
    basePrice *= budgetMultiplier[config.budget as keyof typeof budgetMultiplier];

    // Services
    if (config.accommodation === 'luxury') basePrice *= 1.3;
    if (config.transport === 'private') basePrice *= 1.2;

    setTotalPrice(Math.round(basePrice));
  };

  const toggleDestination = (destId: string) => {
    setConfig(prev => ({
      ...prev,
      destinations: prev.destinations.includes(destId)
        ? prev.destinations.filter(id => id !== destId)
        : [...prev.destinations, destId]
    }));
    // Play destination-specific preview on user click
    playDestinationPreview(destId);
  };

  const toggleInterest = (interestId: string) => {
    setConfig(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: // Destinations
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              {language === 'fr' ? 'Choisissez vos destinations' : language === 'ar' ? 'اختر وجهاتك' : language === 'en' ? 'Choose your destinations' : 'Elige tus destinos'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations[language].map((dest) => (
                <div
                  key={dest.id}
                  onClick={() => toggleDestination(dest.id)}
                  className={`relative cursor-pointer rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                    config.destinations.includes(dest.id) 
                      ? 'ring-4 ring-morocco-gold shadow-2xl' 
                      : 'hover:shadow-xl'
                  }`}
                >
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${dest.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/80 to-transparent">
                    <h4 className="font-bold text-lg">{dest.name}</h4>
                    <p className="text-sm opacity-90">{dest.subtitle}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-morocco-gold font-semibold">{dest.price}€</span>
                      {config.destinations.includes(dest.id) && (
                        <CheckCircle className="h-5 w-5 text-morocco-gold" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 1: // Duration & Travelers
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              {language === 'fr' ? 'Durée et nombre de voyageurs' : language === 'ar' ? 'المدة وعدد المسافرين' : language === 'en' ? 'Duration and number of travelers' : 'Duración y número de viajeros'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  <Clock className="inline h-5 w-5 mr-2" />
                  {language === 'fr' ? 'Durée du voyage' : language === 'ar' ? 'مدة الرحلة' : language === 'en' ? 'Trip duration' : 'Duración del viaje'}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[3, 7, 14].map((days) => (
                    <button
                      key={days}
                      onClick={() => setConfig(prev => ({ ...prev, duration: days }))}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        config.duration === days
                          ? 'border-morocco-red bg-morocco-red text-white'
                          : 'border-gray-200 hover:border-morocco-red'
                      }`}
                    >
                      <div className="text-2xl font-bold">{days}</div>
                      <div className="text-sm">
                        {language === 'fr' ? 'jours' : language === 'ar' ? 'أيام' : language === 'en' ? 'days' : 'días'}
                      </div>
                    </button>
                  ))}
                </div>
                <input
                  type="range"
                  min="3"
                  max="21"
                  value={config.duration}
                  onChange={(e) => setConfig(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  className="w-full mt-4"
                />
                <div className="text-center mt-2 text-gray-600">
                  {config.duration} {language === 'fr' ? 'jours' : language === 'ar' ? 'أيام' : language === 'en' ? 'days' : 'días'}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  <Users className="inline h-5 w-5 mr-2" />
                  {language === 'fr' ? 'Nombre de voyageurs' : language === 'ar' ? 'عدد المسافرين' : language === 'en' ? 'Number of travelers' : 'Número de viajeros'}
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {[1, 2, 4, 6].map((travelers) => (
                    <button
                      key={travelers}
                      onClick={() => setConfig(prev => ({ ...prev, travelers }))}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        config.travelers === travelers
                          ? 'border-morocco-red bg-morocco-red text-white'
                          : 'border-gray-200 hover:border-morocco-red'
                      }`}
                    >
                      <div className="text-xl font-bold">{travelers}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2: // Interests
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              {language === 'fr' ? 'Vos centres d\'intérêt' : language === 'ar' ? 'اهتماماتك' : language === 'en' ? 'Your interests' : 'Tus intereses'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {interests[language].map((interest) => (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
                    config.interests.includes(interest.id)
                      ? 'border-morocco-gold bg-morocco-gold text-black'
                      : 'border-gray-200 hover:border-morocco-gold'
                  }`}
                >
                  <div className="text-3xl mb-2">{interest.icon}</div>
                  <div className="font-semibold">{interest.name}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3: // Services
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              {language === 'fr' ? 'Services et confort' : language === 'ar' ? 'الخدمات والراحة' : language === 'en' ? 'Services and comfort' : 'Servicios y comodidad'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="text-lg font-semibold mb-4">
                  {language === 'fr' ? 'Hébergement' : language === 'ar' ? 'الإقامة' : language === 'en' ? 'Accommodation' : 'Alojamiento'}
                </h4>
                <div className="space-y-3">
                  {[
                    { 
                      id: 'budget', 
                      name: language === 'fr' ? 'Économique' : language === 'ar' ? 'اقتصادي' : language === 'en' ? 'Budget' : 'Económico', 
                      desc: language === 'fr' ? 'Auberges et riads simples' : language === 'ar' ? 'نزل ورياض بسيطة' : language === 'en' ? 'Simple hostels and riads' : 'Albergues y riads sencillos' 
                    },
                    { 
                      id: 'standard', 
                      name: language === 'fr' ? 'Standard' : language === 'ar' ? 'عادي' : language === 'en' ? 'Standard' : 'Estándar', 
                      desc: language === 'fr' ? 'Hôtels 3-4 étoiles' : language === 'ar' ? 'فنادق 3-4 نجوم' : language === 'en' ? '3-4 star hotels' : 'Hoteles de 3-4 estrellas' 
                    },
                    { 
                      id: 'luxury', 
                      name: language === 'fr' ? 'Luxe' : language === 'ar' ? 'فاخر' : language === 'en' ? 'Luxury' : 'Lujo', 
                      desc: language === 'fr' ? 'Palais et riads de luxe' : language === 'ar' ? 'قصور ورياض فاخرة' : language === 'en' ? 'Luxury palaces and riads' : 'Palacios y riads de lujo' 
                    }
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setConfig(prev => ({ ...prev, accommodation: option.id }))}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        config.accommodation === option.id
                          ? 'border-morocco-red bg-red-50'
                          : 'border-gray-200 hover:border-morocco-red'
                      }`}
                    >
                      <div className="font-semibold">{option.name}</div>
                      <div className="text-sm text-gray-600">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="text-lg font-semibold mb-4">
                  {language === 'fr' ? 'Transport' : language === 'ar' ? 'النقل' : language === 'en' ? 'Transport' : 'Transporte'}
                </h4>
                <div className="space-y-3">
                  {[
                    { 
                      id: 'group', 
                      name: language === 'fr' ? 'Groupe' : language === 'ar' ? 'مجموعة' : language === 'en' ? 'Group' : 'Grupo', 
                      desc: language === 'fr' ? 'Bus climatisé partagé' : language === 'ar' ? 'حافلة مكيفة مشتركة' : language === 'en' ? 'Shared air-conditioned bus' : 'Autobús climatizado compartido' 
                    },
                    { 
                      id: 'private', 
                      name: language === 'fr' ? 'Privé' : language === 'ar' ? 'خاص' : language === 'en' ? 'Private' : 'Privado', 
                      desc: language === 'fr' ? 'Véhicule avec chauffeur' : language === 'ar' ? 'مركبة مع سائق' : language === 'en' ? 'Vehicle with driver' : 'Vehículo con conductor' 
                    }
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setConfig(prev => ({ ...prev, transport: option.id }))}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        config.transport === option.id
                          ? 'border-morocco-red bg-red-50'
                          : 'border-gray-200 hover:border-morocco-red'
                      }`}
                    >
                      <div className="font-semibold">{option.name}</div>
                      <div className="text-sm text-gray-600">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4: // Summary
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              {language === 'fr' ? 'Votre voyage sur mesure' : language === 'ar' ? 'رحلتك المخصصة' : language === 'en' ? 'Your custom trip' : 'Tu viaje a medida'}
            </h3>
            
            <div className="bg-gradient-to-br from-morocco-gold to-morocco-sand rounded-2xl p-8 text-center">
              <div className="text-5xl font-bold text-black mb-4">{totalPrice}€</div>
              <div className="text-lg text-gray-800">
                {language === 'fr' ? 'Prix total estimé' : language === 'ar' ? 'السعر الإجمالي المقدر' : language === 'en' ? 'Estimated total price' : 'Precio total estimado'}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="font-semibold text-lg mb-4">
                  {language === 'fr' ? 'Destinations sélectionnées' : language === 'ar' ? 'الوجهات المختارة' : language === 'en' ? 'Selected destinations' : 'Destinos seleccionados'}
                </h4>
                <div className="space-y-2">
                  {config.destinations.map(destId => {
                    const dest = destinations[language].find(d => d.id === destId);
                    return dest ? (
                      <div key={destId} className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-morocco-red" />
                        <span>{dest.name}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="font-semibold text-lg mb-4">
                  {language === 'fr' ? 'Détails du voyage' : language === 'ar' ? 'تفاصيل الرحلة' : language === 'en' ? 'Trip details' : 'Detalles del viaje'}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{language === 'fr' ? 'Durée:' : language === 'ar' ? 'المدة:' : language === 'en' ? 'Duration:' : 'Duración:'}</span>
                    <span>{config.duration} {language === 'fr' ? 'jours' : language === 'ar' ? 'أيام' : language === 'en' ? 'days' : 'días'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'fr' ? 'Voyageurs:' : language === 'ar' ? 'المسافرون:' : language === 'en' ? 'Travelers:' : 'Viajeros:'}</span>
                    <span>{config.travelers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'fr' ? 'Hébergement:' : language === 'ar' ? 'الإقامة:' : language === 'en' ? 'Accommodation:' : 'Alojamiento:'}</span>
                    <span>{config.accommodation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'fr' ? 'Transport:' : language === 'ar' ? 'النقل:' : language === 'en' ? 'Transport:' : 'Transporte:'}</span>
                    <span>{config.transport}</span>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full bg-morocco-red text-white py-4 rounded-xl font-semibold text-lg hover:bg-red-700 transition-colors">
              {language === 'fr' ? 'Réserver ce voyage' : language === 'ar' ? 'احجز هذه الرحلة' : language === 'en' ? 'Book this trip' : 'Reservar este viaje'}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className={`py-20 bg-gray-50 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'fr' ? 'Configurateur de Voyage' : language === 'ar' ? 'منشئ الرحلات' : language === 'en' ? 'Trip Configurator' : 'Configurador de Viaje'}
          </h2>
          <p className="text-xl text-gray-600">
            {language === 'fr' ? 'Créez votre voyage sur mesure en quelques clics' : language === 'ar' ? 'أنشئ رحلتك المخصصة ببضع نقرات' : language === 'en' ? 'Create your custom trip in just a few clicks' : 'Crea tu viaje a medida en unos pocos clics'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  index <= currentStep 
                    ? 'bg-morocco-red text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {index < currentStep ? <Check className="h-5 w-5" /> : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    index < currentStep ? 'bg-morocco-red' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <span className="text-lg font-semibold text-gray-900">
              {getStepTitle(steps[currentStep].id)}
            </span>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
          >
            {language === 'fr' ? 'Précédent' : language === 'ar' ? 'السابق' : language === 'en' ? 'Previous' : 'Anterior'}
          </button>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-morocco-red">{totalPrice}€</div>
            <div className="text-sm text-gray-600">
              {language === 'fr' ? 'Prix estimé' : language === 'ar' ? 'السعر المقدر' : language === 'en' ? 'Estimated price' : 'Precio estimado'}
            </div>
          </div>

          <button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="px-6 py-3 bg-morocco-red text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 transition-colors flex items-center"
          >
            {language === 'fr' ? 'Suivant' : language === 'ar' ? 'التالي' : language === 'en' ? 'Next' : 'Siguiente'}
            <ChevronRight className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}
