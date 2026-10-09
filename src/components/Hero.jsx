"use client";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { useSiteServices } from "@/components/SiteServicesProvider";
const headline = ["Trusted security.", "A safer tomorrow."];
const section = {
    id: "home",
    title: "Trusted security. A safer tomorrow.",
};
export function Hero() {
    const { content } = useSiteServices();
    const phone = content.getContact().phone[0];
    const phoneDigits = phone.replace(/\D/g, "");
    const reduceMotion = useReducedMotion();
    const videoRef = useRef(null);
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
        const syncPlayback = () => {
            if (motionPreference.matches) {
                video.pause();
                return;
            }
            video.play().catch((error) => console.error("Hero video playback failed:", error));
        };
        syncPlayback();
        motionPreference.addEventListener("change", syncPlayback);
        return () => motionPreference.removeEventListener("change", syncPlayback);
    }, []);
    let staggerIndex = 0;
    return (<section id={section.id} className="hero-section">
      <div className="hero-image-wrap" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero-video"
          loop
          muted
          playsInline
          preload="metadata"
          poster="/assets/hero/security-check-poster.webp"
        >
          <source src="/assets/hero/security-check.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-shade" aria-hidden="true"/>
      <div className="hero-grid" aria-hidden="true"/>
      <div className="hero-motion" aria-hidden="true">
        <span className="hero-particles"/>
        <span className="hero-shooting-star"/>
      </div>
      <div className="hero-content">
        <p className="eyebrow hero-eyebrow"><span /> A Spartan standard</p>
        <h1 className="hero-title" aria-label={section.title}>
          {headline.map((line) => (<span className="headline-line" key={line} aria-hidden="true">
              {line.split(" ").map((word) => (<span className="headline-word" key={word}>
                  {Array.from(word).map((letter, index) => {
                    const delay = 0.12 + staggerIndex * 0.012;
                    staggerIndex += 1;
                    return (<span className="letter-window" key={`${word}-${index}`}>
                        <motion.span className="headline-letter" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : delay, duration: reduceMotion ? 0 : 0.5 }}>
                          {letter}
                        </motion.span>
                      </span>);
                })}
                </span>))}
            </span>))}
        </h1>
        <motion.p className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : 0.55, duration: reduceMotion ? 0 : 0.45 }}>
          Professionalism in every detail. Unshakeable reliability you can count on.
        </motion.p>
        <motion.div className="hero-actions" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : 0.68, duration: reduceMotion ? 0 : 0.42 }}>
          <ButtonLink variant="primary" href={`tel:${phone.replace(/[^\d+]/g, "")}`}>
            Call now <span aria-hidden="true">↗</span>
          </ButtonLink>
          <a className="button hero-whatsapp" href={`https://wa.me/${phoneDigits}?text=${encodeURIComponent("Hello Spartan Security Solutions, I would like to know more about your services.")}`} target="_blank" rel="noopener noreferrer">
            WhatsApp us <span aria-hidden="true">↗</span>
          </a>
          <a className="text-link" href="#approach">Our approach <span aria-hidden="true">↗</span></a>
        </motion.div>
      </div>
      <div className="hero-footer">
        <span>Protection with purpose</span>
        <span>12°58&apos; N&nbsp; / &nbsp;77°35&apos; E</span>
      </div>
      <div className="hero-index" aria-hidden="true">01 — 04</div>
    </section>);
}
