import type { ReactNode } from "react";

export function Nav({ children }: { children: ReactNode }) {
    return (
        <nav>
            <div className="container">
                <div className="nav-wrapper">{children}</div>
            </div>
        </nav>
    );
}
