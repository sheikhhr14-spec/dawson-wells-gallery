import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-chrome";
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
      <img src={IMAGES.interior} alt="Gallery interior" className="mx-auto aspect-[21/9] w-full max-w-7xl object-cover px-6" />
      <section id="mission" className="mx-auto grid max-w-7xl gap-16 px-6 pt-24 md:grid-cols-2">
        <div>
          <p className="eyebrow">Mission</p>
          <h2 className="mt-3 text-4xl">To bring people closer to remarkable work.</h2>
          <p className="mt-6 text-muted-foreground">We present art that rewards attention — chosen for quality, material integrity and lasting presence — and create the conditions for visitors to encounter it fully.</p>
        </div>
        <div>
          <p className="eyebrow">Vision</p>
          <h2 className="mt-3 text-4xl">A gallery recognised worldwide for its eye.</h2>
          <p className="mt-6 text-muted-foreground">To become an internationally respected destination for modern and contemporary art, known for considered presentation and meaningful visitor experiences.</p>
        </div>
      </section>
      <section id="overview" className="mx-auto max-w-4xl px-6 pt-24">
        <p className="eyebrow">Company overview</p>
        <p className="mt-6 font-serif text-3xl leading-snug md:text-4xl">
          Founded as an independent gallery, Dawson Wells holds a single, carefully built collection spanning photography, painting, drawing, ceramics and printmaking. We exist to share it — through exhibitions, private viewings and a programme of talks and events.
        </p>
        <div className="mt-16 grid grid-cols-3 border-y py-10 text-center">
          {[["100+", "Works in collection"], ["5", "Disciplines"], ["1", "Gallery space"]].map(([n, l]) => (
            <div key={l}><p className="font-serif text-5xl">{n}</p><p className="eyebrow mt-2">{l}</p></div>
          ))}
        </div>
      </section>
    </>
  );
}
