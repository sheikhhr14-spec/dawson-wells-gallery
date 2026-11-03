import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getPost } from "@/lib/data";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const p = getPost(params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Dawson Wells Gallery` },
          { name: "description", content: loaderData.excerpt },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.excerpt },
          { property: "og:type", content: "article" },
        ]
      : [{ title: "Article unavailable" }, { name: "robots", content: "noindex" }],
  }),
  component: Post,
});

function Post() {
  const p = Route.useLoaderData();
  return (
    <article className="mx-auto max-w-3xl px-6 pt-12">
      <Link to="/news" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> All news</Link>
      <p className="eyebrow mt-12">{p.tag} · {new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
      <h1 className="mt-4 text-5xl md:text-7xl">{p.title}</h1>
      <img src={p.image} alt="" className="mt-12 aspect-[16/10] w-full object-cover" />
      <div className="mt-12 space-y-6 text-lg leading-relaxed">
        <p className="font-serif text-2xl">{p.excerpt}</p>
        {p.body.map((b, i) => <p key={i} className="text-muted-foreground">{b}</p>)}
      </div>
    </article>
  );
}
