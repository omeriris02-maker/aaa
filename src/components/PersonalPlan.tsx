import { useState, useEffect } from "react";
import { Place, Language } from "../types";
import { getCategoryPlaceholder } from "../data";
import PlacePhoto from "./PlacePhoto";
import { 
  Heart, CheckSquare, Square, Trash2, Calendar, Compass, 
  MapPin, Clock, Plus, Share2, Sparkles, CheckCircle2
} from "lucide-react";

interface PersonalPlanProps {
  places: Place[];
  language: Language;
  onSelectPlace: (place: Place) => void;
  onShowOnMap: (place: Place) => void;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  isLight?: boolean;
}

export default function PersonalPlan({
  places,
  language,
  onSelectPlace,
  onShowOnMap,
  favorites,
  onToggleFavorite,
  isLight = true,
}: PersonalPlanProps) {
  // Checklist loaded from localStorage
  const [checklist, setChecklist] = useState<number[]>([]);
  // Custom Route Planner loaded from localStorage
  const [customRoute, setCustomRoute] = useState<number[]>([]);

  useEffect(() => {
    const savedChecklist = localStorage.getItem("sircali_checklist");
    if (savedChecklist) {
      try {
        setChecklist(JSON.parse(savedChecklist));
      } catch (e) {
        console.error(e);
      }
    }

    const savedRoute = localStorage.getItem("sircali_custom_route");
    if (savedRoute) {
      try {
        setCustomRoute(JSON.parse(savedRoute));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveChecklist = (newChecklist: number[]) => {
    setChecklist(newChecklist);
    localStorage.setItem("sircali_checklist", JSON.stringify(newChecklist));
  };

  const saveRoute = (newRoute: number[]) => {
    setCustomRoute(newRoute);
    localStorage.setItem("sircali_custom_route", JSON.stringify(newRoute));
  };

  const toggleChecklistItem = (id: number) => {
    if (checklist.includes(id)) {
      saveChecklist(checklist.filter((item) => item !== id));
    } else {
      saveChecklist([...checklist, id]);
    }
  };

  const addToRoute = (id: number) => {
    if (!customRoute.includes(id)) {
      saveRoute([...customRoute, id]);
    }
  };

  const removeFromRoute = (id: number) => {
    saveRoute(customRoute.filter((item) => item !== id));
  };

  const clearRoute = () => {
    saveRoute([]);
  };

  const favoritePlaces = places.filter((p) => favorites.includes(p.id));

  // Calculates estimated metrics for custom route
  const getRouteMetrics = () => {
    const count = customRoute.length;
    if (count <= 1) return { distance: 0, duration: 0 };
    // Simulated realistic coordinates calculations
    const distance = parseFloat((count * 1.2).toFixed(1));
    const duration = Math.round(count * 45); // average 45 mins per stop
    return { distance, duration };
  };

  const metrics = getRouteMetrics();

  const getPlaceName = (p: Place) => {
    if (language === "TR") return p.isim_tr;
    if (language === "ZH") return p.isim_zh;
    if (language === "AR") return p.isim_ar;
    return p.isim_en;
  };

  const handleShareRoute = () => {
    const routeNames = customRoute
      .map((id, index) => {
        const p = places.find((pl) => pl.id === id);
        return p ? `${index + 1}. ${getPlaceName(p)}` : "";
      })
      .filter(Boolean)
      .join("\n");

    const text = `My Custom Konya Route (Sırçalı Hotel Guide):\n${routeNames}\nExplore at: ${window.location.href}`;
    navigator.clipboard.writeText(text);

    const alertBox = document.createElement("div");
    alertBox.className = "fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#A0423D] text-white font-sans font-bold text-xs px-4 py-2.5 rounded-xl shadow-2xl z-[9999] text-center border border-[#D4A574]";
    alertBox.innerText = language === "TR"
      ? "Özel rotanız başarıyla kopyalandı!"
      : language === "ZH"
      ? "您的自定义路线已复制！"
      : language === "AR"
      ? "تم نسخ مسارك الخاص بنجاح!"
      : "Your custom route has been copied!";
    document.body.appendChild(alertBox);
    setTimeout(() => alertBox.remove(), 2500);
  };

  return (
    <div className="space-y-8 text-left">
      {/* Tab Header */}
      <div className={`flex items-center gap-2 border-b pb-3 ${isLight ? "border-[#E8E8E8]" : "border-[#D4A574]/20"}`}>
        <Calendar className="w-5 h-5 text-[#A0423D]" />
        <h2 className={`font-serif font-bold text-lg md:text-xl ${isLight ? "text-[#A0423D]" : "text-white"}`}>
          {language === "TR" ? "Kişisel Seyahat Planım" : language === "ZH" ? "我的个人旅行计划" : language === "AR" ? "خطتي وجدولي الشخصi" : "My Personal Travel Planner"}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Favorites */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className={`font-serif font-bold text-sm tracking-wider uppercase flex items-center gap-1.5 border-b pb-2 ${isLight ? "text-[#A0423D] border-[#E8E8E8]" : "text-[#D4A574] border-[#D4A574]/15"}`}>
            <Heart className="w-4 h-4 text-[#A0423D] fill-[#A0423D]" />
            {language === "TR" ? "FAVORİ MEKANLARIM" : language === "ZH" ? "我的收藏景点" : language === "AR" ? "أماكني المفضلة" : "MY SAVED FAVORITES"}
          </h3>

          {favoritePlaces.length === 0 ? (
            <div className={`border p-5 rounded-2xl text-center shadow-sm ${isLight ? "bg-[#FDFBF7] border-[#E8E8E8]" : "bg-[#5C1E1B] border-[#D4A574]/20"}`}>
              <Heart className="w-8 h-8 text-[#999999] mx-auto mb-2" />
              <p className={`text-xs font-medium leading-relaxed ${isLight ? "text-[#333333]" : "text-gray-200"}`}>
                {language === "TR"
                  ? "Henüz favori mekan eklemediniz. Mekanlar sekmesinden beğendiklerinizi kalp simgesiyle buraya kaydedebilirsiniz."
                  : language === "ZH"
                  ? "您尚未添加任何收藏景点。您可以在“历史景点”中使用心形图标保存喜欢的地方。"
                  : language === "AR"
                  ? "لم تقم بحفظ أي مكان في المفضلة بعد. يمكنك حفظ الأماكن المفضلة بالضغط على رمز القلب."
                  : "No favorite places added yet. Click the heart icon on any historical place to save it here."}
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
              {favoritePlaces.map((p) => (
                <div
                  key={p.id}
                  className={`border p-3 rounded-xl flex justify-between items-center transition-all shadow-sm ${
                    isLight ? "bg-[#FDFBF7] border-[#D4A574]/35 hover:border-[#D4A574]" : "bg-[#5C1E1B]/80 border-[#D4A574]/25 hover:border-[#D4A574]"
                  }`}
                >
                  <div className="min-w-0">
                    <button
                      onClick={() => onSelectPlace(p)}
                      className={`font-serif font-bold text-xs transition-colors block text-left truncate cursor-pointer ${isLight ? "text-[#333333] hover:text-[#A0423D]" : "text-gray-200 hover:text-[#D4A574]"}`}
                    >
                      {getPlaceName(p)}
                    </button>
                    <span className={`text-[9px] font-bold uppercase tracking-wider ${isLight ? "text-[#A0423D]" : "text-[#D4A574]"}`}>{p.kategori}</span>
                  </div>

                  <div className="flex gap-1">
                    <button
                      onClick={() => addToRoute(p.id)}
                      className={`p-1.5 rounded-lg transition-all cursor-pointer ${isLight ? "hover:bg-[#A0423D]/10 text-[#A0423D]" : "hover:bg-[#D4A574]/10 text-[#D4A574]"}`}
                      title="Add to Custom Route"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onToggleFavorite(p.id)}
                      className={`p-1.5 rounded-lg transition-all cursor-pointer ${isLight ? "hover:bg-gray-100 text-red-500" : "hover:bg-[#A0423D]/30 text-red-400"}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Center: Custom Route Planner */}
        <div className="lg:col-span-2 space-y-4">
          <div className={`flex justify-between items-center border-b pb-2 ${isLight ? "border-[#E8E8E8]" : "border-[#D4A574]/15"}`}>
            <h3 className={`font-serif font-bold text-sm tracking-wider uppercase flex items-center gap-1.5 ${isLight ? "text-[#A0423D]" : "text-[#D4A574]"}`}>
              <Compass className="w-4 h-4 text-[#D4A574]" />
              {language === "TR" ? "ÖZEL ROTA PLANLAYICIM" : language === "ZH" ? "我的自定导览路线" : language === "AR" ? "مساري السياحي الخاص" : "MY CUSTOM ROUTE PLANNER"}
            </h3>
            {customRoute.length > 0 && (
              <button
                onClick={clearRoute}
                className="text-[10px] text-red-500 hover:underline font-bold cursor-pointer"
              >
                {language === "TR" ? "Temizle" : language === "ZH" ? "清空" : language === "AR" ? "مسح الكل" : "Clear Route"}
              </button>
            )}
          </div>

          {customRoute.length === 0 ? (
            <div className={`border p-8 rounded-2xl text-center space-y-3 shadow-sm ${isLight ? "bg-[#FDFBF7] border-[#E8E8E8]" : "bg-[#5C1E1B] border-[#D4A574]/20"}`}>
              <Compass className="w-10 h-10 text-[#999999] mx-auto" />
              <p className={`text-xs font-medium max-w-md mx-auto leading-relaxed ${isLight ? "text-[#333333]" : "text-gray-200"}`}>
                {language === "TR"
                  ? "Kendi özel Konya gezi rotanızı oluşturun! Favoriler listenizin yanındaki '+' simgesine tıklayarak rotanıza duraklar ekleyebilirsiniz."
                  : language === "ZH"
                  ? "创建您专属的科尼亚探索路线！点击收藏列表旁的“+”图标即可将景点添加到自定路线中。"
                  : language === "AR"
                  ? "أنشئ مسار جولتك الخاص والفريد في قونية! أضف محطات بالضغط على رمز '+' بجانب الأماكن المفضلة."
                  : "Build your unique itinerary! Click the '+' icon next to your saved favorites to chain stops together."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Route Summary Box */}
              <div className={`border p-4 rounded-xl flex justify-between items-center shadow-sm ${isLight ? "bg-[#A0423D]/5 border-[#A0423D]/25" : "bg-[#A0423D]/20 border-[#D4A574]/25"}`}>
                <div className="space-y-1 text-xs">
                  <div className="flex gap-4">
                    <span className={`font-bold ${isLight ? "text-[#A0423D]" : "text-[#D4A574]"}`}>
                      {language === "TR" ? "Toplam Mesafe" : language === "ZH" ? "总距离" : language === "AR" ? "المسافة الكلية" : "Total Distance"}: {metrics.distance} km
                    </span>
                    <span className={`font-bold ${isLight ? "text-[#333333]" : "text-gray-200"}`}>
                      {language === "TR" ? "Ziyaret Süresi" : language === "ZH" ? "总用时" : language === "AR" ? "الوقت المقدر" : "Est. Duration"}: {metrics.duration} {language === "TR" ? "dk" : language === "ZH" ? "分钟" : language === "AR" ? "دقيقة" : "mins"}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#999999] font-medium">
                    {language === "TR" ? "*Sırçalı Hotel çıkışlı ardışık mesafeler baz alınmıştır." : "*Calculated starting from Sırçalı Hotel."}
                  </p>
                </div>

                <button
                  onClick={handleShareRoute}
                  className="flex items-center gap-1.5 bg-[#A0423D] hover:bg-opacity-95 border border-[#D4A574]/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  <Share2 className="w-3.5 h-3.5 text-white" />
                  <span>{language === "TR" ? "Rotayı Paylaş" : language === "ZH" ? "分享路线" : language === "AR" ? "مشاركة المسار" : "Share Route"}</span>
                </button>
              </div>

              {/* Timeline stop-by-stop list */}
              <div className="relative pl-5 border-l-2 border-[#A0423D]/40 space-y-4">
                {customRoute.map((id, index) => {
                  const rPlace = places.find((pl) => pl.id === id);
                  if (!rPlace) return null;
                  return (
                    <div key={id} className={`relative border p-3 rounded-xl flex justify-between items-center transition-all shadow-sm ${
                      isLight ? "bg-white border-[#E8E8E8] hover:border-[#D4A574]/40" : "bg-[#5C1E1B] border-[#D4A574]/15 hover:border-[#D4A574]/40"
                    }`}>
                      {/* Timeline Dot with number */}
                      <div className="absolute -left-[26px] top-1/2 -translate-y-1/2 w-5.5 h-5.5 rounded-full bg-[#A0423D] border-2 border-[#D4A574] text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
                        {index + 1}
                      </div>

                      <div className="min-w-0 flex items-center gap-3">
                        {/* Tiny image */}
                        <PlacePhoto
                          place={rPlace}
                          className="w-10 h-10 object-cover rounded-md border border-[#E8E8E8]"
                        />
                        <div className="text-left">
                          <button
                            onClick={() => onSelectPlace(rPlace)}
                            className={`font-serif font-bold text-xs block truncate cursor-pointer ${isLight ? "text-[#333333] hover:text-[#A0423D]" : "text-gray-200 hover:text-[#D4A574]"}`}
                          >
                            {getPlaceName(rPlace)}
                          </button>
                          <div className="flex gap-2 text-[9px] text-[#999999] font-semibold mt-0.5">
                            <span className={`uppercase tracking-wider font-bold ${isLight ? "text-[#A0423D]" : "text-[#D4A574]"}`}>{rPlace.kategori}</span>
                            <span>•</span>
                            <span>{rPlace.ziyaret_suresi_dk} {language === "TR" ? "dk" : "mins"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onShowOnMap(rPlace)}
                          className={`text-[10px] font-bold hover:underline cursor-pointer ${isLight ? "text-[#A0423D]" : "text-[#D4A574]"}`}
                        >
                          {language === "TR" ? "HARİTA" : "MAP"}
                        </button>
                        <button
                          onClick={() => removeFromRoute(id)}
                          className={`p-1 rounded-lg cursor-pointer ${isLight ? "hover:bg-gray-100 text-red-500" : "hover:bg-[#A0423D]/30 text-red-400"}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Today's Checklist */}
          <div className={`pt-6 border-t space-y-3 ${isLight ? "border-[#E8E8E8]" : "border-[#D4A574]/15"}`}>
            <h3 className={`font-serif font-bold text-sm tracking-wider uppercase flex items-center gap-1.5 pb-1 ${isLight ? "text-[#A0423D]" : "text-white"}`}>
              <CheckCircle2 className="w-4 h-4 text-[#D4A574]" />
              {language === "TR" ? "GÜNLÜK GEZİ CHECKLIST" : language === "ZH" ? "今日游览核对清单" : language === "AR" ? "قائمة زياراتي اليومية" : "TODAY'S VISIT CHECKLIST"}
            </h3>

            <div className={`border p-4 rounded-xl space-y-3 shadow-sm ${isLight ? "bg-[#FDFBF7] border-[#E8E8E8]" : "bg-[#5C1E1B] border-[#D4A574]/20"}`}>
              {places.slice(0, 6).map((p) => {
                const isChecked = checklist.includes(p.id);
                return (
                  <div
                    key={p.id}
                    onClick={() => toggleChecklistItem(p.id)}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    {isChecked ? (
                      <CheckSquare className="w-4.5 h-4.5 text-[#A0423D] fill-[#A0423D]/10" />
                    ) : (
                      <Square className="w-4.5 h-4.5 text-[#999999] group-hover:text-[#A0423D] transition-colors" />
                    )}
                    <span className={`text-xs transition-all font-medium ${isChecked ? "text-gray-400 line-through" : (isLight ? "text-[#333333]" : "text-gray-200")}`}>
                      {getPlaceName(p)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
