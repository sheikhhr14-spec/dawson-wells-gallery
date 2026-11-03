import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ARTWORKS, CATEGORIES, type CategorySlug } from "@/lib/data";
import { ArtworkCard } from "@/components/artwork-card";
import { PageHeader } from "@/components/site-chrome";

type S = { category?: CategorySlug };

export const Route = createFileRoute("/artworks/")({
  validateSearch: (s: Record<string, unknown>): S => {
    const c = s["category"] as string | undefined;
    return CATEGORIES.some((x) => x.slug === c) ? { category: c as CategorySlug } : {};
  },
  head: () => ({
    meta: [
      { title: "Artworks — Dawson Wells Gallery" },
      { name: "description", content: "Browse paintings, photography, drawings, ceramics and prints from the Dawson Wells Gallery collection." },
      { property: "og:title", content: "Artworks — Dawson Wells Gallery" },
      { property: "og:description", content: "Search and filter the full collection." },
    ],
  }),
  component: Artworks,
});

function Artworks() {
  const { category } = Route.useSearch();
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("new");
  const list = useMemo(() => {
    const t = q.toLowerCase();
    return ARTWORKS.filter((a) => (!category || a.category === category) && (!t || `${a.title} ${a.medium} ${a.year}`.toLowerCase().includes(t)))
      .sort((a, b) => (sort === "new" ? b.year - a.year : sort === "old" ? a.year - b.year : a.title.localeCompare(b.title)));
  }, [category, q, sort]);
  const label = CATEGORIES.find((c) => c.slug === category)?.label;

  return (
    <>
      <PageHeader eyebrow="The collection" title={label ?? "Artworks"} intro="Every work in the Dawson Wells collection, available to view in person at the gallery." />
      <div className="sticky top-20 z-30 border-y bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-6 py-4">
          <div className="flex flex-wrap gap-2">
            <Link to="/artworks" search={{}} className={`px-4 py-2 text-sm border ${!category ? "bg-primary text-primary-foreground border-primary" : "hover:border-foreground"}`}>All</Link>
            {CATEGORIES.map((c) => (
              <Link key={c.slug} to="/artworks" search={{ category: c.slug }} className={`px-4 py-2 text-sm border ${category === c.slug ? "bg-primary text-primary-foreground border-primary" : "hover:border-foreground"}`}>{c.label}</Link>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <label className="flex items-center gap-2 border px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title, medium, year" className="w-52 bg-transparent text-sm outline-none" />
            </label>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="border bg-transparent px-3 py-2 text-sm">
              <option value="new">Newest</option>
              <option value="old">Oldest</option>
              <option value="az">A–Z</option>
            </select>
          </div>
        </div>
      </div>
      <section className="mx-auto max-w-7xl px-6 pt-12">
        <p className="eyebrow mb-10">{list.length} works</p>
        {list.length ? (
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">{list.map((a) => <ArtworkCard key={a.slug} a={a} />)}</div>
        ) : (
          <p className="py-24 text-center font-serif text-3xl text-muted-foreground">No works match your search.</p>
        )}
      </section>
    </>
  );
}
