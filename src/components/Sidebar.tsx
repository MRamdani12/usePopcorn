import { type ReactNode } from "react";

type SidebarProps = {
    children: ReactNode;
    isSidebarOpen?: boolean;
    sidebarRef?: React.Ref<HTMLDivElement> | null;
};

const open = { transform: "translateX(0%)" };
const close = { transform: "translateX(100%)" };

export function Sidebar({
    children,
    isSidebarOpen = false,
    sidebarRef,
}: SidebarProps) {
    return (
        <div
            ref={sidebarRef}
            style={isSidebarOpen ? open : close}
            className="sidebar watched-list"
        >
            {children}
        </div>
    );
}
