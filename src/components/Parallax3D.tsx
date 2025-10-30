'use client';

import { useState, useEffect, useRef } from 'react';
import { imageUrls } from './ImageManager';

interface Parallax3DProps {
  language: 'fr' | 'ar' | 'en' | 'es';
}

export default function Parallax3D({ language }: Parallax3DProps) {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const [dots, setDots] = useState<
    Array<{ left: number; top: number; txBase: number; scale: number; delay: number; speed: number }>
  >([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Generate stable floating dots once on mount to avoid SSR hydration mismatch
  useEffect(() => {
    const generated = Array.from({ length: 20 }, (_, i) => {
      // Use a simple deterministic seed based on index for consistency between renders
      const seed = (i + 1) * 9301 + 49297; // arbitrary constants
      const rand = (n: number) => {
        // linear congruential-like pseudo random from seed and n
        const x = (seed * (n + 1)) % 233280;
        return x / 233280;
      };
      return {
        left: rand(1) * 100,
        top: rand(2) * 100,
        txBase: 20 + rand(3) * 30, // base translateX magnitude
        scale: 0.5 + rand(4) * 1,
        delay: rand(5) * 2,
        speed: 0.1 + rand(6) * 0.3
      };
    });
    setDots(generated);
  }, []);

  const layers = [
    {
      image: imageUrls.merzouga,
      speed: 0.2,
      scale: 1.1,
      title: language === 'fr' ? 'Sahara Majestueux' : language === 'ar' ? 'الصحراء المهيبة' : language === 'en' ? 'Majestic Sahara' : 'Sáhara Majestuoso'
    },
    {
      image: imageUrls.marrakech,
      speed: 0.5,
      scale: 1.05,
      title: language === 'fr' ? 'Marrakech Authentique' : language === 'ar' ? 'مراكش الأصيلة' : language === 'en' ? 'Authentic Marrakech' : 'Marrakech Auténtica'
    },
    {
      image: imageUrls.chefchaouen,
      speed: 0.8,
      scale: 1.02,
      title: language === 'fr' ? 'Chefchaouen Bleue' : language === 'ar' ? 'شفشاون الزرقاء' : language === 'en' ? 'Blue Chefchaouen' : 'Chefchaouen Azul'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className={`relative h-screen overflow-hidden ${language === 'ar' ? 'rtl' : 'ltr'}`}
    >
      {/* Parallax Layers */}
      {layers.map((layer, index) => (
        <div
          key={index}
          className="absolute inset-0"
          style={{
            transform: `
              translateY(${scrollY * layer.speed}px) 
              translateX(${(mousePosition.x - 0.5) * 50}px)
              scale(${layer.scale + (mousePosition.x * 0.05)})
            `,
            zIndex: layers.length - index
          }}
        >
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-300"
            style={{ 
              backgroundImage: `url(${layer.image})`,
              filter: `brightness(${0.7 + index * 0.1})`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </div>
      ))}

      {/* 3D Floating Elements - stable values to prevent hydration mismatch */}
      <div className="absolute inset-0 pointer-events-none">
        {dots.map((d, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-morocco-gold rounded-full opacity-60"
            style={{
              left: `${d.left}%`,
              top: `${d.top}%`,
              transform: `
                translateY(${scrollY * d.speed}px)
                translateX(${(mousePosition.x - 0.5) * d.txBase}px)
                scale(${d.scale})
              `,
              animationDelay: `${d.delay}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
        <div 
          className="max-w-4xl mx-auto px-4"
          style={{
            transform: `
              translateY(${scrollY * 0.3}px)
              rotateX(${(mousePosition.y - 0.5) * 10}deg)
              rotateY(${(mousePosition.x - 0.5) * 10}deg)
            `,
            transformStyle: 'preserve-3d'
          }}
        >
          <h1 
            className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
            style={{
              transform: 'translateZ(50px)',
              textShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}
          >
            {language === 'fr' ? 'Expérience Immersive' : language === 'ar' ? 'تجربة غامرة' : language === 'en' ? 'Immersive Experience' : 'Experiencia Inmersiva'}
          </h1>
          <p 
            className="text-xl md:text-3xl mb-12 opacity-90"
            style={{
              transform: 'translateZ(30px)',
              textShadow: '0 5px 20px rgba(0,0,0,0.5)'
            }}
          >
            {language === 'fr' 
              ? 'Découvrez le Maroc comme jamais auparavant'
              : language === 'ar' 
                ? 'اكتشف المغرب كما لم تره من قبل'
                : language === 'en'
                  ? 'Discover Morocco like never before'
                  : 'Descubre Marruecos como nunca antes'
            }
          </p>
          
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            style={{ transform: 'translateZ(20px)' }}
          >
            {layers.map((layer, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 hover:bg-opacity-20"
                style={{
                  transform: `
                    translateZ(${10 + index * 5}px)
                    rotateY(${(mousePosition.x - 0.5) * 5}deg)
                  `
                }}
              >
                <h3 className="text-xl font-semibold mb-4">{layer.title}</h3>
                <div className="w-full h-32 rounded-lg overflow-hidden mb-4">
                  <div 
                    className="w-full h-full bg-cover bg-center transform transition-transform duration-700 hover:scale-110"
                    style={{ backgroundImage: `url(${layer.image})` }}
                  />
                </div>
                <p className="text-sm opacity-80">
                  {language === 'fr' 
                    ? 'Une destination authentique qui capture l\'essence du Maroc.'
                    : language === 'ar' 
                      ? 'وجهة أصيلة تجسد جوهر المغرب.'
                      : language === 'en'
                        ? 'An authentic destination that captures Morocco\'s essence.'
                        : 'Un destino auténtico que capta la esencia de Marruecos.'
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
        <p className="text-sm mt-2 opacity-75">
          {language === 'fr' ? 'Faites défiler' : language === 'ar' ? 'مرر لأسفل' : language === 'en' ? 'Scroll down' : 'Desplázate'}
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
