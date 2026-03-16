import { Camera } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "./LanguageContext";

const GALLERY_IMAGES = [
  { id: 1, src: "/images/the building out.jpg" },
  { id: 2, src: "/images/building inside.jpg" },
  { id: 3, src: "/images/ceffee-with-sea.jpg" },
  { id: 4, src: "/images/sea.jpg" },
  { id: 5, src: "/images/the gate.jpg" },
  { id: 6, src: "/images/Corwason.jpg" },
];

export function Gallery() {
  const { t } = useLanguage();
  return (
    <section className="bg-white py-24 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-block text-amber-600 mb-3" style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase" }}>
              {t("galBadge")}
            </span>
            <h2 className="text-gray-900 dark:text-white" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.5px", lineHeight: 1.15 }}>
              {t("galTitle")}
            </h2>
          </div>
          <div className="flex items-center gap-2 text-amber-600 pb-1">
            <Camera size={18} />
            <span style={{ fontSize: "14px", fontWeight: 500 }}>@caycafe.sa</span>
          </div>
        </div>

        <div className="hidden md:grid gap-4" style={{ gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "230px" }}>
          <div className="rounded-2xl overflow-hidden group cursor-pointer" style={{ gridRow: "span 2" }}>
            <div className="relative w-full h-full">
              <ImageWithFallback src={GALLERY_IMAGES[0].src} alt="Gallery image" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
          {GALLERY_IMAGES.slice(1).map((img) => (
            <div key={img.id} className="rounded-2xl overflow-hidden group cursor-pointer">
              <div className="relative w-full h-full">
                <ImageWithFallback src={img.src} alt="Gallery image" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:hidden grid-cols-2 gap-3">
          {GALLERY_IMAGES.map((img) => (
            <div key={img.id} className="rounded-xl overflow-hidden group cursor-pointer" style={{ height: "160px" }}>
              <ImageWithFallback src={img.src} alt="Gallery image" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 dark:text-gray-400 mt-8" style={{ fontSize: "13px" }}>
          {t("galFollow")}
        </p>
      </div>
    </section>
  );
}