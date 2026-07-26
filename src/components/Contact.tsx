import { Reveal } from "./MotionPrimitives";

const contactLinks = [
  {
    label: "Email",
    value: "yahia.kerroum@ensia.edu.dz",
    href: "mailto:yahia.kerroum@ensia.edu.dz",
  },
  {
    label: "GitHub",
    value: "YahiaKerroum",
    href: "https://github.com/YahiaKerroum",
  },
  {
    label: "LinkedIn",
    value: "Yahia Kerroum",
    href: "https://www.linkedin.com/in/yahia-student-kerroum-a963632b4/",
  },
  {
    label: "Phone",
    value: "+213 797 987 620",
    href: "tel:+213797987620",
  },
];

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="shell">
        <Reveal distance={24}>
          <div className="contact__topline">
            <span className="eyebrow">05 / Contact</span>
            <span className="availability">Available for opportunities</span>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="contact__title">
            Let&apos;s build something useful.
          </h2>
        </Reveal>

        <Reveal className="contact__bottom" delay={0.12} distance={32}>
          <p className="contact__note">
            Open to internships, engineering roles, research collaborations,
            and difficult product problems worth thinking through properly.
          </p>

          <div className="contact__links">
            {contactLinks.map((link) => (
              <a
                className="contact__link"
                href={link.href}
                key={link.label}
                rel={
                  link.href.startsWith("http") ? "noreferrer" : undefined
                }
                target={link.href.startsWith("http") ? "_blank" : undefined}
              >
                <span>{link.label}</span>
                <span>{link.value}</span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
