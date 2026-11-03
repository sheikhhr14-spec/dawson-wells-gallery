export function MissionVision() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-px bg-border px-0 md:grid-cols-2">
      {[
        ["Mission", "To bring people closer to remarkable work.", "We present art that rewards attention — chosen for quality, material integrity and lasting presence — and create the conditions for visitors to encounter it fully."],
        ["Vision", "A gallery recognised worldwide for its eye.", "To become an internationally respected destination for modern and contemporary art, known for considered presentation and meaningful visitor experiences."],
      ].map(([k, h, p]) => (
        <div key={k} className="bg-background p-10 md:p-16">
          <p className="eyebrow">{k}</p>
          <h2 className="mt-4 text-4xl md:text-5xl">{h}</h2>
          <p className="mt-6 text-muted-foreground">{p}</p>
        </div>
      ))}
    </section>
  );
}

export function CompanyOverview() {
  return (
    <section className="mx-auto max-w-4xl px-6 text-center">
      <p className="font-serif text-3xl leading-snug md:text-4xl">
        Founded as an independent gallery, Dawson Wells holds a single, carefully built collection spanning photography, painting, drawing, ceramics and printmaking. We exist to share it — through exhibitions, private viewings and a programme of talks and events.
      </p>
      <div className="mt-16 grid grid-cols-3 border-y py-12">
        {[["100+", "Works in collection"], ["5", "Disciplines"], ["1", "Gallery space"]].map(([n, l]) => (
          <div key={l}><p className="font-serif text-6xl text-accent">{n}</p><p className="eyebrow mt-3">{l}</p></div>
        ))}
      </div>
    </section>
  );
}
