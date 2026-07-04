export type Language = 'TR' | 'EN' | 'ZH' | 'AR';

export interface TranslationSet {
  welcome: string;
  discoverBtn: string;
  popularPlaces: string;
  weatherTitle: string;
  upcomingEvents: string;
  activities: string;
  categories: string;
  mapTab: string;
  placesTab: string;
  toursTab: string;
  diningTab: string;
  eventsTab: string;
  hotelTab: string;
  favoritesTab: string;
  practicalTab: string;
  aiConciergeTab: string;
  settingsTab: string;
  searchPlaceholder: string;
  allCategories: string;
  unesco: string;
  mosques: string;
  museums: string;
  tombs: string;
  medreses: string;
  parks: string;
  hotelAccom: string;
  showAllMosques: string;
  visitingHours: string;
  entranceFee: string;
  visitDuration: string;
  accessibility: string;
  directionsBtn: string;
  addFavorite: string;
  removeFavorite: string;
  shareBtn: string;
  speakBtn: string;
  distance: string;
  duration: string;
  downloadTour: string;
  emergencyNumbers: string;
  cultureRules: string;
  customItinerary: string;
  buildItinerary: string;
  addRouteStep: string;
  checklistTitle: string;
  todayChecklist: string;
  aiWelcome: string;
  aiPlaceholder: string;
  aiSendBtn: string;
  loading: string;
  sırçalıBranding: string;
  hotelFacilities: string;
  bookRoom: string;
  noFavorites: string;
  cultureAlert: string;
  rating: string;
  reviews: string;
}

export type AccessibilityOptions = {
  elevator: boolean;
  wheelchair: boolean;
  disabledToilet: boolean;
  guideService: boolean;
};

export interface PhotoItem {
  url: string;
  caption_tr: string;
  caption_en: string;
  caption_zh: string;
  caption_ar: string;
  source: string;
  license: string;
}

export interface Place {
  id: number;
  isim_tr: string;
  isim_en: string;
  isim_zh: string;
  isim_ar: string;
  kategori: 'UNESCO' | 'Müze' | 'Cami' | 'Türbe' | 'Medrese' | 'Park' | 'Otel';
  aciklama_kisa_tr: string;
  aciklama_kisa_en: string;
  aciklama_kisa_zh: string;
  aciklama_kisa_ar: string;
  tarihce_tr: string;
  tarihce_en: string;
  tarihce_zh: string;
  tarihce_ar: string;
  koordinatlar: {
    lat: number;
    lng: number;
  };
  adres: string;
  telefon?: string;
  web?: string;
  email?: string;
  calisma_saatleri: {
    [key: string]: string;
  };
  giris_ucreti: {
    tr: string;
    en: string;
    zh: string;
    ar: string;
  };
  ziyaret_suresi_dk: number;
  fotograf_url: string[];
  fotograf?: PhotoItem[];
  etiketler: string[];
  erisilebilirlik: AccessibilityOptions;
  puan: number;
  yorum_sayisi: number;
  is_major?: boolean;
}

export interface Tour {
  id: number;
  isim_tr: string;
  isim_en: string;
  isim_zh: string;
  isim_ar: string;
  aciklama_tr: string;
  aciklama_en: string;
  aciklama_zh: string;
  aciklama_ar: string;
  duraklar: number[]; // Place IDs
  mesafe_km: number;
  sure_saat: number;
  briefing_tr?: string;
  briefing_en?: string;
  briefing_zh?: string;
  briefing_ar?: string;
  gorsel_icon?: string;
}

export interface EventItem {
  id: number;
  isim_tr: string;
  isim_en: string;
  isim_zh: string;
  isim_ar: string;
  tarih: string;
  saat: string;
  yer_tr: string;
  yer_en: string;
  yer_zh: string;
  yer_ar: string;
  ucret_tr: string;
  ucret_en: string;
  ucret_zh: string;
  ucret_ar: string;
  fotograf_url: string;
}
