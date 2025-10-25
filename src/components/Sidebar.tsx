import type { ReactNode } from "react";

export function Sidebar({ children }: { children: ReactNode }) {
    return <div className="sidebar watched-list">{children}</div>;
}
