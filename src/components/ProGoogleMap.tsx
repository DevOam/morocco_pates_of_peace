"use client";

import { useEffect, useRef, useState } from "react";
import { Search, MapPin, Clock, Star, ArrowRight } from "lucide-react";
import { imageUrls } from './ImageManager';

// Lightweight Google Maps loader without extra deps
function loadGoogleMaps(apiKey: string): Promise<any> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("Window not available"));
    // If already loaded
    if ((window as any).google?.maps) return resolve((window as any).google);

    const existing = document.getElementById("google-maps-js");
    if (existing) {
      (existing as HTMLScriptElement).addEventListener("load", () => resolve((window as any).google));
      (existing as HTMLScriptElement).addEventListener("error", reject);
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-js";
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker,places`;
    script.onload = () => resolve((window as any).google);
    script.onerror = () => reject(new Error("Failed to load Google Maps JS"));
    document.head.appendChild(script);
  });
}

interface ProGoogleMapProps {
  language: "fr" | "ar";
  onBookingClick?: (destination: string) => void;
}

export default function ProGoogleMap({ language, onBookingClick }: ProGoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // mark as mounted to avoid SSR/CSR mismatch
    setMounted(true);
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) return; // Render graceful fallback below

    let map: any | null = null;
    const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID; // optional, required for Advanced Markers

    // Global booking handler for InfoWindow buttons
    (window as any).bookDestination = (destination: string) => {
      if (onBookingClick) onBookingClick(destination);
    };

    // Clean default Google Maps style - no custom styling
    const style: any[] = [];

    const init = async () => {
      const g = await loadGoogleMaps(apiKey);
      if (!mapRef.current) return;

      const baseMapOptions: any = {
        center: { lat: 31.7917, lng: -7.0926 }, // Morocco
        zoom: 5.5,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: style,
      };

      // attach mapId only if provided to unlock vector features (Advanced Markers)
      if (mapId) (baseMapOptions as any).mapId = mapId;

      map = new g.maps.Map(mapRef.current, baseMapOptions);

      // Enhanced destinations with full data
      const destinations = [
        { 
          name: "Marrakech", 
          position: { lat: 31.6295, lng: -7.9811 }, 
          color: "#C1272D", 
          category: "imperial",
          duration: "2-3 jours",
          price: "180€",
          rating: 4.9,
          image: imageUrls.marrakech,
          highlights: language === 'fr' ? ['Médina UNESCO', 'Palais Bahia', 'Jardins Majorelle'] : ['المدينة العتيقة', 'قصر الباهية', 'حدائق ماجوريل']
        },
        { 
          name: "Fès", 
          position: { lat: 34.0331, lng: -5.0003 }, 
          color: "#C1272D", 
          category: "imperial",
          duration: "2-3 jours",
          price: "220€",
          rating: 4.8,
          image: imageUrls.fes,
          highlights: language === 'fr' ? ['Médina médiévale', 'Université Al Quaraouiyine', 'Tanneries'] : ['المدينة القديمة', 'جامعة القرويين', 'المدابغ']
        },
        { 
          name: "Merzouga", 
          position: { lat: 31.1000, lng: -4.0000 }, 
          color: "#FFD700", 
          category: "sahara",
          duration: "3-4 jours",
          price: "450€",
          rating: 5.0,
          image: imageUrls.merzouga,
          highlights: language === 'fr' ? ['Dunes Erg Chebbi', 'Nuit sous les étoiles', 'Caravanes chameaux'] : ['كثبان عرق الشبي', 'ليلة تحت النجوم', 'قوافل الجمال']
        },
        { 
          name: "Chefchaouen", 
          position: { lat: 35.1686, lng: -5.2636 }, 
          color: "#006233", 
          category: "atlas",
          duration: "1-2 jours",
          price: "150€",
          rating: 4.7,
          image: imageUrls.chefchaouen,
          highlights: language === 'fr' ? ['Ville bleue', 'Montagnes du Rif', 'Artisanat local'] : ['المدينة الزرقاء', 'جبال الريف', 'الحرف المحلية']
        },
        { 
          name: "Essaouira", 
          position: { lat: 31.5085, lng: -9.7595 }, 
          color: "#4A90E2", 
          category: "coast",
          duration: "2 jours",
          price: "200€",
          rating: 4.6,
          image: imageUrls.essaouira,
          highlights: language === 'fr' ? ['Port historique', 'Remparts', 'Plages atlantiques'] : ['الميناء التاريخي', 'الأسوار', 'شواطئ الأطلسي']
        }
      ] as const;

      // No routes/lines between markers

      const canUseAdvanced = !!mapId && g.maps?.marker?.AdvancedMarkerElement;
      for (const d of destinations) {
        let marker: any;
        if (canUseAdvanced) {
          marker = new g.maps.marker.AdvancedMarkerElement({
            map: map,
            position: d.position,
            content: createMarker(d.color, d.image),
            title: d.name,
          });
        } else {
          // Classic markers: start with a clean colored circle, then swap to a photo icon when image is loaded (canvas-based)
          marker = new g.maps.Marker({
            map: map,
            position: d.position,
            title: d.name,
            icon: buildCircleIcon(d.color),
          });
          // Async load photo and update icon when ready
          buildPhotoIcon(d.image, d.color).then((photoIcon: any) => {
            marker.setIcon(photoIcon);
          }).catch(() => {
            // keep the circle icon on failure
          });
        }

        // Rich Info window
        const iw = new g.maps.InfoWindow({
          content: createRichInfoWindow(d, language),
          maxWidth: 320,
        });
        const clickEvent = canUseAdvanced ? "gmp-click" : "click";
        marker.addListener(clickEvent, () => {
          setSelectedDestination(d.name);
          iw.open({ map, anchor: marker });
        });
      }

      // Places Autocomplete for search
      if (searchRef.current && g.maps.places) {
        const autocomplete = new g.maps.places.Autocomplete(searchRef.current, {
          bounds: new g.maps.LatLngBounds(
            new g.maps.LatLng(27.0, -13.0), // SW Morocco
            new g.maps.LatLng(36.0, -1.0)   // NE Morocco
          ),
          componentRestrictions: { country: 'ma' },
          fields: ['place_id', 'geometry', 'name', 'formatted_address'],
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (place.geometry?.location) {
            map.setCenter(place.geometry.location);
            map.setZoom(12);
          }
        });
      }
    };

    init();

    return () => {
      // cleanup not strictly required for Maps JS, but keep ref
      map = null;
    };
  }, [language]);

  const hasKey = !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <section className={`py-20 bg-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {language === "fr" ? "Explorez le Maroc" : "استكشف المغرب"}
          </h2>
          <p className="text-xl text-gray-600">
            {language === "fr" ? "Carte interactive premium avec trajets et réservation directe" : "خريطة تفاعلية متميزة مع المسارات والحجز المباشر"}
          </p>
        </div>

        {/* Search Bar */}
        {mounted && (
          <div className="mb-8 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                ref={searchRef}
                type="text"
                placeholder={language === "fr" ? "Rechercher une destination..." : "ابحث عن وجهة..."}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-morocco-red focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
              />
            </div>
          </div>
        )}

        <div className="relative rounded-2xl overflow-hidden shadow-2xl" suppressHydrationWarning>
          {/* Render empty container on server; actual map mounts on client */}
          <div ref={mapRef} className="h-[480px] w-full" />
          {!hasKey && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-lg font-semibold mb-2">API Key manquante</div>
                <div className="text-sm text-gray-600">Ajoutez NEXT_PUBLIC_GOOGLE_MAPS_API_KEY dans .env.local puis relancez le serveur</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function createCategoryIcon(category: string, color: string, imageUrl: string) {
  // Simplified approach - direct SVG with base64 encoded image
  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="circle-${category}">
            <circle cx="30" cy="30" r="24"/>
          </clipPath>
          <filter id="shadow-${category}">
            <feDropShadow dx="0" dy="3" stdDeviation="4" flood-opacity="0.3"/>
          </filter>
        </defs>
        
        <!-- Outer colored ring -->
        <circle cx="30" cy="30" r="28" fill="${color}" filter="url(#shadow-${category})"/>
        
        <!-- White border -->
        <circle cx="30" cy="30" r="26" fill="white"/>
        
        <!-- Background for image -->
        <circle cx="30" cy="30" r="24" fill="#f0f0f0"/>
        
        <!-- City image as background -->
        <circle cx="30" cy="30" r="24" fill="url(#img-${category})" clip-path="url(#circle-${category})"/>
        
        <!-- Subtle overlay -->
        <circle cx="30" cy="30" r="24" fill="rgba(0,0,0,0.1)"/>
        
        <!-- Shine effect -->
        <ellipse cx="24" cy="24" rx="10" ry="6" fill="white" opacity="0.3"/>
        
        <defs>
          <pattern id="img-${category}" patternUnits="userSpaceOnUse" width="48" height="48">
            <image href="${imageUrl}" x="0" y="0" width="48" height="48" preserveAspectRatio="xMidYMid slice"/>
          </pattern>
        </defs>
      </svg>
    `)}`,
    scaledSize: { width: 50, height: 50 },
    anchor: { x: 25, y: 25 }
  };
}

function createRichInfoWindow(destination: any, language: 'fr' | 'ar'): string {
  const stars = '★'.repeat(Math.floor(destination.rating)) + '☆'.repeat(5 - Math.floor(destination.rating));
  
  return `
    <div style="font-family: Inter, system-ui, Arial; width: 280px;">
      <div style="height: 120px; background-image: url(${destination.image}); background-size: cover; background-position: center; border-radius: 8px; margin-bottom: 12px;"></div>
      
      <div style="padding: 0 4px;">
        <h3 style="font-size: 18px; font-weight: 600; margin: 0 0 8px 0; color: #1a1a1a;">${destination.name}</h3>
        
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <span style="color: #FFD700; font-size: 14px;">${stars}</span>
          <span style="color: #666; font-size: 14px;">${destination.rating}/5</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 4px; color: #666; font-size: 14px;">
            <span>⏱️</span>
            <span>${destination.duration}</span>
          </div>
          <div style="font-size: 18px; font-weight: 700; color: #C1272D;">${destination.price}</div>
        </div>
        
        <div style="margin-bottom: 12px;">
          <div style="font-size: 14px; font-weight: 600; margin-bottom: 4px; color: #333;">
            ${language === 'fr' ? 'Points forts:' : 'النقاط المميزة:'}
          </div>
          ${destination.highlights.slice(0, 2).map((h: string) => `<div style="font-size: 13px; color: #666; margin-bottom: 2px;">• ${h}</div>`).join('')}
        </div>
        
        <button 
          onclick="window.bookDestination && window.bookDestination('${destination.name}')"
          style="width: 100%; background: #C1272D; color: white; border: none; padding: 10px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px;"
        >
          ${language === 'fr' ? '🎯 Réserver maintenant' : '🎯 احجز الآن'}
        </button>
      </div>
    </div>
  `;
}

function createMarker(color: string, imageUrl?: string): HTMLElement {
  const container = document.createElement("div");
  container.style.position = "relative";
  container.style.width = "60px";
  container.style.height = "60px";
  container.style.cursor = "pointer";
  
  // Create circular image container
  const imageContainer = document.createElement("div");
  imageContainer.style.width = "50px";
  imageContainer.style.height = "50px";
  imageContainer.style.borderRadius = "50%";
  imageContainer.style.border = `4px solid ${color}`;
  imageContainer.style.overflow = "hidden";
  imageContainer.style.position = "absolute";
  imageContainer.style.top = "5px";
  imageContainer.style.left = "5px";
  imageContainer.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.5)";
  imageContainer.style.transition = "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
  
  // Create image element
  if (imageUrl) {
    const img = document.createElement("img");
    img.src = imageUrl;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.objectPosition = "center";
    imageContainer.appendChild(img);
  } else {
    // Fallback gradient if no image
    imageContainer.style.background = `linear-gradient(135deg, ${color}, ${color}aa)`;
  }
  
  // Create pulsing ring
  const ring = document.createElement("div");
  ring.style.width = "70px";
  ring.style.height = "70px";
  ring.style.borderRadius = "50%";
  ring.style.border = `2px solid ${color}`;
  ring.style.position = "absolute";
  ring.style.top = "-5px";
  ring.style.left = "-5px";
  ring.style.opacity = "0.6";
  ring.style.animation = "pulse 2s infinite";
  
  // Add CSS animation
  const style = document.createElement("style");
  style.textContent = `
    @keyframes pulse {
      0% { transform: scale(1); opacity: 0.6; }
      50% { transform: scale(1.2); opacity: 0.3; }
      100% { transform: scale(1); opacity: 0.6; }
    }
  `;
  document.head.appendChild(style);
  
  // Hover effects
  container.addEventListener('mouseenter', () => {
    imageContainer.style.transform = "scale(1.15)";
    imageContainer.style.boxShadow = "0 12px 35px rgba(0,0,0,0.4), 0 0 30px rgba(255,255,255,0.7)";
    ring.style.animation = "pulse 1s infinite";
  });
  
  container.addEventListener('mouseleave', () => {
    imageContainer.style.transform = "scale(1)";
    imageContainer.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.5)";
    ring.style.animation = "pulse 2s infinite";
  });
  
  container.appendChild(ring);
  container.appendChild(imageContainer);
  
  return container;
}

