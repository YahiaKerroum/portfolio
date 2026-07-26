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
        <div className="position__intro">
          <div>
            <span className="section-index">01 / Position</span>
          </div>
          <h2 className="position__claim">
            I build systems I can <em>defend.</em>
          </h2>
        </div>

        <div className="position__copy">
          <p>
            I am an AI Engineering student at ENSIA in Algiers, working where
            machine learning meets production software. I care about the
            decisions underneath a feature: what gets measured, what can fail,
            and what makes the system trustworthy.
          </p>
          <p>
            My work spans full-stack platforms, browser-native inference,
            computer vision, mobile applications, and ML pipelines. The common
            thread is evidence—benchmarks, audit trails, explicit architecture,
            and software that survives outside a demo.
          </p>
        </div>

        <div className="proof-strip" aria-label="Selected engineering evidence">
          {proofs.map((proof) => (
            <div className="proof" key={proof.label}>
              <strong>{proof.value}</strong>
              <span>{proof.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
