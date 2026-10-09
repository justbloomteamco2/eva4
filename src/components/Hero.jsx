"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui/ButtonLink";
const headline = ["Trusted security.", "A safer tomorrow."];
const section = {
    id: "home",
    title: "Trusted security. A safer tomorrow.",
};
export function Hero() {
    const reduceMotion = useReducedMotion();
    let staggerIndex = 0;
    return (<section id={section.id} className="hero-section">
      <div className="hero-image-wrap" aria-hidden="true">
        <div className="hero-image-art"/>
        <Image
          className="hero-watermark"
          src="/assets/brand/spartan-seal.png"
          alt=""
          width={520}
          height={520}
          priority
        />
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
                    const delay = 0.2 + staggerIndex * 0.025;
                    staggerIndex += 1;
                    return (<span className="letter-window" key={`${word}-${index}`}>
                        <motion.span className="headline-letter" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : delay, duration: reduceMotion ? 0 : 0.85 }}>
                          {letter}
                        </motion.span>
                      </span>);
                })}
                </span>))}
            </span>))}
        </h1>
        <motion.p className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : 1.4, duration: reduceMotion ? 0 : 0.7 }}>
          Professionalism in every detail. Unshakeable reliability in every promise.
        </motion.p>
        <motion.div className="hero-actions" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : 1.55, duration: reduceMotion ? 0 : 0.65 }}>
          <ButtonLink variant="primary" href="/consultation">
            Get free consultation <span aria-hidden="true">↓</span>
          </ButtonLink>
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
