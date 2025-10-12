'use client';

import { useState } from 'react';
import { Send, User, Mail, Phone, MessageSquare, MapPin, Calendar, Users, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactFormProps {
  language: 'fr' | 'ar';
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  travelDate: string;
  travelers: string;
  destination: string;
}

export default function ContactForm({ language }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    travelDate: '',
    travelers: '2',
    destination: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const content = {
    fr: {
      title: 'Contactez-nous',
      subtitle: 'Prêt à vivre une aventure inoubliable ?',
      description: 'Partagez-nous vos rêves de voyage et nous créerons l\'expérience parfaite pour vous.',
      form: {
        name: 'Nom complet *',
        email: 'Email *',
        phone: 'Téléphone',
        subject: 'Sujet *',
        message: 'Votre message *',
        travelDate: 'Date de voyage souhaitée',
        travelers: 'Nombre de voyageurs',
        destination: 'Destination préférée',
        submit: 'Envoyer le message',
        submitting: 'Envoi en cours...'
      },
      subjects: [
        'Demande de devis',
        'Réservation circuit',
        'Information générale',
        'Service client',
        'Partenariat'
      ],
      destinations: [
        'Marrakech',
        'Fès',
        'Sahara/Merzouga',
        'Chefchaouen',
        'Essaouira',
        'Casablanca',
        'Circuit complet'
      ],
      success: {
        title: 'Message envoyé !',
        message: 'Merci pour votre message. Notre équipe vous répondra dans les 2 heures.',
        cta: 'Nouveau message'
      },
      validation: {
        nameRequired: 'Le nom est requis',
        emailRequired: 'L\'email est requis',
        emailInvalid: 'Email invalide',
        subjectRequired: 'Le sujet est requis',
        messageRequired: 'Le message est requis',
        messageMinLength: 'Le message doit contenir au moins 10 caractères'
      }
    },
    ar: {
      title: 'اتصل بنا',
      subtitle: 'مستعد لخوض مغامرة لا تُنسى؟',
      description: 'شاركنا أحلام سفرك وسنخلق التجربة المثالية لك.',
      form: {
        name: 'الاسم الكامل *',
        email: 'البريد الإلكتروني *',
        phone: 'الهاتف',
        subject: 'الموضوع *',
        message: 'رسالتك *',
        travelDate: 'تاريخ السفر المرغوب',
        travelers: 'عدد المسافرين',
        destination: 'الوجهة المفضلة',
        submit: 'إرسال الرسالة',
        submitting: 'جاري الإرسال...'
      },
      subjects: [
        'طلب عرض سعر',
        'حجز رحلة',
        'معلومات عامة',
        'خدمة العملاء',
        'شراكة'
      ],
      destinations: [
        'مراكش',
        'فاس',
        'الصحراء/مرزوقة',
        'شفشاون',
        'الصويرة',
        'الدار البيضاء',
        'جولة شاملة'
      ],
      success: {
        title: 'تم إرسال الرسالة!',
        message: 'شكراً لرسالتك. سيرد عليك فريقنا خلال ساعتين.',
        cta: 'رسالة جديدة'
      },
      validation: {
        nameRequired: 'الاسم مطلوب',
        emailRequired: 'البريد الإلكتروني مطلوب',
        emailInvalid: 'بريد إلكتروني غير صحيح',
        subjectRequired: 'الموضوع مطلوب',
        messageRequired: 'الرسالة مطلوبة',
        messageMinLength: 'يجب أن تحتوي الرسالة على 10 أحرف على الأقل'
      }
    }
  };

  const t = content[language];

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = t.validation.nameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.validation.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.validation.emailInvalid;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t.validation.subjectRequired;
    }

    if (!formData.message.trim()) {
      newErrors.message = t.validation.messageRequired;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t.validation.messageMinLength;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      travelDate: '',
      travelers: '2',
      destination: ''
    });
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 bg-gradient-to-br from-morocco-red via-red-600 to-morocco-terracotta text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">{t.success.title}</h2>
            <p className="text-xl opacity-90 mb-8">{t.success.message}</p>
            <button
              onClick={resetForm}
              className="bg-morocco-gold hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
            >
              {t.success.cta}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-morocco-red via-red-600 to-morocco-terracotta text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h2>
          <p className="text-xl opacity-90 mb-2">{t.subtitle}</p>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">{t.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">
                {language === 'fr' ? 'Informations de contact' : 'معلومات الاتصال'}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 mr-4 text-morocco-gold" />
                  <div>
                    <p className="font-semibold">
                      {language === 'fr' ? 'Adresse' : 'العنوان'}
                    </p>
                    <p className="opacity-90">Médina de Marrakech, Maroc</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-6 w-6 mr-4 text-morocco-gold" />
                  <div>
                    <p className="font-semibold">
                      {language === 'fr' ? 'Téléphone' : 'الهاتف'}
                    </p>
                    <a href="tel:+212772321613" className="opacity-90 hover:text-morocco-gold transition-colors">
                      +212 772321613
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-6 w-6 mr-4 text-morocco-gold" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <a href="mailto:info@marrakechtours.ma" className="opacity-90 hover:text-morocco-gold transition-colors">
                      info@marrakechtours.ma
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-sm opacity-80">
                  {language === 'fr' 
                    ? 'Réponse garantie sous 2 heures • Support 24/7'
                    : 'رد مضمون خلال ساعتين • دعم 24/7'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <User className="inline h-4 w-4 mr-1" />
                      {t.form.name}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/20 border rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-morocco-gold transition-all ${
                        errors.name ? 'border-red-400' : 'border-white/30'
                      }`}
                      placeholder={language === 'fr' ? 'Votre nom complet' : 'اسمك الكامل'}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-300 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Mail className="inline h-4 w-4 mr-1" />
                      {t.form.email}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/20 border rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-morocco-gold transition-all ${
                        errors.email ? 'border-red-400' : 'border-white/30'
                      }`}
                      placeholder={language === 'fr' ? 'votre@email.com' : 'بريدك@الإلكتروني.com'}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-300 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone and Subject */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Phone className="inline h-4 w-4 mr-1" />
                      {t.form.phone}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-morocco-gold transition-all"
                      placeholder="+212 6XX XXX XXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <MessageSquare className="inline h-4 w-4 mr-1" />
                      {t.form.subject}
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/20 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-morocco-gold transition-all ${
                        errors.subject ? 'border-red-400' : 'border-white/30'
                      }`}
                    >
                      <option value="" className="text-gray-800">
                        {language === 'fr' ? 'Choisir un sujet...' : 'اختر موضوعاً...'}
                      </option>
                      {t.subjects.map((subject, index) => (
                        <option key={index} value={subject} className="text-gray-800">
                          {subject}
                        </option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-300 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.subject}
                      </p>
                    )}
                  </div>
                </div>

                {/* Travel Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Calendar className="inline h-4 w-4 mr-1" />
                      {t.form.travelDate}
                    </label>
                    <input
                      type="date"
                      value={formData.travelDate}
                      onChange={(e) => handleInputChange('travelDate', e.target.value)}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-morocco-gold transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Users className="inline h-4 w-4 mr-1" />
                      {t.form.travelers}
                    </label>
                    <select
                      value={formData.travelers}
                      onChange={(e) => handleInputChange('travelers', e.target.value)}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-morocco-gold transition-all"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <option key={num} value={num.toString()} className="text-gray-800">
                          {num} {language === 'fr' ? (num === 1 ? 'personne' : 'personnes') : (num === 1 ? 'شخص' : 'أشخاص')}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      {t.form.destination}
                    </label>
                    <select
                      value={formData.destination}
                      onChange={(e) => handleInputChange('destination', e.target.value)}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-morocco-gold transition-all"
                    >
                      <option value="" className="text-gray-800">
                        {language === 'fr' ? 'Choisir...' : 'اختر...'}
                      </option>
                      {t.destinations.map((dest, index) => (
                        <option key={index} value={dest} className="text-gray-800">
                          {dest}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <MessageSquare className="inline h-4 w-4 mr-1" />
                    {t.form.message}
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={5}
                    className={`w-full px-4 py-3 bg-white/20 border rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-morocco-gold transition-all resize-none ${
                      errors.message ? 'border-red-400' : 'border-white/30'
                    }`}
                    placeholder={language === 'fr' 
                      ? 'Décrivez votre projet de voyage, vos préférences, questions...'
                      : 'صف مشروع سفرك، تفضيلاتك، أسئلتك...'
                    }
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-300 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-morocco-gold hover:bg-yellow-500 disabled:bg-gray-400 text-black font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                      {t.form.submitting}
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      {t.form.submit}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
