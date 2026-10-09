"use client";
import { ServiceCard } from "@/components/ServiceCard";
import { useSiteServices } from "@/components/SiteServicesProvider";
const section = {
    id: "services",
    title: "Prepared for what matters.",
};
export function ServicesSection() {
    const { content } = useSiteServices();
    return (<section id={section.id} className="services-section">
      <div className="services-heading">
        <div>
          <p className="eyebrow"><span /> What we do</p>
          <h2>Prepared for<br />what matters.</h2>
        </div>
        <p className="section-aside">Four essential disciplines.<br />One dependable standard.</p>
      </div>
      <div className="services-rail" aria-label="Core service categories">
        {content.getServices().map((service) => (<ServiceCard service={service} key={service.id}/>))}
      </div>
    </section>);
}
