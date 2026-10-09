"use client";
import { useSiteServices } from "@/components/SiteServicesProvider";
export function TrustMarquee() {
    const { content } = useSiteServices();
    const values = content.getBrand().values;
    const text = values.join(" / ");
    return (<section id="brand-values" className="trust-marquee" aria-label={values.join(", ")}>
      <div className="marquee-track" aria-hidden="true">
        {[0, 1].map((copy) => (<span className="marquee-copy" key={copy}>
            {text} <span aria-hidden="true">/</span>{" "}
          </span>))}
      </div>
    </section>);
}
