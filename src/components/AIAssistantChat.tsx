'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles, Clock, Phone, Mail, MapPin } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  typing?: boolean;
}

interface AIAssistantChatProps {
  language: 'fr' | 'ar' | 'en' | 'es';
}

export default function AIAssistantChat({ language }: AIAssistantChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStep, setConversationStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const aiResponses = {
    fr: {
      welcome: "Bonjour ! Je suis Aicha, votre assistante IA spécialisée dans les voyages au Maroc. Comment puis-je vous aider aujourd'hui ? 🌟",
      responses: [
        {
          keywords: ['circuit', 'tour', 'voyage', 'visite'],
          reply: "Excellent ! Nous proposons plusieurs circuits authentiques :\n\n🏛️ **Circuit Impérial** (7 jours) - Marrakech, Fès, Meknès, Rabat\n🏜️ **Aventure Sahara** (4 jours) - Merzouga, nuit sous les étoiles\n🏔️ **Atlas & Vallées** (5 jours) - Montagnes et villages berbères\n\nQuel type d'expérience vous intéresse le plus ?"
        },
        {
          keywords: ['prix', 'tarif', 'coût', 'budget'],
          reply: "Nos tarifs varient selon la saison et le groupe :\n\n💰 **Circuit Impérial** : 450-650€/personne\n💰 **Sahara Express** : 280-380€/personne\n💰 **Atlas Découverte** : 320-450€/personne\n\n*Inclus : transport, hébergement, guides, repas*\n\nCombien de personnes voyagent avec vous ?"
        },
        {
          keywords: ['disponibilité', 'date', 'réservation', 'libre'],
          reply: "Je vérifie nos disponibilités en temps réel ! 📅\n\n✅ **Prochaines dates disponibles :**\n• 15-22 Mars 2024\n• 5-12 Avril 2024\n• 20-27 Mai 2024\n\nQuelle période vous convient le mieux ? Je peux vous proposer des créneaux personnalisés."
        },
        {
          keywords: ['sahara', 'désert', 'dune', 'chameau'],
          reply: "Le Sahara vous appelle ! 🐪✨\n\n🌟 **Notre expérience Sahara inclut :**\n• Balade à dos de chameau au coucher du soleil\n• Nuit en camp berbère traditionnel\n• Observation des étoiles avec guide astronome\n• Petit-déjeuner face aux dunes de l'Erg Chebbi\n\nC'est magique ! Voulez-vous que je vous prépare un devis personnalisé ?"
        },
        {
          keywords: ['marrakech', 'fès', 'casablanca', 'rabat'],
          reply: "Parfait choix ! Nos villes impériales regorgent de trésors :\n\n🕌 **Marrakech** : Médina, Koutoubia, Jardins Majorelle\n🎨 **Fès** : Plus ancienne médina du monde, artisanat\n🏛️ **Rabat** : Capitale moderne, Tour Hassan\n🌊 **Casablanca** : Mosquée Hassan II, corniche\n\nQuelle ville vous fascine le plus ?"
        },
        {
          keywords: ['guide', 'accompagnateur', 'local'],
          reply: "Nos guides sont notre fierté ! 👨‍🏫✨\n\n🌟 **Tous nos guides sont :**\n• Natifs du Maroc, parlant français/anglais/arabe\n• Certifiés par l'Office National du Tourisme\n• Passionnés d'histoire et de culture\n• Formés aux premiers secours\n\nIls transforment chaque visite en aventure inoubliable !"
        },
        {
          keywords: ['hébergement', 'hôtel', 'riad', 'logement'],
          reply: "Nous sélectionnons les meilleurs hébergements ! 🏨\n\n🏛️ **Riads authentiques** dans les médinas\n🌟 **Hôtels 4-5 étoiles** en ville nouvelle\n🏕️ **Camps berbères** dans le Sahara\n🏔️ **Auberges de montagne** dans l'Atlas\n\nTous avec petit-déjeuner inclus et wifi gratuit !"
        },
        {
          keywords: ['transport', 'véhicule', 'bus', 'voiture'],
          reply: "Transport confortable garanti ! 🚐\n\n✅ **Véhicules climatisés récents**\n✅ **Chauffeurs expérimentés et prudents**\n✅ **Assurance tous risques incluse**\n✅ **Eau fraîche à bord**\n\nMinibus 8-17 places ou 4x4 selon l'itinéraire."
        }
      ],
      fallback: "C'est une excellente question ! Pour vous donner la réponse la plus précise, puis-je vous mettre en contact avec notre équipe spécialisée ? Ils pourront vous conseiller personnellement. 📞",
      quickReplies: [
        "Voir les circuits populaires",
        "Demander un devis",
        "Vérifier les disponibilités",
        "Parler à un conseiller"
      ]
    },
    ar: {
      welcome: "مرحباً! أنا عائشة، مساعدتك الذكية المتخصصة في السفر إلى المغرب. كيف يمكنني مساعدتك اليوم؟ 🌟",
      responses: [
        {
          keywords: ['رحلة', 'جولة', 'سفر', 'زيارة'],
          reply: "ممتاز! نقدم عدة رحلات أصيلة:\n\n🏛️ **الجولة الإمبراطورية** (7 أيام) - مراكش، فاس، مكناس، الرباط\n🏜️ **مغامرة الصحراء** (4 أيام) - مرزوقة، ليلة تحت النجوم\n🏔️ **الأطلس والوديان** (5 أيام) - الجبال والقرى الأمازيغية\n\nأي نوع من التجارب يهمك أكثر؟"
        },
        {
          keywords: ['سعر', 'تكلفة', 'ميزانية'],
          reply: "أسعارنا تختلف حسب الموسم والمجموعة:\n\n💰 **الجولة الإمبراطورية**: 450-650€/شخص\n💰 **الصحراء السريعة**: 280-380€/شخص\n💰 **اكتشاف الأطلس**: 320-450€/شخص\n\n*يشمل: النقل، الإقامة، المرشدين، الوجبات*\n\nكم شخص يسافر معك؟"
        }
      ],
      fallback: "سؤال ممتاز! لأعطيك الإجابة الأكثر دقة، هل يمكنني وضعك على اتصال مع فريقنا المتخصص؟ 📞",
      quickReplies: [
        "عرض الرحلات الشائعة",
        "طلب عرض أسعار",
        "التحقق من التوفر",
        "التحدث مع مستشار"
      ]
    }
    ,
    en: {
      welcome: "Hello! I'm Aicha, your AI assistant specialized in trips to Morocco. How can I help you today? 🌟",
      responses: [
        {
          keywords: ['circuit', 'tour', 'trip', 'visit'],
          reply: "Great! We offer several authentic tours:\n\n🏛️ **Imperial Circuit** (7 days) - Marrakech, Fez, Meknes, Rabat\n🏜️ **Sahara Adventure** (4 days) - Merzouga, night under the stars\n🏔️ **Atlas & Valleys** (5 days) - Mountains and Berber villages\n\nWhich experience interests you most?"
        },
        {
          keywords: ['price', 'cost', 'budget', 'tariff'],
          reply: "Our prices vary by season and group size:\n\n💰 **Imperial Circuit**: 450-650€/person\n💰 **Sahara Express**: 280-380€/person\n💰 **Atlas Discovery**: 320-450€/person\n\n*Includes: transport, accommodation, guides, meals*\n\nHow many people are traveling with you?"
        },
        {
          keywords: ['availability', 'date', 'booking', 'free'],
          reply: "I can check availability in real time! 📅\n\n✅ **Upcoming available dates:**\n• 15-22 March 2024\n• 5-12 April 2024\n• 20-27 May 2024\n\nWhat period suits you best? I can propose tailored slots."
        },
        {
          keywords: ['sahara', 'desert', 'dune', 'camel'],
          reply: "The Sahara is calling! 🐪✨\n\n🌟 **Our Sahara experience includes:**\n• Sunset camel ride\n• Night in a traditional Berber camp\n• Stargazing with an astronomy guide\n• Breakfast facing the Erg Chebbi dunes\n\nShall I prepare a tailored quote for you?"
        },
        {
          keywords: ['marrakech', 'fez', 'casablanca', 'rabat'],
          reply: "Excellent choice! Imperial cities are full of treasures:\n\n🕌 **Marrakech**: Medina, Koutoubia, Majorelle Gardens\n🎨 **Fez**: Oldest medina in the world, crafts\n🏛️ **Rabat**: Modern capital, Hassan Tower\n🌊 **Casablanca**: Hassan II Mosque, corniche\n\nWhich city fascinates you most?"
        }
      ],
      fallback: "Great question! To give you the most accurate answer, may I connect you with our specialized team? They can advise you personally. 📞",
      quickReplies: [
        'See popular tours',
        'Request a quote',
        'Check availability',
        'Talk to an advisor'
      ]
    },
    es: {
      welcome: "¡Hola! Soy Aicha, tu asistente IA especializada en viajes a Marruecos. ¿Cómo puedo ayudarte hoy? 🌟",
      responses: [
        {
          keywords: ['circuito', 'tour', 'viaje', 'visita'],
          reply: "¡Excelente! Ofrecemos varios tours auténticos:\n\n🏛️ **Circuito Imperial** (7 días) - Marrakech, Fez, Meknes, Rabat\n🏜️ **Aventura en el Sáhara** (4 días) - Merzouga, noche bajo las estrellas\n🏔️ **Atlas y Valles** (5 días) - Montañas y pueblos bereberes\n\n¿Qué experiencia te interesa más?"
        },
        {
          keywords: ['precio', 'costo', 'presupuesto', 'tarifa'],
          reply: "Nuestros precios varían según la temporada y el tamaño del grupo:\n\n💰 **Circuito Imperial**: 450-650€/persona\n💰 **Sáhara Express**: 280-380€/persona\n💰 **Descubrimiento del Atlas**: 320-450€/persona\n\n*Incluye: transporte, alojamiento, guías, comidas*\n\n¿Cuántas personas viajan contigo?"
        },
        {
          keywords: ['disponibilidad', 'fecha', 'reserva', 'libre'],
          reply: "¡Puedo comprobar la disponibilidad en tiempo real! 📅\n\n✅ **Próximas fechas disponibles:**\n• 15-22 marzo 2024\n• 5-12 abril 2024\n• 20-27 mayo 2024\n\n¿Qué período te conviene más? Puedo proponerte horarios a medida."
        },
        {
          keywords: ['sahara', 'desierto', 'duna', 'camello'],
          reply: "¡El Sáhara te llama! 🐪✨\n\n🌟 **Nuestra experiencia en el Sáhara incluye:**\n• Paseo en camello al atardecer\n• Noche en campamento bereber tradicional\n• Observación de estrellas con guía de astronomía\n• Desayuno frente a las dunas de Erg Chebbi\n\n¿Quieres que te prepare un presupuesto personalizado?"
        }
      ],
      fallback: "¡Excelente pregunta! Para darte la respuesta más precisa, ¿puedo ponerte en contacto con nuestro equipo especializado? 📞",
      quickReplies: [
        'Ver tours populares',
        'Solicitar presupuesto',
        'Comprobar disponibilidad',
        'Hablar con un asesor'
      ]
    }
  };

  const currentContent = aiResponses[language];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addAIMessage(currentContent.welcome);
      }, 1000);
    }
  }, [isOpen, language]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addAIMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text,
        sender: 'ai',
        timestamp: new Date()
      }]);
      setIsTyping(false);
      setConversationStep(prev => prev + 1);
    }, 1500 + Math.random() * 1000); // Délai réaliste
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date()
    }]);

    // Analyse intelligente du message
    setTimeout(() => {
      const response = generateAIResponse(text.toLowerCase());
      addAIMessage(response);
    }, 800);
  };

  const generateAIResponse = (userInput: string): string => {
    // Recherche de mots-clés dans les réponses prédéfinies
    for (const responseObj of currentContent.responses) {
      if (responseObj.keywords.some(keyword => userInput.includes(keyword))) {
        return responseObj.reply;
      }
    }

    // Réponses contextuelles selon l'étape de conversation
    if (conversationStep === 1) {
      return language === 'fr' 
        ? "Je vois que vous vous renseignez sur nos services ! Êtes-vous plutôt intéressé par les circuits culturels, l'aventure dans le Sahara, ou la découverte des villes impériales ? 🤔"
        : language === 'ar'
          ? "أرى أنك تستفسر عن خدماتنا! هل تهتم أكثر بالجولات الثقافية أم مغامرة الصحراء أم اكتشاف المدن الإمبراطورية؟ 🤔"
          : language === 'en'
            ? "I see you're exploring our services! Are you more interested in cultural tours, Sahara adventure, or discovering the imperial cities? 🤔"
            : "Veo que estás explorando nuestros servicios. ¿Te interesan más los tours culturales, la aventura en el Sáhara o descubrir las ciudades imperiales? 🤔";
    }

    if (conversationStep >= 3) {
      return language === 'fr'
        ? "Parfait ! Basé sur notre conversation, je pense que vous apprécierez nos circuits personnalisés. Voulez-vous que je vous mette en contact avec notre équipe pour finaliser les détails ? 📞✨"
        : language === 'ar'
          ? "ممتاز! بناءً على محادثتنا، أعتقد أنك ستقدر رحلاتنا المخصصة. هل تريد أن أضعك على اتصال مع فريقنا لإنهاء التفاصيل؟ 📞✨"
          : language === 'en'
            ? "Perfect! Based on our chat, I think you'll love our personalized tours. Shall I connect you with our team to finalize details? 📞✨"
            : "¡Perfecto! Según nuestra conversación, te encantarán nuestros tours personalizados. ¿Te conecto con nuestro equipo para finalizar detalles? 📞✨";
    }

    return currentContent.fallback;
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

  const formatTime = (date: Date) => {
    const locale = language === 'fr' ? 'fr-FR' : language === 'ar' ? 'ar-MA' : language === 'en' ? 'en-GB' : 'es-ES';
    return date.toLocaleTimeString(locale, { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* AI Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 ${language === 'ar' ? 'left-6' : 'right-6'} z-40 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
          isOpen ? 'hidden' : 'block'
        }`}
      >
        <Bot className="h-6 w-6" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse flex items-center justify-center">
          <Sparkles className="h-2 w-2 text-white" />
        </div>
      </button>

      {/* AI Chat Window */}
      {isOpen && (
        <div className={`ai-chat fixed bottom-6 ${language === 'ar' ? 'left-6' : 'right-6'} z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3 backdrop-blur-sm">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">
                  {language === 'fr' ? 'Aicha - Assistante IA' : language === 'ar' ? 'عائشة - المساعد الذكي' : language === 'en' ? 'Aicha - AI Assistant' : 'Aicha - Asistente IA'}
                </h3>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <Sparkles className="h-3 w-3" />
                  <span>{language === 'fr' ? 'IA en ligne' : language === 'ar' ? 'الذكاء الاصطناعي متصل' : language === 'en' ? 'AI online' : 'IA en línea'}</span>
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
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'bg-white text-gray-800 shadow-md border border-gray-100'
                }`}>
                  {message.sender === 'ai' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="h-4 w-4 text-purple-600" />
                      <span className="text-xs font-medium text-purple-600">{language === 'fr' ? 'Aicha IA' : language === 'ar' ? 'عائشة' : language === 'en' ? 'Aicha AI' : 'Aicha IA'}</span>
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
                    <span className="text-xs font-medium text-purple-600">Aicha IA</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-600">
                      {language === 'fr' ? 'Aicha réfléchit' : language === 'ar' ? 'عائشة تفكر' : language === 'en' ? 'Aicha is typing' : 'Aicha está escribiendo'}
                    </span>
                    <div className="flex space-x-1 ml-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s', color: 'black !important' }} />
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
                {currentContent.quickReplies.map((reply, index) => (
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
                placeholder={language === 'fr' ? 'Posez votre question...' : language === 'ar' ? 'اطرح سؤالك...' : language === 'en' ? 'Ask your question...' : 'Haz tu pregunta...'}
                style={{ backgroundColor: 'white', color: 'black', WebkitTextFillColor: 'black', caretColor: 'black', fontSize: '18px', fontWeight: 'bold' }}
                className="flex-1 px-4 py-3 border-4 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-black"
              />
              <button
                onClick={handleSend}
                disabled={!inputText.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            
            {/* Contact Options */}
            <div className="flex justify-center space-x-6 mt-4 pt-3 border-t border-gray-100">
              <button className="flex items-center text-xs text-gray-600 hover:text-purple-600 transition-colors">
                <Phone className="h-3 w-3 mr-1" />
                {language === 'fr' ? 'Appeler' : language === 'ar' ? 'اتصل' : language === 'en' ? 'Call' : 'Llamar'}
              </button>
              <button className="flex items-center text-xs text-gray-600 hover:text-purple-600 transition-colors">
                <Mail className="h-3 w-3 mr-1" />
                {language === 'fr' ? 'Email' : language === 'ar' ? 'إيميل' : language === 'en' ? 'Email' : 'Email'}
              </button>
              <button className="flex items-center text-xs text-gray-600 hover:text-purple-600 transition-colors">
                <MapPin className="h-3 w-3 mr-1" />
                {language === 'fr' ? 'Localisation' : language === 'ar' ? 'الموقع' : language === 'en' ? 'Location' : 'Ubicación'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
