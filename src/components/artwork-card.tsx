import { Link } from "@tanstack/react-router";
import { CATEGORIES, type Artwork } from "@/lib/data";

export function ArtworkCard({ a }: { a: Artwork }) {
  const cat = CATEGORIES.find((c) => c.slug === a.category)?.label;
  return (
    <Link to="/artworks/$slug" params={{ slug: a.slug }} className="group block">
      <div className="aspect-[4/5] overflow-hidden bg-card">
        <img src={a.images[0]} alt={a.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="text-2xl italic">{a.title}</h3>
        <span className="text-sm text-muted-foreground">{a.year}</span>
      </div>
      <p className="eyebrow mt-1">{cat} · {a.medium}</p>
    </Link>
  );
}
