import { ContactFooter } from "@/components/ContactFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ContentService } from "@/services/ContentService";

const contact = new ContentService().getContact();
const phone = contact.phone[0];
const phoneDigits = phone.replace(/\D/g, "");
const mapUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242.89856752114056!2d77.42184411283222!3d13.075271798754839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae251e5042c793%3A0x2c2d93ec9a9e83eb!2sSpartan%20Security%20Solutions!5e0!3m2!1sen!2sin!4v1791473116634!5m2!1sen!2sin";

export const metadata = {
  title: "Contact us | Spartan Security Solutions",
  description:
    "Contact Spartan Security Solutions in Bengaluru by phone, WhatsApp, email, or consultation request.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="section-page contact-page">
        <div className="section-page-intro">
          <a className="section-page-back" href="/">
            <span aria-hidden="true">←</span> Main page
          </a>
          <p className="eyebrow"><span /> Get in touch</p>
          <h1>Start with a<br /><em>conversation.</em></h1>
          <p>Speak directly with our team about the support your site needs.</p>
        </div>
        <section className="contact-page-content" aria-label="Contact details and location">
          <div className="contact-page-card">
            <h2>Spartan Security Solutions</h2>
            <address>{contact.address}</address>
            <a href={`tel:${phone.replace(/[^\d+]/g, "")}`}>Call {phone}<span aria-hidden="true">↗</span></a>
            <a
              href={`https://wa.me/${phoneDigits}?text=${encodeURIComponent("Hello Spartan Security Solutions, I would like to know more about your services.")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Message us on WhatsApp<span aria-hidden="true">↗</span>
            </a>
            {contact.email.map((email) => <a href={`mailto:${email}`} key={email}>{email}<span aria-hidden="true">↗</span></a>)}
            <a className="button button-primary" href="/consultation">
              Request a consultation <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="contact-page-map">
            <iframe
              src={mapUrl}
              title="Spartan Security Solutions location on Google Maps"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            <a
              href="https://www.google.com/maps/search/?api=1&query=Spartan+Security+Solutions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>
      <ContactFooter />
    </>
  );
}
