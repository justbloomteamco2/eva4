import { ConsultationForm } from "@/components/ConsultationForm";
import { SiteHeader } from "@/components/SiteHeader";
import { ContentService } from "@/services/ContentService";
const phone = new ContentService().getContact().phone[0];
const phoneDigits = phone.replace(/\D/g, "");
export const metadata = {
    title: "Request a consultation | Spartan Security Solutions",
    description: "Tell Spartan Security Solutions about your security, housekeeping, gardening or manpower needs.",
};
export default function ConsultationPage() {
    return (<>
      <SiteHeader />
      <main className="consultation-page">
        <section className="consultation-hero" aria-labelledby="consultation-title">
          <div className="consultation-intro">
            <a className="consultation-back" href="/"><span aria-hidden="true">←</span> Back to the main page</a>
            <p className="eyebrow"><span/> A better standard starts here</p>
            <h1 id="consultation-title">Let&apos;s make your site <em>steadier.</em></h1>
            <p>Tell us a little about what you need. A Spartan team member will be in touch to understand your site and recommend the right support.</p>
            <ul className="consultation-points">
              <li><span aria-hidden="true">01</span> A direct conversation with our team</li>
              <li><span aria-hidden="true">02</span> A plan tailored to your site</li>
              <li><span aria-hidden="true">03</span> No obligation to proceed</li>
            </ul>
            <div className="consultation-direct-contact">
              <a href={`tel:${phone.replace(/[^\d+]/g, "")}`}>Call {phone}</a>
              <a href={`https://wa.me/${phoneDigits}?text=${encodeURIComponent("Hello Spartan Security Solutions, I would like to know more about your services.")}`} target="_blank" rel="noopener noreferrer">WhatsApp our team <span aria-hidden="true">↗</span></a>
            </div>
            <a className="consultation-instagram" href="https://www.instagram.com/armsspartan/" target="_blank" rel="noopener noreferrer">
              For more updates, find us on Instagram <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="consultation-card">
            <ConsultationForm />
          </div>
        </section>
      </main>
      <footer className="consultation-page-footer">
        <span>© {new Date().getFullYear()} Spartan Security Solutions</span>
        <a href="/contact">Business contact details <span aria-hidden="true">↗</span></a>
      </footer>
    </>);
}
