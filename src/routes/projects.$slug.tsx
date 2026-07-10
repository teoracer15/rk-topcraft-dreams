import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, MessageCircle, MapPin } from "lucide-react";
import { getProjectBySlug, PROJECTS } from "@/data/current-projects";
import { PlaceholderImage, StatusBadge } from "@/components/CurrentProjectCard";

const WA_LINK =
  "https://wa.me/34699757950?text=Hello%20RK%20Topcraft%2C%20I%27d%20like%20to%20discuss%20a%20project.";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Project not found — RK Topcraft" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.project;
    return {
      meta: [
        { title: `${p.name} — RK Topcraft` },
        { name: "description", content: p.summary },
        { property: "og:title", content: `${p.name} — RK Topcraft` },
        { property: "og:description", content: p.summary },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: ProjectDetail,
  notFoundComponent: ProjectNotFound,
});

function ProjectNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 text-center">
      <div>
        <p className="eyebrow text-clay">Not found</p>
        <h1 className="mt-4 font-serif text-5xl text-ink">Project not found</h1>
        <Link
          to="/projects"
          className="mt-8 inline-flex items-center gap-2 border border-ink px-6 py-3 text-xs uppercase tracking-[0.24em] text-ink hover:bg-ink hover:text-ivory transition"
        >
          Back to Current Projects
        </Link>
      </div>
    </div>
  );
}

function ProjectDetail() {
  const { project } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-ink">
      {/* Top bar */}
      <div className="border-b border-border/70 bg-ivory/85 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.28em] text-ink/70 hover:text-clay transition"
          >
            <ChevronLeft className="h-4 w-4" /> All current projects
          </Link>
          <Link to="/" className="font-serif text-xl text-ink">
            RK Topcraft
          </Link>
        </div>
      </div>

      {/* Header */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-10 md:px-10 md:pt-24">
        <StatusBadge status={project.status} />
        <h1 className="mt-6 font-serif text-5xl md:text-7xl leading-[1.02] text-ink max-w-4xl">
          {project.name}
        </h1>
        <p className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {project.location}
        </p>
        <p className="mt-4 text-xs uppercase tracking-[0.24em] text-clay">
          {project.type}
        </p>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-6 md:px-10">
        <Gallery images={project.gallery} />
      </section>

      {/* Body */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="eyebrow text-clay">About this project</p>
            <div className="mt-6 space-y-6 font-serif-alt text-xl leading-relaxed text-ink/85">
              <p>{project.description}</p>
              {project.longDescription && <p>{project.longDescription}</p>}
            </div>
          </div>

          <aside className="md:col-span-5">
            <div className="bg-card border border-border/70 p-8">
              <p className="eyebrow text-clay">Key facts</p>
              <dl className="mt-6 divide-y divide-border/70">
                <Fact k="Location" v={project.facts.location} />
                <Fact k="Plot size" v={project.facts.plotSize} />
                <Fact k="Build size" v={project.facts.buildSize} />
                <Fact k="Bedrooms" v={project.facts.bedrooms} />
                <Fact k="Bathrooms" v={project.facts.bathrooms} />
                <Fact k="Status" v={project.facts.status} />
              </dl>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/70 bg-teal-deep text-ivory">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32 text-center">
          <p className="eyebrow text-clay-soft">Enquire</p>
          <h2 className="mt-6 font-serif text-4xl md:text-6xl">
            Interested in this <em className="text-clay-soft">property</em>?
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-serif-alt text-lg text-ivory/80">
            Arrange a private viewing or request full specifications, plans
            and availability.
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
              className="group inline-flex items-center gap-3 border border-ivory/40 px-7 py-4 text-xs font-medium uppercase tracking-[0.24em] text-ivory hover:bg-clay hover:border-clay transition"
            >
              Contact form
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Other projects */}
      {PROJECTS.length > 1 && (
        <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <p className="eyebrow text-clay">More current projects</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {PROJECTS.filter((p) => p.slug !== project.slug).map((p) => (
              <Link
                key={p.slug}
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="border border-border/70 p-6 hover:border-clay transition"
              >
                <p className="text-[0.6rem] uppercase tracking-[0.28em] text-ink/60">
                  {p.location}
                </p>
                <p className="mt-3 font-serif text-2xl text-ink">{p.name}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between py-4 gap-6">
      <dt className="text-[0.6rem] uppercase tracking-[0.28em] text-ink/55">
        {k}
      </dt>
      <dd className="font-serif text-lg text-ink text-right">{v}</dd>
    </div>
  );
}

function Gallery({
  images,
}: {
  images: { src: string | null; label: string }[];
}) {
  const [i, setI] = useState(0);
  const total = images.length;
  const current = images[i];
  const go = (dir: number) => setI((prev) => (prev + dir + total) % total);

  return (
    <div>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary">
        {current.src ? (
          <img
            src={current.src}
            alt={current.label}
            className="h-full w-full object-cover"
            loading="eager"
          />
        ) : (
          <PlaceholderImage label={current.label} />
        )}

        {/* Slot number */}
        <div className="absolute top-4 left-4 bg-ink/80 text-ivory px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.28em]">
          {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>

        {/* Caption */}
        <div className="absolute bottom-4 left-4 bg-ivory/90 backdrop-blur px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.28em] text-ink">
          {current.label}
        </div>

        {/* Controls */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute top-1/2 left-4 -translate-y-1/2 h-11 w-11 flex items-center justify-center bg-ivory/90 hover:bg-clay hover:text-ivory transition text-ink"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute top-1/2 right-4 -translate-y-1/2 h-11 w-11 flex items-center justify-center bg-ivory/90 hover:bg-clay hover:text-ivory transition text-ink"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {total > 1 && (
        <div className="mt-4 grid grid-cols-3 gap-3 md:grid-cols-6">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`View image ${idx + 1}`}
              className={`relative aspect-[4/3] overflow-hidden bg-secondary transition ${
                idx === i
                  ? "ring-2 ring-clay"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              {img.src ? (
                <img
                  src={img.src}
                  alt={img.label}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[repeating-linear-gradient(45deg,#F2ECE0_0_8px,#EDE5D3_8px_16px)]">
                  <span className="text-[0.5rem] uppercase tracking-[0.24em] text-ink/50 px-2 text-center">
                    {img.label}
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
