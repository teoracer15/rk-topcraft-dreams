import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight, Building2, Hammer, Waves, ClipboardCheck,
  ShieldCheck, MapPin, Languages, Award, Phone, Mail, MessageCircle,
  Menu, X, Plus, Minus, ChevronLeft, ChevronRight,
} from "lucide-react";

import heroVilla from "@/assets/gr/villa-hero.jpg.asset.json";
import v66 from "@/assets/gr/villa-66.jpg.asset.json";
import v133 from "@/assets/gr/villa-133.jpg.asset.json";
import v59 from "@/assets/gr/villa-59.jpg.asset.json";
import v1 from "@/assets/gr/villa-1.jpg.asset.json";
import v2 from "@/assets/gr/villa-2.jpg.asset.json";
import v27 from "@/assets/gr/villa-27.jpg.asset.json";
import v50 from "@/assets/gr/villa-50.jpg.asset.json";
import v65 from "@/assets/gr/villa-65.jpg.asset.json";
import v51 from "@/assets/gr/villa-51.jpg.asset.json";
import v88 from "@/assets/gr/villa-88.jpg.asset.json";
import ronda1 from "@/assets/ronda/ronda-1.jpg.asset.json";
import ronda2 from "@/assets/ronda/ronda-2.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: Home,
});

const PHONE = "699 757 950";
const WA_LINK = "https://wa.me/34699757950?text=Hello%20RK%20Topcraft%2C%20I%27d%20like%20to%20discuss%20a%20project.";

