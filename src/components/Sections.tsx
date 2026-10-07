import Chars from "./Chars";
import CopyEmail from "./CopyEmail";
import Icon from "./Icon";
import WorkList from "./work/WorkList";
import Avatar from "./hero/Avatar";
import { PERSON, PROJECTS } from "@/content/projects";

export function Work() {
  const rows = PROJECTS.map(({ slug, name, descriptor, role, year, accent, cover }) => ({
    slug, name, descriptor, role, year, accent, cover,
  }));
  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <div className="section-head">
        <h2 id="work-title" className="section-title" aria-label="Work" data-motion="drop">
          <Chars text="Work" />
        </h2>
        <p className="section-head__note">
          Nine products, from solo builds to national platforms. Each page says exactly what my part was.
        </p>
      </div>
      <WorkList projects={rows} />
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="section-head">
        <h2 id="about-title" className="section-title" aria-label="About" data-motion="drop">
          <Chars text="About" />
        </h2>
      </div>
      <div className="about__grid">
        <p className="about__lead" data-motion="rise">
          I&rsquo;m a fourth-year AI engineering student at ENSIA, the National Higher School of Artificial Intelligence
          in Algiers, graduating in 2028.
        </p>
        <div className="about__body" data-motion="rise">
          <p>
            I like building the whole thing. A model only matters once someone can reach it, so I work across machine
            learning, optimisation and full-stack engineering, and I care about the interface as much as the model
            behind it.
          </p>
          <p>
            Most of the work above started as a real question: what is this laptop worth, who should I captain this
            week, how do we run this kitchen. A few I built alone, most with a team, and every project page says which.
          </p>
          <p>
            I work in Arabic, French and English, and I like naming things after home: a kanoun is the clay brazier at
            the centre of an Algerian kitchen, <span lang="ar">قيمة</span> (qima) means value, and{" "}
            <span lang="ar">دار</span> (dar) means house.
          </p>
        </div>
        <dl className="facts" data-motion="facts">
          <div>
            <dt>Studying</dt>
            <dd>Master&rsquo;s and engineer&rsquo;s degree in AI, ENSIA, 2028</dd>
          </div>
          <div>
            <dt>Based in</dt>
            <dd>Algiers, Algeria</dd>
          </div>
          <div>
            <dt>Languages</dt>
            <dd>Arabic, French, English</dd>
          </div>
          <div>
            <dt>Machine learning</dt>
            <dd>Python, PyTorch, TensorFlow, scikit-learn, LightGBM, pandas, NumPy</dd>
          </div>
          <div>
            <dt>Products</dt>
            <dd>TypeScript, React, Next.js, Node.js, FastAPI, Flutter</dd>
          </div>
          <div>
            <dt>Data and infrastructure</dt>
            <dd>PostgreSQL, Redis, Supabase, Firebase, Docker, Linux</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <h2 id="contact-title" className="contact__title" aria-label="Say hello." data-motion="drop">
        <Chars text="Say hello." />
      </h2>
      <p className="contact__lede">Internships, collaborations, or a product that needs building. I read everything.</p>
      <CopyEmail email={PERSON.email} />
      <ul className="contact__links">
        <li>
          <a className="arrow-link" href={PERSON.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <Icon name="out" />
          </a>
        </li>
        <li>
          <a className="arrow-link" href={PERSON.github} target="_blank" rel="noreferrer">
            GitHub <Icon name="out" />
          </a>
        </li>
        <li>
          <a className="arrow-link" href={`tel:${PERSON.phone.replace(/\s/g, "")}`}>
            {PERSON.phone}
          </a>
        </li>
        <li>
          <a className="arrow-link" href={PERSON.cv} download>
            Download CV <Icon name="down" />
          </a>
        </li>
      </ul>
      <Avatar trigger="visible" className="avatar--contact" />
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <p>
        Designed and built by Yahia Kerroum in Algiers, 2026. <span lang="ar" dir="rtl">{PERSON.nameAr}</span>
      </p>
      <a className="arrow-link" href="#top">
        Back to top <Icon name="up" />
      </a>
    </footer>
  );
}
