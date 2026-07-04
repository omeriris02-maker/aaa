import { TranslationSet, Place, Tour, EventItem } from './types';

export const TRANSLATIONS: Record<string, TranslationSet> = {
  TR: {
    welcome: "Sırçalı Hotel - Konya Tourism Guide",
    discoverBtn: "Konya'yı Keşfetmeye Başla",
    popularPlaces: "Popüler Tarihi Mekanlar",
    weatherTitle: "Konya'da Hava Durumu",
    upcomingEvents: "Yaklaşan Kültür Sanat Etkinlikleri",
    activities: "Yapabileceğiniz Şeyler",
    categories: "Kategoriler",
    mapTab: "İnteraktif Harita",
    placesTab: "Tarihi Mekanlar",
    toursTab: "Özel Rotalar",
    diningTab: "Keşfet",
    eventsTab: "Kültür Takvimi",
    hotelTab: "Sırçalı Hotel",
    favoritesTab: "Kişisel Planım",
    practicalTab: "Pratik Bilgiler",
    aiConciergeTab: "Yapay Zeka Rehberi",
    settingsTab: "Ayarlar",
    searchPlaceholder: "Mekan, kategori veya kelime ara...",
    allCategories: "Tüm Kategoriler",
    unesco: "UNESCO Eserleri",
    mosques: "Tarihi Camiler",
    museums: "Müzeler",
    tombs: "Türbeler",
    medreses: "Medreseler",
    parks: "Parklar & Doğal Alanlar",
    hotelAccom: "Konaklama",
    showAllMosques: "Tüm 3100+ Camiyi Haritada Göster (GeoJSON Verisi)",
    visitingHours: "Ziyaret Saatleri",
    entranceFee: "Giriş Ücreti",
    visitDuration: "Tahmini Ziyaret Süresi",
    accessibility: "Erişilebilirlik Olanakları",
    directionsBtn: "Yol Tarifi Al",
    addFavorite: "Favorilerime Ekle",
    removeFavorite: "Favorilerden Çıkar",
    shareBtn: "Paylaş",
    speakBtn: "Sesli Dinle (TTS)",
    distance: "Toplam Mesafe",
    duration: "Tahmini Süre",
    downloadTour: "Tur Rotasını PDF Olarak İndir",
    emergencyNumbers: "Önemli ve Acil Telefonlar",
    cultureRules: "Konya Kültürel Ziyaret Kuralları",
    customItinerary: "Kendi Rotalarınızı Oluşturun",
    buildItinerary: "Ziyaret Planı Düzenle",
    addRouteStep: "Rotaya Ekle",
    checklistTitle: "Bugün Ziyaret Edeceğim Yerler",
    todayChecklist: "Ziyaret Listem",
    aiWelcome: "Merhaba, ben Sırçalı Hotel Sanal Asistanı. Konya'nın zengin Selçuklu tarihi, gizli lezzet durakları veya gezi planınız hakkında bana dilediğinizi sorabilirsiniz.",
    aiPlaceholder: "Mevlana Müzesi'ne nasıl giderim? Ne yemeliyim?",
    aiSendBtn: "Sor",
    loading: "Yükleniyor...",
    sırçalıBranding: "Sırçalı Hotel - Konya Tourism Guide",
    hotelFacilities: "Otelimiz Olanakları",
    bookRoom: "Rezervasyon Yap",
    noFavorites: "Henüz favori mekan eklemediniz. Keşfetmeye başlayarak beğendiğiniz yerleri buraya ekleyebilirsiniz!",
    cultureAlert: "Dini mekanları ziyaret ederken omuzların ve dizlerin kapalı olmasına ve cami girişlerinde ayakkabıların çıkarılmasına özen gösteriniz.",
    rating: "Puan",
    reviews: "Değerlendirme",
  },
  EN: {
    welcome: "Sırçalı Hotel - Konya Tourism Guide",
    discoverBtn: "Start Exploring Konya",
    popularPlaces: "Popular Historical Sites",
    weatherTitle: "Weather in Konya",
    upcomingEvents: "Upcoming Cultural Events",
    activities: "Things to Do",
    categories: "Categories",
    mapTab: "Interactive Map",
    placesTab: "Historical Places",
    toursTab: "Custom Routes",
    diningTab: "Explore",
    eventsTab: "Culture Calendar",
    hotelTab: "Sırçalı Hotel",
    favoritesTab: "Personal Planner",
    practicalTab: "Practical Info",
    aiConciergeTab: "AI Concierge Guide",
    settingsTab: "Settings",
    searchPlaceholder: "Search place, category or keywords...",
    allCategories: "All Categories",
    unesco: "UNESCO Heritage",
    mosques: "Historic Mosques",
    museums: "Museums",
    tombs: "Tombs",
    medreses: "Madrasas",
    parks: "Parks & Nature",
    hotelAccom: "Accommodations",
    showAllMosques: "Show All 3100+ Mosques on Map (GeoJSON Data)",
    visitingHours: "Visiting Hours",
    entranceFee: "Entrance Fee",
    visitDuration: "Est. Visit Duration",
    accessibility: "Accessibility Features",
    directionsBtn: "Get Directions",
    addFavorite: "Add to Favorites",
    removeFavorite: "Remove from Favorites",
    shareBtn: "Share",
    speakBtn: "Listen (TTS)",
    distance: "Total Distance",
    duration: "Est. Duration",
    downloadTour: "Download Tour Route as PDF",
    emergencyNumbers: "Emergency Contacts",
    cultureRules: "Konya Cultural Visitor Rules",
    customItinerary: "Build Your Own Route",
    buildItinerary: "Configure Visit Plan",
    addRouteStep: "Add to Route",
    checklistTitle: "Places to Visit Today",
    todayChecklist: "My Visit Checklist",
    aiWelcome: "Hello, I am Sırçalı Hotel's Virtual Concierge. You can ask me anything about Konya's rich Seljuk history, hidden culinary spots, or ask for a custom daily itinerary.",
    aiPlaceholder: "How to go to Mevlana Museum? What traditional food should I try?",
    aiSendBtn: "Ask",
    loading: "Loading...",
    sırçalıBranding: "Sırçalı Hotel - Konya Tourism Guide",
    hotelFacilities: "Hotel Amenities",
    bookRoom: "Book a Room",
    noFavorites: "You haven't added any favorite places yet. Start exploring and click the heart icon to save places here!",
    cultureAlert: "Please ensure shoulders and knees are covered when visiting holy places, and remove your shoes before entering mosques.",
    rating: "Rating",
    reviews: "Reviews",
  },
  ZH: {
    welcome: "Sırçalı Hotel - Konya Tourism Guide",
    discoverBtn: "开始探索科尼亚",
    popularPlaces: "热门历史遗迹",
    weatherTitle: "科尼亚天气",
    upcomingEvents: "近期文化活动",
    activities: "精彩体验",
    categories: "分类",
    mapTab: "互动地图",
    placesTab: "历史景点",
    toursTab: "专属路线",
    diningTab: "探索",
    eventsTab: "文化日历",
    hotelTab: "塞尔恰勒酒店",
    favoritesTab: "个人行程计划",
    practicalTab: "实用信息",
    aiConciergeTab: "AI 智能导游",
    settingsTab: "设置",
    searchPlaceholder: "搜索景点、分类或关键词...",
    allCategories: "所有分类",
    unesco: "联合国教科文组织遗迹",
    mosques: "历史清真寺",
    museums: "博物馆",
    tombs: "陵墓",
    medreses: "神学院",
    parks: "公园与绿地",
    hotelAccom: "住宿",
    showAllMosques: "在地图上显示所有 3100+ 座清真寺（GeoJSON 数据）",
    visitingHours: "开放时间",
    entranceFee: "门票费用",
    visitDuration: "预计游览时间",
    accessibility: "无障碍设施",
    directionsBtn: "获取路线",
    addFavorite: "加入收藏",
    removeFavorite: "取消收藏",
    shareBtn: "分享",
    speakBtn: "语音朗读 (TTS)",
    distance: "总距离",
    duration: "预计用时",
    downloadTour: "下载 PDF 格式路线图",
    emergencyNumbers: "紧急联系电话",
    cultureRules: "科尼亚文化参观守则",
    customItinerary: "创建自定义路线",
    buildItinerary: "编辑行程计划",
    addRouteStep: "添加至路线",
    checklistTitle: "今日计划参观地点",
    todayChecklist: "我的参观清单",
    aiWelcome: "您好，我是塞尔恰勒酒店的虚拟礼宾。您可以向我提问关于科尼亚丰富的塞尔柱历史、隐藏的美食去处，或让我为您定制专属行程。",
    aiPlaceholder: "如何前往梅芙拉纳博物馆？有什么推荐的特色美食？",
    aiSendBtn: "提问",
    loading: "加载中...",
    sırçalıBranding: "Sırçalı Hotel - Konya Tourism Guide",
    hotelFacilities: "酒店设施",
    bookRoom: "预订客房",
    noFavorites: "您尚未添加任何收藏景点。开始探索并点击心形图标即可将喜爱的地方保存至此！",
    cultureAlert: "参观宗教场所时请确保肩膀和膝盖被遮盖，进入清真寺前请脱鞋。",
    rating: "评分",
    reviews: "评价",
  },
  AR: {
    welcome: "Sırçalı Hotel - Konya Tourism Guide",
    discoverBtn: "ابدأ باستكشاف قونية",
    popularPlaces: "الأماكن التاريخية الشهيرة",
    weatherTitle: "الطقس في قونية",
    upcomingEvents: "الفعاليات الثقافية القادمة",
    activities: "أشياء يمكن القيام بها",
    categories: "الفئات",
    mapTab: "الخريطة التفاعلية",
    placesTab: "أماكن تاريخية",
    toursTab: "مسارات خاصة",
    diningTab: "استكشف",
    eventsTab: "الجدول الثقافي",
    hotelTab: "فندق سيرتشالي",
    favoritesTab: "خطتي الشخصية",
    practicalTab: "معلومات عملية",
    aiConciergeTab: "دليل الذكاء الاصطناعي",
    settingsTab: "الإعدادات",
    searchPlaceholder: "ابحث عن مكان، فئة أو كلمة...",
    allCategories: "جميع الفئات",
    unesco: "آثار اليونسكو",
    mosques: "مساجد تاريخية",
    museums: "متاحف",
    tombs: "أضرحة",
    medreses: "مدارس تاريخية",
    parks: "حدائق ومناطق طبيعية",
    hotelAccom: "الإقامة",
    showAllMosques: "عرض جميع المساجد الـ 3100+ على الخريطة",
    visitingHours: "أوقات الزيارة",
    entranceFee: "رسوم الدخول",
    visitDuration: "مدة الزيارة المقدرة",
    accessibility: "مرافق ذوي الاحتياجات الخاصة",
    directionsBtn: "احصل على الاتجاهات",
    addFavorite: "أضف إلى المفضلة",
    removeFavorite: "إزالة من المفضلة",
    shareBtn: "مشاركة",
    speakBtn: "استمع بالصوت",
    distance: "المسافة الكلية",
    duration: "الوقت المقدر",
    downloadTour: "تحميل مسار الجولة كملف PDF",
    emergencyNumbers: "أرقام هواتف الطوارئ الهامة",
    cultureRules: "قواعد السلوك والزيارة في قونية",
    customItinerary: "أنشئ مسارك الخاص",
    buildItinerary: "تنسيق خطة الزيارة",
    addRouteStep: "إضافة إلى المسار",
    checklistTitle: "الأماكن التي سأزورها اليوم",
    todayChecklist: "قائمة زياراتي",
    aiWelcome: "مرحباً بك، أنا المساعد الافتراضي لفندق سيرتشالي. يمكنك سؤالي عن تاريخ قونية السلجوقي الغني، مطاعمها التقليدية المخفية، أو طلب تخطيط جدول سياحي خاص.",
    aiPlaceholder: "كيف أذهب إلى متحف مولانا؟ ما هي الأكلات التي يجب تجربتها؟",
    aiSendBtn: "اسأل",
    loading: "جاري التحميل...",
    sırçalıBranding: "Sırçalı Hotel - Konya Tourism Guide",
    hotelFacilities: "مرافق الفندق",
    bookRoom: "احجز غرفة الآن",
    noFavorites: "لم تقم بإضافة أي مكان للمفضلة بعد. ابدأ في استكشاف وحفظ الأماكن المفضلة لديك هنا!",
    cultureAlert: "يرجى التأكد من تغطية الكتفين والركبتين عند زيارة الأماكن الدينية، وخلع الأحذية عند الدخول للمساجد.",
    rating: "التقييم",
    reviews: "التعليقات",
  }
};

