import { MessageCircle, CalendarCheck } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { useState, useEffect } from "react";
// Import our new Google Reviews API Hook
import { useGoogleReviews } from "./UseGoogleReviews";

import HERO_BG from "./../../../public/images/Chares_outside.jpg";

export function Hero() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  // Fetch live data from Google API Hook (Using a dummy Place ID for now)
  const { data: googleData, loading: googleLoading } = useGoogleReviews("ChIJN1t_tDeuEmsRUsoyG83frY4");

  // Check business hours logic (Everyday 6 PM to 3 AM)
  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      
      const openHour = 18; // 6 PM
      const closeHour = 3; // 3 AM

      // Since the time crosses midnight (18 to 3), we use OR (||) instead of AND (&&)
      setIsOpen(hours >= openHour || hours < closeHour);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative flex items-center justify-center min-h-screen overflow-hidden" style={{ paddingTop: "80px" }}>
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${HERO_BG}')` }} />
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent)" }} />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-16 w-full">
        <div className="max-w-[720px]">
          
          <div className={`inline-flex items-center gap-2 border rounded-full px-4 py-1.5 mb-6 transition-colors duration-300 ${ isOpen ? "bg-amber-600/20 border-amber-400/40 text-amber-300" : "bg-red-900/40 border-red-500/40 text-red-300" }`}>
            <span className={`inline-block w-2 h-2 rounded-full ${isOpen ? "bg-amber-400 animate-pulse" : "bg-red-500"}`} />
            <span style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "0.5px" }}>
              {isOpen ? t("contOpen") : t("contClosed")} · {t("heroLocation")}
            </span>
          </div>

          <h1 className="text-white mb-6" style={{ fontSize: "clamp(40px, 6vw, 76px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-1.5px" }}>
            {t("heroTitle1")}
            <br />
            <span className="text-amber-400">{t("heroTitle2")}</span>
          </h1>

          <p className="text-gray-300 mb-10 max-w-[520px]" style={{ fontSize: "clamp(16px, 2vw, 20px)", lineHeight: 1.7, fontWeight: 400 }}>
            {t("heroSub")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => scrollTo("contact")} className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white rounded-xl transition-all duration-200 shadow-lg shadow-amber-900/40 hover:shadow-amber-900/60 hover:-translate-y-0.5" style={{ padding: "16px 32px", fontSize: "16px", fontWeight: 700 }}>
              <CalendarCheck size={20} />
              {t("heroBtnBook")}
            </button>

            <a href="https://wa.me/+9665333507080" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-xl transition-all duration-200 backdrop-blur-sm hover:-translate-y-0.5" style={{ padding: "16px 32px", fontSize: "16px", fontWeight: 600 }}>
              <MessageCircle size={20} />
              {t("heroBtnOrder")}
            </a>
          </div>

          <div className="flex flex-wrap gap-8 mt-14 pt-10 border-t border-white/15">
            {/* Stat 1: Static */}
            <div>
              <div className="text-white" style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-0.5px" }}>5+</div>
              <div className="text-gray-400" style={{ fontSize: "13px", fontWeight: 400 }}>{t("statYears")}</div>
            </div>
            
            {/* Stat 2: Dynamic API Rating */}
            <div>
              <div className="text-white" style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-0.5px" }}>
                {googleLoading ? "..." : `${googleData?.rating}★`}
              </div>
              <div className="text-gray-400" style={{ fontSize: "13px", fontWeight: 400 }}>{t("statRating")}</div>
            </div>

            {/* Stat 3: Dynamic API Total Reviews */}
            <div>
              <div className="text-white" style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-0.5px" }}>
                {googleLoading ? "..." : `${googleData?.user_ratings_total}+`}
              </div>
              <div className="text-gray-400" style={{ fontSize: "13px", fontWeight: 400 }}>{t("statGuests")}</div>
            </div>
          </div>

        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-[1px] h-10 bg-white/30" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.5))" }} />
      </div>
    </section>
  );
}