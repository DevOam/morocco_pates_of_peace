'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, Phone, Mail } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface LiveChatProps {
  language: 'fr' | 'ar';
}

export default function LiveChat({ language }: LiveChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const botResponses = {
    fr: [
      "Bonjour ! Je suis Aicha, votre assistante virtuelle. Comment puis-je vous aider aujourd'hui ?",
      "Nos circuits les plus populaires sont le Circuit Impérial (7 jours) et l'Aventure Sahara (4 jours). Lequel vous intéresse ?",
      "Parfait ! Je peux vous aider à personnaliser votre circuit. Combien de personnes voyagent avec vous ?",
      "Excellent choix ! Nos guides locaux vous feront découvrir des endroits authentiques. Souhaitez-vous réserver maintenant ?",
      "Je vous mets en contact avec notre équipe pour finaliser votre réservation. Un expert vous contactera dans les 30 minutes !",
      "Avez-vous des questions sur l'hébergement, le transport ou les activités incluses ?"
    ],
    ar: [
      "مرحباً! أنا عائشة، مساعدتك الافتراضية. كيف يمكنني مساعدتك اليوم؟",
      "أشهر رحلاتنا هي الجولة الإمبراطورية (7 أيام) ومغامرة الصحراء (4 أيام). أيهما يهمك؟",
      "ممتاز! يمكنني مساعدتك في تخصيص رحلتك. كم شخص يسافر معك؟",
      "اختيار رائع! مرشدونا المحليون سيعرفونك على أماكن أصيلة. هل تريد الحجز الآن؟",
      "سأضعك على اتصال مع فريقنا لإنهاء حجزك. خبير سيتصل بك خلال 30 دقيقة!",
      "هل لديك أسئلة حول الإقامة أو النقل أو الأنشطة المتضمنة؟"
    ]
  };

  const quickReplies = {
    fr: [
      "Voir les circuits",
      "Prix et tarifs", 
      "Réserver maintenant",
      "Parler à un agent"
    ],
    ar: [
      "عرض الرحلات",
      "الأسعار والتعرفة",
      "احجز الآن", 
      "تحدث مع وكيل"
    ]
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      setTimeout(() => {
        addBotMessage(botResponses[language][0]);
      }, 1000);
    }
  }, [isOpen, language]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addBotMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text,
        sender: 'bot',
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date()
    }]);

    // Simulate bot response
    const responses = botResponses[language];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    setTimeout(() => addBotMessage(randomResponse), 2000);
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
    return date.toLocaleTimeString(language === 'fr' ? 'fr-FR' : 'ar-MA', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 ${language === 'ar' ? 'left-6' : 'right-6'} z-40 bg-morocco-red hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
          isOpen ? 'hidden' : 'block'
        }`}
      >
        <MessageCircle className="h-6 w-6" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-morocco-gold rounded-full animate-pulse" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`ai-chat fixed bottom-6 ${language === 'ar' ? 'left-6' : 'right-6'} z-50 w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden text-gray-900`}>
          {/* Header */}
          <div className="bg-morocco-red text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-morocco-gold rounded-full flex items-center justify-center mr-3">
                <Bot className="h-5 w-5 text-black" />
              </div>
              <div>
                <h3 className="font-semibold">
                  {language === 'fr' ? 'Aicha - Assistante' : 'عائشة - المساعدة'}
                </h3>
                <p className="text-sm opacity-90">
                  {language === 'fr' ? 'En ligne maintenant' : 'متصلة الآن'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-red-700 p-1 rounded"
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
                <div className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-morocco-red text-white'
                    : 'bg-white text-gray-800 shadow-md'
                }`}>
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-red-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 shadow-md px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length > 0 && messages.length < 3 && (
            <div className="p-3 bg-white border-t">
              <div className="flex flex-wrap gap-2">
                {quickReplies[language].map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs bg-white border border-gray-300 text-black hover:bg-gray-100 hover:border-gray-400 px-3 py-1 rounded-full transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={language === 'fr' ? 'Tapez votre message...' : 'اكتب رسالتك...'}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-morocco-red text-base bg-white text-black placeholder-gray-700 caret-black"
              />
              <button
                onClick={handleSend}
                disabled={!inputText.trim()}
                className="bg-morocco-red hover:bg-red-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            
            {/* Contact Options */}
            <div className="flex justify-center space-x-4 mt-3 pt-3 border-t">
              <button className="flex items-center text-xs text-gray-600 hover:text-morocco-red">
                <Phone className="h-3 w-3 mr-1" />
                {language === 'fr' ? 'Appeler' : 'اتصل'}
              </button>
              <button className="flex items-center text-xs text-gray-600 hover:text-morocco-red">
                <Mail className="h-3 w-3 mr-1" />
                {language === 'fr' ? 'Email' : 'إيميل'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