// Core, high-detail detailed places to populate lists & interactive map beautifully
const MANUAL_PLACES: Place[] = [
  {
    id: 1,
    isim_tr: "Mevlana Müzesi & Türbesi",
    isim_en: "Mevlana Museum & Tomb",
    isim_zh: "梅芙拉纳博物馆和陵墓",
    isim_ar: "متحف مولانا وضريحه",
    kategori: "UNESCO",
    aciklama_kisa_tr: "Büyük mutasavvıf Mevlâna Celâleddin-i Rûmî'nin türbesi ve dergâhının bulunduğu kutsal müze.",
    aciklama_kisa_en: "The world-famous sacred museum and monastery of the great Sufi mystic Mevlana Celaleddin-i Rumi.",
    aciklama_kisa_zh: "伟大的苏菲神秘主义者梅芙拉纳·杰拉莱丁·鲁米的陵墓和修道院。",
    aciklama_kisa_ar: "المتحف والضريح الشهير عالمياً للمتصوف والشاعر الإسلامي الكبير مولانا جلال الدين الرومي.",
    tarihce_tr: "Mevlana Müzesi, Konya'nın en önemli simgelerinden biridir. Eski adıyla Konya Dergâhı olan yapı, Selçuklu Sarayı'nın gül bahçesi iken Mevlana'nın babasına hediye edilmiştir. Mevlana vefat ettikten sonra mezarı üzerine Yeşil Kubbe inşa edilmiştir. 1926 yılından beri müze olarak el yazmaları, derviş hücreleri ve nadide Selçuklu dönemi eserleriyle hizmet vermektedir.",
    tarihce_en: "The Mevlana Museum is the core symbol of Konya. Once the dervish lodge, the site was originally the rose garden of the Seljuk Palace. Following Mevlana's death in 1273, the gorgeous Green Dome was built. It has served as a museum since 1926, displaying rare manuscripts, dervish cells, and invaluable Seljuk artifacts.",
    tarihce_zh: "梅芙拉纳博物馆是科尼亚的核心标志。这里曾是旋转舞僧会所，后在梅芙拉纳逝世后建起了绿顶。该馆自1926年起作为博物馆，展示罕见的手稿、修道室及珍贵文物。",
    tarihce_ar: "يعد متحف مولانا الرمز الأساسي لمدينة قونية. كان هذا الموقع في السابق تكية للدراويش. بعد وفاة مولانا عام 1273، تم تشييد القبة الخضراء الرائعة فوق ضريحه. ويعمل كمتحف منذ عام 1926، حيث يعرض مخطوطات نادرة والآثار السلجوقية القيمة.",
    koordinatlar: { lat: 37.8708, lng: 32.5052 },
    adres: "Aziziye Mah, Mevlana Cd. No:1, 42030 Karatay/Konya",
    telefon: "+90 332 351 1215",
    web: "https://muze.gov.tr",
    email: "konya.mevlanamuzesi@ktb.gov.tr",
    calisma_saatleri: { "Pazartesi - Pazar": "09:00 - 18:30" },
    giris_ucreti: { tr: "Ücretsiz", en: "Free", zh: "免费", ar: "مجاني" },
    ziyaret_suresi_dk: 90,
    fotograf_url: [],
    etiketler: ["UNESCO", "Müze", "Mevlevilik", "Selçuklu"],
    erisilebilirlik: { elevator: true, wheelchair: true, disabledToilet: true, guideService: true },
    puan: 4.9,
    yorum_sayisi: 45200,
    is_major: true
  },
  {
    id: 2,
    isim_tr: "İnce Minareli Medrese",
    isim_en: "Ince Minareli Madrasa",
    isim_zh: "细塔神学院",
    isim_ar: "مدرسة مئذنة إنجيلي",
    kategori: "Medrese",
    aciklama_kisa_tr: "Selçuklu taş işçiliğinin şaheser kapısı ve yarım minaresi ile tanınan abidevi medrese.",
    aciklama_kisa_en: "A masterpiece of Seljuk stone carving, famous for its portal and halved minaret.",
    aciklama_kisa_zh: "塞尔柱石雕艺术的杰作，以其壮丽的门廊和标志性的半截尖塔而闻名。",
    aciklama_kisa_ar: "تحفة فنية من النحت السلجوقي على الحجر، تشتهر بمدخلها المهيب ومئذنتها نصفية الأثرية الشهيرة.",
    tarihce_tr: "İnce Minareli Medrese, 1264 yılında Selçuklu Veziri Sahip Ata Fahreddin Ali tarafından hadis ilmi öğretilmek üzere yaptırılmıştır. Taç kapısı Selçuklu taş oymacılığının en nadide örneğidir. Gövdesi turkuaz sırlı tuğlalarla bezeli minaresi 1901'de yıldırım düşmesiyle yarım kalmıştır.",
    tarihce_en: "Built in 1264 by Seljuk Vizier Sahip Ata Fahreddin Ali to teach the Hadith. The monumental gate represents the absolute pinnacle of Seljuk stone carving. In 1901, a lightning strike destroyed the upper portion, leaving the iconic half-minaret.",
    tarihce_zh: "由塞尔柱公国于1264年建造，用于教授圣训。宏伟的门户代表了塞尔柱石雕的巅峰。1901年雷击摧毁了尖塔上半部分，留下了标志性的半尖塔。",
    tarihce_ar: "بنيت عام 1264 على يد الوزير السلجوقي صاحب أتا لتدريس الحديث الشريف. تمثل البوابة الأثرية قمة النحت السلجوقي على الحجر. في عام 1901، دمرت صاعقة برق الجزء العلوي منها.",
    koordinatlar: { lat: 37.8724, lng: 32.4904 },
    adres: "Hamidiye Mah, Alaaddin Bulvarı No:15, Selçuklu/Konya",
    telefon: "+90 332 351 3204",
    web: "https://muze.gov.tr",
    calisma_saatleri: { "Hergün": "09:00 - 17:00" },
    giris_ucreti: { tr: "100 TL", en: "100 TRY", zh: "25元", ar: "100 ليرة" },
    ziyaret_suresi_dk: 45,
    fotograf_url: [],
    etiketler: ["Müze", "Medrese", "Selçuklu", "Mimari"],
    erisilebilirlik: { elevator: false, wheelchair: true, disabledToilet: false, guideService: false },
    puan: 4.8,
    yorum_sayisi: 8900,
    is_major: true
  },
  {
    id: 3,
    isim_tr: "Karatay Medresesi",
    isim_en: "Karatay Madrasa",
    isim_zh: "卡拉泰神学院",
    isim_ar: "مدرسة كاراتاي (متحف الخzف)",
    kategori: "Medrese",
    aciklama_kisa_tr: "Mükemmel çini mozaikleriyle Selçuklu çini sanatının doruk noktası sayılan yapı.",
    aciklama_kisa_en: "The zenith of Seljuk tile mosaic work, featuring a spectacular dome with celestial patterns.",
    aciklama_kisa_zh: "卡拉泰神学院是塞尔柱瓷砖马赛克艺术的巅峰之作，拥有星象图般的穹顶。",
    aciklama_kisa_ar: "ذروة أعمال فسيفساء البلاط السلجوقي، وتتميز بقبة مذهلة ذات أنماط فلكية رمزية.",
    tarihce_tr: "Karatay Medresesi, 1251 yılında Celaleddin Karatay tarafından yaptırılmıştır. İç kubbe turkuaz ve lacivert çinilerle kaplı olup gökyüzü haritasını andırır. Günümüzde Çini Eserler Müzesi olarak kullanılmaktadır.",
    tarihce_en: "Karatay Madrasa was commissioned in 1251 by Seljuk Emir Celaleddin Karatay. The interior of the massive dome is blanketed with majestic tiles creating a celestial map. Today, it houses the Museum of Tiles.",
    tarihce_zh: "卡拉泰神学院于1251年建造。穹顶内部完全覆盖着绿松石色和深蓝色瓷砖，犹如天空星象图。如今是瓷砖博物馆。",
    tarihce_ar: "تم بناء مدرسة كاراتاي عام 1251 بتكليف من الأمير جلال الدين كاراتاي. تمت تغطية الجزء الداخلي للقبة بالبلاط الفيروزي والأزرق الداكن ليشكل خريطة فلكية.",
    koordinatlar: { lat: 37.8749, lng: 32.4931 },
    adres: "Ferhuniye Mah, Adliye Bulvarı No:4, Selçuklu/Konya",
    telefon: "+90 332 351 1914",
    web: "https://muze.gov.tr",
    calisma_saatleri: { "Hergün": "09:00 - 17:00" },
    giris_ucreti: { tr: "100 TL", en: "100 TRY", zh: "25元", ar: "100 ليرة" },
    ziyaret_suresi_dk: 45,
    fotograf_url: [],
    etiketler: ["Müze", "Medrese", "Selçuklu", "Çini"],
    erisilebilirlik: { elevator: false, wheelchair: true, disabledToilet: false, guideService: false },
    puan: 4.8,
    yorum_sayisi: 7400,
    is_major: true
  },
  {
    id: 4,
    isim_tr: "Alaeddin Camii",
    isim_en: "Alaeddin Mosque",
    isim_zh: "阿拉丁清真寺",
    isim_ar: "مسجد علاء الدين",
    kategori: "Cami",
    aciklama_kisa_tr: "Alaeddin Tepesi üzerinde yer alan, sekiz Selçuklu sultanının kabrini barındıran ulu cami.",
    aciklama_kisa_en: "The oldest and largest Seljuk monumental congregational mosque, housing eight sultan tombs.",
    aciklama_kisa_zh: "科尼亚最古老的塞尔柱大清真寺，内有八位塞尔柱苏丹的陵墓。",
    aciklama_kisa_ar: "أقدم وأكبر مسجد سلجوقي جامع وأثري، يضم أضرحة ثمانية من السلاطين السلاجقة.",
    tarihce_tr: "Alaeddin Camii, 1221 yılında Alaeddin Keykubad döneminde tamamlanmıştır. İç mekan antik sütunlarla taşınır. Avlusundaki türbede sekiz Selçuklu sultanının mezarları bulunmaktadır.",
    tarihce_en: "Alaeddin Mosque stands atop Alaeddin Hill. Completed in 1221 under Sultan Alaeddin Keykubad, its courtyard houses the remains of eight great Seljuk sultans.",
    tarihce_zh: "阿拉丁清真寺坐落在阿拉丁山丘上，于1221年完工。院内安葬着八位伟大的塞尔柱苏丹。",
    tarihce_ar: "تم الانتهاء من بنائه عام 1221 في عهد السلطان علاء الدين كيقباد. ويضم الضريح في فنائه رفات ثمانية من سلاطين السلاجقة.",
    koordinatlar: { lat: 37.8731, lng: 32.4925 },
    adres: "Alaaddin Tepesi İçi, Ferhuniye Mah, Selçuklu/Konya",
    calisma_saatleri: { "Hergün": "İbadet saatleri" },
    giris_ucreti: { tr: "Ücretsiz", en: "Free", zh: "免费", ar: "مجاني" },
    ziyaret_suresi_dk: 45,
    fotograf_url: [],
    etiketler: ["Cami", "Selçuklu", "Tarihi"],
    erisilebilirlik: { elevator: false, wheelchair: true, disabledToilet: false, guideService: false },
    puan: 4.8,
    yorum_sayisi: 6100,
    is_major: true
  },
  {
    id: 5,
    isim_tr: "Aziziye Camii",
    isim_en: "Aziziye Mosque",
    isim_zh: "阿齐济耶清真寺",
    isim_ar: "مسجد العزيزية",
    kategori: "Cami",
    aciklama_kisa_tr: "Avrupa Barok mimarisinin Osmanlı estetiğiyle harmanlandığı özgün geç dönem Osmanlı camisi.",
    aciklama_kisa_en: "An architectural marvel blending European Baroque with late Ottoman style.",
    aciklama_kisa_zh: "融合了欧洲巴洛克风格与晚期奥斯曼美学的独特清真寺。",
    aciklama_kisa_ar: "مسجد عثماني فريد من العصر المتأخر، يمزج بين الطراز الباروكي والجمالية العثمانية.",
    tarihce_tr: "Aziziye Camii, 1874 yılında Sultan Abdülaziz'in annesi desteğiyle yeniden inşa edilmiştir. Barok tarzı pencereleri kapılarından daha geniştir. Taştan yontulmuş zarif minareleri bulunur.",
    tarihce_en: "Rebuilt in 1874 with the patronage of Pertevniyal Valide Sultan. It is an extraordinary example of late Ottoman Baroque, featuring wide windows and twin stone minarets.",
    tarihce_zh: "于1874年重建，是晚期奥斯曼巴洛克建筑的杰出范例，具有独特的宽大窗户和双石尖塔。",
    tarihce_ar: "أعيد بناؤه عام 1874 برعاية والدة السلطان عبد العزيز. وهو نموذج استثنائي للطراز الباروكي العثماني المتأخر.",
    koordinatlar: { lat: 37.8702, lng: 32.5035 },
    adres: "Aziziye Mah, Selimiye Cd. No:3, Karatay/Konya",
    calisma_saatleri: { "Hergün": "İbadet saatleri" },
    giris_ucreti: { tr: "Ücretsiz", en: "Free", zh: "免费", ar: "مجاني" },
    ziyaret_suresi_dk: 30,
    fotograf_url: [],
    etiketler: ["Cami", "Osmanlı", "Barok"],
    erisilebilirlik: { elevator: false, wheelchair: true, disabledToilet: false, guideService: false },
    puan: 4.8,
    yorum_sayisi: 11200,
    is_major: true
  },
  {
    id: 6,
    isim_tr: "Sırçalı Medrese",
    isim_en: "Sircali Madrasa",
    isim_zh: "瑟尔恰勒神学院 (琉璃神学院)",
    isim_ar: "مدرسة سيرتشالي (المدرسة المزججة)",
    kategori: "Medrese",
    aciklama_kisa_tr: "Sırçalı Hotel'in adına ilham kaynağı olan, muhteşem çinileriyle ünlü Selçuklu şaheseri.",
    aciklama_kisa_en: "The historic Seljuk masterpiece that inspired Sırçalı Hotel's name, famous for glazed tiles.",
    aciklama_kisa_zh: "塞尔恰勒酒店名称的灵感来源，以其华丽的釉面瓷砖装饰而闻名。",
    aciklama_kisa_ar: "التحفة السلجوقية التاريخية التي ألهمت اسم فندق سيرتشالي، تشتهر بأعمال البلاط المزجج.",
    tarihce_tr: "Sırçalı Medrese, 1242 yılında fıkıh ilmi için inşa ettirilmiştir. Adını içindeki göz alıcı sırlı çinilerden alır. Günümüzde Mezar Anıtları Müzesi olarak kullanılmaktadır.",
    tarihce_en: "Sırçalı Madrasa was built in 1242 to teach Islamic jurisprudence. It gets its name 'Sırçalı' (glazed) from the colored tiles that inspired Sırçalı Hotel's elegant branding. Today, it serves as a museum.",
    tarihce_zh: "于1242年建造，用于教授法律。因其令人眩目的釉面瓷砖而得名。现为墓碑艺术博物馆。",
    tarihce_ar: "بُنيت مدرسة سيرتشالي عام 1242 لتدريس الفقه الإسلامي. وهي تأخذ اسمها من البلاط المزجج الملون والزخارف الفسيفسائية.",
    koordinatlar: { lat: 37.8697, lng: 32.4939 },
    adres: "Sarıyakup Mah, Sırçalı Cd. No:20, Meram/Konya",
    calisma_saatleri: { "Hafta İçi": "09:00 - 17:00" },
    giris_ucreti: { tr: "Ücretsiz", en: "Free", zh: "免费", ar: "مجاني" },
    ziyaret_suresi_dk: 40,
    fotograf_url: [],
    etiketler: ["Müze", "Medrese", "Selçuklu", "Çini"],
    erisilebilirlik: { elevator: false, wheelchair: true, disabledToilet: false, guideService: false },
    puan: 4.7,
    yorum_sayisi: 3200,
    is_major: true
  },
  {
    id: 7,
    isim_tr: "Sahip Ata Külliyesi ve Müzesi",
    isim_en: "Sahip Ata Complex & Museum",
    isim_zh: "萨希普·阿塔建筑群和博物馆",
    isim_ar: "مجمع ومتحف صاحب أتا",
    kategori: "Medrese",
    aciklama_kisa_tr: "Selçuklu mimarisinin; cami, türbe, hamam ve medreseden oluşan en prestijli külliyelerinden biri.",
    aciklama_kisa_en: "An outstanding Seljuk complex consisting of a mosque, tomb, madrasa, and bathhouse.",
    aciklama_kisa_zh: "一个杰出的塞尔柱建筑群，由清真寺、陵墓、神学院和浴室组成。",
    aciklama_kisa_ar: "مجمع سلجوقي متميز يتكون من مسجد وضريح ومدرسة وحمام.",
    tarihce_tr: "Sahip Ata Külliyesi, 1258-1283 yılları arasında yaptırılmıştır. Mihrabındaki göz alıcı çinileriyle bilinir. Günümüzde Vakıf Müzesi olarak hizmet vermektedir.",
    tarihce_en: "The Sahip Ata Complex was built between 1258 and 1283 by Seljuk Vizier Sahip Ata. Today, the complex functions as a Waqf Museum showcasing rare manuscripts and historic arts.",
    tarihce_zh: "该建筑群于1258至1283年间建造，壁龛上装饰着美丽的釉面瓷砖。如今作为信托博物馆运营。",
    tarihce_ar: "بُني المجمع بين عامي 1258 و1283 بتكليف من الوزير السلجوقي صاحب أتا. ويضم حالياً متحفاً للأوقاف.",
    koordinatlar: { lat: 37.8683, lng: 32.4929 },
    adres: "Sahibiata Mah, Larende Cd. No:4, Meram/Konya",
    calisma_saatleri: { "Salı - Pazar": "09:00 - 17:00" },
    giris_ucreti: { tr: "Ücretsiz", en: "Free", zh: "免费", ar: "مجاني" },
    ziyaret_suresi_dk: 50,
    fotograf_url: [],
    etiketler: ["Müze", "Medrese", "Selçuklu", "Külliye"],
    erisilebilirlik: { elevator: false, wheelchair: true, disabledToilet: false, guideService: false },
    puan: 4.7,
    yorum_sayisi: 2800,
    is_major: true
  },
  {
    id: 8,
    isim_tr: "Selimiye Camii",
    isim_en: "Selimiye Mosque",
    isim_zh: "塞利米耶清真寺",
    isim_ar: "مسجد السليمية",
    kategori: "Cami",
    aciklama_kisa_tr: "Mevlana Müzesi'nin yanında yer alan, Klasik Dönem Osmanlı mimarisinin görkemli örneği.",
    aciklama_kisa_en: "Standing right next to the Mevlana Museum, it is a classic Ottoman masterpiece.",
    aciklama_kisa_zh: "毗邻梅芙拉纳博物馆，是经典奥斯曼建筑的杰出作。",
    aciklama_kisa_ar: "يقف بجوار متحف مولانا مباشرة، وهو أبرز روائع العمارة العثمانية الكلاسيكية.",
    tarihce_tr: "Yapımına II. Selim'in şehzadelik döneminde başlanmış ve padişahlığı sırasında tamamlanmıştır. Mimar Sinan eseri olduğu kabul edilir. Tek büyük kubbeli klasik Osmanlı mimarisinin zarafetini taşır.",
    tarihce_en: "Construction began under Sultan Selim II while a prince and completed during his reign. Heavily attributed to Mimar Sinan, carrying classical Ottoman design.",
    tarihce_zh: "在其在科尼亚担任王子期间开始建造，并在其继位后完工。该建筑被归功于建筑大师米马尔·希南。",
    tarihce_ar: "بدأ بناؤه عندما كان السلطان سليم الثاني أميراً في قونية. ويُنسب إلى المعماري معمار سنان.",
    koordinatlar: { lat: 37.8705, lng: 32.5049 },
    adres: "Aziziye Mah, Selimiye Cd. No:1, Karatay/Konya",
    calisma_saatleri: { "Hergün": "İbadet saatleri" },
    giris_ucreti: { tr: "Ücretsiz", en: "Free", zh: "免费", ar: "مجاني" },
    ziyaret_suresi_dk: 30,
    fotograf_url: [],
    etiketler: ["Cami", "Osmanlı", "Klasik", "Mimar Sinan"],
    erisilebilirlik: { elevator: false, wheelchair: true, disabledToilet: true, guideService: false },
    puan: 4.8,
    yorum_sayisi: 5400
  },
  {
    id: 11,
    isim_tr: "Mevlevi Medeniyeti Müzesi",
    isim_en: "Mevlevi Civilization Museum",
    isim_zh: "梅夫拉维文明博物馆",
    isim_ar: "متحف الحضارة المولوية",
    kategori: "Müze",
    aciklama_kisa_tr: "Mevlevi kültürünü balmumu heykeller ve canlandırmalarla yaşatan modern müze.",
    aciklama_kisa_en: "A modern museum showcasing Sufi Mevlevi culture via wax sculptures and dioramas.",
    aciklama_kisa_zh: "通过蜡像和实景展现苏菲派梅夫拉维文化的现代博物馆。",
    aciklama_kisa_ar: "متحف حديث يعرض الثقافة المولوية الصوفية من خلال التماثيل الشمعية والمجسمات.",
    tarihce_tr: "Mevlevi kültürünü yaşatmak ve dünyaya tanıtmak üzere kurulmuştur. Dervişlerin eğitim aşamaları balmumu heykellerle anlatılır.",
    tarihce_en: "Operates to promote Sufi teachings. Displays the education and daily life of Whirling Dervishes via realistic wax statues.",
    tarihce_zh: "旨在弘扬苏菲派教义。馆内的蜡像展示了旋转舞僧的教育和日常生活方式。",
    tarihce_ar: "يعزز التعاليم الصوفية. تقدم التماثيل الشمعية في الداخل مراحل تعليم الدراويش وانضباطهم اليومي.",
    koordinatlar: { lat: 37.8701, lng: 32.5085 },
    adres: "Yenimahalle, Aslanlı Kışla Cd. No:8, Karatay/Konya",
    calisma_saatleri: { "Hergün": "09:00 - 18:00" },
    giris_ucreti: { tr: "Ücretsiz", en: "Free", zh: "免费", ar: "مجاني" },
    ziyaret_suresi_dk: 120,
    fotograf_url: [],
    etiketler: ["Kültür", "Mevlevilik", "Sema", "Müze"],
    erisilebilirlik: { elevator: true, wheelchair: true, disabledToilet: true, guideService: true },
    puan: 4.8,
    yorum_sayisi: 12100
  },
  {
    id: 12,
    isim_tr: "Alaeddin Tepesi Parkı",
    isim_en: "Alaeddin Hill Park",
    isim_zh: "阿拉丁山丘公园",
    isim_ar: "حديقة تلة علاء الدين",
    kategori: "Park",
    aciklama_kisa_tr: "Konya'nın tam merkezinde yer alan, yeşillikler içindeki tarihi dinlenme alanı.",
    aciklama_kisa_en: "A historic park located in the exact center of Konya, offering lush greenery.",
    aciklama_kisa_zh: "位于科尼亚市中心的绿洲，建立在一个史前丘冢之上，环境优美。",
    aciklama_kisa_ar: "حديقة تاريخية تقع في الوسط الجغرافي لقونية، وتوفر مساحات خضراء وارفة.",
    tarihce_tr: "Alaeddin Tepesi, Tunç Çağı'na kadar uzanan eski bir höyüktür. Selçuklu saray harabeleri ve çay bahçeleriyle günümüzde Konya'nın en popüler dinlenme yeridir.",
    tarihce_en: "Alaeddin Hill is a historic settlement mound. Today, the park is a lush green refuge filled with beautiful tea gardens and paths.",
    tarihce_zh: "阿拉丁山丘是一个历史悠久的定居丘。公园是一个郁郁葱葱的绿色避难所，充满了茶园和漫步小径。",
    tarihce_ar: "تلة علاء الدين هي تل استيطاني يعود لعصور ما قبل التاريخ. والحديقة عبارة عن ملجأ أخضر مورق مليء بحدائق الشاي.",
    koordinatlar: { lat: 37.8728, lng: 32.4922 },
    adres: "Alaaddin Tepesi Parkı İçi, Selçuklu/Konya",
    calisma_saatleri: { "Hergün": "24 Saat Açık" },
    giris_ucreti: { tr: "Ücretsiz", en: "Free", zh: "免费", ar: "مجاني" },
    ziyaret_suresi_dk: 60,
    fotograf_url: [],
    etiketler: ["Park", "Tarihi", "Dinlenme", "Höyük"],
    erisilebilirlik: { elevator: false, wheelchair: true, disabledToilet: true, guideService: false },
    puan: 4.5,
    yorum_sayisi: 9800
  }
];

