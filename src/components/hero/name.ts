import raw from "@/content/name-strokes.json";

/** يحيى traced from Readex Pro: stroke centrelines and dot centres, in a box
 *  one unit wide, centred on the origin, y pointing up. */
export const NAME = raw as unknown as {
  word: string;
  aspect: number;
  strokes: [number, number][][];
  dots: [number, number, number][];
};

/** Tube radius and dot radius, as a fraction of the word's width. */
export const TUBE_R = 0.026;
export const DOT_R = 0.034;
/** Breathing room around the word in the poster's viewBox. */
export const PAD = 0.07;

export const GLAZE = {
  coral: "#ff6b4a",
  saffron: "#ffb938",
  blue: "#3d6bff",
  mint: "#2fcf9d",
  lilac: "#a38cff",
  pink: "#ff8cb5",
} as const;

/** Strokes are ordered right to left, the way the word is written. */
export const STROKE_GLAZE: [string, string][] = [
  [GLAZE.coral, GLAZE.saffron],
  [GLAZE.blue, GLAZE.lilac],
  [GLAZE.mint, GLAZE.blue],
  [GLAZE.saffron, GLAZE.coral],
  [GLAZE.lilac, GLAZE.pink],
];
export const DOT_GLAZE = [GLAZE.saffron, GLAZE.coral, GLAZE.mint, GLAZE.blue];

export const VIEWBOX = {
  x: -0.5 - PAD,
  y: -NAME.aspect / 2 - PAD,
  w: 1 + 2 * PAD,
  h: NAME.aspect + 2 * PAD,
};

export function strokePath(points: [number, number][]) {
  return points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(4)} ${(-y).toFixed(4)}`).join("");
}
