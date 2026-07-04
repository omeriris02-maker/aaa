import { Tour, Place, Language } from "../types";
import { Compass, Clock, MapPin, Footprints, ChevronRight, Map, Sparkles } from "lucide-react";
import PlacePhoto from "./PlacePhoto";

interface ToursListProps {
  tours: Tour[];
  places: Place[];
  language: Language;
  onSelectPlace: (place: Place) => void;
  onShowOnMap: (place: Place) => void;
  onShowTourOnMap: (tour: Tour) => void;
  isLight?: boolean;
}

export default function ToursList({
  tours,
  places,
  language,
  onSelectPlace,
  onShowOnMap,
  onShowTourOnMap,
  isLight = true,
}: ToursListProps) {
  
  const getTourName = (tour: Tour) => {
    if (language === "TR") return tour.isim_tr;
    if (language === "ZH") return tour.isim_zh;
    if (language === "AR") return tour.isim_ar;
    return tour.isim_en;
  };

  const getTourDesc = (tour: Tour) => {
    if (language === "TR") return tour.aciklama_tr;
    if (language === "ZH") return tour.aciklama_zh;
    if (language === "AR") return tour.aciklama_ar;
    return tour.aciklama_en;
  };

  const getPlaceById = (id: number): Place | undefined => {
    return places.find((p) => p.id === id);
  };

  const getTourEmoji = (id: number) => {
    switch (id) {
      case 1: return "🕌"; // Mevlana ve Tasavvuf
      case 2: return "🏛️"; // Selçuklu Mimarlık
      case 3: return "👑"; // Osmanlı Kültür
      case 4: return "🏺"; // Arkeoloji ve Etnografya
      case 5: return "✨"; // Şems ve Mevlana
      case 6: return "📜"; // Selçuklu İlim
      default: return "🗺️";
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div className={`flex items-center gap-2 border-b pb-3 ${isLight ? "border-[#E8E8E8]" : "border-[#D4A574]/20"}`}>
        <Compass className="w-5 h-5 text-[#A0423D]" />
        <h2 className={`font-serif font-bold text-lg md:text-xl ${isLight ? "text-[#A0423D]" : "text-white"}`}>
          {language === "TR" ? "Hazır Tur Rotaları" : language === "ZH" ? "推荐导览路线" : language === "AR" ? "مسارات الجولات الجاهزة" : "Guided Tour Packages"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tours.map((tour) => (
          <div
            key={tour.id}
            className={`border rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:border-[#D4A574] transition-all overflow-hidden ${
              isLight ? "bg-[#FDFBF7] border-[#D4A574]/30" : "bg-[#5C1E1B] border-[#D4A574]/15"
            }`}
          >
            <div className="space-y-4">
              {/* Tour Banner Photo with fallback */}
              <div className={`w-full h-[140px] relative -mt-5 -mx-5 mb-4 border-b overflow-hidden ${
                isLight ? "bg-white border-[#E8E8E8]" : "bg-[#A0423D]/20 border-[#D4A574]/15"
              }`} style={{ width: "calc(100% + 40px)" }}>
                {getPlaceById(tour.duraklar[0]) ? (
                  <PlacePhoto 
                    place={getPlaceById(tour.duraklar[0])!} 
                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500" 
                    isLight={isLight}
                    language={language}
                  />
                ) : (
                  <div className={`w-full h-full flex flex-col items-center justify-center p-4 ${
                    isLight 
                      ? "bg-gradient-to-br from-[#FDFBF7] to-[#D4A574]/15 text-[#333333]" 
                      : "bg-gradient-to-br from-[#5C1E1B] to-[#A0423D]/30 text-gray-200"
                  }`}>
                    <Compass className="w-8 h-8 mb-2 text-[#A0423D]" />
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-[#A0423D] text-white text-[9px] font-bold px-2.5 py-1 rounded-md border border-[#D4A574]/30 uppercase tracking-widest flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#D4A574]" />
                  {tour.id === 1 || tour.id === 5 
                    ? (language === "TR" ? "MANEVİ YOLCULUK" : language === "ZH" ? "精神之旅" : language === "AR" ? "رحلة روحية" : "SPIRITUAL JOURNEY") 
                    : (language === "TR" ? "TARİHİ ROTA" : language === "ZH" ? "历史路线" : language === "AR" ? "مسار تاريخي" : "HISTORIC PATHWAY")}
                </div>
              </div>

              <div className="flex justify-between items-start gap-2">
                <h3 className={`font-serif font-bold text-base leading-snug flex items-center gap-2 ${isLight ? "text-[#A0423D]" : "text-[#D4A574]"}`}>
                  <span className="text-xl shrink-0 leading-none">{getTourEmoji(tour.id)}</span>
                  <span>{getTourName(tour)}</span>
                </h3>
              </div>

              <p className={`text-xs leading-relaxed font-medium ${isLight ? "text-[#333333]" : "text-gray-200"}`}>
                {getTourDesc(tour)}
              </p>

              {/* Stats Bar */}
              <div className={`flex gap-4 text-xs font-bold py-2 border-y ${isLight ? "border-[#E8E8E8]" : "border-[#D4A574]/15"}`}>
                <div className="flex items-center gap-1 text-[#D4A574]">
                  <Footprints className="w-4 h-4 text-[#A0423D]" />
                  <span>{tour.mesafe_km} km</span>
                </div>
                <div className={`flex items-center gap-1 ${isLight ? "text-[#333333]" : "text-gray-200"}`}>
                  <Clock className="w-4 h-4 text-[#D4A574]" />
                  <span>{tour.sure_saat} {language === "TR" ? "Saat" : language === "ZH" ? "小时" : language === "AR" ? "ساعات" : "Hours"}</span>
                </div>
              </div>

              {/* Steps/Stops Timeline */}
              <div className="space-y-3 pt-1">
                <h4 className="text-[10px] font-bold text-[#999999] uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4A574]" />
                  {language === "TR" ? "ROTA DURAKLARI" : language === "ZH" ? "路线途径点" : language === "AR" ? "محطات المسار" : "ROUTE STOPS"}
                </h4>
                
                <div className="relative pl-4 space-y-3.5 border-l-2 border-[#A0423D]/30">
                  {tour.duraklar.map((stopId, index) => {
                    const stopPlace = getPlaceById(stopId);
                    if (!stopPlace) return null;
                    return (
                      <div key={stopId} className="relative">
                        {/* Timeline dot */}
                        <div className="absolute -left-[20.5px] top-1.5 w-2 h-2 rounded-full bg-[#D4A574] border-2 border-white" />
                        
                        <div className="flex justify-between items-center text-xs">
                          <button
                            onClick={() => onSelectPlace(stopPlace)}
                            className={`font-bold transition-colors flex items-center gap-1 cursor-pointer ${isLight ? "text-[#333333] hover:text-[#A0423D]" : "text-gray-200 hover:text-[#D4A574]"}`}
                          >
                            <span>{index + 1}.</span>
                            <span className="underline decoration-dotted decoration-[#D4A574] hover:decoration-[#A0423D]">
                              {language === "TR"
                                ? stopPlace.isim_tr
                                : language === "ZH"
                                ? stopPlace.isim_zh
                                : language === "AR"
                                ? stopPlace.isim_ar
                                : stopPlace.isim_en}
                            </span>
                          </button>

                          <button
                            onClick={() => onShowOnMap(stopPlace)}
                            className={`text-[10px] font-bold tracking-wider flex items-center gap-0.5 cursor-pointer ${isLight ? "text-[#A0423D] hover:text-[#D4A574]" : "text-[#D4A574] hover:text-white"}`}
                          >
                            MAP <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className={`mt-5 pt-4 border-t flex gap-2 ${isLight ? "border-[#E8E8E8]" : "border-[#D4A574]/15"}`}>
              <button
                onClick={() => onShowTourOnMap(tour)}
                className={`flex-1 flex items-center justify-center gap-2 border font-bold text-xs py-3 rounded-xl transition-all cursor-pointer shadow-sm ${
                  isLight 
                    ? "bg-[#A0423D]/5 hover:bg-[#A0423D]/10 border-[#A0423D]/20 text-[#A0423D]" 
                    : "bg-[#A0423D]/20 hover:bg-[#A0423D]/30 border-[#D4A574]/20 text-[#D4A574]"
                }`}
              >
                <Map className="w-4 h-4 text-[#A0423D]" />
                {language === "TR"
                  ? "Haritada Rotayı Göster"
                  : language === "ZH"
                  ? "在地图上显示完整路线"
                  : language === "AR"
                  ? "عرض المسار بالكامل على الخريطة"
                  : "Show Full Route on Map"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