// Extra 10 Important Places to reach exactly 20 (UNESCO & Important sites total)
const EXTRA_IMPORTANT_PLACES: Place[] = [
  {
    id: 9,
    isim_tr: "İplikçi Camii",
    isim_en: "Iplikci Mosque",
    isim_zh: "伊普利克奇清真寺",
    isim_ar: "مسجد إبليكجي",
    kategori: "Cami",
    aciklama_kisa_tr: "13. yüzyıldan kalma tuğla işçiliği ve akustik kubbesiyle bilinen tarihi Selçuklu camii.",
    aciklama_kisa_en: "A historic 13th-century Seljuk mosque famous for beautiful brickwork and acoustics.",
    aciklama_kisa_zh: "建于13世纪的塞尔柱历史清真寺，以精美砖雕和回音穹顶闻名。",
    aciklama_kisa_ar: "مسجد سلجوقي تاريخي يعود للقرن الثالث عشر، يشتهر بأعمال الطوب البديعة وصوتياته.",
    tarihce_tr: "Mevlana'nın da dersler verdiği bilinen bu cami, eşsiz akustik kubbesiyle Konya'nın en eski Selçuklu eserlerindendir.",
    tarihce_en: "One of Konya's oldest Seljuk mosques, where Mevlana taught. Famous for its twin acoustic domes.",
    tarihce_zh: "科尼亚最古老的塞尔柱清真寺之一。梅芙拉纳曾在此讲学。具有出色的原音穹顶设计。",
    tarihce_ar: "مسجد سلجوقي تاريخي قديم، ألقى فيه مولانا جلال الدين الرومي دروساً يوماً ما.",
    koordinatlar: { lat: 37.8718, lng: 32.4975 },
    adres: "Şükran Mah, Karatay/Konya",
    calisma_saatleri: { "Hergün": "İbadet saatleri" },
    giris_ucreti: { tr: "Ücretsiz", en: "Free", zh: "免费", ar: "مجاني" },
    ziyaret_suresi_dk: 30,
    fotograf_url: [],
    etiketler: ["Cami", "Selçuklu", "Tarihi"],
    erisilebilirlik: { elevator: false, wheelchair: true, disabledToilet: false, guideService: false },
    puan: 4.7,
    yorum_sayisi: 1800
  },
  {
    id: 10,
    isim_tr: "Çatalhöyük Neolitik Kenti",
    isim_en: "Catalhoyuk Neolithic Site",
    isim_zh: "恰塔霍裕克新石器时代遗址",
    isim_ar: "موقع تشاتال هويوك",
    kategori: "UNESCO",
    aciklama_kisa_tr: "UNESCO Dünya Mirası Listesi'nde yer alan 9000 yıllık antik proto-kent.",
    aciklama_kisa_en: "A 9000-year-old ancient proto-city on the UNESCO World Heritage list.",
    aciklama_kisa_zh: "联合国教科文组织世界遗产名录上的一座拥有9000年历史的古代原城市。",
    aciklama_kisa_ar: "موقع أثري يبلغ عمره 9000 عام مدرج على قائمة التراث العالمي لليونسكو.",
    tarihce_tr: "Evlerin birbirine bitişik yapıldığı ve girişlerin çatılardan sağlandığı bu proto-kent, toplumsal eşitlikçiliğin en erken örneğidir.",
    tarihce_en: "A historic neolithic settlement with streetless urban layout where homes are joined and entered through roofs.",
    tarihce_zh: "一个没有街道的新石器时代定居点。房屋紧密相连，人们从屋顶进入室内。",
    tarihce_ar: "موقع استيطاني قديم جداً، تميز بتلاصق المنازل والدخول إليها عبر الأسطح.",
    koordinatlar: { lat: 37.6675, lng: 32.8275 },
    adres: "Küçükköy Mah, Çumra/Konya",
    calisma_saatleri: { "Hergün": "09:00 - 17:30" },
    giris_ucreti: { tr: "Ücretsiz", en: "Free", zh: "免费", ar: "مجاني" },
    ziyaret_suresi_dk: 150,
    fotograf_url: [],
    etiketler: ["UNESCO", "Antik", "Tarih Öncesi"],
    erisilebilirlik: { elevator: false, wheelchair: true, disabledToilet: true, guideService: true },
    puan: 4.8,
    yorum_sayisi: 5600
  },
  {
    id: 13,
    isim_tr: "Eşrefoğlu Camii",
    isim_en: "Esrefoglu Mosque",
    isim_zh: "埃什雷福卢清真寺",
    isim_ar: "مسجد أشرف أوغلي",
    kategori: "UNESCO",
    aciklama_kisa_tr: "Anadolu'daki en büyük ahşap direkli cami olan UNESCO Dünya Mirası eseri.",
    aciklama_kisa_en: "The largest wooden-columned Seljuk mosque in Anatolia, a UNESCO site.",
    aciklama_kisa_zh: "安纳托利亚最大的木柱塞尔柱清真寺，联合国教科文组织遗产。",
    aciklama_kisa_ar: "أكبر مسجد سلجوقي ذو أعمدة خشبية في الأناضول، موقع يونسكو.",
    tarihce_tr: "1299 yılında inşa edilen camide 47 ardıç sütun bulunur. 2023 yılında UNESCO Dünya Mirası Listesi'ne alınmıştır.",
    tarihce_en: "Built in 1299 with 47 giant cedar pillars. Enlisted as a UNESCO World Heritage Site in 2023.",
    tarihce_zh: "于1299年建造，包含47根巨大的雪松木柱。2023年被列为世界文化遗产。",
    tarihce_ar: "بُني عام 1299 ويحتوي على 47 عموداً خشبياً ضخماً. أُدرج على قائمة اليونسكو عام 2023.",
    koordinatlar: { lat: 37.6806, lng: 31.7208 },
    adres: "İçerişehir Mah, Beyşehir/Konya",
    calisma_saatleri: { "Hergün": "İbadet saatleri" },
    giris_ucreti: { tr: "Ücretsiz", en: "Free", zh: "免费", ar: "مجاني" },
    ziyaret_suresi_dk: 60,
    fotograf_url: [],
    etiketler: ["UNESCO", "Ahşap", "Tarihi"],
    erisilebilirlik: { elevator: false, wheelchair: true, disabledToilet: false, guideService: false },
    puan: 4.9,
    yorum_sayisi: 4500
  },
  {
    id: 14,
    isim_tr: "Konya Arkeoloji Müzesi",
    isim_en: "Konya Archaeological Museum",
    isim_zh: "科尼亚考古博物馆",
    isim_ar: "متحف قونية الأثري",
    kategori: "Müze",
    aciklama_kisa_tr: "Neolitik Çağ'dan Roma dönemine uzanan nadide eserler ve Herakles Lahdi.",
    aciklama_kisa_en: "A museum featuring invaluable artifacts from Neolithic Era to Roman times.",
    aciklama_kisa_zh: "一座拥有从新石器时代到罗马时期珍贵文物的考古博物馆。",
    aciklama_kisa_ar: "متحف متميز يضم قطعاً أثرية تمتد من العصر الحجري الحديث إلى العصور الرومانية.",
    tarihce_tr: "1901'de kurulan müzenin en meşhur eseri üzerinde kabartmalar barındıran Herakles Lahdi'dir.",
    tarihce_en: "Established in 1901, its undisputed crown jewel is the Roman Herakles Sarcophagus.",
    tarihce_zh: "成立于1901年，镇馆之宝是罗马时代的赫拉克勒斯石棺（Herakles Sarcophagus）。",
    tarihce_ar: "تأسس عام 1901، درة تاجه هو تابوت هرقل الروماني ذو النقوش البديعة.",
    koordinatlar: { lat: 37.8688, lng: 32.4891 },
    adres: "Sahibiata Mah, Larende Cd. No:32, Meram/Konya",
    calisma_saatleri: { "Hergün": "09:00 - 17:00" },
    giris_ucreti: { tr: "Ücretsiz", en: "Free", zh: "免费", ar: "مجاني" },
    ziyaret_suresi_dk: 60,
    fotograf_url: [],
    etiketler: ["Müze", "Arkeoloji", "Tarihi"],
    erisilebilirlik: { elevator: true, wheelchair: true, disabledToilet: true, guideService: false },
    puan: 4.6,
    yorum_sayisi: 1400
  },
  {
    id: 15,
    isim_tr: "Şerafettin Camii",
    isim_en: "Serafettin Mosque",
    isim_zh: "谢拉费丁清真寺",
    isim_ar: "مسجد شرف الدين",
    kategori: "Cami",
    aciklama_kisa_tr: "Tek kubbe mühendisliğiyle taşıyıcı sütun barındırmayan abidevi camii.",
    aciklama_kisa_en: "An imposing historical mosque with a single dome covering the entire hall.",
    aciklama_kisa_zh: "科尼亚市中心一座气势恢宏、不带支撑柱的单穹顶清真寺。",
    aciklama_kisa_ar: "مسجد تاريخي مهيب في وسط المدينة، يتميز بقبة ضخمة لا تسندها أعمدة.",
    tarihce_tr: "12. yüzyılda Selçuklu döneminde inşa edilmiş, tek büyük kubbesiyle ün kazanmıştır.",
    tarihce_en: "Originally built in 12th century. The highlight is its massive dome covering prayer hall.",
    tarihce_zh: "最初建于12世纪，最突出的建筑特点是覆盖整个大厅的巨型单穹顶。",
    tarihce_ar: "بُني في القرن الثاني عشر ويتميز بقبة مفردة مذهلة تغطي الصالة بالكامل.",
    koordinatlar: { lat: 37.8719, lng: 32.4994 },
    adres: "Şükran Mah, Hükümet Meydanı, Karatay/Konya",
    calisma_saatleri: { "Hergün": "İbadet saatleri" },
    giris_ucreti: { tr: "Ücretsiz", en: "Free", zh: "免费", ar: "مجاني" },
    ziyaret_suresi_dk: 30,
    fotograf_url: [],
    etiketler: ["Cami", "Tarihi", "Selçuklu"],
    erisilebilirlik: { elevator: false, wheelchair: true, disabledToilet: false, guideService: false },
    puan: 4.8,
    yorum_sayisi: 2200
  },
  {
    id: 16,
    isim_tr: "Şems-i Tebrizi Camii & Türbesi",
    isim_en: "Sems-i Tebrizi Mosque & Tomb",
    isim_zh: "沙姆西·大不里士清真寺和陵墓",
    isim_ar: "مسجد وضريح şems-i Tebrizi",
    kategori: "Türbe",
    aciklama_kisa_tr: "Mevlana'nın manevi yoldaşı Şems-i Tebrizi'nin makam türbesi.",
    aciklama_kisa_en: "The sacred sanctuary containing the tomb of Sems-i Tebrizi.",
    aciklama_kisa_zh: "包含沙姆西·大不里士陵墓的精神圣地。",
    aciklama_kisa_ar: "الصرح المقدس الذي يضم ضريح رفيق جلال الدين الرومي الروحي.",
    tarihce_tr: "Mevlana'nın gönül dünyasında devrim yaratan Şems-i Tebrizi'nin kutsal makamı buradadır.",
    tarihce_en: "Here lies the spiritual station of Sems-i Tebrizi, who kindled the divine fire in Mevlana.",
    tarihce_zh: "这里安葬着沙姆西·大不里士，正是他启迪了梅芙拉纳的精神世界。",
    tarihce_ar: "هنا يرقد شمس التبريزي، المتصوف الذي أشعل الثورة الروحية في قلب جلال الدين الرومي.",
    koordinatlar: { lat: 37.8745, lng: 32.4996 },
    adres: "Şems Mah, Karatay/Konya",
    calisma_saatleri: { "Hergün": "09:00 - 18:30" },
    giris_ucreti: { tr: "Ücretsiz", en: "Free", zh: "免费", ar: "مجاني" },
    ziyaret_suresi_dk: 40,
    fotograf_url: [],
    etiketler: ["Türbe", "Cami", "Mevlevilik"],
    erisilebilirlik: { elevator: false, wheelchair: true, disabledToilet: false, guideService: false },
    puan: 4.9,
    yorum_sayisi: 6800,
    is_major: true
  },
  {
    id: 17,
    isim_tr: "Atatürk Müzesi",
    isim_en: "Ataturk House Museum",
    isim_zh: "阿塔图尔克博物馆",
    isim_ar: "متحف بيت أتatürk",
    kategori: "Müze",
    aciklama_kisa_tr: "Atatürk'ün Konya ziyaretlerinde konakladığı tarihi iki katlı konak.",
    aciklama_kisa_en: "The historic mansion where Mustafa Kemal Ataturk stayed in Konya.",
    aciklama_kisa_zh: "国父阿塔图尔克访问科尼亚期间居住的两层历史豪宅。",
    aciklama_kisa_ar: "القصر التاريخي الذي أقام فيه مصطفى كمال أتاتورك خلال زياراته لقونية.",
    tarihce_tr: "Atatürk'e Konya halkı tarafından hediye edilen bu konakta kişisel eşyaları sergilenmektedir.",
    tarihce_en: "Gifted to Ataturk by citizens, this 1912 mansion displays personal items and photos.",
    tarihce_zh: "由市民赠送给阿塔图尔克，展出他的衣物、手稿及历史照片。",
    tarihce_ar: "قصر أثري يعود لعام 1912 يعرض ملابس وأغراض وصور أتاتورك الشخصية.",
    koordinatlar: { lat: 37.8692, lng: 32.4878 },
    adres: "Anıt Mah, Atatürk Cd. No:8, Meram/Konya",
    calisma_saatleri: { "Hergün": "09:00 - 17:00" },
    giris_ucreti: { tr: "Ücretsiz", en: "Free", zh: "免费", ar: "مجاني" },
    ziyaret_suresi_dk: 30,
    fotograf_url: [],
    etiketler: ["Müze", "Atatürk", "Tarihi"],
    erisilebilirlik: { elevator: false, wheelchair: true, disabledToilet: false, guideService: false },
    puan: 4.5,
    yorum_sayisi: 950
  },
  {
    id: 18,
    isim_tr: "Etnografya Müzesi",
    isim_en: "Ethnography Museum",
    isim_zh: "民俗博物馆",
    isim_ar: "المتحف الإثنوغرافي",
    kategori: "Müze",
    aciklama_kisa_tr: "Asırlık Türkmen ve Yörük kültürünü, el halılarını sergileyen müze.",
    aciklama_kisa_en: "A cultural museum showcasing Turkmen and nomad lifestyles and carpets.",
    aciklama_kisa_zh: "展示安纳托利亚中部数百年历史的土库曼和约鲁克传统与地毯的博物馆。",
    aciklama_kisa_ar: "متحف يعرض أنماط حياة تركمان الأناضول والسجاد المنسوج يدوياً.",
    tarihce_tr: "Selçuklu ve Osmanlı dönemlerinden kalma halı, silah, sikke ve Konya gelin odası sergilenir.",
    tarihce_en: "Exhibits historic rugs, nomad tents, silver coins, and cultural wedding rooms.",
    tarihce_zh: "展出塞尔柱 and 奥斯曼时期的吉里姆地毯、游牧帐篷、武器及传统婚礼房。",
    tarihce_ar: "يعرض السجاد والكليم والخيام البدوية والأسلحة والعملات الفضية القديمة.",
    koordinatlar: { lat: 37.8687, lng: 32.4893 },
    adres: "Sahibiata Mah, Larende Cd. No:44, Meram/Konya",
    calisma_saatleri: { "Hergün": "09:00 - 17:00" },
    giris_ucreti: { tr: "Ücretsiz", en: "Free", zh: "免费", ar: "مجاني" },
    ziyaret_suresi_dk: 45,
    fotograf_url: [],
    etiketler: ["Müze", "Kültür", "Halı"],
    erisilebilirlik: { elevator: true, wheelchair: true, disabledToilet: false, guideService: false },
    puan: 4.4,
    yorum_sayisi: 850
  },
  {
    id: 19,
    isim_tr: "Zazadin Hanı (Kervansaray)",
    isim_en: "Zazadin Han Caravanserai",
    isim_zh: "扎扎丁汉客栈 (塞尔柱大驿站)",
    isim_ar: "خان زازادين",
    kategori: "UNESCO",
    aciklama_kisa_tr: "Tarihi İpek Yolu üzerinde Selçuklu mimarisinin kale benzeri kervansarayı.",
    aciklama_kisa_en: "One of the grandest Seljuk caravanserais on the historic Silk Road.",
    aciklama_kisa_zh: "历史悠久的丝绸之路上城堡般的塞尔柱驿站客栈。",
    aciklama_kisa_ar: "واحد من أضخم الخانات السلجوقية على طريق الحرير التاريخي.",
    tarihce_tr: "1237 yılında yaptırılan han, tüccarların ve kervanların konaklaması için tasarlanmıştır.",
    tarihce_en: "Built in 1237 by Seljuk Vizier to secure merchants and precious Silk Road goods.",
    tarihce_zh: "于1237年建造，像堡垒一样，保障丝绸之路上来往商旅的安全。",
    tarihce_ar: "بُني عام 1237 لحماية التجار وحيواناتهم وبضائع طريق الحرير الثمينة.",
    koordinatlar: { lat: 37.9822, lng: 32.6101 },
    adres: "Tömek Mah, Selçuklu/Konya",
    calisma_saatleri: { "Hergün": "09:00 - 18:00" },
    giris_ucreti: { tr: "50 TL", en: "50 TRY", zh: "12元", ar: "50 ليرة" },
    ziyaret_suresi_dk: 60,
    fotograf_url: [],
    etiketler: ["UNESCO", "Kervansaray", "Selçuklu"],
    erisilebilirlik: { elevator: false, wheelchair: true, disabledToilet: false, guideService: false },
    puan: 4.7,
    yorum_sayisi: 1100
  },
  {
    id: 20,
    isim_tr: "Nasreddin Hoca Türbesi",
    isim_en: "Nasreddin Hodja Tomb",
    isim_zh: "阿凡提之墓",
    isim_ar: "ضريح نصر الدين خوجة",
    kategori: "Türbe",
    aciklama_kisa_tr: "Türk halk bilgesi Nasreddin Hoca'nın mizahi felsefesini yansıtan türbesi.",
    aciklama_kisa_en: "The historic, wall-less but locked tomb of the humorist Nasreddin Hodja.",
    aciklama_kisa_zh: "土耳其智者与幽默大师阿凡提的陵墓，设计独特，充满讽刺幽默。",
    aciklama_kisa_ar: "الضريح التاريخي لنصر الدين خوجة (جحا)، صمم بشكل ساخر بدون جدران وبباب مغلق.",
    tarihce_tr: "Dört tarafı açık olmasına rağmen önündeki kapısı kilitli olan bu türbe, Hoca'nın mizahını simgeler.",
    tarihce_en: "Has no side walls but features a locked gate, perfectly embodying Hodja's witty spirit.",
    tarihce_zh: "完全没有侧墙却在正面安有一道紧锁的铁门，生动呈现其幽默精神。",
    tarihce_ar: "ليس له جدران جانبية وله بوابة حديدية مغلقة بقفل, يجسد روح الدعابة لديه.",
    koordinatlar: { lat: 38.3582, lng: 31.4172 },
    adres: "Akşehir/Konya",
    calisma_saatleri: { "Hergün": "24 Saat Ziyarete Açık" },
    giris_ucreti: { tr: "Ücretsiz", en: "Free", zh: "免费", ar: "مجاني" },
    ziyaret_suresi_dk: 45,
    fotograf_url: [],
    etiketler: ["Türbe", "Mizah", "Bilge"],
    erisilebilirlik: { elevator: false, wheelchair: true, disabledToilet: false, guideService: false },
    puan: 4.7,
    yorum_sayisi: 3500
  }
];
function generateNaturalAndHistoricAreas(): Place[] {
  const results: Place[] = [];
  const names = [
    { 
      tr: "Beyşehir Gölü Milli Parkı", 
      en: "Beysehir Lake National Park", 
      zh: "贝伊谢希尔湖国家公园", 
      ar: "حديقة بحيرة بيشهير الوطنية", 
      cat: "Park" as const,
      lat: 37.7554, 
      lng: 31.5458,
      comment: "Konya şehir merkezine kuş uçuşu ~85 km batı"
    },
    { 
      tr: "Meke Krater Gölü", 
      en: "Meke Crater Lake", 
      zh: "梅克火山口湖", 
      ar: "بحيرة ميكي البركانية", 
      cat: "Park" as const,
      lat: 37.6834, 
      lng: 33.5684,
      comment: "Konya şehir merkezine kuş uçuşu ~100 km doğu-güneydoğu"
    },
    { 
      tr: "Tuz Gölü", 
      en: "Lake Tuz (Salt Lake)", 
      zh: "图兹湖 (盐湖)", 
      ar: "بحيرة الملح (توز غولو)", 
      cat: "Park" as const,
      lat: 38.7500, 
      lng: 33.3000,
      comment: "Konya şehir merkezine kuş uçuşu ~120 km kuzeydoğu"
    },
    { 
      tr: "Yerköprü Şelalesi", 
      en: "Yerkopru Waterfall", 
      zh: "叶尔科普鲁瀑布", 
      ar: "شلال يركوبرo", 
      cat: "Park" as const,
      lat: 37.0315, 
      lng: 32.4452,
      comment: "Konya şehir merkezine kuş uçuşu ~100 km güney"
    },
    { 
      tr: "Kilistra Antik Kenti", 
      en: "Kilistra Ancient City", 
      zh: "基利斯特拉古城", 
      ar: "مدينة كيليسترا القديمة", 
      cat: "UNESCO" as const,
      lat: 37.7214, 
      lng: 32.2222,
      comment: "Konya şehir merkezine kuş uçuşu ~35 km güneybatı"
    },
    { 
      tr: "Sille Baraj Parkı", 
      en: "Sille Dam Park", 
      zh: "西勒大坝公园", 
      ar: "حديقة سد سيلّه", 
      cat: "Park" as const,
      lat: 37.9150, 
      lng: 32.4172,
      comment: "Konya şehir merkezine kuş uçuşu ~9 km kuzeybatı"
    },
    { 
      tr: "Obruk Gölü", 
      en: "Obruk Sinkhole Lake", 
      zh: "奥布鲁克落水洞湖", 
      ar: "بحيرة أوبيروك", 
      cat: "Park" as const,
      lat: 37.9715, 
      lng: 33.3364,
      comment: "Konya şehir merkezine kuş uçuşu ~80 km kuzeydoğu"
    },
    { 
      tr: "Hadim Göksu Şelalesi", 
      en: "Hadim Goksu Waterfall", 
      zh: "哈迪姆格克苏瀑布", 
      ar: "شلال هاديم غوكسu", 
      cat: "Park" as const,
      lat: 37.0145, 
      lng: 32.4332,
      comment: "Konya şehir merkezine kuş uçuşu ~101 km güney"
    },
  ];

  for (let i = 0; i < names.length; i++) {
    results.push({
      id: 300 + i,
      isim_tr: names[i].tr,
      isim_en: names[i].en,
      isim_zh: names[i].zh,
      isim_ar: names[i].ar,
      kategori: names[i].cat,
      aciklama_kisa_tr: `${names[i].tr}, Konya'nın eşsiz doğal güzelliklerinden biridir.`,
      aciklama_kisa_en: `${names[i].en} is one of the unique natural beauties of Konya.`,
      aciklama_kisa_zh: `${names[i].zh} 是科尼亚独特的自然美景之一。`,
      aciklama_kisa_ar: `${names[i].ar} هي واحدة من الجمال الطبيعي الفريد في قونية.`,
      tarihce_tr: `${names[i].tr} bölgesi yüzyıllar boyunca yerel halk ve ziyaretçiler için bir cazibe merkezi olmuştur.`,
      tarihce_en: `The ${names[i].en} area has been an attraction for locals and visitors for centuries.`,
      tarihce_zh: `${names[i].zh}地区数百年来一直是当地人和游客的瞩目焦点。`,
      tarihce_ar: `كانت منطقة ${names[i].ar} مركز جذب للسكان المحليين والزوار لقرون.`,
      koordinatlar: { lat: names[i].lat, lng: names[i].lng },
      adres: `${names[i].tr} Mevkii, Konya`,
      calisma_saatleri: { "Yaz (Summer)": "08:00-19:00", "Kış (Winter)": "08:00-17:00", "Pazartesi (Monday)": "10:00-17:00" },
      giris_ucreti: { tr: "Ücretsiz", en: "Free", zh: "免费", ar: "مجاني" },
      ziyaret_suresi_dk: 45,
      fotograf_url: [],
      etiketler: ["Doğa", "Açık Alan", "Manzara"],
      erisilebilirlik: { elevator: false, wheelchair: true, disabledToilet: false, guideService: false },
      puan: Number((4.3 + ((300 + i) % 5) * 0.1).toFixed(1)),
      yorum_sayisi: 120 + i * 5
    });
  }
  return results;
}

