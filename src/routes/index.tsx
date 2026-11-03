import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ARTWORKS, CATEGORIES, POSTS, IMAGES } from "@/lib/data";
import { ArtworkCard } from "@/components/artwork-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dawson Wells Gallery — Modern & Contemporary Art" },
      { name: "description", content: "Discover the Dawson Wells Gallery collection of modern and contemporary painting, photography, drawing, ceramics and prints." },
      { property: "og:title", content: "Dawson Wells Gallery — Modern & Contemporary Art" },
      { property: "og:description", content: "Discover the collection and plan your visit." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = ARTWORKS.slice(0, 6);
  return (
    <>
      <section className="relative h-[calc(100vh-9rem)] min-h-[620px] overflow-hidden">
        <img src={IMAGES.hero} alt="Ochre Threshold, oil and wax on canvas" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 text-background">
          <p className="text-xs uppercase tracking-[0.3em] opacity-80">Now on view · Surface & Silence</p>
          <div className="mt-6 h-px w-20 bg-accent" />
          <h1 className="mt-6 max-w-4xl text-6xl leading-[0.92] md:text-[8.5rem]">Art that asks to be <em>seen slowly.</em></h1>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/artworks" className="inline-flex items-center gap-2 bg-background px-7 py-4 text-sm text-foreground tracking-[0.18em] uppercase text-xs transition hover:bg-accent hover:text-accent-foreground">
              Explore the collection <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center border border-background/60 px-7 py-4 text-xs uppercase tracking-[0.18em] transition hover:bg-background/10">
              Plan a visit
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-10 md:grid-cols-5">
          {CATEGORIES.map((c, i) => (
            <Link key={c.slug} to="/artworks" search={{ category: c.slug }} className="group border-t pt-5">
              <span className="eyebrow">0{i + 1}</span>
              <p className="mt-3 flex items-center justify-between font-serif text-3xl group-hover:text-accent">
                {c.label} <ArrowRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="eyebrow">Selected works</p>
            <h2 className="mt-3 text-5xl md:text-6xl">From the collection</h2>
          </div>
          <Link to="/artworks" className="hidden text-sm underline-offset-4 hover:underline md:block">View all {ARTWORKS.length} works</Link>
        </div>
        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((a) => <ArtworkCard key={a.slug} a={a} />)}
        </div>
      </section>

      <section className="mt-32 bg-card">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2">
          <img src={IMAGES.interior} alt="Gallery interior" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          <div>
            <p className="eyebrow">The gallery</p>
            <h2 className="mt-3 text-5xl">A space for looking, thinking and returning.</h2>
            <p className="mt-6 text-muted-foreground">Dawson Wells Gallery holds a focused collection of modern and contemporary work. Every piece is chosen for its presence in the room — and is best experienced in person.</p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm">About the gallery <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-24">
        <p className="eyebrow">Journal</p>
        <h2 className="mt-3 text-5xl">News & Updates</h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {POSTS.map((p) => (
            <Link key={p.slug} to="/news/$slug" params={{ slug: p.slug }} className="group">
              <div className="aspect-[3/2] overflow-hidden"><img src={p.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div>
              <p className="eyebrow mt-4">{p.tag} · {new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
              <h3 className="mt-2 text-2xl group-hover:text-accent">{p.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
