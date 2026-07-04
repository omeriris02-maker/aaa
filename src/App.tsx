import React, { useState, useEffect, FormEvent } from "react";
import { TRANSLATIONS, PLACES, TOURS, getCategoryPlaceholder } from "./data";
import { Place, Language, Tour } from "./types";
import MaplibreMap from "./components/MaplibreMap";
import PlaceDetail from "./components/PlaceDetail";
import PlacePhoto from "./components/PlacePhoto";
import ToursList from "./components/ToursList";
import EventsList from "./components/EventsList";
import PersonalPlan from "./components/PersonalPlan";
import PracticalInfo from "./components/PracticalInfo";
import AIGuide from "./components/AIGuide";
import HotelBranding from "./components/HotelBranding";
import { 
  Home, Map, MapPin, Compass, Utensils, Calendar, 
  Heart, Sparkles, Languages, CloudSun,
  Landmark, PhoneCall, ChevronRight, Settings,
  Clock, Sun, Moon, Star, Check, Send, AlertCircle,
  Search, X, MessageCircle
} from "lucide-react";

type Tab = "HOME" | "MAP" | "PERSONAL" | "EXPLORE" | "SETTINGS";
type SubView = "PLACES" | "TOURS" | "EVENTS" | "PRACTICAL" | "AI_GUIDE" | "HOTEL";

interface WeatherData {
  temp: number;
  condition_tr: string;
  condition_en: string;
  condition_zh: string;
  condition_ar: string;
  icon: string;
  humidity: string;
  wind: string;
}

