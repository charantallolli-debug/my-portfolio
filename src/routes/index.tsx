import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, Suspense } from "react";
import resumeAsset from "@/assets/resume.docx.asset.json";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import {
  Download, Mail, Github, Linkedin, Phone, MapPin, ExternalLink,
  Code2, Brain, TestTube2, Layers, Sparkles, ArrowRight, Calendar,
  Award, Trophy, GraduationCap, Briefcase, ChevronRight,
} from "lucide-react";
import * as THREE from "three";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Charan Tallolli — AI Developer, SDET & Full-Stack" },
      { name: "description", content: "Premium portfolio of Charan Tallolli: AI/ML developer, automation test engineer (Selenium, TestNG) and full-stack engineer." },
      { property: "og:title", content: "Charan Tallolli — AI Developer & SDET" },
      { property: "og:description", content: "AI, ML, Software Testing & Full-Stack portfolio." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

/* ---------------- 3D scene ---------------- */
function HeroOrb() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.2;
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <Sphere ref={mesh} args={[1.4, 96, 96]}>
        <MeshDistortMaterial
          color="#8b5cf6"
          attach="material"
          distort={0.45}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          emissive="#4f46e5"
          emissiveIntensity={0.4}
        />
      </Sphere>
      <Sphere args={[1.85, 64, 64]}>
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.15} />
      </Sphere>
    </Float>
  );
}

function HeroScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#a78bfa" />
      <pointLight position={[-10, -5, -10]} intensity={0.8} color="#22d3ee" />
      <Suspense fallback={null}>
        <HeroOrb />
        <Stars radius={50} depth={50} count={2500} factor={3} fade speed={1} />
      </Suspense>
    </Canvas>
  );
}

/* ---------------- helpers ---------------- */
function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}

function SectionTitle({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mb-14 text-center"
    >
      <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <Sparkles className="h-3 w-3" /> {kicker}
      </div>
      <h2 className="mt-5 text-4xl font-semibold md:text-6xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle && <p className="mx-auto mt-4 max-w-2xl text-balance text-muted-foreground">{subtitle}</p>}
    </motion.div>
  );
}

/* ---------------- Nav ---------------- */
const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed inset-x-0 top-4 z-50 mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all ${
        scrolled ? "glass-strong" : "glass"
      }`}
      style={{ width: "calc(100% - 2rem)" }}
    >
      <a href="#top" className="flex items-center gap-2 font-display text-sm font-semibold">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[oklch(0.7_0.2_265)] via-[oklch(0.7_0.22_310)] to-[oklch(0.85_0.16_210)] text-primary-foreground shadow-[0_0_20px_-2px_oklch(0.7_0.22_310/0.7)]">
          CT
        </span>
        <span className="hidden sm:inline">Charan Tallolli</span>
      </a>
      <nav className="hidden items-center gap-1 md:flex">
        {NAV.map((n) => (
          <a key={n.id} href={`#${n.id}`} className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground">
            {n.label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}

/* ---------------- Hero ---------------- */
const ROLES = ["AI Developer", "Machine Learning Engineer", "Automation Test Engineer", "Full-Stack Developer"];

