import Image from "next/image";
import { PortraitMotion } from "./MotionPrimitives";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__grid">
        <div className="hero__copy">
          <div className="hero__masthead">
            <span className="eyebrow">Issue 01 / Portfolio 2026</span>
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
          <PortraitMotion>
            <Image
              alt="Portrait of Yahia Kerroum"
              fill
              priority
              sizes="(max-width: 760px) 296px, 360px"
              src="/profile.jpg"
            />
          </PortraitMotion>
          <figcaption className="portrait__caption">
            Yahia Kerroum / AI Engineer
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
