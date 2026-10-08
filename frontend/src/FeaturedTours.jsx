"use client";
import { useEffect, useRef, useState } from "react";

// Load Fraunces (Google Fonts / next/font) for the headings; Georgia is the fallback.
const serif = { fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif" };

/* ===== EDIT HERE =====
   The four tours featured on the live homepage (titles, days, prices, ratings, slugs, photos).
   TO CONFIRM: every `level` except the Grand Mosaic's (the site rates it Moderate), every `kinds` and `who` list
   (these drive the two filters; they are my guesses), and the Grand Mosaic's availability (the homepage says Sold Out,
   its own page says "Check availability").
   availability: 'available' | 'check' | 'sold-out'. Bookable tours are always listed first. */
const S =
  "https://vlunzjvalrwlcazcaefl.supabase.co/storage/v1/render/image/public/";
const TOURS = [
  {
    slug: "theth-alpine-adventure",
    image:
      S +
      "tour-media/tours/4e3c43c6-bc81-4012-b677-2d6dcfac34ea/4175e3f3-abd3-4b36-b437-e5e3487ba801.jpg?width=768&quality=78",
    title: "Theth and Blue Eye",
    sub: "2-day Alps escape",
    days: 2,
    price: 128,
    level: "Moderate",
    kinds: ["hiking", "adventure"],
    who: ["couple", "friends"],
    availability: "available",
    rating: 5.0,
    reviews: 1,
  },
  {
    slug: "theth-valbona-hiking-adventure",
    image:
      S +
      "tour-media/tours/30d562ce-38eb-464f-b6d2-dc183f0544f9/21f61b58-2022-403a-b6fa-b3b662f891a0.webp?width=768&quality=78",
    title: "Theth to Valbona Hiking Adventure",
    sub: "3-day Alps crossing",
    days: 3,
    price: 250,
    level: "Moderate",
    kinds: ["hiking", "adventure"],
    who: ["couple", "friends"],
    availability: "available",
    rating: 5.0,
    reviews: 1,
  },
  {
    slug: "albania-slow-travel-journey",
    image:
      S +
      "site-media/library/2026/a9bc420e-78bb-41e9-b6dd-0f024b6f5d7f.jpg?width=768&quality=78",
    title: "Albania Slow Travel Journey",
    sub: "Cultural and coastal adventure",
    days: 12,
    price: 1515,
    level: "Moderate",
    kinds: ["cultural", "beach"],
    who: ["family", "couple", "friends"],
    availability: "available",
    rating: 4.5,
    reviews: 2,
  },
  {
    slug: "albania-grand-mosaic-10-day-tour",
    image:
      S +
      "tour-media/tours/faa0dc48-b482-46d4-a16a-b19156252d18/72ccdcb6-1748-43ae-be6a-1ef85a0c16c4.jpg?width=768&quality=78",
    title: "Albania Grand Mosaic",
    sub: "Alps, heritage and Riviera",
    days: 10,
    price: 1390,
    level: "Moderate",
    kinds: ["cultural", "hiking", "beach"],
    who: ["family", "couple", "friends"],
    availability: "sold-out",
    rating: null,
    reviews: 0,
  },
];
// the two filters from the live homepage
export const KINDS = [
  ["any", "Any"],
  ["hiking", "Hiking Alps"],
  ["beach", "Beach"],
  ["cultural", "Cultural"],
  ["adventure", "Adventures"],
];
export const WHO = [
  ["any", "Anyone"],
  ["family", "Family"],
  ["couple", "Couple"],
  ["friends", "Friends"],
  ["business", "Business"],
];
/* ===== end of editable data ===== */

const LEVEL = { Easy: 1, Moderate: 2, Challenging: 3 };
const AVAIL = {
  available: { label: "Available", cls: "bg-[#141414] text-white", rank: 0 },
  check: { label: "Check dates", cls: "bg-white text-[#141414]", rank: 1 },
  "sold-out": { label: "Sold out", cls: "bg-[#141414] text-white", rank: 2 },
};

const Star = () => (
  <svg
    viewBox="0 0 20 20"
    width="14"
    height="14"
    fill="#e8a317"
    aria-hidden="true"
  >
    <path d="M10 1.5l2.6 5.5 6 .8-4.4 4.1 1.1 5.9L10 14.9 4.7 17.8l1.1-5.9L1.4 7.8l6-.8z" />
  </svg>
);
const Arrow = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/** One tour card. Exported so the tour page can reuse it for "You might also like". */
export function TourCard({
  t,
  imageBase = "/albania/tours",
  i = 0,
  seen = true,
}) {
  const [bad, setBad] = useState(false);
  const a = AVAIL[t.availability] || AVAIL.check;
  const sold = t.availability === "sold-out";
  return (
    <a
      href={`/tour/${t.slug}`}
      style={{ transitionDelay: `${i * 90}ms` }}
      className={`group flex w-[78%] flex-none snap-center flex-col overflow-hidden rounded-3xl border border-black/10 bg-white text-[#141414] shadow-[0_14px_34px_-18px_rgba(22,33,15,.45)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_22px_44px_-18px_rgba(22,33,15,.55)] motion-reduce:transition-none sm:w-auto dark:border-white/10 dark:bg-[#12292f] dark:text-[#e8f0e0] ${seen ? "opacity-100" : "translate-y-4 opacity-0"}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[linear-gradient(135deg,#EFEBE2,#DCD5C4)]">
        {!bad && (
          <img
            src={t.image || `${imageBase}/${t.slug}.jpg`}
            alt={`${t.title}: ${t.sub}`}
            loading="lazy"
            onError={() => setBad(true)}
            className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none ${sold ? "grayscale" : ""}`}
          />
        )}
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold shadow ${a.cls}`}
        >
          {a.label}
        </span>
        <span className="absolute bottom-3 left-3 rounded-full bg-[#0b1a14]/75 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {t.days} {t.days === 1 ? "day" : "days"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 style={serif} className="text-xl font-semibold leading-snug">
          {t.title}
        </h3>
        <p className="mt-1 text-sm opacity-65">{t.sub}</p>

        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5" title={`${t.level} pace`}>
            <span className="flex gap-0.5" aria-hidden="true">
              {[1, 2, 3].map((n) => (
                <i
                  key={n}
                  className={`h-1.5 w-3.5 rounded-full ${n <= (LEVEL[t.level] || 1) ? "bg-[#D93A2B]" : "bg-black/15 dark:bg-white/20"}`}
                />
              ))}
            </span>
            {t.level}
          </span>
          {t.reviews > 0 ? (
            <span className="flex items-center gap-1">
              <Star /> <b>{t.rating.toFixed(1)}</b>{" "}
              <span className="opacity-60">
                ({t.reviews} {t.reviews === 1 ? "review" : "reviews"})
              </span>
            </span>
          ) : (
            <span className="opacity-50">New</span>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between pt-5">
          <div>
            <span className="block text-[11px] uppercase tracking-wider opacity-55">
              from
            </span>
            <b style={serif} className="text-2xl font-semibold">
              €{t.price.toLocaleString("en")}
            </b>
            <span className="ml-1 text-xs opacity-55">per person</span>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#141414] text-white transition group-hover:bg-[#D93A2B] dark:bg-white dark:text-[#141414] dark:group-hover:bg-[#D93A2B] dark:group-hover:text-white">
            <Arrow />
          </span>
        </div>
      </div>
    </a>
  );
}

/** Featured tours: bookable tours first, filter by trip type, swipeable on phones. */
export default function FeaturedTours({
  tours = TOURS,
  toursHref = "/tours",
  imageBase = "/albania/tours",
}) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  const [kind, setKind] = useState("any");
  const [who, setWho] = useState("any");

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const list = tours
    .filter(
      (t) =>
        (kind === "any" || t.kinds.includes(kind)) &&
        (who === "any" || t.who.includes(who)),
    )
    .map((t, idx) => ({ t, idx }))
    .sort(
      (a, b) =>
        (AVAIL[a.t.availability]?.rank ?? 1) -
          (AVAIL[b.t.availability]?.rank ?? 1) || a.idx - b.idx,
    )
    .map((x) => x.t);

  return (
    <section
      ref={ref}
      id="tours"
      aria-labelledby="tours-title"
      className="bg-[#FAF8F4] py-16 text-[#141414] md:py-24 dark:bg-[#0b1a14] dark:text-[#e8f0e0]"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[.25em] text-[#D93A2B]">
              Featured tours
            </p>
            <h2
              id="tours-title"
              style={serif}
              className="max-w-xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl"
            >
              Journeys to start with
            </h2>
          </div>
          <a
            href={toursHref}
            className="group flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
          >
            See all tours{" "}
            <span className="transition-transform group-hover:translate-x-0.5">
              <Arrow />
            </span>
          </a>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            ["What kind of trip?", KINDS, kind, setKind],
            ["Who is going?", WHO, who, setWho],
          ].map(([label, opts, val, set]) => (
            <div key={label} role="group" aria-label={label}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[.2em] opacity-55">
                {label}
              </p>
              <div className="flex flex-wrap gap-2">
                {opts.map(([id, text]) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={val === id}
                    onClick={() => set(id)}
                    className={`rounded-full border px-4 py-1.5 text-sm transition ${val === id ? "border-transparent bg-[#141414] text-white" : "border-black/15 hover:border-black/40 dark:border-white/20"}`}
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm opacity-60" aria-live="polite">
          {list.length} {list.length === 1 ? "tour" : "tours"} match
        </p>

        {list.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-dashed border-black/20 p-8 text-center opacity-70">
            No tours match both choices yet.{" "}
            <a href={toursHref} className="font-semibold underline">
              Browse all tours
            </a>{" "}
            or tell us what you have in mind.
          </p>
        ) : (
          <div
            key={kind + who}
            className="-mx-5 mt-8 flex snap-x gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-4"
          >
            {list.map((t, i) => (
              <TourCard
                key={t.slug}
                t={t}
                i={i}
                imageBase={imageBase}
                seen={seen}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
