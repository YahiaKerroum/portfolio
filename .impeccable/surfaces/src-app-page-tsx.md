---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/work/[slug]/page.tsx"]
---

# Surface brief: home + project pages (prototype)

Scope: `/` (hero with soft name + avatar, work list, about, contact) and `/work/[slug]` (project page). Visitor mode: Experience; the work is reachable from the first viewport.

Audience: recruiters, product teams, clients, research committees; skimmers who open one or two projects. Job: meet Yahia as a person, see plainly what each product is, leave with the CV or a way to write.

Constraints: no metric/stat-led copy; credit exactly (solo / main / co-lead / contributor); nine projects; quiet Algerian signature; no dark+neon AI look. History: the philatelic direction (stamps) was built to asset stage and rejected because metaphor-wrapped projects were unreadable for recruiters. The user then supplied references (itssharl.ee favourite; david-hckh.com, robbowen.digital, patrickheng.com, vanholtz.co, tamalsen.dev, lynnandtonic.com, joshwcomeau.com) and pinned "Soft letters" plus a stylised avatar. Code-led on the user's words; no comp.

## Direction contract

THESIS: Personality lives in things you can touch; the work is shown plainly. The hero is Yahia's Arabic name, يحيى, as squishy glossy 3D tubes you can push, grab and fling, and a stylised clay Yahia who watches your cursor. Refuses the dev-portfolio skeleton (typed role, skills grid, card wall), neon-on-dark, and any metaphor wrapped around the projects.

OWN-WORLD: Cool chalk paper with film grain; glossy glazed tubes in a warm-to-cool glaze set (coral, saffron, Mediterranean blue, mint); soft real-time shadows on the page; Unbounded wide display, Hanken Grotesk text, Readex Pro for Arabic; deep blue-black ink; pill-free, rule-based lists; project colour appears only when a project is hovered or open.

STORY: The visitor plays with the name for a second, reads "Hey, I'm Yahia", scans nine plainly described products with real covers, opens one, and leaves with the CV or an email.

FIRST VIEWPORT: Header: YK mark left, Work / About / Contact / CV right. Centre: the 3D name spanning about 60% width, upper-middle. Below it a centred Unbounded headline, "Hey, I'm Yahia Kerroum.", a two-line sub, and links "see my work →", "about me →", "CV ↓". The avatar bust peeks up from the bottom-right edge, eyes on the cursor.

SIGNATURE: Verlet-sprung tube strokes with cursor repulsion, grab-and-throw, dots that fly and return; real shadows. Work list rows float the real cover in a WebGL plane that bends with cursor velocity; cover morphs into the project page via view transition.

FORM: User-pinned "Soft letters" (synthesised from the user's references) after the philatelic roll (seed 8d4ca360) was rejected.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
