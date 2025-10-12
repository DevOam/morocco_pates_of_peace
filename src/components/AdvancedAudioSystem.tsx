'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from 'lucide-react';
import { audioUrls } from './ImageManager';

interface AdvancedAudioSystemProps {
  language: 'fr' | 'ar';
}

export default function AdvancedAudioSystem({ language }: AdvancedAudioSystemProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'one' | 'all'>('off');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const tracks = [
    {
      id: 1,
      title: language === 'fr' ? 'Ambiance Jemaa el-Fna' : 'أجواء ساحة جامع الفنا',
      artist: language === 'fr' ? 'Sons de Marrakech' : 'أصوات مراكش',
      duration: 245, // 4:05
      file: audioUrls.marrakech,
      cover: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300&h=300&fit=crop&crop=center',
      description: language === 'fr' ? 'Immersion sonore au cœur de la place mythique' : 'انغماس صوتي في قلب الساحة الأسطورية'
    },
    {
      id: 2,
      title: language === 'fr' ? 'Vent du Sahara' : 'رياح الصحراء',
      artist: language === 'fr' ? 'Désert de Merzouga' : 'صحراء مرزوقة',
      duration: 320, // 5:20
      file: audioUrls.sahara,
      cover: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=300&h=300&fit=crop&crop=center',
      description: language === 'fr' ? 'Le silence majestueux des dunes dorées' : 'الصمت المهيب للكثبان الذهبية'
    },
    {
      id: 3,
      title: language === 'fr' ? 'Musique Gnawa Traditionnelle' : 'موسيقى كناوة تقليدية',
      artist: language === 'fr' ? 'Maîtres Gnawa d\'Essaouira' : 'أساتذة كناوة الصويرة',
      duration: 198, // 3:18
      file: audioUrls.gnawa,
      cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=center',
      description: language === 'fr' ? 'Rythmes ancestraux et spiritualité' : 'إيقاعات أجداد وروحانية'
    },
    {
      id: 4,
      title: language === 'fr' ? 'Médina de Fès' : 'مدينة فاس العتيقة',
      artist: language === 'fr' ? 'Échos du Patrimoine' : 'أصداء التراث',
      duration: 275, // 4:35
      file: audioUrls.fes,
      cover: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=300&h=300&fit=crop&center',
      description: language === 'fr' ? 'Murmures millénaires des ruelles anciennes' : 'همسات ألفية من الأزقة القديمة'
    },
    {
      id: 5,
      title: language === 'fr' ? 'Cascade d\'Ouzoud' : 'شلالات أوزود',
      artist: language === 'fr' ? 'Nature de l\'Atlas' : 'طبيعة الأطلس',
      duration: 210, // 3:30
      file: audioUrls.ouzoud,
      cover: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300&h=300&fit=crop&crop=center',
      description: language === 'fr' ? 'Symphonie aquatique des montagnes' : 'سيمفونية مائية من الجبال'
    }
  ];

  const currentTrackData = tracks[currentTrack];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;
      audioRef.current.src = currentTrackData.file;
      
      const audio = audioRef.current;
      
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);
      const handleEnded = () => {
        if (repeatMode === 'one') {
          audio.currentTime = 0;
          audio.play();
        } else if (repeatMode === 'all' || currentTrack < tracks.length - 1) {
          nextTrack();
        } else {
          setIsPlaying(false);
        }
      };

      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentTrack, repeatMode]);

  // Detect when footer is near viewport and adjust player behavior/position
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const near = entry.isIntersecting && entry.intersectionRatio > 0;
        setIsNearFooter(near);
        if (near) {
          setIsExpanded(false);
        }
      },
      { root: null, threshold: [0, 0.01, 0.1] }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.log('Audio simulation mode');
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    let nextIndex;
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * tracks.length);
    } else {
      nextIndex = (currentTrack + 1) % tracks.length;
    }
    setCurrentTrack(nextIndex);
    setCurrentTime(0);
  };

  const prevTrack = () => {
    const prevIndex = currentTrack === 0 ? tracks.length - 1 : currentTrack - 1;
    setCurrentTrack(prevIndex);
    setCurrentTime(0);
  };

  const changeVolume = (newVolume: number) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? volume : 0;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    const newTime = percentage * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className={`fixed ${isNearFooter ? 'bottom-24 sm:bottom-28' : 'bottom-3 sm:bottom-6'} ${language === 'ar' ? 'left-3 sm:left-6' : 'right-3 sm:right-6'} z-40`}>
      {/* Mini Player */}
      <div className={`bg-white rounded-2xl shadow-2xl transition-all duration-500 ${
        isExpanded ? 'w-80 sm:w-96 h-auto' : 'w-72 sm:w-80 h-auto'
      } transform hover:scale-105`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center">
            <Music className="h-5 w-5 text-morocco-red mr-2" />
            <span className="font-semibold text-gray-900">
              {language === 'fr' ? 'Ambiances Maroc' : 'أجواء المغرب'}
            </span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-morocco-red transition-colors"
          >
            <svg className={`h-4 w-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Current Track Info */}
        <div className="p-4">
          <div className="flex items-center space-x-4">
            <div 
              className="w-16 h-16 rounded-lg bg-cover bg-center shadow-md"
              style={{ backgroundImage: `url(${currentTrackData.cover})` }}
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 truncate text-sm">
                {currentTrackData.title}
              </h4>
              <p className="text-gray-600 truncate text-xs">
                {currentTrackData.artist}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {currentTrackData.description}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-4 pb-2">
          <div 
            ref={progressRef}
            className="bg-gray-200 rounded-full h-2 cursor-pointer relative"
            onClick={handleProgressClick}
          >
            <div 
              className="bg-gradient-to-r from-morocco-red to-morocco-gold h-2 rounded-full transition-all duration-300"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration || currentTrackData.duration)}</span>
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-between px-4 pb-4">
          <button
            onClick={() => setIsShuffled(!isShuffled)}
            className={`p-2 rounded-full transition-colors ${
              isShuffled ? 'text-morocco-red bg-red-50' : 'text-gray-500 hover:text-morocco-red'
            }`}
          >
            <Shuffle className="h-4 w-4" />
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={prevTrack}
              className="p-2 text-gray-600 hover:text-morocco-red transition-colors"
            >
              <SkipBack className="h-5 w-5" />
            </button>

            <button
              onClick={togglePlay}
              className="bg-morocco-red text-white p-3 rounded-full hover:bg-red-700 transition-colors shadow-lg"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-0.5" />
              )}
            </button>

            <button
              onClick={nextTrack}
              className="p-2 text-gray-600 hover:text-morocco-red transition-colors"
            >
              <SkipForward className="h-5 w-5" />
            </button>
          </div>

          <button
            onClick={() => setRepeatMode(repeatMode === 'off' ? 'all' : repeatMode === 'all' ? 'one' : 'off')}
            className={`p-2 rounded-full transition-colors ${
              repeatMode !== 'off' ? 'text-morocco-red bg-red-50' : 'text-gray-500 hover:text-morocco-red'
            }`}
          >
            <Repeat className="h-4 w-4" />
            {repeatMode === 'one' && (
              <span className="absolute -top-1 -right-1 bg-morocco-red text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                1
              </span>
            )}
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-3 px-4 pb-4">
          <button onClick={toggleMute} className="text-gray-500 hover:text-morocco-red">
            {isMuted || volume === 0 ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => changeVolume(parseFloat(e.target.value))}
            className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs text-gray-500 w-8">
            {Math.round((isMuted ? 0 : volume) * 100)}%
          </span>
        </div>

        {/* Expanded Playlist */}
        {isExpanded && (
          <div className="border-t border-gray-100 max-h-64 overflow-y-auto">
            <div className="p-2">
              <h5 className="text-sm font-semibold text-gray-900 mb-2 px-2">
                {language === 'fr' ? 'Playlist' : 'قائمة التشغيل'}
              </h5>
              {tracks.map((track, index) => (
                <button
                  key={track.id}
                  onClick={() => setCurrentTrack(index)}
                  className={`w-full text-left p-2 rounded-lg transition-colors ${
                    index === currentTrack 
                      ? 'bg-morocco-sand text-morocco-red' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-10 h-10 rounded bg-cover bg-center"
                      style={{ backgroundImage: `url(${track.cover})` }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{track.title}</div>
                      <div className="text-xs text-gray-500 truncate">{track.artist}</div>
                    </div>
                    <div className="text-xs text-gray-400">
                      {formatTime(track.duration)}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Status Indicator */}
        <div className="px-4 pb-3">
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
            <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
            <span>
              {isPlaying 
                ? (language === 'fr' ? 'En cours de lecture' : 'قيد التشغيل')
                : (language === 'fr' ? 'En pause' : 'متوقف')
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
