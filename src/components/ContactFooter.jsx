"use client";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { useSiteServices } from "@/components/SiteServicesProvider";
export function ContactFooter() {
    const { content } = useSiteServices();
    const contact = content.getContact();
    const phone = contact.phone[0];
    const phoneDigits = phone.replace(/\D/g, "");
    return (<footer className="contact-footer" aria-label="Contact Spartan Security Solutions">
      <div className="footer-cta">
        <div>
          <p className="eyebrow"><span /> Begin with a conversation</p>
          <h2>Ready when<br/>you need us.</h2>
          <p className="footer-cta-copy">A steady, dependable partner for the places that matter.</p>
        </div>
        <div className="footer-cta-actions">
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
        </div>
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

        <div className="footer-contact-column">
          <h3>Visit or call</h3>
          <address>{contact.address}</address>
          <div className="footer-contact-links">
            {contact.phone.map((phone) => (
              <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} key={phone}>{phone}</a>
            ))}
            <a href={`https://wa.me/${phoneDigits}?text=${encodeURIComponent("Hello Spartan Security Solutions, I would like to know more about your services.")}`} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a>
          </div>
        </div>

        <div className="footer-contact-column">
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
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Spartan Security Solutions</span>
        <span>Professional&nbsp; / &nbsp;Reliable&nbsp; / &nbsp;Trusted</span>
      </div>
    </footer>);
}