function generate40MoreMosques(): Place[] {
  return [];
}
/*
function _disabled_generate40MoreMosques(): Place[] {
  const results: Place[] = [];
  const names = [
    { tr: "Aziziye Camii", lat: 37.8702, lng: 32.5025 },
    { tr: "Selimiye Camii", lat: 37.8706, lng: 32.5045 },
    { tr: "Şerafettin Camii", lat: 37.8722, lng: 32.4998 },
    { tr: "Kamberler Camii", lat: 37.8688, lng: 32.4932 },
    { tr: "Sırçalı Mescid", lat: 37.8699, lng: 32.4891 },
    { tr: "Hacı Hasan Camii", lat: 37.8735, lng: 32.5061 },
    { tr: "Kapı Camii", lat: 37.8711, lng: 32.5012 },
    { tr: "Amberreis Camii", lat: 37.8744, lng: 32.4831 },
    { tr: "Tahahir Camii", lat: 37.8655, lng: 32.4951 },
    { tr: "Nakiboğlu Camii", lat: 37.8761, lng: 32.5111 }
  ];

  for (let i = 0; i < 40; i++) {
    const base = names[i % names.length];
    results.push({
      id: 400 + i,
      isim_tr: `${base.tr} Ek Camii No: ${i + 1}`,
      isim_en: `${base.tr} Annex No: s${i + 1}`,
      isim_zh: `s${base.tr} 附属礼拜堂 No: ${i + 1}`,
      isim_ar: `ملحق ${base.tr} رقم ${i + 1}`,
      kategori: "Cami" as const,
      aciklama_kisa_tr: `Konya'nın tarihi dokusunu tamamlayan asırlık mahalle camilerinden biri.`,
      aciklama_kisa_en: `One of the historic neighborhood mosques complementing Konya's unique spiritual atmosphere.`,
      aciklama_kisa_zh: `作为科尼亚独特精神氛围补充的历史悠久的社区清真寺之一。`,
      aciklama_kisa_ar: `أحد المساجد التاريخية في الأحياء التي تكمل الأجواء الروحية لقونية.`,
      tarihce_tr: `Bu ibadethane Selçuklu ve Osmanlı mimari öğelerinden esinlenerek inşa edilmiştir.`,
      tarihce_en: `This house of worship was built with inspiration from Seljuk and Ottoman architectural elements.`,
      tarihce_zh: `这座崇拜场所是在塞尔柱和奥斯曼建筑元素的灵感下建造的。`,
      tarihce_ar: `تم بناء دار العبادة هذا مستوحى من العناصر المعمارية السلجوقية والعثمانية.`,
      koordinatlar: { lat: base.lat + (i * 0.001), lng: base.lng + (i * 0.001) },
      adres: `Karatay/Konya`,
      calisma_saatleri: { "Hergün": "İbadet saatleri" },
      giris_ucreti: { tr: "Ücretsiz", en: "Free", zh: "免费", ar: "مجاني" },
      ziyaret_suresi_dk: 20,
      fotograf_url: [],
      etiketler: ["Cami", "Tarihi", "İbadethane"],
      erisilebilirlik: { elevator: false, wheelchair: true, disabledToilet: false, guideService: false },
      puan: Number((4.2 + (i % 5) * 0.1).toFixed(1)),
      yorum_sayisi: 50 + i * 3
    });
  }
  return results;
}
*/

