import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { CATEGORIES } from "@/lib/data";

const NAV = [
  { to: "/about", label: "About" },
  { to: "/artworks", label: "Artworks" },
  { to: "/news", label: "News & Updates" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="font-serif text-2xl leading-none">
          Dawson Wells <span className="italic text-muted-foreground">Gallery</span>
        </Link>
        <nav className="hidden items-center gap-10 md:flex">
          {NAV.map((n) =>
            n.to === "/artworks" ? (
              <div key={n.to} className="group relative">
                <Link to="/artworks" className="text-sm tracking-wide hover:text-accent" activeProps={{ className: "text-accent" }}>
                  {n.label}
                </Link>
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-6 opacity-0 transition group-hover:visible group-hover:opacity-100">
                  <div className="w-48 border bg-popover py-3 shadow-sm">
                    {CATEGORIES.map((c) => (
                      <Link key={c.slug} to="/artworks" search={{ category: c.slug }} className="block px-5 py-2 text-sm hover:bg-secondary">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={n.to} to={n.to} className="text-sm tracking-wide hover:text-accent" activeProps={{ className: "text-accent" }}>
                {n.label}
              </Link>
            ),
          )}
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="border-t px-6 py-4 md:hidden">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block py-3 font-serif text-2xl">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-serif text-3xl">Dawson Wells Gallery</p>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Modern and contemporary art, presented with care. Visit us in person to experience the collection.
          </p>
        </div>
        <div className="text-sm">
          <p className="eyebrow mb-4">Visit</p>
          <p>24 Mercer Lane</p>
          <p>London W1 · United Kingdom</p>
          <p className="mt-2 text-muted-foreground">Tue–Sat, 11:00–18:00</p>
        </div>
        <div className="text-sm">
          <p className="eyebrow mb-4">Explore</p>
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="block py-1 hover:text-accent">{n.label}</Link>
          ))}
        </div>
      </div>
      <div className="border-t py-6 text-center text-xs text-muted-foreground">© 2026 Dawson Wells Gallery</div>
    </footer>
  );
}

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-12 pt-20">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-4 text-6xl md:text-8xl">{title}</h1>
      {intro && <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
    </section>
  );
}
