import { Language } from "../types";
import { Star, Shield, Sparkles, MapPin, Phone, Mail, Globe, CheckCircle2, MessageCircle, CreditCard } from "lucide-react";
import logoUrl from "../assets/logo.svg";

interface HotelBrandingProps {
  language: Language;
  isLight?: boolean;
}

const TRANSLATIONS = {
  TR: {
    welcome: "Konya'nın zengin Selçuklu tarihinin tam kalbinde, adını dünyaca meşhur Sırçalı Medrese'den alan otelimiz, Meram Belediyesi bünyesinde işletilen saygın ve zarif bir tesistir. Üstün konforu, geleneksel Türk konukseverliği ve modern kolaylıkları tek çatı altında birleştiren otelimiz; Mevlana Müzesi'ne ve tarihi medreselere sadece yürüme mesafesinde, size benzersiz bir konaklama deneyimi sunar.",
    boutique: "BUTİK DENEYİM",
    bookBtn: "REZERVASYON YAP",
    guestServices: "MİSAFİR HİZMETLERİMİZ",
    freeServices: "DAHİL OLAN ÜCRETSİZ HİZMETLER",
    paidServices: "EK ÜCRETLİ HİZMETLER",
    contactInfo: "İLETİŞİM BİLGİLERİ",
    address: "Sahibata Mahallesi İbni Bibi Sokak No:3, Meram / Konya",
    whatsappSupport: "WhatsApp Destek",
    guarantee: "GÜVENLİ VE RESMİ HİZMET GARANTİSİ",
    popupTitle: "🛎️ Sırçalı Rezervasyon Masası",
    popupMsg: "Rezervasyon talebiniz Sırçalı Hotel hizmetler masasına iletildi! En kısa sürede sizinle iletişime geçilecektir."
  },
  EN: {
    welcome: "In the direct heart of Konya's Seljuk legacy, our boutique hotel—proudly operated by the Meram Municipality and drawing its identity from the world-famous Sırçalı Madrasa—blends exquisite comfort, traditional Turkish hospitality, and modern convenience under one roof. Located within walking distance to the Mevlana Museum and iconic landmarks, we offer an unforgettable accommodation experience.",
    boutique: "BOUTIQUE EXPERIENCE",
    bookBtn: "BOOK A ROOM",
    guestServices: "GUEST SERVICES",
    freeServices: "COMPLIMENTARY SERVICES (INCLUDED)",
    paidServices: "PAID SERVICES (ADD-ON)",
    contactInfo: "CONTACT & LOCATION",
    address: "Sahibata Mahallesi Ibni Bibi Sokak No:3, Meram / Konya",
    whatsappSupport: "WhatsApp Support",
    guarantee: "SAFE & OFFICIAL SERVICE GUARANTEE",
    popupTitle: "🛎️ Sırçalı Reservation Desk",
    popupMsg: "Your booking inquiry has been logged! Our guest relations team will contact you shortly."
  },
  ZH: {
    welcome: "坐落于科尼亚丰富的塞尔柱王朝历史核心区域，我们的酒店是梅拉姆区政府（Meram Municipality）旗下的一家高雅精品酒店。酒店得名于世界闻名的瑟尔恰勒神学院（Sırçalı Madrasa），将卓越的舒适感、传统的土耳其热情款待与现代便利设施完美融合，距离梅芙拉纳博物馆和历史古迹仅步行之遥，为您带来无与伦比的住宿体验。",
    boutique: "精品酒店体验",
    bookBtn: "预订客房",
    guestServices: "客房服务与设施",
    freeServices: "免费赠送服务 (已包含)",
    paidServices: "自费增值服务 (可选)",
    contactInfo: "联络与地址",
    address: "Sahibata Mahallesi Ibni Bibi Sokak No:3, Meram / Konya",
    whatsappSupport: "WhatsApp 客服",
    guarantee: "安全与官方服务保障",
    popupTitle: "🛎️ 瑟尔恰勒预订台",
    popupMsg: "您的订房申请已提交！我们的客服团队会尽快与您取得联系。"
  },
  AR: {
    welcome: "يقع فندقنا في قلب تاريخ قونية السلجوقي الغني، وهو منشأة راقية وجميلة تُدار بفخر من قبل بلدية ميرام (Meram Belediyesi). يستلهم الفندق اسمه من مدرسة سيرتشالي الأثرية الشهيرة، ويجمع بين الراحة الفائقة والضيافة التركية التقليدية والمزايا العصرية تحت سقف واحد، على بعد خطوات قليلة سيراً على الأقدام من متحف مولانا والمدارس التاريخية ليقدم لكم تجربة إقامة استثنائية.",
    boutique: "تجربة فندقية راقية",
    bookBtn: "احجز غرفة الآن",
    guestServices: "خدمات ومرافق الضيوف",
    freeServices: "الخدمات المجانية المشمولة",
    paidServices: "الخدمات الإضافية المدفوعة",
    contactInfo: "معلومات الاتصال والموقع",
    address: "Sahibata Mahallesi Ibni Bibi Sokak No:3, Meram / Konya",
    whatsappSupport: "دعم عبر الواتساب",
    guarantee: "ضمان الخدمة الرسمية والآمنة",
    popupTitle: "🛎️ مكتب حجوزات سيرتشالي",
    popupMsg: "تم تسجيل طلب الحجز الخاص بك بنجاح! سيتصل بك فريق علاقات الضيوف في أقرب وقت ممكن."
  }
};

