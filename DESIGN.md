---
name: Yahia Kerroum, Soft letters
description: Chalk paper, one deep ink, and a glossy glazed name you can touch; colour belongs to the projects.
colors:
  ink: "#191b28"
  ink-2: "#444a61"
  ink-3: "#585e77"
  paper: "#eceef2"
  paper-2: "#e1e4ea"
  line: "rgb(25 27 40 / 0.14)"
  coral: "#ff6b4a"
  saffron: "#ffb938"
  blue: "#3d6bff"
  mint: "#2fcf9d"
  lilac: "#a38cff"
  pink: "#ff8cb5"
  accent-default: "#2747c9"
typography:
  display:
    fontFamily: "Unbounded, system-ui, sans-serif"
    fontSize: "clamp(3rem, 9vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Unbounded, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.6vw, 4.4rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Unbounded, system-ui, sans-serif"
    fontSize: "clamp(1.7rem, 3.6vw, 3.1rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.04em"
  lead:
    fontFamily: "Unbounded, system-ui, sans-serif"
    fontSize: "clamp(1.45rem, 2.5vw, 2.2rem)"
    fontWeight: 500
    lineHeight: 1.22
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "0.97rem"
    fontWeight: 650
    lineHeight: 1.6
  arabic:
    fontFamily: "Readex Pro, system-ui, sans-serif"
rounded:
  focus: "4px"
  thumb: "8px"
  frame: "10px"
  control: "12px"
  sheet: "16px"
spacing:
  gutter: "clamp(20px, 4.2vw, 64px)"
  max: "1380px"
  section-top: "clamp(80px, 11vw, 150px)"
  row: "clamp(18px, 2.2vw, 28px)"
components:
  arrow-link:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  button-copy:
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0.55em 0.95em"
  button-copy-done:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0.55em 0.95em"
  work-row:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    padding: "{spacing.row} 0"
  work-row-thumb:
    rounded: "{rounded.thumb}"
    width: "clamp(120px, 12vw, 190px)"
  project-cover:
    rounded: "{rounded.sheet}"
    width: "100%"
  screenshot-frame:
    backgroundColor: "{colors.paper-2}"
    rounded: "{rounded.frame}"
---

# Design System: Yahia Kerroum, Soft letters

## Overview

**Creative North Star: "Soft Letters on Chalk Paper"**

The personality lives in things you can touch, and the work is shown plainly. The page is cool chalk paper under a fixed film of grain, with one deep blue-black ink doing all the reading. Against that quiet ground there are two playful objects: Yahia's Arabic name, يحيى, built from glossy glazed tubes on Verlet springs that you can push, grab and fling, and a stylised clay bust of Yahia that watches the cursor. Everything else is typography, hairline rules and the projects' own covers.

Colour is rationed. The six-glaze set belongs to the name and to small moments of play. Each project brings its own accent, and that accent only appears when the project is hovered or open. Covers always show in their own full colour, because each cover is its project's identity. Lists are rule-based and pill-free; nothing is boxed into cards.

The build is code-led: it was prototyped in code from Yahia's own words and reference sites, with no comps. Its confirmed rejections are the dev-portfolio skeleton (typed role, skills grid, card wall), neon on dark, and any metaphor wrapped around the projects. The stamp-based philatelic direction was built and then dropped because recruiters could not read the projects through it.

**Key Characteristics:**
- Cool chalk paper (paper) with fixed grain at 7% over everything, the 3D included.
- One ink family (ink, ink-2, ink-3); hierarchy comes from weight and size, not hue.
- Unbounded wide display for headings, Hanken Grotesk for reading, Readex Pro for Arabic.
- Glossy glazed tubes and clay, lit by a soft studio environment, casting real soft shadows on the page.
- Project accents appear only on hover or when the project is open; covers are always in full colour.
- Squash-and-settle motion with a spring that stays on micro-interactions.

## Colors

The palette is a cool neutral page with one ink and a bright glaze set kept for play, plus a per-project accent that only appears in response to the visitor.

### Primary
- **Deep Ink** (ink): all headings, body emphasis, the 2px section rules, the copy button stroke, text selection fill. It is the only "brand" colour the page owns.

### Secondary
- **The Glaze Set** (coral, saffron, blue, mint, lilac, pink): the name's tube gradients (two glazes per stroke, coral to saffron, blue to lilac, mint to blue, saffron to coral, lilac to pink) and its dots (saffron, coral, mint, blue). Outside the name they appear only as small states: the per-letter hover colours on "Say hello.", mint for the copied-email confirmation, blue for the focus ring.

