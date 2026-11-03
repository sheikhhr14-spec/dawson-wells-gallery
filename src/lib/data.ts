import p1 from "@/assets/art-painting-1.jpg";
import p2 from "@/assets/art-painting-2.jpg";
import hero from "@/assets/hero.jpg";
import ph1 from "@/assets/art-photo-1.jpg";
import ph2 from "@/assets/art-photo-2.jpg";
import d1 from "@/assets/art-drawing-1.jpg";
import c1 from "@/assets/art-ceramic-1.jpg";
import pr1 from "@/assets/art-print-1.jpg";
import interior from "@/assets/gallery-interior.jpg";

export const CATEGORIES = [
  { slug: "photography", label: "Photography" },
  { slug: "paintings", label: "Paintings" },
  { slug: "drawings", label: "Drawings" },
  { slug: "ceramics", label: "Ceramics" },
  { slug: "prints", label: "Prints" },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export type Artwork = {
  slug: string;
  title: string;
  category: CategorySlug;
  year: number;
  medium: string;
  dimensions: string;
  images: string[];
  description: string;
  edition?: string;
};

const pool: Record<CategorySlug, string[]> = {
  paintings: [p1, p2, hero],
  photography: [ph1, ph2],
  drawings: [d1],
  ceramics: [c1],
  prints: [pr1],
};

const seed: Array<Omit<Artwork, "images" | "slug" | "description"> & { desc?: string }> = [
  { title: "Meridian Fold", category: "paintings", year: 2023, medium: "Oil on linen", dimensions: "180 × 140 cm" },
  { title: "Garden Without Walls", category: "paintings", year: 2022, medium: "Acrylic on canvas", dimensions: "120 × 120 cm" },
  { title: "Ochre Threshold", category: "paintings", year: 2024, medium: "Oil and wax on canvas", dimensions: "240 × 160 cm" },
  { title: "Tidal Geometry", category: "paintings", year: 2021, medium: "Oil on canvas", dimensions: "150 × 110 cm" },
  { title: "Concrete Hymn", category: "photography", year: 2020, medium: "Gelatin silver print", dimensions: "90 × 70 cm", edition: "Edition of 5 + 2 AP" },
  { title: "Low Moon, Atacama", category: "photography", year: 2023, medium: "Archival pigment print", dimensions: "110 × 85 cm", edition: "Edition of 7" },
  { title: "Passage II", category: "photography", year: 2019, medium: "Gelatin silver print", dimensions: "60 × 48 cm", edition: "Edition of 8" },
  { title: "Rose Hour", category: "photography", year: 2024, medium: "C-type print, Diasec", dimensions: "140 × 105 cm", edition: "Edition of 3" },
  { title: "Botanical Architecture", category: "drawings", year: 2022, medium: "Ink and graphite on paper", dimensions: "70 × 55 cm" },
  { title: "Study for a Staircase", category: "drawings", year: 2021, medium: "Graphite on Arches paper", dimensions: "56 × 44 cm" },
  { title: "Field Notes VII", category: "drawings", year: 2023, medium: "Ink on paper", dimensions: "42 × 30 cm" },
  { title: "Vessel of Rain", category: "ceramics", year: 2023, medium: "Wood-fired stoneware, ash glaze", dimensions: "38 × 30 × 30 cm" },
  { title: "Black Drip Jar", category: "ceramics", year: 2022, medium: "Stoneware, tenmoku glaze", dimensions: "32 × 26 × 26 cm" },
  { title: "Quiet Form", category: "ceramics", year: 2024, medium: "Speckled stoneware", dimensions: "45 × 22 × 22 cm" },
  { title: "Eclipse (Red/Black)", category: "prints", year: 2021, medium: "Screenprint on Somerset paper", dimensions: "76 × 76 cm", edition: "Edition of 100" },
  { title: "Twin Suns", category: "prints", year: 2022, medium: "Lithograph", dimensions: "60 × 60 cm", edition: "Edition of 40" },
  { title: "Overlap No. 3", category: "prints", year: 2024, medium: "Relief print", dimensions: "50 × 50 cm", edition: "Edition of 25" },
  { title: "Rust Cartography", category: "paintings", year: 2020, medium: "Oil on panel", dimensions: "90 × 70 cm" },
];

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const ARTWORKS: Artwork[] = seed.map((a, i) => {
  const imgs = pool[a.category];
  const first = imgs[i % imgs.length];
  const images = [first, ...imgs.filter((x) => x !== first), interior];
  return {
    ...a,
    slug: slugify(a.title),
    images,
    description:
      "A work from the Dawson Wells Gallery permanent collection. The piece explores the tension between structure and spontaneity — a quiet dialogue of material, light and surface that rewards slow looking in person.",
  };
});

export const getArtwork = (slug: string) => ARTWORKS.find((a) => a.slug === slug);

export type Post = {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  image: string;
  body: string[];
};

export const POSTS: Post[] = [
  {
    slug: "winter-exhibition-surface-and-silence",
    title: "Winter Exhibition: Surface & Silence",
    date: "2026-11-20",
    tag: "Exhibition",
    excerpt: "Our winter show brings together twenty works that reward patience — paintings, ceramics and photographs in quiet conversation.",
    image: interior,
    body: [
      "Opening this December, Surface & Silence is the gallery's most ambitious presentation yet, drawing from every corner of the collection.",
      "The exhibition is arranged as a slow procession through texture: from the heavy impasto of our large-format paintings to the ash-glazed surfaces of wood-fired ceramics.",
      "Join us for the opening evening. Entry is free; registration is recommended.",
    ],
  },
  {
    slug: "new-acquisitions-photography",
    title: "New Acquisitions in Photography",
    date: "2026-10-08",
    tag: "New Works",
    excerpt: "Four new photographic works join the collection, including large-format prints from the Atacama series.",
    image: ph2,
    body: [
      "We're delighted to announce four new photographic works entering the collection this autumn.",
      "Each is now available to view by appointment in our private viewing room.",
    ],
  },
  {
    slug: "evening-talk-ceramics",
    title: "Evening Talk: The Language of Clay",
    date: "2026-09-14",
    tag: "Event",
    excerpt: "A conversation on firing, chance and form, held among the ceramics in our east gallery.",
    image: c1,
    body: [
      "An intimate evening exploring the ceramic works in the collection and the traditions that inform them.",
      "Seating is limited to forty guests.",
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

export const IMAGES = { hero, interior };
