"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#position", label: "Position", index: "01" },
  { href: "#projects", label: "Systems", index: "02" },
  { href: "#capabilities", label: "Capabilities", index: "03" },
  { href: "#education", label: "Education", index: "04" },
  { href: "#contact", label: "Contact", index: "05" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("position");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = links
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => section !== null);

    const updateActiveSection = () => {
      const pageBottom = window.scrollY + window.innerHeight;
      const documentBottom = document.documentElement.scrollHeight;

      if (pageBottom >= documentBottom - 4) {
        setActiveSection(sections.at(-1)?.id ?? "contact");
        return;
      }

      const readingLine = window.scrollY + window.innerHeight * 0.34;
      let current = sections[0]?.id ?? "position";

      for (const section of sections) {
        if (section.offsetTop <= readingLine) {
          current = section.id;
        }
      }

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("hashchange", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="wordmark" href="#top" onClick={() => setOpen(false)}>
          My Portfolio
        </a>

        <nav
          aria-label="Primary navigation"
          className="site-nav"
          data-open={open}
        >
          {links.map((link) => (
            <a
              key={link.href}
              data-active={activeSection === link.href.slice(1)}
              data-index={link.index}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          className="nav-toggle"
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          <span aria-hidden="true" className="mono">
            {open ? "×" : "≡"}
          </span>
        </button>
      </div>
    </header>
  );
}
