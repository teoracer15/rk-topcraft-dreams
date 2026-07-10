import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { PROJECTS } from "@/data/current-projects";
import { CurrentProjectCard } from "@/components/CurrentProjectCard";
import headerBg from "@/assets/projects/la-roca/view-villa-day.jpg.asset.json";


const WA_LINK =
  "https://wa.me/34699757950?text=Hello%20RK%20Topcraft%2C%20I%27d%20like%20to%20discuss%20a%20project.";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Current Projects — RK Topcraft, Costa del Sol" },
      {
        name: "description",
        content:
          "Ongoing luxury villa construction and investment projects delivered by RK Topcraft across Sotogrande, Marbella, Estepona, Mijas and Benalmádena.",
      },
      { property: "og:title", content: "Current Projects — RK Topcraft" },
      {
        property: "og:description",
        content:
          "A live look at the villas and complex works currently being delivered by RK Topcraft on the Costa del Sol.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CurrentProjectsPage,
});

function CurrentProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <PageHeader />
      <main>
        <section className="mx-auto max-w-7xl px-6 pb-32 md:px-10">
          <div className="grid gap-10 md:grid-cols-2">
            {PROJECTS.map((project) => (
              <CurrentProjectCard key={project.slug} project={project} />
            ))}
          </div>

          {PROJECTS.length === 1 && (
            <p className="mt-16 max-w-xl font-serif-alt text-lg italic text-ink/60">
              More current projects will be published here as they enter
              construction.
            </p>
          )}
        </section>

        <ClosingCTA />
      </main>
    </div>
  );
}

function PageHeader() {
  return (
    <section className="relative overflow-hidden bg-teal-deep text-ivory">
      <img
        src={headerBg.url}
        alt="La Roca de San Diego — villa exterior by day"
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-teal-deep/70 via-teal-deep/60 to-teal-deep/90" />
      <div className="absolute inset-0 opacity-[0.10] bg-[radial-gradient(circle_at_20%_20%,#C5A059_0,transparent_50%),radial-gradient(circle_at_80%_80%,#C5A059_0,transparent_45%)]" />
      <div className="relative mx-auto max-w-7xl px-6 pt-40 pb-24 md:px-10 md:pt-48 md:pb-32">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.28em] text-ivory/80 hover:text-clay-soft transition"
        >
          ← RK Topcraft
        </Link>
        <p className="eyebrow mt-10 text-clay-soft">
          Live · Costa del Sol
        </p>
        <h1 className="mt-6 font-serif text-6xl leading-[1.02] md:text-8xl max-w-4xl drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]">
          Current <em className="text-clay-soft">Projects</em>
        </h1>
        <p className="mt-8 max-w-2xl font-serif-alt text-xl leading-relaxed text-ivory/90 md:text-2xl">
          Ongoing villa construction and investment projects being delivered
          by RK Topcraft along the Costa del Sol.
        </p>
      </div>
    </section>
  );
}


function ClosingCTA() {
  return (
    <section className="border-t border-border/70 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32 text-center">
        <p className="eyebrow text-clay">Get in touch</p>
        <h2 className="mt-6 font-serif text-4xl md:text-5xl text-ink">
          Interested in one of our <em>projects</em>?
        </h2>
        <p className="mx-auto mt-6 max-w-xl font-serif-alt text-lg text-ink/70">
          We're happy to arrange a private viewing or share more information
          about availability, specifications and timelines.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 bg-clay px-7 py-4 text-xs font-medium uppercase tracking-[0.24em] text-ivory hover:bg-clay-soft transition"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp us
          </a>
          <Link
            to="/"
            hash="contact"
            className="group inline-flex items-center gap-3 border border-ink/30 px-7 py-4 text-xs font-medium uppercase tracking-[0.24em] text-ink hover:bg-ink hover:text-ivory transition"
          >
            Contact form
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
