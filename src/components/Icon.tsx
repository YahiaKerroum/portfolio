/* One stroke family for every icon on the site: 1.75px, round caps, 20px box. */
const PATHS = {
  right: "M4 10h12M11 5l5 5-5 5",
  left: "M16 10H4M9 5l-5 5 5 5",
  down: "M10 4v12M5 11l5 5 5-5",
  up: "M10 16V4M5 9l5-5 5 5",
  out: "M7 13l7-7M8 6h6v6",
  copy: "M7 7V4.5A1.5 1.5 0 0 1 8.5 3h7A1.5 1.5 0 0 1 17 4.5v7a1.5 1.5 0 0 1-1.5 1.5H13M4.5 7h7A1.5 1.5 0 0 1 13 8.5v7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 15.5v-7A1.5 1.5 0 0 1 4.5 7z",
  check: "M4 10.5l4 4 8-9",
} as const;

export type IconName = keyof typeof PATHS;

export default function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      className={`icon ${className ?? ""}`}
      data-icon={name}
      viewBox="0 0 20 20"
      width="20"
      height="20"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
