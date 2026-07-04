import React, { useState, useRef, useEffect } from "react";
import { Language } from "../types";
import { Sparkles, Send, Bot, User, Trash2, ArrowRight } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface AIGuideProps {
  language: Language;
  isLight?: boolean;
}

export default function AIGuide({ language, isLight = true }: AIGuideProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: language === "TR" 
        ? "Merhaba! Ben Sırçalı Hotel Sanal Asistanıyım. Konya'nın zengin Selçuklu tarihi, gezilecek gizli yerleri, leziz mutfak kültürü veya otelimizin hizmetleri hakkında bana dilediğinizi sorabilirsiniz."
        : language === "ZH"
        ? "您好！我是塞尔恰勒酒店的虚拟助理。关于科尼亚丰富的塞尔柱历史、小众景点、特色美食或我们酒店的专属服务，您可以向我提问任何问题。"
        : language === "AR"
        ? "مرحباً بكم! أنا المساعد الافتراضي لفندق سيرتشالي. يمكنكم سؤالي عن تاريخ قونية السلجوقي الغني، المعالم المخفية، المطبخ التقليدي، أو خدمات الفندق."
        : "Hello! I am the virtual concierge of Sırçalı Hotel. Feel free to ask me about Konya's rich Seljuk history, hidden gems, culinary delights, or our hotel's guest services."
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userText, language }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.answer || "..." }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: language === "TR" 
            ? "Üzgünüm, şu an bağlantı kuramıyorum. Lütfen daha sonra tekrar deneyiniz." 
            : "Apologies, I am experiencing a temporary connection issue. Please try again shortly."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        sender: "bot",
        text: language === "TR" 
          ? "Sohbet sıfırlandı. Konya ve Sırçalı Hotel hakkında yeni sorularınızı bekliyorum!" 
          : "Chat history cleared. Ready for your new questions about Konya and Sırçalı Hotel!"
      }
    ]);
  };

  const PRESET_QUESTIONS = {
    TR: [
      "Sırçalı Medrese'nin tarihi nedir?",
      "Konya'da etliekmek nerede yenir?",
      "1 günlük gezi planı önerir misin?",
      "Sırçalı Hotel'in sunduğu olanaklar nelerdir?"
    ],
    EN: [
      "What is the history of Sırçalı Madrasa?",
      "Where is the best place to eat Etliekmek?",
      "Suggest a 1-day itinerary for Konya.",
      "What amenities does Sırçalı Hotel provide?"
    ],
    ZH: [
      "瑟尔恰勒神学院的历史是什么？",
      "科尼亚哪里能吃到正宗的肉饼 (Etliekmek)？",
      "推荐一个一天的科尼亚游览路线。",
      "塞尔恰勒酒店提供哪些设施？"
    ],
    AR: [
      "ما هو تاريخ مدرسة سيرتشالي؟",
      "أين هو أفضل مكان لتناول خبز اللحم (إيتلي إكمك)؟",
      "اقترح مسار رحلة ليوم واحد في قونية.",
      "ما هي المرافق التي يقدمها فندق سيرتشالي؟"
    ]
  };

  const currentPresets = PRESET_QUESTIONS[language] || PRESET_QUESTIONS["EN"];

  return (
    <div className={`flex flex-col h-[calc(100vh-210px)] min-h-[480px] rounded-2xl overflow-hidden shadow-sm border ${isLight ? "bg-white border-[#E8E8E8]" : "bg-[#5C1E1B] border-[#D4A574]/20"}`}>
      {/* AI Assistant Header */}
      <div className={`border-b px-4 py-3.5 flex items-center justify-between shrink-0 ${isLight ? "bg-[#FDFBF7] border-[#E8E8E8]" : "bg-[#5C1E1B] border-[#D4A574]/20"}`}>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#A0423D]/10 flex items-center justify-center text-[#A0423D] border border-[#A0423D]/20 shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-sm text-[#A0423D] leading-tight">
              {language === "TR" ? "Sırçalı Sanal Asistanı" : language === "ZH" ? "塞尔恰勒智能助理" : language === "AR" ? "مساعد سيرتشالي الذكي" : "Sırçalı Guest Concierge"}
            </h2>
            <p className="text-[10px] text-[#D4A574] font-semibold uppercase tracking-wider">
              Powered by AI • 24/7 Virtual Host
            </p>
          </div>
        </div>

        {messages.length > 1 && (
          <button
            onClick={clearChat}
            className={`p-2 rounded-full transition-colors cursor-pointer ${isLight ? "text-[#999999] hover:text-[#A0423D] hover:bg-gray-100" : "text-gray-300 hover:text-[#D4A574] hover:bg-[#A0423D]/30"}`}
            title="Temizle"
          >
            <Trash2 className="w-4.5 h-4.5" />
          </button>
        )}
      </div>

      {/* Message Area */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isLight ? "bg-white" : "bg-[#5C1E1B]/30"}`}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 max-w-[85%] ${
              msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            }`}
          >
            {/* Avatar icon */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border shadow-sm ${
                msg.sender === "user"
                  ? "bg-[#D4A574]/10 border-[#D4A574]/20 text-[#D4A574]"
                  : "bg-[#A0423D]/10 border-[#A0423D]/20 text-[#A0423D]"
              }`}
            >
              {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble text */}
            <div
              className={`p-3 rounded-2xl text-xs leading-relaxed font-medium ${
                msg.sender === "user"
                  ? (isLight ? "bg-[#D4A574]/10 text-[#333333] rounded-tr-none" : "bg-[#D4A574]/20 text-white rounded-tr-none")
                  : (isLight ? "bg-[#FDFBF7] text-[#333333] border border-[#E8E8E8] rounded-tl-none shadow-sm" : "bg-[#A0423D]/30 text-gray-200 border border-[#D4A574]/20 rounded-tl-none shadow-sm")
              }`}
            >
              <p className="whitespace-pre-line">{msg.text}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 max-w-[85%] mr-auto">
            <div className="w-8 h-8 rounded-full bg-[#A0423D]/10 border border-[#A0423D]/20 flex items-center justify-center text-[#A0423D]">
              <Bot className="w-4 h-4" />
            </div>
            <div className={`p-3 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-sm border ${isLight ? "bg-[#FDFBF7] border-[#E8E8E8]" : "bg-[#A0423D]/30 border-[#D4A574]/20"}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A0423D] animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#A0423D] animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#A0423D] animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Preset Suggestions */}
      {messages.length === 1 && (
        <div className={`px-4 py-3 border-t flex flex-wrap gap-2 justify-center shrink-0 ${isLight ? "border-[#E8E8E8] bg-[#FDFBF7]/50" : "border-[#D4A574]/15 bg-[#5C1E1B]"}`}>
          {currentPresets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInput(preset);
              }}
              className={`text-[10px] font-bold rounded-xl px-3 py-1.5 transition-all cursor-pointer flex items-center gap-1 ${
                isLight 
                  ? "text-[#A0423D] bg-[#A0423D]/5 border border-[#A0423D]/10 hover:bg-[#A0423D]/10 hover:border-[#A0423D]/20" 
                  : "text-[#D4A574] bg-[#D4A574]/5 border border-[#D4A574]/10 hover:bg-[#D4A574]/10 hover:border-[#D4A574]/20"
              }`}
            >
              <span>{preset}</span>
              <ArrowRight className="w-3 h-3 text-[#D4A574]" />
            </button>
          ))}
        </div>
      )}

      {/* Input form */}
      <form
        onSubmit={handleSend}
        className={`p-3 border-t flex gap-2 shrink-0 items-center ${isLight ? "border-[#E8E8E8] bg-white" : "border-[#D4A574]/15 bg-[#5C1E1B]"}`}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            language === "TR" 
              ? "Konya veya Sırçalı Hotel hakkında bir şeyler sorun..." 
              : "Ask me anything about Konya or Sırçalı Hotel..."
          }
          className={`flex-1 rounded-xl px-4 py-2.5 text-xs focus:outline-none placeholder-[#999999] font-medium ${
            isLight 
              ? "bg-[#FDFBF7] border border-[#E8E8E8] focus:border-[#A0423D] text-[#333333]" 
              : "bg-[#A0423D]/20 border border-[#D4A574]/20 focus:border-[#D4A574] text-white"
          }`}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-[#A0423D] hover:bg-opacity-95 text-white p-2.5 rounded-xl transition-all cursor-pointer shadow-sm shrink-0"
          disabled={isLoading || !input.trim()}
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </form>
    </div>
  );
}
