const coursework = [
  "Machine Learning",
  "Deep Learning",
  "Computer Vision",
  "Natural Language Processing",
  "Data Structures + Algorithms",
  "Operating Systems",
  "Database Systems",
  "Software Engineering",
  "Probability + Statistics",
  "Linear Algebra",
];

export default function Education() {
  return (
    <section className="education" id="education">
      <div className="shell education__grid">
        <div>
          <span className="eyebrow">04 / Education</span>
          <h2 className="section-heading">Foundation.</h2>
        </div>

        <div className="education__content">
          <h3 className="education__school">
            National Higher School of Artificial Intelligence
          </h3>

          <div className="education__degree">
            <p>
              Engineer&apos;s degree
              <br />
              Artificial Intelligence
            </p>
            <p>
              Algiers, Algeria
              <br />
              2023 — Present
            </p>
          </div>

          <div className="coursework" aria-label="Relevant coursework">
            {coursework.map((course) => (
              <span key={course}>{course}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