const WIKIPEDIA_PAGES: Record<number, { tr: string; en: string }> = {
  1: { tr: "Mevlâna_Müzesi", en: "Mevlana_Museum" },
  2: { tr: "İnce_Minareli_Medrese", en: "Ince_Minaret_Madrasa" },
  3: { tr: "Karatay_Medresesi", en: "Karatay_Madrasa" },
  4: { tr: "Alâeddin_Camii", en: "Alâeddin_Mosque" },
  5: { tr: "Sırçalı_Medrese", en: "Sırçalı_Medrese" },
  6: { tr: "Sahib_Ata_Külliyesi", en: "Sahib_Ata_Complex" },
  7: { tr: "Şerâfeddin_Camii", en: "" },
  8: { tr: "Aziziye_Camii_(Konya)", en: "Aziziye_Mosque,_Konya" },
  9: { tr: "Konya_Arkeoloji_Müzesi", en: "Konya_Archaeological_Museum" },
  11: { tr: "Sille", en: "Sille,_Konya" },
  12: { tr: "Konya_Tropikal_Kelebek_Bahçesi", en: "Konya_Tropical_Butterfly_Garden" },
  14: { tr: "Kilistra", en: "Kilistra" },
  17: { tr: "Beyşehir_Gölü", en: "Lake_Beyşehir" },
  18: { tr: "Meram", en: "Meram" }
};

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("HOME");
  const [activeSubView, setActiveSubView] = useState<SubView | null>(null);
  const [language, setLanguage] = useState<Language>("TR");
  const [theme, setTheme] = useState<"LIGHT" | "DARK_BORDO">("LIGHT");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [showAllMosques, setShowAllMosques] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [placesList, setPlacesList] = useState<Place[]>(PLACES);

  // Settings tab custom state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackEmail, setFeedbackEmail] = useState("");

  // Search state on Homepage
  const [homeSearchQuery, setHomeSearchQuery] = useState("");
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);

  // Initialize Language, Theme & Favorites from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem("sircali_lang");
    if (savedLang === "TR" || savedLang === "EN" || savedLang === "ZH" || savedLang === "AR") {
      setLanguage(savedLang);
    } else {
      localStorage.setItem("sircali_lang", "TR");
    }

    const savedTheme = localStorage.getItem("sircali_theme");
    if (savedTheme === "LIGHT" || savedTheme === "DARK_BORDO") {
      setTheme(savedTheme);
    } else {
      localStorage.setItem("sircali_theme", "LIGHT");
    }

    const savedFavs = localStorage.getItem("sircali_favorites");
    if (savedFavs) {
      try {
        setFavorites(JSON.parse(savedFavs));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Fetch Weather from our Express API proxy on load
  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch("/api/weather");
        if (res.ok) {
          const data = await res.json();
          setWeather(data);
        }
      } catch (err) {
        console.error("Failed to fetch weather data from API:", err);
      }
    }
    fetchWeather();
  }, []);

  // Wikipedia REST API integration: called on load to enrich top 5 most important curated places
  useEffect(() => {
    async function loadWikipediaData() {
      try {
        const targetIds = [1, 2, 3, 4, 5]; // Top 5 central places to enrich first
        let changed = false;

        const results = await Promise.all(
          placesList.map(async (p) => {
            if (!targetIds.includes(p.id)) return p;
            const pages = WIKIPEDIA_PAGES[p.id];
            if (!pages) return p;

            try {
              let clonedPlace = { ...p };
              let modified = false;

              const headers = {
                "User-Agent": "SircaliApp/1.0 (omeriris02@gmail.com; mailto:omeriris02@gmail.com)"
              };

              // Fetch Turkish Wikipedia info
              if (pages.tr) {
                const trRes = await fetch(
                  `https://tr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pages.tr)}`,
                  { headers }
                );
                if (trRes.ok) {
                  const trData = await trRes.json();
                  if (trData && trData.extract && trData.type !== "disambiguation") {
                    clonedPlace.tarihce_tr = trData.extract;
                    clonedPlace.aciklama_kisa_tr = trData.description || clonedPlace.aciklama_kisa_tr;
                    modified = true;
                  }
                }
              }

              // Fetch English Wikipedia info
              if (pages.en) {
                const enRes = await fetch(
                  `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pages.en)}`,
                  { headers }
                );
                if (enRes.ok) {
                  const enData = await enRes.json();
                  if (enData && enData.extract && enData.type !== "disambiguation") {
                    clonedPlace.tarihce_en = enData.extract;
                    clonedPlace.aciklama_kisa_en = enData.description || clonedPlace.aciklama_kisa_en;
                    modified = true;
                  }
                }
              }

              if (modified) {
                changed = true;
                return clonedPlace;
              }
            } catch (err) {
              console.warn(`Wikipedia page load failed for ID ${p.id}:`, err);
            }
            return p;
          })
        );

        if (changed) {
          setPlacesList(results);
        }
      } catch (error) {
        console.error("Wikipedia API fetch error on load:", error);
      }
    }
    loadWikipediaData();
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("sircali_lang", lang);
  };

  const changeTheme = (newTheme: "LIGHT" | "DARK_BORDO") => {
    setTheme(newTheme);
    localStorage.setItem("sircali_theme", newTheme);
  };

  const handleToggleFavorite = (id: number) => {
    let updated: number[];
    if (favorites.includes(id)) {
      updated = favorites.filter((favId) => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem("sircali_favorites", JSON.stringify(updated));
  };

  const handleSelectPlace = (place: Place) => {
    setSelectedPlace(place);
  };

  const handleShowOnMap = (place: Place) => {
    setSelectedPlace(place);
    setActiveTab("MAP");
    setActiveSubView(null);
  };

  const handleShowTourOnMap = (tour: Tour) => {
    setSelectedTour(tour);
    setActiveTab("MAP");
    setActiveSubView(null);
  };

  const handleClearTour = () => {
    setSelectedTour(null);
  };

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    // Elegant custom confirmation popup
    const popup = document.createElement("div");
    popup.className = "fixed bottom-12 left-1/2 -translate-x-1/2 bg-[#A0423D] border border-[#D4A574] text-white font-sans font-semibold text-xs px-6 py-3.5 rounded-xl shadow-2xl z-[9999] text-center max-w-sm animate-bounce";
    
    let msg = "Geri bildiriminiz Sırçalı Misafir İlişkileri masasına iletildi! Teşekkür ederiz.";
    if (language === "EN") msg = "Your feedback has been sent to Sırçalı Guest Relations! Thank you.";
    if (language === "ZH") msg = "您的反馈已发送至塞尔恰勒客宾服务台！谢谢您的宝贵意见。";
    if (language === "AR") msg = "تم إرسال ملاحظاتك إلى مكتب علاقات الضيوف في سيرتشالي! شكراً لك.";
    
    popup.innerHTML = `
      <div class="font-bold text-[#D4A574] mb-1">🛎️ Sırçalı Guest Relations</div>
      <div>${msg}</div>
    `;
    
    document.body.appendChild(popup);
    setFeedbackText("");
    setFeedbackEmail("");
    setTimeout(() => popup.remove(), 4000);
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS["TR"];
  const isLight = theme === "LIGHT";

  const renderWeatherIcon = (iconName: string) => {
    switch (iconName) {
      case "sun":
        return <Sun className="w-8 h-8 text-[#D4A574]" />;
      case "moon":
        return <Moon className="w-8 h-8 text-[#D4A574]" />;
      case "cloud-sun":
      default:
        return <CloudSun className="w-8 h-8 text-[#D4A574]" />;
    }
  };

  const getWeatherCondition = () => {
    if (!weather) return "";
    if (language === "TR") return weather.condition_tr;
    if (language === "ZH") return weather.condition_zh;
    if (language === "AR") return weather.condition_ar;
    return weather.condition_en;
  };

  // Filter places for Homepage Search
  const filteredHomePlaces = placesList.filter((place) => {
    const name = (language === "TR" ? place.isim_tr : language === "ZH" ? place.isim_zh : language === "AR" ? place.isim_ar : place.isim_en).toLowerCase();
    return name.includes(homeSearchQuery.toLowerCase());
  });

  return (
    <div className={`min-h-screen ${isLight ? "bg-[#FFFFFF] text-[#333333]" : "bg-[#A0423D] text-[#FFFFFF]"} font-sans flex flex-col md:flex-row select-none transition-colors duration-300`}>
      
      {/* Desktop Left Sidebar */}
      <aside className={`hidden md:flex md:w-64 ${isLight ? "bg-[#FDFBF7] border-r border-[#E8E8E8]" : "bg-[#5C1E1B] border-r border-[#D4A574]/20"} flex-col justify-between shrink-0 transition-colors duration-300`}>
        <div className="p-5 space-y-6">
          {/* Sırçalı Hotel Logo */}
          <div className={`flex items-center gap-2.5 border-b ${isLight ? "border-[#E8E8E8]" : "border-[#D4A574]/20"} pb-4`}>
            <div className="w-10 h-10 rounded-full bg-[#A0423D] border border-[#D4A574]/30 flex items-center justify-center shrink-0 shadow-sm">
              <svg className="w-6.5 h-6.5 text-white" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round">
                <rect x="15" y="15" width="70" height="70" strokeWidth="2.2" />
                <path d="M 15 28 H 85" strokeWidth="1.8" />
                <path d="M 33 15 V 32 H 67 V 15" strokeWidth="1.8" />
                <path d="M 38 85 V 54 C 38 45, 44 41, 50 37" strokeWidth="3.2" />
                <path d="M 62 85 V 54 C 62 45, 56 41, 50 37" strokeWidth="3.2" />
                <path d="M 50 37 C 44 31, 44 23, 50 17 C 56 23, 56 31, 50 37 Z" strokeWidth="2.5" />
              </svg>
            </div>
            <div className="text-left">
              <h1 className="font-serif font-bold text-sm tracking-widest text-[#A0423D] dark:text-[#D4A574] leading-tight">
                SIRÇALI HOTEL
              </h1>
              <span className={`text-[8px] tracking-widest ${isLight ? "text-[#999999]" : "text-gray-200"} block font-bold`}>
                KONYA VISITOR GUIDE
              </span>
            </div>
          </div>

          {/* Desktop Navigation Menu (5 main items + direct Subview launch triggers) */}
          <nav className="space-y-1 text-left">
            {[
              { id: "HOME", label: language === "TR" ? "Anasayfa" : language === "ZH" ? "首页" : language === "AR" ? "الرئيسية" : "Homepage", icon: Home, isSub: false },
              { id: "MAP", label: t.mapTab, icon: Map, isSub: false },
              { id: "PERSONAL", label: t.favoritesTab, icon: Heart, isSub: false },
              { id: "EXPLORE", label: t.diningTab, icon: Compass, isSub: false },
              { id: "SETTINGS", label: t.settingsTab, icon: Settings, isSub: false },
            ].map((menu) => {
              const Icon = menu.icon;
              const isSelected = activeTab === menu.id && activeSubView === null;
              return (
                <button
                  key={menu.id}
                  onClick={() => {
                    setActiveTab(menu.id as Tab);
                    setActiveSubView(null);
                    setSelectedPlace(null);
                  }}
                  className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#A0423D] text-white border-l-4 border-[#D4A574]"
                      : isLight 
                        ? "text-[#333333] hover:bg-[#E8E8E8]/55" 
                        : "text-gray-100 hover:bg-[#5C1E1B]/80"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? "text-[#D4A574]" : isLight ? "text-[#A0423D]" : "text-[#D4A574]"}`} />
                  <span>{menu.label}</span>
                </button>
              );
            })}

            {/* Quick divider */}
            <div className={`my-3 border-t ${isLight ? "border-[#E8E8E8]" : "border-[#D4A574]/20"}`} />

            {/* Sub-view shortcuts in Desktop Sidebar */}
            <span className={`text-[9px] font-bold tracking-widest ${isLight ? "text-[#999999]" : "text-[#D4A574]"} uppercase px-3 block mb-1.5`}>
              {language === "TR" ? "HIZLI KEŞFET" : "EXPLORE QUICK"}
            </span>

            {[
              { id: "PLACES", label: t.placesTab, icon: Landmark },
              { id: "TOURS", label: t.toursTab, icon: Compass },
              { id: "EVENTS", label: t.eventsTab, icon: Calendar },
              { id: "AI_GUIDE", label: t.aiConciergeTab, icon: Sparkles },
            ].map((sub) => {
              const Icon = sub.icon;
              const isSelected = activeSubView === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    setActiveSubView(sub.id as SubView);
                    setSelectedPlace(null);
                  }}
                  className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#D4A574] text-[#333333]"
                      : isLight 
                        ? "text-[#333333] hover:bg-[#E8E8E8]/40" 
                        : "text-gray-200 hover:bg-[#5C1E1B]/50"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{sub.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Desktop Sidebar Bottom Footer */}
        <div className={`p-4 border-t ${isLight ? "border-[#E8E8E8]" : "border-[#D4A574]/20"} space-y-3`}>
          <div className="text-[10px] text-[#999999] font-medium tracking-wide">
            © 2026 Sırçalı Hotel Konya
          </div>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <main className={`flex-1 flex flex-col min-w-0 pb-[75px] md:pb-0 h-screen overflow-hidden ${isLight ? "bg-[#FFFFFF]" : "bg-[#A0423D]"} transition-colors duration-300`}>
        
        {/* Mobile Header / Brand */}
        <header className={`md:hidden ${isLight ? "bg-[#FDFBF7] border-b border-[#E8E8E8]" : "bg-[#5C1E1B] border-b border-[#D4A574]/25"} px-4 py-3 flex justify-between items-center z-10 shrink-0 transition-all`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#A0423D] border border-[#D4A574]/30 flex items-center justify-center shrink-0 shadow-sm">
              <svg className="w-5.5 h-5.5 text-white" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinejoin="round" strokeLinecap="round">
                <rect x="15" y="15" width="70" height="70" strokeWidth="2.2" />
                <path d="M 15 28 H 85" strokeWidth="1.8" />
                <path d="M 33 15 V 32 H 67 V 15" strokeWidth="1.8" />
                <path d="M 38 85 V 54 C 38 45, 44 41, 50 37" strokeWidth="3.2" />
                <path d="M 62 85 V 54 C 62 45, 56 41, 50 37" strokeWidth="3.2" />
                <path d="M 50 37 C 44 31, 44 23, 50 17 C 56 23, 56 31, 50 37 Z" strokeWidth="2.5" />
              </svg>
            </div>
            <h1 className="font-serif font-bold text-[13px] tracking-wider text-[#A0423D] dark:text-[#D4A574]">
              SIRÇALI HOTEL
            </h1>
          </div>

          {/* Quick Language Toggle */}
          <div className={`flex gap-1 text-[9px] font-bold ${isLight ? "bg-[#FFFFFF] border-[#E8E8E8]" : "bg-[#A0423D] border-[#D4A574]/25"} px-1.5 py-1 rounded-md border`}>
            {(["TR", "EN", "ZH", "AR"] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                className={`px-1 rounded-md cursor-pointer transition-colors ${
                  language === lang 
                    ? (isLight ? "text-[#A0423D]" : "text-[#D4A574]") 
                    : (isLight ? "text-[#999999] hover:text-[#A0423D]" : "text-white/70 hover:text-white")
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </header>

        {/* Scrollable / Interactive screen container */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          
          {/* Detail Overlay Overlay Page */}
          {selectedPlace ? (
            <PlaceDetail
              place={selectedPlace}
              language={language}
              onClose={() => setSelectedPlace(null)}
              isFavorite={favorites.includes(selectedPlace.id)}
              onToggleFavorite={handleToggleFavorite}
              isLight={isLight}
              onGetDirections={(place) => {
                window.open(`https://www.google.com/maps/dir/?api=1&destination=${place.koordinatlar.lat},${place.koordinatlar.lng}`, "_blank");
              }}
            />
          ) : activeSubView ? (
            /* SUB-VIEW RENDERING WITH LUXURIOUS BACK HEADER */
            <div className="space-y-6 animate-fade-in">
              <div className={`flex justify-between items-center pb-3 border-b ${isLight ? "border-[#E8E8E8]" : "border-[#D4A574]/20"}`}>
                <button
                  onClick={() => setActiveSubView(null)}
                  className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border cursor-pointer ${
                    isLight 
                      ? "bg-[#FDFBF7] border-[#E8E8E8] text-[#A0423D] hover:bg-white" 
                      : "bg-[#5C1E1B] border-[#D4A574]/20 text-white hover:bg-[#5C1E1B]/85"
                  }`}
                >
                  ← {language === "TR" ? "Anasayfaya Dön" : "Back to Home"}
                </button>
                <span className={`text-[10px] font-bold tracking-widest ${isLight ? "text-[#999999]" : "text-[#D4A574]"} uppercase`}>
                  Sırçalı Concierge Service
                </span>
              </div>

              {activeSubView === "PLACES" && (
                <div className="space-y-6 text-left">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="font-serif font-bold text-lg md:text-xl flex items-center gap-2">
                      <Landmark className="w-5 h-5 text-[#D4A574]" />
                      <span>{t.placesTab}</span>
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {placesList.map((place) => {
                      const name = language === "TR" ? place.isim_tr : language === "ZH" ? place.isim_zh : language === "AR" ? place.isim_ar : place.isim_en;
                      const desc = language === "TR" ? place.aciklama_kisa_tr : language === "ZH" ? place.aciklama_kisa_zh : language === "AR" ? place.aciklama_kisa_ar : place.aciklama_kisa_en;
                      return (
                        <div
                          key={place.id}
                          className={`border rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm transition-all ${
                            isLight 
                              ? "bg-[#FDFBF7] border-[#E8E8E8] hover:border-[#D4A574]" 
                              : "bg-[#5C1E1B] border-[#D4A574]/20 hover:border-[#D4A574]"
                          }`}
                        >
                          <div className="relative h-[150px] bg-[#5C1E1B]">
                            <PlacePhoto
                              place={place}
                              isLight={isLight}
                              className="w-full h-full object-cover opacity-90"
                            />
                            <span className="absolute top-3 left-3 bg-[#A0423D] text-white text-[9px] font-bold px-2.5 py-0.5 rounded border border-[#D4A574]/20 uppercase tracking-widest">
                              {place.kategori}
                            </span>
                          </div>

                          <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                            <div className="space-y-1.5">
                              <h3 className="font-serif font-bold text-sm leading-tight">
                                {name}
                              </h3>
                              <div className="flex items-center gap-1 text-[10px] text-[#D4A574]">
                                <Star className="w-3 h-3 fill-[#D4A574] stroke-[#D4A574]" />
                                <span className="font-bold">{place.puan}</span>
                                <span className={isLight ? "text-[#999999]" : "text-gray-300"}>({place.yorum_sayisi})</span>
                              </div>
                              <p className={`text-xs leading-relaxed font-normal line-clamp-3 ${isLight ? "text-[#333333]" : "text-gray-200"}`}>
                                {desc}
                              </p>
                            </div>

                            <div className="pt-3 border-t border-[#D4A574]/15 flex justify-between items-center text-xs">
                              <button
                                onClick={() => handleShowOnMap(place)}
                                className="text-[#D4A574] font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                              >
                                {language === "TR" ? "Haritada Gör" : "Show Map"}
                              </button>

                              <button
                                onClick={() => handleSelectPlace(place)}
                                className="bg-[#A0423D] hover:bg-opacity-90 text-white font-bold px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider border border-[#D4A574]/20 cursor-pointer"
                              >
                                {language === "TR" ? "Detayları Gör" : "Explore Detail"}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeSubView === "TOURS" && (
                <ToursList
                  tours={TOURS}
                  places={placesList}
                  language={language}
                  onSelectPlace={handleSelectPlace}
                  onShowOnMap={handleShowOnMap}
                  onShowTourOnMap={handleShowTourOnMap}
                  isLight={isLight}
                />
              )}

              {activeSubView === "EVENTS" && (
                <EventsList language={language} isLight={isLight} />
              )}

              {activeSubView === "PRACTICAL" && (
                <PracticalInfo language={language} isLight={isLight} />
              )}

              {activeSubView === "AI_GUIDE" && (
                <AIGuide language={language} isLight={isLight} />
              )}

              {activeSubView === "HOTEL" && (
                <HotelBranding language={language} isLight={isLight} />
              )}
            </div>
          ) : (
            /* ACTIVE TAB CONTENT AREA */
            <>
              {/* HOME TAB VIEW */}
              {activeTab === "HOME" && (
                <div className="space-y-6 text-left">
                  
                  {/* Welcome banner */}
                  <div className="bg-gradient-to-r from-[#A0423D] to-[#5C1E1B] border border-[#D4A574]/30 p-6 rounded-2xl text-white space-y-4 shadow-xl relative overflow-hidden">
                    {/* Decorative geometry background */}
                    <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-6 translate-x-6">
                      <svg width="240" height="240" viewBox="0 0 100 100" fill="none">
                        <circle cx="50" cy="50" r="45" stroke="#FFFFFF" strokeWidth="2"/>
                        <path d="M50 15 L80 40 L68 78 L32 78 L20 40 Z" stroke="#FFFFFF" strokeWidth="2" fill="none"/>
                      </svg>
                    </div>

                    <span className="bg-[#333333]/30 border border-[#D4A574]/35 text-[#D4A574] text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
                      {language === "TR" ? "SIRÇALI HOTEL - KONYA TOURISM GUIDE" : language === "ZH" ? "塞尔恰勒酒店 - 科尼亚旅游指南" : language === "AR" ? "فندق سيرتشالي - دليل قونية السياحي" : "SIRÇALI HOTEL - KONYA TOURISM GUIDE"}
                    </span>
                    <h2 className="font-serif font-bold text-xl md:text-3xl text-white leading-snug tracking-wide">
                      {t.welcome}
                    </h2>
                    <p className="text-xs md:text-sm text-gray-200 leading-relaxed font-light max-w-xl">
                      {language === "TR"
                        ? "Kadim Selçuklu başkenti Konya'nın asırları aşan camilerini, UNESCO dünya mirası eserlerini, saray lezzetlerini ve gizemli tasavvuf derviş yollarını Sırçalı rehberliğinde keşfedin."
                        : language === "ZH"
                        ? "在塞尔恰勒酒店的指引下，探索拥有悠久历史清真寺的塞尔柱古都科尼亚，探寻联合国教科文组织世界遗产、传统美食与神秘的旋转舞僧修道院。"
                        : language === "AR"
                        ? "استكشف معالم عاصمة السلاجقة القديمة قونية؛ من مساجدها التاريخية الضاربة في القدم، وآثار اليونسكو العالمية، ومأكولات القصر التقليدية، ومسارات الدراويش الصوفية برفقة سيرتشالي."
                        : "Discover the ancient Seljuk capital Konya with its centuries-old mosques, sacred UNESCO sites, traditional culinary treats, and the mystical trails of Sufi whirling dervishes with Sırçalı's guide."}
                    </p>
                    <button
                      onClick={() => setActiveTab("MAP")}
                      className="bg-[#D4A574] hover:bg-white text-[#333333] font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                    >
                      <Compass className="w-4 h-4" />
                      <span>{t.discoverBtn}</span>
                    </button>
                  </div>

                  {/* Dynamic Weather and Sırçalı Hotel concierge call widget */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Live Weather Box */}
                    {weather && (
                      <div className={`border p-4 rounded-xl flex items-center justify-between shadow-sm col-span-1 md:col-span-2 ${
                        isLight ? "bg-[#FDFBF7] border-[#E8E8E8]" : "bg-[#5C1E1B] border-[#D4A574]/15"
                      }`}>
                        <div className="flex items-center gap-4">
                          {renderWeatherIcon(weather.icon)}
                          <div className="text-left">
                            <span className="text-[10px] text-[#999999] uppercase tracking-widest font-bold block">
                              {t.weatherTitle}
                            </span>
                            <span className="font-serif font-bold text-lg block mt-0.5">
                              {weather.temp}°C
                            </span>
                            <span className="text-xs text-[#D4A574] font-semibold">{getWeatherCondition()}</span>
                          </div>
                        </div>

                        <div className="text-right text-[10px] text-[#999999] space-y-0.5 shrink-0">
                          <div>Humidity: {weather.humidity}</div>
                          <div>Wind: {weather.wind}</div>
                          <div className="text-[#D4A574] font-bold">Konya Center</div>
                        </div>
                      </div>
                    )}

                    {/* Sırçalı Front Desk Card */}
                    <div className={`border p-4 rounded-xl flex items-center justify-between shadow-sm ${
                      isLight ? "bg-[#FDFBF7] border-[#E8E8E8]" : "bg-[#5C1E1B] border-[#D4A574]/15"
                    }`}>
                      <div className="text-left space-y-2 w-full">
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-[#999999] uppercase tracking-widest font-bold block">
                            {language === "TR" ? "RESEPSİYON / CONCIERGE" : language === "ZH" ? "前台 / 礼宾部" : language === "AR" ? "الاستقبال / الكونسيرج" : "RECEPTION / CONCIERGE"}
                          </span>
                          <span className="text-xs font-serif font-bold block">
                            {language === "TR" ? "Sırçalı Misafir Desteği" : language === "ZH" ? "塞尔恰勒宾客支持" : language === "AR" ? "دعم ضيوف سيرتشالي" : "Sırçalı Guest Support"}
                          </span>
                        </div>
                        
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 pt-1">
                          <a href="tel:+903325234242" className="text-xs text-[#D4A574] font-bold hover:underline flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-[#A0423D]/10 flex items-center justify-center shrink-0">
                              <PhoneCall className="w-3 h-3 text-[#D4A574]" />
                            </span>
                            <span>+90 332 523 4242</span>
                          </a>
                          <a href="https://wa.me/905015234242" target="_blank" rel="noopener noreferrer" className="text-xs text-[#25D366] font-bold hover:underline flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0">
                              <MessageCircle className="w-3 h-3 text-[#25D366]" />
                            </span>
                            <span>+90 501 523 4242</span>
                            <span className="text-[10px] text-gray-400 font-normal">({language === "TR" ? "WhatsApp" : language === "ZH" ? "WhatsApp客服" : language === "AR" ? "واتساب" : "WhatsApp"})</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Search Bar on Homepage */}
                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-sm flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#D4A574]" />
                      <span>{language === "TR" ? "Hızlı Mekan Arama" : "Search Places & Mosques"}</span>
                    </h3>
                    <div className={`border rounded-xl px-4 py-3 shadow-sm flex items-center gap-2 max-w-xl ${
                      isLight ? "bg-[#FDFBF7] border-[#E8E8E8]" : "bg-[#5C1E1B] border-[#D4A574]/15"
                    }`}>
                      <Search className="w-4.5 h-4.5 text-[#D4A574]" />
                      <input
                        id="home-search"
                        type="text"
                        placeholder={language === "TR" ? "Mevlana, cami veya müze adı yazın..." : "Type Mevlana, mosque or museum name..."}
                        value={homeSearchQuery}
                        onChange={(e) => setHomeSearchQuery(e.target.value)}
                        className="bg-transparent border-none outline-none text-xs w-full placeholder-[#999999] font-medium text-[#333333] dark:text-white"
                      />
                      {homeSearchQuery && (
                        <button onClick={() => setHomeSearchQuery("")} className="text-[#999999]">
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Filter results display */}
                    {homeSearchQuery && (
                      <div className={`p-4 border rounded-xl shadow-lg space-y-2.5 animate-fade-in ${
                        isLight ? "bg-white border-[#E8E8E8]" : "bg-[#5C1E1B] border-[#D4A574]/20"
                      }`}>
                        <div className="text-[10px] font-bold text-[#999999]">
                          {language === "TR" ? `Arama sonuçları (${filteredHomePlaces.length} bulundu):` : `Search results (${filteredHomePlaces.length} found):`}
                        </div>
                        {filteredHomePlaces.length === 0 ? (
                          <div className="text-xs text-[#999999] font-medium py-1">
                            {language === "TR" ? "Aradığınız kriterde bir mekan bulunamadı." : "No matching places found."}
                          </div>
                        ) : (
                          <div className="max-h-[220px] overflow-y-auto space-y-1.5">
                            {filteredHomePlaces.map((p) => (
                              <div
                                key={p.id}
                                onClick={() => handleSelectPlace(p)}
                                className={`flex justify-between items-center px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                                  isLight ? "hover:bg-gray-100/80" : "hover:bg-[#A0423D]/50"
                                }`}
                              >
                                <div className="text-xs font-semibold">
                                  {language === "TR" ? p.isim_tr : language === "ZH" ? p.isim_zh : language === "AR" ? p.isim_ar : p.isim_en}
                                </div>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-[#D4A574]">{p.kategori}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Modules grid links (Bento Grid) */}
                  <div className="space-y-3">
                    <h3 className="font-serif font-bold text-sm flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-[#D4A574]" />
                      <span>{language === "TR" ? "Turizm Keşif Modülleri" : "Exclusive Concierge Hub"}</span>
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                      {[
                        { id: "PLACES", label: t.placesTab, desc: "Historic buildings", icon: Landmark, bg: isLight ? "bg-amber-50/50" : "bg-[#5C1E1B]" },
                        { id: "TOURS", label: t.toursTab, desc: "Curated routes", icon: Compass, bg: isLight ? "bg-red-50/50" : "bg-[#5C1E1B]" },
                        { id: "EVENTS", label: t.eventsTab, desc: "Festivals, Sema", icon: Calendar, bg: isLight ? "bg-orange-50/50" : "bg-[#5C1E1B]" },
                        { id: "AI_GUIDE", label: t.aiConciergeTab, desc: "Smart AI help", icon: Sparkles, bg: isLight ? "bg-purple-50/50" : "bg-[#5C1E1B]" },
                        { id: "PRACTICAL", label: t.practicalTab, desc: "Culture etiquette", icon: AlertCircle, bg: isLight ? "bg-teal-50/50" : "bg-[#5C1E1B]" },
                        { id: "HOTEL", label: t.hotelTab, desc: "Sırçalı details", icon: Star, bg: isLight ? "bg-rose-50/50" : "bg-[#5C1E1B]" },
                      ].map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              setActiveSubView(item.id as SubView);
                              setSelectedPlace(null);
                            }}
                            className={`${item.bg} border ${isLight ? "border-[#E8E8E8] hover:border-[#D4A574]" : "border-[#D4A574]/15 hover:border-[#D4A574]"} p-4 rounded-xl cursor-pointer transition-all shadow-sm hover:shadow-md flex flex-col justify-between h-[115px]`}
                          >
                            <Icon className="w-5 h-5 text-[#D4A574]" />
                            <div className="text-left space-y-0.5">
                              <h4 className="text-xs font-serif font-bold leading-tight truncate">
                                {item.label}
                              </h4>
                              <p className="text-[10px] text-[#999999] font-medium truncate">{item.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Featured / Popular Landmarks Carousel list */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <h3 className="font-serif font-bold text-sm flex items-center gap-1.5">
                        <Landmark className="w-4.5 h-4.5 text-[#D4A574]" />
                        <span>{t.popularPlaces}</span>
                      </h3>
                      <button
                        onClick={() => {
                          setActiveSubView("PLACES");
                          setSelectedPlace(null);
                        }}
                        className="text-xs font-bold text-[#D4A574] hover:underline flex items-center gap-0.5 cursor-pointer"
                      >
                        {language === "TR" ? "Tümünü Gör" : "See All"} <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {placesList.slice(0, 3).map((place) => {
                        const name = language === "TR" ? place.isim_tr : language === "ZH" ? place.isim_zh : language === "AR" ? place.isim_ar : place.isim_en;
                        const shortDesc = language === "TR" ? place.aciklama_kisa_tr : language === "ZH" ? place.aciklama_kisa_zh : language === "AR" ? place.aciklama_kisa_ar : place.aciklama_kisa_en;
                        return (
                          <div
                            key={place.id}
                            className={`border rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm transition-all ${
                              isLight 
                                ? "bg-[#FDFBF7] border-[#E8E8E8] hover:border-[#D4A574]" 
                                : "bg-[#5C1E1B] border-[#D4A574]/20 hover:border-[#D4A574]"
                            }`}
                          >
                            <div className="relative h-[130px] bg-[#5C1E1B]">
                              <PlacePhoto
                                place={place}
                                isLight={isLight}
                                className="w-full h-full object-cover opacity-90"
                              />
                              <span className="absolute top-3 left-3 bg-[#A0423D] text-white text-[9px] font-bold px-2 py-0.5 rounded border border-[#D4A574]/20 uppercase tracking-widest">
                                {place.kategori}
                              </span>
                            </div>

                            <div className="p-4 text-left flex-1 flex flex-col justify-between space-y-3">
                              <div className="space-y-1">
                                <h4 className="font-serif font-bold text-xs leading-tight">
                                  {name}
                                </h4>
                                <div className="flex items-center gap-1 text-[10px] text-amber-500">
                                  <Star className="w-3 h-3 fill-amber-500" />
                                  <span>{place.puan}</span>
                                </div>
                                <p className="text-[10px] text-[#999999] line-clamp-2 leading-relaxed mt-1 font-medium">
                                  {shortDesc}
                                </p>
                              </div>

                              <div className={`flex justify-between items-center text-[10px] pt-2 border-t ${
                                isLight ? "border-gray-200" : "border-[#D4A574]/10"
                              }`}>
                                <button
                                  onClick={() => handleShowOnMap(place)}
                                  className="text-[#D4A574] font-bold hover:underline cursor-pointer"
                                >
                                  {language === "TR" ? "Harita" : "Map"}
                                </button>
                                <button
                                  onClick={() => handleSelectPlace(place)}
                                  className="bg-[#A0423D] text-white px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider border border-[#D4A574]/20 cursor-pointer"
                                >
                                  {language === "TR" ? "İncele" : "Explore"}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* MAP VIEW */}
              {activeTab === "MAP" && (
                <div className="w-full h-full flex flex-col min-h-[500px]">
                  <MaplibreMap
                    places={placesList}
                    selectedPlace={selectedPlace}
                    onSelectPlace={handleSelectPlace}
                    language={language}
                    showAllMosques={showAllMosques}
                    setShowAllMosques={setShowAllMosques}
                    selectedTour={selectedTour}
                    onClearTour={handleClearTour}
                    isLight={isLight}
                  />
                </div>
              )}

              {/* PERSONAL PLANNER TABS VIEW */}
              {activeTab === "PERSONAL" && (
                <PersonalPlan
                  places={placesList}
                  language={language}
                  onSelectPlace={handleSelectPlace}
                  onShowOnMap={handleShowOnMap}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  isLight={isLight}
                />
              )}

              {/* EXPLORE TAB VIEW */}
              {activeTab === "EXPLORE" && (
                <div className="space-y-6">
                  <ToursList
                    tours={TOURS}
                    places={placesList}
                    language={language}
                    onSelectPlace={handleSelectPlace}
                    onShowOnMap={handleShowOnMap}
                    onShowTourOnMap={handleShowTourOnMap}
                    isLight={isLight}
                  />
                </div>
              )}

              {/* SETTINGS TAB VIEW */}
              {activeTab === "SETTINGS" && (
                <div className="space-y-6 text-left max-w-3xl">
                  
                  {/* Header */}
                  <div className={`flex items-center gap-2 border-b ${isLight ? "border-[#E8E8E8]" : "border-[#D4A574]/20"} pb-3`}>
                    <Settings className="w-5 h-5 text-[#D4A574]" />
                    <h2 className="font-serif font-bold text-lg md:text-xl">
                      {language === "TR" ? "Sırçalı Rehber Ayarları" : "Concierge Settings"}
                    </h2>
                  </div>

                  {/* Settings Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* General Configuration Card */}
                    <div className={`border p-5 rounded-2xl space-y-4 shadow-sm ${
                      isLight ? "bg-[#FDFBF7] border-[#E8E8E8]" : "bg-[#5C1E1B] border-[#D4A574]/20"
                    }`}>
                      <h3 className="text-xs font-serif font-bold text-[#D4A574] uppercase tracking-widest pb-1 border-b border-[#D4A574]/10">
                        {language === "TR" ? "TERCİHLERİNİZ" : "YOUR PREFERENCES"}
                      </h3>

                      {/* Language selection dropdown/switches */}
                      <div className="space-y-1.5 text-xs">
                        <label className="font-bold block text-[#999999] uppercase text-[10px]">
                          {language === "TR" ? "UYGULAMA DİLİ" : "APP LANGUAGE"}
                        </label>
                        <div className={`grid grid-cols-4 gap-1 p-1 rounded-lg border ${
                          isLight 
                            ? "bg-gray-100/80 border-[#E8E8E8]/20" 
                            : "bg-[#5C1E1B] border-[#D4A574]/15"
                        }`}>
                          {[
                            { key: "TR", label: "Türkçe" },
                            { key: "EN", label: "English" },
                            { key: "ZH", label: "中文" },
                            { key: "AR", label: "العربية" }
                          ].map((lang) => (
                            <button
                              key={lang.key}
                              onClick={() => changeLanguage(lang.key as Language)}
                              className={`py-1.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                                language === lang.key 
                                  ? (isLight ? "bg-[#A0423D] text-white shadow-sm" : "bg-[#D4A574] text-[#333333] shadow-sm") 
                                  : isLight ? "text-[#333333] hover:text-[#A0423D]" : "text-white/80 hover:text-[#D4A574]"
                              }`}
                            >
                              {lang.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Theme selection toggle buttons */}
                      <div className="space-y-1.5 text-xs">
                        <label className="font-bold block text-[#999999] uppercase text-[10px]">
                          {language === "TR" ? "ARAYÜZ TEMASI" : "INTERFACE THEME"}
                        </label>
                        <div className={`grid grid-cols-2 gap-1 p-1 rounded-lg border ${
                          isLight 
                            ? "bg-gray-100/80 border-[#E8E8E8]/20" 
                            : "bg-[#5C1E1B] border-[#D4A574]/15"
                        }`}>
                          <button
                            onClick={() => changeTheme("LIGHT")}
                            className={`py-1.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                              isLight 
                                ? "bg-[#A0423D] text-white shadow-sm" 
                                : "text-white/80 hover:text-[#D4A574]"
                            }`}
                          >
                            ☀️ {language === "TR" ? "Aydınlık (Light)" : "Light"}
                          </button>
                          <button
                            onClick={() => changeTheme("DARK_BORDO")}
                            className={`py-1.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                              !isLight 
                                ? "bg-[#D4A574] text-[#333333] shadow-sm" 
                                : "text-[#333333] hover:text-[#A0423D]"
                            }`}
                          >
                            🍷 {language === "TR" ? "Klasik Bordo" : "Classic Bordo"}
                          </button>
                        </div>
                      </div>

                      {/* Notification configurations toggle */}
                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="font-bold text-[#999999] uppercase text-[10px]">
                          {language === "TR" ? "RESEPSİYON BİLDİRİMLERİ" : "CONCIERGE NOTIFICATIONS"}
                        </span>
                        <button
                          onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                          className={`w-11 h-6 rounded-full transition-all border p-0.5 relative cursor-pointer ${
                            notificationsEnabled ? "bg-green-600 border-green-600 text-white" : "bg-gray-300 border-gray-300"
                          }`}
                        >
                          <div className={`w-4.5 h-4.5 bg-white rounded-full transition-all ${
                            notificationsEnabled ? "translate-x-5" : "translate-x-0"
                          }`} />
                        </button>
                      </div>
                    </div>

                    {/* About Konya & Sırçalı Card */}
                    <div className={`border p-5 rounded-2xl space-y-4 shadow-sm flex flex-col justify-between ${
                      isLight ? "bg-[#FDFBF7] border-[#E8E8E8]" : "bg-[#5C1E1B] border-[#D4A574]/20"
                    }`}>
                      <div className="space-y-2 text-xs">
                        <h3 className="text-xs font-serif font-bold text-[#D4A574] uppercase tracking-widest pb-1 border-b border-[#D4A574]/10">
                          {language === "TR" ? "HAKKIMIZDA" : "ABOUT THE CONCIERGE"}
                        </h3>
                        <p className="leading-relaxed font-normal">
                          {language === "TR"
                            ? "Sırçalı Hotel Konya Virtual Concierge uygulaması, otelimiz misafirlerinin Konya ziyaretini asil ve konforlu hale getirmek için tasarlanmıştır. Konya Belediyesi açık veri portalı desteğiyle asırlık tarihi camiler ve Selçuklu hazineleri cebinizde."
                            : "Sırçalı Hotel Konya Virtual Concierge is custom-tailored to provide our esteemed guests with an noble, seamless, and authentic experience while discovering Seljuk architectural treasures and mystical Sufi heritage in Konya."}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#D4A574]/15 flex justify-between text-[10px] font-bold text-[#D4A574]">
                        <span>Sırçalı App v2.5.0</span>
                        <span>Konya Tourism Board</span>
                      </div>
                    </div>

                    {/* Guest Feedback Form */}
                    <div className={`border p-5 rounded-2xl space-y-4 shadow-sm col-span-1 md:col-span-2 ${
                      isLight ? "bg-[#FDFBF7] border-[#E8E8E8]" : "bg-[#5C1E1B] border-[#D4A574]/20"
                    }`}>
                      <h3 className="text-xs font-serif font-bold text-[#D4A574] uppercase tracking-widest pb-1 border-b border-[#D4A574]/10">
                        {language === "TR" ? "GERİ BİLDİRİM GÖNDERİN" : "SHARE YOUR EXPERIENCE / FEEDBACK"}
                      </h3>

                      <form onSubmit={handleSendFeedback} className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div className="space-y-1">
                            <label className="font-bold text-[#999999] text-[10px] uppercase">
                              {language === "TR" ? "E-POSTA ADRESİNİZ (İSTEĞE BAĞLI)" : "EMAIL ADDRESS (OPTIONAL)"}
                            </label>
                            <input
                              type="email"
                              value={feedbackEmail}
                              onChange={(e) => setFeedbackEmail(e.target.value)}
                              placeholder="guest@sircalihotel.com"
                              className={`w-full p-2.5 rounded-lg border outline-none ${
                                isLight ? "bg-white border-[#E8E8E8] text-[#333333]" : "bg-[#A0423D]/30 border-[#D4A574]/20 text-white"
                              }`}
                            />
                          </div>
                        </div>

                        <div className="space-y-1 text-xs">
                          <label className="font-bold text-[#999999] text-[10px] uppercase">
                            {language === "TR" ? "DÜŞÜNCELERİNİZ VEYA TALEPLERİNİZ" : "YOUR THOUGHTS OR CONCIERGE REQUESTS"}
                          </label>
                          <textarea
                            rows={3}
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            placeholder={language === "TR" ? "Görüş, öneri veya özel rehberlik talebinizi buraya yazabilirsiniz..." : "Write your thoughts, suggestions or specific local tour guide requests here..."}
                            className={`w-full p-3 rounded-lg border outline-none resize-none ${
                              isLight ? "bg-white border-[#E8E8E8] text-[#333333]" : "bg-[#A0423D]/30 border-[#D4A574]/20 text-white"
                            }`}
                            required
                          />
                        </div>

                        <button
                          type="submit"
                          className="bg-[#A0423D] hover:bg-opacity-95 text-white font-bold text-xs uppercase tracking-widest px-5 py-3 rounded-xl flex items-center justify-center gap-2 border border-[#D4A574]/30 shadow-md cursor-pointer transition-all"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>{language === "TR" ? "GERİ BİLDİRİMİ GÖNDER" : "SEND FEEDBACK"}</span>
                        </button>
                      </form>
                    </div>

                  </div>
                </div>
              )}
            </>
          )}

        </div>

        {/* Mobile-first Bottom Bar Navigation Menu */}
        <nav className={`md:hidden fixed bottom-0 left-0 right-0 h-[70px] flex items-center justify-around z-50 px-2 shadow-2xl transition-colors duration-300 ${
          isLight ? "bg-[#FDFBF7] border-t border-[#E8E8E8]" : "bg-[#5C1E1B] border-t border-[#D4A574]/25"
        }`}>
          {[
            { id: "HOME", label: language === "TR" ? "Anasayfa" : "Home", icon: Home },
            { id: "MAP", label: language === "TR" ? "Harita" : "Map", icon: Map },
            { id: "PERSONAL", label: language === "TR" ? "Planım" : "Planner", icon: Heart },
            { id: "EXPLORE", label: language === "TR" ? "Keşfet" : language === "ZH" ? "探索" : language === "AR" ? "استكشف" : "Explore", icon: Compass },
            { id: "SETTINGS", label: language === "TR" ? "Ayarlar" : "Settings", icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as Tab);
                  setActiveSubView(null);
                  setSelectedPlace(null);
                }}
                className={`flex flex-col items-center justify-center space-y-1 py-1 transition-all cursor-pointer ${
                  isSelected ? "text-[#A0423D] dark:text-[#D4A574]" : "text-[#999999]"
                }`}
                style={{ minWidth: "55px" }}
              >
                <Icon className={`w-5 h-5 ${isSelected ? "scale-115 text-[#A0423D]" : "text-[#999999]"}`} />
                <span className="text-[8px] font-bold uppercase tracking-wider">{item.label}</span>
                {isSelected && (
                  <div className="w-4 h-0.5 bg-[#A0423D] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

      </main>
    </div>
  );
}
