"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ViewTransition, useMemo, useState, type CSSProperties } from "react";
import type { Project } from "@/content/projects";
import Icon from "../Icon";

const CoverPreview = dynamic(() => import("./CoverPreview"), { ssr: false });

type Row = Pick<Project, "slug" | "name" | "descriptor" | "role" | "year" | "accent" | "cover">;

export default function WorkList({ projects }: { projects: Row[] }) {
  const [active, setActive] = useState<number | null>(null);
  const covers = useMemo(() => projects.map((p) => p.cover), [projects]);

  return (
    <>
      <ol
        className="work-list"
        data-active={active !== null || undefined}
        style={{ "--bloom": active !== null ? projects[active].accent : "transparent" } as CSSProperties}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
        }}
        onPointerLeave={() => setActive(null)}
      >
        {projects.map((p, i) => (
          <li key={p.slug} className="work-row" data-active={active === i || undefined} style={{ "--accent": p.accent } as CSSProperties}>
            <Link
              href={`/work/${p.slug}`}
              className="work-row__link"
              transitionTypes={["to-project"]}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
            >
              <span className="work-row__name">{p.name}</span>
              <span className="work-row__what">{p.descriptor}</span>
              <span className="work-row__meta">
                {p.role}
                <span aria-hidden="true"> · </span>
                {p.year}
              </span>
              <ViewTransition name={`cover-${p.slug}`} share="cover-morph">
                <Image
                  className="work-row__thumb"
                  src={p.cover.src}
                  width={p.cover.w}
                  height={p.cover.h}
                  alt=""
                  sizes="(max-width: 760px) 92vw, 200px"
                />
              </ViewTransition>
              <Icon name="right" className="work-row__go" />
            </Link>
          </li>
        ))}
      </ol>
      <CoverPreview covers={covers} active={active} />
    </>
  );
}
