import Image from "next/image";
export function ServiceCard({ service }) {
    return (<article className="service-card">
      <div className="service-media">
        <Image className="service-photo" src={service.image} alt={service.imageAlt} fill sizes="(max-width: 600px) 90vw, (max-width: 899px) 44vw, 24vw" style={{ objectPosition: service.imagePosition }}/>
        <div className="service-media-shade" aria-hidden="true"/>
        <span className="service-media-number" aria-hidden="true">{service.number}</span>
        <span className="service-media-label">Spartan standard</span>
      </div>

      <div className="service-card-copy">
        <h3>{service.title}</h3>
        <p className="service-card-description">{service.description}</p>
        <a className="service-card-link" href={`/services/${service.id}`}>
          Explore service <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>);
}
