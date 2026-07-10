import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { CurrentProject, ProjectStatus } from "@/data/current-projects";

const STATUS_STYLES: Record<ProjectStatus, string> = {
  "In Progress": "bg-teal-deep text-ivory",
  "Nearing Completion": "bg-clay text-ivory",
  Completed: "bg-olive text-ivory",
  Sold: "bg-ink text-ivory",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.28em] ${STATUS_STYLES[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {status}
    </span>
  );
}

export function CurrentProjectCard({ project }: { project: CurrentProject }) {
  const cover = project.gallery[0];
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className="group flex flex-col bg-card border border-border/70 overflow-hidden transition-all duration-500 hover:border-clay hover:shadow-[0_30px_60px_-30px_rgba(20,27,45,0.35)] hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
        {cover?.src ? (
          <img
            src={cover.src}
            alt={cover.label}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
        ) : (
          <PlaceholderImage label={cover?.label ?? "Cover image"} />
        )}
        <div className="absolute top-4 left-4">
          <StatusBadge status={project.status} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-8">
        <p className="eyebrow text-clay">{project.type}</p>
        <h3 className="mt-4 font-serif text-3xl leading-tight text-ink">
          {project.name}
        </h3>
        <p className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {project.location}
        </p>
        <p className="mt-6 font-serif-alt text-lg leading-relaxed text-ink/80">
          {project.summary}
        </p>

        <div className="mt-8 flex items-center justify-between border-t border-border/70 pt-6">
          <span className="text-[0.68rem] uppercase tracking-[0.24em] text-ink/60">
            View project
          </span>
          <span className="inline-flex h-10 w-10 items-center justify-center border border-ink/20 text-ink transition group-hover:bg-clay group-hover:border-clay group-hover:text-ivory">
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function PlaceholderImage({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[repeating-linear-gradient(45deg,#F2ECE0_0_12px,#EDE5D3_12px_24px)] text-ink/50">
      <span className="text-[0.55rem] uppercase tracking-[0.32em] opacity-70">
        Photo placeholder
      </span>
      <span className="font-serif italic text-lg text-ink/70 px-6 text-center">
        {label}
      </span>
      <span className="text-[0.55rem] uppercase tracking-[0.28em] opacity-50">
        Drop your image here
      </span>
    </div>
  );
}
