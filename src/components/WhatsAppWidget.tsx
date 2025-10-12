'use client';

import { useState } from 'react';
import { MessageCircle, X, Phone } from 'lucide-react';

interface WhatsAppWidgetProps {
  language: 'fr' | 'ar';
}

export default function WhatsAppWidget({ language }: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "+212772321613"; // Morocco WhatsApp number
  
  const messages = {
    fr: {
      greeting: "Salut! 👋",
      subtitle: "Comment pouvons-nous vous aider?",
      options: [
        "💬 Demander un devis personnalisé",
        "📅 Vérifier les disponibilités",
        "🗺️ Conseils sur les destinations",
        "💰 Informations sur les prix",
        "🚐 Transport et logistique"
      ],
      placeholder: "Tapez votre message...",
      send: "Envoyer",
      online: "En ligne maintenant"
    },
    ar: {
      greeting: "مرحبا! 👋",
      subtitle: "كيف يمكننا مساعدتك؟",
      options: [
        "💬 طلب عرض أسعار مخصص",
        "📅 التحقق من التوفر",
        "🗺️ نصائح حول الوجهات",
        "💰 معلومات الأسعار",
        "🚐 النقل واللوجستيات"
      ],
      placeholder: "اكتب رسالتك...",
      send: "إرسال",
      online: "متصل الآن"
    }
  };

  const handleOptionClick = (option: string) => {
    const message = encodeURIComponent(option);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleCustomMessage = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <>
      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 animate-pulse"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </button>
      </div>

      {/* WhatsApp Chat Widget */}
      {isOpen && (
        <div className={`fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden ${language === 'ar' ? 'rtl' : 'ltr'} text-gray-900`}>
          {/* Header */}
          <div className="bg-green-500 text-white p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Morocco Desert Tours</h3>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                  <span>{messages[language].online}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Content */}
          <div className="p-4 max-h-96 overflow-y-auto bg-gray-50">
            {/* Greeting Message */}
            <div className="mb-4">
              <div className="bg-white border-2 border-gray-400 rounded-2xl p-4 max-w-xs shadow-md">
                <p className="font-bold text-black text-base">{messages[language].greeting}</p>
                <p className="text-sm text-gray-800 mt-2 font-medium">{messages[language].subtitle}</p>
              </div>
            </div>

            {/* Quick Options */}
            <div className="space-y-2">
              {messages[language].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="w-full text-left p-3 rounded-xl bg-gray-100 border-2 border-gray-400 text-black font-bold hover:bg-green-100 hover:border-green-400 hover:text-green-800 transition-colors duration-200 text-base"
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Custom Message Input */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={messages[language].placeholder}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white text-gray-900 placeholder-gray-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleCustomMessage((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                    handleCustomMessage(input.value);
                    input.value = '';
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  {messages[language].send}
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 py-2 text-center">
            <p className="text-xs text-gray-500">
              {language === 'fr' ? 'Réponse généralement en moins de 5 minutes' : 'الرد عادة في أقل من 5 دقائق'}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
