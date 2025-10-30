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
  language: 'fr' | 'ar' | 'en' | 'es';
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

  // --- Helpers to localize dynamic blocks for EN/ES so they don't fall back to FR ---
  const cityInfoEn = (city: string) => {
    switch (city) {
      case 'marrakech':
        return `🏛️ **Marrakech - The Red City**

📚 **History:** Founded in 1062 by the Almoravids. UNESCO-listed medina with centuries-old architecture.

🎯 **Highlights:**
• Jemaa el-Fna square – heart of the medina
• Koutoubia – 12th-century minaret
• Majorelle Gardens – iconic oasis
• Bahia Palace – masterpiece of Moroccan art
• Souks – labyrinth of artisans

🛡️ **Safety:** Very safe in tourist areas. Avoid deserted alleys late at night.

🌤️ **Best time:** October–April (20–25°C). Avoid July–August (40°C+)

🍽️ **Specialties:** Tagine, couscous, almond pastries, mint tea`;
      case 'fes':
        return `🏛️ **Fez - Spiritual Capital**

📚 **History:** Founded in 789. Home to Al‑Qarawiyyin (859), the world’s oldest university.

🎯 **Highlights:**
• Fes el‑Bali medina – world’s largest car‑free area
• Al‑Qarawiyyin University
• Chouara Tanneries
• Bou Inania Madrasa
• Royal Palace gates

🛡️ **Safety:** Safe; the medina is very maze‑like—use a guide.

🌤️ **Best time:** Mar–May, Sep–Nov (15–25°C)`;
      case 'chefchaouen':
        return `🏛️ **Chefchaouen - The Blue Pearl**

🎯 **Highlights:**
• Blue-painted medina
• Kasbah & Uta el‑Hammam square
• Spanish Mosque viewpoint
• Akchour waterfalls

🛡️ **Safety:** Very safe; take care on mountain trails.

🌤️ **Best time:** Apr–Jun, Sep–Oct`;
      case 'casablanca':
        return `🏛️ **Casablanca - Economic Capital**

🎯 **Highlights:**
• Hassan II Mosque
• Ain Diab Corniche
• Habous quarter
• Art Deco architecture

🛡️ **Safety:** Safe in tourist zones; avoid some outskirts at night.`;
      case 'essaouira':
        return `🏛️ **Essaouira - Wind City**

🎯 **Highlights:**
• Fortified medina & ramparts
• Fishing port & blue boats
• Atlantic beaches & surf

🛡️ **Safety:** Very safe; strong winds—bring a light jacket.`;
      default:
        return "City not found.";
    }
  };

  const cityInfoEs = (city: string) => {
    switch (city) {
      case 'marrakech':
        return `🏛️ **Marrakech - La Ciudad Roja**

📚 **Historia:** Fundada en 1062 por los almoháravides. Medina declarada Patrimonio UNESCO.

🎯 **Imprescindibles:**
• Plaza Jemaa el‑Fna – corazón de la medina
• Koutoubia – alminar del s. XII
• Jardines Majorelle – oasis icónico
• Palacio de la Bahía – obra maestra del arte marroquí
• Zocos – laberinto de artesanos

🛡️ **Seguridad:** Muy segura en zonas turísticas. Evitar callejones solitarios de noche.

🌤️ **Mejor época:** Octubre–abril (20–25°C); evitar julio–agosto (40°C+)

🍽️ **Especialidades:** Tajín, cuscús, dulces de almendra, té de menta`;
      case 'fes':
        return `🏛️ **Fez - Capital Espiritual**

📚 **Historia:** Fundada en 789. Sede de Al‑Qarawiyyin (859), la universidad más antigua del mundo.

🎯 **Imprescindibles:**
• Medina Fes el‑Bali – mayor zona peatonal del mundo
• Universidad Al‑Qarawiyyin
• Curtidurías Chouara
• Madraza Bou Inania
• Puertas del Palacio Real

🛡️ **Seguridad:** Segura; la medina es laberíntica—usa guía.

🌤️ **Mejor época:** Mar–may, sep–nov (15–25°C)`;
      case 'chefchaouen':
        return `🏛️ **Chefchaouen - La Perla Azul**

🎯 **Imprescindibles:**
• Medina azul
• Kasbah y plaza Uta el‑Hammam
• Mezquita española (mirador)
• Cascadas de Akchour

🛡️ **Seguridad:** Muy segura; precaución en senderos de montaña.`;
      case 'casablanca':
        return `🏛️ **Casablanca - Capital Económica**

🎯 **Imprescindibles:**
• Mezquita Hassan II
• Corniche Ain Diab
• Barrio Habous
• Arquitectura Art Déco

🛡️ **Seguridad:** Segura en zonas turísticas; evitar algunos barrios periféricos de noche.`;
      case 'essaouira':
        return `🏛️ **Essaouira - Ciudad del Viento**

🎯 **Imprescindibles:**
• Medina amurallada y baluartes
• Puerto pesquero y barcas azules
• Playas del Atlántico y surf

🛡️ **Seguridad:** Muy segura; vientos fuertes—lleva chaqueta.`;
      default:
        return "Ciudad no encontrada.";
    }
  };

  const weatherEn = (city: string) => `☀️ Typical weather in ${city}

• Spring: 20–28°C, ideal for visits
• Summer: hot (Marrakech up to 35–42°C) – activities morning/evening
• Autumn: 22–30°C, great conditions
• Winter: 12–20°C, cooler in the Atlas`;

  const weatherEs = (city: string) => `☀️ Clima típico en ${city}

• Primavera: 20–28°C, ideal para visitas
• Verano: caluroso (Marrakech hasta 35–42°C) – actividades mañana/tarde
• Otoño: 22–30°C, condiciones excelentes
• Invierno: 12–20°C, más fresco en el Atlas`;

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
    },

    en: {
      responses: {
        welcome: "Hi! I'm Aicha, your AI Morocco guide 🇲🇦✨ I know everything about history, culture, excursions, safety, prices and bookings. What can I help you with?",
        bookingStart: "Great! Let's build your trip! 🎯\n\nStep 1/5: Choose city and dates. Which city do you prefer? Marrakech / Fez / Chefchaouen / Essaouira / Casablanca",
        cityInfo: (city: string) => cityInfoEn(city),
        recommendations: (interests: string[]) => moroccoKnowledge.fr.responses.recommendations(interests),
        logistics: "🚐 Transport in Morocco is reliable and safe: air‑conditioned vehicles, professional drivers, and intercity trains.",
        culture: "🎭 Moroccan culture: hospitality, crafts, Gnawa music, and delicious cuisine.",
        weather: (city: string) => weatherEn(city),
        fallback: "Ask me something specific: Marrakech info, safety, Sahara prices, book 4 days..."
      }
    },

    es: {
      responses: {
        welcome: "¡Hola! Soy Aicha, tu guía IA de Marruecos 🇲🇦✨ Conozco historia, cultura, excursiones, seguridad, precios y reservas. ¿En qué te ayudo?",
        bookingStart: "¡Perfecto! ¡Construyamos tu viaje! 🎯\n\nPaso 1/5: Elige ciudad y fechas. ¿Qué ciudad prefieres? Marrakech / Fez / Chefchaouen / Essaouira / Casablanca",
        cityInfo: (city: string) => cityInfoEs(city),
        recommendations: (interests: string[]) => moroccoKnowledge.fr.responses.recommendations(interests),
        logistics: "🚐 El transporte en Marruecos es fiable y seguro: vehículos con aire acondicionado, conductores profesionales y trenes entre ciudades.",
        culture: "🎭 Cultura marroquí: hospitalidad, artesanía, música Gnawa y gastronomía deliciosa.",
        weather: (city: string) => weatherEs(city),
        fallback: "Hazme una pregunta concreta: Info de Marrakech, seguridad, precios del Sáhara, reservar 4 días..."
      }
    }
  };

  const currentContent = moroccoKnowledge[language];

  // When opening the chat, always show a fresh welcome in the current language
  useEffect(() => {
    if (isOpen) {
      setMessages([]);
      setTimeout(() => {
        addAIMessage(currentContent.responses.welcome);
      }, 400);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    }, 2000);
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

    // Sécurité / Safety
    if (userInput.includes('sécur') || userInput.includes('danger') || userInput.includes('sûr') || userInput.includes('safety')) {
      const safetyText = language === 'fr'
        ? "🛡️ **Sécurité au Maroc - Guide Complet**\n\n✅ **Zones très sûres :** Villes touristiques principales\n⚠️ **Précautions :** Éviter ruelles isolées la nuit\n🚫 **À éviter :** Quelques quartiers périphériques\n\n**Conseils :**\n• Copies de papiers\n• Négocier avant service\n• Taxis officiels\n• Respect des codes locaux"
        : language === 'ar'
          ? "🛡️ **الأمان في المغرب - دليل مختصر**\n\n✅ **مناطق آمنة جداً:** المدن السياحية الرئيسية\n⚠️ **احتياطات:** تجنب الأزقة المعزولة ليلاً\n🚫 **تجنب:** بعض الأحياء الطرفية\n\n**نصائح:**\n• نسخ من الوثائق\n• التفاوض قبل الخدمة\n• استخدام سيارات الأجرة الرسمية\n• احترام العادات"
          : language === 'en'
            ? "🛡️ **Safety in Morocco - Quick Guide**\n\n✅ **Very safe areas:** Main tourist cities\n⚠️ **Precautions:** Avoid deserted alleys at night\n🚫 **Avoid:** Some outer districts\n\n**Tips:**\n• Carry copies of documents\n• Agree price before service\n• Use official taxis\n• Respect local codes"
            : "🛡️ **Seguridad en Marruecos - Guía Rápida**\n\n✅ **Zonas muy seguras:** Ciudades turísticas principales\n⚠️ **Precauciones:** Evitar callejones solitarios de noche\n🚫 **Evitar:** Algunos barrios periféricos\n\n**Consejos:**\n• Copias de documentos\n• Acordar precio antes del servicio\n• Taxis oficiales\n• Respetar códigos locales";
      return { text: safetyText, type: 'safety' };
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

    // Prix / Prices / Precios
    if (userInput.includes('prix') || userInput.includes('coût') || userInput.includes('budget') || userInput.includes('price') || userInput.includes('prices')) {
      const pricingText = language === 'fr'
        ? "💰 **Tarifs 2024 - Circuits Premium**\n\n🏛️ **Circuit Impérial** (7j)\n• Standard : 450€ • Luxe : 850€\n\n🏜️ **Sahara Express** (4j)\n• Standard : 280€ • Luxe : 480€\n\n🏔️ **Atlas Découverte** (5j)\n• Standard : 320€ • Luxe : 520€\n\n🌊 **Tour Côtier** (6j)\n• Standard : 380€ • Luxe : 680€\n\n*Inclus : hébergement, transport, guides, repas*"
        : language === 'ar'
          ? "💰 **الأسعار 2024 - جولات مميزة**\n\n🏛️ **الجولة الإمبراطورية** (7 أيام)\n• عادي: 450€ • فاخر: 850€\n\n🏜️ **الصحراء السريعة** (4 أيام)\n• عادي: 280€ • فاخر: 480€\n\n🏔️ **اكتشاف الأطلس** (5 أيام)\n• عادي: 320€ • فاخر: 520€\n\n🌊 **جولة الساحل** (6 أيام)\n• عادي: 380€ • فاخر: 680€\n\n*يشمل: الإقامة، النقل، المرشدون، الوجبات*"
          : language === 'en'
            ? "💰 **2024 Pricing - Premium Tours**\n\n🏛️ **Imperial Circuit** (7d)\n• Standard: 450€ • Luxury: 850€\n\n🏜️ **Sahara Express** (4d)\n• Standard: 280€ • Luxury: 480€\n\n🏔️ **Atlas Discovery** (5d)\n• Standard: 320€ • Luxury: 520€\n\n🌊 **Coastal Tour** (6d)\n• Standard: 380€ • Luxury: 680€\n\n*Includes: accommodation, transport, guides, meals*"
            : "💰 **Precios 2024 - Tours Premium**\n\n🏛️ **Circuito Imperial** (7d)\n• Estándar: 450€ • Lujo: 850€\n\n🏜️ **Sáhara Express** (4d)\n• Estándar: 280€ • Lujo: 480€\n\n🏔️ **Descubrimiento del Atlas** (5d)\n• Estándar: 320€ • Lujo: 520€\n\n🌊 **Tour Costero** (6d)\n• Estándar: 380€ • Lujo: 680€\n\n*Incluye: alojamiento, transporte, guías, comidas*";
      return { text: pricingText, type: 'pricing' };
    }

    // Réponse par défaut intelligente / Default response
    const menuText = language === 'fr'
      ? "Je suis votre experte Maroc ! Posez-moi des questions sur :\n\n🏛️ **Villes** (histoire, attractions, excursions)\n🎯 **Réservations** (circuits, hébergements)\n💰 **Prix** (budgets, comparaisons)\n🛡️ **Sécurité** (conseils, zones)\n🍽️ **Culture** (gastronomie, traditions)\n📸 **Activités** (photo, aventure, détente)\n\nQue voulez-vous découvrir ?"
      : language === 'ar'
        ? "أنا خبيرتك في المغرب! اسألني عن:\n\n🏛️ **المدن** (التاريخ، المعالم، الرحلات)\n🎯 **الحجوزات** (الجولات، الإقامة)\n💰 **الأسعار** (الميزانيات، المقارنات)\n🛡️ **الأمان** (النصائح، المناطق)\n🍽️ **الثقافة** (المطبخ، التقاليد)\n📸 **الأنشطة** (التصوير، المغامرة، الاسترخاء)\n\nماذا تريد أن تكتشف؟"
        : language === 'en'
          ? "I'm your Morocco expert! Ask me about:\n\n🏛️ **Cities** (history, attractions, excursions)\n🎯 **Bookings** (tours, accommodation)\n💰 **Prices** (budgets, comparisons)\n🛡️ **Safety** (tips, areas)\n🍽️ **Culture** (cuisine, traditions)\n📸 **Activities** (photo, adventure, relaxation)\n\nWhat would you like to discover?"
          : "¡Soy tu experta en Marruecos! Pregúntame sobre:\n\n🏛️ **Ciudades** (historia, atracciones, excursiones)\n🎯 **Reservas** (tours, alojamiento)\n💰 **Precios** (presupuestos, comparaciones)\n🛡️ **Seguridad** (consejos, zonas)\n🍽️ **Cultura** (gastronomía, tradiciones)\n📸 **Actividades** (foto, aventura, relajación)\n\n¿Qué te gustaría descubrir?";
    
    return {
      text: menuText,
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

  const quickRepliesMap = {
    fr: [
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
    ],
    ar: [
      "حجز جولة",
      "معلومات مراكش",
      "معلومات فاس",
      "معلومات شفشاون",
      "معلومات الصويرة",
      "معلومات الدار البيضاء",
      "السلامة في المغرب",
      "الأسعار والميزانيات",
      "طقس مراكش",
      "الثقافة والمطبخ",
      "توصيات مخصصة"
    ],
    en: [
      "Book a tour",
      "Marrakech info",
      "Fez info",
      "Chefchaouen info",
      "Essaouira info",
      "Casablanca info",
      "Morocco safety",
      "Prices & budgets",
      "Marrakech weather",
      "Culture & Food",
      "Personalized recommendations"
    ],
    es: [
      "Reservar un tour",
      "Info Marrakech",
      "Info Fez",
      "Info Chefchaouen",
      "Info Essaouira",
      "Info Casablanca",
      "Seguridad en Marruecos",
      "Precios y presupuestos",
      "Clima Marrakech",
      "Cultura y Gastronomía",
      "Recomendaciones personalizadas"
    ]
  } as const;

  const formatTime = (date: Date) => {
    const locale = language === 'fr' ? 'fr-FR' : language === 'ar' ? 'ar-MA' : language === 'en' ? 'en-GB' : 'es-ES';
    return date.toLocaleTimeString(locale, { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* Super AI Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 ${language === 'ar' ? 'left-4' : 'right-4'} z-40 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white p-3 sm:p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
          isOpen ? 'hidden' : 'block'
        }`}
      >
        <Bot className="h-6 w-6" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse flex items-center justify-center">
          <Sparkles className="h-2 w-2 text-white" />
        </div>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {language === 'fr' ? 'Guide IA Expert' : language === 'ar' ? 'مرشد ذكاء اصطناعي خبير' : language === 'en' ? 'Expert AI Guide' : 'Guía IA Experta'}
        </div>
      </button>

      {/* Super AI Chat Window */}
      {isOpen && (
        <div className={`ai-chat fixed bottom-4 ${language === 'ar' ? 'left-4' : 'right-4'} z-50 w-80 sm:w-96 h-[500px] sm:h-[650px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3 backdrop-blur-sm">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">
                  {language === 'fr' ? 'Aicha - Guide IA Expert' : language === 'ar' ? 'عائشة - المرشد الذكي' : language === 'en' ? 'Aicha - Expert AI Guide' : 'Aicha - Guía IA Experta'}
                </h3>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <Sparkles className="h-3 w-3" />
                  <span>{language === 'fr' ? 'Expert Maroc 24/7' : language === 'ar' ? 'خبير المغرب 24/7' : language === 'en' ? 'Morocco expert 24/7' : 'Experta de Marruecos 24/7'}</span>
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
                      <span className="text-xs font-medium text-purple-600">
                        {language === 'fr' ? 'Aicha IA Expert' : language === 'ar' ? 'عائشة الذكاء الاصطناعي' : language === 'en' ? 'Aicha AI Expert' : 'Aicha IA Experta'}
                      </span>
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
                    <span className="text-xs font-medium text-purple-600">
                      {language === 'fr' ? 'Aicha analyse...' : language === 'ar' ? 'عائشة تحلل...' : language === 'en' ? 'Aicha is analyzing...' : 'Aicha está analizando...'}
                    </span>
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
                {quickRepliesMap[language].slice(0, 3).map((reply: string, index: number) => (
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
                placeholder={language === 'fr' ? 'Posez votre question d\'expert...' : language === 'ar' ? 'اطرح سؤالك...' : language === 'en' ? 'Ask your expert question...' : 'Haz tu pregunta al experto...'}
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
                onClick={() => handleQuickReply(
                  language === 'fr' ? 'Réserver maintenant' : language === 'ar' ? 'احجز الآن' : language === 'en' ? 'Book now' : 'Reservar ahora'
                )}
                className="flex items-center text-xs text-purple-600 hover:text-purple-800 transition-colors font-medium"
              >
                <Calendar className="h-3 w-3 mr-1" />
                {language === 'fr' ? 'Réserver' : language === 'ar' ? 'احجز' : language === 'en' ? 'Book' : 'Reservar'}
              </button>
              <button 
                onClick={() => handleQuickReply(
                  language === 'fr' ? 'Conseils sécurité' : language === 'ar' ? 'نصائح الأمان' : language === 'en' ? 'Safety tips' : 'Consejos de seguridad'
                )}
                className="flex items-center text-xs text-purple-600 hover:text-purple-800 transition-colors font-medium"
              >
                <Shield className="h-3 w-3 mr-1" />
                {language === 'fr' ? 'Sécurité' : language === 'ar' ? 'الأمان' : language === 'en' ? 'Safety' : 'Seguridad'}
              </button>
              <button 
                onClick={() => handleQuickReply(
                  language === 'fr' ? 'Prix détaillés' : language === 'ar' ? 'الأسعار بالتفصيل' : language === 'en' ? 'Detailed prices' : 'Precios detallados'
                )}
                className="flex items-center text-xs text-purple-600 hover:text-purple-800 transition-colors font-medium"
              >
                <CreditCard className="h-3 w-3 mr-1" />
                {language === 'fr' ? 'Prix' : language === 'ar' ? 'الأسعار' : language === 'en' ? 'Prices' : 'Precios'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
