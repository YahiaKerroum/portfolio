# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Anyone who might hire or select Yahia: AI/ML recruiters, product and
full-stack engineering teams, potential clients commissioning a system, and
graduate-school or research-lab committees. No single audience is privileged;
the site must work for all of them, so it leads with the work rather than with
a pitch aimed at one of them.

## Product Purpose

A personal portfolio for Yahia Kerroum, a fourth-year AI engineering student
at ENSIA (National Higher School of Artificial Intelligence), Algiers,
graduating 2028. It replaces an earlier portfolio deployed on Vercel. Success
means a visitor leaves remembering who he is and wanting to look closer at the
products he has built.

## Positioning

Yahia builds complete products, not demos, and gives each one its own name,
story, and visual identity. Several draw on Algerian life and language
(Kanoun, the clay brazier at the centre of an Algerian kitchen; Qima, قيمة,
"value"; FinDar, "dar" = house; DzairAI). He works across machine learning,
optimisation, and full-stack engineering, and ships the interface as carefully
as the model.

## Operating Context

Visitors arrive from the CV link, LinkedIn, GitHub, or a direct share, on
desktop and phone. Many will skim, then open one or two projects in depth.
Some projects have live deployments a visitor can open.

## Capabilities and Constraints

- Stack: Next.js 16.2 (App Router) with React 19, deployed on Vercel at
  yahiakerroum-portfolio.vercel.app. Read `node_modules/next/dist/docs/` before
  using any Next API; this version has breaking changes.
- Dev machine has 15 GB RAM. A previous `next dev` session spawned hundreds of
  PostCSS workers and froze it; avoid PostCSS/Tailwind pipelines and never
  leave a dev server running unsupervised.
- Exactly nine projects appear on the site (those with visuals). FaceAttend and
  AI Job Matching stay on the CV only.
- The CV PDF must remain downloadable from the site.

## Brand Commitments

- Do not lead with numbers, metrics, stat strips, or benchmark figures. The
  user considers metric-driven copy a "vibe-coded" tell. Let the platforms
  speak for themselves through their interfaces and ideas.
- Must not look templated or AI-generated. A unique identity with a lot of
  motion is required.
- Each project's own name and identity (logos, palettes, typefaces in its
  title image) belongs to that project and should be respected, not repainted.

## Evidence on Hand

All under `PROJECTS/` unless noted. Roles are as stated by Yahia.

| Project | Role | What it is | Assets | Links |
|---|---|---|---|---|
| Kanoun | Solo, built entirely alone | Restaurant OS: QR table ordering, live kitchen tickets, payments, back office; Windows desktop app (Tauri) on PostgreSQL | `Kanoun-Portfolio/kanoun-title.png`, `framed/` (23 screens incl. mobile), `README.md` | github.com/YahiaKerroum/restaurant-management-system |
| FPL Assistant | Main contributor: models, platform design, part of the build | Fantasy Premier League prediction desk: LightGBM/ElasticNet forecasts, squad optimiser, transfers, captaincy, fixture matrix | `fpl ASSISTANT Portfolio/title.png`, `screenshots/` (6), `README.txt` | fpl-assistant-ten.vercel.app |
| FinDar | Main contributor: cards, listings, saved, search, refinements (Flutter, Cubit); all localization alone | Flutter real-estate app for Algeria: listings, search, favourites, boosts, Android APK | `FindDar Title.jpg` (AI-generated, contains text errors), `public/projects/findar*.webp` | — |
| Drone Delivery Planner | One of the leads: pipeline and models; designed and built the planner with a teammate | Routing drones whose energy depends on carried weight; exact Branch & Bound, GA/SA/ALNS, no-fly zones; interactive browser planner with flight replay | `Drone Based Delivery Optimization Portfolio/title-image.png`, 4 framed screens, `README.txt` | — |
| Qima | Team lead; worked on the models; designed and built the platform alone | Fair asking prices for used laptops in Algeria from Ouedkniss listings; explainable estimates; deals finder; shell-and-pearl logo | `laptop price intelligence portfolio/title.png`, 7 screens, `logo/`, `README.md` | qima-kappa.vercel.app · github.com/khalilgh1/laptop-price-prediction |
| DzairAI | One of the leads | National platform for Algeria's AI ecosystem: experts, companies, datasets, events, news; CV parsing and job matching services | `dzairai portfolio/title.png`, 17 screens, `README.txt` | dzair.ai |
| ClinicPulse | Co-lead on the original (DCMS); then overhauled the whole platform into ClinicPulse | Dental practice OS: live "Today" dashboard, per-tooth records, appointments, finances, role permissions | `ClinicPulse-Portfolio/title-v2.png`, 13 screens, `README.txt` | github.com/YahiaKerroum/Dentist-Management-System |
| Adaptive Quiz Platform | One of the leads | Quizzes that pick each next question from the learner's performance and predict their level | `Quizplatform portfolio/00_title_image.png`, `framed/` (10), `README.md` | — |
| Sentinel | Secondary contributor: helped build the detection pipeline | Privacy-preserving Chrome extension detecting phishing in Gmail entirely in-browser | `Sentinel Title.jpg` (AI-generated device mockup) | — |

Name in Arabic: يحيى قروم (surname spelled with ق, not ك).

Personal: CV at `CVYAHIA.pdf` (served as `public/Yahia-Kerroum-CV.pdf`),
portrait at `public/profile.jpg`. Contact: yahia.kerroum@ensia.edu.dz,
+213 797 987 620, github.com/YahiaKerroum,
linkedin.com/in/yahia-student-kerroum-a963632b4. Languages: Arabic (native),
French and English (professional).

Absent, never to be fabricated: testimonials, client names, employers,
awards, live links for projects not listed above.

## Product Principles

1. Show the work doing its job; never substitute claims or scores for it.
2. Every project keeps its own identity; the portfolio is the stage, not a
   uniform.
3. Credit exactly: solo, main, lead, or secondary, as stated.
4. Personal and rooted beats generic and international.
