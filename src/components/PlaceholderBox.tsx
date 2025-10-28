export function PlaceholderBox({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return <div className={`placeholder-box ${className}`}>{children}</div>;
}
