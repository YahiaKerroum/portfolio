"use client";

import dynamic from "next/dynamic";
import { useCallback, useState, type CSSProperties } from "react";
import { DOT_GLAZE, DOT_R, NAME, STROKE_GLAZE, TUBE_R, VIEWBOX, strokePath } from "./name";

const SoftNameCanvas = dynamic(() => import("./SoftNameCanvas"), { ssr: false });

/** The name as a flat poster. While the 3D word gets ready it is an ink line
 *  that writes itself, stroke by stroke in writing order, with its dots hopping
 *  in place; the glossy tubes then pipe in over the same strokes. If WebGL never
 *  wakes up, the glazed version stays. The 3D word measures this element to sit
 *  exactly on it. */
function Poster({ id }: { id: string }) {
  const sw = TUBE_R * 2;
  return (
    <svg
      id={id}
      className="soft-name__poster"
      viewBox={`${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.w} ${VIEWBOX.h}`}
      role="img"
      aria-label="يحيى, Yahia written in Arabic"
    >
      <defs>
        {NAME.strokes.map((pts, i) => {
          const [a, b] = STROKE_GLAZE[i % STROKE_GLAZE.length];
          const s = pts[0];
          const e = pts[pts.length - 1];
          return (
            <linearGradient key={i} id={`glaze-${i}`} gradientUnits="userSpaceOnUse" x1={s[0]} y1={-s[1]} x2={e[0]} y2={-e[1]}>
              <stop offset="0" stopColor={a} />
              <stop offset="1" stopColor={b} />
            </linearGradient>
          );
        })}
      </defs>
      <g className="soft-name__glaze">
        {NAME.strokes.map((pts, i) => (
          <path
            key={i}
            d={strokePath(pts)}
            fill="none"
            stroke={`url(#glaze-${i})`}
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        {NAME.dots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={-y} r={DOT_R} fill={DOT_GLAZE[i % DOT_GLAZE.length]} />
        ))}
      </g>
      <g className="soft-name__sketch">
        {NAME.strokes.map((pts, i) => (
          <path key={i} d={strokePath(pts)} pathLength={1} style={{ "--i": i } as CSSProperties} />
        ))}
        {NAME.dots.map(([x, y], i) => (
          <g key={i} className="soft-name__dot" style={{ "--i": i } as CSSProperties}>
            <circle cx={x} cy={-y} r={DOT_R * 0.62} fill={DOT_GLAZE[i % DOT_GLAZE.length]} />
          </g>
        ))}
      </g>
    </svg>
  );
}

export default function SoftName() {
  const [state, setState] = useState<"writing" | "live" | "flat">("writing");
  const onReady = useCallback(() => setState("live"), []);
  const onFail = useCallback(() => setState("flat"), []);
  return (
    <div className="soft-name" data-state={state}>
      <Poster id="soft-name-anchor" />
      <SoftNameCanvas anchorId="soft-name-anchor" onReady={onReady} onFail={onFail} />
    </div>
  );
}
