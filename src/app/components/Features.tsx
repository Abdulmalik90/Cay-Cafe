import { Award, Leaf, Zap, Heart } from "lucide-react";
import { useLanguage } from "./LanguageContext";

const FEATURES = [
  {
    icon: Award,
    titleKey: "feat1Title",
    descKey: "feat1Desc",
    color: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  },
  {
    icon: Leaf,
    titleKey: "feat2Title",
    descKey: "feat2Desc",
    color: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  },
  {
    icon: Zap,
    titleKey: "feat3Title",
    descKey: "feat3Desc",
    color: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  },
  {
    icon: Heart,
    titleKey: "feat4Title",
    descKey: "feat4Desc",
    color: "bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
  },
];

export function Features() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto overflow-hidden">
        
        {/* Section Header - هذا هو الجزء الذي كان مفقوداً */}
        <div className="text-center mb-16 max-w-[580px] mx-auto px-6">
          <span className="inline-block text-amber-600 dark:text-amber-400 mb-3" style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase" }}>
            {t("featBadge")}
          </span>
          <h2 className="text-gray-900 dark:text-white mb-4" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.5px", lineHeight: 1.15 }}>
            {t("featTitle1")}
            <br />
            {t("featTitle2")}
          </h2>
          <p className="text-gray-500 dark:text-gray-400" style={{ fontSize: "17px", lineHeight: 1.7 }}>
            {t("featSub")}
          </p>
        </div>

        {/* Feature Cards Slider (Mobile) / Grid (Desktop) */}
        <div className="px-6 lg:px-16">
          <div 
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-6 px-6 md:grid md:grid-cols-2 lg:grid-cols-4 md:mx-0 md:px-0 md:pb-0 md:overflow-visible" 
            style={{ scrollbarWidth: "none" }}
          >
            {/* Hide scrollbar in Webkit browsers (Chrome/Safari) */}
            <style>{`
              div::-webkit-scrollbar { display: none; }
            `}</style>

            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.titleKey}
                  className="w-[85vw] sm:w-[320px] md:w-auto shrink-0 snap-center flex flex-col gap-5 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-xl hover:shadow-gray-100/60 dark:hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300 group"
                >
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${feature.color} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon size={26} strokeWidth={1.75} />
                  </div>

                  {/* Title */}
                  <h3 className="text-gray-900 dark:text-white" style={{ fontSize: "18px", fontWeight: 700, lineHeight: 1.3 }}>
                    {t(feature.titleKey)}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 dark:text-gray-400 flex-1" style={{ fontSize: "14px", lineHeight: 1.75 }}>
                    {t(feature.descKey)}
                  </p>

                  {/* Bottom accent line */}
                  <div className="mt-auto h-0.5 w-10 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}