function Hero() {
  const [i, setI] = useState(0);
  const mounted = useMounted();
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % ROLES.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-28">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />
      <div className="container relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-muted-foreground">Available for SDET & AI roles · 2026 Grad</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-5xl font-semibold leading-[1.05] md:text-7xl"
          >
            <span className="block">Charan</span>
            <span className="block text-gradient">Tallolli</span>
          </motion.h1>

          <div className="mt-6 flex h-10 items-center gap-3 text-lg md:text-xl">
            <span className="font-mono text-[oklch(0.85_0.16_210)]">{">"}</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={ROLES[i]}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4 }}
                className="font-display font-medium"
              >
                {ROLES[i]}
              </motion.span>
            </AnimatePresence>
            <span className="ml-1 inline-block h-5 w-0.5 animate-pulse bg-foreground" />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 max-w-xl text-muted-foreground"
          >
            Computer Science Engineering student (B.E, 82%) building intelligent systems —
            from CNN-powered crop disease detection to Selenium automation frameworks that
            cut regression time by ~60%.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href={resumeAsset.url} download="Charan_Tallolli_Resume.docx" target="_blank" rel="noopener" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.7_0.2_265)] via-[oklch(0.7_0.22_310)] to-[oklch(0.85_0.16_210)] px-5 py-3 text-sm font-medium text-primary-foreground shadow-[0_10px_40px_-10px_oklch(0.7_0.22_310/0.8)] transition hover:scale-[1.03]">
              <Download className="h-4 w-4" /> Download Resume
            </a>
            <a href="#projects" className="group inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-medium transition hover:bg-white/10">
              View Projects <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-muted-foreground transition hover:text-foreground">
              Contact Me
            </a>
          </motion.div>

          <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> Bangalore, India</div>
            <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> charantallolli@gmail.com</div>
          </div>
        </div>

        <div className="relative h-[420px] md:h-[560px]">
          <div className="absolute inset-0 rounded-3xl glass-strong overflow-hidden animate-pulse-glow">
            {mounted && <HeroScene />}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
            <div className="pointer-events-none absolute left-4 top-4 rounded-full glass px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              ai.core // online
            </div>
            <div className="pointer-events-none absolute right-4 bottom-4 rounded-full glass px-3 py-1 text-[10px] font-mono text-muted-foreground">
              v2026.0
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */
const TIMELINE = [
  { y: "2020", t: "10th Grade", d: "Prerana English Medium High School — 75%" },
  { y: "2022", t: "Pre-University", d: "Elite Pre-University College — 70%" },
  { y: "2026", t: "SDET Trainee", d: "QSpiders, Rajajinagar — Selenium, TestNG, POM" },
  { y: "2026", t: "B.E Computer Science", d: "R.L. Jalappa Institute of Technology (VTU) — 82%" },
];

