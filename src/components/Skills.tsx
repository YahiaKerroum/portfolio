const capabilities = [
  {
    index: "A",
    title: "Machine intelligence",
    items: [
      "Computer vision",
      "NLP",
      "Active learning",
      "Face recognition",
      "Heuristic search",
      "Genetic algorithms",
      "Clustering",
      "Regression",
      "TF-IDF",
      "Cross-validation",
    ],
  },
  {
    index: "B",
    title: "Product engineering",
    items: [
      "Full-stack systems",
      "REST API design",
      "Clean architecture",
      "Dynamic permissions",
      "RBAC",
      "Authentication",
      "OAuth",
      "Web scraping",
      "Browser extensions",
    ],
  },
  {
    index: "C",
    title: "Languages + frameworks",
    items: [
      "Python",
      "TypeScript",
      "JavaScript",
      "Dart",
      "SQL",
      "C++",
      "Next.js",
      "React",
      "FastAPI",
      "Flutter",
    ],
  },
  {
    index: "D",
    title: "Data + infrastructure",
    items: [
      "PostgreSQL",
      "Redis",
      "Firebase",
      "Docker",
      "Nginx",
      "WebSockets",
      "FAISS",
      "pgvector",
      "Git",
      "Linux",
    ],
  },
];

export default function Skills() {
  return (
    <section className="capabilities" id="capabilities">
      <div className="shell">
        <header className="capabilities__header">
          <div>
            <span className="eyebrow">03 / Capability index</span>
            <h2 className="section-heading">Built across the stack.</h2>
          </div>
          <p className="capabilities__note">
            Tools are selected after the constraint is clear. These are the
            areas I have used to move systems from idea to deployed software.
          </p>
        </header>

        <div>
          {capabilities.map((capability) => (
            <div className="capability" key={capability.title}>
              <span className="section-index">{capability.index}</span>
              <h3>{capability.title}</h3>
              <div className="capability__items">
                {capability.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
