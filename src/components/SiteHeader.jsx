"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSiteServices } from "@/components/SiteServicesProvider";
export function SiteHeader() {
    const { content, animation } = useSiteServices();
    const reduceMotion = useReducedMotion();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    useEffect(() => {
        let frameId = null;
        let lastScrolled = false;
        const handleScroll = () => {
            if (frameId !== null)
                return;
            frameId = window.requestAnimationFrame(() => {
                frameId = null;
                const scrolled = window.scrollY > 18;
                if (scrolled !== lastScrolled) {
                    lastScrolled = scrolled;
                    setIsScrolled(scrolled);
                }
            });
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (frameId !== null)
                window.cancelAnimationFrame(frameId);
        };
    }, []);
    useEffect(() => {
        if (window.innerWidth > 760) {
            setIsMenuOpen(false);
        }
    }, []);
    const handleNavClick = () => setIsMenuOpen(false);
    return (<header className={`site-header ${isScrolled ? "is-scrolled" : ""} ${isMenuOpen ? "is-open" : ""}`}>
      <div className="header-inner">
        <motion.a href="/#home" onClick={handleNavClick} className="brand-lockup" aria-label="Spartan Security Solutions — home" variants={animation.logoMaskReveal} initial={reduceMotion ? "visible" : "hidden"} animate="visible">
          <span className="brand-seal">
            <Image src="/assets/brand/spartan-seal.png" alt="Spartan Security Solutions logo" width={56} height={56} priority/>
          </span>
          <span className="brand-wordmark" aria-label="Spartan Security Solutions">
            <span>Spartan</span>
            <small>Security Solutions</small>
          </span>
        </motion.a>

        <div className="header-actions">
          <nav className={`main-nav ${isMenuOpen ? "is-open" : ""}`} aria-label="Main navigation">
            {content.getNavigation().map((item) => (<a key={item.href} href={item.href} onClick={handleNavClick}>
                {item.label}
              </a>))}
            <a className="nav-cta" href="/consultation" onClick={handleNavClick}>
              Get free consultation <span aria-hidden="true">↓</span>
            </a>
          </nav>

          <button type="button" className="nav-toggle" aria-label={isMenuOpen ? "Close navigation" : "Open navigation"} aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((open) => !open)}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>);
}
