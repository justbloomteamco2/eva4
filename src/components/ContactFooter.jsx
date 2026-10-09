"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { useSiteServices } from "@/components/SiteServicesProvider";
export function ContactFooter() {
    const reduceMotion = useReducedMotion();
    const [licenseOpen, setLicenseOpen] = useState(false);
    const { content } = useSiteServices();
    const contact = content.getContact();
    const phone = contact.phone[0];
    const phoneDigits = phone.replace(/\D/g, "");
    return (<footer className="contact-footer" aria-label="Contact Spartan Security Solutions">
      <div className="footer-cta">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow"><span /> Begin with a conversation</p>
          <h2>Ready when<br/>you need us.</h2>
          <p className="footer-cta-copy">A steady, dependable partner for the places that matter.</p>
        </motion.div>
        <motion.div
          className="footer-cta-actions"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.42, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          <ButtonLink variant="primary" href="/consultation">
            Request a consultation <span aria-hidden="true">↗</span>
          </ButtonLink>
          <a className="footer-direct-contact" href={`tel:${phone.replace(/[^\d+]/g, "")}`}>
            Call {phone} <span aria-hidden="true">↗</span>
          </a>
          <a className="footer-direct-contact" href={`https://wa.me/${phoneDigits}?text=${encodeURIComponent("Hello Spartan Security Solutions, I would like to know more about your services.")}`} target="_blank" rel="noopener noreferrer">
            WhatsApp us <span aria-hidden="true">↗</span>
          </a>
          <a className="footer-instagram-cta" href="https://www.instagram.com/armsspartan/" target="_blank" rel="noopener noreferrer">
            For more updates, find us on Instagram <span aria-hidden="true">↗</span>
          </a>
        </motion.div>
      </div>

      <div className="footer-wordmark" aria-hidden="true">SPARTAN</div>
      <div className="footer-details">
        <div className="footer-brand">
          <Image src="/assets/brand/spartan-seal.png" alt="" width={64} height={64}/>
          <div>
            <strong>Spartan Security Solutions</strong>
            <span>Trusted Security. A Safer Tomorrow.</span>
          </div>
        </div>

        <div className="footer-contact-column footer-visit">
          <h3>Visit or call</h3>
          <address>{contact.address}</address>
          <div className="footer-contact-links">
            {contact.phone.map((phone) => (
              <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} key={phone}>{phone}</a>
            ))}
            <a href={`https://wa.me/${phoneDigits}?text=${encodeURIComponent("Hello Spartan Security Solutions, I would like to know more about your services.")}`} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a>
          </div>
        </div>

        <div className="footer-contact-column footer-reach">
          <h3>Reach our team</h3>
          <div className="footer-contact-links">
            {contact.email.map((email) => (
              <a href={`mailto:${email}`} key={email}>{email}</a>
            ))}
          </div>
          <a className="footer-instagram-link" href="https://www.instagram.com/armsspartan/" target="_blank" rel="noopener noreferrer">
            Instagram <span aria-hidden="true">↗</span>
          </a>
          <a className="back-to-top" href="/">Back to top ↑</a>
        </div>
      </div>
      <div className="footer-license-drawer">
        <motion.button
          className="footer-license-handle"
          type="button"
          aria-expanded={licenseOpen}
          aria-controls="footer-psara-license"
          onClick={() => setLicenseOpen((open) => !open)}
          drag={reduceMotion ? false : "y"}
          dragConstraints={{ top: -36, bottom: 0 }}
          dragElastic={0.22}
          dragMomentum={false}
          dragSnapToOrigin
          onDragEnd={(_, info) => {
            if (info.offset.y < -24) setLicenseOpen(true);
            if (info.offset.y > 24) setLicenseOpen(false);
          }}
          whileDrag={reduceMotion ? undefined : { scale: 1.02 }}
          transition={{ type: "spring", stiffness: 450, damping: 30, duration: reduceMotion ? 0.01 : undefined }}
        >
          <span className="footer-license-grip" aria-hidden="true" />
          <span>{licenseOpen ? "Tap or drag down to tuck away our PSARA licence" : "Drag up or tap to reveal our PSARA licence"}</span>
          <span className="footer-license-arrow" aria-hidden="true">{licenseOpen ? "↓" : "↑"}</span>
        </motion.button>
        <motion.div
          id="footer-psara-license"
          className="footer-license-panel"
          aria-hidden={!licenseOpen}
          initial={false}
          animate={{
            height: licenseOpen ? "auto" : 0,
            opacity: licenseOpen ? 1 : 0,
            y: licenseOpen ? 0 : 14,
          }}
          transition={{ duration: reduceMotion ? 0.01 : 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="footer-license">
            <p className="footer-license-kicker"><span aria-hidden="true">✦</span> Licensed &amp; accountable</p>
            <h3>Karnataka PSARA licence</h3>
            <Image
              className="footer-license-image"
              src="/assets/compliance/psara-license-redacted.jpg"
              alt="Karnataka Government private security agency licence for Spartan Security Solutions; the serial number, QR code and personal applicant details are hidden."
              width={1200}
              height={1653}
              sizes="(max-width: 600px) 76vw, 38vw"
            />
            <p className="footer-license-validity">Valid through 13 November 2027</p>
            <p className="footer-license-note">Personal verification details hidden for privacy.</p>
          </div>
        </motion.div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Spartan Security Solutions</span>
        <span>Professional&nbsp; / &nbsp;Reliable&nbsp; / &nbsp;Trusted</span>
        <a href="https://justbloom.com.co/" target="_blank" rel="noopener noreferrer">
          Website by Justbloom
        </a>
      </div>
    </footer>);
}
