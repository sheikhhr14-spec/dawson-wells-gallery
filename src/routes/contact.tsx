import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>): { artwork?: string } =>
    typeof s["artwork"] === "string" ? { artwork: s["artwork"] } : {},
  head: () => ({
    meta: [
      { title: "Contact & Visit — Dawson Wells Gallery" },
      { name: "description", content: "Plan a visit, book a private viewing or enquire about a work in the Dawson Wells collection." },
      { property: "og:title", content: "Contact — Dawson Wells Gallery" },
      { property: "og:description", content: "Enquiries and visits." },
    ],
  }),
  component: Contact,
});

const field = "w-full border-b bg-transparent py-3 outline-none focus:border-foreground";

function Contact() {
  const { artwork } = Route.useSearch();
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHeader eyebrow="Contact" title="Visit & Enquire" />
      <section className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-[1fr_1.4fr]">
        <div className="space-y-10 text-sm">
          <div><p className="eyebrow mb-3">Address</p><p className="font-serif text-2xl">24 Mercer Lane<br />London W1, United Kingdom</p></div>
          <div><p className="eyebrow mb-3">Opening hours</p><p>Tuesday – Saturday · 11:00 – 18:00</p><p className="text-muted-foreground">Private viewings by appointment</p></div>
          <div><p className="eyebrow mb-3">Enquiries</p><p>info@dawsonwells.gallery</p><p>+44 20 0000 0000</p></div>
        </div>
        {sent ? (
          <div className="flex flex-col justify-center border bg-card p-12">
            <h2 className="text-4xl">Thank you.</h2>
            <p className="mt-4 text-muted-foreground">Your enquiry has been received. A confirmation email is on its way and our team will reply within two working days.</p>
          </div>
        ) : (
          <form
            className="grid gap-8 sm:grid-cols-2"
            onSubmit={(e) => { e.preventDefault(); setSent(true); toast.success("Enquiry sent"); }}
          >
            <input required placeholder="Full name" className={field} />
            <input required type="email" placeholder="Email" className={field} />
            <input placeholder="Phone (optional)" className={field} />
            <select className={field} defaultValue={artwork ? "artwork" : "visit"}>
              <option value="visit">Plan a visit</option>
              <option value="artwork">Artwork enquiry</option>
              <option value="viewing">Private viewing</option>
              <option value="press">Press</option>
            </select>
            {artwork && <input defaultValue={artwork} className={`${field} sm:col-span-2`} aria-label="Artwork" />}
            <textarea required rows={5} placeholder="Your message" className={`${field} sm:col-span-2 resize-none`} />
            <button className="bg-primary px-8 py-4 text-sm text-primary-foreground hover:bg-accent sm:col-span-2 sm:justify-self-start">Send enquiry</button>
          </form>
        )}
      </section>
    </>
  );
}
