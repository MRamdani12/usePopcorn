type ButtonProps = {
    children: string;
    /** Enter either 'button-primary' or 'button-secondary' @default button-primary **/
    className?: "button-primary" | "button-secondary";
    onClick: () => void;
};

export function Button({
    children,
    className = "button-primary",
    onClick,
}: ButtonProps) {
    return (
        <button onClick={onClick} className={className}>
            {children}
        </button>
    );
}