const FREE_SERVICES = [
  {
    TR: "Kahvaltı Servisi",
    EN: "Breakfast Service",
    ZH: "每日早餐服务",
    AR: "خدمة الفطور"
  },
  {
    TR: "Ücretsiz Wifi",
    EN: "Complimentary Wi-Fi",
    ZH: "免费无线网络",
    AR: "واي فاي مجاني"
  },
  {
    TR: "24 Saat Resepsiyon",
    EN: "24-Hour Reception",
    ZH: "24小时前台服务",
    AR: "استقبال على مدار 24 ساعة"
  },
  {
    TR: "Oda Kasası",
    EN: "In-room Safe",
    ZH: "房间保险箱",
    AR: "خزنة داخل الغرفة"
  },
  {
    TR: "Günlük Çay/Kahve/Su",
    EN: "Daily Tea/Coffee/Water",
    ZH: "每日茶水咖啡与矿泉水",
    AR: "ضيافة شاي وقهوة ومياه يومية"
  },
  {
    TR: "Klima & Isıtma Sistemi",
    EN: "A/C & Heating System",
    ZH: "空调与供暖系统",
    AR: "نظام التكييف والتدفئة"
  },
  {
    TR: "Bagaj Emanet Hizmeti",
    EN: "Luggage Storage",
    ZH: "行李寄存服务",
    AR: "خدمة حفظ الأمتعة"
  },
  {
    TR: "Yastık Menüsü",
    EN: "Pillow Menu",
    ZH: "个性化枕头选择",
    AR: "قائمة اختيار الوسائد"
  },
  {
    TR: "Bebek Yatağı & Mama Sandalyesi",
    EN: "Baby Cot & High Chair",
    ZH: "婴儿床与婴儿餐椅",
    AR: "سرير أطفال وكرسي مرتفع"
  },
  {
    TR: "Ortak Alan Kullanımı",
    EN: "Common Area Access",
    ZH: "公共区域使用",
    AR: "استخدام المناطق المشتركة"
  },
  {
    TR: "Oda Temizliği & Bakım",
    EN: "Room Cleaning & Daily Care",
    ZH: "每日客房清洁与保养",
    AR: "تنظيف الغرفة والخدمة اليومية"
  },
  {
    TR: "Uyandırma Servisi",
    EN: "Wake-up Service",
    ZH: "叫醒服务",
    AR: "خدمة الإيقاظ"
  }
];

