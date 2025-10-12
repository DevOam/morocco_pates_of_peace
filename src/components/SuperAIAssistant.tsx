'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles, Phone, Mail, MapPin, Calendar, Shield, CreditCard } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'booking' | 'city' | 'recommendation' | 'safety' | 'pricing' | 'menu' | 'history' | 'culture' | 'weather' | 'logistics';
}

interface SuperAIAssistantProps {
  language: 'fr' | 'ar';
}

export default function SuperAIAssistant({ language }: SuperAIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    interests: [] as string[],
    budget: '',
    duration: '',
    groupSize: 1,
    travelStyle: ''
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Base de connaissances complète du Maroc
  type IntentType = 'booking' | 'city' | 'recommendation' | 'safety' | 'pricing' | 'menu' | 'history' | 'culture' | 'weather' | 'logistics';
  interface IntentResponse { text: string; type: IntentType; }

  const moroccoKnowledge = {
    fr: {
      cities: {
        marrakech: {
          name: "Marrakech",
          nickname: "La Ville Rouge",
          history: "Fondée en 1062 par les Almoravides, Marrakech fut la capitale de plusieurs dynasties. Son nom vient de 'Mur Akush' (Terre de Dieu). La médina, classée UNESCO, abrite des trésors architecturaux millénaires.",
          attractions: [
            "Place Jemaa el-Fna - Cœur battant de la médina",
            "Koutoubia - Minaret emblématique du 12ème siècle", 
            "Jardins Majorelle - Oasis de Yves Saint Laurent",
            "Palais Bahia - Chef-d'œuvre de l'art marocain",
            "Souks - Labyrinthe de 40 000 artisans"
          ],
          excursions: [
            "Vallée de l'Ourika (1j) - 35€ - Cascades et villages berbères",
            "Essaouira (1j) - 45€ - Cité portugaise et plages",
            "Désert d'Agafay (1j) - 65€ - Sahara proche avec dromadaires",
            "Atlas et Imlil (1j) - 55€ - Plus haut sommet d'Afrique du Nord",
            "Aït Benhaddou (1j) - 50€ - Kasbah de Game of Thrones"
          ],
          safety: "Zone très sûre. Éviter les ruelles isolées la nuit. Attention aux faux guides près de Jemaa el-Fna.",
          bestTime: "Octobre-Avril (20-25°C). Éviter Juillet-Août (40°C+)",
          specialties: "Tajine, couscous, pâtisseries aux amandes, thé à la menthe"
        },
        fes: {
          name: "Fès",
          nickname: "Capitale Spirituelle",
          history: "Fondée en 789, Fès abrite la plus ancienne université du monde (Al Quaraouiyine, 859). Centre intellectuel de l'Islam pendant des siècles, ses artisans perpétuent des techniques millénaires.",
          attractions: [
            "Médina de Fès el-Bali - Plus grande médina piétonne au monde",
            "Université Al Quaraouiyine - Plus ancienne université (859)",
            "Tanneries Chouara - Cuir traditionnel depuis le 11ème siècle",
            "Medersa Bou Inania - Joyau de l'architecture mérinide",
            "Palais Royal - Portes dorées monumentales"
          ],
          excursions: [
            "Meknès et Volubilis (1j) - 40€ - Cité impériale et ruines romaines",
            "Chefchaouen (1j) - 60€ - Perle bleue du Rif",
            "Ifrane et Cèdres (1j) - 45€ - Suisse marocaine",
            "Sefrou (1/2j) - 25€ - Ville des cerises"
          ],
          safety: "Très sûre. Se munir d'un guide dans la médina (très labyrinthique). Éviter les tanneries en été (odeurs).",
          bestTime: "Mars-Mai, Septembre-Novembre (15-25°C)",
          specialties: "Pastilla au pigeon, fassi (ragoût), cornes de gazelle"
        },
        chefchaouen: {
          name: "Chefchaouen",
          nickname: "La Perle Bleue",
          history: "Fondée en 1471 comme forteresse contre les Portugais. Les maisons bleues symbolisent le ciel et rappellent l'héritage andalou des réfugiés de Grenade.",
          attractions: [
            "Médina bleue - Ruelles photogéniques uniques au monde",
            "Kasbah - Forteresse du 15ème siècle",
            "Place Uta el-Hammam - Cœur social de la ville",
            "Mosquée espagnole - Vue panoramique",
            "Cascades d'Akchour - Piscines naturelles (45min)"
          ],
          excursions: [
            "Parc National Talassemtane (1j) - 35€ - Randonnée et cèdres",
            "Akchour et Pont de Dieu (1j) - 40€ - Cascades spectaculaires",
            "Tétouan (1/2j) - 30€ - Médina andalouse"
          ],
          safety: "Très sûre, population accueillante. Attention aux sentiers de montagne (guide recommandé).",
          bestTime: "Avril-Juin, Septembre-Octobre (18-28°C)",
          specialties: "Fromage de chèvre local, miel de montagne, tajine aux olives"
        },
        casablanca: {
          name: "Casablanca",
          nickname: "Capitale Économique",
          history: "Ancien port berbère Anfa, rebaptisée par les Portugais. Développée sous le Protectorat français, elle devient la métropole économique moderne du Maroc.",
          attractions: [
            "Mosquée Hassan II - 3ème plus grande mosquée au monde",
            "Corniche Ain Diab - Front de mer moderne",
            "Quartier Habous - Nouvelle médina années 1930",
            "Villa des Arts - Centre culturel contemporain",
            "Marché Central - Architecture Art Déco"
          ],
          excursions: [
            "Rabat (1j) - 35€ - Capitale administrative",
            "El Jadida (1j) - 40€ - Cité portugaise fortifiée",
            "Azemmour (1/2j) - 25€ - Village d'artistes"
          ],
          safety: "Sûre dans les zones touristiques. Éviter certains quartiers périphériques la nuit.",
          bestTime: "Toute l'année (climat océanique tempéré)",
          specialties: "Poissons grillés, pastilla au lait, mahalabia"
        },
        essaouira: {
          name: "Essaouira",
          nickname: "Cité des Vents",
          history: "Ancienne Mogador, port fortifié par les Portugais au 16ème siècle. Redessinée par l'architecte français Théodore Cornut au 18ème siècle. Carrefour commercial historique.",
          attractions: [
            "Médina fortifiée - Architecture militaire portugaise",
            "Port de pêche - Barques bleues traditionnelles",
            "Remparts et canons - Vues océaniques",
            "Île de Mogador - Réserve ornithologique",
            "Plage - Kitesurf et sports nautiques"
          ],
          excursions: [
            "Îles Purpuraires (1/2j) - 30€ - Observation oiseaux",
            "Forêt d'arganiers (1/2j) - 25€ - Huile d'argan authentique",
            "Safi (1j) - 35€ - Capitale de la poterie"
          ],
          safety: "Très sûre, ambiance détendue. Attention aux vents forts (emporter veste).",
          bestTime: "Avril-Octobre (20-26°C), vents rafraîchissants",
          specialties: "Poissons grillés, tajine aux fruits de mer, huile d'argan"
        }
      },
      
      bookingFlow: {
        steps: [
          "Sélection destination et dates",
          "Choix du type d'hébergement", 
          "Options transport et guides",
          "Activités et excursions",
          "Récapitulatif et paiement"
        ],
        prices: {
          "circuit-imperial": { base: 450, luxury: 850 },
          "sahara-express": { base: 280, luxury: 480 },
          "atlas-discovery": { base: 320, luxury: 520 },
          "coastal-tour": { base: 380, luxury: 680 }
        }
      },

      responses: {
        welcome: "Salut ! Je suis Aicha, votre guide IA ultra-intelligente du Maroc ! 🇲🇦✨ Je connais TOUT sur notre magnifique pays : histoire, culture, excursions, sécurité, réservations... Dites-moi ce qui vous passionne !",
        
        cityInfo: (city: string) => {
          const info = moroccoKnowledge.fr.cities[city as keyof typeof moroccoKnowledge.fr.cities];
          if (!info) return "Désolée, je ne connais pas cette ville. Essayez Marrakech, Fès, Chefchaouen, Casablanca ou Essaouira.";
          
          return `🏛️ **${info.name} - ${info.nickname}**\n\n📚 **Histoire :** ${info.history}\n\n🎯 **Incontournables :**\n${info.attractions.map(a => `• ${a}`).join('\n')}\n\n🚗 **Excursions populaires :**\n${info.excursions.map(e => `• ${e}`).join('\n')}\n\n🛡️ **Sécurité :** ${info.safety}\n\n🌤️ **Meilleure période :** ${info.bestTime}\n\n🍽️ **Spécialités :** ${info.specialties}`;
        },

        bookingStart: "Parfait ! Créons votre voyage de rêve ! 🎯\n\n**Étape 1/5 : Destination et dates**\n\nQuelle ville vous attire le plus ?\n• 🔴 Marrakech (Ville Rouge)\n• 🎨 Fès (Capitale Spirituelle) \n• 💙 Chefchaouen (Perle Bleue)\n• 🌊 Essaouira (Cité des Vents)\n• 🏢 Casablanca (Métropole)\n\nEt quelles sont vos dates préférées ?",

        recommendations: (interests: string[]) => {
          const recs = [];
          if (interests.includes('histoire')) recs.push("🏛️ **Fès** - Médina millénaire et université Al Quaraouiyine");
          if (interests.includes('nature')) recs.push("🏔️ **Atlas** - Randonnées et villages berbères authentiques");
          if (interests.includes('plage')) recs.push("🌊 **Essaouira** - Kitesurf et fruits de mer frais");
          if (interests.includes('photo')) recs.push("📸 **Chefchaouen** - Ruelles bleues Instagram-parfaites");
          if (interests.includes('aventure')) recs.push("🐪 **Sahara** - Nuit sous les étoiles en camp berbère");
          
          return `Basé sur vos goûts, voici mes recommandations VIP :\n\n${recs.join('\n\n')}\n\nVoulez-vous que je vous prépare un itinéraire personnalisé ?`;
        },

        logistics: "🚐 Transport au Maroc\n\n• Véhicules climatisés récents\n• Chauffeurs pros et assurés\n• Trains ONCF fiables entre grandes villes\n• vols internes possibles (RAM)\n\nBesoin d'un transfert aéroport/hôtel ?",

        culture: "🎭 Culture marocaine\n\n• Hospitalité légendaire\n• Artisanat (zellige, bois, cuir, tapis)\n• Musique (gnaoua, andalouse)\n• Gastronomie (tajine, pastilla, thé à la menthe)\n\nSouhaitez-vous une expérience culinaire ou atelier artisanal ?",

        weather: (city: string) => `☀️ Météo typique à ${city} (saisons)\n\n• Printemps: 20-28°C parfait pour visites\n• Été: chaud (Marrakech 35-42°C) — activités matin/soir\n• Automne: 22-30°C idéal\n• Hiver: 12-20°C doux (plus frais à l'Atlas)`,

        fallback: "Je suis votre experte Maroc. Posez-moi une question précise (ex: 'Infos Marrakech', 'Sécurité', 'Prix Sahara', 'Réserver 4 jours')."
      }
    },

    ar: {
      responses: {
        welcome: "مرحباً! أنا عائشة، المرشد الذكي للمغرب 🇲🇦✨ أعرف التاريخ والثقافة والأسعار والأمان والحجوزات. بماذا أساعدك؟",
        bookingStart: "ممتاز! لننشئ رحلتك! 🎯\n\nالخطوة 1/5: اختر المدينة والتواريخ. ما هي المدينة التي تفضلها؟ مراكش / فاس / شفشاون / الصويرة / الدار البيضاء",
        // استخدم نفس منطق الفرنسية لإجابات المدن والتوصيات مؤقتاً
        cityInfo: (city: string) => moroccoKnowledge.fr.responses.cityInfo(city),
        recommendations: (interests: string[]) => moroccoKnowledge.fr.responses.recommendations(interests),
        logistics: "🚐 النقل في المغرب موثوق وآمن: سيارات مكيفة وسائقون محترفون وقطارات بين المدن.",
        culture: "🎭 الثقافة المغربية: ضيافة، حرف يدوية، موسيقى ڭناوة، ومأكولات لذيذة.",
        weather: (city: string) => moroccoKnowledge.fr.responses.weather(city),
        fallback: "اسألني سؤالاً محدداً: معلومات مراكش، الأمان، أسعار الصحراء، حجز 4 أيام..."
      }
    }
  };

  const currentContent = moroccoKnowledge[language];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addAIMessage(currentContent.responses.welcome);
      }, 1000);
    }
  }, [isOpen, language]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addAIMessage = (text: string, type: IntentType = 'recommendation') => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text,
        sender: 'ai',
        timestamp: new Date(),
        type
      }]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date()
    }]);

    setTimeout(() => {
      const response = generateIntelligentResponse(text.toLowerCase());
      addAIMessage(response.text, response.type);
    }, 800);
  };

  const generateIntelligentResponse = (userInput: string): IntentResponse => {
    // Détection d'intention avancée
    if (userInput.includes('réserv') || userInput.includes('book') || userInput.includes('voyage')) {
      return {
        text: currentContent.responses.bookingStart,
        type: 'booking'
      };
    }

    // Informations sur les villes
    const cities = ['marrakech', 'fès', 'fes', 'chefchaouen', 'casablanca', 'essaouira'];
    const mentionedCity = cities.find(city => userInput.includes(city));
    if (mentionedCity) {
      return {
        text: currentContent.responses.cityInfo
          ? currentContent.responses.cityInfo(mentionedCity === 'fes' ? 'fes' : mentionedCity)
          : moroccoKnowledge.fr.responses.cityInfo(mentionedCity === 'fes' ? 'fes' : mentionedCity),
        type: 'city'
      };
    }

    // Détection d'intérêts pour recommandations
    const interests: string[] = [];
    if (userInput.includes('histoire') || userInput.includes('culture')) interests.push('histoire');
    if (userInput.includes('nature') || userInput.includes('montagne')) interests.push('nature');
    if (userInput.includes('plage') || userInput.includes('mer')) interests.push('plage');
    if (userInput.includes('photo') || userInput.includes('instagram')) interests.push('photo');
    if (userInput.includes('aventure') || userInput.includes('sahara')) interests.push('aventure');

    if (interests.length > 0) {
      setUserPreferences(prev => ({ ...prev, interests }));
      return {
        text: currentContent.responses.recommendations
          ? currentContent.responses.recommendations(interests)
          : moroccoKnowledge.fr.responses.recommendations(interests),
        type: 'recommendation'
      };
    }

    // Sécurité
    if (userInput.includes('sécur') || userInput.includes('danger') || userInput.includes('sûr')) {
      return {
        text: "🛡️ **Sécurité au Maroc - Guide Complet**\n\n✅ **Zones très sûres :** Toutes les villes touristiques principales\n⚠️ **Précautions standard :** Éviter ruelles isolées la nuit\n🚫 **Zones à éviter :** Certains quartiers périphériques de Casablanca\n\n**Conseils pratiques :**\n• Gardez copies de vos papiers\n• Négociez prix avant services\n• Utilisez taxis officiels\n• Respectez codes vestimentaires locaux\n\nVoulez-vous des infos spécifiques à une ville ?",
        type: 'safety'
      };
    }

    // Météo / climat
    if (userInput.includes('météo') || userInput.includes('climat') || userInput.includes('weather')) {
      const city = cities.find(c => userInput.includes(c)) || 'Marrakech';
      return {
        text: currentContent.responses.weather
          ? currentContent.responses.weather(city)
          : moroccoKnowledge.fr.responses.weather(city),
        type: 'history'
      };
    }

    // Culture / gastronomie
    if (userInput.includes('culture') || userInput.includes('gastr') || userInput.includes('cuisine')) {
      return { text: currentContent.responses.culture, type: 'culture' } as IntentResponse;
    }

    // Logistique / transport
    if (userInput.includes('transport') || userInput.includes('taxi') || userInput.includes('train')) {
      return { text: currentContent.responses.logistics, type: 'logistics' } as IntentResponse;
    }

    // Prix et budget
    if (userInput.includes('prix') || userInput.includes('coût') || userInput.includes('budget')) {
      return {
        text: "💰 **Tarifs 2024 - Circuits Premium**\n\n🏛️ **Circuit Impérial** (7j)\n• Standard : 450€ • Luxe : 850€\n\n🏜️ **Sahara Express** (4j)\n• Standard : 280€ • Luxe : 480€\n\n🏔️ **Atlas Découverte** (5j)\n• Standard : 320€ • Luxe : 520€\n\n🌊 **Tour Côtier** (6j)\n• Standard : 380€ • Luxe : 680€\n\n*Inclus : hébergement, transport, guides, repas*\n\nQuel circuit vous intéresse ?",
        type: 'pricing'
      };
    }

    // Réponse par défaut intelligente
    return {
      text: "Je suis votre experte Maroc ! Posez-moi des questions sur :\n\n🏛️ **Villes** (histoire, attractions, excursions)\n🎯 **Réservations** (circuits, hébergements)\n💰 **Prix** (budgets, comparaisons)\n🛡️ **Sécurité** (conseils, zones)\n🍽️ **Culture** (gastronomie, traditions)\n📸 **Activités** (photo, aventure, détente)\n\nQue voulez-vous découvrir ?",
      type: 'menu'
    };
  };

  const handleSend = () => {
    if (inputText.trim()) {
      addUserMessage(inputText);
      setInputText('');
    }
  };

  const handleQuickReply = (reply: string) => {
    addUserMessage(reply);
  };

  const quickReplies = [
    "Réserver un circuit",
    "Infos Marrakech",
    "Infos Fès",
    "Infos Chefchaouen",
    "Infos Essaouira",
    "Infos Casablanca",
    "Sécurité au Maroc",
    "Prix et budgets",
    "Météo Marrakech",
    "Culture & Gastronomie",
    "Recommandations personnalisées"
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* Super AI Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 ${language === 'ar' ? 'left-6' : 'right-6'} z-40 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
          isOpen ? 'hidden' : 'block'
        }`}
      >
        <Bot className="h-6 w-6" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse flex items-center justify-center">
          <Sparkles className="h-2 w-2 text-white" />
        </div>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Guide IA Expert
        </div>
      </button>

      {/* Super AI Chat Window */}
      {isOpen && (
        <div className={`ai-chat fixed bottom-6 ${language === 'ar' ? 'left-6' : 'right-6'} z-50 w-96 h-[650px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3 backdrop-blur-sm">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">
                  {language === 'fr' ? 'Aicha - Guide IA Expert' : 'عائشة - المرشد الذكي'}
                </h3>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <Sparkles className="h-3 w-3" />
                  <span>{language === 'fr' ? 'Expert Maroc 24/7' : 'خبير المغرب 24/7'}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs px-4 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-white text-gray-800 shadow-md border border-gray-100'
                }`}>
                  {message.sender === 'ai' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="h-4 w-4 text-purple-600" />
                      <span className="text-xs font-medium text-purple-600">Aicha IA Expert</span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-purple-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 shadow-md px-4 py-3 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="h-4 w-4 text-purple-600" />
                    <span className="text-xs font-medium text-purple-600">Aicha analyse...</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length > 0 && messages.length < 4 && (
            <div className="p-3 bg-gray-50 border-t">
              <div className="flex flex-wrap gap-2">
                {quickReplies.slice(0, 3).map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs bg-white border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 px-3 py-2 rounded-full transition-colors font-medium"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-gray-100 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={language === 'fr' ? 'Posez votre question d\'expert...' : 'اطرح سؤالك...'}
                style={{ backgroundColor: 'white', color: 'black', WebkitTextFillColor: 'black', caretColor: 'black', fontSize: '16px', fontWeight: '500' }}
                className="flex-1 px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500"
              />
              <button
                onClick={handleSend}
                disabled={!inputText.trim()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-300 disabled:to-gray-400 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            
            {/* Expert Features */}
            <div className="flex justify-center space-x-4 mt-3 pt-3 border-t border-gray-200">
              <button 
                onClick={() => handleQuickReply("Réserver maintenant")}
                className="flex items-center text-xs text-purple-600 hover:text-purple-800 transition-colors font-medium"
              >
                <Calendar className="h-3 w-3 mr-1" />
                Réserver
              </button>
              <button 
                onClick={() => handleQuickReply("Conseils sécurité")}
                className="flex items-center text-xs text-purple-600 hover:text-purple-800 transition-colors font-medium"
              >
                <Shield className="h-3 w-3 mr-1" />
                Sécurité
              </button>
              <button 
                onClick={() => handleQuickReply("Prix détaillés")}
                className="flex items-center text-xs text-purple-600 hover:text-purple-800 transition-colors font-medium"
              >
                <CreditCard className="h-3 w-3 mr-1" />
                Prix
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