### Tertiary
- **Project Accent** (per project, from the content file; accent-default when none is set): the row wash (10% mix into paper), the tinted row name and arrow on hover, the cursor-following bloom (26% mix), the list markers on a project page, and the "Next:" name on hover. The project tagline is smaller than AA's large-text size on phones, so it takes the accent deepened toward ink (`color-mix(in oklab, accent 75%, ink)`), which keeps the hue and clears 4.5:1 for every project; never set small text in the raw accent. Each project's accent is its own; the system never picks it.

### Neutral
- **Chalk Paper** (paper): page background and the browser theme colour.
- **Shaded Paper** (paper-2): screenshot frame fill and scrollbar track.
- **Second Ink** (ink-2): ledes, paragraph text in About and project pages, the loader's sketch line, the hero hint.
- **Third Ink** (ink-3): metadata (role and year), captions, footer, the "Next:" label, scrollbar thumb.
- **Hairline** (line): 1.5px dividers between rows, facts and footer.

### Named Rules
**The Colour Belongs to the Work Rule.** A project's accent appears only on hover, focus, or when the project is open. At rest the list is ink on paper and the covers carry the colour in full.

**The Covers Stay Whole Rule.** Covers are never muted, desaturated, tinted or duotoned at rest. Yahia compared full colour, muted and grayscale in the build and chose full colour (2026-10-07).

**The Glaze Is for Play Rule.** The glaze set colours the name and small interactive moments only. It never fills a surface, never becomes a project's colour, and never sets body text.

## Typography

**Display Font:** Unbounded (with system-ui, sans-serif)
**Body Font:** Hanken Grotesk (with system-ui, sans-serif)
**Arabic Font:** Readex Pro, the monoline Arabic the name's tubes were traced from

**Character:** Unbounded is round and wide like the tubes of the name, set tight (-0.04em) so it feels squeezed and soft; Hanken Grotesk does the reading at a calm 1.6 line height.

### Hierarchy
- **Display** (700, clamp(3rem, 9vw, 6rem), 0.9, uppercase): section titles "WORK" and "ABOUT". The contact title "Say hello." and the project title use the same face and weight in sentence case (project title clamp(2.6rem, 8vw, 6rem), 0.92).
- **Headline** (600, clamp(2rem, 4.6vw, 4.4rem), 1.02): the hero greeting only.
- **Title** (500, clamp(1.7rem, 3.6vw, 3.1rem), 1): project names in the work list; they gain weight to 700 on hover. The "Next:" project name uses 700 at clamp(2.2rem, 5.4vw, 4.6rem).
- **Lead** (500, clamp(1.45rem, 2.5vw, 2.2rem), 1.22): the About opener and, at clamp(1.3rem, 2.2vw, 1.9rem), the project tagline.
- **Body** (400, 1.0625rem, 1.6): paragraphs capped at 62 to 64ch, balanced headings and pretty-wrapped paragraphs.
- **Label** (650, 0.97rem): navigation, arrow links, the copy button. Fact terms use 700 at 0.9rem.

### Named Rules
**The Squeezed Display Rule.** Every Unbounded setting at title size or larger tracks at -0.03em to -0.04em; never open-tracked.

**The No Kicker Rule.** Headings stand alone. There are no eyebrows, numbered section labels or small caps above titles; context comes from the side note or the sentence itself (the "Next:" label is part of the sentence, on the same baseline).

## Layout

Content sits in a centred column of max 1380px with a fluid gutter of clamp(20px, 4.2vw, 64px). Sections open with generous top padding (clamp(80px, 11vw, 150px)) and a section head: the big title left, a short ink-2 note right, closed by a 2px ink rule.

The hero fills max(100svh, 680px). The name poster is centred at min(60vw, 920px) wide (86vw under 860px), its top at clamp(84px, 13vh, 150px); the 3D canvas measures the poster and sits exactly on it. Copy is centred below, max 54rem. The avatar bust peeks from the bottom-right edge and fades into the paper with a mask (58% to 97%).

Work rows are a four-column grid (name, descriptor over role and year, thumbnail, arrow). Under 860px they restack as full-width cover, then name and arrow, then descriptor and meta. About is a 12-column grid: lead and body on the left 7 and 6 columns, facts on the right 5. Project pages run a 7:5 text and sticky facts split, then a two-column gallery where every third shot spans both columns and tall shots cap at 380px.

Breakpoints: 1100px (hint moves to the right edge), 860px (single column, larger name), 560px (mark name hidden, tighter nav). Hover-only effects (bloom, jelly preview) are gated on `(hover: hover) and (pointer: fine)`.

## Elevation & Depth

