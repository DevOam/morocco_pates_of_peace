'use client';

import { useState } from 'react';
import { Calendar, Users, MapPin, Clock, Euro, ArrowRight, Check, X } from 'lucide-react';

interface BookingSystemProps {
  language: 'fr' | 'ar';
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingSystem({ language, isOpen, onClose }: BookingSystemProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 2,
    budget: 'standard',
    accommodation: 'standard',
    interests: [] as string[],
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      specialRequests: ''
    }
  });

  const steps = {
    fr: [
      { id: 1, title: 'Destination & Dates', icon: MapPin },
      { id: 2, title: 'Voyageurs & Budget', icon: Users },
      { id: 3, title: 'Préférences', icon: Clock },
      { id: 4, title: 'Informations', icon: Check }
    ],
    ar: [
      { id: 1, title: 'الوجهة والتواريخ', icon: MapPin },
      { id: 2, title: 'المسافرون والميزانية', icon: Users },
      { id: 3, title: 'التفضيلات', icon: Clock },
      { id: 4, title: 'المعلومات', icon: Check }
    ]
  };

  const destinations = {
    fr: [
      { id: 'marrakech', name: 'Marrakech', price: 80 },
      { id: 'fes', name: 'Fès', price: 75 },
      { id: 'sahara', name: 'Sahara (Merzouga)', price: 120 },
      { id: 'chefchaouen', name: 'Chefchaouen', price: 65 },
      { id: 'essaouira', name: 'Essaouira', price: 70 },
      { id: 'casablanca', name: 'Casablanca', price: 85 }
    ],
    ar: [
      { id: 'marrakech', name: 'مراكش', price: 80 },
      { id: 'fes', name: 'فاس', price: 75 },
      { id: 'sahara', name: 'الصحراء (مرزوقة)', price: 120 },
      { id: 'chefchaouen', name: 'شفشاون', price: 65 },
      { id: 'essaouira', name: 'الصويرة', price: 70 },
      { id: 'casablanca', name: 'الدار البيضاء', price: 85 }
    ]
  };

  const interests = {
    fr: [
      { id: 'culture', name: 'Culture & Histoire', icon: '🏛️' },
      { id: 'adventure', name: 'Aventure', icon: '🏔️' },
      { id: 'relaxation', name: 'Détente & Spa', icon: '🧘' },
      { id: 'gastronomy', name: 'Gastronomie', icon: '🍽️' },
      { id: 'photography', name: 'Photographie', icon: '📸' },
      { id: 'shopping', name: 'Shopping', icon: '🛍️' }
    ],
    ar: [
      { id: 'culture', name: 'الثقافة والتاريخ', icon: '🏛️' },
      { id: 'adventure', name: 'المغامرة', icon: '🏔️' },
      { id: 'relaxation', name: 'الاسترخاء والسبا', icon: '🧘' },
      { id: 'gastronomy', name: 'فن الطبخ', icon: '🍽️' },
      { id: 'photography', name: 'التصوير', icon: '📸' },
      { id: 'shopping', name: 'التسوق', icon: '🛍️' }
    ]
  };

  const handleSubmit = () => {
    // Simulate booking submission
    alert(language === 'fr' 
      ? 'Demande de réservation envoyée! Nous vous contacterons sous 24h.' 
      : 'تم إرسال طلب الحجز! سنتواصل معك خلال 24 ساعة.'
    );
    onClose();
    setCurrentStep(1);
  };

  const toggleInterest = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-morocco-red to-morocco-gold text-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {language === 'fr' ? 'Réservation Personnalisée' : 'حجز مخصص'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between mt-6">
            {steps[language].map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    currentStep >= step.id 
                      ? 'bg-white text-morocco-red border-white' 
                      : 'border-white/50 text-white/50'
                  }`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p className="text-sm font-medium">{step.title}</p>
                  </div>
                  {index < steps[language].length - 1 && (
                    <div className={`w-8 h-0.5 mx-4 ${
                      currentStep > step.id ? 'bg-white' : 'bg-white/30'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Step 1: Destination & Dates */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">
                {language === 'fr' ? 'Choisissez votre destination et vos dates' : 'اختر وجهتك وتواريخك'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {destinations[language].map((dest) => (
                  <button
                    key={dest.id}
                    onClick={() => setFormData(prev => ({ ...prev, destination: dest.id }))}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.destination === dest.id
                        ? 'border-morocco-gold bg-morocco-gold/10'
                        : 'border-gray-200 hover:border-morocco-gold/50'
                    }`}
                  >
                    <h4 className="font-semibold text-gray-900">{dest.name}</h4>
                    <p className="text-sm text-gray-600">{dest.price}€ / jour</p>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'fr' ? 'Date de départ' : 'تاريخ المغادرة'}
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-morocco-gold focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'fr' ? 'Date de retour' : 'تاريخ العودة'}
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-morocco-gold focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Travelers & Budget */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">
                {language === 'fr' ? 'Nombre de voyageurs et budget' : 'عدد المسافرين والميزانية'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'fr' ? 'Nombre de voyageurs' : 'عدد المسافرين'}
                  </label>
                  <select
                    value={formData.travelers}
                    onChange={(e) => setFormData(prev => ({ ...prev, travelers: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-morocco-gold focus:border-transparent"
                  >
                    {[1,2,3,4,5,6,7,8].map(num => (
                      <option key={num} value={num}>
                        {num} {language === 'fr' ? (num === 1 ? 'personne' : 'personnes') : (num === 1 ? 'شخص' : 'أشخاص')}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'fr' ? 'Gamme de budget' : 'نطاق الميزانية'}
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-morocco-gold focus:border-transparent"
                  >
                    <option value="budget">{language === 'fr' ? 'Économique (50-80€/jour)' : 'اقتصادي (50-80€/يوم)'}</option>
                    <option value="standard">{language === 'fr' ? 'Standard (80-150€/jour)' : 'عادي (80-150€/يوم)'}</option>
                    <option value="luxury">{language === 'fr' ? 'Luxe (150€+/jour)' : 'فاخر (150€+/يوم)'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'fr' ? 'Type d\'hébergement' : 'نوع الإقامة'}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['budget', 'standard', 'luxury'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFormData(prev => ({ ...prev, accommodation: type }))}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.accommodation === type
                          ? 'border-morocco-gold bg-morocco-gold/10'
                          : 'border-gray-200 hover:border-morocco-gold/50'
                      }`}
                    >
                      <h4 className="font-semibold text-gray-900">
                        {language === 'fr' 
                          ? (type === 'budget' ? 'Économique' : type === 'standard' ? 'Standard' : 'Luxe')
                          : (type === 'budget' ? 'اقتصادي' : type === 'standard' ? 'عادي' : 'فاخر')
                        }
                      </h4>
                      <p className="text-sm text-gray-600">
                        {language === 'fr' 
                          ? (type === 'budget' ? 'Auberges, riads simples' : type === 'standard' ? 'Hôtels 3-4★, riads' : 'Hôtels 5★, riads luxe')
                          : (type === 'budget' ? 'نزل، رياض بسيط' : type === 'standard' ? 'فنادق 3-4★، رياض' : 'فنادق 5★، رياض فاخر')
                        }
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Interests */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">
                {language === 'fr' ? 'Vos centres d\'intérêt' : 'اهتماماتك'}
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {interests[language].map((interest) => (
                  <button
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.interests.includes(interest.id)
                        ? 'border-morocco-gold bg-morocco-gold/10'
                        : 'border-gray-200 hover:border-morocco-gold/50'
                    }`}
                  >
                    <div className="text-2xl mb-2">{interest.icon}</div>
                    <h4 className="font-medium text-gray-900 text-sm">{interest.name}</h4>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Personal Info */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">
                {language === 'fr' ? 'Vos informations' : 'معلوماتك'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'fr' ? 'Prénom' : 'الاسم الأول'}
                  </label>
                  <input
                    type="text"
                    value={formData.personalInfo.firstName}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      personalInfo: { ...prev.personalInfo, firstName: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-morocco-gold focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'fr' ? 'Nom' : 'اسم العائلة'}
                  </label>
                  <input
                    type="text"
                    value={formData.personalInfo.lastName}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      personalInfo: { ...prev.personalInfo, lastName: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-morocco-gold focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'fr' ? 'Email' : 'البريد الإلكتروني'}
                  </label>
                  <input
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      personalInfo: { ...prev.personalInfo, email: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-morocco-gold focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'fr' ? 'Téléphone' : 'الهاتف'}
                  </label>
                  <input
                    type="tel"
                    value={formData.personalInfo.phone}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      personalInfo: { ...prev.personalInfo, phone: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-morocco-gold focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'fr' ? 'Demandes spéciales' : 'طلبات خاصة'}
                </label>
                <textarea
                  value={formData.personalInfo.specialRequests}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    personalInfo: { ...prev.personalInfo, specialRequests: e.target.value }
                  }))}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-morocco-gold focus:border-transparent"
                  placeholder={language === 'fr' 
                    ? 'Allergies, régimes alimentaires, mobilité réduite, etc.'
                    : 'الحساسية، الأنظمة الغذائية، محدودية الحركة، إلخ.'
                  }
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                {language === 'fr' ? 'Précédent' : 'السابق'}
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              {currentStep} / {steps[language].length}
            </div>
            
            {currentStep < steps[language].length ? (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="bg-morocco-gold hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
              >
                {language === 'fr' ? 'Suivant' : 'التالي'}
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-morocco-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
              >
                <Check className="h-4 w-4" />
                {language === 'fr' ? 'Envoyer la demande' : 'إرسال الطلب'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
