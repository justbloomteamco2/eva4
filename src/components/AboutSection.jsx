"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const section = {
  id: "approach",
  title: "Quiet confidence. Every day.",
};
export function AboutSection() {
  const reduceMotion = useReducedMotion();
  return (
    <>
      <section id={section.id} className="approach-section">
        <div className="approach-location">
          <Image
            src="/assets/brand/spartan-seal.png"
            alt=""
            width={180}
            height={180}
          />
          <p className="eyebrow">
            <span /> Based in Bengaluru
          </p>
          <h3>
            Local roots.
            <br />
            <em>Steady presence.</em>
          </h3>
          <p>
            Supporting businesses and communities across Bengaluru with
            dependable on-site teams.
          </p>
          <a href="/contact">
            Contact our team <span aria-hidden="true">↗</span>
          </a>
          <a
            className="approach-location-map-link"
            href="https://www.google.com/maps/search/?api=1&query=Spartan+Security+Solutions"
            target="_blank"
            rel="noopener noreferrer"
          >
            Find us on Google Maps
          </a>
        </div>
        <div className="approach-copy">
          <p className="eyebrow">
            <span /> How we work
          </p>
          <h2 aria-label={section.title}>
            Quiet confidence.
            <br />
            <em>Every day.</em>
          </h2>
          <p className="approach-lead">
            Trust is earned in the details no one has to ask about.
          </p>
          <p className="approach-body">
            Spartan Security Solutions brings together professional security,
            housekeeping, gardening and skilled manpower—guided by
            professionalism in every detail and reliability you can count on.
          </p>
          <div className="approach-values">
            <span>01&nbsp; Vigilance</span>
            <span>02&nbsp; Integrity</span>
            <span>03&nbsp; Dependability</span>
          </div>
        </div>
      </section>
      <section className="founder-story" aria-labelledby="founder-story-title">
        <div className="founder-story-intro">
          <motion.div
            className="founder-story-photo"
            initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(12% 12% 12% 12%)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="founder-story-image">
              <Image
                src="/assets/brand/founder-uma-shankar.webp"
                alt="Founder Uma Shankar speaking about his career and the founding of Spartan Security Solutions"
                fill
                sizes="(max-width: 760px) 100vw, 42vw"
              />
            </div>
            <span>Built on service since 2016</span>
          </motion.div>
          <motion.div
            className="founder-story-copy"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow">
              <span /> Our story
            </p>
            <h2 id="founder-story-title">A standard shaped by service.</h2>
            <p>
              Founded in 2016 by Uma Shankar, a retired Indian Army veteran,
              Spartan began with just one or two guards and a simple belief:
              bring the nation&apos;s discipline, safety and honest care to
              everyday people.
            </p>
            <p>
              We grew through hard work and word of mouth. Today, 100+ clients
              trust Spartan, and our teams can protect large sites with up to
              200 guards at a single location. Our standard starts with treating
              every client and every guard with respect.
            </p>
          </motion.div>
        </div>

        <div className="founder-story-stats" aria-label="Spartan at a glance">
          {[{ value: "2016", label: "Founded by Uma Shankar" }, { value: "100+", label: "Clients who trust our teams" }, { value: "200+", label: "Guards deployable at one location" }].map((stat, index) => (
          <motion.div
            key={stat.value}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
          >
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </motion.div>
          ))}
        </div>

        <div className="founder-story-standards">
          {[
            { label: "01 / Open books", title: "Compliance without compromise.", text: "Licensed in Karnataka under PSARA through November 2027, with transparent operations and required worker protections including PF and ESI." },
            { label: "02 / People first", title: "Respect the people who protect you.", text: "We look after our guards and pay them on time, so they can stay focused, alert and committed to your safety." },
            { label: "03 / Our standard", title: "Your confidence comes first.", text: "If you are unhappy with our service, you are free to cancel. We want to earn your trust, not hold you to it." },
          ].map((standard, index) => (
          <motion.article
            key={standard.label}
            initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={reduceMotion ? undefined : { y: -5, scale: 1.015 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.42, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>{standard.label}</span>
            <h3>{standard.title}</h3>
            <p>{standard.text}</p>
          </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}
