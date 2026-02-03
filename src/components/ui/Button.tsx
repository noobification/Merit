import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', href, children, ...props }, ref) => {

        const baseStyles = "inline-flex items-center justify-center px-8 py-3 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 ease-out disabled:opacity-50 disabled:pointer-events-none";

        const variants = {
            primary: "bg-merit-gold text-merit-white hover:bg-merit-navy hover:text-merit-gold hover:-translate-y-0.5 shadow-sm",
            secondary: "bg-merit-navy text-merit-white hover:bg-merit-gold hover:text-merit-navy hover:-translate-y-0.5",
            outline: "border border-merit-gold text-merit-gold hover:bg-merit-gold hover:text-merit-white",
            ghost: "text-merit-navy hover:text-merit-gold",
        };

        const combinedStyles = cn(baseStyles, variants[variant], className);

        if (href) {
            return (
                <Link href={href} className={combinedStyles}>
                    {children}
                </Link>
            );
        }

        return (
            <button
                ref={ref}
                className={combinedStyles}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";
