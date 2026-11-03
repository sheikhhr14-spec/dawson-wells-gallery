import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { CATEGORIES } from "@/lib/data";

type Sub = { label: string; to: string; search?: Record<string, string>; hash?: string };
type Item = { label: string; to: string; children?: Sub[] };

const NAV: Item[] = [
  { label: "Home", to: "/" },
  {
    label: "About",
    to: "/about",
    children: [
      { label: "Mission & Vision", to: "/about/mission-vision" },
      { label: "Company Overview", to: "/about/company-overview" },
    ],
  },
  {
    label: "Artworks",
    to: "/artworks",
    children: CATEGORIES.map((c) => ({ label: c.label, to: "/artworks", search: { category: c.slug } })),
  },
  { label: "News & Updates", to: "/news" },
  { label: "Contact", to: "/contact", children: [{ label: "Inquiry / Contact Form", to: "/contact", hash: "inquiry" }] },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const L = Link as any;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40">
      <div className="bg-accent text-accent-foreground">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6 text-[0.68rem] uppercase tracking-[0.25em]">
          <span className="opacity-80">Now on view — Surface &amp; Silence</span>
          <span className="hidden opacity-80 sm:block">Tue – Sat · 11:00 – 18:00</span>
        </div>
      </div>
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:flex-col md:gap-5">
          <Link to="/" className="text-center leading-none">
            <span className="block font-serif text-3xl tracking-tight md:text-4xl">Dawson <em className="text-accent">Wells</em></span>
            <span className="mt-1 block text-[0.62rem] uppercase tracking-[0.5em] text-muted-foreground">Gallery · New York</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <div key={n.label} className="group relative">
                <L
                  to={n.to}
                  activeOptions={{ exact: n.to === "/" }}
                  className="flex items-center gap-1 px-5 py-2 text-[0.72rem] uppercase tracking-[0.22em] transition-colors hover:text-accent"
                  activeProps={{ className: "text-accent" }}
                >
                  {n.label}
                  {n.children && <ChevronDown className="h-3 w-3 opacity-60 transition group-hover:rotate-180" />}
                </L>
                {n.children && (
                  <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="min-w-56 border bg-popover py-3 shadow-[var(--shadow-soft)]">
                      {n.children.map((c) => (
                        <L key={c.label} to={c.to} search={c.search} hash={c.hash} className="block px-6 py-2.5 text-sm transition hover:bg-secondary hover:pl-7 hover:text-accent">
                          {c.label}
                        </L>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav className="border-t px-6 py-4 md:hidden">
            {NAV.map((n) => (
              <div key={n.label} className="border-b py-3 last:border-0">
                <L to={n.to} onClick={() => setOpen(false)} className="block font-serif text-2xl">{n.label}</L>
                {n.children?.map((c) => (
                  <L key={c.label} to={c.to} search={c.search} hash={c.hash} onClick={() => setOpen(false)} className="block py-1.5 pl-4 text-sm text-muted-foreground">
                    {c.label}
                  </L>
                ))}
              </div>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t bg-card">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <p className="font-serif text-5xl md:text-7xl">Dawson Wells <em className="text-accent">Gallery</em></p>
        <div className="mt-16 grid gap-12 border-t border-border pt-12 md:grid-cols-4">
          <div className="text-sm opacity-80 md:col-span-2 max-w-sm">
            Modern and contemporary art, presented with care. Visit us in person to experience the collection.
          </div>
          <div className="text-sm">
            <p className="mb-4 text-[0.68rem] uppercase tracking-[0.25em] opacity-60">Visit</p>
            <p>New York, NY</p>
            <p className="mt-2 opacity-60">Tue–Sat, 11:00–18:00</p>
          </div>
          <div className="text-sm">
            <p className="mb-4 text-[0.68rem] uppercase tracking-[0.25em] opacity-60">Explore</p>
            {NAV.map((n) => (
              <L key={n.label} to={n.to} className="block py-1 opacity-90 hover:text-accent">{n.label}</L>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-[0.68rem] uppercase tracking-[0.25em] opacity-60">
        © 2026 Dawson Wells Gallery · All rights reserved
      </div>
    </footer>
  );
}

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16 pt-24 text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mx-auto mt-5 max-w-6xl text-7xl leading-[0.88] md:text-[9rem]">{title}</h1>
      <div className="mx-auto mt-8 h-px w-16 bg-accent" />
      {intro && <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
    </section>
  );
}