const NAV = [
  { id: "top", label: "Home" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "projects", label: "Projects" },
  { id: "ronda", label: "Ronda" },
  { id: "areas", label: "Areas" },
  { id: "voices", label: "Voices" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

/* ---------- Copy dictionary (translation-ready structure) ---------- */

type Lang = "en" | "es" | "de";
const COPY = {
  en: {
    heroEyebrow: "Construction · Renovation · Costa del Sol",
    heroTitle1: "Build With",
    heroTitle2: "Confidence.",
    heroSub: "Refined construction, renovation and project execution for international homeowners across Marbella, Estepona, Mijas and Benalmádena.",
    ctaVisit: "Request a free site visit",
    ctaWork: "View our work",
  },
  es: {
    heroEyebrow: "Construcción · Reformas · Costa del Sol",
    heroTitle1: "Construya con",
    heroTitle2: "Confianza.",
    heroSub: "Construcción, reformas y ejecución de proyectos de alta gama para propietarios internacionales en Marbella, Estepona, Mijas y Benalmádena.",
    ctaVisit: "Solicite una visita gratuita",
    ctaWork: "Ver nuestros proyectos",
  },
  de: {
    heroEyebrow: "Bau · Renovierung · Costa del Sol",
    heroTitle1: "Bauen mit",
    heroTitle2: "Vertrauen.",
    heroSub: "Erlesene Bau- und Renovierungsarbeiten sowie Projektsteuerung für internationale Eigentümer in Marbella, Estepona, Mijas und Benalmádena.",
    ctaVisit: "Kostenlosen Besichtigungstermin anfragen",
    ctaWork: "Referenzen ansehen",
  },
} as const;

/* ---------- Root ---------- */

function Home() {
  const [lang, setLang] = useState<Lang>("en");
  useReveal();
  return (
    <div className="min-h-screen bg-background text-ink selection:bg-clay selection:text-ivory">
      <Header lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <Marquee />
        <Services />
        <WhyStats />
        <Process />
        <Projects />
        <RondaTeaser />
        <BeforeAfter />
        <AreasMap />
        <Testimonials />
        <FAQ />
        <ContactCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

/* ---------- Reveal on scroll ---------- */

function useReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- Header ---------- */

function useScrollSpy() {
  const [active, setActive] = useState<string>("top");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);
  return { active, scrolled };
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

function Header({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const { active, scrolled } = useScrollSpy();
  const [open, setOpen] = useState(false);
  const solid = scrolled || open;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    scrollTo(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-ivory/85 backdrop-blur-md border-b border-border/70 py-1"
          : "bg-transparent py-2"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
        <a
          href="#top"
          onClick={(e) => handleClick(e, "top")}
          className={`flex flex-col leading-none py-3 transition-colors ${solid ? "text-ink" : "text-ivory"}`}
        >
          <span className="font-serif text-2xl tracking-tight">RK Topcraft</span>
          <span className="text-[0.58rem] tracking-[0.36em] uppercase mt-1 opacity-80">Construction · Est. Costa del Sol</span>
        </a>

        <nav className="hidden lg:flex items-center gap-8 text-[0.68rem] uppercase tracking-[0.24em]">
          {NAV.filter((n) => n.id !== "top").map((n) => {
            const isActive = active === n.id;
            const base = solid ? "text-ink/70 hover:text-ink" : "text-ivory/85 hover:text-ivory";
            const activeCls = solid ? "text-clay" : "text-clay-soft";
            return (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={(e) => handleClick(e, n.id)}
                className={`relative py-2 transition ${isActive ? activeCls : base}`}
              >
                {n.label}
                <span className={`absolute left-0 -bottom-0.5 h-px bg-clay transition-all duration-500 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <LangSwitcher lang={lang} setLang={setLang} solid={solid} />
          <a
            href={WA_LINK}
            target="_blank" rel="noreferrer"
            className={`hidden md:inline-flex items-center gap-2 border px-4 py-2 text-[0.68rem] uppercase tracking-[0.22em] transition ${
              solid
                ? "border-ink/30 text-ink hover:bg-clay hover:border-clay hover:text-ivory"
                : "border-ivory/40 text-ivory hover:bg-clay hover:border-clay"
            }`}
          >
            {PHONE}
          </a>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className={`lg:hidden inline-flex h-10 w-10 items-center justify-center transition-colors ${solid ? "text-ink" : "text-ivory"}`}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`lg:hidden overflow-hidden bg-ivory border-t border-border transition-[max-height,opacity] duration-300 ${open ? "max-h-[640px] opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="flex flex-col divide-y divide-border px-6 py-2">
          {NAV.filter((n) => n.id !== "top").map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={(e) => handleClick(e, n.id)}
              className={`flex items-center justify-between py-4 text-sm uppercase tracking-[0.22em] transition ${active === n.id ? "text-clay" : "text-ink"}`}
            >
              {n.label}
              <ArrowUpRight className="h-4 w-4 opacity-40" />
            </a>
          ))}
          <a href={WA_LINK} target="_blank" rel="noreferrer" className="mt-4 mb-4 inline-flex items-center justify-center gap-2 bg-clay px-5 py-3 text-xs uppercase tracking-[0.22em] text-ivory">
            <MessageCircle className="h-4 w-4" /> WhatsApp {PHONE}
          </a>
        </nav>
      </div>
    </header>
  );
}

function LangSwitcher({ lang, setLang, solid }: { lang: Lang; setLang: (l: Lang) => void; solid: boolean }) {
  const langs: { id: Lang; label: string; flag: string }[] = [
    { id: "en", label: "EN", flag: "🇬🇧" },
    { id: "es", label: "ES", flag: "🇪🇸" },
    { id: "de", label: "DE", flag: "🇩🇪" },
  ];
  return (
    <div className={`hidden md:flex items-center gap-1 text-[0.65rem] tracking-[0.2em] ${solid ? "text-ink/70" : "text-ivory/80"}`}>
      {langs.map((l, i) => (
        <button
          key={l.id}
          onClick={() => setLang(l.id)}
          className={`px-1.5 py-1 transition ${lang === l.id ? "text-clay" : "hover:text-clay"}`}
          aria-label={`Switch to ${l.label}`}
        >
          {l.label}
          {i < langs.length - 1 && <span className="ml-1 opacity-40">/</span>}
        </button>
      ))}
    </div>
  );
}

/* ---------- Hero ---------- */

function Hero({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-teal-deep grain scroll-mt-0">
      <div className="absolute inset-0">
        <img
          src={heroVilla.url}
          alt="Luxury villa on the Costa del Sol built by RK Topcraft"
          className="h-full w-full object-cover opacity-85 animate-kenburns"
        />
      </div>
      {/* Palm-shadow SVG overlay */}
      <div className="pointer-events-none absolute inset-0 animate-palm mix-blend-multiply">
        <svg viewBox="0 0 800 800" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <g fill="#0A3A34" opacity="0.5">
            <path d="M400 100 C 420 250, 500 380, 640 460 C 480 400, 420 480, 400 700 C 380 480, 320 400, 160 460 C 300 380, 380 250, 400 100 Z" />
          </g>
        </svg>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-teal-deep/70 via-teal-deep/25 to-teal-deep/90" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-24 pt-40 md:px-10 md:pb-32">
        <div className="max-w-3xl text-ivory reveal">
          <p className="eyebrow text-clay-soft">{c.heroEyebrow}</p>
          <h1 className="mt-6 font-serif text-6xl leading-[1.02] md:text-8xl">
            {c.heroTitle1}<br />
            <em className="text-clay-soft">{c.heroTitle2}</em>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-ivory/85 md:text-lg">
            {c.heroSub}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 bg-clay px-7 py-4 text-xs font-medium uppercase tracking-[0.24em] text-ivory hover:bg-clay-soft transition">
              {c.ctaVisit}
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#projects" onClick={(e) => { e.preventDefault(); scrollTo("projects"); }} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-ivory border-b border-ivory/50 pb-1 hover:border-clay-soft hover:text-clay-soft transition">
              {c.ctaWork}
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-ivory/20 pt-8 text-ivory/90 md:mt-24 md:grid-cols-4 reveal">
          <HeroStat n="20+" label="Years of experience" />
          <HeroStat n="4" label="Municipalities served" />
          <HeroStat n="3" label="Languages spoken" />
          <HeroStat n="B75276881" label="Licence number" small />
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-ivory/60 text-[0.6rem] tracking-[0.3em] uppercase">
        <span>Scroll</span>
        <span className="h-8 w-px bg-ivory/40 animate-pulse" />
      </div>
    </section>
  );
}

function HeroStat({ n, label, small }: { n: string; label: string; small?: boolean }) {
  return (
    <div>
      <div className={`font-serif ${small ? "text-lg" : "text-3xl md:text-4xl"} text-clay-soft`}>{n}</div>
      <div className="mt-2 text-[0.68rem] uppercase tracking-[0.24em] text-ivory/70">{label}</div>
    </div>
  );
}

/* ---------- Marquee strip ---------- */

function Marquee() {
  const items = ["Marbella", "Estepona", "Mijas", "Benalmádena", "Licensed & Insured", "20+ Years Experience", "English · Spanish · German"];
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className="border-y border-border/60 bg-sand overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee py-4">
        {doubled.map((t, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-8 text-[0.7rem] uppercase tracking-[0.32em] text-ink/70">
            {t}
            <span className="h-1 w-1 rounded-full bg-clay" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Services (expanding panels) ---------- */

const services = [
  { icon: Building2, title: "Luxury Villa Construction", desc: "Turn-key bespoke villas delivered from technical project to keys — phase control, quality assurance, and a single point of responsibility.", img: v66.url, cta: "Start a build" },
  { icon: Hammer, title: "Renovations & Upgrades", desc: "Full and partial reforms for villas, apartments and rental properties — structural work, interiors and finishes held to the same standard.", img: v50.url, cta: "Plan a renovation" },
  { icon: Waves, title: "Pools & Outdoor Living", desc: "Pools, terraces, pergolas and gardens — engineered for the Mediterranean climate and designed for the way you actually live outdoors.", img: v59.url, cta: "Design outdoors" },
  { icon: ClipboardCheck, title: "Project Management", desc: "Licences, permits, architects, engineers and trades coordinated in one plan — with clear reporting, honest budgeting, and no surprises.", img: v27.url, cta: "Manage my project" },
];

function Services() {
  const [active, setActive] = useState(0);
  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32 scroll-mt-24">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end reveal">
        <div>
          <p className="eyebrow">Core Services</p>
          <h2 className="mt-4 font-serif text-5xl leading-tight md:text-6xl">What we build.</h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Four disciplines, one team. Every project is delivered end-to-end so quality, timeline and budget stay in the same hands.
        </p>
      </div>

      {/* Desktop: horizontal expanding panels */}
      <div className="mt-16 hidden lg:flex h-[520px] gap-2 reveal">
        {services.map((s, i) => {
          const isActive = active === i;
          return (
            <button
              key={s.title}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={`group relative overflow-hidden text-left transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? "flex-[3.2]" : "flex-[0.9]"}`}
              aria-expanded={isActive}
            >
              <img src={s.img} alt="" className={`absolute inset-0 h-full w-full object-cover transition duration-700 ${isActive ? "scale-105 opacity-80" : "scale-110 opacity-40 grayscale"}`} />
              <div className={`absolute inset-0 transition ${isActive ? "bg-gradient-to-t from-teal-deep/95 via-teal-deep/40 to-transparent" : "bg-teal-deep/80"}`} />
              <div className="relative z-10 flex h-full flex-col justify-between p-6">
                <div className="flex items-center justify-between">
                  <s.icon className="h-8 w-8 text-clay-soft" strokeWidth={1.25} />
                  <span className="font-serif text-sm text-ivory/70">0{i + 1}</span>
                </div>
                <div>
                  <h3 className={`font-serif leading-tight text-ivory transition-all duration-500 ${isActive ? "text-3xl" : "text-lg [writing-mode:vertical-rl] [transform:rotate(180deg)] whitespace-nowrap"}`}>
                    {s.title}
                  </h3>
                  <div className={`overflow-hidden transition-all duration-500 ${isActive ? "max-h-40 mt-4 opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="text-sm leading-relaxed text-ivory/85 max-w-md">{s.desc}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.24em] text-clay-soft border-b border-clay-soft/50 pb-1">
                      {s.cta} <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile / tablet: stacked cards */}
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
        {services.map((s, i) => (
          <article key={s.title} className="group relative overflow-hidden bg-teal-deep min-h-[340px] reveal">
            <img src={s.img} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45 transition duration-700 group-hover:scale-105 group-hover:opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-deep via-teal-deep/70 to-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-between p-6">
              <div className="flex items-center justify-between">
                <s.icon className="h-8 w-8 text-clay-soft" strokeWidth={1.25} />
                <span className="font-serif text-sm text-ivory/70">0{i + 1}</span>
              </div>
              <div>
                <h3 className="font-serif text-2xl leading-tight text-ivory">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory/80">{s.desc}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------- Why Us — animated stat strip ---------- */

function useCounter(target: number, active: boolean, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setVal(target); return; }
    let raf = 0; const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return val;
}

const pillars = [
  { icon: Award, num: 20, suffix: "+", label: "Years on the coast", note: "Residential and complex works delivered end-to-end." },
  { icon: ShieldCheck, num: 100, suffix: "%", label: "Licensed & insured", note: "Full project responsibility. Licence No. B75276881." },
  { icon: MapPin, num: 4, suffix: "", label: "Costa del Sol areas", note: "Marbella · Estepona · Mijas · Benalmádena." },
  { icon: Languages, num: 3, suffix: "", label: "Languages spoken", note: "English · Spanish · German — full-cycle support." },
];

function WhyStats() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="why" className="border-y border-border/60 bg-ivory">
      <div ref={ref} className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {pillars.map((p, i) => {
            const v = useCounter(p.num, inView, 1400 + i * 150);
            return (
              <div key={p.label} className="reveal flex flex-col gap-4 border-t border-clay/30 pt-6">
                <p.icon className="h-6 w-6 text-clay" strokeWidth={1.25} />
                <div className="font-serif text-6xl leading-none text-teal">
                  {v}<span className="text-clay">{p.suffix}</span>
                </div>
                <p className="text-[0.7rem] uppercase tracking-[0.24em] text-ink">{p.label}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.note}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Process — horizontal timeline ---------- */

const phases = [
  { n: "01", title: "Initial Analysis", desc: "Objectives, needs, budget and plot constraints defined together with the client." },
  { n: "02", title: "Concept Design", desc: "An architectural and constructive proposal adapted to the site and to how you'll live in it." },
  { n: "03", title: "Licences & Permits", desc: "Technical project preparation and coordination of administrative processing to open works." },
  { n: "04", title: "Construction", desc: "Execution with prior planning, quality control and continuous monitoring of progress." },
  { n: "05", title: "Handover", desc: "Final walkthrough, documentation handover and commissioning of every system in the home." },
  { n: "06", title: "Aftercare", desc: "Post-completion follow-up to guarantee the correct condition and functioning of the property." },
];

function Process() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      setProgress(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="process" className="bg-teal grain text-ivory scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 pt-24 md:px-10 md:pt-32">
        <div className="max-w-3xl reveal">
          <p className="eyebrow text-clay-soft">The Process</p>
          <h2 className="mt-4 font-serif text-5xl leading-tight md:text-6xl text-ivory">
            Six phases, one <em className="text-clay-soft">continuous</em> team.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ivory/75">
            From the first plot analysis to aftercare, every phase is coordinated in-house. One point of contact, a single plan, transparent reporting.
          </p>
        </div>
      </div>

      {/* Desktop horizontal scroll-driven */}
      <div ref={trackRef} className="relative hidden lg:block h-[260vh] mt-16">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          <div className="relative w-full">
            <div className="mx-auto max-w-7xl px-10">
              <div className="relative h-1 bg-ivory/15 mb-14">
                <div className="absolute inset-y-0 left-0 bg-clay transition-[width] duration-100" style={{ width: `${progress * 100}%` }} />
              </div>
            </div>
            <div
              className="flex gap-8 pl-10 will-change-transform"
              style={{ transform: `translateX(calc(${-progress * 70}%))` }}
            >
              {phases.map((p, i) => {
                const isActive = progress * phases.length >= i && progress * phases.length < i + 1.2;
                return (
                  <div key={p.n} className={`min-w-[420px] max-w-[420px] p-8 border border-ivory/15 bg-teal-deep/60 transition-all duration-500 ${isActive ? "border-clay/70 -translate-y-2" : ""}`}>
                    <div className={`font-serif text-7xl leading-none transition-colors ${isActive ? "text-clay-soft" : "text-ivory/40"}`}>{p.n}</div>
                    <h3 className="mt-6 font-serif text-3xl text-ivory">{p.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-ivory/70">{p.desc}</p>
                  </div>
                );
              })}
              <div className="min-w-[10vw]" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet vertical stepper */}
      <ol className="lg:hidden mx-auto max-w-3xl px-6 md:px-10 py-16">
        {phases.map((p, i) => (
          <li key={p.n} className="relative flex gap-6 pb-10 reveal">
            {i < phases.length - 1 && <span className="absolute left-[13px] top-8 bottom-0 w-px bg-ivory/20" />}
            <span className="relative z-10 mt-1 h-7 w-7 flex items-center justify-center rounded-full bg-clay text-ivory text-xs font-medium flex-none">{p.n}</span>
            <div>
              <h3 className="font-serif text-2xl text-ivory leading-tight">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory/75">{p.desc}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="h-24" />
    </section>
  );
}

/* ---------- Projects — filterable masonry + lightbox ---------- */

type ProjectCat = "All" | "Villas" | "Renovations" | "Pools & Outdoor";
const projects: { img: string; cat: Exclude<ProjectCat, "All">; title: string; loc: string }[] = [
  { img: v66.url, cat: "Villas", title: "Contemporary Villa", loc: "Marbella" },
  { img: v51.url, cat: "Villas", title: "Villa 51", loc: "Marbella" },
  { img: v1.url, cat: "Villas", title: "Cliffside Residence", loc: "Marbella" },
  { img: v133.url, cat: "Renovations", title: "Vertical Reform", loc: "Marbella" },
  { img: v65.url, cat: "Villas", title: "Detached Villa", loc: "Benalmádena" },
  { img: v27.url, cat: "Renovations", title: "Structural Works", loc: "Marbella" },
  { img: v50.url, cat: "Renovations", title: "Interior Reform", loc: "Mijas" },
  { img: v59.url, cat: "Pools & Outdoor", title: "Terrace & Pool", loc: "Estepona" },
  { img: v2.url, cat: "Pools & Outdoor", title: "Facade & Pool", loc: "Estepona" },
  { img: v88.url, cat: "Villas", title: "Villa Delivery", loc: "Marbella" },
];

function Projects() {
  const cats: ProjectCat[] = ["All", "Villas", "Renovations", "Pools & Outdoor"];
  const [cat, setCat] = useState<ProjectCat>("All");
  const filtered = useMemo(() => cat === "All" ? projects : projects.filter((p) => p.cat === cat), [cat]);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? 0 : (i + 1) % filtered.length));
      if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? 0 : (i - 1 + filtered.length) % filtered.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [lightbox, filtered.length]);

  return (
    <section id="projects" className="border-y border-border bg-sand py-24 md:py-32 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between reveal">
          <div>
            <p className="eyebrow">Selected Work</p>
            <h2 className="mt-4 font-serif text-5xl leading-tight md:text-6xl">
              Homes across the <em>Costa del Sol.</em>
            </h2>
          </div>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-ink border-b border-ink pb-1 hover:text-clay hover:border-clay transition self-start">
            Discuss your project <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-2 reveal">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 text-[0.68rem] uppercase tracking-[0.24em] border transition ${cat === c ? "bg-teal border-teal text-ivory" : "border-ink/25 text-ink/70 hover:border-clay hover:text-clay"}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {filtered.map((p, i) => (
            <figure key={p.title + p.img} className="group relative mb-4 block break-inside-avoid overflow-hidden bg-muted cursor-pointer" onClick={() => setLightbox(i)}>
              <img
                src={p.img}
                alt={`${p.title} — ${p.loc}`}
                loading="lazy"
                className="block w-full h-auto object-cover transition duration-[900ms] group-hover:scale-[1.05]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-4 opacity-0 bg-gradient-to-t from-teal-deep/95 via-teal-deep/40 to-transparent p-5 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-[0.62rem] uppercase tracking-[0.28em] text-clay-soft">{p.cat} · {p.loc}</p>
                <h3 className="mt-1 font-serif text-xl text-ivory">{p.title}</h3>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] bg-teal-deep/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10" onClick={() => setLightbox(null)}>
          <button aria-label="Close" className="absolute top-6 right-6 h-11 w-11 flex items-center justify-center text-ivory hover:text-clay-soft" onClick={() => setLightbox(null)}>
            <X className="h-6 w-6" />
          </button>
          <button aria-label="Previous" className="absolute left-4 md:left-8 h-11 w-11 flex items-center justify-center text-ivory hover:text-clay-soft" onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i === null ? 0 : (i - 1 + filtered.length) % filtered.length)); }}>
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button aria-label="Next" className="absolute right-4 md:right-8 h-11 w-11 flex items-center justify-center text-ivory hover:text-clay-soft" onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i === null ? 0 : (i + 1) % filtered.length)); }}>
            <ChevronRight className="h-8 w-8" />
          </button>
          <figure className="max-w-6xl max-h-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img src={filtered[lightbox].img} alt={filtered[lightbox].title} className="max-h-[80vh] w-auto object-contain" />
            <figcaption className="mt-4 text-center">
              <p className="text-[0.62rem] uppercase tracking-[0.28em] text-clay-soft">{filtered[lightbox].cat} · {filtered[lightbox].loc}</p>
              <h3 className="mt-1 font-serif text-2xl text-ivory">{filtered[lightbox].title}</h3>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}

/* ---------- Before / After ---------- */

function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const wrap = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  const move = (clientX: number) => {
    if (!wrap.current) return;
    const rect = wrap.current.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  useEffect(() => {
    const up = () => (dragging.current = false);
    const mv = (e: MouseEvent) => dragging.current && move(e.clientX);
    const tv = (e: TouchEvent) => dragging.current && e.touches[0] && move(e.touches[0].clientX);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    window.addEventListener("mousemove", mv);
    window.addEventListener("touchmove", tv);
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("touchmove", tv);
    };
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
      <div className="grid gap-14 md:grid-cols-[1fr_1.4fr] md:gap-20 items-center">
        <div className="reveal">
          <p className="eyebrow">Before · After</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
            A renovation, <em>as it changed.</em>
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
            Drag the divider to compare the same interior before and after a full RK Topcraft reform — structure preserved, spatial logic reset, finishes brought forward two decades.
          </p>
          <p className="mt-6 text-[0.68rem] uppercase tracking-[0.24em] text-clay">Drag to compare →</p>
        </div>

        <div
          ref={wrap}
          className="relative aspect-[4/3] w-full overflow-hidden bg-muted select-none touch-none reveal"
          onMouseDown={(e) => { dragging.current = true; move(e.clientX); }}
          onTouchStart={(e) => { dragging.current = true; if (e.touches[0]) move(e.touches[0].clientX); }}
        >
          <img src={v27.url} alt="Before renovation" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
          <img src={v50.url} alt="After renovation" className="absolute inset-0 h-full w-full object-cover" draggable={false} style={{ clipPath: `inset(0 0 0 ${pos}%)` }} />
          {/* Divider */}
          <div className="absolute inset-y-0 w-px bg-ivory pointer-events-none" style={{ left: `${pos}%` }} />
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 bg-clay flex items-center justify-center text-ivory shadow-lg cursor-ew-resize" style={{ left: `${pos}%` }}>
            <ChevronLeft className="h-4 w-4" />
            <ChevronRight className="h-4 w-4 -ml-1" />
          </div>
          <span className="absolute top-3 left-3 bg-teal-deep/70 text-ivory px-2 py-1 text-[0.6rem] uppercase tracking-[0.24em]">Before</span>
          <span className="absolute top-3 right-3 bg-clay text-ivory px-2 py-1 text-[0.6rem] uppercase tracking-[0.24em]">After</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Areas Map ---------- */

const areas = [
  { id: "estepona", name: "Estepona", x: 18, y: 60, note: "Beachfront villas & new builds." },
  { id: "marbella", name: "Marbella", x: 40, y: 55, note: "Luxury residences & reforms." },
  { id: "mijas", name: "Mijas", x: 60, y: 50, note: "Hillside villas & interiors." },
  { id: "benalmadena", name: "Benalmádena", x: 78, y: 52, note: "Detached homes & pools." },
];

function AreasMap() {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <section id="areas" className="bg-ivory border-y border-border/60 py-24 md:py-32 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-3xl reveal">
          <p className="eyebrow">Where we build</p>
          <h2 className="mt-4 font-serif text-5xl leading-tight md:text-6xl">
            The <em>Costa del Sol,</em> end to end.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Four municipalities, one coastline. Local relationships with technicians, town halls and suppliers keep licences, logistics and site work moving.
          </p>
        </div>

        <div className="relative mt-14 aspect-[16/8] w-full border border-border bg-sand overflow-hidden reveal">
          {/* Stylised coastline SVG */}
          <svg viewBox="0 0 100 50" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
            {/* Sea */}
            <defs>
              <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0E4D45" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#0E4D45" stopOpacity="0.25" />
              </linearGradient>
              <pattern id="dots" x="0" y="0" width="2" height="2" patternUnits="userSpaceOnUse">
                <circle cx="0.5" cy="0.5" r="0.15" fill="#0E4D45" opacity="0.25" />
              </pattern>
            </defs>
            {/* Land */}
            <path d="M0,0 L100,0 L100,42 C 85,38 72,44 60,40 C 48,36 34,44 22,40 C 12,36 5,42 0,38 Z" fill="#EFE8DB" />
            <path d="M0,38 C 5,42 12,36 22,40 C 34,44 48,36 60,40 C 72,44 85,38 100,42 L100,50 L0,50 Z" fill="url(#sea)" />
            {/* Coast line */}
            <path d="M0,38 C 5,42 12,36 22,40 C 34,44 48,36 60,40 C 72,44 85,38 100,42" fill="none" stroke="#0E4D45" strokeWidth="0.3" opacity="0.5" />
            {/* Grid texture on land */}
            <rect x="0" y="0" width="100" height="42" fill="url(#dots)" />
          </svg>

          {areas.map((a) => (
            <button
              key={a.id}
              onMouseEnter={() => setHover(a.id)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(a.id)}
              onBlur={() => setHover(null)}
              className="absolute -translate-x-1/2 -translate-y-full group"
              style={{ left: `${a.x}%`, top: `${a.y}%` }}
              aria-label={a.name}
            >
              <span className="relative flex flex-col items-center">
                <span className={`h-3 w-3 rounded-full bg-clay ring-4 ring-clay/25 transition-all ${hover === a.id ? "scale-125 ring-clay/40" : ""}`} />
                <span className={`mt-2 text-[0.65rem] uppercase tracking-[0.24em] transition ${hover === a.id ? "text-clay" : "text-ink/70"}`}>{a.name}</span>
                <span className={`absolute bottom-full mb-3 w-52 -translate-y-1 bg-teal text-ivory p-3 text-left transition-all duration-300 pointer-events-none ${hover === a.id ? "opacity-100 translate-y-0" : "opacity-0"}`}>
                  <span className="block font-serif text-base">{a.name}</span>
                  <span className="block mt-1 text-[0.7rem] text-ivory/80 leading-relaxed">{a.note}</span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */

const testimonials = [
  { q: "Impressive construction work. The finishes and attention to detail exceeded our expectations. Highly recommended for anyone building on the coast.", who: "Laura Martínez", role: "Homeowner · Marbella" },
  { q: "Great communication throughout, honest budgeting, and unbeatable final results. The project ran on the timeline we agreed at the start.", who: "Javier Rodríguez", role: "Property investor · Estepona" },
  { q: "They coordinated everything — architects, permits, trades. As an overseas owner, that single point of contact made the difference.", who: "Michael Weber", role: "Overseas client · Mijas" },
];

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % testimonials.length), 6500);
    return () => clearInterval(id);
  }, []);
  return (
    <section id="voices" className="relative bg-teal-deep grain text-ivory py-24 md:py-32 scroll-mt-24 overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 md:px-10 text-center reveal">
        <p className="eyebrow text-clay-soft">Voices</p>
        <div className="relative mt-10 min-h-[240px]">
          {testimonials.map((t, idx) => (
            <blockquote
              key={t.who}
              className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${idx === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
            >
              <p className="font-serif text-2xl leading-snug md:text-4xl italic">
                “{t.q}”
              </p>
              <footer className="mt-8 text-[0.7rem] uppercase tracking-[0.28em] text-clay-soft">
                {t.who} <span className="text-ivory/50">— {t.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
        <div className="mt-16 flex items-center justify-center gap-3">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-1 transition-all ${idx === i ? "w-10 bg-clay" : "w-4 bg-ivory/30 hover:bg-ivory/60"}`}
              aria-label={`Testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

const faqs = [
  { q: "Where does RK Topcraft operate on the Costa del Sol?", a: "Across the whole Costa del Sol, with concentration in Marbella, Estepona, Mijas and Benalmádena. We adapt to the conditions of each plot and municipality." },
  { q: "What types of homes do you build?", a: "Bespoke single-family villas and residential reforms, always from a properly defined technical project — including complex works, structural interventions and full finishing packages." },
  { q: "Do you handle licences and permits?", a: "Yes. We coordinate the preparation of documentation and the administrative follow-up needed to obtain licences, working with the responsible technicians." },
  { q: "Do you work with overseas clients remotely?", a: "Regularly. We provide English, Spanish and German communication, weekly written progress reports and video walkthroughs so you can follow the build from abroad." },
  { q: "How long does a villa build typically take?", a: "From licence in hand to keys, most bespoke villas run 14–20 months depending on scale and finishing level. Reforms range from a few weeks to several months." },
  { q: "Do I need to already own a plot?", a: "No. We can help you search, evaluate and assess the viability of a plot on the Costa del Sol before the construction project begins." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-t border-border bg-ivory py-24 md:py-32 scroll-mt-24">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <div className="max-w-3xl reveal">
          <p className="eyebrow">Frequently Asked</p>
          <h2 className="mt-4 font-serif text-5xl leading-tight md:text-6xl">
            Building on the coast — <em>answered.</em>
          </h2>
        </div>

        <ul className="mt-14 divide-y divide-border border-y border-border reveal">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-8 py-6 text-left transition hover:text-clay"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-xl leading-snug text-ink md:text-2xl">{f.q}</span>
                  <span className="mt-1 flex-none text-clay">
                    {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </span>
                </button>
                <div className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Contact CTA (with form) ---------- */

function ContactCTA() {
  const [form, setForm] = useState({ name: "", email: "", type: "Villa Construction", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello RK Topcraft,\n\nName: ${form.name}\nEmail: ${form.email}\nProject: ${form.type}\n\n${form.message}`
    );
    window.open(`https://wa.me/34699757950?text=${text}`, "_blank");
    setSent(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-teal grain text-ivory scroll-mt-24">
      {/* Palm-frond graphic */}
      <svg className="absolute -right-20 -top-20 h-[500px] w-[500px] text-clay/15 pointer-events-none" viewBox="0 0 200 200" fill="currentColor" aria-hidden>
        <path d="M100 20 C 110 60, 140 90, 180 100 C 140 100, 110 130, 100 180 C 90 130, 60 100, 20 100 C 60 90, 90 60, 100 20 Z" />
      </svg>

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-[1.2fr_1fr] md:px-10 md:py-32">
        <div className="reveal">
          <p className="eyebrow text-clay-soft">Start a project</p>
          <h2 className="mt-6 font-serif text-5xl leading-[1.05] md:text-7xl text-ivory">
            Planning a build or renovation on the <em className="text-clay-soft">Costa del Sol?</em>
          </h2>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-ivory/80">
            Request a free site visit. We'll walk the property, understand your intent, and come back with a clear scope and an honest indicative budget.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-clay px-7 py-4 text-xs uppercase tracking-[0.24em] text-ivory hover:bg-clay-soft transition">
              <MessageCircle className="h-4 w-4" /> WhatsApp {PHONE}
            </a>
            <a href={`tel:+34${PHONE.replace(/\s/g, "")}`} className="inline-flex items-center gap-3 border border-ivory/40 px-7 py-4 text-xs uppercase tracking-[0.24em] text-ivory hover:bg-ivory hover:text-teal transition">
              <Phone className="h-4 w-4" /> Call {PHONE}
            </a>
          </div>

          <dl className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm max-w-md">
            <ContactRow icon={Mail} label="Email" value="info@rktopcraft.com" />
            <ContactRow icon={MapPin} label="Coverage" value="Marbella · Estepona · Mijas · Benalmádena" />
            <ContactRow icon={Languages} label="Languages" value="English · Spanish · German" />
            <ContactRow icon={ShieldCheck} label="Licence" value="B75276881" />
          </dl>
        </div>

        <form onSubmit={submit} className="relative bg-ivory text-ink p-8 md:p-10 reveal">
          <h3 className="font-serif text-2xl">Tell us about your project</h3>
          <p className="mt-2 text-sm text-muted-foreground">We reply within one working day.</p>

          <div className="mt-8 space-y-5">
            <Field label="Name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} required />
            <Field label="Email" type="email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} required />
            <div>
              <label className="text-[0.65rem] uppercase tracking-[0.24em] text-ink/70">Project type</label>
              <select
                value={form.type}
                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                className="mt-2 w-full border border-border bg-ivory px-3 py-3 text-sm focus:border-clay focus:outline-none"
              >
                <option>Villa Construction</option>
                <option>Renovation</option>
                <option>Pool & Outdoor</option>
                <option>Project Management</option>
                <option>Plot search & feasibility</option>
              </select>
            </div>
            <div>
              <label className="text-[0.65rem] uppercase tracking-[0.24em] text-ink/70">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                rows={4}
                className="mt-2 w-full border border-border bg-ivory px-3 py-3 text-sm focus:border-clay focus:outline-none resize-none"
                placeholder="Location, timeline, plot info…"
              />
            </div>
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-clay px-6 py-4 text-xs uppercase tracking-[0.24em] text-ivory hover:bg-teal transition">
              {sent ? "Opened in WhatsApp — thanks!" : "Send via WhatsApp"} <ArrowUpRight className="h-4 w-4" />
            </button>
            <p className="text-[0.65rem] text-muted-foreground text-center">Your message opens WhatsApp with your details pre-filled.</p>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, required, type = "text" }: { label: string; value: string; onChange: (v: string) => void; required?: boolean; type?: string }) {
  return (
    <div>
      <label className="text-[0.65rem] uppercase tracking-[0.24em] text-ink/70">{label}{required && <span className="text-clay">*</span>}</label>
      <input
        type={type} value={value} required={required} maxLength={200}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border border-border bg-ivory px-3 py-3 text-sm focus:border-clay focus:outline-none"
      />
    </div>
  );
}

function ContactRow({ icon: Icon, label, value }: { icon: typeof Phone; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <Icon className="mt-1 h-4 w-4 flex-none text-clay-soft" strokeWidth={1.5} />
      <div>
        <dt className="text-[0.62rem] uppercase tracking-[0.24em] text-ivory/60">{label}</dt>
        <dd className="mt-1 text-ivory text-sm">{value}</dd>
      </div>
    </div>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="bg-teal-deep text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <div className="flex flex-col leading-none">
            <span className="font-serif text-3xl">RK Topcraft</span>
            <span className="text-[0.6rem] tracking-[0.36em] uppercase mt-1 opacity-70">Construction · Costa del Sol</span>
          </div>
          <p className="mt-6 text-sm text-ivory/70 max-w-md leading-relaxed">
            Refined construction and renovation for international homeowners across the Costa del Sol. Twenty years of quiet, precise delivery.
          </p>
          <div className="mt-6 flex items-center gap-3 text-lg">
            <span title="English">🇬🇧</span>
            <span title="Español">🇪🇸</span>
            <span title="Deutsch">🇩🇪</span>
          </div>
        </div>

        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-clay-soft">Areas</p>
          <ul className="mt-4 space-y-2 text-sm text-ivory/80">
            <li>Marbella</li><li>Estepona</li><li>Mijas</li><li>Benalmádena</li>
          </ul>
        </div>

        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-clay-soft">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-ivory/80">
            <li><a href={`tel:+34${PHONE.replace(/\s/g, "")}`} className="hover:text-clay-soft transition">{PHONE}</a></li>
            <li><a href={WA_LINK} target="_blank" rel="noreferrer" className="hover:text-clay-soft transition">WhatsApp</a></li>
            <li><a href="mailto:info@rktopcraft.com" className="hover:text-clay-soft transition">info@rktopcraft.com</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-10 text-[0.68rem] uppercase tracking-[0.22em] text-ivory/50">
          <span>© {new Date().getFullYear()} RK Topcraft Construction · Licence No. B75276881</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-clay-soft">Legal</a>
            <a href="#" className="hover:text-clay-soft">Privacy</a>
            <a href="#" className="hover:text-clay-soft">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Floating WhatsApp ---------- */

function FloatingWhatsApp() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className={`fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-clay text-ivory flex items-center justify-center shadow-lg animate-softpulse transition-all duration-500 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
