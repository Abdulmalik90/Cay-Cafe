import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { useState, useEffect } from "react";

// Updated HOURS array to use translation keys instead of hardcoded strings
// Updated HOURS array (Everyday is the same)
const HOURS = [
  { dayKey: "contEveryday", timeKey: "hoursEveryday", activeDays: [0, 1, 2, 3, 4, 5, 6] },
];

export function Contact() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [statusText, setStatusText] = useState("");

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const hours = now.getHours();

      const openHour = 18; // 6:00 PM
      const closeHour = 3; // 3:00 AM

      // Logic for overnight hours
      const isCurrentlyOpen = hours >= openHour || hours < closeHour;

      if (isCurrentlyOpen) {
        setIsOpen(true);
        // If it's open, it will close at 3 AM
        setStatusText(`· ${t("contClosesAt")} ${t("time3AM")}`);
      } else {
        setIsOpen(false);
        // If it's closed, it will open at 6 PM
        setStatusText(`· ${t("contOpensAt")} ${t("time6PM")}`);
      }
    };

    // Initial check on mount
    checkStatus();

    // Re-check every 60 seconds (60000 ms)
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, [t]);

  return (
    <section id="contact" className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-[580px] mx-auto">
          <span className="inline-block text-amber-600 dark:text-amber-400 mb-3" style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase" }}>
            {t("contBadge")}
          </span>
          <h2 className="text-gray-900 dark:text-white mb-4" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.5px", lineHeight: 1.15 }}>
            {t("contTitle")}
          </h2>
          <p className="text-gray-500 dark:text-gray-400" style={{ fontSize: "17px", lineHeight: 1.7 }}>
            {t("contSub")}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Section */}
          <div className="rounded-2xl overflow-hidden relative shadow-sm border border-gray-100 dark:border-gray-800" style={{ minHeight: "480px" }}>
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 flex flex-col items-center justify-center gap-4 transition-colors">
              <svg className="absolute inset-0 w-full h-full opacity-30 dark:opacity-10" xmlns="http://www.w3.org/2000/svg">
                <defs><pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#9CA3AF" strokeWidth="0.5" /></pattern></defs>
                <rect width="100%" height="100%" fill="url(#mapGrid)" />
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#E5E7EB" strokeWidth="8" />
                <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#E5E7EB" strokeWidth="6" />
                <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#E5E7EB" strokeWidth="4" />
                <rect x="33%" y="27%" width="15%" height="20%" fill="#D1D5DB" rx="2" />
                <rect x="33%" y="53%" width="33%" height="19%" fill="#D1D5DB" rx="2" />
                <rect x="73%" y="27%" width="22%" height="44%" fill="#D1D5DB" rx="2" />
              </svg>
              <div className="relative z-10 flex flex-col items-center gap-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg">
                <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  <MapPin className="text-white" size={22} fill="white" />
                </div>
                <div className="text-center">
                  <p className="text-gray-900 dark:text-white" style={{ fontSize: "15px", fontWeight: 700 }}>{t("brandName")}</p>
                  <p className="text-gray-500 dark:text-gray-400" style={{ fontSize: "13px" }}>{t("contRealAddr1")}</p>
                </div>
                <a href="https://maps.app.goo.gl/nR5FapRkGNTvEQnb9" target="_blank" rel="noopener noreferrer" className="mt-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg px-5 py-2.5 transition-colors text-sm font-semibold" style={{ fontSize: "13px", fontWeight: 600 }}>
                  {t("contGoogleMap")}
                </a>
              </div>
            </div>
          </div>

          {/* Contact Details & Hours Section */}
          <div className="flex flex-col gap-6">
            {/* Contact Information Card */}
            <div className="bg-white dark:bg-gray-950 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
              <h3 className="text-gray-900 dark:text-white mb-6" style={{ fontSize: "20px", fontWeight: 700 }}>{t("contInfo")}</h3>
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0"><MapPin className="text-amber-600 dark:text-amber-400" size={18} /></div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400" style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>{t("contAddr")}</p>
                    <p className="text-gray-900 dark:text-white" style={{ fontSize: "15px", fontWeight: 500 }}>{t("contRealAddr1")}</p>
                    <p className="text-gray-500 dark:text-gray-400" style={{ fontSize: "14px" }}>{t("contRealAddr2")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0"><Phone className="text-amber-600 dark:text-amber-400" size={18} /></div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400" style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>{t("contPhone")}</p>
                    <div style={{direction:"ltr" }}>
                      <a href="tel:+9665333507080" className="text-gray-900 dark:text-white hover:text-amber-600 transition-colors" style={{ fontSize: "15px", fontWeight: 500 }}>+966 533 350 7080</a>
                    </div>
                    
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0"><MessageCircle className="text-green-600 dark:text-green-400" size={18} /></div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400" style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>{t("contWhatsApp")}</p>
                    <a href="https://wa.me/+9665333507080" target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-green-400 hover:text-green-700 transition-colors" style={{ fontSize: "15px", fontWeight: 500 }}>{t("contChat")}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0"><Mail className="text-amber-600 dark:text-amber-400" size={18} /></div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400" style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>{t("contEmail")}</p>
                    <a href="mailto:hello@brewhouse.cafe" className="text-gray-900 dark:text-white hover:text-amber-600 transition-colors" style={{ fontSize: "15px", fontWeight: 500 }}>cay_cafe@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="bg-white dark:bg-gray-950 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0"><Clock className="text-amber-600 dark:text-amber-400" size={18} /></div>
                <h3 className="text-gray-900 dark:text-white" style={{ fontSize: "20px", fontWeight: 700 }}>{t("contHours")}</h3>
              </div>
              
              {/* Dynamic Business Hours List */}
              <div className="flex flex-col gap-3">
                {HOURS.map((hour) => {
                  // Get the current day from the user's device (0 = Sunday, 1-6 = Mon-Sat)
                  const currentDay = new Date().getDay();
                  // Check if the current day matches the active days of this row
                  const isActive = hour.activeDays.includes(currentDay);

                  return (
                    <div 
                      key={hour.dayKey} 
                      className={`flex justify-between items-center py-3 px-4 rounded-xl transition-colors ${
                        isActive ? "bg-amber-50 dark:bg-amber-900/20" : "bg-gray-50 dark:bg-gray-900"
                      }`}
                    >
                      <span 
                        className={isActive ? "text-amber-700 dark:text-amber-300" : "text-gray-700 dark:text-gray-300"} 
                        style={{ fontSize: "14px", fontWeight: 500 }}
                      >
                        {t(hour.dayKey)}
                      </span>
                      
                      {/* Render translated time */}
                      <span 
                        className={isActive ? "text-amber-600 dark:text-amber-400" : "text-gray-900 dark:text-white"} 
                        style={{ fontSize: "14px", fontWeight: 700 }}
                      >
                        {t(hour.timeKey)}
                      </span>
                    </div>
                  );
                })}
              </div>
              
              {/* Dynamic Status Indicator */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <span className={`inline-block w-2.5 h-2.5 rounded-full ${isOpen ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                <span className={isOpen ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"} style={{ fontSize: "13px", fontWeight: 600 }}>
                  {isOpen ? t("contOpen") : t("contClosed")}
                </span>
                <span className="text-gray-400 dark:text-gray-500" style={{ fontSize: "13px" }}>
                  {statusText}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}