import { useState } from "react";
import { ArrowRight, X, Info, MessageCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "./LanguageContext";
import { SERVICES } from "./../../data/servicesData";
import { Link } from "react-router-dom";

// Define a type for our service so TypeScript knows what to expect
type ServiceType = typeof SERVICES[0];

export function Services() {
  const { t } = useLanguage();
  
  // State to track which product is selected for the modal (null means modal is closed)
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);

  // Helper function to handle WhatsApp ordering
  const handleOrder = (productName: string) => {
    const message = encodeURIComponent(`Hello, I would like to order: ${productName}`);
    window.open(`https://wa.me/15551234567?text=${message}`, "_blank");
  };

  return (
    <section id="services" className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-[580px] mx-auto">
          <span className="inline-block text-amber-600 dark:text-amber-400 mb-3" style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase" }}>
            {t("srvBadge")}
          </span>
          <h2 className="text-gray-900 dark:text-white mb-4" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.5px", lineHeight: 1.15 }}>
            {t("srvTitle1")}<br />{t("srvTitle2")}
          </h2>
          <p className="text-gray-500 dark:text-gray-400" style={{ fontSize: "17px", lineHeight: 1.7 }}>
            {t("srvSub")}
          </p>
        </div>

        {/* Services Slider (Mobile) / Grid (Desktop) */}
        <div 
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 px-6 -mx-6 md:grid md:grid-cols-2 lg:grid-cols-4 md:mx-0 md:px-0 md:pb-0 md:overflow-visible"
          style={{ scrollbarWidth: "none" }}
        >
          {SERVICES.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              // Added width classes for mobile slider: w-[85vw] shrink-0 snap-center
              className="w-[85vw] sm:w-[320px] md:w-auto shrink-0 snap-center bg-white dark:bg-gray-950 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-gray-200/60 dark:hover:shadow-black/40 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col border border-transparent dark:border-gray-800 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden" style={{ height: "220px" }}>
                <ImageWithFallback src={service.image} alt={t(service.titleKey)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className={`absolute top-3 left-3 ${service.tagColor} text-white rounded-full px-3 py-1`} style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.3px" }}>
                  {t(service.tagKey)}
                </span>
              </div>

              {/* Text Content */}
              <div className="flex flex-col flex-1 p-6 bg-white dark:bg-gray-950">
                <h3 className="text-gray-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.2px", lineHeight: 1.3 }}>
                  {t(service.titleKey)}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4 flex-1 line-clamp-2" style={{ fontSize: "14px", lineHeight: 1.75 }}>
                  {t(service.descKey)}
                </p>
                
                {/* Price and CTA */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-amber-600 dark:text-amber-400" style={{ fontSize: "15px", fontWeight: 700 }}>
                    {t(service.priceKey)}
                  </span>
                  <button className="inline-flex items-center gap-1.5 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors group/btn" style={{ fontSize: "13px", fontWeight: 600 }}>
                    {t("srvBtn")}
                    <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5 rtl:rotate-180 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Menu Button */}
        <div className="mt-16 flex justify-center">
          <Link
            to="/menu"
            className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-amber-600 dark:border-amber-500 text-amber-600 dark:text-amber-400 hover:bg-amber-600 hover:text-white dark:hover:bg-amber-500 dark:hover:text-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-md group/link"
            style={{ padding: "14px 36px", fontSize: "16px", fontWeight: 700 }}
          >
            {t("btnViewAll")}
            <ArrowRight size={18} className="group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1 rtl:rotate-180 transition-transform duration-200" />
          </Link>
        </div>
      
        
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* PRODUCT DIALOG (MODAL) */}
      {/* ------------------------------------------------------------------ */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" style={{ backgroundColor: "rgba(0, 0, 0, 0.65)", backdropFilter: "blur(4px)" }}>
          
          {/* Modal Container */}
          <div className="bg-white dark:bg-gray-900 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200 border border-gray-100 dark:border-gray-800" style={{ maxHeight: "90vh" }}>
            
            {/* Close Button (Absolute Top Right) */}
            <button 
              onClick={() => setSelectedService(null)} 
              className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-colors backdrop-blur-sm rtl:right-auto rtl:left-4"
              aria-label={t("modalClose")}
            >
              <X size={20} />
            </button>

            {/* Modal Image Section */}
            <div className="w-full md:w-5/12 h-64 md:h-auto relative">
              <ImageWithFallback src={selectedService.image} alt={t(selectedService.titleKey)} className="w-full h-full object-cover" />
              <span className={`absolute top-4 left-4 ${selectedService.tagColor} text-white rounded-full px-4 py-1.5 shadow-md`} style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.5px" }}>
                {t(selectedService.tagKey)}
              </span>
            </div>

            {/* Modal Content Section */}
            <div className="w-full md:w-7/12 p-6 sm:p-8 flex flex-col overflow-y-auto">
              <div className="mb-2">
                <h3 className="text-gray-900 dark:text-white" style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-0.5px", lineHeight: 1.2 }}>
                  {t(selectedService.titleKey)}
                </h3>
                <p className="text-amber-600 dark:text-amber-400 mt-2" style={{ fontSize: "20px", fontWeight: 700 }}>
                  {t(selectedService.priceKey)}
                </p>
              </div>

              {/* Extra Info (Calories) */}
              <div className="flex items-center gap-2 mt-4 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 w-fit px-3 py-1.5 rounded-lg border border-gray-100 dark:border-gray-800">
                <Info size={16} />
                <span style={{ fontSize: "13px", fontWeight: 500 }}>{t("modalCalories")}: {selectedService.calories}</span>
              </div>

              <div className="h-px w-full bg-gray-100 dark:bg-gray-800 my-6" />

              {/* Full Detailed Description */}
              <p className="text-gray-600 dark:text-gray-300 flex-1" style={{ fontSize: "15px", lineHeight: 1.8 }}>
                {t(selectedService.detailsKey)}
              </p>

              {/* Actions Footer */}
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => handleOrder(t(selectedService.titleKey))}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white rounded-xl transition-all duration-200 shadow-md shadow-amber-900/20 hover:-translate-y-0.5" 
                  style={{ padding: "14px 24px", fontSize: "15px", fontWeight: 700 }}
                >
                  <MessageCircle size={20} />
                  {t("modalOrder")}
                </button>
                <button 
                  onClick={() => setSelectedService(null)}
                  className="inline-flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl transition-all duration-200" 
                  style={{ padding: "14px 24px", fontSize: "15px", fontWeight: 600 }}
                >
                  {t("modalClose")}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}