Depth is physical rather than decorative. The 3D name and avatar are lit by a soft studio environment and cast real soft shadows onto an invisible catcher, so they look set on the paper. On the flat page, elevation exists only on images, as soft, low, ink-tinted drop shadows with a negative spread so they read as contact shadows. Containers and text are flat.

### Shadow Vocabulary
- **Thumb contact** (`box-shadow: 0 10px 24px -14px rgb(25 27 40 / 0.55)`): work-row thumbnails.
- **Next-thumb contact** (`box-shadow: 0 16px 34px -18px rgb(25 27 40 / 0.5)`): the "Next:" thumbnail.
- **Cover lift** (`box-shadow: 0 34px 70px -34px rgb(25 27 40 / 0.5)`): the project page's main cover.

### Named Rules
**The Images Only Rule.** Only images and the 3D objects carry shadows. Text, rows, buttons and sections stay flat; never a hard offset shadow.

## Shapes

The form language is soft and round in the objects and quiet in the page. Tubes have round caps and joins; icons and the ink sketch use round caps and joins. Corners stay small and moderate: 8px on row thumbnails, 10px on screenshot frames and the mobile thumbnails, 12px on the copy button, 16px on the project cover and the hover wash, 14px inside the jelly preview's shader mask. Dividers are rules, not boxes: 2px ink to close a section head or open "Next:", 1.5px hairline between rows and facts. No pills, no chips, no card borders.

## Components

### Arrow Links
Quiet text links that grow an underline.
- **Shape:** no box; a 2px currentColor underline drawn from 0% to 100% width on hover (0.5s ease-out).
- **Icon:** one stroke icon family (1.75px stroke, round caps, 20px box at 1.05em); the arrow nudges in its own direction on hover (right +4px, down +3px, up -3px) with the spring.
- **Usage:** hero links, contact links, project links, footer "Back to top".

### Buttons
Only one real button exists: the email copy control.
- **Shape:** gently rounded (12px), 1.5px ink stroke, transparent fill.
- **Hover:** lifts 2px and tips -2deg on the spring.
- **Done:** fills mint with a check icon and "Copied" for 2.2s, announced politely.

### Navigation
- **Header:** absolute over the hero; left, the mark (the first letter ي drawn from the same traced strokes, 34px) with "Yahia Kerroum" in Unbounded 600; right, Work / About / Contact / CV with a down icon. The mark tips -12deg and scales 1.14 on hover; links take the arrow-link underline. Under 560px the name hides and only the mark remains.

### Work Rows
The signature list: plain rows divided by hairlines, the real cover beside each name.
- **At rest:** ink name (Title), descriptor in 600, role and year in ink-3, full-colour thumbnail, arrow.
- **Hover / Focus:** a 16px-rounded wash of the project's accent (10% into paper) scales open from 0.7 high on the spring; the name slides 14px, gains weight to 700 and takes the accent; the thumbnail tips -3deg and scales 1.06; the arrow moves 6px and takes the accent. A 560px radial bloom of the accent follows the cursor behind the list.
- **Jelly preview (pointer-fine only):** a full-colour WebGL plane of the hovered cover, 32vw wide (at most 500px), follows the cursor sideways but hangs above the hovered row (below it near the top of the screen) so the row's own text stays clear. It bends with cursor velocity, splits RGB slightly while moving, and cross-fades between covers.
- **Into the project:** the thumbnail and the project cover share one view-transition name, so the cover travels between pages (0.75s, ease-out, a brief 2px blur mid-flight).

### Facts
Definition lists as ruled rows: a 9.5rem term column in 700, values in ink-2, 1.5px hairlines above each row and below the last. They stack to one column under 560px. On project pages the facts column is sticky.

### Project Page
Title and descriptor head, full-width 16px-rounded cover, text and facts split, gallery of screenshots in 10px frames on paper-2. The page sets its own accent for the tagline and list markers. It closes with "Next:" + project name as one sentence in Display, the arrow glued to the last word, and the next cover tipping 3deg on hover.

### Soft Name (signature)
The hero's 3D name. Five Verlet-sprung tube strokes and four dots in MeshPhysical glaze (roughness 0.3, full clearcoat), tone-mapped neutral, with VSM soft shadows. The cursor repels nodes, a stroke can be grabbed and thrown, dots fly and return, and strokes stretch without tearing. If WebGL never starts, the SVG poster stays in its glazed form.

**Loader: "the name writes itself."** While the 3D word gets ready, the poster draws itself as a thin ink-2 line in stroke order (0.55s per stroke, 0.32s apart) and the glaze dots pop in and hop in place. The tubes then pipe in over the same strokes and the sketch fades once they cover it. No full-screen curtain; the page is readable from the first frame.

