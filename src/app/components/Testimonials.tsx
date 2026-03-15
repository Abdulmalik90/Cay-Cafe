import { Quote, Loader2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback"; 
import { useLanguage } from "./LanguageContext"; 
import { useGoogleReviews } from "./UseGoogleReviews"; 

const STARS = [1, 2, 3, 4, 5];

export function Testimonials() {
  const { t } = useLanguage();
  
  // Fetch live data from Google API Hook
  const { data: googleData, loading } = useGoogleReviews("ChIJN1t_tDeuEmsRUsoyG83frY4");

  // Create an array that contains the original reviews + cloned reviews for mobile animation
  const displayReviews = [
    ...(googleData?.reviews || []).map(r => ({ ...r, isClone: false })),
    ...(googleData?.reviews || []).map(r => ({ ...r, isClone: true }))
  ];

  return (
    <section className="bg-white py-24 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto overflow-hidden">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-[580px] mx-auto px-6">
          <span className="inline-block text-amber-600 mb-3" style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase" }}>
            {t("testBadge")}
          </span>
          <h2 className="text-gray-900 mb-4 dark:text-white" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.5px", lineHeight: 1.15 }}>
            {t("testTitle1")}
            <br />
            {t("testTitle2")}
          </h2>
          <p className="text-gray-500 dark:text-white" style={{ fontSize: "17px", lineHeight: 1.7 }}>
            {t("testSub")}
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-10 h-10 text-amber-600 animate-spin mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Loading reviews from Google...</p>
          </div>
        ) : (
          <div className="px-6 lg:px-16">
            
            {/* Dynamic API Reviews - Slider Container */}
            <div className="slider-container -mx-6 md:mx-0">
              
              {/* Infinite Scroll Track */}
              <div className="mobile-infinite-scroll flex gap-6 px-6 md:px-0 md:grid md:grid-cols-3 md:gap-8">
                
                {displayReviews.map((review, index) => (
                  <div 
                    key={index} 
                    /* If it's a cloned review, we add 'md:hidden' so it disappears on desktop!
                      Card width is 85vw on mobile, auto on desktop.
                    */
                    className={`w-[85vw] sm:w-[350px] md:w-auto shrink-0 relative flex flex-col p-8 rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 hover:shadow-xl hover:shadow-gray-100/60 transition-all duration-300 group ${review.isClone ? 'md:hidden' : ''}`}
                  >
                    
                    {/* Quote icon */}
                    <div className="absolute top-6 right-6 text-amber-100 dark:text-amber-900 group-hover:text-amber-200 transition-colors">
                      <Quote size={40} fill="currentColor" strokeWidth={0} />
                    </div>
                    
                    {/* Dynamic Stars */}
                    <div className="flex gap-1 mb-5" style={{ direction: "ltr" }}>
                      {STARS.map((star) => (
                        <svg key={star} width="18" height="18" viewBox="0 0 24 24" fill={star <= review.rating ? "#F59E0B" : "#E5E7EB"} xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    
                    {/* Dynamic Text */}
                    <p className="text-gray-600 flex-1 mb-6 dark:text-gray-300 relative z-10 line-clamp-4" style={{ fontSize: "15px", lineHeight: 1.8, fontStyle: "italic" }}>
                      "{review.text}"
                    </p>
                    
                    <div className="h-px bg-gray-100 dark:bg-gray-800 mb-6" />
                    
                    {/* Dynamic Author Info */}
                    <div className="flex items-center gap-3">
                      <div className="rounded-full overflow-hidden flex-shrink-0 border-2 border-amber-100 dark:border-amber-900" style={{ width: "44px", height: "44px" }}>
                        <ImageWithFallback src={review.profile_photo_url} alt={review.author_name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-gray-900 dark:text-white" style={{ fontSize: "14px", fontWeight: 700 }}>
                          {review.author_name}
                        </div>
                        <div className="text-amber-600 dark:text-amber-400" style={{ fontSize: "12px", fontWeight: 500 }}>
                          Local Guide
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Bottom social proof - Dynamic API Totals */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-14 pt-12 border-t border-gray-100 dark:border-gray-800">
              <div className="flex -space-x-2">
                {googleData?.reviews.map((r, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-white dark:border-gray-950 overflow-hidden">
                    <ImageWithFallback src={r.profile_photo_url} alt={r.author_name} className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-9 h-9 rounded-full bg-amber-600 border-2 border-white dark:border-gray-950 flex items-center justify-center text-white" style={{ fontSize: "10px", fontWeight: 700 }}>
                  +{googleData?.user_ratings_total}
                </div>
              </div>
              <p className="text-gray-500 text-center dark:text-gray-300" style={{ fontSize: "14px" }}>
                <span className="text-amber-500" style={{ fontWeight: 700 }}>★ {googleData?.rating}</span> {t("testFromOver")} <span className="text-gray-800 dark:text-white" style={{ fontWeight: 700 }}>{googleData?.user_ratings_total}</span> {t("testReviews")}
              </p>
            </div>
            
          </div>
        )}
      </div>
    </section>
  );
}