import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-chrome";
import { CompanyOverview } from "@/components/about-sections";
import { IMAGES } from "@/lib/data";

export const Route = createFileRoute("/about_/company-overview")({
  head: () => ({
    meta: [
      { title: "Company Overview — Dawson Wells Gallery" },
      { name: "description", content: "An overview of Dawson Wells Gallery, its collection and programme." },
      { property: "og:title", content: "Company Overview — Dawson Wells Gallery" },
      { property: "og:description", content: "Who we are." },
    ],
  }),
  component: () => (
    <>
      <PageHeader eyebrow="About" title="Company Overview" />
      <img src={IMAGES.interior} alt="Gallery interior" className="mx-auto mb-24 aspect-[21/9] w-full max-w-[1440px] object-cover px-6 md:px-12" />
      <CompanyOverview />
    </>
  ),
});
