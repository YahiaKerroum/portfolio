import SoftName from "./SoftName";
import Avatar from "./Avatar";
import Icon from "../Icon";
import { PERSON } from "@/content/projects";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <SoftName />
      <p className="hero__hint" aria-hidden="true">
        <svg className="hero__hint-arrow" viewBox="0 0 64 40">
          <path d="M60 34C44 36 22 30 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M6 18l4-9 9 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        that&rsquo;s my name in Arabic.
        <br />
        go on, give it a poke.
      </p>
      <div className="hero__copy">
        <h1 id="hero-title" className="hero__title">
          Hey, I&rsquo;m <span className="nowrap">Yahia Kerroum.</span>
        </h1>
        <p className="hero__lede">
          AI engineering student in Algiers. I build whole products: the model, the system behind it, and the screen
          people actually use.
        </p>
        <div className="hero__links">
          <a className="arrow-link" href="#work">
            See my work <Icon name="right" />
          </a>
          <a className="arrow-link" href="#about">
            More about me <Icon name="right" />
          </a>
          <a className="arrow-link" href={PERSON.cv} download>
            Download CV <Icon name="down" />
          </a>
        </div>
      </div>
      <Avatar />
    </section>
  );
}