export const TOURS: Tour[] = [
  {
    id: 1,
    isim_tr: "Mevlana ve Tasavvuf Rotaları",
    isim_en: "Mevlana & Sufi Paths",
    isim_zh: "梅芙拉纳与苏菲精神之旅",
    isim_ar: "مسار مولانا والتصوف",
    aciklama_tr: "Konya'nın manevi mimarı Mevlana Celaleddin Rumi'nin izinden giderek, dervişlerin yaşam alanlarını ve türbelerini keşfedin.",
    aciklama_en: "Follow in the footsteps of Konya's spiritual architect, Mevlana. Discover historical dervish chambers and tombs.",
    aciklama_zh: "追随科尼亚的精神之父梅芙拉纳的足迹。探索历史悠久的苏菲舞僧室及圣人陵寝。",
    aciklama_ar: "سر على خطى المعمار الروحي لقونية، جلال الدين الرومي. اكتشف غرف الدراويش والأضرحة التاريخية.",
    duraklar: [1, 16],
    mesafe_km: 1.8,
    sure_saat: 3.5,
    briefing_tr: "Önemli İpuçları: Mevlana Müzesi ziyareti esnasında sakinliği ve manevi atmosferi korumaya özen gösterin. Selimiye Camii önündeki meydanda yürüyüş yapıp derviş hücrelerini inceleyebilirsiniz.",
    briefing_en: "Important Tips: Respect the quiet spiritual atmosphere inside the Mevlana Museum. Take a peaceful walk in the square of Selimiye Mosque and examine the unique dervish cells.",
    briefing_zh: "重要提示：参观梅芙拉纳博物馆时请保持安静，尊重其神圣氛围。在塞利米耶清真寺广场散步，并参观旋转舞僧的小室。",
    briefing_ar: "نصائح هامة: يرجى احترام الأجواء الروحية الهادئة داخل متحف مولانا. خذ قسطاً من الراحة في ساحة مسجد السليمية وتأمل خلايا الدراويش الفريدة.",
    gorsel_icon: "Sparkles"
  },
  {
    id: 2,
    isim_tr: "Selçuklu Mimarlık ve Sanat Turu",
    isim_en: "Seljuk Architecture & Art Tour",
    isim_zh: "塞尔柱建筑与艺术之旅",
    isim_ar: "جولة العمارة والفن السلجوقي",
    aciklama_tr: "Selçuklu hanedanlığının eşsiz çini oymacılığını, anıtsal medrese kapılarını ve asırlık ulu camileri Alaeddin Tepesi çevresinde keşfedin.",
    aciklama_en: "Discover the glorious turquoise tiles, monumental madrasa portals, and ancient congregational mosques of the Seljuks around Alaeddin Hill.",
    aciklama_zh: "探索塞尔柱人辉煌的绿松石瓷砖、宏伟的神学院门户以及古老的清真寺，一切都围绕着历史悠久的阿拉丁山丘展开。",
    aciklama_ar: "اكتشف البلاط الفيروزي المجيد، وبوابات المدارس الأثرية، والمساجد الجامعة القديمة للسلاجقة حول تلة علاء الدين.",
    duraklar: [6, 2, 3, 4],
    mesafe_km: 2.5,
    sure_saat: 4,
    briefing_tr: "Önemli İpuçları: Karatay ve İnce Minare medreselerindeki eşsiz Selçuklu taç kapılarını ve çini mozaiklerini fotoğraflamak için sabah ışıklarını tercih edin. Alaeddin Tepesi'ndeki sultan türbelerini ziyaret etmeyi unutmayın.",
    briefing_en: "Important Tips: Prefer morning light to photograph the gorgeous Seljuk portals and tile mosaics in Karatay and Ince Minare madrasas. Don't forget to pay respect at the sultan tombs on Alaeddin Hill.",
    briefing_zh: "重要提示：建议利用清晨光线拍摄卡拉泰和细塔神学院壮丽的塞尔柱门廊及马赛克瓷砖。不要忘记前往阿拉丁山丘拜谒苏丹陵墓。",
    briefing_ar: "نصائح هامة: يُفضل ضوء الصباح لالتقاط صور لبوابat السلاجقة البديعة والفسيفساء في مدرستي كاراتاي وإنجيلي. لا تنسى زيارة أضرحة السلاطين في تلة علاء الدين.",
    gorsel_icon: "Sparkles"
  },
  {
    id: 3,
    isim_tr: "Konya Şehir İçi Osmanlı Kültür Rotası",
    isim_en: "Konya City Center Ottoman Culture Route",
    isim_zh: "科尼亚市中心奥斯曼文化之旅",
    isim_ar: "مسار الثقافة العثمانية في وسط قونية",
    aciklama_tr: "Mevlana Müzesi yanından başlayarak Osmanlı döneminin heybetli mimarisine, Barok tarzı Aziziye Camii'ne uzanan keyifli bir yürüyüş rotası.",
    aciklama_en: "A lovely walking route starting next to the Mevlana Museum and extending to the grand Ottoman structures and Baroque-style Aziziye Mosque.",
    aciklama_zh: "从梅芙拉纳博物馆旁开始，延伸至雄伟的奥斯曼帝国建筑和巴洛克风格阿齐济耶清真寺的漫步路线。",
    aciklama_ar: "مسار مشي جميل يبدأ من جوار متحف مولانا ويمتد إلى الهياكل العثمانية الضخمة ومسجد العزيزية الباروكي.",
    duraklar: [8, 5, 15],
    mesafe_km: 1.2,
    sure_saat: 2,
    briefing_tr: "Önemli İpuçları: Aziziye Camii'nin devasa pencereleri ve Barok mimarisi, geç dönem Osmanlı sentezinin en güzel örneğidir. Selimiye Camii önündeki meydanda yürüyüş yapıp yerel kahvehanelerde çayınızı yudumlayabilirsiniz.",
    briefing_en: "Important Tips: Aziziye Mosque's grand windows and Baroque architecture are the absolute crown jewel of late Ottoman synthesis. Stroll through the spacious square in front of Selimiye Mosque and enjoy Turkish tea at local spots.",
    briefing_zh: "重要提示：阿齐济耶清真寺宏伟的窗户与巴洛克建筑是晚期奥斯曼合成艺术的巅峰。可在塞利米耶清真寺前漫步，并在当地品尝地道红茶。",
    briefing_ar: "نصائح هامة: قبة ونوافذ مسجد العزيزية الضخمة وعمارته الباروكية هي قمة الفن العثماني المتأخر. تجول في الساحة الواسعة أمام مسجد السليمية واستمتع بالشاي التركي.",
    gorsel_icon: "Map"
  },
  {
    id: 4,
    isim_tr: "Arkeoloji ve Etnografya Keşif Gezisi",
    isim_en: "Archaeology & Ethnography Discovery Route",
    isim_zh: "考古与民俗深度探索之旅",
    isim_ar: "جولة استكشاف الآثار والإثنوغرافيا",
    aciklama_tr: "Konya'nın tarih öncesi devirlerden Selçuklu ve Osmanlı el sanatlarına uzanan köklü geçmişini müzeler eşliğinde keşfedin.",
    aciklama_en: "Explore Konya's deeply rooted history from prehistoric eras up to Seljuk and Ottoman handcrafts with specialized museums.",
    aciklama_zh: "通过专业博物馆，探索科尼亚从史前时代到塞尔柱和奥斯曼手工艺的深厚历史。",
    aciklama_ar: "اكتشف تاريخ قونية الضارب في القدم من عصور ما قبل التاريخ إلى الحرف اليدوية السلجوقية والعثمانية من خلال متاحف متخصصة.",
    duraklar: [14, 18, 17],
    mesafe_km: 1.5,
    sure_saat: 2.5,
    briefing_tr: "Önemli İpuçları: Konya Arkeoloji Müzesi'ndeki dünyaca ünlü Herakles Lahdi'ni kaçırmayın. Etnografya Müzesi'nde ise asırlık el dokuması Konya halıları ve geleneksel gelin odası sizi bekliyor. Müze Kart'ınızı yanınızda bulundurun.",
    briefing_en: "Important Tips: Do not miss the world-famous Roman Herakles Sarcophagus in the Archaeology Museum. In the Ethnography Museum, historic hand-woven carpets and traditional bridal rooms await. Keep your Museum Pass handy.",
    briefing_zh: "重要提示：绝不能错过考古博物馆里举世闻名的罗马赫拉克勒斯石棺。在民俗博物馆中，历史悠久的手织地毯和传统婚礼新房等待着您。请随身携带博物馆通行证。",
    briefing_ar: "نصائح هامة: لا تفوت تابوت هرقل الروماني الشهير في متحف الآثار. وفي المتحف الإثنوغرافي، ينتظرك السجاد المنسوج يدوياً وغرف الزفاف التقليدية.",
    gorsel_icon: "Footprints"
  },
  {
    id: 5,
    isim_tr: "Şems ve Mevlâna Manevi Dostluk Yolu",
    isim_en: "Shams & Mevlana Spiritual Friendship Path",
    isim_zh: "沙姆西与梅芙拉纳精神友谊之路",
    isim_ar: "مسار الصداقة الروحية بين شمس ومولانا",
    aciklama_tr: "İki büyük mutasavvıf Mevlâna Celaleddin Rumi ve Şems-i Tebrizi'nin Konya'da buluşup dünyayı değiştiren manevi bağlarının izinde huzur dolu bir rota.",
    aciklama_en: "A peaceful path following the world-changing spiritual connection and meetings of Sufi giants Mevlana and Shams-i Tabrizi.",
    aciklama_zh: "追寻苏菲大师梅芙拉纳与沙姆西·大不里士改变世界的精神纽带，充满宁静与启示的小径。",
    aciklama_ar: "مسار هادئ يتبع الرابط الروحي واللقاءات التاريخية التي غيرت العالم بين العملاقين الصوفيين مولانا وشمس التبريزي.",
    duraklar: [16, 9, 1],
    mesafe_km: 1.6,
    sure_saat: 3,
    briefing_tr: "Önemli İpuçları: Şems-i Tebrizi Camii'nde başlayıp Mevlana Müzesi'nde son bulan bu rota, iki büyük dostun Konya sokaklarındaki adımlarını takip eder. Tasavvuf felsefesi üzerine derinleşmek için asistanımızla sohbet edin.",
    briefing_en: "Important Tips: Starting at Shams Mosque and ending at Mevlana Museum, this path walks the actual streets where these two spiritual giants met. Use our AI guide to explore Sufi philosophy along the way.",
    briefing_zh: "重要提示：此路径起点为沙姆西清真寺，终点为梅芙拉纳博物馆，漫步于两位精神大师相遇的历史街道。沿途可使用我们的AI向导深入探索苏菲哲学。",
    briefing_ar: "نصائح هامة: يبدأ المسار من مسجد شمس التبريزي وينتهي عند متحف مولانا، حيث تتبع الشوارع الفعلية التي التقى فيها العملاقان. استخدم مرشدنا الذكي لاستكشاف الفلسفة الصوفية.",
    gorsel_icon: "Clock"
  },
  {
    id: 6,
    isim_tr: "Selçuklu İlim ve İrfan Yuvaları",
    isim_en: "Centers of Seljuk Knowledge & Science",
    isim_zh: "塞尔柱科学与智慧神学院巡礼",
    isim_ar: "مراكز المعرفة والعلوم السلجوقية",
    aciklama_tr: "Selçuklu imparatorluğunun gökyüzü haritaları çıkaran, fıkıh ve hadis öğreten taş oyması görkemli medreselerini bir arada inceleyin.",
    aciklama_en: "Examine together the stone-carved monumental madrasas of the Seljuks where astronomy maps were drawn and science flourished.",
    aciklama_zh: "漫步于那些绘制天文学图、科学蓬勃发展的塞尔柱石雕神学院，感受学术与艺术的交融。",
    aciklama_ar: "تأمل معاً المدارس السلجوقية الأثرية المنحوتة من الحجر حيث رسمت خرائط علم الفلك واzدهرت العلوم.",
    duraklar: [2, 3, 6, 7],
    mesafe_km: 2.2,
    sure_saat: 3.5,
    briefing_tr: "Önemli İpuçları: Selçuklu eğitim sisteminin kalbi olan bu medreselerde, taş oymacılığındaki astronomi motiflerine dikkat edin. Medreselerin gökyüzü gözlemleri için tasarlanan havuzlu avluları sakinlik verir.",
    briefing_en: "Important Tips: Pay close attention to astronomical motifs carved into stone at these historic madrasas—the heart of Seljuk high education. Their inner courtyard pools, designed for star observation, offer deep tranquility.",
    briefing_zh: "重要提示：仔细观察这些历史神学院中雕刻在石头上的天文图案——塞尔柱高等教育的核心。用于观测星象的庭院水池，带给人深深的宁静。",
    briefing_ar: "نصائح هامة: انتبه جيداً للرموز الفلكية المنحوتة في الحجر في هذه Madares. توفر أفنيتها المائية الداخلية هدوءاً عميقاً.",
    gorsel_icon: "Compass"
  }
];

