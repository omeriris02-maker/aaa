import React, { useState } from "react";
import { EventItem, Language } from "../types";
import { EVENTS } from "../data";
import { Calendar, Clock, MapPin, Ticket, AlertCircle, Sparkles, Music } from "lucide-react";

interface EventsListProps {
  language: Language;
  isLight?: boolean;
}

export default function EventsList({ language, isLight = true }: EventsListProps) {
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
  
  const getEventName = (event: EventItem) => {
    if (language === "TR") return event.isim_tr;
    if (language === "ZH") return event.isim_zh;
    if (language === "AR") return event.isim_ar;
    return event.isim_en;
  };

  const getEventLocation = (event: EventItem) => {
    if (language === "TR") return event.yer_tr;
    if (language === "ZH") return event.yer_zh;
    if (language === "AR") return event.yer_ar;
    return event.yer_en;
  };

  const getEventPrice = (event: EventItem) => {
    if (language === "TR") return event.ucret_tr;
    if (language === "ZH") return event.ucret_zh;
    if (language === "AR") return event.ucret_ar;
    return event.ucret_en;
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className={`flex items-center gap-2 border-b pb-3 ${isLight ? "border-[#E8E8E8]" : "border-[#D4A574]/20"}`}>
        <Calendar className="w-5 h-5 text-[#A0423D]" />
        <h2 className={`font-serif font-bold text-lg md:text-xl ${isLight ? "text-[#A0423D]" : "text-white"}`}>
          {language === "TR" ? "Kültür & Sanat Takvimi" : language === "ZH" ? "科尼亚文化与艺术日历" : language === "AR" ? "الجدول والفعاليات الثقافية" : "Culture & Art Calendar"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EVENTS.map((event) => (
          <div
            key={event.id}
            className={`border rounded-2xl overflow-hidden flex flex-col shadow-sm hover:border-[#D4A574] transition-all ${
              isLight ? "bg-[#FDFBF7] border-[#D4A574]/30" : "bg-[#5C1E1B] border-[#D4A574]/15"
            }`}
          >
            {/* Banner */}
            <div className={`w-full h-[150px] relative border-b ${isLight ? "bg-white border-[#E8E8E8]" : "bg-[#A0423D]/20 border-[#D4A574]/15"}`}>
              {failedImages[event.id] || !event.fotograf_url ? (
                <div className={`w-full h-full flex flex-col items-center justify-center p-4 relative overflow-hidden transition-all ${
                  isLight 
                    ? "bg-gradient-to-br from-[#FDFBF7] to-[#D4A574]/15 text-[#333333]" 
                    : "bg-gradient-to-br from-[#5C1E1B] to-[#A0423D]/30 text-gray-200"
                }`}>
                  <div className="absolute inset-0 opacity-[0.04] pointer-events-none transform scale-150 rotate-12">
                    <svg width="100%" height="100%" fill="none" viewBox="0 0 100 100" stroke="currentColor">
                      <circle cx="50" cy="50" r="40" strokeWidth="1" />
                      <path d="M50 10 L50 90 M10 50 L90 50" strokeWidth="1" />
                    </svg>
                  </div>
                  
                  {event.isim_tr.toLowerCase().includes("müzik") || event.isim_en.toLowerCase().includes("music") ? (
                    <Music className={`w-8 h-8 mb-2 animate-pulse ${isLight ? "text-[#A0423D]" : "text-[#D4A574]"}`} />
                  ) : (
                    <Calendar className={`w-8 h-8 mb-2 animate-pulse ${isLight ? "text-[#A0423D]" : "text-[#D4A574]"}`} />
                  )}
                  
                  <span className={`text-[10px] font-sans font-semibold tracking-widest uppercase text-center max-w-[85%] ${isLight ? "text-gray-400" : "text-gray-400"}`}>
                    {event.id === 1 ? "Sema & Culture" : "Local Festival"}
                  </span>
                </div>
              ) : (
                <img
                  src={event.fotograf_url}
                  alt={event.isim_en}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-90"
                  onError={() => {
                    setFailedImages(prev => ({ ...prev, [event.id]: true }));
                  }}
                />
              )}
              <div className="absolute top-3 left-3 bg-[#A0423D] text-white text-[9px] font-bold px-2.5 py-1 rounded-md border border-[#D4A574]/30 uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#D4A574]" />
                {event.id === 1 ? "ANNUAL EXCLUSIVE" : "FESTIVAL"}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <h3 className={`font-serif font-bold text-base leading-snug ${isLight ? "text-[#A0423D]" : "text-[#D4A574]"}`}>
                  {getEventName(event)}
                </h3>

                <div className={`grid grid-cols-2 gap-2 text-xs font-semibold ${isLight ? "text-[#333333]" : "text-gray-200"}`}>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#D4A574] shrink-0" />
                    <span>{event.tarih}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#D4A574] shrink-0" />
                    <span>{event.saat}</span>
                  </div>
                </div>

                <div className={`space-y-1.5 pt-1 text-xs font-medium ${isLight ? "text-[#333333]" : "text-gray-200"}`}>
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-[#D4A574] shrink-0 mt-0.5" />
                    <span>{getEventLocation(event)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Ticket className="w-4 h-4 text-[#D4A574] shrink-0" />
                    <span className={`font-bold ${isLight ? "text-[#A0423D]" : "text-[#D4A574]"}`}>{getEventPrice(event)}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className={`pt-3 border-t flex justify-between items-center text-xs ${isLight ? "border-[#E8E8E8]" : "border-[#D4A574]/15"}`}>
                <span className={`font-semibold flex items-center gap-1 ${isLight ? "text-[#333333]" : "text-gray-300"}`}>
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  {language === "TR" ? "Rezervasyon Gerekebilir" : language === "ZH" ? "需提前预定" : language === "AR" ? "قد يتطلب الحجز" : "Booking may be required"}
                </span>

                <button
                  onClick={() => {
                    const container = document.createElement("div");
                    container.className = "fixed top-10 left-1/2 -translate-x-1/2 bg-[#A0423D] text-white border border-[#D4A574] font-sans font-semibold text-xs px-5 py-3 rounded-xl shadow-2xl z-[9999] transition-all transform animate-bounce text-center";
                    container.innerHTML = `
                      <div class="font-bold text-[#D4A574] mb-1">🎫 Sırçalı Hotel Concierge</div>
                      <div>${language === "TR" 
                        ? "Etkinlik talebiniz resepsiyonumuza iletildi! Sizin adınıza bilet temini için en kısa sürede iletişime geçeceğiz." 
                        : language === "ZH"
                        ? "您的预订申请已提交至酒店前台！我们将尽快协助您预订门票。"
                        : language === "AR"
                        ? "تم إرسال طلب الحجز إلى مكتب الاستقبال! سنتواصل معك قريباً لتوفير التذاكر."
                        : "Your request has been sent to our concierge desk! We will contact you shortly to secure your ticket."}</div>
                    `;
                    document.body.appendChild(container);
                    setTimeout(() => container.remove(), 4000);
                  }}
                  className="bg-[#A0423D] hover:bg-opacity-95 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-[#D4A574]/20 transition-all cursor-pointer shadow-sm"
                >
                  {language === "TR" ? "Bilet Al / Bilgi Al" : language === "ZH" ? "预订/咨询" : language === "AR" ? "احجز تذكرة" : "Book Ticket"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
