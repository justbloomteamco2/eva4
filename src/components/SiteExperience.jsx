"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Lenis from "lenis";
import { scrollProgress } from "@/lib/motion/variants";
import { GrainTexture } from "@/components/GrainTexture";
import { SiteServicesProvider } from "@/components/SiteServicesProvider";
export function SiteExperience({ children }) {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const lenis = prefersReducedMotion ? null : new Lenis({ anchors: true, lerp: 0.085, smoothWheel: true });
        const tick = (time) => lenis?.raf(time * 1000);
        const updateProgress = () => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
        };
        if (lenis) {
            gsap.ticker.add(tick);
            gsap.ticker.lagSmoothing(0);
        }
        window.addEventListener("scroll", updateProgress, { passive: true });
        window.addEventListener("resize", updateProgress);
        updateProgress();
        return () => {
            if (lenis) {
                gsap.ticker.remove(tick);
                lenis.destroy();
            }
            window.removeEventListener("scroll", updateProgress);
            window.removeEventListener("resize", updateProgress);
        };
    }, []);
    return (<SiteServicesProvider>
      <motion.div className="scroll-progress" style={{ scaleX: progress, transformOrigin: scrollProgress.origin, backgroundColor: scrollProgress.color }} aria-hidden="true"/>
      <GrainTexture />
      {children}
    </SiteServicesProvider>);
}
