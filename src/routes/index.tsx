import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowUpRight, Building2, Hammer, Waves, ClipboardCheck,
  ShieldCheck, MapPin, Languages, Award, Phone, Mail, MessageCircle,
  Menu, X, Plus, Minus,
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

export const Route = createFileRoute("/")({
  component: Home,
});

const PHONE = "699 757 950";
const WA_LINK = "https://wa.me/34699757950";

const NAV = [
  { id: "top", label: "Home" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "process", label: "Process" },
  { id: "why", label: "Approach" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

function Home() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <Header />
      <main>
        <Hero />
        <IntroStrip />
        <Services />
        <Projects />
        <Process />
        <WhyUs />
        <FAQ />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}

/* ------------------------------ HEADER ------------------------------ */

function useScrollSpy() {
  const [active, setActive] = useState<string>("top");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return { active, scrolled };
}

function Header() {
  const { active, scrolled } = useScrollSpy();
  const [open, setOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-background/95 backdrop-blur border-b border-border shadow-[0_1px_20px_rgba(0,0,0,0.04)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 md:py-5">
        <a
          href="#top"
          onClick={(e) => handleClick(e, "top")}
          className={`flex flex-col leading-none transition-colors ${solid ? "text-ink" : "text-primary-foreground"}`}
        >
          <span className="font-serif text-2xl tracking-tight">RK</span>
          <span className="text-[0.6rem] tracking-[0.32em] uppercase mt-0.5 opacity-90">Topcraft</span>
        </a>

        <nav className="hidden lg:flex items-center gap-9 text-[0.7rem] uppercase tracking-[0.24em]">
          {NAV.filter((n) => n.id !== "top").map((n) => {
            const isActive = active === n.id;
            const base = solid ? "text-ink/70 hover:text-ink" : "text-primary-foreground/85 hover:text-primary-foreground";
            const activeCls = solid ? "text-ink" : "text-gold-soft";
            return (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={(e) => handleClick(e, n.id)}
                className={`relative py-2 transition ${isActive ? activeCls : base}`}
              >
                {n.label}
                <span
                  className={`absolute left-0 -bottom-0.5 h-px bg-gold transition-all duration-300 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={WA_LINK}
            className={`hidden md:inline-flex items-center gap-2 border px-4 py-2 text-[0.7rem] uppercase tracking-[0.2em] transition ${
              solid
                ? "border-ink/30 text-ink hover:bg-ink hover:text-primary-foreground"
                : "border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-ink"
            }`}
          >
            {PHONE}
          </a>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className={`lg:hidden inline-flex h-10 w-10 items-center justify-center transition-colors ${
              solid ? "text-ink" : "text-primary-foreground"
            }`}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden bg-background border-t border-border transition-[max-height,opacity] duration-300 ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col divide-y divide-border px-6 py-2">
          {NAV.filter((n) => n.id !== "top").map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={(e) => handleClick(e, n.id)}
              className={`flex items-center justify-between py-4 text-sm uppercase tracking-[0.22em] transition ${
                active === n.id ? "text-gold" : "text-ink"
              }`}
            >
              {n.label}
              <ArrowUpRight className="h-4 w-4 opacity-40" />
            </a>
          ))}
          <a
            href={WA_LINK}
            className="mt-4 mb-4 inline-flex items-center justify-center gap-2 bg-gold px-5 py-3 text-xs uppercase tracking-[0.22em] text-ink"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp {PHONE}
          </a>
        </nav>
      </div>
    </header>
  );
}

/* ------------------------------ HERO ------------------------------ */

function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-ink scroll-mt-0">
      <img
        src={heroVilla.url}
        alt="Luxury villa build in Marbella by RK Topcraft"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/35 to-ink/85" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-24 pt-40 md:px-10 md:pb-32">
        <div className="max-w-3xl text-primary-foreground">
          <p className="eyebrow text-gold-soft">Construction &amp; Renovation · Costa del Sol</p>
          <h1 className="mt-6 font-serif text-6xl leading-[1.02] md:text-8xl">
            Build With<br />
            <span className="italic text-gold-soft">Confidence.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-primary-foreground/85 md:text-lg">
            RK Topcraft delivers refined construction, renovation and project execution for international homeowners across Marbella, Estepona, Mijas and Benalmádena.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#contact" onClick={(e) => smoothTo(e, "contact")} className="group inline-flex items-center gap-3 bg-gold px-7 py-4 text-xs font-medium uppercase tracking-[0.24em] text-ink hover:bg-primary-foreground transition">
              Request a site visit
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#projects" onClick={(e) => smoothTo(e, "projects")} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-primary-foreground border-b border-primary-foreground/50 pb-1 hover:border-gold hover:text-gold-soft transition">
              View our work
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-primary-foreground/20 pt-8 text-primary-foreground/90 md:mt-24 md:grid-cols-4">
          <Stat n="20+" label="Years of experience" />
          <Stat n="4" label="Municipalities served" />
          <Stat n="3" label="Languages spoken" />
          <Stat n="B75276881" label="Licence number" small />
        </div>
      </div>
    </section>
  );
}

function smoothTo(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

function Stat({ n, label, small }: { n: string; label: string; small?: boolean }) {
  return (
    <div>
      <div className={`font-serif ${small ? "text-lg" : "text-3xl md:text-4xl"} text-gold-soft`}>{n}</div>
      <div className="mt-2 text-[0.7rem] uppercase tracking-[0.22em] text-primary-foreground/70">{label}</div>
    </div>
  );
}

/* ------------------------------ INTRO ------------------------------ */

function IntroStrip() {
  return (
    <section className="border-b border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1fr_2fr] md:px-10 md:py-24">
        <div>
          <p className="eyebrow">Our craft</p>
          <div className="hairline mt-4 w-16" />
        </div>
        <p className="font-serif text-2xl leading-snug text-ink md:text-4xl">
          We build homes for people who value <em className="text-gold">calm execution</em> — clear planning, honest budgets, and finishes that reward closer looking.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------ SERVICES ------------------------------ */

const services = [
  { icon: Building2, title: "Bespoke Villa Construction", desc: "Turn-key residential builds delivered from technical project through to handover, with rigorous phase control." },
  { icon: Hammer, title: "Renovations & Upgrades", desc: "Elegant reforms for villas, apartments, terraces and rental-ready properties across the coast." },
  { icon: Waves, title: "Pools & Outdoor Living", desc: "Pools, terraces and pergolas designed for refined Mediterranean living and everyday use." },
  { icon: ClipboardCheck, title: "Licences & Project Management", desc: "End-to-end coordination of technical projects, permits and administrative processes with local authorities." },
];

function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32 scroll-mt-24">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Core Services</p>
          <h2 className="mt-4 font-serif text-5xl leading-tight md:text-6xl">What we build.</h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Four disciplines, one team. Every project is delivered end-to-end so quality, timeline and budget stay in the same hands.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <article key={s.title} className="group flex flex-col justify-between bg-background p-8 transition hover:bg-secondary/60 min-h-[320px]">
            <div>
              <div className="flex items-center justify-between">
                <s.icon className="h-8 w-8 text-gold" strokeWidth={1.25} />
                <span className="font-serif text-sm text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="mt-10 font-serif text-2xl leading-tight text-ink">{s.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
            <div className="mt-8 h-px w-8 bg-gold transition-all group-hover:w-16" />
          </article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ PROJECTS ------------------------------ */

const projects = [
  { img: v66.url, tag: "New Build", title: "Contemporary Villa", loc: "Marbella" },
  { img: v51.url, tag: "New Build", title: "Villa 51", loc: "Marbella" },
  { img: v1.url, tag: "New Build", title: "Villa in Marbella", loc: "Marbella" },
  { img: v133.url, tag: "Renovation", title: "Vertical Reform", loc: "Marbella" },
  { img: v65.url, tag: "New Build", title: "Detached Villa", loc: "Benalmádena" },
  { img: v27.url, tag: "New Build", title: "Structural Works", loc: "Marbella" },
  { img: v50.url, tag: "Renovation", title: "Interior Reform", loc: "Mijas" },
  { img: v59.url, tag: "Outdoor Living", title: "Terrace & Pool", loc: "Estepona" },
  { img: v2.url, tag: "Outdoor Living", title: "Facade & Pool", loc: "Estepona" },
  { img: v88.url, tag: "New Build", title: "Villa Delivery", loc: "Marbella" },
];

function Projects() {
  return (
    <section id="projects" className="border-y border-border bg-secondary/30 py-24 md:py-32 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Selected Work</p>
            <h2 className="mt-4 font-serif text-5xl leading-tight md:text-6xl">
              Homes across the <em>Costa del Sol.</em>
            </h2>
          </div>
          <a href="#contact" onClick={(e) => smoothTo(e, "contact")} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-ink border-b border-ink pb-1 hover:text-gold hover:border-gold transition self-start">
            Discuss your project <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-16 columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {projects.map((p) => (
            <figure key={p.title + p.img} className="group relative mb-4 block break-inside-avoid overflow-hidden bg-muted">
              <img
                src={p.img}
                alt={`${p.title} — ${p.loc}`}
                loading="lazy"
                className="block w-full h-auto object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent p-5 opacity-0 transition group-hover:opacity-100">
                <p className="text-[0.65rem] uppercase tracking-[0.24em] text-gold-soft">{p.tag} · {p.loc}</p>
                <h3 className="mt-1 font-serif text-xl text-primary-foreground">{p.title}</h3>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ PROCESS ------------------------------ */

const phases = [
  { n: "01", title: "Initial Analysis", desc: "Objectives, project needs, budget and plot constraints defined together with the client." },
  { n: "02", title: "Preliminary Design", desc: "An initial architectural and constructive proposal adapted to the project characteristics." },
  { n: "03", title: "Licences", desc: "Preparation of the technical project and coordination of administrative processing to begin works." },
  { n: "04", title: "Construction", desc: "Execution with prior planning, quality control and continuous monitoring of progress." },
  { n: "05", title: "Delivery", desc: "Final review of the property, documentation handover and commissioning of the project." },
  { n: "06", title: "After-sales", desc: "Post-completion follow-up to guarantee the correct condition and functioning of the home." },
];

function Process() {
  return (
    <section id="process" className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32 scroll-mt-24">
      <div className="max-w-3xl">
        <p className="eyebrow">The Process</p>
        <h2 className="mt-4 font-serif text-5xl leading-tight md:text-6xl">
          Six phases, one <em>continuous</em> team.
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          From the first plot analysis to after-sales, every phase is coordinated in-house. One point of contact, a single plan, transparent reporting.
        </p>
      </div>

      <ol className="mt-16 grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        {phases.map((p) => (
          <li key={p.n} className="group flex gap-6 bg-background p-8 transition hover:bg-secondary/60">
            <span className="font-serif text-4xl text-gold leading-none">{p.n}</span>
            <div>
              <h3 className="font-serif text-2xl text-ink leading-tight">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ------------------------------ WHY US ------------------------------ */

const reasons = [
  { icon: Award, title: "20+ years of experience", desc: "Delivery across residential and complex building works." },
  { icon: ShieldCheck, title: "Licensed & insured", desc: "Professional execution with dependable standards and full project responsibility." },
  { icon: MapPin, title: "Costa del Sol focus", desc: "Serving Marbella, Estepona, Mijas and Benalmádena." },
  { icon: Languages, title: "International communication", desc: "English, Spanish and German support for overseas homeowners and investors." },
];

function WhyUs() {
  return (
    <section id="why" className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32 scroll-mt-24">
      <div className="grid gap-16 md:grid-cols-2 md:gap-20">
        <div className="relative">
          <img
            src={v50.url}
            alt="Interior detail of a completed villa reform"
            loading="lazy"
            className="w-full object-cover aspect-[5/6]"
          />
          <div className="absolute -bottom-6 -right-6 hidden bg-gold px-8 py-6 md:block">
            <p className="font-serif text-4xl text-ink leading-none">20+</p>
            <p className="mt-2 text-[0.68rem] uppercase tracking-[0.22em] text-ink/80">Years on the coast</p>
          </div>
        </div>

        <div>
          <p className="eyebrow">Why RK Topcraft</p>
          <h2 className="mt-4 font-serif text-5xl leading-tight md:text-6xl">
            The quiet <em>discipline</em> of a good build.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Overseas homeowners hire us because the process is calm, the reporting is clear, and the finishes hold up. We take responsibility from concept to keys — coordinating architects, engineers and trades under a single, technical plan.
          </p>

          <ul className="mt-10 divide-y divide-border border-y border-border">
            {reasons.map((r) => (
              <li key={r.title} className="flex items-start gap-6 py-6">
                <r.icon className="mt-1 h-6 w-6 flex-none text-gold" strokeWidth={1.25} />
                <div>
                  <h3 className="font-serif text-xl text-ink">{r.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <blockquote className="border-l-2 border-gold pl-5 font-serif text-lg italic leading-relaxed text-ink">
              "Impressive construction work. Highly recommended."
              <footer className="mt-3 text-[0.65rem] not-italic tracking-[0.2em] uppercase text-muted-foreground font-sans">Laura Martínez · Homeowner</footer>
            </blockquote>
            <blockquote className="border-l-2 border-gold pl-5 font-serif text-lg italic leading-relaxed text-ink">
              "Great communication and unbeatable final results."
              <footer className="mt-3 text-[0.65rem] not-italic tracking-[0.2em] uppercase text-muted-foreground font-sans">Javier Rodríguez · Property investor</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ FAQ ------------------------------ */

const faqs = [
  { q: "Where does RK Topcraft operate on the Costa del Sol?", a: "We build across the Costa del Sol — with concentration in Marbella, Estepona, Mijas and Benalmádena — adapting to the specific conditions of each plot and municipality." },
  { q: "What types of homes do you build?", a: "We specialise in bespoke single-family villas and residential reforms, always working from a properly defined technical project." },
  { q: "Are you a builder, developer, or both?", a: "We act as builder and can also intervene in earlier development phases of residential projects, coordinating execution and pre-construction workstreams." },
  { q: "Who prepares the technical project?", a: "Construction is executed against a technical project defined by external technical teams. Our role focuses on planning, coordination and on-site execution." },
  { q: "Do you handle building licences?", a: "Yes — we coordinate the preparation of documentation and follow-up of administrative processes needed to obtain licences, in collaboration with the responsible technicians." },
  { q: "Do I need to already own a plot?", a: "No. We can assist you in searching for and evaluating a plot on the Costa del Sol, assessing its viability before the construction project begins." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-t border-border bg-secondary/30 py-24 md:py-32 scroll-mt-24">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <div className="max-w-3xl">
          <p className="eyebrow">Frequently Asked</p>
          <h2 className="mt-4 font-serif text-5xl leading-tight md:text-6xl">
            Building on the coast — <em>answered.</em>
          </h2>
        </div>

        <ul className="mt-14 divide-y divide-border border-y border-border">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-8 py-6 text-left transition hover:text-gold"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-xl leading-snug text-ink md:text-2xl">{f.q}</span>
                  <span className="mt-1 flex-none text-gold">
                    {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
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

/* ------------------------------ CONTACT ------------------------------ */

function ContactCTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink text-primary-foreground scroll-mt-24">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-[3fr_2fr] md:px-10 md:py-32">
        <div>
          <p className="eyebrow text-gold-soft">Start a project</p>
          <h2 className="mt-6 font-serif text-5xl leading-[1.05] md:text-7xl">
            Planning a build or renovation on the <em className="text-gold-soft">Costa del Sol?</em>
          </h2>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-primary-foreground/80">
            Request a free site visit. We'll walk the property, understand your intent, and come back with a clear scope and honest indicative budget.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href={WA_LINK} className="inline-flex items-center gap-3 bg-gold px-7 py-4 text-xs uppercase tracking-[0.24em] text-ink hover:bg-primary-foreground transition">
              <MessageCircle className="h-4 w-4" /> WhatsApp {PHONE}
            </a>
            <a href={`tel:+34${PHONE.replace(/\s/g, "")}`} className="inline-flex items-center gap-3 border border-primary-foreground/40 px-7 py-4 text-xs uppercase tracking-[0.24em] text-primary-foreground hover:bg-primary-foreground hover:text-ink transition">
              <Phone className="h-4 w-4" /> Call {PHONE}
            </a>
          </div>
        </div>

        <div className="md:border-l md:border-primary-foreground/15 md:pl-10">
          <p className="eyebrow text-gold-soft">Direct contacts</p>
          <dl className="mt-8 space-y-6 text-sm">
            <ContactRow icon={Phone} label="Telephone" value={PHONE} />
            <ContactRow icon={MessageCircle} label="WhatsApp" value={PHONE} />
            <ContactRow icon={Mail} label="Email" value="info@rktopcraft.com" />
            <ContactRow icon={MapPin} label="Coverage" value="Marbella · Estepona · Mijas · Benalmádena" />
            <ContactRow icon={Languages} label="Languages" value="English · Spanish · German" />
          </dl>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon: Icon, label, value }: { icon: typeof Phone; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <Icon className="mt-1 h-4 w-4 flex-none text-gold-soft" strokeWidth={1.5} />
      <div>
        <dt className="text-[0.65rem] uppercase tracking-[0.24em] text-primary-foreground/60">{label}</dt>
        <dd className="mt-1 text-primary-foreground">{value}</dd>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex items-baseline gap-4">
          <span className="font-serif text-2xl text-ink">RK Topcraft</span>
          <span className="text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">Construction</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
          <span>Licence No. B75276881</span>
          <span className="hidden md:inline text-border">·</span>
          <span>Costa del Sol, Spain</span>
          <span className="hidden md:inline text-border">·</span>
          <span>© {new Date().getFullYear()} RK Topcraft Construction</span>
        </div>
      </div>
    </footer>
  );
}
