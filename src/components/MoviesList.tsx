import type { ReactNode } from "react";

export function MoviesList({ children }: { children: ReactNode }) {
    return <div className="movies-list">{children}</div>;
}
