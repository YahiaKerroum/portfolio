import Link from "next/link";
import { NAME, strokePath } from "./hero/name";
import { PERSON } from "@/content/projects";
import Icon from "./Icon";

/** The mark is the first letter of the name, ي, from the same traced strokes. */
function Mark() {
  const stroke = NAME.strokes[0];
  const dots = NAME.dots.slice(0, 2);
  const xs = [...stroke.map((p) => p[0]), ...dots.map((d) => d[0])];
  const ys = [...stroke.map((p) => -p[1]), ...dots.map((d) => -d[1])];
  const pad = 0.04;
  const x0 = Math.min(...xs) - pad;
  const y0 = Math.min(...ys) - pad;
  const w = Math.max(...xs) - x0 + pad;
  const h = Math.max(...ys) - y0 + pad;
  return (
    <svg className="mark__glyph" viewBox={`${x0} ${y0} ${w} ${h}`} aria-hidden="true">
      <path d={strokePath(stroke)} fill="none" stroke="currentColor" strokeWidth={0.034} strokeLinecap="round" strokeLinejoin="round" />
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={-y} r={0.024} fill="currentColor" />
      ))}
    </svg>
  );
}

export default function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="mark" aria-label="Yahia Kerroum, home">
        <Mark />
        <span className="mark__name">Yahia Kerroum</span>
      </Link>
      <nav className="site-nav" aria-label="Main">
        <Link href="/#work">Work</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact">Contact</Link>
        <a className="site-nav__cv" href={PERSON.cv} download>
          CV <Icon name="down" />
        </a>
      </nav>
    </header>
  );
}
