'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Globe, Phone, Mail } from 'lucide-react';

interface StickyHeaderProps {
  language: 'fr' | 'ar' | 'en' | 'es';
  onLanguageChange: (lang: 'fr' | 'ar' | 'en' | 'es') => void;
}

export default function StickyHeader({ language, onLanguageChange }: StickyHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = {
    fr: [
      { name: 'Accueil', href: '#hero' },
      { name: 'Destinations', href: '#destinations' },
      { name: 'Circuits', href: '#tours' },
      { name: 'Galerie', href: '#gallery' },
      { name: 'Excursions', href: '#excursions' },
      { name: 'Boutique', href: '#store' },
      { name: 'Contact', href: '#contact' }
    ],
    ar: [
      { name: 'الرئيسية', href: '#hero' },
      { name: 'الوجهات', href: '#destinations' },
      { name: 'الجولات', href: '#tours' },
      { name: 'المعرض', href: '#gallery' },
      { name: 'الرحلات', href: '#excursions' },
      { name: 'المتجر', href: '#store' },
      { name: 'اتصل بنا', href: '#contact' }
    ],
    en: [
      { name: 'Home', href: '#hero' },
      { name: 'Destinations', href: '#destinations' },
      { name: 'Tours', href: '#tours' },
      { name: 'Gallery', href: '#gallery' },
      { name: 'Excursions', href: '#excursions' },
      { name: 'Shop', href: '#store' },
      { name: 'Contact', href: '#contact' }
    ],
    es: [
      { name: 'Inicio', href: '#hero' },
      { name: 'Destinos', href: '#destinations' },
      { name: 'Tours', href: '#tours' },
      { name: 'Galería', href: '#gallery' },
      { name: 'Excursiones', href: '#excursions' },
      { name: 'Tienda', href: '#store' },
      { name: 'Contacto', href: '#contact' }
    ]
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-black/30 backdrop-blur-sm'
      } ${language === 'ar' ? 'rtl' : 'ltr'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-morocco-red to-morocco-gold rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div className={`${isScrolled ? 'text-gray-900' : 'text-white'} font-bold text-lg sm:text-xl transition-colors duration-300`}>
                Morocco Plant Peace
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigation[language].map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(item.href);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`font-medium text-sm xl:text-base transition-all duration-200 hover:text-morocco-gold cursor-pointer px-2 py-1 rounded-md hover:bg-white/10 ${
                  isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Language Switcher */}
            <div className="relative">
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as 'fr' | 'ar' | 'en' | 'es')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer text-sm font-medium ${
                  isScrolled 
                    ? 'text-gray-700 hover:bg-gray-100 bg-white border border-gray-200 shadow-sm' 
                    : 'text-white hover:bg-white/20 bg-white/10 border border-white/20 backdrop-blur-sm'
                }`}
              >
                <option value="fr">🇫🇷 Français</option>
                <option value="ar">🇲🇦 العربية</option>
                <option value="en">🇬🇧 English</option>
                <option value="es">🇪🇸 Español</option>
              </select>
            </div>

            {/* Contact Info */}
            <div className="hidden xl:flex items-center gap-4">
              <a
                href="tel:+212772321613"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isScrolled 
                    ? 'text-gray-700 hover:bg-gray-100' 
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <Phone className="h-4 w-4" />
                <span className="text-sm">+212 772321613</span>
              </a>
            </div>

            {/* CTA Button (hidden on very small screens to preserve menu space) */}
            <button className="hidden sm:inline-flex bg-morocco-gold hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg transition-all duration-200 text-sm shadow-md hover:shadow-lg transform hover:scale-105">
              {language === 'fr' ? 'Réserver' : 
               language === 'ar' ? 'احجز' :
               language === 'en' ? 'Book' : 
               'Reservar'}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              {navigation[language].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    const target = document.querySelector(item.href);
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  {item.name}
                </a>
              ))}
              <div className="border-t pt-3 mt-3">
                <a
                  href="tel:+212772321613"
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>+212 772321613</span>
                </a>
                <a
                  href="mailto:contact@moroccotours.com"
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>contact@moroccotours.com</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
