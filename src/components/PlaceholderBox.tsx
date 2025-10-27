export function PlaceholderBox({
    children,
    height,
}: {
    children: React.ReactNode;
    height?: number;
}) {
    return (
        <div style={{ height: `${height}%` }} className="placeholder-box">
            {children}
        </div>
    );
}
