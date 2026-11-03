import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { ARTWORKS, CATEGORIES, getArtwork } from "@/lib/data";
import { ArtworkCard } from "@/components/artwork-card";

export const Route = createFileRoute("/artworks/$slug")({
  loader: ({ params }) => {
    const a = getArtwork(params.slug);
    if (!a) throw notFound();
    return a;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title}, ${loaderData.year} — Dawson Wells Gallery` },
          { name: "description", content: `${loaderData.medium}, ${loaderData.dimensions}. View at Dawson Wells Gallery.` },
          { property: "og:title", content: `${loaderData.title} — Dawson Wells Gallery` },
          { property: "og:description", content: `${loaderData.medium}, ${loaderData.year}` },
        ]
      : [{ title: "Artwork unavailable" }, { name: "robots", content: "noindex" }],
  }),
  component: Detail,
});

function Detail() {
  const a = Route.useLoaderData();
  const [i, setI] = useState(0);
  const cat = CATEGORIES.find((c) => c.slug === a.category)!;
  const related = ARTWORKS.filter((x) => x.category === a.category && x.slug !== a.slug).slice(0, 3);
  const rows = [
    ["Year", a.year],
    ["Medium", a.medium],
    ["Dimensions", a.dimensions],
    ["Category", cat.label],
    ...(a.edition ? [["Edition", a.edition]] : []),
  ];
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 pt-10">
        <Link to="/artworks" search={{ category: a.category }} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> {cat.label}
        </Link>
      </div>
      <section className="mx-auto grid max-w-7xl gap-12 px-6 pt-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="flex aspect-[4/5] items-center justify-center bg-card p-6 md:p-12">
            <img key={i} src={a.images[i]} alt={a.title} className="max-h-full max-w-full object-contain animate-in fade-in duration-500" />
          </div>
          <div className="mt-4 flex gap-3">
            {a.images.map((src, idx) => (
              <button key={idx} onClick={() => setI(idx)} className={`h-20 w-20 overflow-hidden border-2 ${idx === i ? "border-foreground" : "border-transparent opacity-60 hover:opacity-100"}`}>
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Dawson Wells Collection</p>
          <h1 className="mt-3 text-5xl italic md:text-6xl">{a.title}</h1>
          <dl className="mt-10 divide-y border-y">
            {rows.map(([k, v]) => (
              <div key={String(k)} className="flex justify-between py-4 text-sm">
                <dt className="text-muted-foreground">{k}</dt><dd className="text-right">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 leading-relaxed text-muted-foreground">{a.description}</p>
          <Link to="/contact" search={{ artwork: a.title }} className="mt-10 inline-flex w-full justify-center bg-primary px-6 py-4 text-sm text-primary-foreground hover:bg-accent">
            Enquire about this work
          </Link>
          <p className="mt-3 text-center text-xs text-muted-foreground">Viewings by appointment at the gallery</p>
        </div>
      </section>
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pt-32">
          <h2 className="mb-10 text-4xl">More {cat.label.toLowerCase()}</h2>
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">{related.map((r) => <ArtworkCard key={r.slug} a={r} />)}</div>
        </section>
      )}
    </>
  );
}
