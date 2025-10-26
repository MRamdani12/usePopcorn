import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

library.add(fas);

export function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        document.body.classList.toggle("dark", darkMode);
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    return (
        <div className="dark-mode">
            <div className="switch">
                <span
                    onClick={() => setDarkMode(false)}
                    role="button"
                    className={`light ${darkMode ? "" : "active"}`}
                >
                    <FontAwesomeIcon
                        icon={["fas", "sun"]}
                        size="lg"
                        style={{ color: "white" }}
                    />
                </span>
                <span
                    onClick={() => setDarkMode(true)}
                    role="button"
                    className={`dark ${darkMode ? "active" : ""}`}
                >
                    <FontAwesomeIcon icon={["fas", "moon"]} size="lg" />
                </span>
            </div>
            <div className="active-mode">
                <FontAwesomeIcon
                    icon={["fas", "sun"]}
                    size="lg"
                    style={{ color: "white" }}
                />
            </div>
        </div>
    );
}
