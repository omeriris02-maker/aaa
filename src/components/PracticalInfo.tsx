import { PRACTICAL_INFO } from "../data";
import { Language } from "../types";
import { Phone, ShieldAlert, Sparkles, Lightbulb, HeartHandshake } from "lucide-react";

interface PracticalInfoProps {
  language: Language;
  isLight?: boolean;
}

export default function PracticalInfo({ language, isLight = true }: PracticalInfoProps) {
  const currentData = PRACTICAL_INFO[language] || PRACTICAL_INFO["EN"];

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className={`flex items-center gap-2 border-b pb-3 ${isLight ? "border-[#E8E8E8]" : "border-[#D4A574]/20"}`}>
        <HeartHandshake className="w-5 h-5 text-[#A0423D]" />
        <h2 className={`font-serif font-bold text-lg md:text-xl ${isLight ? "text-[#A0423D]" : "text-white"}`}>
          {language === "TR" ? "Pratik Gezi Rehberi" : language === "ZH" ? "实用旅行指南" : language === "AR" ? "معلومات عملية تهمك" : "Practical Guest Guide"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Emergency Numbers */}
        <div className="space-y-4">
          <h3 className={`font-serif font-bold text-sm tracking-wider uppercase flex items-center gap-1.5 border-b pb-2 ${isLight ? "text-[#A0423D] border-[#E8E8E8]" : "text-[#D4A574] border-[#D4A574]/15"}`}>
            <Phone className="w-4 h-4 text-[#D4A574]" />
            {language === "TR" ? "ÖNEMLİ TELEFONLAR" : language === "ZH" ? "紧急联系电话" : language === "AR" ? "أرقام هواتف هامة" : "EMERGENCY CONTACTS"}
          </h3>

          <div className={`border p-4 rounded-2xl space-y-3 shadow-sm ${isLight ? "bg-[#FDFBF7] border-[#E8E8E8]" : "bg-[#5C1E1B] border-[#D4A574]/15"}`}>
            {currentData.emergency.map((item, idx) => (
              <div key={idx} className={`flex justify-between items-center text-xs py-1.5 border-b last:border-0 ${isLight ? "border-[#E8E8E8]" : "border-[#D4A574]/15"}`}>
                <span className={`font-bold ${isLight ? "text-[#333333]" : "text-gray-200"}`}>{item.ad}</span>
                <a
                  href={`tel:${item.no}`}
                  className="font-mono font-bold text-[#A0423D] hover:text-[#D4A574] hover:underline"
                >
                  {item.no}
                </a>
              </div>
            ))}
          </div>

          {/* Quick Cultural banner */}
          <div className={`border p-4 rounded-2xl flex gap-3 shadow-sm ${isLight ? "bg-[#A0423D]/5 border-[#A0423D]/20" : "bg-[#A0423D]/20 border-[#D4A574]/20"}`}>
            <ShieldAlert className="w-5 h-5 text-[#A0423D] shrink-0" />
            <div className="space-y-1 text-xs">
              <span className="font-bold text-[#A0423D]">
                {language === "TR" ? "Sağlık ve Güvence" : language === "ZH" ? "安全与医疗保障" : language === "AR" ? "الأمان والخدمات الصحية" : "Safety & Emergency Coverage"}
              </span>
              <p className={`leading-relaxed font-medium ${isLight ? "text-[#333333]" : "text-gray-200"}`}>
                {language === "TR"
                  ? "Sırçalı Hotel misafiri olarak herhangi bir acil durumda resepsiyonu arayabilirsiniz. 112 numaralı telefon ambulans, polis ve itfaiye için ortak tek numaradır."
                  : language === "ZH"
                  ? "作为塞尔恰勒酒店的贵宾，如有任何紧急情况，请随时致电前台。112是土耳其集成了救护车、警察和消防的统一求助电话。"
                  : language === "AR"
                  ? "بصفتك ضيفاً في فندق سيرتشالي، يمكنك الاتصال بمكتب الاستقبال في أي وقت في حال الطوارئ. الرقم الموحد 112 يخدم الإسعاف والشرطة والإطفاء."
                  : "As an esteemed Sırçalı Hotel guest, contact our front desk for immediate assistance. Dialing 112 connects you directly to Turkish ambulance, police, and fire dispatchers."}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Cultural Rules and Local tips */}
        <div className="space-y-6">
          {/* Rules */}
          <div className="space-y-3">
            <h3 className={`font-serif font-bold text-sm tracking-wider uppercase flex items-center gap-1.5 border-b pb-2 ${isLight ? "text-[#A0423D] border-[#E8E8E8]" : "text-[#D4A574] border-[#D4A574]/15"}`}>
              <Sparkles className="w-4 h-4 text-[#D4A574]" />
              {language === "TR" ? "KÜLTÜREL ETİKET" : language === "ZH" ? "文化礼仪守则" : language === "AR" ? "قواعد السلوك والثقافة" : "CULTURAL ETIQUETTE"}
            </h3>

            <div className="space-y-2">
              {currentData.rules.map((rule, idx) => (
                <div key={idx} className={`border p-3 rounded-xl flex items-start gap-2 text-xs shadow-sm ${isLight ? "bg-[#FDFBF7] border-[#E8E8E8]" : "bg-[#5C1E1B] border-[#D4A574]/15"}`}>
                  <div className="w-2 h-2 rounded-full bg-[#D4A574] shrink-0 mt-1.5" />
                  <p className={`leading-relaxed font-medium ${isLight ? "text-[#333333]" : "text-gray-200"}`}>{rule}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Local Tips */}
          <div className="space-y-3">
            <h3 className={`font-serif font-bold text-sm tracking-wider uppercase flex items-center gap-1.5 border-b pb-2 ${isLight ? "text-[#A0423D] border-[#E8E8E8]" : "text-[#D4A574] border-[#D4A574]/15"}`}>
              <Lightbulb className="w-4 h-4 text-[#D4A574]" />
              {language === "TR" ? "YEREL İPUÇLARI" : language === "ZH" ? "实用出行贴士" : language === "AR" ? "نصائح وإرشادات محلية" : "LOCAL TRAVEL TIPS"}
            </h3>

            <div className="space-y-2">
              {currentData.tips.map((tip, idx) => (
                <div key={idx} className={`border p-3 rounded-xl flex items-start gap-2 text-xs shadow-sm ${isLight ? "bg-[#FDFBF7] border-[#E8E8E8]" : "bg-[#5C1E1B] border-[#D4A574]/15"}`}>
                  <div className="w-2 h-2 rounded-full bg-[#A0423D] shrink-0 mt-1.5" />
                  <p className={`leading-relaxed font-medium ${isLight ? "text-[#333333]" : "text-gray-200"}`}>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Accuracy Disclaimer */}
      <div className={`mt-6 pt-4 border-t text-center text-[10px] text-gray-400 font-medium leading-relaxed ${isLight ? "border-[#E8E8E8]" : "border-[#D4A574]/15"}`}>
        <p>
          {language === "TR"
            ? "Yasal Uyarı: Bu rehberde sunulan çalışma saatleri, giriş ücretleri, erişilebilirlik imkanları ve diğer turistik bilgiler zaman içinde değişiklik gösterebilir. Sırçalı Hotel, üçüncü şahıslara ait turistik tesislerin ve müzelerin güncel operasyonel değişikliklerinden sorumlu tutulamaz. Ziyaretinizden önce güncel bilgileri teyit etmeniz önerilir."
            : language === "ZH"
            ? "免责声明：本指南中提供的开放时间、门票价格、无障碍设施以及其他游客信息可能会随时间而变化。塞尔恰勒酒店不对第三方服务或景点的变更承担责任。我们建议客人在出行前直接与各场馆核实最新信息。"
            : language === "AR"
            ? "إخلاء مسؤولية: قد تتغير ساعات العمل، ورسوم الدخول، وميزات الوصول، وتفاصيل الزيارة الأخرى الواردة في هذا الدليل بمرور الوقت. لا يمكن تحميل فندق سيرتشالي المسؤولية عن التغييرات التشغيلية في خدمات الجهات الخارجية أو المتاحف. ننصح الضيوف بالتحقق من التفاصيل مباشرة من المواقع قبل الزيارة."
            : "Disclaimer: Working hours, admission fees, accessibility features, and other visitor details provided in this guide may change over time. Sırçalı Hotel cannot be held responsible for variations or operational changes in third-party services or museums. We advise guests to verify current details directly with the venues before visiting."}
        </p>
      </div>
    </div>
  );
}
