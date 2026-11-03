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
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex h-8 max-w-[1440px] items-center justify-between px-6 md:px-12 text-[0.6rem] font-medium uppercase tracking-[0.32em] md:px-12">
          <span className="opacity-80">Now on view — Surface &amp; Silence</span>
          <span className="hidden opacity-80 sm:block">Tue – Sat · 11:00 – 18:00</span>
        </div>
      </div>
      <div className="border-b bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 md:px-12">
          <Link to="/" className="flex items-baseline gap-3 leading-none">
            <span className="font-serif text-[1.9rem] tracking-tight">Dawson Wells</span>
            <span className="hidden text-[0.6rem] font-medium uppercase tracking-[0.4em] text-muted-foreground sm:inline">New York</span>
          </Link>
          <nav className="hidden items-center lg:flex">
            {NAV.map((n) => (
              <div key={n.label} className="group relative">
                <L
                  to={n.to}
                  activeOptions={{ exact: n.to === "/" }}
                  className="relative flex items-center gap-1 px-5 py-7 text-[0.68rem] font-medium uppercase tracking-[0.24em] text-foreground/70 transition-colors hover:text-foreground after:absolute after:inset-x-5 after:bottom-5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100"
                  activeProps={{ className: "!text-foreground after:!scale-x-100" }}
                >
                  {n.label}
                  {n.children && <ChevronDown className="h-3 w-3 opacity-50 transition group-hover:rotate-180" />}
                </L>
                {n.children && (
                  <div className="invisible absolute left-0 top-full z-50 -mt-1 translate-y-2 opacity-0 transition duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="min-w-64 border bg-popover py-4 shadow-[var(--shadow-soft)]">
                      {n.children.map((c) => (
                        <L key={c.label} to={c.to} search={c.search} hash={c.hash} className="block px-7 py-2.5 font-serif text-xl transition hover:pl-9 hover:text-accent">
                          {c.label}
                        </L>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
          <Link to="/contact" className="hidden border border-foreground px-6 py-3 text-[0.65rem] font-medium uppercase tracking-[0.24em] transition hover:bg-primary hover:text-primary-foreground lg:inline-block">Book a visit</Link>
          <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav className="border-t px-6 py-4 lg:hidden">
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
    <footer className="mt-40 border-t bg-card">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 py-24 md:px-12">
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
    <section className="mx-auto max-w-[1440px] px-6 md:px-12 pb-20 pt-28 md:px-12 md:pt-36">
      <div className="grid gap-10 border-b pb-16 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="eyebrow flex items-center gap-4"><span className="h-px w-10 bg-accent" />{eyebrow}</p>
          <h1 className="mt-8 text-7xl leading-[0.9] md:text-[8.5rem]">{title}</h1>
        </div>
        {intro && <p className="max-w-sm text-base leading-relaxed text-muted-foreground">{intro}</p>}
      </div>
    </section>
  );
}
