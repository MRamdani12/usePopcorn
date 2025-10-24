import type { ReactNode } from "react";

export function Main({ children }: { children: ReactNode }) {
    return <div className="container main-container">{children}</div>;
}
