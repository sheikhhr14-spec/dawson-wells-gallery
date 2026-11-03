import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-chrome";
import { MissionVision, CompanyOverview } from "@/components/about-sections";
import { IMAGES } from "@/lib/data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Dawson Wells Gallery" },
      { name: "description", content: "Our mission, vision and story — Dawson Wells Gallery for modern and contemporary art." },
      { property: "og:title", content: "About — Dawson Wells Gallery" },
      { property: "og:description", content: "Mission, vision and company overview." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader eyebrow="About" title="The Gallery" intro="A focused collection of modern and contemporary art, presented with the care it deserves." />
      <img src={IMAGES.interior} alt="Gallery interior" className="mx-auto aspect-[21/9] w-full max-w-[1440px] object-cover px-6" />
      <div className="pt-24"><MissionVision /></div>
      <div className="pt-24"><CompanyOverview /></div>
      <div className="mt-16 flex justify-center gap-6 text-xs uppercase tracking-[0.22em]">
        <Link to="/about/mission-vision" className="border-b border-accent pb-1 hover:text-accent">Mission & Vision</Link>
        <Link to="/about/company-overview" className="border-b border-accent pb-1 hover:text-accent">Company Overview</Link>
      </div>
    </>
  );
}