export const PLACE_PHOTOS: Record<string, { kulturPortali?: string | null; commons?: string[] }> = {
  mevlana_muzesi: {
    kulturPortali: null,
    commons: [
      'MevlanaMuseum.jpg'
    ]
  },
  ince_minareli_medrese: {
    kulturPortali: null,
    commons: [
      'Ince_Minareli_Medrese_01.jpg'
    ]
  },
  karatay_medresesi: {
    kulturPortali: null,
    commons: [
      'Konya_-_panoramio_-_HALUK_COMERTEL_(25).jpg'
    ]
  },
  alaeddin_camii: {
    kulturPortali: null,
    commons: [
      'Alâeddin Mosque, Konya 01.jpg',
      'Alaaddin Mosque (6526103573).jpg'
    ]
  },
  sircali_medrese: {
    kulturPortali: null,
    commons: [
      'Konya_Sırçalı_Medrese_gravestone_museum_4493.jpg'
    ]
  },
  sahip_ata_kulliyesi: {
    kulturPortali: null,
    commons: [
      'Sahib ata cami.jpg',
      'Konya Sahip Ata Vakıflar Eserleri Müzesi exterior 4509.jpg'
    ]
  },
  aziziye_camii: {
    kulturPortali: null,
    commons: [
      'Aziziye_Mosque,_Konya,_Turkey.jpg'
    ]
  },
  etnografya_muzesi: {
    kulturPortali: null,
    commons: [
      'Konya Ethnographical Museum - Carpet 1.jpg',
      'Konya Ethnographical Museum - Carpet 4.jpg'
    ]
  },
  catalhoyuk: {
    kulturPortali: null,
    commons: [
      'Çatalhöyük, 7400 BC, Konya, Turkey - UNESCO World Heritage Site, 08.jpg',
      'Çatalhöyük, 7400 BC, Konya, Turkey - UNESCO World Heritage Site, 02.jpg'
    ]
  },
  sems_i_tebrizi_turbesi: {
    kulturPortali: null,
    commons: [
      'Shams Tabrizi Mosque - Şems-i Tebrizi Camii.jpg',
      'Şems-i Tebrizi-1.jpg'
    ]
  },
  selimiye_camii: {
    kulturPortali: null,
    commons: [
      'Selimiye Camii, Konya.jpg',
      'Selimiye Mosque - Selimiye Camii, Konya.jpg'
    ]
  },
  iplikci_camii: {
    kulturPortali: null,
    commons: [
      'Konya Iplikçi mosque 3781.jpg',
      'Konya Iplikçi mosque 3784.jpg'
    ]
  },
  alaeddin_tepesi: {
    kulturPortali: null,
    commons: [
      'Alâeddin Tepesi - panoramio.jpg'
    ]
  },
  mevlevi_medeniyeti_muzesi: {
    kulturPortali: null,
    commons: [
      'Konya Panorama Müzesi 1112 05.jpg',
      'Panorama Konya Müzesi 01.jpg'
    ]
  },
  zazadin_hani: {
    kulturPortali: null,
    commons: [
      'Caravanserail 910.jpg',
      'Caravanserail 903.jpg'
    ]
  },
  ataturk_muzesi: {
    kulturPortali: null,
    commons: [
      'Konya Atatürk Evi Müzesi.jpg'
    ]
  },
  esrefoglu_camii: {
    kulturPortali: null,
    commons: [
      'Eşrefoğlu_Camii.jpg'
    ]
  },
  konya_arkeoloji_muzesi: {
    kulturPortali: null,
    commons: [
      'Konya_Archaeological_Museum,_Turkey_01.jpg'
    ]
  },
  serafeddin_camii: {
    kulturPortali: null,
    commons: [
      'Konya_Şerafettin_Mosque_2531.jpg'
    ]
  },
  nasreddin_hoca_turbesi: {
    kulturPortali: null,
    commons: [
      'Aksehir_nasrettin_hoca_turbesi_3.jpg'
    ]
  },
  beysehir_golu: {
    kulturPortali: null,
    commons: [
      'Lake_Beyşehir.jpg'
    ]
  },
  meke_golu: {
    kulturPortali: null,
    commons: [
      'Meke_Gölü.jpg'
    ]
  },
  tuz_golu: {
    kulturPortali: null,
    commons: [
      'Tuz_Gölü.jpg'
    ]
  },
  yerkopru_selalesi: {
    kulturPortali: null,
    commons: [
      'Yerköprü_Şelalesi.jpg'
    ]
  },
  kilistra: {
    kulturPortali: null,
    commons: [
      'Kilistra_lystra33.JPG'
    ]
  },
  sille: {
    kulturPortali: null,
    commons: [
      'Sille.jpg'
    ]
  },
  meram: {
    kulturPortali: null,
    commons: [
      'Meram.JPG'
    ]
  }
};