const PAID_SERVICES = [
  {
    TR: "Havalimanı veya Şehir Transferi",
    EN: "Airport & City Transfer",
    ZH: "机场与市区接送",
    AR: "نقل المطار والمدينة"
  },
  {
    TR: "Şehir Turu",
    EN: "City Tours",
    ZH: "城市导览",
    AR: "جولات المدينة"
  },
  {
    TR: "Geç Çıkış (Late Check-out)",
    EN: "Late Check-out",
    ZH: "延迟退房服务",
    AR: "تسجيل مغادرة متأخر"
  },
  {
    TR: "Kuru Temizleme & Çamaşırhane",
    EN: "Laundry & Dry Cleaning",
    ZH: "洗衣与干洗服务",
    AR: "تنظيف جاف وغسيل الملابس"
  },
  {
    TR: "Hediyelik Eşya / Mini Market",
    EN: "Souvenirs & Mini-Market",
    ZH: "纪念品与便利店商品",
    AR: "هدايا تذكارية وميني ماركت"
  },
  {
    TR: "Ekstra Nevresim & Battaniye",
    EN: "Extra Linens & Blankets",
    ZH: "额外床单与毛毯",
    AR: "أغطية وبطانيات إضافية"
  }
];

export default function HotelBranding({ language, isLight = true }: HotelBrandingProps) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.TR;

  return (
    <div className="space-y-6 text-left">
      {/* Brand Header with elegant cream theme */}
      <div className={`border rounded-2xl p-6 space-y-4 shadow-md transition-all ${isLight ? "bg-[#FDFBF7] border-[#D4A574]/40 text-[#333333]" : "bg-[#5C1E1B] border-[#D4A574]/20 text-gray-200"}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            {/* Custom SVG Elegant Sırçalı Hotel Logo */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#A0423D] border border-[#D4A574]/30 flex items-center justify-center shrink-0 shadow-sm">
                <img src={logoUrl} className="w-6.5 h-6.5 object-contain" alt="Sırçalı Hotel Logo" />
              </div>
              <div>
                <h1 className="font-serif font-bold text-lg md:text-xl tracking-widest text-[#A0423D]">
                  SIRÇALI HOTEL
                </h1>
                <p className="text-[9px] tracking-widest text-[#999999] font-sans uppercase font-semibold">
                  Konya • Sırçalı Hotel Guide
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#D4A574]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#D4A574] stroke-[#D4A574]" />
              ))}
              <span className="text-[#A0423D] text-[10px] font-bold bg-[#A0423D]/10 px-2 py-0.5 rounded ml-1 uppercase tracking-wider">
                {t.boutique}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              const popup = document.createElement("div");
              popup.className = "fixed top-10 left-1/2 -translate-x-1/2 bg-[#A0423D] border border-[#D4A574] text-white font-sans font-semibold text-xs px-5 py-3 rounded-xl shadow-2xl z-[9999] text-center";
              popup.innerHTML = `
                <div class="font-bold text-[#D4A574] mb-1">${t.popupTitle}</div>
                <div>${t.popupMsg}</div>
              `;
              document.body.appendChild(popup);
              setTimeout(() => popup.remove(), 4000);
            }}
            className="bg-[#A0423D] hover:bg-opacity-95 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all uppercase tracking-wider cursor-pointer border border-[#D4A574]/20 shadow-sm"
          >
            {t.bookBtn}
          </button>
        </div>

        <p className={`text-xs md:text-sm leading-relaxed font-normal ${isLight ? "text-[#333333]" : "text-gray-200"}`}>
          {t.welcome}
        </p>
      </div>

      {/* Facilities and Amenities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Amenities card */}
        <div className={`border p-5 rounded-2xl space-y-5 shadow-sm ${isLight ? "bg-white border-[#E8E8E8]" : "bg-[#5C1E1B] border-[#D4A574]/15"}`}>
          <h3 className={`font-serif font-bold text-sm tracking-wider uppercase flex items-center gap-1.5 border-b pb-2 ${isLight ? "text-[#A0423D] border-[#E8E8E8]" : "text-[#D4A574] border-[#D4A574]/15"}`}>
            <Sparkles className="w-4 h-4 text-[#D4A574]" />
            {t.guestServices}
          </h3>

          <div className="space-y-4">
            {/* Complimentary section */}
            <div className="space-y-2.5">
              <h4 className={`text-[10px] font-bold tracking-wider uppercase ${isLight ? "text-gray-500" : "text-[#D4A574]/80"}`}>
                {t.freeServices}
              </h4>
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium ${isLight ? "text-[#333333]" : "text-gray-200"}`}>
                {FREE_SERVICES.map((s, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#A0423D] shrink-0" />
                    <span className="text-[11px] leading-tight">{s[language] || s.TR}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Paid section */}
            <div className="space-y-2.5 pt-3.5 border-t border-dashed border-[#D4A574]/20">
              <h4 className={`text-[10px] font-bold tracking-wider uppercase ${isLight ? "text-[#A0423D]" : "text-[#D4A574]/80"}`}>
                {t.paidServices}
              </h4>
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium ${isLight ? "text-[#333333]" : "text-gray-200"}`}>
                {PAID_SERVICES.map((s, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CreditCard className="w-3.5 h-3.5 text-[#D4A574] shrink-0" />
                    <span className="text-[11px] leading-tight">{s[language] || s.TR}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact and address card */}
        <div className={`border p-5 rounded-2xl space-y-4 flex flex-col justify-between shadow-sm ${isLight ? "bg-white border-[#E8E8E8]" : "bg-[#5C1E1B] border-[#D4A574]/15"}`}>
          <div className={`space-y-3.5 text-xs font-medium ${isLight ? "text-[#333333]" : "text-gray-200"}`}>
            <h3 className={`font-serif font-bold text-sm tracking-wider uppercase flex items-center gap-1.5 border-b pb-2 ${isLight ? "text-[#A0423D] border-[#E8E8E8]" : "text-[#D4A574] border-[#D4A574]/15"}`}>
              <MapPin className="w-4 h-4 text-[#D4A574]" />
              {t.contactInfo}
            </h3>

            <div className="flex items-start gap-2.5 pt-1">
              <MapPin className="w-4 h-4 text-[#D4A574] shrink-0 mt-0.5" />
              <span>{t.address}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#D4A574] shrink-0" />
              <a href="tel:+903325234242" className="hover:text-[#A0423D] transition-colors">+90 332 523 42 42</a>
            </div>

            <div className="flex items-center gap-2.5">
              <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
              <a href="https://wa.me/905015234242" target="_blank" rel="noopener noreferrer" className="hover:text-[#A0423D] transition-colors flex items-center gap-1">
                <span>+90 501 523 42 42</span>
                <span className="text-[10px] text-gray-400">({t.whatsappSupport})</span>
              </a>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#D4A574] shrink-0" />
              <a href="mailto:info@sircalihotel.com" className="hover:text-[#A0423D] transition-colors">info@sircalihotel.com</a>
            </div>

            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-[#D4A574] shrink-0" />
              <a href="https://sircalihotel.com" className="hover:text-[#A0423D] transition-colors">sircalihotel.com</a>
            </div>
          </div>

          <div className={`text-[10px] font-bold tracking-wider flex items-center gap-1.5 pt-3.5 border-t ${isLight ? "border-[#E8E8E8] text-[#D4A574]" : "border-[#D4A574]/15 text-[#D4A574]"}`}>
            <Shield className="w-4 h-4 text-[#A0423D]" />
            <span>{t.guarantee}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
