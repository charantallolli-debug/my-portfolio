import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Download, Mail, Github, Linkedin, MapPin, ExternalLink, ArrowRight,
} from "lucide-react";
import resumeAsset from "@/assets/resume.docx.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Charan Tallolli — AI Developer & SDET Engineer" },
      { name: "description", content: "AI developer and SDET building intelligent systems and rigorously testing them — CNN pipelines, Selenium automation, full-stack delivery." },
      { property: "og:title", content: "Charan Tallolli — AI Developer & SDET Engineer" },
      { property: "og:description", content: "AI developer and SDET building intelligent systems and rigorously testing them." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

/* ---------------- Data ---------------- */

const NAV = [
  { id: "profile", label: "Profile" },
  { id: "philosophy", label: "Philosophy" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Tech Stack" },
];

const METRICS = [
  {
    k: "94%",
    label: "CNN Model Accuracy",
    desc: "Achieved on a 5-crop disease classification pipeline trained with TensorFlow / Keras on augmented field imagery.",
    accent: "blue" as const,
  },
  {
    k: "60%",
    label: "Regression Time Saved",
    desc: "By replacing manual regression with a Selenium + TestNG Page Object Model framework backed by data-driven suites.",
    accent: "green" as const,
  },
  {
    k: "ACTIVE",
    label: "QA Engineering Status",
    desc: "Currently shipping STLC artifacts, automation, and SQL data validation as an SDET trainee in Bangalore.",
    accent: "blue" as const,
  },
];

const PRINCIPLES = [
  {
    n: "01",
    kicker: "RELIABILITY",
    title: "Tests Are Not Optional",
    body: "Every shipped feature ships with its proof. Smoke, regression, SIT, and UAT are baked into the delivery loop — not bolted on the week before release.",
  },
  {
    n: "02",
    kicker: "OBSERVABILITY",
    title: "Validate The Data, Not Just The UI",
    body: "If you cannot SQL-verify the row that the screen claims to show, the system is unverified. Backend assertions and CRUD validation matter as much as click paths.",
  },
  {
    n: "03",
    kicker: "AUTOMATION",
    title: "Frameworks Over One-Off Scripts",
    body: "Page Object Models, reusable test data, and TestNG suites compound. Disposable scripts decay. Invest in structure that survives the next sprint.",
  },
  {
    n: "04",
    kicker: "EXPERIMENTATION",
    title: "AI Is An Engineering Discipline",
    body: "CNNs, MediaPipe pipelines, and prompt-engineered helpers only matter when they cross the line from notebook to a Flask endpoint someone can call.",
  },
  {
    n: "05",
    kicker: "CRITICALITY",
    title: "Defects Have A Life Cycle",
    body: "Logged, triaged, fixed, retested, closed — with traceability. A defect without an owner and a status is a leak waiting to happen in production.",
  },
  {
    n: "06",
    kicker: "OWNERSHIP",
    title: "End To End, Not Hand Offs",
    body: "From requirement reading and test planning to model training, API wiring, and cross-browser validation — I take the artifact across the whole arc.",
  },
];

const PROJECTS = [
  {
    icon: "🌾",
    title: "AgriSense — AI Crop Disease Detection",
    status: "Final-Year Project",
    statusHref: null as string | null,
    statusCta: null as string | null,
    blurb:
      "CNN-powered multi-crop disease classifier with OpenCV preprocessing, served through a Flask REST API for field-side diagnosis.",
    bullets: [
      ["Multi-Crop CNN Classifier:", "Trained a TensorFlow / Keras model across 5 crop types reaching 94% validation accuracy with zero false-negatives on critical disease classes."],
      ["OpenCV Preprocessing:", "Built a deterministic image normalization pipeline (resize, denoise, channel correction) so field photos match training distribution."],
      ["Flask REST Inference API:", "Wrapped the model in a versioned Flask endpoint with structured JSON responses, ready for mobile and dashboard consumers."],
      ["Hardened with QA:", "Validated end-to-end against 30+ UAT criteria with zero P1 defects at v1.0 release."],
    ],
    stack: ["Python", "TensorFlow", "Keras", "OpenCV", "Flask", "REST"],
  },
  {
    icon: "🤟",
    title: "Real-Time Sign Language Interpreter",
    status: "Computer Vision",
    statusHref: null,
    statusCta: null,
    blurb:
      "Real-time hand-tracking and gesture classifier translating 26 sign classes into text and synthesized speech on a live webcam stream.",
    bullets: [
      ["MediaPipe Hand Tracking:", "Sub-frame hand landmark extraction used as deterministic features for the downstream classifier."],
      ["CNN Gesture Classifier:", "Trained on a 26-class dataset with 96% reliability across a 200-sample sanity suite."],
      ["Text + Speech Output:", "Recognized signs are surfaced both as live captions and TTS audio for accessibility scenarios."],
      ["Live Webcam Pipeline:", "Frame capture, inference, and rendering tuned to run on commodity laptops without GPU acceleration."],
    ],
    stack: ["Python", "MediaPipe", "CNN", "OpenCV", "pyttsx3"],
  },
  {
    icon: "🛣️",
    title: "Safe Commute Planner",
    status: "Full-Stack Delivery",
    statusHref: null,
    statusCta: null,
    blurb:
      "Cross-browser web app for safer route planning, shipped defect-free across 4 browsers with Selenium-driven regression and SIT cycles.",
    bullets: [
      ["React + Python Backend:", "React UI talking to a Python REST backend with structured route, hazard, and user endpoints."],
      ["Selenium Cross-Browser:", "Regression suite covers Chrome, Firefox, Edge, and Brave with parallel TestNG execution."],
      ["SQL Data Validation:", "Backend assertions check that planned routes, hazards, and user state match the database 1:1."],
      ["SIT & Regression Cycles:", "Released v1.0 with zero P1 defects after 3 SIT rounds and a full regression pass."],
    ],
    stack: ["React", "Python", "Selenium", "TestNG", "SQL"],
  },
];

const EXPERIENCE = [
  {
    role: "SDET Trainee — Software Testing Automation with AI",
    org: "QSpiders, Rajajinagar",
    period: "2024 – 2025 · Bangalore, IN",
    points: [
      ["Full STLC Ownership:", "Designed and executed 50+ manual test cases across Smoke, Sanity, Regression, SIT, and UAT with full requirements traceability."],
      ["Selenium + TestNG Framework:", "Built an end-to-end Selenium + TestNG + Page Object Model automation suite that cut regression execution time by ~60%."],
      ["Defect Life Cycle Discipline:", "Maintained zero missed closures via JIRA-style workflows and structured Excel defect trackers."],
      ["Backend Data Validation:", "Validated 3 modules end-to-end with 100% accuracy using SQL joins and CRUD verification queries."],
    ],
  },
  {
    role: "B.E in Computer Science Engineering",
    org: "R.L. Jalappa Institute of Technology — VTU",
    period: "2022 – 2026 · 82% aggregate",
    points: [
      ["AI & Systems Focus:", "Concentration on machine learning, computer vision, and software engineering coursework alongside hands-on capstone work."],
      ["Capstone Delivery:", "Led AgriSense from dataset curation through model training, Flask API deployment, and UAT sign-off."],
      ["Cross-Discipline Projects:", "Shipped Sign Language Interpreter and Safe Commute Planner as multi-semester collaborative builds."],
    ],
  },
  {
    role: "Pre-University & 10th Grade",
    org: "Elite PU College · Prerana English Medium HS",
    period: "2018 – 2022",
    points: [
      ["Pre-University:", "Elite Pre-University College — 70%."],
      ["10th Grade:", "Prerana English Medium High School — 75%."],
    ],
  },
];

const STACK = [
  {
    group: "AI & Machine Learning",
    items: [
      ["TensorFlow", "CNN Pipelines"],
      ["Keras", "Model Training"],
      ["OpenCV", "Vision Preprocessing"],
      ["MediaPipe", "Hand Tracking"],
      ["Prompt Engineering", "LLM Workflows"],
    ],
  },
  {
    group: "Testing & QA",
    items: [
      ["Selenium WebDriver", "Automation Core"],
      ["TestNG", "Suite Orchestration"],
      ["Page Object Model", "Framework Design"],
      ["JIRA", "Defect Lifecycle"],
      ["SQL", "Data Validation"],
    ],
  },
  {
    group: "Full-Stack Delivery",
    items: [
      ["React", "Dashboards"],
      ["Flask", "REST APIs"],
      ["Python", "Backend & ML"],
      ["Java", "Core / Automation"],
      ["JavaScript", "Web Clients"],
    ],
  },
  {
    group: "Tools & Infrastructure",
    items: [
      ["Git & GitHub", "Version Control"],
      ["VS Code", "Primary IDE"],
      ["IntelliJ IDEA", "Java / TestNG"],
      ["Postman", "API Verification"],
      ["Excel Trackers", "Defect Reporting"],
    ],
  },
];

/* ---------------- Primitives ---------------- */

function MetaStrip() {
  return (
    <div className="grid grid-cols-1 gap-2 border-b border-border pb-4 text-xs md:grid-cols-3">
      <div className="mono-label">
        <span className="text-foreground/40">URL:</span>{" "}
        <span className="text-foreground">charantallolli.dev</span>
      </div>
      <div className="mono-label md:text-center">
        <span className="text-foreground/40">Location:</span>{" "}
        <span className="text-foreground">Bangalore, IN</span>
      </div>
      <div className="mono-label md:text-right">
        <span className="text-foreground/40">Specialty:</span>{" "}
        <span className="text-foreground">AI &amp; QA Engineering</span>
      </div>
    </div>
  );
}

function MetricCard({ k, label, desc, accent }: { k: string; label: string; desc: string; accent: "blue" | "green" }) {
  const bar = accent === "green" ? "bg-[var(--accent-green)]" : "bg-[var(--accent-blue)]";
  return (
    <div className="relative card-surface p-5">
      <div className={`absolute inset-y-3 left-0 w-[3px] rounded-r ${bar}`} />
      <div className="pl-3">
        <div className="font-display text-3xl font-bold text-[var(--ink)]">{k}</div>
        <div className="mono-label mt-1">{label}</div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

function SectionKicker({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-10">
      <div className="mono-label text-[var(--accent-blue)]">{kicker}</div>
      <h2 className="mt-2 text-3xl font-bold md:text-4xl">{title}</h2>
    </div>
  );
}

/* ---------------- Nav ---------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors ${
        scrolled ? "border-border bg-background/85 backdrop-blur" : "border-transparent bg-background/0"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 font-display text-sm font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-green)] opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-green)]" />
          </span>
          <span>Charan Tallolli</span>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href={resumeAsset.url}
          download="Charan_Tallolli_Resume.docx"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-[var(--ink)] px-3 py-1.5 font-mono text-xs text-primary-foreground transition hover:opacity-90"
        >
          <Download className="h-3.5 w-3.5" /> Resume.docx
        </a>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section id="profile" className="relative pt-10 pb-20">
      <div className="absolute inset-0 -z-10 grid-bg" />
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden card-surface shadow-[0_30px_80px_-40px_rgba(15,23,42,0.25)]"
        >
          {/* top accent bar */}
          <div className="relative h-[3px] w-full overflow-hidden bg-gradient-to-r from-[var(--accent-blue)] via-[var(--accent-blue)] to-[var(--accent-green)]">
            <span className="absolute inset-y-0 left-0 w-1/3 bg-white/40 animate-scan" />
          </div>

          <div className="p-6 md:p-10">
            <MetaStrip />

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
              {/* Left: headline */}
              <div>
                <div className="mono-label text-[var(--accent-blue)]">
                  AI DEVELOPER &amp; SDET ENGINEER
                </div>

                <h1 className="mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
                  Hi, I&apos;m Charan. I build intelligent systems and test them rigorously.
                </h1>

                <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
                  I design CNN-powered vision pipelines, ship Flask APIs, and harden them
                  with Selenium + TestNG automation, SQL data validation, and a disciplined
                  Software Test Life Cycle. I take features from training notebook to a
                  defect-free v1.0 release — and I keep the receipts.
                </p>

                <blockquote className="mt-6 border-l-2 border-[var(--accent-blue)] pl-4 text-sm italic text-foreground/80">
                  &ldquo;Give me an ambiguous AI problem and a strict release deadline, and
                  I will design the system — and the tests that prove it.&rdquo;
                </blockquote>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 rounded-md bg-[var(--ink)] px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                  >
                    Inspect Projects
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
                  >
                    Get In Touch
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Bangalore, India</span>
                  <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> charantallolli@gmail.com</span>
                </div>
              </div>

              {/* Right: metrics */}
              <div className="space-y-4">
                {METRICS.map((m) => (
                  <MetricCard key={m.label} {...m} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Philosophy ---------------- */

function Philosophy() {
  return (
    <section id="philosophy" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionKicker kicker="PRINCIPLES" title="My Engineering Philosophy" />
        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              className="bg-background p-6 transition-colors hover:bg-muted/50"
            >
              <div className="mono-label">
                {p.n} / <span className="text-[var(--accent-blue)]">{p.kicker}</span>
              </div>
              <h3 className="mt-3 text-xl font-bold">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Projects ---------------- */

function Projects() {
  return (
    <section id="projects" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionKicker kicker="SELECTED PROJECTS" title="Core Systems Portfolio" />

        <div className="space-y-6">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="card-surface p-6 md:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md border border-border bg-muted text-2xl">
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold md:text-2xl">{p.title}</h3>
                    <div className="mono-label mt-1">{p.status}</div>
                  </div>
                </div>
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 font-mono text-xs text-foreground transition hover:bg-muted"
                >
                  View Source <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>

              <ul className="mt-5 space-y-3 text-sm">
                {p.bullets.map(([head, rest]) => (
                  <li key={head} className="leading-relaxed">
                    <span className="font-semibold text-foreground">{head}</span>{" "}
                    <span className="text-muted-foreground">{rest}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-border bg-muted px-2.5 py-1 font-mono text-[11px] text-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Experience ---------------- */

function Experience() {
  return (
    <section id="experience" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionKicker kicker="WORK & EDUCATION" title="Production Experience" />
        <div className="space-y-6">
          {EXPERIENCE.map((e, i) => (
            <motion.div
              key={e.role}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="card-surface p-6 md:p-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-bold md:text-xl">{e.role}</h3>
                <span className="mono-label">{e.period}</span>
              </div>
              <div className="mono-label mt-1 text-[var(--accent-blue)]">{e.org}</div>
              <ul className="mt-5 space-y-2.5 text-sm">
                {e.points.map(([head, rest]) => (
                  <li key={head} className="leading-relaxed">
                    <span className="font-semibold text-foreground">{head}</span>{" "}
                    <span className="text-muted-foreground">{rest}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Stack ---------------- */

function Stack() {
  return (
    <section id="stack" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionKicker kicker="EXPERTISE" title="Technical Skills & Tools" />
        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
          {STACK.map((group) => (
            <div key={group.group} className="bg-background p-6">
              <div className="mono-label text-[var(--accent-blue)]">{group.group}</div>
              <ul className="mt-4 space-y-2">
                {group.items.map(([name, desc]) => (
                  <li
                    key={name}
                    className="flex items-baseline justify-between gap-4 border-b border-dashed border-border py-2 last:border-b-0"
                  >
                    <span className="text-sm font-medium text-foreground">{name}</span>
                    <span className="mono-label">{desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */

function Contact() {
  return (
    <section id="contact" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionKicker kicker="CONNECT" title="Initialize Technical Connection" />
        <div className="card-surface p-6 md:p-10">
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            If you&apos;re hiring an SDET who can also ship AI features, or an AI engineer who
            takes test discipline seriously, let&apos;s talk. I&apos;m open to graduate roles
            in QA automation, ML engineering, and full-stack delivery starting 2026.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:charantallolli@gmail.com"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--ink)] px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              <Mail className="h-4 w-4" /> charantallolli@gmail.com
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href="tel:+917899654936"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              +91 78996 54936
            </a>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Charan Tallolli · Built with React &amp; TanStack Start
        </p>
      </div>
    </section>
  );
}

/* ---------------- Page ---------------- */

function Portfolio() {
  return (
    <div id="top" className="relative min-h-screen text-foreground">
      <Nav />
      <main>
        <Hero />
        <Philosophy />
        <Projects />
        <Experience />
        <Stack />
        <Contact />
      </main>
    </div>
  );
}
