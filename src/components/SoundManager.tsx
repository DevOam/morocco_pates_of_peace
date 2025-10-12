'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { audioUrls } from './ImageManager';

interface SoundManagerProps {
  language: 'fr' | 'ar';
}

export default function SoundManager({ language }: SoundManagerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const tracks = [
    {
      name: language === 'fr' ? 'Ambiance Marrakech' : 'أجواء مراكش',
      description: language === 'fr' ? 'Sons de la médina' : 'أصوات المدينة العتيقة',
      duration: '3:45'
    },
    {
      name: language === 'fr' ? 'Vent du Sahara' : 'رياح الصحراء',
      description: language === 'fr' ? 'Calme du désert' : 'هدوء الصحراء',
      duration: '4:20'
    },
    {
      name: language === 'fr' ? 'Musique Gnawa' : 'موسيقى كناوة',
      description: language === 'fr' ? 'Rythmes traditionnels' : 'إيقاعات تقليدية',
      duration: '2:55'
    }
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Créer l'élément audio avec URL en ligne
      audioRef.current = new Audio(audioUrls.marrakech);
      audioRef.current.volume = volume;
      audioRef.current.loop = true;
      
      // Gérer les erreurs de chargement
      audioRef.current.onerror = () => {
        console.log('Audio URL non accessible, utilisation de la simulation');
      };
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Essayer de jouer le fichier audio réel
        audioRef.current.play().catch(() => {
          console.log(`Simulation: Playing ${tracks[currentTrack].name}`);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const changeVolume = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => prev === 0 ? tracks.length - 1 : prev - 1);
  };

  return (
    <div className={`fixed bottom-20 ${language === 'ar' ? 'left-6' : 'right-6'} z-40`}>
      {/* Mini Player */}
      <div className="bg-white rounded-2xl shadow-2xl p-4 w-80 transform transition-all duration-300 hover:scale-105">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Music className="h-5 w-5 text-morocco-red mr-2" />
            <span className="font-semibold text-gray-900">
              {language === 'fr' ? 'Ambiance' : 'الأجواء'}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {language === 'fr' ? 'Démo Audio' : 'تجريب صوتي'}
          </div>
        </div>

        {/* Track Info */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 text-sm mb-1">
            {tracks[currentTrack].name}
          </h4>
          <p className="text-xs text-gray-600">
            {tracks[currentTrack].description} • {tracks[currentTrack].duration}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="bg-gray-200 rounded-full h-1">
            <div 
              className="bg-morocco-gold h-1 rounded-full transition-all duration-300"
              style={{ width: isPlaying ? '45%' : '0%' }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{isPlaying ? '1:23' : '0:00'}</span>
            <span>{tracks[currentTrack].duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevTrack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
            </svg>
          </button>

          <button
            onClick={togglePlay}
            className="bg-morocco-red text-white p-3 rounded-full hover:bg-red-700 transition-colors"
          >
            {isPlaying ? (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="h-5 w-5 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          <button
            onClick={nextTrack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
            </svg>
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-3">
          <button onClick={() => changeVolume(volume === 0 ? 0.3 : 0)}>
            {volume === 0 ? (
              <VolumeX className="h-4 w-4 text-gray-500" />
            ) : (
              <Volume2 className="h-4 w-4 text-gray-500" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => changeVolume(parseFloat(e.target.value))}
            className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs text-gray-500 w-8">
            {Math.round(volume * 100)}%
          </span>
        </div>

        {/* Sound Effects Buttons */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-600 mb-2">
            {language === 'fr' ? 'Effets sonores' : 'المؤثرات الصوتية'}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: '🔔', name: language === 'fr' ? 'Notification' : 'إشعار' },
              { icon: '✨', name: language === 'fr' ? 'Succès' : 'نجاح' },
              { icon: '🎵', name: language === 'fr' ? 'Mélodie' : 'لحن' }
            ].map((effect, index) => (
              <button
                key={index}
                onClick={() => console.log(`Sound effect: ${effect.name}`)}
                className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors"
              >
                <div className="text-lg">{effect.icon}</div>
                <div className="text-xs text-gray-600 mt-1">{effect.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="mt-3 p-2 bg-morocco-sand bg-opacity-30 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            {language === 'fr' 
              ? '🎧 Démo audio - Intégration complète disponible'
              : '🎧 تجريب صوتي - التكامل الكامل متاح'
            }
          </p>
        </div>
      </div>
    </div>
  );
}
