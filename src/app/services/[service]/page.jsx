import Image from "next/image";
import { notFound } from "next/navigation";
import { ContactFooter } from "@/components/ContactFooter";
import { ServiceGallery } from "@/components/ServiceGallery";
import { SiteHeader } from "@/components/SiteHeader";
import { getServiceGallery } from "@/lib/service-gallery";
import { ContentService } from "@/services/ContentService";

const services = new ContentService().getServices();

export function generateStaticParams() {
  return services.map(({ id }) => ({ service: id }));
}

export async function generateMetadata({ params }) {
  const { service: serviceId } = await params;
  const service = services.find(({ id }) => id === serviceId);
  return service
    ? {
        title: `${service.title} | Spartan Security Solutions`,
        description: service.description,
      }
    : {};
}

export default async function ServiceDetailPage({ params }) {
  const { service: serviceId } = await params;
  const service = services.find(({ id }) => id === serviceId);
  if (!service) notFound();
  const gallery = getServiceGallery(service);

  return (
    <>
      <SiteHeader />
      <main className="service-detail-page">
        <a className="section-page-back" href="/services">
          <span aria-hidden="true">←</span> All services
        </a>
        <section className="service-detail" aria-labelledby="service-detail-title">
          <div className="service-detail-copy">
            <p className="eyebrow"><span /> Spartan service / {service.number}</p>
            <h1 id="service-detail-title">{service.title}</h1>
            <p className="service-detail-lead">{service.detail}</p>
            <ul>
              {service.highlights.map((highlight) => (
                <li key={highlight}><span aria-hidden="true">↗</span>{highlight}</li>
              ))}
            </ul>
            <div className="service-detail-actions">
              <a className="button button-primary" href="/consultation">
                Request a consultation <span aria-hidden="true">↗</span>
              </a>
              <a className="service-detail-secondary" href="/services">Explore all services</a>
            </div>
          </div>
          <div className="service-detail-image">
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              priority
              sizes="(max-width: 760px) 100vw, 48vw"
              style={{ objectPosition: service.imagePosition }}
            />
            {service.id === "security" && (
              <video
                className="service-detail-video"
                src="/assets/services/security-briefing.mp4"
                poster={service.image}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
              />
            )}
            <span>{service.number} / 04</span>
          </div>
        </section>
        <section className="service-gallery-section" aria-labelledby="service-gallery-title">
          <div className="service-gallery-intro">
            <div>
              <p className="eyebrow"><span /> How we dedicate ourselves</p>
              <h2 id="service-gallery-title">Care you can see.</h2>
            </div>
            <p>{service.commitment}</p>
          </div>
          <ServiceGallery title={service.title} photos={gallery} />
        </section>
      </main>
      <ContactFooter />
    </>
  );
}
