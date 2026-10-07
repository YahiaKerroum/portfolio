import media from "./media.generated.json";

export type Shot = { src: string; w: number; h: number; caption: string };

export type Project = {
  slug: string;
  name: string;
  /** What the product is, in a few plain words. */
  descriptor: string;
  /** The product's own line, from its README. */
  tagline: string;
  role: string;
  year: string;
  platform: string;
  stack: string[];
  links: { label: string; href: string }[];
  summary: string[];
  myPart?: string[];
  note?: string;
  accent: string;
  cover: { src: string; w: number; h: number };
  shots: Shot[];
};

type Raw = Omit<Project, "cover" | "shots"> & { captions?: Record<string, string> };

const RAW: Raw[] = [
  {
    slug: "kanoun",
    name: "Kanoun",
    descriptor: "Restaurant ordering and kitchen system",
    tagline: "From the table to the kitchen to the till.",
    role: "Solo project",
    year: "2026",
    platform: "Windows desktop app running guest, staff and back-office web apps",
    stack: ["React", "TypeScript", "Vite", "Node.js", "Express", "PostgreSQL", "Zod", "Tauri", "Rust"],
    links: [{ label: "Source", href: "https://github.com/YahiaKerroum/restaurant-management-system" }],
    summary: [
      "Kanoun runs a restaurant's service from one system. Guests scan the QR code on their table, browse a menu that reads like a printed one and send their order. The kitchen works from live tickets, one dish at a time, and when the last dish is ready the whole order moves to the pass. Floor staff see what needs attention right now, cashiers take payments, and owners run the menu, tables, team and reports.",
      "It ships as a Windows desktop app: a small Tauri launcher starts a bundled PostgreSQL, applies migrations and opens each app in its own window. Data can live on that one computer or on a shared server, so several computers can run one restaurant.",
    ],
    myPart: [
      "Everything: the product design and visual identity, the three apps, the API and background worker, the database, and the desktop distribution.",
    ],
    note: "A kanoun is the clay brazier at the centre of an Algerian kitchen, the thing everything else is cooked around. The identity comes from a spice market: harissa red, semolina, date-brown ink and saffron.",
    accent: "#B5402A",
    captions: {
      "staff-kitchen": "The kitchen board. Tickets stay together until the whole order is ready.",
      "guest-menu-mobile": "The guest menu, opened from the QR code on the table.",
      "guest-dish-mobile": "Choosing options and leaving a note for the kitchen.",
      "staff-orders": "Floor staff see what needs attention right now.",
      "guest-receipt-mobile": "The order prints as a receipt, and a progress line follows it to the table.",
      "back-office-menu": "Owners run the menu, with prices and availability per branch.",
      "staff-tables": "Every table at a glance.",
      "back-office-reports": "Sales reports in the back office.",
      "desktop-launcher": "The Windows launcher. Each app opens in its own window.",
    },
  },
  {
    slug: "fpl-assistant",
    name: "FPL Assistant",
    descriptor: "Fantasy Premier League prediction desk",
    tagline: "Every FPL decision, backed by a model.",
    role: "Main contributor",
    year: "2026",
    platform: "Web app, live on Vercel",
    stack: ["Next.js", "React", "TypeScript", "Python", "Flask", "scikit-learn", "LightGBM", "PuLP"],
    links: [{ label: "Live site", href: "https://fpl-assistant-ten.vercel.app" }],
    summary: [
      "A decision desk for Fantasy Premier League managers. Models forecast every player's points for the coming gameweeks, and an optimiser turns those forecasts into a starting eleven, captain picks and transfer options, all on live data from the official FPL API.",
      "Around it sit the tools a manager reaches for each week: a transfer studio that checks moves against the budget and squad rules, a captaincy shortlist, head-to-head player comparison, an eight-week fixture matrix and a news wire ordered by how much each story affects your squad.",
    ],
    myPart: [
      "Worked on the prediction models.",
      "Designed the platform, and took part in building it.",
    ],
    accent: "#4B1270",
    captions: {
      lineup: "Starting XI: the model's best eleven, with captain, vice-captain and bench order.",
      transfers: "Transfer Studio: stage moves and check them against the budget and squad rules.",
      captain: "A captaincy shortlist with form and fixture difficulty.",
      fixtures: "Fixture difficulty for every club across the next eight gameweeks.",
      compare: "Any two players, head to head.",
      news: "Availability news, ordered by how much it affects your squad.",
    },
  },
  {
    slug: "qima",
    name: "Qima",
    descriptor: "What a used laptop is really worth in Algeria",
    tagline: "What's your laptop worth?",
    role: "Team lead",
    year: "2026",
    platform: "Web app and public API",
    stack: ["Python", "scikit-learn", "pandas", "SHAP", "FastAPI", "Next.js", "TypeScript", "Tailwind CSS", "Docker"],
    links: [
      { label: "Live site", href: "https://qima-kappa.vercel.app" },
      { label: "API docs", href: "https://qima-api-sjyp.onrender.com/docs" },
      { label: "Source", href: "https://github.com/khalilgh1/laptop-price-prediction" },
    ],
    summary: [
      "Second-hand laptop prices in Algeria are hard to judge: the same machine can be listed at wildly different prices. Qima learns the market from real Ouedkniss listings and answers with a likely asking-price range, the specs that pushed it up or down, and the real ads closest to yours.",
      "A deals feed ranks laptops listed well under the market, with scam-shaped outliers filtered out first, and a market section turns the data into plain findings. Underneath: a gradient-boosted model evaluated on a time-based split, price ranges calibrated on held-out data, and SHAP explanations.",
    ],
    myPart: [
      "Led the team and worked on the pricing models.",
      "Designed and built the platform on my own: the estimator, the deals feed and the market pages.",
    ],
    note: "Qima, قيمة, means value. The logo is a shell holding a pearl: the processor, the part that moves a laptop's price most.",
    accent: "#1C63E0",
    captions: {
      "00-home": "The laptop opens on scroll to reveal a live price range.",
      "01-estimate": "Name the processor and a few specs; the range tightens as you go.",
      "02-estimate-gaming": "What moved the price, and the real ads closest to yours.",
      "03-deals": "Laptops listed well under the market, with likely scams filtered out.",
      "04-market-overview": "The market, turned into plain findings.",
      "05-market-condition": "How condition and memory move the price.",
      "06-market-scatter": "Asking price against processor speed.",
    },
  },
  {
    slug: "dzairai",
    name: "DzairAI",
    descriptor: "Algeria's AI ecosystem, in one place",
    tagline: "Algeria's AI ecosystem, in one place.",
    role: "Co-lead",
    year: "2025–2026",
    platform: "National web platform with AI services",
    stack: ["Next.js", "React", "Tailwind CSS", "Python", "FastAPI", "spaCy", "sentence-transformers", "Tesseract OCR", "Supabase"],
    links: [{ label: "Live site", href: "https://dzair.ai" }],
    summary: [
      "A national platform that brings Algeria's AI community together. Researchers, startups, students and companies find each other, browse open Algerian datasets, and follow events, opportunities and news in one place.",
      "Behind it run AI services: CV parsing in Arabic, French and English (with OCR for scanned files), job matching that explains which skills and experience matched, and scrapers that collect AI news, research papers and repositories linked to Algerian institutions.",
    ],
    myPart: [
      "Built the automated Python scrapers for Algerian GitHub repositories, research papers and AI news, storing structured results in PostgreSQL.",
      "Contributed to the multilingual CV parsing and AI job-matching pipelines.",
    ],
    accent: "#0E6B45",
    captions: {
      home: "Algeria's AI ecosystem, in one place.",
      experts: "Profiles for AI experts, filterable by domain.",
      datasets: "A catalogue of open Algerian datasets.",
      "dataset-detail": "Dataset pages with metadata, previews and downloads.",
      events: "Hackathons, workshops and meetups across Algeria.",
      companies: "Companies and startups in the ecosystem.",
      news: "AI news, summarised and tagged automatically.",
      "blog-post": "Articles written by the community.",
    },
  },
  {
    slug: "drone-planner",
    name: "Drone Planner",
    descriptor: "Delivery routes for a drone fleet",
    tagline: "Routing drones under weight-dependent energy.",
    role: "Co-lead",
    year: "2026",
    platform: "Python solvers with an interactive browser planner",
    stack: ["Python", "NumPy", "SciPy", "JavaScript"],
    links: [],
    summary: [
      "A drone burns more energy while it carries more weight, so the cost of each leg depends on when in the route it's flown. That makes this a different problem from ordinary vehicle routing, and the project builds the whole stack for it: two mathematical formulations, a hardness proof, an exact Branch & Bound solver, and three metaheuristics (a genetic algorithm, simulated annealing and adaptive large neighbourhood search). Routes steer around no-fly zones.",
      "In the browser planner you place stops on a map, set the fleet and solve. The drones then fly the answer on a single clock, with battery and payload tracked for each one. Alongside the replay, a convergence view compares the heuristics and a search-tree view shows Branch & Bound closing in on the optimum. The solvers are checked against published optimal solutions from the CVRPLIB benchmark set.",
    ],
    myPart: [
      "Worked on the solver pipeline and the optimisation models.",
      "Designed and built the browser planner with one teammate.",
    ],
    accent: "#167553",
    captions: {
      "02-flight-replay": "The fleet flies the solution on one clock, with a live manifest per drone.",
      "01-planner": "Place stops on the map, set the fleet, and solve.",
      "03-convergence": "The genetic algorithm, simulated annealing and ALNS, side by side.",
      "04-search-tree": "Branch & Bound closing the gap between its best route and its bound.",
    },
  },
  {
    slug: "clinicpulse",
    name: "ClinicPulse",
    descriptor: "Running a dental clinic, day to day",
    tagline: "The dental practice OS.",
    role: "Co-lead, then overhauled it",
    year: "2025–2026",
    platform: "Web app",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Prisma"],
    links: [{ label: "Source", href: "https://github.com/YahiaKerroum/Dentist-Management-System" }],
    summary: [
      "The day-to-day running of a dental clinic in one product: patients, appointments, per-tooth clinical records, finances and staff. It opens on a live Today view showing which chairs are free, who is waiting or in treatment, which follow-ups are due and what is waiting for approval.",
      "Each screen is built around the job of the person using it. The front desk sees who's waiting and who owes money, doctors see their chair schedule and treatment plans, managers see revenue, approvals and staff. Access is role-based, with permissions managers can change while the clinic is running.",
    ],
    myPart: [
      "Overhauled the whole platform into ClinicPulse: the product you see here.",
      "On the original version, which I co-led: designed the permission system (fine-grained resource.action permissions managers change at runtime, with no redeploy), built the interactive dental chart with tooth-by-tooth status and multi-session treatment tracking, added appointment conflict detection across doctors, and integrated Google Drive for patient documents.",
    ],
    accent: "#13906B",
    captions: {
      dashboard: "The live Today view: chairs, the waiting room, what needs attention.",
      patients: "Patient records.",
      "patient-detail": "One patient: balance, history and activity.",
      "appointments-schedule": "The chair schedule.",
      treatments: "Treatments and per-tooth clinical records.",
      "finances-payments": "Payments, with an approval workflow.",
      reports: "Reports for managers.",
      permissions: "Role-based permissions: who can see and do what.",
    },
  },
  {
    slug: "quiz",
    name: "Adaptive Quiz",
    descriptor: "Quizzes that adapt to each learner",
    tagline: "Assessments that adapt to every learner.",
    role: "Co-lead",
    year: "2025–2026",
    platform: "Web app with a machine-learning service",
    stack: ["Python", "FastAPI", "scikit-learn", "Next.js", "Tailwind CSS", "PostgreSQL", "Supabase"],
    links: [],
    summary: [
      "Instead of giving every student the same fixed sequence, the platform re-reads the learner after every answer (accuracy by difficulty, streaks, response time) and asks the question that will tell it the most about their level. It stops as soon as the model is confident and ends with a predicted level.",
      "Students browse quizzes by module, take them in standard or adaptive mode, and review a full breakdown afterwards. Administrators import question banks, tune difficulty, manage roles and export answer data, while authentication and row-level security keep student data private.",
    ],
    myPart: [
      "Led the machine-learning pipeline that classifies a student's level from as few questions as possible.",
      "Benchmarked active-learning strategies (uncertainty sampling, entropy reduction, query by committee) against a random baseline, validated on real ENSIA student data.",
    ],
    accent: "#C9592A",
    captions: {
      "05_quiz": "One question at a time; the next one depends on how you're doing.",
      "03_dashboard": "Browse quizzes by module.",
      "06_result": "A full breakdown after every session.",
      "04_history": "Every past session, one click away.",
      "07_admin_catalog": "The admin catalogue.",
      "09_admin_import": "Importing question banks from CSV or JSON.",
      "10_admin_simulate": "Simulating sessions to test the model.",
    },
  },
  {
    slug: "findar",
    name: "FinDar",
    descriptor: "Real-estate marketplace app for Algeria",
    tagline: "Your Algerian property marketplace.",
    role: "Main contributor",
    year: "2025",
    platform: "Android app",
    stack: ["Flutter", "Dart", "Cubit", "Firebase"],
    links: [],
    summary: [
      "A mobile marketplace for Algerian real estate, where sellers, agencies, buyers and renters list and discover houses, apartments, villas and studios.",
      "Firebase sign-in with OAuth, real-time push notifications, saved favourites, advanced search by location, price and property type, and listing boosts that give a property more visibility. It ships as an Android APK with its own landing page.",
    ],
    myPart: [
      "Built the listing cards, listings, saved favourites and search, and refined other sections with the team, in Flutter with Cubit.",
      "Did all of the app's localization on my own.",
    ],
    note: "Dar, دار, means house.",
    accent: "#1E5BD8",
    captions: {
      "findar-hero-mockup": "The welcome screen: rent, sell or buy.",
      "findar-advanced-search": "Advanced search by location, price and property type.",
    },
  },
  {
    slug: "sentinel",
    name: "Sentinel",
    descriptor: "Phishing detection inside Gmail",
    tagline: "Phishing checks that never leave your browser.",
    role: "Contributor",
    year: "2026",
    platform: "Chrome extension",
    stack: ["JavaScript", "ONNX Runtime", "MiniLM", "Chrome Extensions API"],
    links: [],
    summary: [
      "A privacy-preserving Chrome extension that checks Gmail for phishing entirely inside the browser: no email content is ever sent anywhere.",
      "It combines an offline MiniLM language model running on ONNX, typosquatting detection for look-alike domains and domain-age lookups, then marks suspicious messages with badges right in the inbox.",
    ],
    myPart: ["Helped build the detection pipeline."],
    accent: "#2E3A8C",
  },
];

const M = media as Record<string, { cover: Project["cover"]; shots: { src: string; w: number; h: number; file: string }[] }>;

export const PROJECTS: Project[] = RAW.map(({ captions = {}, ...p }) => ({
  ...p,
  cover: M[p.slug].cover,
  shots: M[p.slug].shots.map((s) => ({ src: s.src, w: s.w, h: s.h, caption: captions[s.file] ?? "" })),
}));

export function getProject(slug: string) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  if (i < 0) return null;
  return { project: PROJECTS[i], next: PROJECTS[(i + 1) % PROJECTS.length] };
}

export const PERSON = {
  name: "Yahia Kerroum",
  nameAr: "يحيى قروم",
  email: "yahia.kerroum@ensia.edu.dz",
  phone: "+213 797 987 620",
  github: "https://github.com/YahiaKerroum",
  linkedin: "https://www.linkedin.com/in/yahia-student-kerroum-a963632b4",
  cv: "/Yahia-Kerroum-CV.pdf",
};
