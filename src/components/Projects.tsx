import { Reveal, RevealArticle } from "./MotionPrimitives";

interface FeaturedProject {
  number: string;
  title: string;
  subtitle: string;
  role: string;
  statement: string;
  description: string;
  stack: string;
  nodes: string[];
  evidence: Array<{ value: string; label: string }>;
  source: string;
  live?: string;
}

const featured: FeaturedProject[] = [
  {
    number: "SYS–001",
    title: "DzairAI",
    subtitle: "Algerian AI Ecosystem Platform",
    role: "Major contributor / 2025–2026",
    statement:
      "One discovery surface for Algeria’s fragmented AI ecosystem.",
    description:
      "Automated Python scrapers ingest Algerian GitHub repositories, academic papers, and AI news into PostgreSQL. I also contributed to multilingual CV parsing and job-matching pipelines, while the platform adds unified search, authenticated profiles, bookmarks, collaboration requests, and dataset previews.",
    stack: "Next.js / TypeScript / PostgreSQL / Prisma / Docker",
    nodes: ["Repositories + papers", "Python scrapers", "PostgreSQL", "Discovery"],
    evidence: [
      { value: "72", label: "API routes" },
      { value: "419", label: "Source files" },
      { value: "6", label: "Discovery domains" },
    ],
    source: "https://dzair.ai/",
  },
  {
    number: "SYS–002",
    title: "Adaptive Quiz",
    subtitle: "ML-powered assessment system",
    role: "Lead / 2025–2026",
    statement:
      "Classify a student’s level accurately with fewer questions.",
    description:
      "A Python ML pipeline classifies student knowledge using as few questions as possible across multiple CS modules. Uncertainty Sampling, Entropy Reduction, and Query-by-Committee were benchmarked against a random baseline and validated with real ENSIA student data.",
    stack: "FastAPI / Next.js / PostgreSQL / Scikit-learn / Docker",
    nodes: ["Question bank", "Difficulty balance", "Active selector", "Classifier"],
    evidence: [
      { value: "3", label: "Active strategies" },
      { value: "Multi", label: "CS modules" },
      { value: "ENSIA", label: "Real-data validation" },
    ],
    source: "https://github.com/YahiaKerroum/QuizPlatform",
  },
  {
    number: "SYS–003",
    title: "FaceAttend",
    subtitle: "Secure face-recognition attendance",
    role: "Major contributor / 2026",
    statement:
      "Two independent liveness layers make spoofing materially harder.",
    description:
      "Browser-side MediaPipe and a server-side MobileNetV2 model provide two-tier anti-spoofing. ArcFace embeddings and FAISS verify identity, Redis cooldowns prevent double-marking, and WebSocket updates, immutable audit logs, and student disputes complete the attendance workflow.",
    stack: "FastAPI / React / MediaPipe / ArcFace / FAISS / PyTorch",
    nodes: ["Camera", "FaceMesh", "MobileNetV2", "ArcFace + FAISS"],
    evidence: [
      { value: "2×", label: "Liveness layers" },
      { value: "512D", label: "Face embeddings" },
      { value: "100%", label: "Attempts audited" },
    ],
    source: "https://github.com/chouy15/Facial-Recognition-system",
  },
  {
    number: "SYS–004",
    title: "DCMS",
    subtitle: "Dental clinic management system",
    role: "Lead / 2025",
    statement:
      "Operational control without redeploying when staff access changes.",
    description:
      "Managers modify granular resource.action permissions at runtime. The platform coordinates a 1–32 dental orthogram, multi-session treatments, conflict-aware appointments, Drive-backed documents, payments and expense approvals, role-personalized analytics, and regulatory CSV exports.",
    stack: "React / TypeScript / Node.js / PostgreSQL / Chart.js / Docker",
    nodes: ["Staff role", "Permission engine", "Clinic workflow", "Analytics"],
    evidence: [
      { value: "50+", label: "Permissions" },
      { value: "18+", label: "Report types" },
      { value: "5", label: "Core domains" },
    ],
    source: "https://github.com/YahiaKerroum/Dentist-Management-System",
  },
];

