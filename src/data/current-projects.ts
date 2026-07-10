/**
 * Current Projects data source.
 *
 * ─────────────────────────────────────────────────────────────────
 *  HOW TO ADD / EDIT PROJECTS
 * ─────────────────────────────────────────────────────────────────
 *  1. Duplicate an entry in the PROJECTS array below.
 *  2. Give it a unique `slug` (used in the URL: /projects/<slug>).
 *  3. Replace the placeholder `gallery` items with real photos.
 *
 *  IMAGE PLACEHOLDERS
 *  Each gallery entry currently has `src: null` and a short `label`.
 *  The UI renders a labelled placeholder box in that slot so you can
 *  see exactly where each photo will go. To drop in a real photo:
 *
 *    a) Upload it via lovable-assets and put the resulting
 *       `.asset.json` file under  src/assets/current-projects/
 *    b) Import it at the top of this file, e.g.
 *         import laRocaExterior1 from
 *           "@/assets/current-projects/la-roca-exterior-1.jpg.asset.json";
 *    c) Set `src: laRocaExterior1.url` on the matching gallery entry.
 *
 *  Nothing else needs to change — the list page and the detail page
 *  both read from this file.
 */

export type ProjectStatus =
  | "In Progress"
  | "Nearing Completion"
  | "Completed"
  | "Sold";

export type GalleryImage = {
  /** CDN URL of the real photo. Leave `null` to render a placeholder. */
  src: string | null;
  /** Short label shown on placeholders + used as alt text. */
  label: string;
};

export type CurrentProject = {
  slug: string;
  name: string;
  location: string;
  type: string;
  status: ProjectStatus;
  /** 1-line teaser shown on the card. */
  summary: string;
  /** 2–3 sentence description shown on both card + detail. */
  description: string;
  /** Longer description shown only on the detail page. */
  longDescription?: string;
  facts: {
    location: string;
    plotSize: string;
    buildSize: string;
    bedrooms: string;
    bathrooms: string;
    status: string;
  };
  /** First image is used as the card cover. */
  gallery: GalleryImage[];
};

export const PROJECTS: CurrentProject[] = [
  {
    slug: "la-roca-de-san-diego",
    name: "La Roca de San Diego",
    location: "Sotogrande, Costa del Sol, Spain",
    type: "Luxury villa — new-build construction",
    status: "Nearing Completion",
    summary:
      "A private new-build villa in Sotogrande, blending contemporary architecture with the natural stone character of its setting.",
    description:
      "Set within the discreet enclaves of Sotogrande, La Roca de San Diego is a bespoke new-build villa executed to the highest standard of craftsmanship. Clean architectural lines, refined natural materials and considered spatial planning respond to the site's mature landscape and coastal light.",
    longDescription:
      "The residence is currently in its final stages of finishing — interior joinery, stone work and outdoor living areas are being completed under close on-site supervision by the RK Topcraft team. Every detail, from the façade stonework to the millwork and pool terraces, has been designed and delivered end-to-end to match the expectations of an international owner.",
    facts: {
      location: "Sotogrande, Cádiz",
      plotSize: "— placeholder —",
      buildSize: "— placeholder —",
      bedrooms: "— placeholder —",
      bathrooms: "— placeholder —",
      status: "Nearing Completion",
    },
    gallery: [
      { src: null, label: "Exterior — front elevation" },
      { src: null, label: "Exterior — pool & terrace" },
      { src: null, label: "Interior — living area" },
      { src: null, label: "Interior — kitchen" },
      { src: null, label: "Interior — master suite" },
      { src: null, label: "Detail — stonework / finishes" },
    ],
  },
];

export function getProjectBySlug(slug: string): CurrentProject | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
