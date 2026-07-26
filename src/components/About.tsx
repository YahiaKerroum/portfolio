import { Reveal } from "./MotionPrimitives";

const proofs = [
  { value: "8+", label: "Systems delivered" },
  { value: "419", label: "Files in largest platform" },
  { value: "50+", label: "Runtime permissions" },
  { value: "<5ms", label: "Matching latency" },
];

export default function About() {
  return (
    <section className="position" id="position">
      <div className="shell">
        <Reveal>
          <div className="position__intro">
            <div>
              <span className="section-index">01 / Position</span>
            </div>
            <h2 className="position__claim">
              I build systems I can <em>defend.</em>
            </h2>
          </div>
        </Reveal>

        <Reveal className="position__copy" delay={0.08}>
          <p>
            I am a fourth-year AI engineering student at ENSIA in Algiers,
            working where machine learning meets production software. I care
            about the decisions underneath a feature: what gets measured, what
            can fail, and what makes the system trustworthy.
          </p>
          <p>
            My work spans full-stack AI systems, web platforms, mobile
            applications, and ML pipelines across computer vision,
            recommendation systems, adaptive learning, and ecosystem tooling.
            The common thread is deployable software that survives outside a
            demo.
          </p>
        </Reveal>

        <Reveal
          className="proof-strip"
          delay={0.12}
          distance={32}
        >
          {proofs.map((proof) => (
            <div className="proof" key={proof.label}>
              <strong>{proof.value}</strong>
              <span>{proof.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
