import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-chrome";
import { POSTS } from "@/lib/data";

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [
      { title: "News & Updates — Dawson Wells Gallery" },
      { name: "description", content: "Exhibitions, events, new acquisitions and gallery announcements." },
      { property: "og:title", content: "News & Updates — Dawson Wells Gallery" },
      { property: "og:description", content: "The latest from the gallery." },
    ],
  }),
  component: News,
});

const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

function News() {
  const lead = POSTS[0]!;
  const rest = POSTS.slice(1);
  return (
    <>
      <PageHeader eyebrow="Journal" title="News & Updates" />
      <section className="mx-auto max-w-[1440px] px-6 md:px-12">
        <Link to="/news/$slug" params={{ slug: lead.slug }} className="group grid gap-10 md:grid-cols-2">
          <div className="aspect-[4/3] overflow-hidden"><img src={lead.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div>
          <div className="self-center">
            <p className="eyebrow">{lead.tag} · {fmt(lead.date)}</p>
            <h2 className="mt-4 text-5xl group-hover:text-accent">{lead.title}</h2>
            <p className="mt-6 text-muted-foreground">{lead.excerpt}</p>
          </div>
        </Link>
        <div className="mt-24 divide-y border-y">
          {rest.map((p) => (
            <Link key={p.slug} to="/news/$slug" params={{ slug: p.slug }} className="group grid items-center gap-6 py-8 md:grid-cols-[200px_1fr_160px]">
              <img src={p.image} alt="" loading="lazy" className="aspect-[3/2] w-full object-cover" />
              <div><h3 className="text-3xl group-hover:text-accent">{p.title}</h3><p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p></div>
              <p className="eyebrow md:text-right">{p.tag}<br />{fmt(p.date)}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
