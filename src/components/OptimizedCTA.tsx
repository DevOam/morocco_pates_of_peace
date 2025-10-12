'use client';

import { useState } from 'react';
import { ArrowRight, Sparkles, Star, Shield, Clock } from 'lucide-react';

interface OptimizedCTAProps {
  language: 'fr' | 'ar';
  variant?: 'primary' | 'secondary' | 'outline' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: 'arrow' | 'sparkles' | 'star' | 'shield' | 'clock';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

export default function OptimizedCTA({
  language,
  variant = 'primary',
  size = 'md',
  icon,
  onClick,
  children,
  className = '',
  disabled = false,
  loading = false
}: OptimizedCTAProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-morocco-gold hover:bg-yellow-500 text-black shadow-lg hover:shadow-xl';
      case 'secondary':
        return 'bg-morocco-red hover:bg-red-700 text-white shadow-lg hover:shadow-xl';
      case 'outline':
        return 'border-2 border-morocco-gold text-morocco-gold hover:bg-morocco-gold hover:text-black bg-transparent';
      case 'gradient':
        return 'bg-gradient-to-r from-morocco-red to-morocco-gold text-white shadow-lg hover:shadow-xl hover:from-red-700 hover:to-yellow-500';
      default:
        return 'bg-morocco-gold hover:bg-yellow-500 text-black shadow-lg hover:shadow-xl';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'md':
        return 'px-6 py-3 text-base';
      case 'lg':
        return 'px-8 py-4 text-lg';
      case 'xl':
        return 'px-10 py-5 text-xl';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  const getIconComponent = () => {
    switch (icon) {
      case 'arrow':
        return <ArrowRight className="h-5 w-5" />;
      case 'sparkles':
        return <Sparkles className="h-5 w-5" />;
      case 'star':
        return <Star className="h-5 w-5" />;
      case 'shield':
        return <Shield className="h-5 w-5" />;
      case 'clock':
        return <Clock className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const baseClasses = `
    relative overflow-hidden font-bold rounded-xl transition-all duration-300 
    transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 
    focus:ring-morocco-gold/30 disabled:opacity-50 disabled:cursor-not-allowed 
    disabled:transform-none group
  `;

  const IconComponent = getIconComponent();

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${className}
        ${language === 'ar' ? 'flex-row-reverse' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      {/* Ripple Effect */}
      <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      {/* Content */}
      <div className="relative flex items-center justify-center gap-2">
        {loading ? (
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            {IconComponent && (
              <span className={`transition-transform duration-300 ${
                isHovered ? (language === 'ar' ? '-translate-x-1' : 'translate-x-1') : ''
              }`}>
                {IconComponent}
              </span>
            )}
            <span>{children}</span>
          </>
        )}
      </div>

      {/* Pulse Animation for Important CTAs */}
      {variant === 'primary' && !disabled && (
        <div className="absolute inset-0 rounded-xl animate-pulse bg-morocco-gold/30 opacity-0 group-hover:opacity-100" />
      )}
    </button>
  );
}

// Pre-configured CTA components for common use cases
export const BookNowCTA = ({ language, onClick, className }: { 
  language: 'fr' | 'ar'; 
  onClick?: () => void; 
  className?: string; 
}) => (
  <OptimizedCTA
    language={language}
    variant="primary"
    size="lg"
    icon="arrow"
    onClick={onClick}
    className={className}
  >
    {language === 'fr' ? 'Réserver Maintenant' : 'احجز الآن'}
  </OptimizedCTA>
);

export const GetQuoteCTA = ({ language, onClick, className }: { 
  language: 'fr' | 'ar'; 
  onClick?: () => void; 
  className?: string; 
}) => (
  <OptimizedCTA
    language={language}
    variant="outline"
    size="md"
    icon="sparkles"
    onClick={onClick}
    className={className}
  >
    {language === 'fr' ? 'Demander un Devis' : 'طلب عرض أسعار'}
  </OptimizedCTA>
);

export const ContactUsCTA = ({ language, onClick, className }: { 
  language: 'fr' | 'ar'; 
  onClick?: () => void; 
  className?: string; 
}) => (
  <OptimizedCTA
    language={language}
    variant="secondary"
    size="md"
    onClick={onClick}
    className={className}
  >
    {language === 'fr' ? 'Nous Contacter' : 'اتصل بنا'}
  </OptimizedCTA>
);

export const LearnMoreCTA = ({ language, onClick, className }: { 
  language: 'fr' | 'ar'; 
  onClick?: () => void; 
  className?: string; 
}) => (
  <OptimizedCTA
    language={language}
    variant="outline"
    size="sm"
    icon="arrow"
    onClick={onClick}
    className={className}
  >
    {language === 'fr' ? 'En Savoir Plus' : 'اعرف المزيد'}
  </OptimizedCTA>
);
