import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import PageMotion from "@/components/PageMotion";
import { Footer } from "@/components/Sections";
import { PROJECTS, getProject } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getProject(slug);
  if (!data) return {};
  const { project } = data;
  return {
    title: `${project.name}: ${project.descriptor} · Yahia Kerroum`,
    description: project.summary[0],
    openGraph: { images: [{ url: project.cover.src, width: project.cover.w, height: project.cover.h }] },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const data = getProject(slug);
  if (!data) notFound();
  const { project: p, next } = data;

  return (
    <>
      <Header />
      <ViewTransition enter={{ "to-project": "page-in", default: "none" }} exit={{ "to-project": "page-out", default: "none" }} default="none">
        <main id="top" className="project" style={{ "--accent": p.accent } as CSSProperties}>
          <Link href="/#work" className="back-link" transitionTypes={["to-home"]}>
            <Icon name="left" /> All work
          </Link>

          <header className="project__head">
            <h1 className="project__title">{p.name}</h1>
            <p className="project__what">{p.descriptor}</p>
          </header>

          <ViewTransition name={`cover-${p.slug}`} share="cover-morph">
            <Image
              className="project__cover"
              src={p.cover.src}
              width={p.cover.w}
              height={p.cover.h}
              alt={`${p.name}: ${p.tagline}`}
              sizes="(max-width: 1400px) 94vw, 1320px"
              priority
            />
          </ViewTransition>

          <div className="project__body">
            <div className="project__text" data-motion="rise">
              <p className="project__tagline">{p.tagline}</p>
              {p.summary.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
              {p.myPart && (
                <>
                  <h2 className="project__sub">My part</h2>
                  <ul className="project__part">
                    {p.myPart.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
              {p.note && <p className="project__note">{p.note}</p>}
            </div>

            <dl className="facts project__facts" data-motion="facts">
              <div>
                <dt>Role</dt>
                <dd>{p.role}</dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd>{p.year}</dd>
              </div>
              <div>
                <dt>Platform</dt>
                <dd>{p.platform}</dd>
              </div>
              <div>
                <dt>Built with</dt>
                <dd>{p.stack.join(", ")}</dd>
              </div>
              {p.links.length > 0 && (
                <div>
                  <dt>Links</dt>
                  <dd className="project__links">
                    {p.links.map((l) => (
                      <a key={l.href} className="arrow-link" href={l.href} target="_blank" rel="noreferrer">
                        {l.label} <Icon name="out" />
                      </a>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {p.shots.length > 0 && (
            <section className="gallery" aria-label={`${p.name} screens`}>
              {p.shots.map((s) => (
                <figure key={s.src} className={`shot${s.h > s.w ? " shot--tall" : ""}`}>
                  <div className="shot__frame" data-motion="shot">
                    <Image src={s.src} width={s.w} height={s.h} alt={s.caption || `${p.name} screen`} sizes="(max-width: 1400px) 94vw, 1320px" />
                  </div>
                  {s.caption && <figcaption>{s.caption}</figcaption>}
                </figure>
              ))}
            </section>
          )}

          <nav className="next-project" aria-label="Next project" style={{ "--accent": next.accent } as CSSProperties}>
            <Link href={`/work/${next.slug}`} className="next-project__link" transitionTypes={["to-project"]}>
              <span className="next-project__name">
                <span className="next-project__next">Next:</span> {next.name} <Icon name="right" />
              </span>
              <span className="next-project__what">{next.descriptor}</span>
              <ViewTransition name={`cover-${next.slug}`} share="cover-morph">
                <Image className="next-project__thumb" src={next.cover.src} width={next.cover.w} height={next.cover.h} alt="" sizes="320px" />
              </ViewTransition>
            </Link>
          </nav>
        </main>
      </ViewTransition>
      <Footer />
      <PageMotion />
    </>
  );
}
