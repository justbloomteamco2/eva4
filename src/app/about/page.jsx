import { AboutSection } from "@/components/AboutSection";
import { ContactFooter } from "@/components/ContactFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata = {
  title: "About us | Spartan Security Solutions",
  description:
    "Learn about Spartan Security Solutions, founded in 2016 by retired Indian Army veteran Uma Shankar.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="about-page">
        <div className="section-page-intro">
          <p className="eyebrow"><span /> About Spartan</p>
          <h1>Service, shaped<br /><em>by experience.</em></h1>
          <p>Meet the people-first approach and Army-veteran leadership behind Spartan Security Solutions.</p>
        </div>
        <AboutSection />
      </main>
      <ContactFooter />
    </>
  );
}
