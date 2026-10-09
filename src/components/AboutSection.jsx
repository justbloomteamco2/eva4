const section = {
    id: "approach",
    title: "Quiet confidence. Every day.",
};
export function AboutSection() {
    return (<section id={section.id} className="approach-section">
      <div className="approach-image">
        <iframe
          className="approach-map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242.89856752114056!2d77.42184411283222!3d13.075271798754839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae251e5042c793%3A0x2c2d93ec9a9e83eb!2sSpartan%20Security%20Solutions!5e0!3m2!1sen!2sin!4v1791473116634!5m2!1sen!2sin"
          title="Spartan Security Solutions location on Google Maps"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
        <div className="approach-map-caption">
          <span>Spartan Security Solutions · Bengaluru</span>
          <a href="https://www.google.com/maps/search/?api=1&query=Spartan+Security+Solutions" target="_blank" rel="noopener noreferrer">
            View on Google Maps <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <div className="approach-copy">
        <p className="eyebrow"><span /> How we work</p>
        <h2 aria-label={section.title}>Quiet confidence.<br /><em>Every day.</em></h2>
        <p className="approach-lead">Trust is earned in the details no one has to ask about.</p>
        <p className="approach-body">Spartan Security Solutions brings together professional security, housekeeping, gardening and skilled manpower—held to one clear promise: professionalism in every detail, and reliability you can count on.</p>
        <div className="approach-values">
          <span>01&nbsp; Vigilance</span>
          <span>02&nbsp; Integrity</span>
          <span>03&nbsp; Dependability</span>
        </div>
      </div>
    </section>);
}
