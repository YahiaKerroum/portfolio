import { Reveal } from "./MotionPrimitives";

const capabilities = [
  {
    index: "A",
    title: "Machine intelligence",
    items: [
      "Computer vision",
      "NLP",
      "Active learning",
      "Federated learning",
      "Reinforcement learning",
      "Recommendation systems",
      "Face recognition",
      "Heuristic search",
      "Genetic algorithms",
      "Constraint satisfaction",
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
      "Mobile development",
      "Clean architecture",
      "Dynamic permissions",
      "RBAC",
      "Authentication",
      "OAuth",
      "Web scraping",
      "WebSockets",
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
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "TensorFlow",
      "PyTorch",
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
        <Reveal>
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
        </Reveal>

        <div>
          {capabilities.map((capability, index) => (
            <Reveal
              className="capability"
              delay={index * 0.05}
              distance={32}
              key={capability.title}
            >
              <span className="section-index">{capability.index}</span>
              <h3>{capability.title}</h3>
              <div className="capability__items">
                {capability.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
