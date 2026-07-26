import { Reveal } from "./MotionPrimitives";

const coursework = [
  "Machine Learning",
  "Data Mining",
  "Statistics + Probability",
  "Computer Vision",
  "Natural Language Processing",
  "Web Development",
  "Mobile Development",
  "Data Structures + Algorithms",
  "Database Systems",
  "Artificial Intelligence",
  "Object-Oriented Programming",
  "Linux",
];

const languages = [
  ["Arabic", "Native"],
  ["French", "Professional"],
  ["English", "Professional"],
];

export default function Education() {
  return (
    <section className="education" id="education">
      <div className="shell education__grid">
        <Reveal>
          <span className="eyebrow">04 / Education</span>
          <h2 className="section-heading">Foundation.</h2>
        </Reveal>

        <Reveal className="education__content" delay={0.08}>
          <h3 className="education__school">
            National Higher School of Artificial Intelligence
          </h3>

          <div className="education__degree">
            <p>
              Master &amp; Engineer&apos;s degree
              <br />
              Artificial Intelligence
            </p>
            <p>
              Algiers, Algeria
              <br />
              2023 — Expected 2028
            </p>
          </div>

          <div className="coursework" aria-label="Relevant coursework">
            {coursework.map((course) => (
              <span key={course}>{course}</span>
            ))}
          </div>

          <div className="language-index">
            <span className="section-index">Languages</span>
            <div>
              {languages.map(([language, level]) => (
                <p key={language}>
                  <strong>{language}</strong>
                  <span>{level}</span>
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
