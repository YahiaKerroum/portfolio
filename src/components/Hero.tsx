import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__grid">
        <div className="hero__copy">
          <div className="hero__masthead">
            <span className="eyebrow">Issue 01 / Portfolio 2026</span>
            <p className="hero__coordinates">
              36.7538° N / 3.0588° E
              <br />
              Algiers, Algeria
            </p>
          </div>

          <div className="hero__title-wrap">
            <h1 className="hero__title">
              <span>Yahia</span>
              <span>Kerroum</span>
            </h1>
            <p className="hero__role">AI Engineer / Systems Builder</p>
          </div>

          <div className="hero__statement">
            <p>
              I turn complex problems into production software—from intelligent
              learning systems to platforms built for Algeria&apos;s AI
              ecosystem.
            </p>
            <a className="arrow-link" href="#projects">
              Examine the systems
            </a>
          </div>
        </div>

        <figure className="hero__portrait">
          <Image
            alt="Portrait of Yahia Kerroum"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 38vw"
            src="/profile.jpg"
          />
          <figcaption className="portrait__label">
            Portrait / Engineer / Algiers
          </figcaption>
          <div className="portrait__evidence">
            <div>
              <strong>72</strong>
              <span>API routes</span>
            </div>
            <div>
              <strong>92.8%</strong>
              <span>CV accuracy</span>
            </div>
            <div>
              <strong>2×</strong>
              <span>Liveness layers</span>
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
