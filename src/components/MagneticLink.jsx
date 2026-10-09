"use client";
import { useRef } from "react";
import { useSiteServices } from "@/components/SiteServicesProvider";
export function MagneticLink({ children, strength = "subtle", onPointerMove, onPointerLeave, ...props }) {
    const ref = useRef(null);
    const { animation } = useSiteServices();
    const pointerScale = strength === "strong" ? 1.5 : 1;
    const handlePointerMove = (event) => {
        if (ref.current) {
            animation.moveMagneticButton(ref.current, event.nativeEvent, pointerScale);
        }
        onPointerMove?.(event);
    };
    const handlePointerLeave = (event) => {
        if (ref.current) {
            animation.resetMagneticButton(ref.current);
        }
        onPointerLeave?.(event);
    };
    return (<a ref={ref} {...props} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      {children}
    </a>);
}
