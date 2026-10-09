import { ContactFooter } from "@/components/ContactFooter";
import { ServicesSection } from "@/components/ServicesSection";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata = {
  title: "Our services | Spartan Security Solutions",
  description:
    "Explore security, housekeeping, gardening and manpower services from Spartan Security Solutions.",
};

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main className="section-page services-page">
        <div className="section-page-intro">
          <a className="section-page-back" href="/">
            <span aria-hidden="true">←</span> Main page
          </a>
          <p className="eyebrow"><span /> Service overview</p>
          <h1>Dependable teams.<br /><em>Thoughtful detail.</em></h1>
          <p>Explore the essential services that help businesses and communities run with confidence.</p>
        </div>
        <ServicesSection />
      </main>
      <ContactFooter />
    </>
  );
}
