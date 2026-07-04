import { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import { getPlacePhotoKey, getPlaceAllPhotos, getCategoryPlaceholder } from "../data";
import { PhotoItem, Language } from "../types";

export function getPlaceStructuredPhotos(place: { id: number; isim_tr: string; isim_en: string; isim_zh?: string; isim_ar?: string; kategori: string }): PhotoItem[] {
  // If the place already has structured photograph arrays, return it
  if ("fotograf" in place && Array.isArray((place as any).fotograf) && (place as any).fotograf.length > 0) {
    return (place as any).fotograf;
  }

  const key = getPlacePhotoKey(place);
  const rawUrls = getPlaceAllPhotos(key);

  if (rawUrls.length === 0) {
    return [];
  }

  return rawUrls.map((url, index) => {
    let source = "Local / Creative Commons";
    let license = "Free Use / Public Domain";

    if (url.includes("kulturportali.gov.tr")) {
      source = "Culture Portal";
      license = "Official Tourism Domain / Public Domain";
    } else if (url.includes("wikimedia.org") || url.includes("wikipedia.org")) {
      source = "Wikimedia Commons";
      license = "CC-BY-SA 4.0 / CC0";
    }

    const caption_tr = index === 0 ? `${place.isim_tr} Genel Görünümü` : `${place.isim_tr} Fotoğrafı #${index + 1}`;
    const caption_en = index === 0 ? `General view of ${place.isim_en}` : `View of ${place.isim_en} #${index + 1}`;
    const caption_zh = index === 0 ? `${place.isim_zh || place.isim_en}全景` : `${place.isim_zh || place.isim_en}照片 #${index + 1}`;
    const caption_ar = index === 0 ? `منظر عام لـ ${place.isim_ar || place.isim_en}` : `صورة ${place.isim_ar || place.isim_en} #${index + 1}`;

    return {
      url,
      caption_tr,
      caption_en,
      caption_zh,
      caption_ar,
      source,
      license
    };
  });
}

function isValidUrl(url: string): boolean {
  if (!url) return false;
  if (url.startsWith("/")) return true;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

interface PlacePhotoProps {
  place: {
    id: number;
    isim_tr: string;
    isim_en: string;
    isim_zh?: string;
    isim_ar?: string;
    kategori: string;
    fotograf?: PhotoItem[];
  };
  className?: string;
  alt?: string;
  photoIndex?: number;
  language?: Language;
  isLight?: boolean;
}

export default function PlacePhoto({
  place,
  className = "",
  alt,
  photoIndex = 0,
  language = "TR",
  isLight = true
}: PlacePhotoProps) {
  const photos = getPlaceStructuredPhotos(place);
  
  const [resolvedIndex, setResolvedIndex] = useState(photoIndex);
  const [hasFailedAll, setHasFailedAll] = useState(false);

  useEffect(() => {
    setResolvedIndex(photoIndex);
    setHasFailedAll(false);
  }, [place.id, photoIndex]);

  useEffect(() => {
    if (photos.length === 0) {
      setHasFailedAll(true);
    } else if (resolvedIndex >= photos.length) {
      setHasFailedAll(true);
    } else {
      setHasFailedAll(false);
    }
  }, [resolvedIndex, photos.length]);

  const placeName = language === "TR" 
    ? place.isim_tr 
    : language === "ZH" 
      ? (place.isim_zh || place.isim_en) 
      : language === "AR" 
        ? (place.isim_ar || place.isim_en) 
        : place.isim_en;

  const currentPhoto = photos[resolvedIndex] || photos[0];

  if (hasFailedAll || photos.length === 0 || !currentPhoto) {
    let containerBg = isLight 
      ? "bg-rose-50/70 text-[#A0423D] border-rose-100/60" 
      : "bg-[#A0423D]/20 text-[#D4A574] border-[#D4A574]/15";
    let iconSvg = (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 shrink-0">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    );

    if (place.kategori === "Cami") {
      containerBg = isLight 
        ? "bg-red-50/70 text-[#A0423D] border-red-100/60" 
        : "bg-[#A0423D]/25 text-[#D4A574] border-[#D4A574]/20";
      iconSvg = (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" className="w-8 h-8 shrink-0">
          <path d="M12 2C9 6 8 10 8 14h8c0-4-1-8-4-12z" />
          <path d="M6 14h12v6H6z" />
          <path d="M12 14v6" />
          <path d="M12 2v2" />
        </svg>
      );
    } else if (place.kategori === "Müze") {
      containerBg = isLight 
        ? "bg-amber-50/70 text-[#D4A574] border-amber-100/60" 
        : "bg-[#5C1E1B] text-[#D4A574] border-[#D4A574]/15";
      iconSvg = (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" className="w-8 h-8 shrink-0">
          <path d="M4 20h16M3 20v-2h18v2M4 18v-8h3v8M10 18v-8h3v8M16 18v-8h3v8M3 10l9-6 9 6Z" />
        </svg>
      );
    } else if (place.kategori === "Medrese") {
      containerBg = isLight 
        ? "bg-orange-50/70 text-[#B45309] border-orange-100/60" 
        : "bg-[#5C1E1B] text-[#D4A574] border-[#D4A574]/15";
      iconSvg = (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" className="w-8 h-8 shrink-0">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    } else if (place.kategori === "UNESCO") {
      containerBg = isLight 
        ? "bg-indigo-50/70 text-[#312E81] border-indigo-100/60" 
        : "bg-[#5C1E1B] text-[#D4A574] border-[#D4A574]/15";
      iconSvg = (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" className="w-8 h-8 shrink-0">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          <path d="M2 12h20" />
        </svg>
      );
    } else if (place.kategori === "Park") {
      containerBg = isLight 
        ? "bg-emerald-50/70 text-[#059669] border-emerald-100/60" 
        : "bg-[#5C1E1B] text-[#D4A574] border-[#D4A574]/15";
      iconSvg = (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" className="w-8 h-8 shrink-0">
          <path d="M12 2L3 9h18v0z" />
          <path d="M12 6l-7 6h14z" />
          <path d="M12 10l-8 7h16z" />
          <path d="M12 17v5" />
        </svg>
      );
    } else if (place.kategori === "Türbe") {
      containerBg = isLight 
        ? "bg-purple-50/70 text-[#6B21A8] border-purple-100/60" 
        : "bg-[#5C1E1B] text-[#D4A574] border-[#D4A574]/15";
      iconSvg = (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" className="w-8 h-8 shrink-0">
          <path d="M12 3a8 8 0 0 0-8 8v9h16v-9a8 8 0 0 0-8-8z" />
          <path d="M12 3v3 M9 20v-5h6v5" />
        </svg>
      );
    }

    return (
      <div 
        id={`photo-fallback-${place.id}`}
        className={`relative overflow-hidden flex flex-col items-center justify-center p-6 text-center select-none border rounded-xl shadow-inner transition-all duration-300 ${containerBg} ${className}`}
        style={{ minHeight: "150px" }}
      >
        {/* Soft elegant geometric/pattern background details */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />
        
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="p-2.5 bg-black/5 rounded-full mb-3 backdrop-blur-sm shadow-sm border border-black/5 flex items-center justify-center">
            {iconSvg}
          </div>
          <span className="text-xs font-bold uppercase tracking-widest block font-sans max-w-full px-2 leading-snug drop-shadow-sm">
            {placeName}
          </span>
          <div className="mt-1.5 px-2.5 py-0.5 bg-black/10 rounded-md text-[9px] font-mono tracking-widest uppercase opacity-80 inline-block font-bold">
            {place.kategori}
          </div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={currentPhoto.url}
      alt={alt || placeName}
      referrerPolicy="no-referrer"
      loading="lazy"
      className={`${className}`}
      onError={() => {
        const nextIndex = resolvedIndex + 1;
        if (nextIndex < photos.length) {
          setResolvedIndex(nextIndex);
        } else {
          setHasFailedAll(true);
        }
      }}
    />
  );
}
