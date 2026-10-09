import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
export function ServiceCard({ service, index }) {
    const reduceMotion = useReducedMotion();
    return (<motion.article
      className="service-card"
      initial={reduceMotion ? false : { opacity: 0, y: 42, scale: 0.94, rotateX: -3, rotateZ: index % 2 ? -3 : 3 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      whileHover={reduceMotion ? undefined : { y: -12, rotateZ: index % 2 ? -1.5 : 1.5, scale: 1.035 }}
      whileTap={reduceMotion ? undefined : { y: -3, scale: 0.985 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px 90px 0px" }}
      transition={{ type: "spring", stiffness: 280, damping: 19, mass: 0.55, delay: index * 0.045 }}
      style={{ transformPerspective: 700 }}
    >
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
    </motion.article>);
}
