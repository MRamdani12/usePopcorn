type ButtonProps = {
    children: string;
    /** Class name for the button @default button-primary **/
    className?: string;
    onClick?: () => void;
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