// --- Marker Icon Helpers (for classic google.maps.Marker) ---
function buildCircleIcon(color: string): any {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'>
      <defs>
        <filter id='shadow' x='-50%' y='-50%' width='200%' height='200%'>
          <feDropShadow dx='0' dy='3' stdDeviation='4' flood-opacity='0.3' />
        </filter>
      </defs>
      <circle cx='30' cy='30' r='28' fill='${color}' stroke='white' stroke-width='4' filter='url(#shadow)' />
    </svg>`;
  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    scaledSize: { width: 50, height: 50 },
    anchor: { x: 25, y: 25 },
  } as any;
}

function buildPhotoIcon(imageUrl: string, color: string): Promise<any> {
  return new Promise((resolve) => {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      const src = imageUrl.includes('?')
        ? `${imageUrl}&auto=format&fit=crop&w=200&h=200`
        : `${imageUrl}?auto=format&fit=crop&w=200&h=200`;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 120;
        canvas.height = 120;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(buildCircleIcon(color));
          return;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(60, 60, 56, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();

        ctx.lineWidth = 8;
        ctx.strokeStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(60, 60, 52, 0, Math.PI * 2);
        ctx.stroke();

        ctx.save();
        ctx.beginPath();
        ctx.arc(60, 60, 48, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, 0, 0, 120, 120);
        ctx.restore();

        const grad = (ctx as CanvasRenderingContext2D).createRadialGradient(48, 48, 0, 48, 48, 24);
        grad.addColorStop(0, 'rgba(255,255,255,0.35)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(48, 48, 18, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        resolve({
          url: canvas.toDataURL('image/png'),
          scaledSize: { width: 50, height: 50 },
          anchor: { x: 25, y: 25 },
        } as any);
      };
      img.onerror = () => resolve(buildCircleIcon(color));
      img.src = src;
    } catch (e) {
      resolve(buildCircleIcon(color));
    }
  });
}
