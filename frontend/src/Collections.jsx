"use client";
import { useEffect, useRef, useState } from "react";

// Load Fraunces (Google Fonts / next/font) for the headings; Georgia is the fallback.
const serif = { fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif" };

/* ===== EDIT HERE =====
   Slugs match the live site (/collection/<slug>). `image` is the live site's photo for each tile; remove it to use
   public/albania/collections/<slug>.jpg instead (a missing file shows a coloured placeholder). The one-line texts are suggestions: change them freely. */
const COLLECTIONS = [
  {
    slug: "couples-holidays",
    image:
      "https://vlunzjvalrwlcazcaefl.supabase.co/storage/v1/render/image/public/site-media/library/2026/711789d2-4956-48a8-97ee-4b351ebf4bd7.jpg?width=1200&quality=78",
    title: "Couples Holidays",
    text: "Romantic escapes for two",
    color: "#F0B58F",
  },
  {
    slug: "family-holiday",
    image:
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1200&q=82",
    title: "Family Holidays",
    text: "Easy adventures for all ages",
    color: "#F2D58A",
  },
  {
    slug: "summer-holidays",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=82",
    title: "Summer Holidays",
    text: "Sun, sea and the Ionian coast",
    color: "#8CC5D8",
  },
  {
    slug: "hiking-tours",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=82",
    title: "Hiking Tours",
    text: "Alps trails and mountain villages",
    color: "#9CCB7A",
  },
];
/* ===== end of editable data ===== */

const Arrow = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
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

function Tile({ c, i, imageBase, seen }) {
  const [bad, setBad] = useState(false);
  const ref = useRef(null);

  const move = (e) => {
    // the photo drifts slightly against the cursor
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty(
      "--px",
      ((e.clientX - r.left) / r.width - 0.5) * -18 + "px",
    );
    ref.current.style.setProperty(
      "--py",
      ((e.clientY - r.top) / r.height - 0.5) * -18 + "px",
    );
  };
  const leave = () => {
    ref.current.style.setProperty("--px", "0px");
    ref.current.style.setProperty("--py", "0px");
  };

  return (
    <li className={i % 2 === 1 ? "md:mt-10" : ""}>
      <a
        ref={ref}
        href={`/collection/${c.slug}`}
        onPointerMove={move}
        onPointerLeave={leave}
        style={{
          transitionDelay: `${i * 110}ms`,
          background: `linear-gradient(160deg, ${c.color}, #8a8579)`,
        }}
        className={`group relative block aspect-[3/4] overflow-hidden rounded-3xl shadow-[0_20px_40px_-20px_rgba(0,0,0,.7)] transition-all duration-700 motion-reduce:transition-none ${seen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        {!bad && (
          <img
            src={c.image || `${imageBase}/${c.slug}.jpg`}
            alt=""
            loading="lazy"
            onError={() => setBad(true)}
            style={{
              transform:
                "translate3d(var(--px, 0px), var(--py, 0px), 0) scale(1.1)",
            }}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:duration-200 motion-reduce:transform-none"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,.72),rgba(0,0,0,.08)_55%,transparent)] transition-opacity duration-300 group-hover:opacity-90"
        />
        <span
          style={serif}
          className="absolute left-4 top-3 text-5xl font-semibold leading-none text-white/25"
        >
          {String(i + 1).padStart(2, "0")}
        </span>

        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <h3
            style={serif}
            className="text-xl font-semibold leading-tight transition-transform duration-300 group-hover:-translate-y-1 md:text-2xl"
          >
            {c.title}
          </h3>
          <p className="mt-1 text-sm text-white/75 transition-transform duration-300 group-hover:-translate-y-1">
            {c.text}
          </p>
          <span className="mt-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#141414] text-white transition-all duration-300 group-hover:w-28 group-hover:gap-2">
            <span className="hidden whitespace-nowrap text-sm font-semibold group-hover:inline">
              Explore
            </span>
            <Arrow />
          </span>
        </div>
      </a>
    </li>
  );
}

/** "Our Albanian Specials": four collection tiles. Place it between the trust strip and the featured tours. */
export default function Collections({
  collections = COLLECTIONS,
  imageBase = "/albania/collections",
  allHref = "/collection",
}) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

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
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="holiday-collections"
      aria-labelledby="collections-title"
      className="bg-[#F3F0E9] py-16 text-[#141414] md:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[.25em] text-[#D93A2B]">
              Collections
            </p>
            <h2
              id="collections-title"
              style={serif}
              className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl"
            >
              Our <em className="font-medium text-[#D93A2B]">Albanian</em>{" "}
              specials
            </h2>
          </div>
          <a
            href={allHref}
            className="group flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
          >
            All collections{" "}
            <span className="transition-transform group-hover:translate-x-0.5">
              <Arrow />
            </span>
          </a>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 md:mt-12 md:grid-cols-4 md:gap-5">
          {collections.map((c, i) => (
            <Tile key={c.slug} c={c} i={i} imageBase={imageBase} seen={seen} />
          ))}
        </ul>
      </div>
    </section>
  );
}
