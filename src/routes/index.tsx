import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ARTWORKS, CATEGORIES, POSTS, IMAGES } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dawson Wells Gallery — Modern & Contemporary Art, New York" },
      { name: "description", content: "Discover the Dawson Wells Gallery collection of modern and contemporary painting, photography, drawing, ceramics and prints in New York." },
      { property: "og:title", content: "Dawson Wells Gallery — Modern & Contemporary Art" },
      { property: "og:description", content: "Discover the collection and plan your visit in New York." },
    ],
  }),
  component: Home,
});

const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

function Home() {
  const [a0, a1, a2, a3, a4, a5] = ARTWORKS;
  const catImg = (slug: string) => ARTWORKS.find((a) => a.category === slug)!.images[0];
  return (
    <>
      {/* Immersive hero */}
      <section className="mx-auto grid max-w-[1440px] gap-10 px-6 md:px-12 pb-20 pt-12 lg:min-h-[calc(100vh-9rem)] lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="order-2 lg:order-1">
          <p className="eyebrow !text-accent">Now on view · Surface &amp; Silence</p>
          <h1 className="mt-6 text-[clamp(4.5rem,10vw,10rem)] leading-[0.85]">
            See<br /><em className="text-accent">slowly.</em>
          </h1>
          <p className="mt-8 max-w-md text-lg text-muted-foreground">Modern and contemporary works from the Dawson Wells collection — presented to be experienced in person.</p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link to="/artworks" className="group inline-flex items-center gap-3 bg-primary px-8 py-5 text-xs uppercase tracking-[0.2em] text-primary-foreground transition hover:bg-accent">
              Explore the collection <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link to="/contact" className="text-xs uppercase tracking-[0.2em] underline-offset-8 hover:underline">Plan a visit — New York, NY</Link>
          </div>
        </div>
        <figure className="order-1 lg:order-2">
          <div className="overflow-hidden shadow-[var(--shadow-soft)]">
            <img src={IMAGES.hero} alt="Ochre Threshold, oil and wax on canvas" width={1920} height={1088} className="aspect-[4/5] w-full scale-[1.6] object-cover lg:aspect-[5/6]" />
          </div>
          <figcaption className="mt-4 flex justify-between text-xs text-muted-foreground">
            <span><em className="font-serif text-base text-foreground">Ochre Threshold</em>, 2024</span><span>Oil and wax on canvas</span>
          </figcaption>
        </figure>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y bg-primary py-6 text-primary-foreground">
        <div className="flex w-max animate-[marquee_30s_linear_infinite] gap-12 whitespace-nowrap font-serif text-4xl italic">
          {[...CATEGORIES, ...CATEGORIES, ...CATEGORIES].map((c, i) => (
            <span key={i} className="flex items-center gap-12">{c.label}<span className="not-italic text-accent">✦</span></span>
          ))}
        </div>
      </div>

      {/* Statement */}
      <section className="mx-auto max-w-[1440px] px-6 md:px-12 py-44">
        <p className="eyebrow">Dawson Wells Gallery</p>
        <p className="mt-8 max-w-5xl font-serif text-5xl leading-[1.05] md:text-7xl">
          Modern and contemporary art with <em className="text-accent">presence</em> — chosen to be experienced in the room, not on a screen.
        </p>
      </section>

      {/* Expressive asymmetric works */}
      <section className="mx-auto max-w-[1440px] px-6">
        <div className="mb-14 flex items-end justify-between border-b pb-6">
          <h2 className="text-6xl md:text-8xl">Selected <em>works</em></h2>
          <Link to="/artworks" className="hidden items-center gap-2 text-xs uppercase tracking-[0.2em] hover:text-accent md:flex">All {ARTWORKS.length} works <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <Work a={a0!} className="col-span-12 md:col-span-7 md:row-span-2" tall />
          <Work a={a4!} className="col-span-12 md:col-span-5" />
          <Work a={a1!} className="col-span-12 md:col-span-5" />
          <Work a={a5!} className="col-span-12 md:col-span-4 md:mt-24" />
          <Work a={a3!} className="col-span-12 md:col-span-4" />
          <Work a={a2!} className="col-span-12 md:col-span-4 md:mt-40" />
        </div>
      </section>

      {/* Category tiles */}
      <section className="mt-40 grid md:grid-cols-5">
        {CATEGORIES.map((c, i) => (
          <Link key={c.slug} to="/artworks" search={{ category: c.slug }} className="group relative aspect-[3/4] overflow-hidden md:aspect-[2/3]">
            <img src={catImg(c.slug)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-90 grayscale transition duration-700 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="eyebrow">0{i + 1}</span>
              <p className="mt-2 flex items-center justify-between font-serif text-4xl">{c.label}<ArrowUpRight className="h-5 w-5 text-accent opacity-0 transition group-hover:opacity-100" /></p>
            </div>
          </Link>
        ))}
      </section>

      {/* Visit split */}
      <section className="relative mt-40 overflow-hidden">
        <img src={IMAGES.interior} alt="Gallery interior" loading="lazy" className="h-[80vh] w-full object-cover" />
        <div className="absolute inset-0 bg-foreground/20" />
        <div className="absolute inset-0 mx-auto flex max-w-[1440px] items-center px-6">
          <div className="max-w-lg bg-background p-10 shadow-[var(--shadow-soft)] md:p-14">
            <p className="eyebrow !text-accent">Visit</p>
            <h2 className="mt-4 text-5xl md:text-6xl">Experience it <em>in person.</em></h2>
            <p className="mt-6 text-muted-foreground">New York, NY · Tuesday – Saturday, 11:00 – 18:00. Private viewings by appointment.</p>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 border-b border-accent pb-1 text-xs uppercase tracking-[0.2em] hover:text-accent">Plan your visit <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="mx-auto max-w-[1440px] px-6 md:px-12 pt-40">
        <h2 className="text-6xl md:text-8xl">News &amp; <em className="text-accent">Updates</em></h2>
        <div className="mt-14 divide-y border-y">
          {POSTS.map((p) => (
            <Link key={p.slug} to="/news/$slug" params={{ slug: p.slug }} className="group grid items-center gap-6 py-8 md:grid-cols-[140px_1fr_180px_40px]">
              <span className="eyebrow">{fmt(p.date)}</span>
              <h3 className="text-3xl transition group-hover:translate-x-2 group-hover:text-accent md:text-4xl">{p.title}</h3>
              <img src={p.image} alt="" loading="lazy" className="hidden aspect-[3/2] w-full object-cover opacity-0 transition group-hover:opacity-100 md:block" />
              <ArrowUpRight className="hidden h-6 w-6 text-accent md:block" />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}


function Work({ a, className, tall }: { a: (typeof ARTWORKS)[number]; className?: string; tall?: boolean }) {
  return (
    <Link to="/artworks/$slug" params={{ slug: a.slug }} className={`group block ${className ?? ""}`}>
      <div className={`overflow-hidden bg-card ${tall ? "aspect-[4/5] md:aspect-auto md:h-[calc(100%-5rem)]" : "aspect-[4/5]"}`}>
        <img src={a.images[0]} alt={a.title} loading="lazy" className="h-full w-full object-cover transition duration-1000 group-hover:scale-105" />
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="text-3xl italic transition group-hover:text-accent">{a.title}</h3>
        <span className="text-sm text-muted-foreground">{a.year}</span>
      </div>
      <p className="eyebrow mt-1">{a.medium}</p>
    </Link>
  );
}
