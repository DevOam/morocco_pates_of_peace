'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import EnhancedGallery from '@/components/EnhancedGallery';
import StickyHeader from '@/components/StickyHeader';
import UltraSimpleFooter from '@/components/UltraSimpleFooter';

// Load interactive widgets client-side only to avoid SSR hydration mismatch
const SuperAIAssistant = dynamic(() => import('@/components/SuperAIAssistant'), { ssr: false });

export default function GaleriePage() {
  const [language, setLanguage] = useState<'fr' | 'ar'>('fr');

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'rtl font-arabic' : 'ltr'}`}>
      {/* Sticky Header */}
      <StickyHeader 
        language={language} 
        onLanguageChange={setLanguage}
      />

      {/* Page Header */}
      <section className="pt-32 sm:pt-36 pb-12 bg-gradient-to-r from-morocco-red to-morocco-terracotta scroll-mt-28 sm:scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {language === 'fr' ? 'Galerie Photo' : 'معرض الصور'}
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            {language === 'fr' 
              ? 'Découvrez le Maroc à travers nos photos authentiques avec géolocalisation précise'
              : 'اكتشف المغرب من خلال صورنا الأصيلة مع تحديد الموقع الدقيق'
            }
          </p>
        </div>
      </section>

      {/* Enhanced Gallery */}
      <EnhancedGallery language={language} />

      {/* Footer */}
      <UltraSimpleFooter language={language} />

      {/* AI Assistant Chat */}
      <SuperAIAssistant language={language} />
    </div>
  );
}
