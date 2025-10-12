'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  User, 
  Bot, 
  Phone, 
  Mail, 
  Clock,
  Star,
  CheckCircle,
  Headphones
} from 'lucide-react';

interface LiveChatSupportProps {
  language: 'fr' | 'ar';
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'quick-reply' | 'contact';
}

export default function LiveChatSupport({ language }: LiveChatSupportProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const content = {
    fr: {
      title: 'Support Client 24/7',
      subtitle: 'Nous sommes là pour vous aider',
      placeholder: 'Tapez votre message...',
      send: 'Envoyer',
      online: 'En ligne',
      offline: 'Hors ligne',
      typing: 'En train d\'écrire...',
      quickReplies: [
        'Demander un devis',
        'Vérifier disponibilités',
        'Modifier une réservation',
        'Informations sur les prix',
        'Conseils destinations'
      ],
      welcomeMessage: 'Bonjour ! 👋 Je suis votre assistant virtuel. Comment puis-je vous aider aujourd\'hui ?',
      responses: {
        greeting: 'Bonjour ! Comment puis-je vous aider avec votre voyage au Maroc ?',
        quote: 'Je serais ravi de vous préparer un devis personnalisé ! Pouvez-vous me dire quelles destinations vous intéressent ?',
        availability: 'Parfait ! Pour vérifier les disponibilités, j\'ai besoin de connaître vos dates de voyage préférées.',
        modification: 'Je peux vous aider avec votre réservation. Avez-vous votre numéro de confirmation ?',
        pricing: 'Nos tarifs varient selon la saison et le type d\'excursion. Que souhaitez-vous visiter ?',
        destinations: 'Le Maroc regorge de merveilles ! Êtes-vous plutôt intéressé par le désert, les villes impériales, ou la côte ?'
      }
    },
    ar: {
      title: 'دعم العملاء 24/7',
      subtitle: 'نحن هنا لمساعدتك',
      placeholder: 'اكتب رسالتك...',
      send: 'إرسال',
      online: 'متصل',
      offline: 'غير متصل',
      typing: 'يكتب...',
      quickReplies: [
        'طلب عرض سعر',
        'التحقق من التوفر',
        'تعديل الحجز',
        'معلومات الأسعار',
        'نصائح الوجهات'
      ],
      welcomeMessage: 'مرحباً! 👋 أنا مساعدك الافتراضي. كيف يمكنني مساعدتك اليوم؟',
      responses: {
        greeting: 'مرحباً! كيف يمكنني مساعدتك في رحلتك إلى المغرب؟',
        quote: 'سأكون سعيداً لإعداد عرض سعر مخصص لك! هل يمكنك إخباري بالوجهات التي تهمك؟',
        availability: 'ممتاز! للتحقق من التوفر، أحتاج لمعرفة تواريخ سفرك المفضلة.',
        modification: 'يمكنني مساعدتك في حجزك. هل لديك رقم التأكيد؟',
        pricing: 'أسعارنا تختلف حسب الموسم ونوع الرحلة. ماذا تريد زيارته؟',
        destinations: 'المغرب مليء بالعجائب! هل أنت مهتم أكثر بالصحراء أم المدن الإمبراطورية أم الساحل؟'
      }
    }
  };

  const currentContent = content[language];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message
      const welcomeMessage: Message = {
        id: '1',
        text: currentContent.welcomeMessage,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, currentContent.welcomeMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (text: string = inputText) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(text.trim());
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userText: string): string => {
    const text = userText.toLowerCase();
    
    if (text.includes('bonjour') || text.includes('salut') || text.includes('مرحبا') || text.includes('السلام')) {
      return currentContent.responses.greeting;
    }
    if (text.includes('devis') || text.includes('prix') || text.includes('tarif') || text.includes('سعر') || text.includes('عرض')) {
      return currentContent.responses.quote;
    }
    if (text.includes('disponib') || text.includes('réserv') || text.includes('حجز') || text.includes('متاح')) {
      return currentContent.responses.availability;
    }
    if (text.includes('modif') || text.includes('chang') || text.includes('تعديل') || text.includes('تغيير')) {
      return currentContent.responses.modification;
    }
    if (text.includes('destination') || text.includes('conseil') || text.includes('وجهة') || text.includes('نصيحة')) {
      return currentContent.responses.destinations;
    }
    
    return currentContent.responses.greeting;
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-morocco-red to-morocco-gold text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 animate-pulse"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
        
        {/* Notification badge */}
        <div className="absolute -top-2 -left-2 bg-green-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
          1
        </div>
      </div>
    );
  }

  return (
    <div className={`ai-chat fixed bottom-6 right-6 z-50 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="bg-white rounded-2xl shadow-2xl w-96 h-[600px] flex flex-col overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-morocco-red to-morocco-gold text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Headphones className="h-5 w-5" />
              </div>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                isOnline ? 'bg-green-500' : 'bg-gray-500'
              }`} />
            </div>
            <div>
              <h3 className="font-bold text-lg">{currentContent.title}</h3>
              <p className="text-sm opacity-90">
                {isOnline ? currentContent.online : currentContent.offline}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                <div
                  className={`p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-morocco-gold text-black ml-2'
                      : 'bg-white text-gray-800 mr-2 shadow-sm'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                <div className={`text-xs text-gray-500 mt-1 ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.sender === 'user' 
                  ? 'bg-morocco-gold text-black order-1' 
                  : 'bg-morocco-red text-white order-2'
              }`}>
                {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-morocco-red text-white rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-white p-3 rounded-2xl shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-200" />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {messages.length === 1 && (
          <div className="p-4 bg-white border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3">
              {language === 'fr' ? 'Réponses rapides :' : 'إجابات سريعة:'}
            </p>
            <div className="flex flex-wrap gap-2">
              {currentContent.quickReplies.slice(0, 3).map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="px-3 py-2 bg-gray-100 hover:bg-morocco-gold hover:text-black text-sm rounded-full transition-colors text-gray-700"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={currentContent.placeholder}
              className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-morocco-red focus:border-transparent text-base bg-white text-black placeholder-gray-700 caret-black"
              style={{ WebkitTextFillColor: '#000', color: '#000' }}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className="bg-morocco-red hover:bg-red-700 disabled:bg-gray-300 text-white p-3 rounded-xl transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          
          {/* Contact Options */}
          <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-gray-100">
            <a
              href="tel:+212772321613"
              className="flex items-center gap-2 text-xs text-gray-600 hover:text-morocco-red transition-colors"
            >
              <Phone className="h-3 w-3" />
              <span>+212 772321613</span>
            </a>
            <a
              href="mailto:contact@moroccotours.com"
              className="flex items-center gap-2 text-xs text-gray-600 hover:text-morocco-red transition-colors"
            >
              <Mail className="h-3 w-3" />
              <span>{language === 'fr' ? 'Email' : 'بريد'}</span>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
      `}</style>
    </div>
  );
}