### Clay Avatar (signature)
A chibi clay bust of Yahia built from primitives in the same glossy world (clay roughness 0.46, half clearcoat). He watches the cursor, breathes, blinks, and looks surprised when the name is grabbed. Stubble is the light, grainy version Yahia chose: a soft per-vertex grainy edge along the jaw, lighter over the lip. A second, smaller bust reprises in Contact, popping up when scrolled into view.

The site icon is his head from this same render, in a chalk-paper circle (Yahia's pick over a glazed ي): `favicon.ico` at 16-64 px and a 180 px `apple-icon.png` on full-bleed paper. Rebuild both from the live avatar whenever it changes: `scripts/preview/capture_icon.py` (through `preview.ps1 -Extra`), then `scripts/build_icons.py`.

### Motion Grammar
- **Squash and settle:** big headings arrive letter by letter from a squash (scaleY 0.62, 1.15s elastic.out(1, 0.55), 0.04s stagger); hero copy lands with a softer squash after the name has piped in.
- **Calm reveals:** rows deal in (y 40, 0.9s expo.out); paragraphs and facts rise (expo.out); screenshots unclip from a rounded inset and drift slowly with scroll.
- **The tube entrance:** strokes grow in writing order (0.17s apart, out-cubic), their radius swells on an elastic, dots arrive on an out-back; the clock starts at the first drawn frame, and the "give it a poke" hint appears only once the name has landed.
- **Spring scope:** `--ease-spring` (cubic-bezier(0.34, 1.56, 0.64, 1)) is sanctioned for micro-interactions only: icon nudges, the mark, the row wash, thumbnails, the copy button, the contact letters, the loader dots. Larger movement uses `--ease-out` (cubic-bezier(0.16, 1, 0.3, 1)).
- **Reduced motion:** all CSS transitions and animations collapse to 0.01ms and view transitions are off; GSAP choreography and Lenis smooth scroll do not start; the sketch shows complete and the dots still; the name and avatar appear in place with no idle wobble, and the jelly preview snaps instead of trailing. Everything stays readable without JavaScript, since every move starts from the resting state.

### WebGL Performance
These rules exist because a cold start once froze the page; future work must not regress them.
- **Wait for transitions:** no GL setup starts until any running view transition has finished.
- **Parallel compile:** scene shaders and the studio environment's filter shaders compile through `KHR_parallel_shader_compile` before the first draw, and drawing starts only when they are ready.
- **Staged start:** the name mounts first; the hero avatar mounts after the name's first frame (or a 2.5s fallback); the contact avatar and the jelly preview mount only when scrolled near, in an idle moment.
- **Draw only when seen:** render loops stop offscreen, in hidden tabs, and (for the preview) when nothing is hovered.
- **Deferred release, forced loss:** on unmount the loop stops at once, but GPU resources are freed only after the page transition, and the context is lost on purpose, because browsers cap live contexts.
- **Adaptive pixel ratio:** the name starts at min(devicePixelRatio, 1.75) and, after landing, steps down by 0.25 (to 1) when the median frame over 90 frames exceeds 25ms; the avatar and preview cap at 2.

## Do's and Don'ts

### Do:
- **Do** keep every surface ink on chalk paper (paper) with the grain overlay at 7% opacity over everything.
- **Do** show covers in their full own colour at rest; bring a project's accent only on hover, focus, or when it is open.
- **Do** use rules (2px ink, 1.5px hairline) to divide content, and arrow links with a growing 2px underline for actions.
- **Do** keep the spring on micro-interactions and use `--ease-out` for anything that travels.
- **Do** keep the page readable from the first frame: the name writes itself in place while the 3D gets ready.
- **Do** follow the WebGL rules above (wait for transitions, parallel compile, staged start, deferred release with forced context loss, adaptive pixel ratio) for any new canvas.
- **Do** write copy plainly and warmly, and credit each role exactly as Yahia states it (solo, main contributor, team lead, co-lead, secondary).

### Don't:
- **Don't** mute, gray out or tint covers at rest.
- **Don't** use the glaze set as a surface fill, a project colour or text colour.
- **Don't** add a full-screen loading curtain or hide content behind the name's entrance.
- **Don't** lead with metrics, stat strips, benchmark figures or hype.
- **Don't** wrap projects in a metaphor (stamps or otherwise); show each one plainly.
- **Don't** add pills, chips, card walls, a skills grid, or a typed-role hero.
- **Don't** add kickers or eyebrow labels above headings.
- **Don't** add shadows to text, rows or buttons, and never a hard offset shadow.
- **Don't** go dark-and-neon.
