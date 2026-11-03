import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-chrome";
import { MissionVision } from "@/components/about-sections";

export const Route = createFileRoute("/about_/mission-vision")({
  head: () => ({
    meta: [
      { title: "Mission & Vision — Dawson Wells Gallery" },
      { name: "description", content: "Why Dawson Wells Gallery exists and where we are going." },
      { property: "og:title", content: "Mission & Vision — Dawson Wells Gallery" },
      { property: "og:description", content: "Our mission and vision." },
    ],
  }),
  component: () => (
    <>
      <PageHeader eyebrow="About" title="Mission & Vision" intro="The principles that shape every exhibition and every encounter at the gallery." />
      <MissionVision />
    </>
  ),
});
