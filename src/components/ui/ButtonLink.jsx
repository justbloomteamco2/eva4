"use client";
import { MagneticLink } from "@/components/MagneticLink";
const variantClass = {
    primary: "button-primary",
    outline: "button-outline",
    ghost: "button-ghost",
};
export function ButtonLink({ children, variant, className = "", ...props }) {
    return (<MagneticLink {...props} className={`button ${variantClass[variant]} ${className}`.trim()}>
      {children}
    </MagneticLink>);
}
