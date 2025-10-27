import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useDarkMode } from "../hooks/useDarkMode";

library.add(fas);

export function DarkModeToggle() {
    const [darkMode, setDarkMode] = useDarkMode();

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
                {darkMode ? (
                    <FontAwesomeIcon
                        icon={["fas", "moon"]}
                        size="lg"
                        style={{ color: "white" }}
                    />
                ) : (
                    <FontAwesomeIcon
                        icon={["fas", "sun"]}
                        size="lg"
                        style={{ color: "white" }}
                    />
                )}
            </div>
        </div>
    );
}
