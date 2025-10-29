import { useEffect } from "react";

export function useKey(key: string, action: () => void) {
    useEffect(() => {
        function keyboardPress(e: KeyboardEvent) {
            if (e.code.toLowerCase() === key.toLocaleLowerCase()) {
                action();
            }
        }
        document.addEventListener("keypress", keyboardPress);

        return () => {
            document.removeEventListener("keypress", keyboardPress);
        };
    }, [action, key]);
}
