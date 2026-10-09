import { AboutSection } from "@/components/AboutSection";
import { ContactFooter } from "@/components/ContactFooter";
import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { SiteHeader } from "@/components/SiteHeader";
import { TrustMarquee } from "@/components/TrustMarquee";
export default function HomePage() {
    return (<>
      <SiteHeader />
      <main>
        <Hero />
        <TrustMarquee />
        <ServicesSection />
        <AboutSection />
      </main>
      <ContactFooter />
    </>);
}
