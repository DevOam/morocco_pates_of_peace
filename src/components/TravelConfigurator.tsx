'use client';

import { useState, useEffect } from 'react';
import { Calendar, Users, MapPin, Clock, Euro, Star, ChevronRight, Check } from 'lucide-react';
import { imageUrls, audioUrls } from './ImageManager';
import destinationsData from '../data/destinations.json';

interface TravelConfiguratorProps {
  language: 'fr' | 'ar';
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
              {language === 'fr' ? 'Choisissez vos destinations' : 'اختر وجهاتك'}
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
                    <h4 className="font-bold text-lg mb-1">{dest.name}</h4>
                    <p className="text-sm font-medium text-morocco-gold mb-1">{dest.subtitle}</p>
                    <p className="text-xs opacity-90 line-clamp-2 mb-2">{dest.description}</p>
                    <p className="text-sm font-semibold">{dest.price}€ / jour</p>
                  </div>
                  {config.destinations.includes(dest.id) && (
                    <div className="absolute top-4 right-4 w-8 h-8 bg-morocco-gold rounded-full flex items-center justify-center">
                      <Check className="h-5 w-5 text-black" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 1: // Duration & Travelers
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              {language === 'fr' ? 'Durée et nombre de voyageurs' : 'المدة وعدد المسافرين'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  <Clock className="inline h-5 w-5 mr-2" />
                  {language === 'fr' ? 'Durée du voyage' : 'مدة الرحلة'}
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
                        {language === 'fr' ? 'jours' : 'أيام'}
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
                  {config.duration} {language === 'fr' ? 'jours' : 'أيام'}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  <Users className="inline h-5 w-5 mr-2" />
                  {language === 'fr' ? 'Nombre de voyageurs' : 'عدد المسافرين'}
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
              {language === 'fr' ? 'Vos centres d\'intérêt' : 'اهتماماتك'}
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
              {language === 'fr' ? 'Services et confort' : 'الخدمات والراحة'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="text-lg font-semibold mb-4">
                  {language === 'fr' ? 'Hébergement' : 'الإقامة'}
                </h4>
                <div className="space-y-3">
                  {[
                    { id: 'budget', name: language === 'fr' ? 'Économique' : 'اقتصادي', desc: language === 'fr' ? 'Auberges et riads simples' : 'نزل ورياض بسيطة' },
                    { id: 'standard', name: language === 'fr' ? 'Standard' : 'عادي', desc: language === 'fr' ? 'Hôtels 3-4 étoiles' : 'فنادق 3-4 نجوم' },
                    { id: 'luxury', name: language === 'fr' ? 'Luxe' : 'فاخر', desc: language === 'fr' ? 'Palais et riads de luxe' : 'قصور ورياض فاخرة' }
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
                  {language === 'fr' ? 'Transport' : 'النقل'}
                </h4>
                <div className="space-y-3">
                  {[
                    { id: 'group', name: language === 'fr' ? 'Groupe' : 'مجموعة', desc: language === 'fr' ? 'Bus climatisé partagé' : 'حافلة مكيفة مشتركة' },
                    { id: 'private', name: language === 'fr' ? 'Privé' : 'خاص', desc: language === 'fr' ? 'Véhicule avec chauffeur' : 'مركبة مع سائق' }
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
              {language === 'fr' ? 'Votre voyage sur mesure' : 'رحلتك المخصصة'}
            </h3>
            
            <div className="bg-gradient-to-br from-morocco-gold to-morocco-sand rounded-2xl p-8 text-center">
              <div className="text-5xl font-bold text-black mb-4">{totalPrice}€</div>
              <div className="text-lg text-gray-800">
                {language === 'fr' ? 'Prix total estimé' : 'السعر الإجمالي المقدر'}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="font-semibold text-lg mb-4">
                  {language === 'fr' ? 'Destinations sélectionnées' : 'الوجهات المختارة'}
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
                  {language === 'fr' ? 'Détails du voyage' : 'تفاصيل الرحلة'}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{language === 'fr' ? 'Durée:' : 'المدة:'}</span>
                    <span>{config.duration} {language === 'fr' ? 'jours' : 'أيام'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'fr' ? 'Voyageurs:' : 'المسافرون:'}</span>
                    <span>{config.travelers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'fr' ? 'Hébergement:' : 'الإقامة:'}</span>
                    <span>{config.accommodation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'fr' ? 'Transport:' : 'النقل:'}</span>
                    <span>{config.transport}</span>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full bg-morocco-red text-white py-4 rounded-xl font-semibold text-lg hover:bg-red-700 transition-colors">
              {language === 'fr' ? 'Réserver ce voyage' : 'احجز هذه الرحلة'}
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
            {language === 'fr' ? 'Configurateur de Voyage' : 'منشئ الرحلات'}
          </h2>
          <p className="text-xl text-gray-600">
            {language === 'fr' ? 'Créez votre voyage sur mesure en quelques clics' : 'أنشئ رحلتك المخصصة ببضع نقرات'}
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
              {language === 'fr' ? steps[currentStep].title : steps[currentStep].titleAr}
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
            {language === 'fr' ? 'Précédent' : 'السابق'}
          </button>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-morocco-red">{totalPrice}€</div>
            <div className="text-sm text-gray-600">
              {language === 'fr' ? 'Prix estimé' : 'السعر المقدر'}
            </div>
          </div>

          <button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="px-6 py-3 bg-morocco-red text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 transition-colors flex items-center"
          >
            {language === 'fr' ? 'Suivant' : 'التالي'}
            <ChevronRight className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}
