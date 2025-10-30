'use client';

import { ArrowLeft, Users, Award, MapPin, Clock, Star, Shield } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <button 
              onClick={() => window.location.href = '/'}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">À propos de Morocco Plant Peace</h1>
              <p className="text-gray-600">Votre partenaire de confiance pour découvrir le Maroc</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            15 ans d'expérience dans le tourisme marocain
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Depuis 2009, nous créons des expériences authentiques et inoubliables pour nos clients du monde entier. 
            Notre passion pour le Maroc et notre expertise locale font de chaque voyage une aventure unique.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-morocco-red mb-2">15+</div>
            <div className="text-gray-600">Années d'expérience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-morocco-red mb-2">5000+</div>
            <div className="text-gray-600">Clients satisfaits</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-morocco-red mb-2">50+</div>
            <div className="text-gray-600">Circuits disponibles</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-morocco-red mb-2">4.9/5</div>
            <div className="text-gray-600">Note moyenne</div>
          </div>
        </div>

        {/* Notre Histoire */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Notre Histoire</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Morocco Plant Peace a été fondée en 2009 par Ahmed et Fatima Benali, deux passionnés de voyage 
                originaires de Marrakech. Leur vision était simple : partager la beauté et la richesse 
                culturelle du Maroc avec des voyageurs du monde entier.
              </p>
              <p className="text-gray-600 mb-4">
                Ce qui a commencé comme une petite entreprise familiale s'est transformé en l'une des 
                agences de voyage les plus respectées du Maroc, tout en conservant notre approche 
                personnalisée et notre engagement envers l'authenticité.
              </p>
              <p className="text-gray-600">
                Aujourd'hui, notre équipe de guides experts locaux continue de créer des expériences 
                sur mesure qui révèlent les trésors cachés du royaume chérifien.
              </p>
            </div>
            <div className="bg-gradient-to-br from-morocco-sand to-morocco-terracotta rounded-lg h-64"></div>
          </div>
        </div>

        {/* Nos Valeurs */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Nos Valeurs</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-morocco-red text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Authenticité</h4>
              <p className="text-gray-600">
                Nous privilégions les expériences authentiques qui vous connectent réellement 
                à la culture et aux traditions marocaines.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-morocco-green text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Service Personnalisé</h4>
              <p className="text-gray-600">
                Chaque voyage est conçu sur mesure selon vos préférences, votre budget 
                et vos centres d'intérêt.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-morocco-gold text-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Sécurité & Confiance</h4>
              <p className="text-gray-600">
                Votre sécurité et votre tranquillité d'esprit sont nos priorités absolues 
                tout au long de votre séjour.
              </p>
            </div>
          </div>
        </div>

        {/* Notre Équipe */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Notre Équipe</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-morocco-red to-morocco-terracotta rounded-full mx-auto mb-4"></div>
              <h4 className="text-lg font-semibold text-gray-900">Ahmed Benali</h4>
              <p className="text-morocco-red font-medium mb-2">Fondateur & Guide Principal</p>
              <p className="text-sm text-gray-600">
                Expert des circuits dans le Haut Atlas et le Sahara. 15 ans d'expérience.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-morocco-green to-morocco-blue rounded-full mx-auto mb-4"></div>
              <h4 className="text-lg font-semibold text-gray-900">Fatima Benali</h4>
              <p className="text-morocco-red font-medium mb-2">Co-fondatrice & Responsable Client</p>
              <p className="text-sm text-gray-600">
                Spécialiste de l'accueil et de la personnalisation des séjours.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-morocco-gold to-morocco-sand rounded-full mx-auto mb-4"></div>
              <h4 className="text-lg font-semibold text-gray-900">Youssef El Amrani</h4>
              <p className="text-morocco-red font-medium mb-2">Guide Historique</p>
              <p className="text-sm text-gray-600">
                Historien passionné, spécialiste des villes impériales et de leur patrimoine.
              </p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-morocco-red text-white rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Certifications & Partenariats</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <Award className="h-12 w-12 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Office National du Tourisme</h4>
              <p className="text-sm opacity-90">Agence certifiée ONMT</p>
            </div>
            <div>
              <Shield className="h-12 w-12 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Assurance Voyage</h4>
              <p className="text-sm opacity-90">Couverture complète incluse</p>
            </div>
            <div>
              <Users className="h-12 w-12 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Guides Certifiés</h4>
              <p className="text-sm opacity-90">Équipe de guides officiels</p>
            </div>
            <div>
              <Clock className="h-12 w-12 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Support 24/7</h4>
              <p className="text-sm opacity-90">Assistance continue</p>
            </div>
          </div>
        </div>

        {/* Témoignages */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Ce que disent nos clients</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Une expérience absolument magique ! Ahmed nous a fait découvrir des endroits 
                incroyables que nous n'aurions jamais trouvés seuls."
              </p>
              <div className="font-semibold text-gray-900">Marie & Pierre Dubois</div>
              <div className="text-sm text-gray-500">France - Circuit Impérial</div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Le professionnalisme et la passion de l'équipe ont rendu notre voyage 
                au Sahara inoubliable. Merci pour ces souvenirs !"
              </p>
              <div className="font-semibold text-gray-900">Sarah Johnson</div>
              <div className="text-sm text-gray-500">Canada - Aventure Sahara</div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Service impeccable du début à la fin. L'organisation était parfaite 
                et nous avons vécu des moments authentiques extraordinaires."
              </p>
              <div className="font-semibold text-gray-900">Hans Mueller</div>
              <div className="text-sm text-gray-500">Allemagne - Atlas & Vallées</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Prêt à vivre votre propre aventure ?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Rejoignez les milliers de voyageurs qui nous ont fait confiance pour découvrir 
            les merveilles du Maroc. Votre aventure commence ici !
          </p>
          <button 
            onClick={() => window.location.href = '/booking'}
            className="bg-morocco-red text-white px-8 py-3 rounded-md hover:bg-red-700 transition-colors font-semibold"
          >
            Réserver votre circuit
          </button>
        </div>
      </div>
    </div>
  );
}
