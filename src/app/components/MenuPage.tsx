import { useState, useEffect } from "react";
import { ArrowLeft, X, Info, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "./LanguageContext"; 
import { ImageWithFallback } from "./figma/ImageWithFallback"; 
import { SERVICES } from "./../../data/servicesData"; 

// Define type for our service
type ServiceType = typeof SERVICES[0];

export function MenuPage() {
    const { t } = useLanguage();
    
    // State for the product modal
    const [selectedService, setSelectedService] = useState<ServiceType | null>(null);

    // Scroll to the top when the page loads
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // WhatsApp Order Handler
    const handleOrder = (productName: string) => {
        const message = encodeURIComponent(`Hello, I would like to order: ${productName}`);
        window.open(`https://wa.me/15551234567?text=${message}`, "_blank");
    };

    // Simulated large menu
    const LARGE_MENU = [...SERVICES, ...SERVICES, ...SERVICES];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-32 pb-24 relative">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
            
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-gray-200 dark:border-gray-800 pb-8">
            <div>
                <h1 className="text-gray-900 dark:text-white" style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, letterSpacing: "-0.5px" }}>
                {t("menuTitle")}
                </h1>
            </div>
            
            <Link
                to="/"
                className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors group/back font-medium"
            >
                <ArrowLeft size={18} className="group-hover/back:-translate-x-1 rtl:group-hover/back:translate-x-1 rtl:rotate-180 transition-transform duration-200" />
                {t("menuBack")}
            </Link>
            </div>

            {/* Full Menu Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LARGE_MENU.map((item, index) => (
                <div 
                key={index} 
                // Added cursor-pointer and onClick to open modal
                className="bg-white dark:bg-gray-950 rounded-2xl overflow-hidden shadow-sm border border-transparent dark:border-gray-800 flex flex-col hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedService(item)}
                >
                <div className="relative overflow-hidden" style={{ height: "200px" }}>
                    <ImageWithFallback src={item.image} alt={t(item.titleKey)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex flex-col flex-1 p-5">
                    <h3 className="text-gray-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" style={{ fontSize: "17px", fontWeight: 700 }}>
                    {t(item.titleKey)}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4 flex-1 line-clamp-2" style={{ fontSize: "14px", lineHeight: 1.6 }}>
                    {t(item.descKey)}
                    </p>
                    <div className="text-amber-600 dark:text-amber-400" style={{ fontSize: "16px", fontWeight: 700 }}>
                    {t(item.priceKey)}
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* PRODUCT DIALOG (MODAL) */}
        {/* ------------------------------------------------------------------ */}
        {selectedService && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" style={{ backgroundColor: "rgba(0, 0, 0, 0.65)", backdropFilter: "blur(4px)" }}>
            
            <div className="bg-white dark:bg-gray-900 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200 border border-gray-100 dark:border-gray-800" style={{ maxHeight: "90vh" }}>
                
                {/* Close Button */}
                <button 
                onClick={() => setSelectedService(null)} 
                className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-colors backdrop-blur-sm rtl:right-auto rtl:left-4"
                aria-label={t("modalClose")}
                >
                <X size={20} />
                </button>

                {/* Modal Image */}
                <div className="w-full md:w-5/12 h-64 md:h-auto relative">
                <ImageWithFallback src={selectedService.image} alt={t(selectedService.titleKey)} className="w-full h-full object-cover" />
                <span className={`absolute top-4 left-4 ${selectedService.tagColor} text-white rounded-full px-4 py-1.5 shadow-md`} style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.5px" }}>
                    {t(selectedService.tagKey)}
                </span>
                </div>

                {/* Modal Content */}
                <div className="w-full md:w-7/12 p-6 sm:p-8 flex flex-col overflow-y-auto">
                <div className="mb-2">
                    <h3 className="text-gray-900 dark:text-white" style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-0.5px", lineHeight: 1.2 }}>
                    {t(selectedService.titleKey)}
                    </h3>
                    <p className="text-amber-600 dark:text-amber-400 mt-2" style={{ fontSize: "20px", fontWeight: 700 }}>
                    {t(selectedService.priceKey)}
                    </p>
                </div>

                {/* Extra Info */}
                <div className="flex items-center gap-2 mt-4 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 w-fit px-3 py-1.5 rounded-lg border border-gray-100 dark:border-gray-800">
                    <Info size={16} />
                    <span style={{ fontSize: "13px", fontWeight: 500 }}>{t("modalCalories")}: {selectedService.calories}</span>
                </div>

                <div className="h-px w-full bg-gray-100 dark:bg-gray-800 my-6" />

                {/* Detailed Description */}
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
        </div>
    );
}