import { Coffee, Instagram, Twitter } from "lucide-react";
import { useLanguage } from "./LanguageContext";
// Import hooks from React Router to handle cross-page navigation
import { useLocation, useNavigate } from "react-router-dom";

export function Footer() {
  const { t } = useLanguage();
  
  // Initialize router hooks
  const location = useLocation();
  const navigate = useNavigate();

  // Updated Scroll Logic for Multi-Page Navigation (Same as Navbar)
  const scrollTo = (id: string) => {
    if (location.pathname !== "/") {
      // If we are NOT on the home page (e.g., on /menu), navigate to home first
      navigate("/");
      // Wait a tiny bit for the home page to render, then scroll to the section
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      // If we are already on the home page, just scroll smoothly
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (id === "home") {
        // Fallback for home if ID is missing
        window.scrollTo({ top: 0, behavior: "smooth" }); 
      }
    }
  };

  return (
    <footer className="bg-gray-900 pt-20 pb-10 border-t border-gray-800 relative z-10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        
        {/* Newsletter CTA */}
        <div
          className="p-6 sm:p-8 rounded-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
          style={{ backgroundColor: "rgba(13, 148, 136, 0.15)", border: "1px solid rgba(13,148,136,0.2)" }}
        >
          <div className="w-full">
            <p className="text-white mb-1" style={{ fontSize: "16px", fontWeight: 700 }}>
              {t("footNewsTitle")}
            </p>
            <p className="text-gray-400" style={{ fontSize: "13px" }}>
              {t("footNewsSub")}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
            <input
              type="email"
              placeholder={t("footNewsPlaceholder")}
              className="w-full sm:w-64 rounded-xl px-4 py-3 sm:py-2.5 text-sm text-gray-900 bg-white dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
              style={{ fontSize: "14px" }}
            />
            <button
              className="w-full sm:w-auto bg-amber-600 hover:bg-amber-500 text-white rounded-xl px-5 py-3 sm:py-2.5 transition-colors whitespace-nowrap flex justify-center items-center"
              style={{ fontSize: "14px", fontWeight: 600 }}
            >
              {t("footNewsBtn")}
            </button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mt-16 pt-8 border-t border-gray-800">
          
          {/* Brand Column */}
          <div className="flex flex-col items-start text-start">
            <div className="flex items-center gap-3 mb-6 cursor-pointer" onClick={() => scrollTo("home")}>
              <div className="bg-amber-600 rounded-xl flex items-center justify-center w-10 h-10">
                <Coffee className="text-white" size={20} />
              </div>
              <span className="text-white text-xl font-bold">{t("brandName")}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t("footDesc")}
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-amber-600 hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-amber-600 hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-amber-600 hover:text-white transition-colors">
                {/* TikTok SVG Icon */}
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Explore Column */}
          <div className="flex flex-col items-start text-start">
            <h4 className="text-white font-bold mb-6">{t("footExplore")}</h4>
            <ul className="flex flex-col gap-4">
              <li><button onClick={() => scrollTo("home")} className="text-gray-400 hover:text-amber-400 transition-colors text-sm">{t("navHome")}</button></li>
              <li><button onClick={() => scrollTo("about")} className="text-gray-400 hover:text-amber-400 transition-colors text-sm">{t("navAbout")}</button></li>
              <li><button onClick={() => scrollTo("services")} className="text-gray-400 hover:text-amber-400 transition-colors text-sm">{t("navServices")}</button></li>
            </ul>
          </div>

          {/* Visit Column */}
          <div className="flex flex-col items-start text-start">
            <h4 className="text-white font-bold mb-6">{t("footVisit")}</h4>
            <ul className="flex flex-col gap-4">
              <li><button onClick={() => scrollTo("contact")} className="text-gray-400 hover:text-amber-400 transition-colors text-sm">{t("contInfo")}</button></li>
              <li><button onClick={() => scrollTo("contact")} className="text-gray-400 hover:text-amber-400 transition-colors text-sm">{t("contAddr")}</button></li>
              <li><button onClick={() => scrollTo("contact")} className="text-gray-400 hover:text-amber-400 transition-colors text-sm">{t("contHours")}</button></li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="flex flex-col items-start text-start">
            <h4 className="text-white font-bold mb-6">{t("footConnect")}</h4>
            <ul className="flex flex-col gap-4">
              <li><a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">{t("contWhatsApp")}</a></li>
              <li><a href="mailto:hello@brewhouse.cafe" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">{t("contEmail")}</a></li>
              <li><a href="tel:+15551234567" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">{t("contPhone")}</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-start">
            © {new Date().getFullYear()} {t("footCopy")}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors text-sm">{t("footPrivacy")}</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors text-sm">{t("footTerms")}</a>
          </div>
        </div>

      </div>
    </footer>
  );
}