const archive = [
  {
    number: "05",
    title: "AI Job Matching",
    subtitle: "Recommendation engine",
    evidence: "92% A* accuracy / <5ms",
    href: "https://github.com/HassaneAitAhmed/Job-Matching-AI-Platform",
  },
  {
    number: "06",
    title: "Sentinel",
    subtitle: "Browser-native phishing detection",
    evidence: "Offline MiniLM / private by design",
    href: "https://github.com/YahiaKerroum",
  },
  {
    number: "07",
    title: "Findar",
    subtitle: "Algerian real-estate mobile app",
    evidence: "Flutter / Firebase / realtime",
    href: "https://fin-dar-website.vercel.app/",
  },
  {
    number: "08",
    title: "Laptop Price",
    subtitle: "Market analysis + ML pipeline",
    evidence: "Regression / clustering / rules",
    href: "https://dzlaptopprice.vercel.app/",
  },
];

function SystemMap({ project }: { project: FeaturedProject }) {
  return (
    <div className="system-map" aria-label={`${project.title} system flow`}>
      <div className="system-map__header">
        <span>Architecture / simplified</span>
        <span>{project.number}</span>
      </div>
      <div className="system-map__flow">
        {project.nodes.map((node, index) => (
          <div key={node} style={{ display: "contents" }}>
            <span className="system-map__node">{node}</span>
            {index < project.nodes.length - 1 ? (
              <span aria-hidden="true" className="system-map__arrow">
                →
              </span>
            ) : null}
          </div>
        ))}
      </div>
      <div className="evidence-row">
        {project.evidence.map((item) => (
          <div className="evidence" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="shell">
        <Reveal>
          <header className="projects__header">
            <div>
              <span className="eyebrow">02 / Selected systems</span>
              <h2 className="section-heading">Evidence, not adjectives.</h2>
            </div>
            <p className="projects__intro">
              Four systems, each presented through the engineering decision
              that defines it.{" "}
              <b>Architecture, constraints, and measured outcomes</b> take
              priority over technology badges.
            </p>
          </header>
        </Reveal>

        {featured.map((project, index) => (
          <RevealArticle
            className="case-study"
            delay={index * 0.025}
            key={project.title}
          >
            <div className="case-study__topline">
              <span className="case-study__number">{project.number}</span>
              <div>
                <h3 className="case-study__title">{project.title}</h3>
                <p className="mono mt-4 text-[0.68rem] uppercase text-[#aaa99f]">
                  {project.subtitle}
                </p>
              </div>
              <p className="case-study__role">{project.role}</p>
            </div>

            <div className="case-study__body">
              <div className="case-study__copy">
                <div>
                  <p className="case-study__statement">{project.statement}</p>
                  <p className="case-study__description">
                    {project.description}
                  </p>
                </div>

                <div>
                  <dl className="case-study__meta">
                    <div>
                      <dt>System</dt>
                      <dd>{project.subtitle}</dd>
                    </div>
                    <div>
                      <dt>Stack</dt>
                      <dd>{project.stack}</dd>
                    </div>
                  </dl>

                  <div className="case-study__links">
                    <a
                      className="arrow-link"
                      href={project.source}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Examine project
                    </a>
                    {project.live ? (
                      <a
                        className="arrow-link"
                        href={project.live}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Live system
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>

              <SystemMap project={project} />
            </div>
          </RevealArticle>
        ))}

        <Reveal className="archive">
          <div className="archive__head">
            <h3>Project archive</h3>
            <span className="section-index">04 additional systems</span>
          </div>
          <div>
            {archive.map((project) => (
              <a
                className="archive__row"
                href={project.href}
                key={project.title}
                rel="noreferrer"
                target="_blank"
              >
                <span>{project.number}</span>
                <strong>{project.title}</strong>
                <em>{project.subtitle}</em>
                <span>{project.evidence}</span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
