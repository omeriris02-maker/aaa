import { useState } from "react";
import { Place, Language, PhotoItem } from "../types";
import { getCategoryPlaceholder } from "../data";
import PlacePhoto, { getPlaceStructuredPhotos } from "./PlacePhoto";
import { 
  X, Heart, Volume2, Share2, MapPin, Clock, Ticket, Navigation, 
  Accessibility, Globe, Phone, Mail, Sparkles, Star, ShieldCheck, 
  CheckCircle, ArrowLeft, HeartOff, Info, ChevronLeft, ChevronRight, Camera
} from "lucide-react";

interface PlaceDetailProps {
  place: Place;
  language: Language;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onGetDirections: (place: Place) => void;
  isLight?: boolean;
}

export default function PlaceDetail({
  place,
  language,
  onClose,
  isFavorite,
  onToggleFavorite,
  onGetDirections,
  isLight = true,
}: PlaceDetailProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  const structuredPhotos = getPlaceStructuredPhotos(place);

  // Helper for translating values based on language
  const getName = () => {
    if (language === "TR") return place.isim_tr;
    if (language === "ZH") return place.isim_zh;
    if (language === "AR") return place.isim_ar;
    return place.isim_en;
  };

  const getDesc = () => {
    if (language === "TR") return place.tarihce_tr;
    if (language === "ZH") return place.tarihce_zh;
    if (language === "AR") return place.tarihce_ar;
    return place.tarihce_en;
  };

  const getEntranceFee = () => {
    if (language === "TR") return place.giris_ucreti.tr;
    if (language === "ZH") return place.giris_ucreti.zh;
    if (language === "AR") return place.giris_ucreti.ar;
    return place.giris_ucreti.en;
  };

  // Text-To-Speech function using Web Speech API
  const handleSpeak = () => {
    if ("speechSynthesis" in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      const textToSpeak = `${getName()}. ${getDesc()}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);

      // Attempt to pick an appropriate language voice
      if (language === "TR") utterance.lang = "tr-TR";
      else if (language === "ZH") utterance.lang = "zh-CN";
      else if (language === "AR") utterance.lang = "ar-SA";
      else utterance.lang = "en-US";

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    } else {
      const toast = document.createElement("div");
      toast.className = "fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#A0423D] text-[#D4A574] border border-[#D4A574]/35 font-sans font-semibold text-xs px-5 py-3 rounded-full shadow-2xl z-[9999] transition-all transform animate-bounce";
      toast.innerText = language === "TR" 
        ? "Sesli anlatım bu tarayıcıda desteklenmiyor." 
        : "Text-to-speech is not supported in this browser.";
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }
  };

  // Custom Social Sharing
  const handleShare = () => {
    const text = `${getName()} - Sırçalı Hotel Konya Tourism Guide: ${window.location.href}`;
    navigator.clipboard.writeText(text);
    
    // Smooth custom notification
    const shareAlert = document.createElement("div");
    shareAlert.className = "fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#D4A574] text-white font-sans font-semibold text-xs px-5 py-3 rounded-full shadow-2xl z-[9999] transition-all transform animate-bounce";
    shareAlert.innerText = language === "TR" 
      ? "Paylaşım linki başarıyla kopyalandı!" 
      : language === "ZH"
      ? "分享链接已成功复制到剪贴板！"
      : language === "AR"
      ? "تم نسخ رابط المشاركة بنجاح!"
      : "Share link successfully copied to clipboard!";
    document.body.appendChild(shareAlert);
    setTimeout(() => {
      shareAlert.remove();
    }, 2500);
  };

  return (
    <div id="place-detail-modal" className={`flex flex-col h-full rounded-2xl border overflow-hidden shadow-2xl transition-all ${isLight ? "bg-white text-[#333333] border-[#E8E8E8]" : "bg-[#5C1E1B] text-gray-200 border-[#D4A574]/20"}`}>
      {/* Photo Gallery & Hero */}
      <div className="relative w-full md:max-w-[600px] md:mx-auto bg-[#E8E8E8] overflow-hidden rounded-t-2xl">
        <PlacePhoto
          place={place}
          photoIndex={activePhotoIndex}
          alt={getName()}
          language={language}
          className="w-full h-[220px] md:h-[320px] object-cover opacity-95 transition-all duration-500"
        />
        {/* Soft elegant shadow overlay (no pure black) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/80 via-transparent to-[#333333]/30" />

        {/* Buttons on top of image */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <button
            onClick={onClose}
            className="bg-[#333333]/45 hover:bg-[#A0423D] text-white p-2.5 rounded-full backdrop-blur-sm border border-white/20 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4.5 h-4.5" />
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={() => onToggleFavorite(place.id)}
              className="bg-[#333333]/45 hover:bg-[#A0423D] text-white p-2.5 rounded-full backdrop-blur-sm border border-white/20 transition-all cursor-pointer"
            >
              {isFavorite ? (
                <Heart className="w-4.5 h-4.5 fill-white text-white" />
              ) : (
                <HeartOff className="w-4.5 h-4.5 text-gray-200" />
              )}
            </button>
            <button
              onClick={handleShare}
              className="bg-[#333333]/45 hover:bg-[#A0423D] text-white p-2.5 rounded-full backdrop-blur-sm border border-white/20 transition-all cursor-pointer"
            >
              <Share2 className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Place Title in Hero */}
        <div className="absolute bottom-4 left-4 right-4 text-left">
          <span className="bg-[#A0423D] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border border-[#D4A574]/20">
            {place.kategori}
          </span>
          <h2 className="font-serif font-bold text-lg md:text-2xl text-white mt-2 drop-shadow-md leading-tight">
            {getName()}
          </h2>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-[#D4A574]">
            <Star className="w-3.5 h-3.5 fill-[#D4A574] stroke-[#D4A574]" />
            <span className="font-bold text-white">{place.puan}</span>
            <span className="text-[10px] text-gray-200 font-semibold">
              ({place.yorum_sayisi} {language === "TR" ? "Yorum" : language === "ZH" ? "条评价" : language === "AR" ? "تعليق" : "Reviews"})
            </span>
          </div>
        </div>

        {/* Multi-Photo Dots selection */}
        {structuredPhotos.length > 1 && (
          <div className="absolute bottom-3 right-4 flex gap-1.5 z-10">
            {structuredPhotos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhotoIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all border border-white/40 ${
                  activePhotoIndex === idx ? "bg-[#D4A574] scale-125" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail Content Section */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 text-left space-y-6">
        {/* Quick Action bar */}
        <div className={`flex flex-col sm:flex-row gap-3 pb-4 border-b ${isLight ? "border-[#E8E8E8]" : "border-[#D4A574]/15"}`}>
          <button
            onClick={() => onGetDirections(place)}
            className="flex-1 flex items-center justify-center gap-2 bg-[#A0423D] hover:bg-opacity-95 text-white font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-xl shadow-sm border border-[#D4A574]/20 transition-all cursor-pointer"
          >
            <Navigation className="w-4 h-4 text-[#D4A574]" />
            {language === "TR" ? "Yol Tarifi Al" : language === "ZH" ? "获取导航" : language === "AR" ? "اتجاهات الطريق" : "Get Directions"}
          </button>

          <button
            onClick={handleSpeak}
            className={`flex items-center justify-center gap-2 border font-bold text-xs px-4 py-3 rounded-xl transition-all cursor-pointer ${
              isSpeaking 
                ? "bg-[#D4A574] border-[#D4A574] text-white" 
                : (isLight ? "bg-white hover:bg-gray-50 text-[#333333] border-[#E8E8E8]" : "bg-[#A0423D]/20 hover:bg-[#A0423D]/30 text-gray-200 border-[#D4A574]/20")
            }`}
          >
            <Volume2 className={`w-4 h-4 ${isSpeaking ? "animate-pulse text-white" : "text-[#D4A574]"}`} />
            {isSpeaking 
              ? (language === "TR" ? "Durdur" : language === "ZH" ? "静音" : language === "AR" ? "إيقاف الصوت" : "Stop TTS") 
              : (language === "TR" ? "Sesli Dinle" : language === "ZH" ? "语音朗读" : language === "AR" ? "استمع بالصوت" : "Listen (TTS)")}
          </button>
        </div>

        {/* History / Description */}
        <div className="space-y-2.5">
          <h3 className="font-serif font-bold text-sm text-[#A0423D] tracking-wider uppercase flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#D4A574]" />
            {language === "TR" ? "TARİHÇE VE KÜLTÜR" : language === "ZH" ? "历史与文化" : language === "AR" ? "التاريخ والثقافة" : "HISTORY & HERITAGE"}
          </h3>
          <p className={`text-xs md:text-sm leading-relaxed font-sans font-medium ${isLight ? "text-[#333333]" : "text-gray-200"}`}>
            {getDesc()}
          </p>
        </div>

        {/* Visiting Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className={`border p-4 rounded-xl flex items-start gap-2.5 shadow-sm ${isLight ? "bg-[#FDFBF7] border-[#E8E8E8]" : "bg-[#5C1E1B] border-[#D4A574]/15"}`}>
            <Clock className="w-4 h-4 text-[#D4A574] mt-0.5" />
            <div>
              <h4 className="text-[10px] font-bold text-[#999999] uppercase tracking-wide">
                {language === "TR" ? "Ziyaret Saatleri" : language === "ZH" ? "开放时间" : language === "AR" ? "أوقات الزيارة" : "Visiting Hours"}
              </h4>
              <p className={`text-xs font-bold mt-1 ${isLight ? "text-[#333333]" : "text-white"}`}>
                {place.calisma_saatleri["Pazartesi - Pazar"] || place.calisma_saatleri["Hergün"] || place.calisma_saatleri["Salı - Pazar"] || "09:00 - 17:00"}
              </p>
            </div>
          </div>

          <div className={`border p-4 rounded-xl flex items-start gap-2.5 shadow-sm ${isLight ? "bg-[#FDFBF7] border-[#E8E8E8]" : "bg-[#5C1E1B] border-[#D4A574]/15"}`}>
            <Ticket className="w-4 h-4 text-[#D4A574] mt-0.5" />
            <div>
              <h4 className="text-[10px] font-bold text-[#999999] uppercase tracking-wide">
                {language === "TR" ? "Giriş Ücreti" : language === "ZH" ? "门票价格" : language === "AR" ? "رسوم الدخول" : "Entrance Fee"}
              </h4>
              <p className={`text-xs font-bold mt-1 ${isLight ? "text-[#333333]" : "text-white"}`}>
                {getEntranceFee()}
              </p>
            </div>
          </div>

          <div className={`border p-4 rounded-xl flex items-start gap-2.5 shadow-sm ${isLight ? "bg-[#FDFBF7] border-[#E8E8E8]" : "bg-[#5C1E1B] border-[#D4A574]/15"}`}>
            <Clock className="w-4 h-4 text-[#D4A574] mt-0.5" />
            <div>
              <h4 className="text-[10px] font-bold text-[#999999] uppercase tracking-wide">
                {language === "TR" ? "Tahmini Süre" : language === "ZH" ? "建议时间" : language === "AR" ? "مدة الزيارة" : "Est. Duration"}
              </h4>
              <p className={`text-xs font-bold mt-1 ${isLight ? "text-[#333333]" : "text-white"}`}>
                {place.ziyaret_suresi_dk} {language === "TR" ? "Dakika" : language === "ZH" ? "分钟" : language === "AR" ? "دقيقة" : "Minutes"}
              </p>
            </div>
          </div>
        </div>

        {/* Accessibility Features */}
        <div className={`border p-4 rounded-xl space-y-2.5 ${isLight ? "bg-[#FDFBF7] border-[#E8E8E8]" : "bg-[#5C1E1B] border-[#D4A574]/15"}`}>
          <h4 className="text-xs font-serif font-bold text-[#A0423D] tracking-wide flex items-center gap-1.5">
            <Accessibility className="w-4 h-4 text-[#D4A574]" />
            {language === "TR" ? "Erişilebilirlik Olanakları" : language === "ZH" ? "无障碍服务" : language === "AR" ? "تسهيلات ذوي الاحتياجات الخاصة" : "Accessibility Features"}
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <CheckCircle className={`w-3.5 h-3.5 ${place.erisilebilirlik.wheelchair ? "text-green-600" : "text-[#999999]"}`} />
              <span className={place.erisilebilirlik.wheelchair ? (isLight ? "text-[#333333] font-bold" : "text-white font-bold") : "text-gray-500/70 line-through font-light"}>
                {language === "TR" ? "Tekerlekli Sandalye" : language === "ZH" ? "轮椅通道" : language === "AR" ? "كرسي متحرك" : "Wheelchair Accessible"}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className={`w-3.5 h-3.5 ${place.erisilebilirlik.elevator ? "text-green-600" : "text-[#999999]"}`} />
              <span className={place.erisilebilirlik.elevator ? (isLight ? "text-[#333333] font-bold" : "text-white font-bold") : "text-gray-500/70 line-through font-light"}>
                {language === "TR" ? "Asansör / Rampa" : language === "ZH" ? "电梯/坡道" : language === "AR" ? "مصعد" : "Elevator / Ramp"}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className={`w-3.5 h-3.5 ${place.erisilebilirlik.disabledToilet ? "text-green-600" : "text-[#999999]"}`} />
              <span className={place.erisilebilirlik.disabledToilet ? (isLight ? "text-[#333333] font-bold" : "text-white font-bold") : "text-gray-500/70 line-through font-light"}>
                {language === "TR" ? "Engelli Tuvaleti" : language === "ZH" ? "残疾人洗手间" : language === "AR" ? "مرحاض لذوي الاحتياجات" : "Disabled Restroom"}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className={`w-3.5 h-3.5 ${place.erisilebilirlik.guideService ? "text-green-600" : "text-[#999999]"}`} />
              <span className={place.erisilebilirlik.guideService ? (isLight ? "text-[#333333] font-bold" : "text-white font-bold") : "text-gray-500/70 line-through font-light"}>
                {language === "TR" ? "Rehber Hizmeti" : language === "ZH" ? "导游讲解" : language === "AR" ? "خدمة مرشد" : "Guide Services"}
              </span>
            </div>
          </div>
          <div className={`mt-3 pt-2.5 border-t flex items-start gap-2 text-[10px] font-medium leading-relaxed ${isLight ? "border-[#E8E8E8] text-gray-500" : "border-[#D4A574]/15 text-gray-300"}`}>
            <Info className="w-3.5 h-3.5 text-[#D4A574] shrink-0 mt-0.5" />
            <p>
              {language === "TR" 
                ? "Not: Tarihi ve dini mekanların özgün mimari dokusu nedeniyle engelsiz erişim imkanları kısıtlı olabilir veya talep üzerine sağlanabilir. Ziyaretinizden önce kurumla iletişime geçerek teyit etmeniz önerilir." 
                : language === "ZH"
                ? "注意：由于历史和宗教建筑的独特结构，无障碍通道可能有限或需根据要求提供。建议您在访问前与相关机构联系进行确认。"
                : language === "AR"
                ? "ملاحظة: قد تكون تسهيلات الوصول لذوي الاحتياجات الخاصة محدودة أو متوفرة عند الطلب بسبب الطبيعة المعمارية الفريدة للمواقع التاريخية والدينية. يوصى بالتواصل مع الجهة المعنية للتحقق قبل الزيارة."
                : "Note: Due to the unique architectural structure of historic and religious sites, step-free access features may be limited or provided upon request. We highly recommend contacting the institution to verify prior to your visit."}
            </p>
          </div>
        </div>

        {/* Contact and Location details */}
        <div className={`border p-4 rounded-xl space-y-3 text-xs font-medium ${isLight ? "bg-[#FDFBF7] border-[#E8E8E8] text-[#333333]" : "bg-[#5C1E1B] border-[#D4A574]/15 text-gray-200"}`}>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#D4A574] shrink-0 mt-0.5" />
            <span>{place.adres}</span>
          </div>
          {place.telefon && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#D4A574] shrink-0" />
              <a href={`tel:${place.telefon}`} className="hover:text-[#A0423D] transition-colors">{place.telefon}</a>
            </div>
          )}
          {place.web && (
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#D4A574] shrink-0" />
              <a href={place.web} target="_blank" rel="noopener noreferrer" className="hover:text-[#A0423D] transition-colors break-all">
                {place.web}
              </a>
            </div>
          )}
        </div>

        {/* Photo Gallery (Horizontal Scroll) or Elegant Placeholder */}
        {structuredPhotos.length > 0 ? (
          <div className="space-y-2.5">
            <h4 className="text-xs font-serif font-bold text-[#A0423D] tracking-wide uppercase">
              {language === "TR" ? "Fotoğraf Galerisi" : language === "ZH" ? "照片画廊" : language === "AR" ? "معرض الصور" : "Photo Gallery"}
            </h4>
            <div 
              className="w-full overflow-x-auto flex gap-3 pb-2 select-none touch-pan-x"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {structuredPhotos.map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => setFullscreenIndex(idx)}
                  className="flex-shrink-0 flex flex-col space-y-1.5 cursor-pointer group"
                  style={{ width: "200px" }}
                >
                  <div className={`w-[200px] h-[200px] rounded-[12px] overflow-hidden border relative shadow-sm group-hover:shadow-md transition-shadow ${isLight ? "border-[#E8E8E8] bg-[#E8E8E8]" : "border-[#D4A574]/15 bg-[#A0423D]/20"}`}>
                    <img
                      src={item.url}
                      alt={language === "TR" ? item.caption_tr : language === "ZH" ? item.caption_zh : language === "AR" ? item.caption_ar : item.caption_en}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <span className={`text-[10px] font-medium truncate px-1 block text-left ${isLight ? "text-[#333333]/80" : "text-gray-300"}`}>
                    {language === "TR" ? item.caption_tr : language === "ZH" ? item.caption_zh : language === "AR" ? item.caption_ar : item.caption_en}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-2.5">
            <h4 className="text-xs font-serif font-bold text-[#A0423D] tracking-wide uppercase">
              {language === "TR" ? "Fotoğraf Galerisi" : language === "ZH" ? "照片画廊" : language === "AR" ? "معرض الصور" : "Photo Gallery"}
            </h4>
            <div className={`border rounded-xl p-6 text-center flex flex-col items-center justify-center space-y-2 ${isLight ? "bg-[#FDFBF7] border-[#E8E8E8]" : "bg-[#A0423D]/10 border-[#D4A574]/10"}`}>
              <Camera className="w-6 h-6 text-[#D4A574] opacity-80" />
              <p className={`text-xs font-bold ${isLight ? "text-[#333333]/70" : "text-gray-300"}`}>
                {language === "TR" 
                  ? "Arşiv Fotoğrafları Yakında Eklenecek" 
                  : language === "ZH" 
                    ? "历史照片档案即将上线" 
                    : language === "AR" 
                      ? "سيتم إضافة الأرشيف الفوتوغرافي قريباً" 
                      : "Archive Photographs Will Be Added Soon"}
              </p>
              <p className="text-[10px] text-gray-400 font-sans max-w-[280px]">
                {language === "TR"
                  ? "Bu tarihi mekana ait lisanslı ve yüksek çözünürlüklü görsel çalışmalarımız devam etmektedir."
                  : language === "ZH"
                    ? "我们正在整理该历史遗迹的官方高清授权图片。"
                    : language === "AR"
                      ? "جاري العمل على تجهيز صور مرخصة عالية الدقة لهذا المعلم التاريخي."
                      : "We are currently preparing verified high-resolution licensed imagery for this historic monument."}
              </p>
            </div>
          </div>
        )}

        {/* Culture Etiquette warning for holy places */}
        {(place.kategori === "UNESCO" || place.kategori === "Cami") && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 font-bold">
              {language === "TR" 
                ? "Dini ve mukaddes mekanları ziyaret ederken omuzların ve dizlerin kapalı olmasına ve cami girişlerinde ayakkabıların çıkarılmasına özen gösteriniz."
                : language === "ZH"
                ? "参观宗教圣地时，请确保肩膀和膝盖被遮盖，并需在清真寺入口处脱鞋。"
                : language === "AR"
                ? "يرجى التأكد من تغطية الكتفين والركبتين عند زيارة الأماكن الدينية المقدسة، والحرص على خلع الأحذية عند مداخل المساجد."
                : "When visiting holy sites, please ensure shoulders and knees are fully covered, and shoes are removed at the entrance of mosques."}
            </p>
          </div>
        )}
      </div>

      {/* Full-Screen Photo Viewer Overlay */}
      {fullscreenIndex !== null && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-between p-4 md:p-6 select-none animate-fadeIn"
          onTouchStart={(e) => {
            (window as any)._touchStartX = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const touchStartX = (window as any)._touchStartX || 0;
            const diffX = e.changedTouches[0].clientX - touchStartX;
            if (diffX > 50 && fullscreenIndex > 0) {
              setFullscreenIndex(fullscreenIndex - 1);
            } else if (diffX < -50 && fullscreenIndex < structuredPhotos.length - 1) {
              setFullscreenIndex(fullscreenIndex + 1);
            }
          }}
        >
          {/* Top Bar with counter & close button */}
          <div className="flex justify-between items-center text-white w-full max-w-4xl mx-auto">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-white/70">
              {fullscreenIndex + 1} / {structuredPhotos.length}
            </span>
            <button
              onClick={() => setFullscreenIndex(null)}
              className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full text-white cursor-pointer transition-all border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Centered Image with touch swipe & Zoom indicators */}
          <div className="flex-1 flex items-center justify-center relative w-full max-w-4xl mx-auto">
            {/* Previous Photo Button */}
            {fullscreenIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFullscreenIndex(fullscreenIndex - 1);
                }}
                className="absolute left-2 md:left-4 bg-black/50 hover:bg-black/80 p-3 rounded-full text-white cursor-pointer transition-all border border-white/10 z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Centered Img container */}
            <div className="max-w-full max-h-[70vh] flex items-center justify-center overflow-hidden rounded-lg shadow-2xl">
              <img
                src={structuredPhotos[fullscreenIndex].url}
                alt={getName()}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[70vh] object-contain transition-transform duration-300 hover:scale-105 active:scale-125 cursor-zoom-in"
              />
            </div>

            {/* Next Photo Button */}
            {fullscreenIndex < structuredPhotos.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFullscreenIndex(fullscreenIndex + 1);
                }}
                className="absolute right-2 md:right-4 bg-black/50 hover:bg-black/80 p-3 rounded-full text-white cursor-pointer transition-all border border-white/10 z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Bottom details with Caption, Source, and License */}
          <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center w-full max-w-2xl mx-auto space-y-1.5 mb-2 shadow-lg">
            <p className="text-xs font-bold text-white leading-normal">
              {language === "TR" 
                ? structuredPhotos[fullscreenIndex].caption_tr 
                : language === "ZH" 
                  ? structuredPhotos[fullscreenIndex].caption_zh 
                  : language === "AR" 
                    ? structuredPhotos[fullscreenIndex].caption_ar 
                    : structuredPhotos[fullscreenIndex].caption_en}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] text-gray-400 font-mono font-medium">
              <span>Source: {structuredPhotos[fullscreenIndex].source}</span>
              <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:inline" />
              <span>License: {structuredPhotos[fullscreenIndex].license}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