function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionTitle kicker="About" title="The engineer behind the code" subtitle="A detail-oriented builder bridging AI experimentation and rigorous software testing." />
        <div className="grid gap-6 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8 lg:col-span-2"
          >
            <GraduationCap className="h-8 w-8 text-[oklch(0.85_0.16_210)]" />
            <h3 className="mt-4 text-2xl font-semibold">Career Objective</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Detail-oriented CSE student with hands-on SDET training in Manual & Automation Testing
              (Selenium WebDriver + Core Java), SQL-based data validation, and structured defect management
              via JIRA. Experienced across the full STLC — from test plan design through Smoke, Regression,
              SIT, and UAT execution — and in building Page Object Model frameworks with TestNG.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[{ k: "82%", v: "B.E Score" }, { k: "2026", v: "Graduating" }, { k: "50+", v: "Test Cases" }].map((s) => (
                <div key={s.v} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                  <div className="text-xl font-semibold text-gradient">{s.k}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8 lg:col-span-3"
          >
            <h3 className="text-2xl font-semibold">Learning journey</h3>
            <div className="mt-6 space-y-5">
              {TIMELINE.map((item, idx) => (
                <motion.div
                  key={item.y}
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="relative flex gap-4 pl-6"
                >
                  <span className="absolute left-0 top-2 h-3 w-3 rounded-full bg-gradient-to-br from-[oklch(0.7_0.2_265)] to-[oklch(0.7_0.22_310)] shadow-[0_0_12px_oklch(0.7_0.22_310/0.8)]" />
                  {idx < TIMELINE.length - 1 && <span className="absolute left-[5px] top-5 h-full w-px bg-gradient-to-b from-white/20 to-transparent" />}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-mono text-xs text-[oklch(0.85_0.16_210)] shrink-0">{item.y}</span>
                      <h4 className="font-medium">{item.t}</h4>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{item.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Skills ---------------- */
const SKILLS = [
  { n: "Python", c: "from-blue-400 to-cyan-400" },
  { n: "Java", c: "from-orange-400 to-red-400" },
  { n: "SQL", c: "from-sky-400 to-indigo-400" },
  { n: "Selenium", c: "from-emerald-400 to-teal-400" },
  { n: "TestNG", c: "from-red-400 to-pink-400" },
  { n: "TensorFlow", c: "from-amber-400 to-orange-500" },
  { n: "Keras", c: "from-rose-400 to-pink-500" },
  { n: "OpenCV", c: "from-lime-400 to-emerald-500" },
  { n: "MediaPipe", c: "from-violet-400 to-purple-500" },
  { n: "Flask", c: "from-zinc-300 to-zinc-500" },
  { n: "React", c: "from-cyan-400 to-blue-500" },
  { n: "JavaScript", c: "from-yellow-300 to-amber-500" },
  { n: "HTML & CSS", c: "from-orange-400 to-pink-400" },
  { n: "Git & GitHub", c: "from-fuchsia-400 to-purple-500" },
  { n: "JIRA", c: "from-blue-500 to-indigo-500" },
  { n: "Prompt Engineering", c: "from-purple-400 to-fuchsia-500" },
];

function Skills() {
  return (
    <section id="skills" className="relative py-28">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionTitle kicker="Stack" title="Skills & tools" subtitle="A toolkit spanning AI, automation testing, and full-stack delivery." />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {SKILLS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20, rotateX: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
              whileHover={{ y: -6, rotateX: 8, rotateY: 8 }}
              style={{ transformStyle: "preserve-3d", perspective: 800 }}
              className="group relative overflow-hidden rounded-2xl glass p-5 text-center"
            >
              <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${s.c} opacity-0 blur-2xl transition group-hover:opacity-30`} />
              <div className={`mx-auto mb-3 h-10 w-10 rounded-xl bg-gradient-to-br ${s.c} opacity-90 shadow-lg`} />
              <div className="font-medium">{s.n}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Projects ---------------- */
const PROJECTS = [
  {
    title: "AgriSense — AI Crop Disease Detection",
    tag: "AI · Computer Vision · Flask",
    accent: "from-emerald-400 to-cyan-400",
    desc: "CNN-powered multi-crop disease prediction with OpenCV preprocessing, deployed via a Flask REST API. 94% model accuracy across 5 crop types with zero false-negative critical alerts.",
    bullets: ["TensorFlow / Keras CNN", "OpenCV image processing", "Flask REST API", "30+ UAT cases passing"],
  },
  {
    title: "Real-Time Sign Language Interpreter",
    tag: "AI · MediaPipe · Speech",
    accent: "from-violet-400 to-fuchsia-500",
    desc: "Real-time hand-tracking and gesture classifier translating 26 sign classes into text and speech. 96% reliability across a 200-sample sanity suite.",
    bullets: ["MediaPipe hand tracking", "CNN gesture classifier", "Text + speech output", "Live webcam pipeline"],
  },
  {
    title: "Safe Commute Planner",
    tag: "Full-Stack · React · Python",
    accent: "from-sky-400 to-indigo-500",
    desc: "Cross-browser web app for safer route planning. Delivered defect-free v1.0 across 4 browsers with zero P1 defects at launch via Selenium-driven regression and SIT cycles.",
    bullets: ["React + Python backend", "Selenium cross-browser", "SQL data validation", "SIT & regression cycles"],
  },
];

function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionTitle kicker="Work" title="Featured projects" subtitle="Shipped, tested, and measured — each built with both a developer's and a QA's eye." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl glass p-6"
            >
              <div className={`absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br ${p.accent} opacity-20 blur-3xl transition group-hover:opacity-40`} />
              <div className="flex items-start justify-between">
                <span className={`inline-block rounded-full bg-gradient-to-r ${p.accent} bg-clip-text text-xs font-mono text-transparent`}>
                  {p.tag}
                </span>
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold leading-tight">{p.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
              <ul className="mt-4 space-y-1.5">
                {p.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ChevronRight className="h-3 w-3 text-[oklch(0.85_0.16_210)]" /> {b}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex gap-2">
                <a href="https://github.com/" target="_blank" rel="noreferrer" className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full glass px-3 py-2 text-xs font-medium transition hover:bg-white/10">
                  <Github className="h-3.5 w-3.5" /> Code
                </a>
                <a href="#" className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[oklch(0.7_0.2_265)] to-[oklch(0.7_0.22_310)] px-3 py-2 text-xs font-medium text-primary-foreground transition hover:opacity-90">
                  <ExternalLink className="h-3.5 w-3.5" /> Demo
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Experience ---------------- */
const STATS = [
  { v: "50+", l: "Test cases authored", icon: TestTube2 },
  { v: "60%", l: "Regression time saved", icon: Sparkles },
  { v: "94%", l: "Model accuracy", icon: Brain },
  { v: "100%", l: "Data validation pass", icon: Code2 },
];

function Counter({ value }: { value: string }) {
  const [n, setN] = useState(0);
  const num = parseInt(value);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (isNaN(num)) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let s = 0;
        const inc = num / 40;
        const t = setInterval(() => {
          s += inc;
          if (s >= num) { setN(num); clearInterval(t); } else setN(Math.floor(s));
        }, 30);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [num]);
  return <span ref={ref}>{isNaN(num) ? value : n + value.replace(/\d+/, "")}</span>;
}

function Experience() {
  return (
    <section id="experience" className="relative py-28">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionTitle kicker="Experience" title="Where I've shipped quality" />
        <div className="grid gap-6 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8 lg:col-span-3"
          >
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.7_0.2_265)] to-[oklch(0.7_0.22_310)] shadow-[0_0_24px_-4px_oklch(0.7_0.22_310/0.8)]">
                <Briefcase className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-semibold">SDET Trainee · QSpiders</h3>
                  <span className="font-mono text-xs text-muted-foreground">2024 — 2025</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Rajajinagar, Bangalore · Software Testing Automation with AI</p>
              </div>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {[
                "Designed and executed 50+ manual test cases across Smoke, Sanity, Regression, SIT & UAT — full requirements traceability via structured STLC.",
                "Built an end-to-end Selenium + TestNG + POM automation suite, cutting regression execution time by ~60%.",
                "Maintained a structured Defect Life Cycle with zero missed closures via JIRA-style workflows and Excel trackers.",
                "Validated backend data integrity across 3 modules with 100% accuracy using SQL joins and CRUD validation.",
              ].map((t) => (
                <li key={t} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[oklch(0.85_0.16_210)]" />{t}</li>
              ))}
            </ul>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 lg:col-span-2">
            {STATS.map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-5"
              >
                <s.icon className="h-5 w-5 text-[oklch(0.85_0.16_210)]" />
                <div className="mt-3 text-3xl font-semibold text-gradient"><Counter value={s.v} /></div>
                <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Achievements / Certs ---------------- */
const ACHIEVEMENTS = [
  { icon: Trophy, t: "SDET Certification", d: "QSpiders — Selenium + Core Java", c: "from-amber-400 to-orange-500" },
  { icon: Award, t: "AgriSense v1.0", d: "Defect-free release, 30+ UAT criteria passed", c: "from-emerald-400 to-teal-500" },
  { icon: Brain, t: "AI Project Excellence", d: "94% CNN accuracy across 5 crops", c: "from-violet-400 to-fuchsia-500" },
  { icon: Code2, t: "LeetCode & HackerRank", d: "Active problem solver — DSA & SQL", c: "from-sky-400 to-indigo-500" },
  { icon: Layers, t: "Cross-browser QA", d: "Zero P1 defects at Safe Commute launch", c: "from-rose-400 to-pink-500" },
  { icon: Sparkles, t: "Prompt Engineering", d: "AI-assisted test generation workflows", c: "from-cyan-400 to-blue-500" },
];

function Achievements() {
  return (
    <section id="achievements" className="relative py-28">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionTitle kicker="Recognition" title="Achievements & certifications" subtitle="Milestones across testing, AI engineering, and competitive coding." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.t}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ rotateY: 6, rotateX: -3, y: -4 }}
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
              className="group relative overflow-hidden rounded-2xl glass p-6"
            >
              <div className={`absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br ${a.c} opacity-20 blur-2xl transition group-hover:opacity-50`} />
              <div className={`mb-4 inline-grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${a.c} shadow-lg`}>
                <a.icon className="h-5 w-5 text-white" />
              </div>
              <h4 className="font-semibold">{a.t}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{a.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
function Contact() {
  return (
    <section id="contact" className="relative py-28">
      <div className="container mx-auto max-w-5xl px-6">
        <SectionTitle kicker="Get in touch" title="Let's build something" subtitle="Open to SDET, AI/ML engineering, and full-stack opportunities." />
        <div className="grid gap-6 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="glass rounded-3xl p-8 lg:col-span-2"
          >
            <h3 className="text-xl font-semibold">Contact info</h3>
            <div className="mt-6 space-y-4 text-sm">
              {[
                { Icon: Mail, l: "charantallolli@gmail.com", h: "mailto:charantallolli@gmail.com" },
                { Icon: Phone, l: "+91 7899654936", h: "tel:+917899654936" },
                { Icon: MapPin, l: "Bangalore, India", h: "#" },
                { Icon: Github, l: "github.com/charantallolli", h: "https://github.com/" },
                { Icon: Linkedin, l: "linkedin.com/in/charantallolli", h: "https://linkedin.com/" },
              ].map(({ Icon, l, h }) => (
                <a key={l} href={h} target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition hover:border-white/15 hover:bg-white/[0.05]">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-[oklch(0.7_0.2_265)] to-[oklch(0.7_0.22_310)] text-primary-foreground transition group-hover:scale-110">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="truncate">{l}</span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            onSubmit={(e) => { e.preventDefault(); window.location.href = "mailto:charantallolli@gmail.com"; }}
            className="glass-strong rounded-3xl p-8 lg:col-span-3"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">Name</span>
                <input required className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition focus:border-[oklch(0.7_0.22_310)] focus:bg-white/[0.06]" placeholder="Your name" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">Email</span>
                <input required type="email" className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition focus:border-[oklch(0.7_0.22_310)] focus:bg-white/[0.06]" placeholder="you@company.com" />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">Message</span>
              <textarea required rows={5} className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition focus:border-[oklch(0.7_0.22_310)] focus:bg-white/[0.06]" placeholder="Tell me about the role or project…" />
            </label>
            <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[oklch(0.7_0.2_265)] via-[oklch(0.7_0.22_310)] to-[oklch(0.85_0.16_210)] py-3 text-sm font-medium text-primary-foreground shadow-[0_10px_40px_-10px_oklch(0.7_0.22_310/0.8)] transition hover:scale-[1.01]">
              Send message <ArrowRight className="h-4 w-4" />
            </button>
          </motion.form>
        </div>

        <p className="mt-12 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Charan Tallolli · Built with React, Three.js & Framer Motion
        </p>
      </div>
    </section>
  );
}

/* ---------------- Page ---------------- */
function Portfolio() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div className="relative min-h-screen text-foreground">
      <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-[oklch(0.7_0.2_265)] via-[oklch(0.7_0.22_310)] to-[oklch(0.85_0.16_210)]" />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Contact />
      </main>
    </div>
  );
}
