'use client';

import { useState } from 'react';
import { Calendar, Users, MapPin, Phone, Mail, ArrowLeft, Check } from 'lucide-react';

export default function BookingPage() {
  const [formData, setFormData] = useState({
    tour: '',
    date: '',
    guests: '2',
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const tours = [
    { id: 'imperial', name: 'Circuit Impérial (7 jours)', price: '850€' },
    { id: 'sahara', name: 'Aventure Sahara (4 jours)', price: '450€' },
    { id: 'atlas', name: 'Atlas & Vallées (3 jours)', price: '320€' },
    { id: 'marrakech', name: 'Découverte Marrakech (2 jours)', price: '180€' },
    { id: 'fes', name: 'Fès Historique (3 jours)', price: '290€' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation de l'envoi
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Réservation Confirmée!</h2>
          <p className="text-gray-600 mb-6">
            Merci {formData.name}! Votre demande de réservation a été reçue. 
            Notre équipe vous contactera dans les 24h pour confirmer les détails.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Récapitulatif:</h3>
            <p className="text-sm text-gray-600">
              <strong>Circuit:</strong> {tours.find(t => t.id === formData.tour)?.name}<br/>
              <strong>Date:</strong> {formData.date}<br/>
              <strong>Voyageurs:</strong> {formData.guests} personne(s)
            </p>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-morocco-red text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <button 
              onClick={() => window.history.back()}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Réserver votre circuit</h1>
              <p className="text-gray-600">Remplissez le formulaire pour réserver votre aventure</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire de réservation */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Informations de réservation</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Sélection du circuit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Circuit souhaité *
                  </label>
                  <select
                    name="tour"
                    value={formData.tour}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-morocco-red"
                  >
                    <option value="">Sélectionnez un circuit</option>
                    {tours.map(tour => (
                      <option key={tour.id} value={tour.id}>
                        {tour.name} - {tour.price}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date et nombre de voyageurs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="inline h-4 w-4 mr-1" />
                      Date de départ *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-morocco-red"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Users className="inline h-4 w-4 mr-1" />
                      Nombre de voyageurs *
                    </label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-morocco-red"
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <option key={num} value={num.toString()}>
                          {num} {num === 1 ? 'personne' : 'personnes'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Informations personnelles */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Vos informations</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-morocco-red"
                        placeholder="Votre nom complet"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="inline h-4 w-4 mr-1" />
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-morocco-red"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="inline h-4 w-4 mr-1" />
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-morocco-red"
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message (optionnel)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-morocco-red"
                      placeholder="Demandes spéciales, questions, allergies alimentaires..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-morocco-red text-white py-3 px-6 rounded-md hover:bg-red-700 transition-colors font-semibold"
                >
                  Confirmer la réservation
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar avec informations */}
          <div className="space-y-6">
            {/* Récapitulatif */}
            {formData.tour && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Récapitulatif</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Circuit:</span>
                    <span className="font-medium">
                      {tours.find(t => t.id === formData.tour)?.name.split('(')[0]}
                    </span>
                  </div>
                  {formData.date && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{formData.date}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Voyageurs:</span>
                    <span className="font-medium">{formData.guests} personne(s)</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-lg font-bold">
                    <span>Prix estimé:</span>
                    <span className="text-morocco-red">
                      {tours.find(t => t.id === formData.tour)?.price}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Contact */}
            <div className="bg-morocco-red text-white rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Besoin d'aide ?</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+212 772321613</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>info@marrakechtours.ma</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5" />
                  <span>Médina de Marrakech, Maroc</span>
                </div>
              </div>
              <p className="text-sm mt-4 opacity-90">
                Notre équipe est disponible 24/7 pour vous accompagner dans votre réservation.
              </p>
            </div>

            {/* Garanties */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Nos garanties</h3>
              <ul className="space-y-2 text-sm text-green-700">
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2" />
                  Annulation gratuite 48h avant
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2" />
                  Guides locaux certifiés
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2" />
                  Transport climatisé
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2" />
                  Assurance incluse
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