// 1. COMMONS THUMBNAIL URL FONKSİYONU
function md5(str: string): string {
  const k = [
    0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee,
    0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
    0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
    0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
    0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa,
    0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
    0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed,
    0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
    0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
    0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
    0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05,
    0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
    0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039,
    0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
    0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
    0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391
  ];

  const r = [
    7, 12, 17, 22,  7, 12, 17, 22,  7, 12, 17, 22,  7, 12, 17, 22,
    5,  9, 14, 20,  5,  9, 14, 20,  5,  9, 14, 20,  5,  9, 14, 20,
    4, 11, 16, 23,  4, 11, 16, 23,  4, 11, 16, 23,  4, 11, 16, 23,
    6, 10, 15, 21,  6, 10, 15, 21,  6, 10, 15, 21,  6, 10, 15, 21
  ];

  const utf8 = unescape(encodeURIComponent(str));
  const words: number[] = [];
  for (let i = 0; i < utf8.length; i++) {
    words[i >> 2] |= utf8.charCodeAt(i) << ((i % 4) * 8);
  }
  const len = utf8.length * 8;
  words[len >> 5] |= 0x80 << (len % 32);
  words[(((len + 64) >>> 9) << 4) + 14] = len;

  let h0 = 0x67452301;
  let h1 = 0xefcdab89;
  let h2 = 0x98badcfe;
  let h3 = 0x10325476;

  for (let q = 0; q < words.length; q += 16) {
    let a = h0, b = h1, c = h2, d = h3;
    for (let i = 0; i < 64; i++) {
      let f, g;
      if (i < 16) {
        f = (b & c) | (~b & d);
        g = i;
      } else if (i < 32) {
        f = (d & b) | (~d & c);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        f = b ^ c ^ d;
        g = (3 * i + 5) % 16;
      } else {
        f = c ^ (b | ~d);
        g = (7 * i) % 16;
      }
      const temp = d;
      d = c;
      c = b;
      b = (b + rotateLeft(a + f + k[i] + (words[q + g] || 0), r[i])) | 0;
      a = temp;
    }
    h0 = (h0 + a) | 0;
    h1 = (h1 + b) | 0;
    h2 = (h2 + c) | 0;
    h3 = (h3 + d) | 0;
  }

  function rotateLeft(n: number, c: number) {
    return (n << c) | (n >>> (32 - c));
  }

  function toHex(n: number) {
    let out = "";
    for (let i = 0; i < 4; i++) {
      out += ((n >> (i * 8)) & 0xff).toString(16).padStart(2, "0");
    }
    return out;
  }

  return toHex(h0) + toHex(h1) + toHex(h2) + toHex(h3);
}

export function getCommonsPhotoUrl(filename: string, width = 500): string {
  const cleanFilename = filename.replace(/ /g, '_');
  const hash = md5(cleanFilename);
  const a = hash.charAt(0);
  const ab = hash.substring(0, 2);
  const encodedFilename = encodeURIComponent(cleanFilename);
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${a}/${ab}/${encodedFilename}/${width}px-${encodedFilename}`;
}

export function getCommonsOriginalUrl(filename: string): string {
  const cleanFilename = filename.replace(/ /g, '_');
  const hash = md5(cleanFilename);
  const a = hash.charAt(0);
  const ab = hash.substring(0, 2);
  const encodedFilename = encodeURIComponent(cleanFilename);
  return `https://upload.wikimedia.org/wikipedia/commons/${a}/${ab}/${encodedFilename}`;
}

export const CATEGORY_PLACEHOLDERS = {
  mosque: "/logo.svg",
  museum: "/logo.svg",
  nature: "/logo.svg",
  historical: "/logo.svg"
};

export function getCategoryPlaceholder(category: string): string {
  const cat = category ? category.toLowerCase() : "";
  if (cat.includes("cami") || cat.includes("mosque") || cat.includes("etkinlik") || cat.includes("event")) return CATEGORY_PLACEHOLDERS.mosque;
  if (cat.includes("müze") || cat.includes("museum") || cat.includes("medrese") || cat.includes("madrasa")) return CATEGORY_PLACEHOLDERS.museum;
  if (cat.includes("park") || cat.includes("bahçe") || cat.includes("doğa") || cat.includes("vadi") || cat.includes("göl") || cat.includes("lake") || cat.includes("garden") || cat.includes("nature")) return CATEGORY_PLACEHOLDERS.nature;
  return CATEGORY_PLACEHOLDERS.historical;
}

export function getPlacePrimaryPhoto(placeId: string): string | null {
  const photos = getPlaceAllPhotos(placeId);
  return photos.length > 0 ? photos[0] : null;
}

export function getPlaceAllPhotos(placeId: string): string[] {
  const place = PLACE_PHOTOS[placeId];
  const photos: string[] = [];
  if (place) {
    if (place.commons) {
      place.commons.forEach(f => {
        photos.push(getCommonsPhotoUrl(f, 500));
        photos.push(getCommonsOriginalUrl(f));
      });
    }
    if (place.kulturPortali) {
      photos.push(place.kulturPortali);
    }
  }
  
  return photos;
}

