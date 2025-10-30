'use client';

import { useState } from 'react';
import { Calendar, Users, MapPin, Clock, Euro, ArrowRight, Check, X } from 'lucide-react';

interface BookingSystemProps {
  language: 'fr' | 'ar' | 'en' | 'es';
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (title: string, message?: string) => void;
  onError?: (title: string, message?: string) => void;
}

export default function BookingSystem({ language, isOpen, onClose, onSuccess, onError }: BookingSystemProps) {
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
    ],
    en: [
      { id: 1, title: 'Destination & Dates', icon: MapPin },
      { id: 2, title: 'Travelers & Budget', icon: Users },
      { id: 3, title: 'Preferences', icon: Clock },
      { id: 4, title: 'Information', icon: Check }
    ],
    es: [
      { id: 1, title: 'Destino y Fechas', icon: MapPin },
      { id: 2, title: 'Viajeros y Presupuesto', icon: Users },
      { id: 3, title: 'Preferencias', icon: Clock },
      { id: 4, title: 'Información', icon: Check }
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
    ],
    en: [
      { id: 'marrakech', name: 'Marrakech', price: 80 },
      { id: 'fes', name: 'Fez', price: 75 },
      { id: 'sahara', name: 'Sahara (Merzouga)', price: 120 },
      { id: 'chefchaouen', name: 'Chefchaouen', price: 65 },
      { id: 'essaouira', name: 'Essaouira', price: 70 },
      { id: 'casablanca', name: 'Casablanca', price: 85 }
    ],
    es: [
      { id: 'marrakech', name: 'Marrakech', price: 80 },
      { id: 'fes', name: 'Fez', price: 75 },
      { id: 'sahara', name: 'Sáhara (Merzouga)', price: 120 },
      { id: 'chefchaouen', name: 'Chefchaouen', price: 65 },
      { id: 'essaouira', name: 'Esauira', price: 70 },
      { id: 'casablanca', name: 'Casablanca', price: 85 }
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
    ],
    en: [
      { id: 'culture', name: 'Culture & History', icon: '🏛️' },
      { id: 'adventure', name: 'Adventure', icon: '🏔️' },
      { id: 'relaxation', name: 'Relaxation & Spa', icon: '🧘' },
      { id: 'gastronomy', name: 'Gastronomy', icon: '🍽️' },
      { id: 'photography', name: 'Photography', icon: '📸' },
      { id: 'shopping', name: 'Shopping', icon: '🛍️' }
    ],
    es: [
      { id: 'culture', name: 'Cultura e Historia', icon: '🏛️' },
      { id: 'adventure', name: 'Aventura', icon: '🏔️' },
      { id: 'relaxation', name: 'Relajación y Spa', icon: '🧘' },
      { id: 'gastronomy', name: 'Gastronomía', icon: '🍽️' },
      { id: 'photography', name: 'Fotografía', icon: '📸' },
      { id: 'shopping', name: 'Compras', icon: '🛍️' }
    ]
  };

  const handleSubmit = async () => {
    try {
      const subject =
        language === 'fr'
          ? 'Demande de réservation'
          : language === 'ar'
            ? 'طلب حجز'
            : language === 'en'
              ? 'Booking request'
              : 'Solicitud de reserva';

      const travelDate =
        formData.startDate && formData.endDate
          ? `${formData.startDate} → ${formData.endDate}`
          : formData.startDate || '';

      const name = `${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`.trim() || 'Client';

      const message = [
        `Destination: ${formData.destination || '-'}`,
        `Dates: ${travelDate || '-'}`,
        `Voyageurs/Travelers: ${formData.travelers}`,
        `Budget: ${formData.budget}`,
        `Hébergement/Accommodation: ${formData.accommodation}`,
        `Intérêts/Interests: ${formData.interests.join(', ') || '-'}`,
        `Pays/Country: ${formData.personalInfo.country || '-'}`,
        `Demandes spéciales/Special requests: ${formData.personalInfo.specialRequests || '-'}`
      ].join('\n');

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email: formData.personalInfo.email,
          phone: formData.personalInfo.phone,
          subject,
          message,
          travelDate,
          travelers: formData.travelers,
          destination: formData.destination
        })
      });

      if (!res.ok) throw new Error('send_failed');

      const okTitle =
        language === 'fr'
          ? 'Demande envoyée'
          : language === 'ar'
            ? 'تم الإرسال بنجاح'
            : language === 'en'
              ? 'Request sent'
              : 'Solicitud enviada';
      const okMsg =
        language === 'fr'
          ? 'Nous vous contacterons sous 24 heures.'
          : language === 'ar'
            ? 'سنتواصل معك خلال 24 ساعة.'
            : language === 'en'
              ? 'We will contact you within 24 hours.'
              : 'Nos pondremos en contacto contigo en 24 horas.';

      onSuccess?.(okTitle, okMsg);
      onClose();
      setCurrentStep(1);
    } catch (e) {
      console.error(e);
      const errTitle =
        language === 'fr'
          ? 'Erreur d\'envoi'
          : language === 'ar'
            ? 'خطأ في الإرسال'
            : language === 'en'
              ? 'Send error'
              : 'Error de envío';
      const errMsg =
        language === 'fr'
          ? 'Veuillez réessayer.'
          : language === 'ar'
            ? 'يرجى المحاولة مرة أخرى.'
            : language === 'en'
              ? 'Please try again.'
              : 'Por favor, inténtalo de nuevo.';
      onError?.(errTitle, errMsg);
    }
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
              {language === 'fr' ? 'Réservation Personnalisée' : language === 'ar' ? 'حجز مخصص' : language === 'en' ? 'Custom Booking' : 'Reserva Personalizada'}
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
              <h3 className="text-xl font-bold text-black">
                {language === 'fr' ? 'Choisissez votre destination et vos dates' : language === 'ar' ? 'اختر وجهتك وتواريخك' : language === 'en' ? 'Choose your destination and dates' : 'Elige tu destino y fechas'}
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
                    <h4 className="font-semibold text-black">{dest.name}</h4>
                    <p className="text-sm text-black">{dest.price}€ / {language === 'fr' ? 'jour' : language === 'ar' ? 'يوم' : language === 'en' ? 'day' : 'día'}</p>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    {language === 'fr' ? 'Date de départ' : language === 'ar' ? 'تاريخ المغادرة' : language === 'en' ? 'Departure date' : 'Fecha de salida'}
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-morocco-gold focus:border-transparent text-black bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    {language === 'fr' ? 'Date de retour' : language === 'ar' ? 'تاريخ العودة' : language === 'en' ? 'Return date' : 'Fecha de regreso'}
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-morocco-gold focus:border-transparent text-black bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Preferences */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-black">
                {language === 'fr' ? 'Vos préférences' : language === 'ar' ? 'تفضيلاتك' : language === 'en' ? 'Your preferences' : 'Tus preferencias'}
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {interests[language].map((it) => (
                  <button
                    key={it.id}
                    onClick={() => toggleInterest(it.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      formData.interests.includes(it.id)
                        ? 'border-morocco-gold bg-morocco-gold/10'
                        : 'border-gray-200 hover:border-morocco-gold/50'
                    }`}
                  >
                    <div className="text-2xl">{it.icon}</div>
                    <div className="mt-2 font-semibold text-black">{it.name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Information (Recap + Personal info) */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-black">
                {language === 'fr' ? 'Récapitulatif & Informations' : language === 'ar' ? 'الملخص والمعلومات' : language === 'en' ? 'Summary & Information' : 'Resumen e Información'}
              </h3>

              {/* Recap */}
              <div className="rounded-xl border border-gray-200 p-4 bg-gray-50">
                <ul className="space-y-1 text-black">
                  <li><strong>Destination:</strong> {formData.destination || '-'}</li>
                  <li><strong>Dates:</strong> {formData.startDate || '-'} → {formData.endDate || '-'}</li>
                  <li><strong>Voyageurs:</strong> {formData.travelers}</li>
                  <li><strong>Budget:</strong> {formData.budget}</li>
                  <li><strong>Hébergement:</strong> {formData.accommodation}</li>
                  <li><strong>Intérêts:</strong> {formData.interests.join(', ') || '-'}</li>
                </ul>
              </div>

              {/* Personal info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">{language === 'fr' ? 'Prénom' : language === 'ar' ? 'الاسم' : language === 'en' ? 'First name' : 'Nombre'}</label>
                  <input
                    type="text"
                    value={formData.personalInfo.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, firstName: e.target.value } }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-morocco-gold focus:border-transparent text-black bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">{language === 'fr' ? 'Nom' : language === 'ar' ? 'اللقب' : language === 'en' ? 'Last name' : 'Apellido'}</label>
                  <input
                    type="text"
                    value={formData.personalInfo.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, lastName: e.target.value } }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-morocco-gold focus:border-transparent text-black bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, email: e.target.value } }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-morocco-gold focus:border-transparent text-black bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">{language === 'fr' ? 'Téléphone' : language === 'ar' ? 'الهاتف' : language === 'en' ? 'Phone' : 'Teléfono'}</label>
                  <input
                    type="tel"
                    value={formData.personalInfo.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, phone: e.target.value } }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-morocco-gold focus:border-transparent text-black bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">{language === 'fr' ? 'Pays' : language === 'ar' ? 'البلد' : language === 'en' ? 'Country' : 'País'}</label>
                  <input
                    type="text"
                    value={formData.personalInfo.country}
                    onChange={(e) => setFormData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, country: e.target.value } }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-morocco-gold focus:border-transparent text-black bg-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-black mb-2">{language === 'fr' ? 'Demandes spéciales' : language === 'ar' ? 'طلبات خاصة' : language === 'en' ? 'Special requests' : 'Peticiones especiales'}</label>
                  <textarea
                    rows={4}
                    value={formData.personalInfo.specialRequests}
                    onChange={(e) => setFormData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, specialRequests: e.target.value } }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-morocco-gold focus:border-transparent text-black bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Travelers & Budget */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-black">
                {language === 'fr' ? 'Nombre de voyageurs et budget' : language === 'ar' ? 'عدد المسافرين والميزانية' : language === 'en' ? 'Number of travelers and budget' : 'Número de viajeros y presupuesto'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    {language === 'fr' ? 'Nombre de voyageurs' : language === 'ar' ? 'عدد المسافرين' : language === 'en' ? 'Number of travelers' : 'Número de viajeros'}
                  </label>
                  <select
                    value={formData.travelers}
                    onChange={(e) => setFormData(prev => ({ ...prev, travelers: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-morocco-gold focus:border-transparent text-black bg-white"
                  >
                    {[1,2,3,4,5,6,7,8].map(num => (
                      <option key={num} value={num}>
                        {num} {language === 'fr' ? (num === 1 ? 'personne' : 'personnes') : language === 'ar' ? (num === 1 ? 'شخص' : 'أشخاص') : language === 'en' ? (num === 1 ? 'person' : 'people') : (num === 1 ? 'persona' : 'personas')}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    {language === 'fr' ? 'Gamme de budget' : language === 'ar' ? 'نطاق الميزانية' : language === 'en' ? 'Budget range' : 'Rango de presupuesto'}
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-morocco-gold focus:border-transparent text-black bg-white"
                  >
                    <option value="budget">{language === 'fr' ? 'Économique (50-80€/jour)' : language === 'ar' ? 'اقتصادي (50-80€/يوم)' : language === 'en' ? 'Budget (50-80€/day)' : 'Económico (50-80€/día)'}</option>
                    <option value="standard">{language === 'fr' ? 'Standard (80-150€/jour)' : language === 'ar' ? 'عادي (80-150€/يوم)' : language === 'en' ? 'Standard (80-150€/day)' : 'Estándar (80-150€/día)'}</option>
                    <option value="luxury">{language === 'fr' ? 'Luxe (150€+/jour)' : language === 'ar' ? 'فاخر (150€+/يوم)' : language === 'en' ? 'Luxury (150€+/day)' : 'Lujo (150€+/día)'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  {language === 'fr' ? 'Type d\'hébergement' : language === 'ar' ? 'نوع الإقامة' : language === 'en' ? 'Accommodation type' : 'Tipo de alojamiento'}
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
                      <h4 className="font-semibold text-black">
                        {language === 'fr' 
                          ? (type === 'budget' ? 'Économique' : type === 'standard' ? 'Standard' : 'Luxe')
                          : language === 'ar'
                            ? (type === 'budget' ? 'اقتصادي' : type === 'standard' ? 'عادي' : 'فاخر')
                            : language === 'en'
                              ? (type === 'budget' ? 'Budget' : type === 'standard' ? 'Standard' : 'Luxury')
                              : (type === 'budget' ? 'Económico' : type === 'standard' ? 'Estándar' : 'Lujo')
                        }
                      </h4>
                      <p className="text-sm text-gray-600">
                        {language === 'fr' 
                          ? (type === 'budget' ? 'Auberges, riads simples' : type === 'standard' ? 'Hôtels 3-4★, riads' : 'Hôtels 5★, riads luxe')
                          : language === 'ar'
                            ? (type === 'budget' ? 'نزل، رياض بسيط' : type === 'standard' ? 'فنادق 3-4★، رياض' : 'فنادق 5★، رياض فاخر')
                            : language === 'en'
                              ? (type === 'budget' ? 'Hostels, simple riads' : type === 'standard' ? '3-4★ hotels, riads' : '5★ hotels, luxury riads')
                              : (type === 'budget' ? 'Hostales, riads sencillos' : type === 'standard' ? 'Hoteles 3-4★, riads' : 'Hoteles 5★, riads de lujo')
                        }
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Navigation Buttons */}
        <div className="p-6 border-t border-gray-200">
            {currentStep < steps[language].length ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={
                  (currentStep === 1 && (!formData.destination || !formData.startDate || !formData.endDate)) ||
                  (currentStep === 4 && (!formData.personalInfo.firstName || !formData.personalInfo.email))
                }
                className="bg-morocco-red hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
              >
                {language === 'fr' ? 'Suivant' : language === 'ar' ? 'التالي' : language === 'en' ? 'Next' : 'Siguiente'}
                <ArrowRight className="h-4 w-4" />
              </button>
              ) : (
              <button
                onClick={handleSubmit}
                className="bg-morocco-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
              >
                <Check className="h-4 w-4" />
                {language === 'fr' ? 'Envoyer la demande' : language === 'ar' ? 'إرسال الطلب' : language === 'en' ? 'Submit request' : 'Enviar solicitud'}
              </button>
            )}
        </div>
      </div>
    </div>
  );
}
