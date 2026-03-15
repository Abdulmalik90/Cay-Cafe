import { useState, useEffect } from "react";
import { Menu, X, Coffee, Globe } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle"; 
import { useLanguage } from "./LanguageContext"; 
// Import hooks from React Router to handle cross-page navigation
import { useLocation, useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { key: "navHome", id: "home" },
  { key: "navAbout", id: "about" },
  { key: "navServices", id: "services" },
  { key: "navContact", id: "contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const { lang, toggleLanguage, t } = useLanguage();
  
  // Initialize router hooks
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Updated Scroll Logic for Multi-Page Navigation
  const scrollTo = (id: string) => {
    setMobileOpen(false); // Close mobile menu if open

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white dark:bg-gray-950 ${
        isScrolled ? "shadow-md dark:shadow-gray-800/50" : "shadow-sm dark:shadow-none"
      }`}
      style={{ height: "80px" }}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 h-full flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("home")}>
          <div className="bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0" style={{ padding: "6px" }}>
            <img 
            src="/images/logo.png" 
            alt="Cay Cafe Logo" 
            // اضفنا كلاس dark:invert لكي يتحول لون الشعار للأبيض في الوضع الليلي ليصبح مقروءاً!
            className="h-10 object-contain dark:invert transition-all duration-300" 
          />
          </div>
          <span className="text-gray-900 dark:text-white" style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.3px" }}>
            {t("brandName")}
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-200"
              style={{ fontSize: "14px", fontWeight: 500 }}
            >
              {t(link.key)}
            </button>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={toggleLanguage} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            <Globe size={20} />
            <span className="text-sm font-medium">{lang === "en" ? "العربية" : "English"}</span>
          </button>
          
          <ThemeToggle />

          <button
            onClick={() => scrollTo("contact")}
            className="bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white rounded-lg transition-colors duration-200 ml-2"
            style={{ padding: "10px 20px", fontSize: "14px", fontWeight: 600 }}
          >
            {t("btnContact")}
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-3 md:hidden">
          <button onClick={toggleLanguage} className="text-gray-600 dark:text-gray-300 p-1">
            <Globe size={22} />
          </button>
          <ThemeToggle />
          <button
            className="text-gray-700 dark:text-gray-300 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`md:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 py-4 flex flex-col gap-1 shadow-lg dark:shadow-none">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-left rtl:text-right text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-800 py-3 px-3 rounded-lg transition-colors"
              style={{ fontSize: "15px", fontWeight: 500 }}
            >
              {t(link.key)}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="bg-amber-600 hover:bg-amber-700 text-white rounded-lg mt-3 py-3 transition-colors"
            style={{ fontSize: "15px", fontWeight: 600 }}
          >
            {t("btnContact")}
          </button>
        </div>
      </div>
    </nav>
  );
}