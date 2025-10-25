import type { ReactNode } from "react";

type SidebarProps = {
    children: ReactNode;
    isSidebarOpen?: boolean;
};

const open = { transform: "translateX(0%)" };
const close = { transform: "translateX(100%)" };

export function Sidebar({ children, isSidebarOpen = false }: SidebarProps) {
    return (
        <div
            style={isSidebarOpen ? open : close}
            className="sidebar watched-list"
        >
            {children}
        </div>
    );
}
