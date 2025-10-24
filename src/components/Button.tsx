type ButtonProps = {
    /** Enter either 'button-primary' or 'button-secondary' @default button-primary **/
    className?: "button-primary" | "button-secondary";
    children: string;
};

export function Button({
    className = "button-primary",
    children,
}: ButtonProps) {
    return <button className={className}>{children}</button>;
}