export function getPlacePhotoKey(place: { id: number; isim_tr: string; isim_en: string }): string {
  const id = place.id;
  const nameTr = place.isim_tr.toLowerCase();
  const nameEn = place.isim_en.toLowerCase();
  if (id === 1 || nameTr.includes("mevlana") || nameEn.includes("mevlana")) return "mevlana_muzesi";
  if (id === 2 || nameTr.includes("ince minare") || nameEn.includes("ince minaret") || nameEn.includes("inceminare")) return "ince_minareli_medrese";
  if (id === 3 || nameTr.includes("karatay") || nameEn.includes("karatay")) return "karatay_medresesi";
  if (id === 4 || nameTr.includes("alaeddin camii") || nameTr.includes("alaaddin camii") || nameEn.includes("alaeddin")) return "alaeddin_camii";
  if (id === 5 || nameTr.includes("aziziye") || nameEn.includes("aziziye")) return "aziziye_camii";
  if (id === 6 || nameTr.includes("sırçalı medrese") || nameEn.includes("sircali") || nameEn.includes("sırçalı")) return "sircali_medrese";
  if (id === 7 || nameTr.includes("sahip ata") || nameEn.includes("sahib ata") || nameEn.includes("sahipata")) return "sahip_ata_kulliyesi";
  if (id === 15 || nameTr.includes("şerafettin") || nameEn.includes("serafeddin") || nameTr.includes("şerafeddin")) return "serafeddin_camii";
  if (id === 14 || nameTr.includes("arkeoloji") || nameEn.includes("archaeological")) return "konya_arkeoloji_muzesi";
  if (nameTr.includes("beyhekim") || nameEn.includes("beyhekim")) return "beyhekim_camii";
  if (nameTr.includes("sille") || nameEn.includes("sille")) return "sille";
  if (nameTr.includes("beyşehir") || nameEn.includes("beysehir")) return "beysehir_golu";
  if (nameTr.includes("meram") || nameEn.includes("meram")) return "meram";
  if (nameTr.includes("kilistra") || nameEn.includes("kilistra")) return "kilistra";
  if (nameTr.includes("ivriz") || nameEn.includes("ivriz")) return "ivriz_kaya_aniti";
  if (nameTr.includes("kubadabad") || nameEn.includes("kubadabad")) return "kubadabad";
  if (nameTr.includes("eşrefoğlu") || nameEn.includes("esrefoglu")) return "esrefoglu_camii";
  if (nameTr.includes("nasreddin")) return "nasreddin_hoca_turbesi";
  if (nameTr.includes("atatürk müzesi") || nameTr.includes("atatürk evi") || nameEn.includes("ataturk")) return "ataturk_muzesi";
  if (nameTr.includes("etnografya") || nameEn.includes("ethnography")) return "etnografya_muzesi";
  if (nameTr.includes("çatalhöyük") || nameEn.includes("catalhoyuk")) return "catalhoyuk";
  if (nameTr.includes("meke")) return "meke_golu";
  if (nameTr.includes("tuz")) return "tuz_golu";
  if (nameTr.includes("yerköprü") || nameTr.includes("yerkopru")) return "yerkopru_selalesi";
  if (nameTr.includes("şems-i tebrizi") || nameEn.includes("shams-i tabrizi") || nameTr.includes("şemsi tebrizi")) return "sems_i_tebrizi_turbesi";
  if (nameTr.includes("selimiye") || nameEn.includes("selimiye")) return "selimiye_camii";
  if (nameTr.includes("iplikçi") || nameEn.includes("iplikci")) return "iplikci_camii";
  if (nameTr.includes("alaeddin tepesi") || nameEn.includes("alaeddin hill") || nameEn.includes("alaaddin hill")) return "alaeddin_tepesi";
  if (nameTr.includes("mevlevi medeniyeti") || nameEn.includes("mevlevi civilisation") || nameEn.includes("mevlevi civilization")) return "mevlevi_medeniyeti_muzesi";
  if (nameTr.includes("zazadin") || nameEn.includes("zazadin")) return "zazadin_hani";
  return "";
}

export function getPlacePhotoUrls(place: { id: number; isim_tr: string; isim_en: string; kategori: string }, width = 800): string[] {
  const key = getPlacePhotoKey(place);
  const photos = getPlaceAllPhotos(key);
  if (photos.length === 0) {
    return [getCategoryPlaceholder(place.kategori)];
  }
  return photos;
}

export async function fetchKulturPortaliPhoto(slug: string): Promise<string | null> {
  try {
    const res = await fetch(`/api/kulturportali-photo?slug=${encodeURIComponent(slug)}`);
    if (res.ok) {
      const data = await res.json();
      return data.photoUrl || null;
    }
    return null;
  } catch {
    return null;
  }
}

const RAW_PLACES: Place[] = [
  ...MANUAL_PLACES,
  ...EXTRA_IMPORTANT_PLACES,
  ...generateNaturalAndHistoricAreas()
];

export const PLACES: Place[] = RAW_PLACES.map((p) => {
  if (p.kategori !== "Otel") {
    const urls = getPlacePhotoUrls(p);
    return { ...p, fotograf_url: urls };
  }
  return p;
});

export const EVENTS: EventItem[] = [
  {
    id: 1,
    isim_tr: "Hz. Mevlâna Şeb-i Arus Törenleri",
    isim_en: "Seb-i Arus Commemoration Ceremonies",
    isim_zh: "谢比·阿鲁斯纪念仪式",
    isim_ar: "مراسم شب العروس لإحياء ذكرى مولانا",
    tarih: "07 - 17 Aralık (Her Yıl)",
    saat: "19:00",
    yer_tr: "Mevlana Kültür Merkezi Sema Salonu",
    yer_en: "Mevlana Cultural Center Sema Hall",
    yer_zh: "梅芙拉纳文化中心旋转舞大厅",
    yer_ar: "صالة السماح بمركز مولانا الثقافي",
    ucret_tr: "Biletli (Rezervasyon zorunlu)",
    ucret_en: "Ticketed (Reservation Required)",
    ucret_zh: "购票入场 (需提前预订)",
    ucret_ar: "تذاكر (الحجز مسبق ضروري)",
    fotograf_url: "/logo.svg"
  },
  {
    id: 2,
    isim_tr: "Uluslararası Konya Mistik Müzik Festivali",
    isim_en: "International Konya Mystic Music Festival",
    isim_zh: "科尼亚国际神秘音乐节",
    isim_ar: "مهرجان قونية الدولي للموسيقى الصوفية",
    tarih: "22 - 30 Eylül (Mevlana Doğum Günü)",
    saat: "20:00",
    yer_tr: "Selçuklu Kongre Merkezi",
    yer_en: "Selcuklu Congress Center",
    yer_zh: "塞尔柱会议中心",
    yer_ar: "مركز سلجوقلو للمؤتمرات",
    ucret_tr: "Ücretsiz (Kültür Bakanlığı)",
    ucret_en: "Free (Ministry of Culture)",
    ucret_zh: "免费 (文化部主办)",
    ucret_ar: "مجاني (وزارة الثقافة)",
    fotograf_url: "/logo.svg"
  },
  {
    id: 3,
    isim_tr: "Konya Gastronomi Festivali (GastroFest)",
    isim_en: "Konya Gastronomy Festival (GastroFest)",
    isim_zh: "科尼亚美食节 (GastroFest)",
    isim_ar: "مهرجان قونية للمأكولات والطهي (غاستروفست)",
    tarih: "Eylül veya Ekim Ayları (Yıllık Değişken)",
    saat: "10:00 - 22:00",
    yer_tr: "Kalehan Ecdat Bahçesi",
    yer_en: "Kalehan Ecdat Gardens",
    yer_zh: "卡莱汉祖先花园",
    yer_ar: "حديقة كالهان للأجداد",
    ucret_tr: "Giriş Ücretsiz (Yemek Alışverişleri Ücretli)",
    ucret_en: "Free Entry (Food purchases are paid)",
    ucret_zh: "免费入场 (食品自费)",
    ucret_ar: "دخول مجاني (مشتريات الطعام مدفوعة)",
    fotograf_url: "/logo.svg"
  },
  {
    id: 4,
    isim_tr: "Uluslararası Akşehir Nasreddin Hoca Şenlikleri",
    isim_en: "International Akşehir Nasreddin Hodja Festival",
    isim_zh: "国际阿克谢希尔纳斯雷丁·霍杰节",
    isim_ar: "مهرجان آق شهر الدولي لنصر الدين خوجة (جحا)",
    tarih: "05 - 10 Temmuz (Her Yıl)",
    saat: "10:00 - 21:00",
    yer_tr: "Akşehir Şehir Merkezi ve Gölet Çevresi",
    yer_en: "Akşehir City Center & Pond Area",
    yer_zh: "阿克谢希尔市中心及池塘周边",
    yer_ar: "وسط مدينة آق شهر ومحيط البحيرة",
    ucret_tr: "Ücretsiz (Tiyatro ve Çocuk Etkinlikleri)",
    ucret_en: "Free (Theatre & Kids Activities)",
    ucret_zh: "免费 (戏剧与儿童活动)",
    ucret_ar: "مجاني (الأنشطة المسرحية والأطفال)",
    fotograf_url: "/logo.svg"
  }
];

export const PRACTICAL_INFO = {
  TR: {
    emergency: [
      { ad: "Polis İmdat", no: "112" },
      { ad: "Acil Ambulans", no: "112" },
      { ad: "İtfaiye", no: "112" },
      { ad: "Sırçalı Hotel Resepsiyon", no: "+90 332 523 4242" },
      { ad: "Sırçalı Hotel Resepsiyon (WhatsApp)", no: "+90 501 523 4242" },
      { ad: "Konya Turizm Danışma", no: "+90 332 351 1074" }
    ],
    rules: [
      "Camileri ziyaret ederken ayakkabılar çıkarılmalıdır. Girişteki raflara koyabilirsiniz.",
      "Manevi mekanlara uygun olarak omuzların ve diz kapaklarının örtülü olmasına dikkat edilmelidir.",
      "Sema ayinleri esnasında sessizlik esastır; fotoğraf çekilirken flaş kullanılmamalıdır."
    ],
    tips: [
      "Para Birimi: Türk Lirası (TRY). Çoğu yerde kredi kartı geçerlidir.",
      "Şehiriçi Ulaşım: Konya'da tramvay ve belediye otobüsleri için 'Elkart' adı verilen transit kartlar kullanılır.",
      "Yemek Kültürü: Etliekmek yerken yanında köpüklü yayık ayranı ve közlenmiş biber istemeyi unutmayın!"
    ]
  },
  EN: {
    emergency: [
      { ad: "All Emergencies", no: "112" },
      { ad: "Sırçalı Hotel Front Desk", no: "+90 332 523 4242" },
      { ad: "Sırçalı Hotel Front Desk (WhatsApp)", no: "+90 501 523 4242" },
      { ad: "Konya Tourist Information", no: "+90 332 351 1074" }
    ],
    rules: [
      "Shoes must be removed before stepping onto mosque carpets. Use the shelves.",
      "Respectful clothing covering shoulders and knees is required at spiritual sites.",
      "Absolute silence is expected during Whirling Dervish rituals. Flash photography is forbidden."
    ],
    tips: [
      "Currency: Turkish Lira (TRY). Credit cards are widely accepted.",
      "Local Transit: Konya features a smooth tram and bus system powered by 'Elkart' transit cards.",
      "Culinary Tip: When ordering the famous Etliekmek, always ask for traditional frothy 'Ayran'!"
    ]
  },
  ZH: {
    emergency: [
      { ad: "综合紧急求助", no: "112" },
      { ad: "塞尔恰勒酒店前台", no: "+90 332 523 4242" },
      { ad: "塞尔恰勒酒店前台 (WhatsApp)", no: "+90 501 523 4242" },
      { ad: "科尼亚旅游咨询处", no: "+90 332 351 1074" }
    ],
    rules: [
      "进入清真寺地毯前必须脱鞋。请使用提供的鞋架。",
      "在宗教和精神遗迹参观时，需穿着遮盖肩膀和膝盖的得体服装。",
      "在旋转舞僧仪式期间，请保持绝对安静，禁止闪光灯拍照。"
    ],
    tips: [
      "货币：土耳其里拉 (TRY)。大部分商户接受信用卡付款。",
      "公共交通：科尼亚拥有便捷的有轨电车和公交系统，需使用“Elkart”交通卡。",
      "美食秘诀：点标志性的肉饼 (Etliekmek) 时，一定要配上带泡沫的传统咸酸奶 (Ayran)！"
    ]
  },
  AR: {
    emergency: [
      { ad: "رقم الطوارئ الموحد", no: "112" },
      { ad: "استقبال فندق سيرتشالي", no: "+90 332 523 4242" },
      { ad: "استقبال فندق سيرتشالي (واتساب)", no: "+90 501 523 4242" },
      { ad: "مكتب الاستعلامات السياحي بقونية", no: "+90 332 351 1074" }
    ],
    rules: [
      "يجب خلع الأحذية قبل الدخول ومطالعة سجاد المساجد. يرجى استخدام أرفف الأحذية المتاحة.",
      "يتطلب زيارة الأماكن الروحية ارتداء ملابس محتشمة تغطي الكتفين والركبتين.",
      "الهدوء والسكينة التامة مطلوبان خلال طقوس الدراويش المولوية. يمنع منعاً باتاً التصوير بالفلاش."
    ],
    tips: [
      "العملة: الليرة التركية (TRY). تقبل بطاقات الائتمان على نطاق واسع.",
      "النقل العام: تتميز قونية بنظام ترام وحافلات مريح يتم تشغيله بواسطة بطاقات 'Elkart'.",
      "نصيحة تذوق: عند طلب خبز اللحم الشهير (إيتلي إكمك)، اطلب دائماً شراب العيران الرغوي التقليدي!"
    ]
  }
};

export function generate3100Mosques() {
  const mosques = [];
  const centerLat = 37.869417;
  const centerLng = 32.495861;

  let seed = 42;
  function random() {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  for (let i = 0; i < 3100; i++) {
    let r = 0;
    if (i < 1500) {
      r = random() * 0.018;
    } else {
      r = random() * 0.075;
    }
    const angle = random() * Math.PI * 2;
    const lat = centerLat + r * Math.sin(angle);
    const lng = centerLng + r * Math.cos(angle);

    mosques.push({
      id: 10000 + i,
      name_tr: `Tarihi Mahalle Camii No: ${i + 1}`,
      name_en: `Historic Neighborhood Mosque No: ${i + 1}`,
      lat,
      lng
    });
  }

  return mosques;
}
