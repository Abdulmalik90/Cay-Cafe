import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    // عند تحميل الصفحة، نتأكد من اختيار المستخدم السابق
    useEffect(() => {
        const isCurrentlyDark = document.documentElement.classList.contains("dark") || 
                                localStorage.getItem("theme") === "dark";
        setIsDark(isCurrentlyDark);
        if (isCurrentlyDark) {
        document.documentElement.classList.add("dark");
        }
    }, []);

    // دالة الإجبار المباشر لتغيير الثيم
    const toggleTheme = () => {
        const root = document.documentElement;
        if (isDark) {
        root.classList.remove("dark");
        localStorage.setItem("theme", "light");
        setIsDark(false);
        } else {
        root.classList.add("dark");
        localStorage.setItem("theme", "dark");
        setIsDark(true);
        }
    };

    return (
        <button
        onClick={toggleTheme}
        className="relative z-50 p-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-all cursor-pointer"
        aria-label="Toggle theme"
        >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
}