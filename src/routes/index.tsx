import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Building2, Hammer, Waves, ClipboardCheck, ShieldCheck, MapPin, Languages, Award, Phone, Mail, MessageCircle } from "lucide-react";

import heroVilla from "@/assets/hero-villa.jpg";
import projectVilla from "@/assets/project-villa.jpg";
import projectRenovation from "@/assets/project-renovation.jpg";
import projectPool from "@/assets/project-pool.jpg";
import aboutTerrace from "@/assets/about-terrace.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

const PHONE = "699 757 950";
const WA_LINK = "https://wa.me/34699757950";

function Home() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <Header />
      <main>
        <Hero />
        <IntroStrip />
        <Services />
        <Projects />
        <WhyUs />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
        <a href="#top" className="flex flex-col leading-none text-primary-foreground">
          <span className="font-serif text-2xl tracking-tight">RK</span>
          <span className="text-[0.6rem] tracking-[0.32em] uppercase font-sans mt-0.5 opacity-90">Topcraft</span>
        </a>
        <nav className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.24em] text-primary-foreground/90">
          <a href="#services" className="hover:text-gold transition">Services</a>
          <a href="#projects" className="hover:text-gold transition">Projects</a>
          <a href="#why" className="hover:text-gold transition">Approach</a>
          <a href="#contact" className="hover:text-gold transition">Contact</a>
        </nav>
        <a href={WA_LINK} className="hidden md:inline-flex items-center gap-2 border border-primary-foreground/40 px-4 py-2 text-[0.7rem] uppercase tracking-[0.2em] text-primary-foreground hover:bg-primary-foreground hover:text-ink transition">
          {PHONE}
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-ink">
      <img
        src={heroVilla}
        alt="Luxury villa built by RK Topcraft on the Costa del Sol"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-ink/80" />

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
            <a href="#contact" className="group inline-flex items-center gap-3 bg-gold px-7 py-4 text-xs font-medium uppercase tracking-[0.24em] text-ink hover:bg-primary-foreground transition">
              Request a site visit
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#projects" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-primary-foreground border-b border-primary-foreground/50 pb-1 hover:border-gold hover:text-gold-soft transition">
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

function Stat({ n, label, small }: { n: string; label: string; small?: boolean }) {
  return (
    <div>
      <div className={`font-serif ${small ? "text-lg" : "text-3xl md:text-4xl"} text-gold-soft`}>{n}</div>
      <div className="mt-2 text-[0.7rem] uppercase tracking-[0.22em] text-primary-foreground/70">{label}</div>
    </div>
  );
}

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

const services = [
  { icon: Building2, title: "Luxury Villa Construction", desc: "Tailored residential builds delivered with clear planning, transparent costing and controlled on-site execution." },
  { icon: Hammer, title: "Renovations & Upgrades", desc: "Elegant reforms for villas, apartments, terraces and rental-ready properties across the coast." },
  { icon: Waves, title: "Pools & Outdoor Living", desc: "Pools, terraces and pergolas designed for refined Mediterranean living and everyday use." },
  { icon: ClipboardCheck, title: "Project Management", desc: "Direct coordination, budget control and reliable communication from first drawing to final handover." },
];

function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
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

const projects = [
  { img: projectVilla, tag: "New Build", title: "Contemporary Villa", loc: "Marbella", w: 1200, h: 1400 },
  { img: projectRenovation, tag: "Renovation", title: "Master Bath Reform", loc: "Estepona", w: 1200, h: 1400 },
  { img: projectPool, tag: "Outdoor Living", title: "Infinity Pool & Terrace", loc: "Benalmádena", w: 1200, h: 1400 },
];

function Projects() {
  return (
    <section id="projects" className="border-y border-border bg-secondary/30 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Selected Work</p>
            <h2 className="mt-4 font-serif text-5xl leading-tight md:text-6xl">
              Homes across the <em>Costa del Sol.</em>
            </h2>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-ink border-b border-ink pb-1 hover:text-gold hover:border-gold transition self-start">
            Discuss your project <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {projects.map((p) => (
            <figure key={p.title} className="group">
              <div className="relative overflow-hidden bg-muted aspect-[4/5]">
                <img
                  src={p.img}
                  alt={`${p.title} — ${p.loc}`}
                  loading="lazy"
                  width={p.w}
                  height={p.h}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-5 flex items-baseline justify-between gap-4">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.24em] text-gold">{p.tag}</p>
                  <h3 className="mt-2 font-serif text-2xl text-ink">{p.title}</h3>
                </div>
                <span className="text-xs text-muted-foreground">{p.loc}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const reasons = [
  { icon: Award, title: "20+ years of experience", desc: "Delivery across residential and complex building works." },
  { icon: ShieldCheck, title: "Licensed & insured", desc: "Professional execution with dependable standards and full project responsibility." },
  { icon: MapPin, title: "Costa del Sol focus", desc: "Serving Marbella, Estepona, Mijas and Benalmádena." },
  { icon: Languages, title: "International communication", desc: "English, Spanish and German support for overseas homeowners and investors." },
];

function WhyUs() {
  return (
    <section id="why" className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
      <div className="grid gap-16 md:grid-cols-2 md:gap-20">
        <div className="relative">
          <img
            src={aboutTerrace}
            alt="Mediterranean terrace with pergola and olive tree"
            loading="lazy"
            width={1400}
            height={1200}
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
            Overseas homeowners hire us because the process is calm, the reporting is clear, and the finishes hold up. We take responsibility from concept to keys.
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

          <blockquote className="mt-10 border-l-2 border-gold pl-6 font-serif text-xl italic leading-relaxed text-ink">
            "They ran the entire build from Northern Europe — weekly reports, no surprises. The villa was delivered on time and beautifully finished."
            <footer className="mt-4 text-xs not-italic tracking-[0.2em] uppercase text-muted-foreground font-sans">— Homeowner, Marbella</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink text-primary-foreground">
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

        <div className="border-l border-primary-foreground/15 pl-10 hidden md:block">
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
