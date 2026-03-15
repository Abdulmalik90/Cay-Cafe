import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../../data/translations";


const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    // make the english is the default
    const [lang, setLang] = useState("en");

    // function for change the language and direction
    const toggleLanguage = () => {
        const newLang = lang === "en" ? "ar" : "en";
        setLang(newLang);
        document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = newLang;
    };

    // t will bring the suit words
    const t = (key) => {
        return translations[lang][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

// tool to use the language for any place
export const useLanguage = () => useContext(LanguageContext);