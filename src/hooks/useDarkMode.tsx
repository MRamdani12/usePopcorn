import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

export function useDarkMode(): [boolean, Dispatch<SetStateAction<boolean>>] {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        document.body.classList.toggle("dark", darkMode);
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    return [darkMode, setDarkMode];
}
