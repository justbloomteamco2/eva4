import Image from "next/image";

const section = {
  id: "approach",
  title: "Quiet confidence. Every day.",
};
export function AboutSection() {
  return (
    <>
      <section id={section.id} className="approach-section">
        <div className="approach-location">
          <Image
            src="/assets/brand/spartan-seal.png"
            alt=""
            width={180}
            height={180}
          />
          <p className="eyebrow">
            <span /> Based in Bengaluru
          </p>
          <h3>
            Local roots.
            <br />
            <em>Steady presence.</em>
          </h3>
          <p>
            Supporting businesses and communities across Bengaluru with
            dependable on-site teams.
          </p>
          <a href="/contact">
            Contact our team <span aria-hidden="true">↗</span>
          </a>
          <a
            className="approach-location-map-link"
            href="https://www.google.com/maps/search/?api=1&query=Spartan+Security+Solutions"
            target="_blank"
            rel="noopener noreferrer"
          >
            Find us on Google Maps
          </a>
        </div>
        <div className="approach-copy">
          <p className="eyebrow">
            <span /> How we work
          </p>
          <h2 aria-label={section.title}>
            Quiet confidence.
            <br />
            <em>Every day.</em>
          </h2>
          <p className="approach-lead">
            Trust is earned in the details no one has to ask about.
          </p>
          <p className="approach-body">
            Spartan Security Solutions brings together professional security,
            housekeeping, gardening and skilled manpower—guided by
            professionalism in every detail and reliability you can count on.
          </p>
          <div className="approach-values">
            <span>01&nbsp; Vigilance</span>
            <span>02&nbsp; Integrity</span>
            <span>03&nbsp; Dependability</span>
          </div>
        </div>
      </section>
      <section className="founder-story" aria-labelledby="founder-story-title">
        <div className="founder-story-intro">
          <div className="founder-story-photo">
            <Image
              src="/assets/brand/founder-uma-shankar.webp"
              alt="Founder Uma Shankar speaking about his career and the founding of Spartan Security Solutions"
              fill
              sizes="(max-width: 760px) 100vw, 42vw"
            />
            <span>Built on service since 2016</span>
          </div>
          <div className="founder-story-copy">
            <p className="eyebrow">
              <span /> Our story
            </p>
            <h2 id="founder-story-title">A standard shaped by service.</h2>
            <p>
              Founded in 2016 by Uma Shankar, a retired Indian Army veteran,
              Spartan began with just one or two guards and a simple belief:
              bring the nation&apos;s discipline, safety and honest care to
              everyday people.
            </p>
            <p>
              We grew through hard work and word of mouth. Today, 100+ clients
              trust Spartan, and our teams can protect large sites with up to
              200 guards at a single location. Our standard starts with treating
              every client and every guard with respect.
            </p>
          </div>
        </div>

        <div className="founder-story-stats" aria-label="Spartan at a glance">
          <div>
            <strong>2016</strong>
            <span>Founded by Uma Shankar</span>
          </div>
          <div>
            <strong>100+</strong>
            <span>Clients who trust our teams</span>
          </div>
          <div>
            <strong>200+</strong>
            <span>Guards deployable at one location</span>
          </div>
        </div>

        <div className="founder-story-standards">
          <article>
            <span>01 / Open books</span>
            <h3>Compliance without compromise.</h3>
            <p>
              Licensed in Karnataka under PSARA through November 2027, with
              transparent operations and required worker protections including
              PF and ESI.
            </p>
          </article>
          <article>
            <span>02 / People first</span>
            <h3>Respect the people who protect you.</h3>
            <p>
              We look after our guards and pay them on time, so they can stay
              focused, alert and committed to your safety.
            </p>
          </article>
          <article>
            <span>03 / Our standard</span>
            <h3>Your confidence comes first.</h3>
            <p>
              If you are unhappy with our service, you are free to cancel. We
              want to earn your trust, not hold you to it.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
