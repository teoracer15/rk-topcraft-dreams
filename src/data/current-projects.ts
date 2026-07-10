/**
 * Current Projects data source.
 *
 * ─────────────────────────────────────────────────────────────────
 *  HOW TO ADD / EDIT PROJECTS
 * ─────────────────────────────────────────────────────────────────
 *  1. Duplicate an entry in the PROJECTS array below.
 *  2. Give it a unique `slug` (used in the URL: /projects/<slug>).
 *  3. Upload photos via lovable-assets under
 *       src/assets/projects/<project-slug>/
 *     then import their .asset.json files at the top of this file
 *     and reference `.url` on each gallery entry.
 */

// La Roca de San Diego — photos from Google Drive
import viewVillaNight from "@/assets/projects/la-roca/view-villa-night.jpg.asset.json";
import viewVillaDay from "@/assets/projects/la-roca/view-villa-day.jpg.asset.json";
import outsideViewPoolPlants from "@/assets/projects/la-roca/outside-view-pool-plants.jpg.asset.json";
import viewPoolVillaNight from "@/assets/projects/la-roca/view-pool-villa-night.jpg.asset.json";
import terracePalmsView from "@/assets/projects/la-roca/terrace-palms-view.jpg.asset.json";
import plantsViewFromTerrace from "@/assets/projects/la-roca/plants-view-from-terrace.jpg.asset.json";
import outsideStairsEntrance from "@/assets/projects/la-roca/outside-stairs-entrance.jpg.asset.json";
import stairWalkDown from "@/assets/projects/la-roca/stair-walk-down-outside-entrance.jpg.asset.json";
import topStairs from "@/assets/projects/la-roca/top-stairs.jpg.asset.json";
import mainStairsInside from "@/assets/projects/la-roca/main-stairs-inside.jpg.asset.json";
import livingRoom from "@/assets/projects/la-roca/living-room.jpg.asset.json";
import kitchenCloseUp from "@/assets/projects/la-roca/kitchen-close-up.jpg.asset.json";
import hallwayMaster from "@/assets/projects/la-roca/hallway-master.jpg.asset.json";
import masterView from "@/assets/projects/la-roca/master-view.jpg.asset.json";
import masterBedViewTerrace from "@/assets/projects/la-roca/master-bed-view-terrace.jpg.asset.json";
import bedroom1 from "@/assets/projects/la-roca/bedroom-1.jpg.asset.json";
import bed2 from "@/assets/projects/la-roca/bed-2.jpg.asset.json";
import bathroom from "@/assets/projects/la-roca/bathroom.jpg.asset.json";
import basement from "@/assets/projects/la-roca/basement.jpg.asset.json";
import basementV1 from "@/assets/projects/la-roca/basement-v1.jpg.asset.json";
import basementV2 from "@/assets/projects/la-roca/basement-v2.jpg.asset.json";
import garage from "@/assets/projects/la-roca/garage.jpg.asset.json";
import oliveTreeProgress from "@/assets/projects/la-roca/olive-tree-progress.jpg.asset.json";
import adShot from "@/assets/projects/la-roca/ad.jpg.asset.json";
import extra1 from "@/assets/projects/la-roca/extra-1.jpg.asset.json";
import extra2 from "@/assets/projects/la-roca/extra-2.jpg.asset.json";

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
      { src: viewVillaNight.url, label: "Villa exterior at night" },
      { src: viewVillaDay.url, label: "Villa exterior by day" },
      { src: outsideViewPoolPlants.url, label: "Pool & landscaped garden" },
      { src: viewPoolVillaNight.url, label: "Pool & villa at night" },
      { src: terracePalmsView.url, label: "Terrace with palm views" },
      { src: plantsViewFromTerrace.url, label: "Garden view from terrace" },
      { src: outsideStairsEntrance.url, label: "Exterior entrance stairs" },
      { src: stairWalkDown.url, label: "Approach to entrance" },
      { src: topStairs.url, label: "Upper staircase" },
      { src: mainStairsInside.url, label: "Main interior staircase" },
      { src: livingRoom.url, label: "Living room" },
      { src: kitchenCloseUp.url, label: "Kitchen — detail" },
      { src: hallwayMaster.url, label: "Hallway to master suite" },
      { src: masterView.url, label: "Master suite — view" },
      { src: masterBedViewTerrace.url, label: "Master bedroom with terrace view" },
      { src: bedroom1.url, label: "Guest bedroom" },
      { src: bed2.url, label: "Secondary bedroom" },
      { src: bathroom.url, label: "Bathroom" },
      { src: basement.url, label: "Lower level" },
      { src: basementV1.url, label: "Lower level — alternate view" },
      { src: basementV2.url, label: "Lower level — detail" },
      { src: garage.url, label: "Garage" },
      { src: oliveTreeProgress.url, label: "Olive tree — grounds in progress" },
      { src: adShot.url, label: "Feature shot" },
      { src: extra1.url, label: "Additional view" },
      { src: extra2.url, label: "Additional view" },
    ],
  },
];

export function getProjectBySlug(slug: string): CurrentProject | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
