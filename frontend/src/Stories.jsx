"use client";
import { useState } from "react";
import useSeen from "./useSeen";

const serif = { fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif" };

/* ===== EDIT HERE =====
   Real articles from the live /article page (titles and slugs match). The one-line summaries are paraphrased.
   Images are the live article photos (Pexels): swap in your own copies when you can. */
const px = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;
export const ARTICLES = [
  {
    slug: "how-many-days-in-albania",
    title: "How many days in Albania? 5, 7, 10 and 14-day options",
    text: "Realistic outlines for each length of trip, without rushing.",
    read: "8 min read",
    image: px(17548063),
  },
  {
    slug: "best-time-to-visit-albania",
    title: "Best time to visit Albania: weather, crowds and prices",
    text: "A clear month-by-month guide for beaches, hiking or quiet cities.",
    read: "7 min read",
    image: px(38039729),
  },
  {
    slug: "theth-to-valbona-hike",
    title: "Theth to Valbona hike: what it\u2019s really like",
    text: "Distance, climb, ferry logistics and how hard the day really feels.",
    read: "10 min read",
    image: px(28837424),
  },
];
/* ===== end of editable data ===== */

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

function Card({ a, i, seen }) {
  const [bad, setBad] = useState(false);
  return (
    <li
      style={{ transitionDelay: `${i * 120}ms` }}
      className={`transition-all duration-700 motion-reduce:transition-none ${seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
    >
      <a href={`/article/${a.slug}`} className="group block">
        <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#BBDF86,#78B89A)]">
          {!bad && (
            <img
              src={a.image}
              alt=""
              loading="lazy"
              onError={() => setBad(true)}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
            />
          )}
        </div>
        <p className="mt-4 text-xs uppercase tracking-widest opacity-55">
          Travel guide &middot; {a.read}
        </p>
        <h3
          style={serif}
          className="mt-2 text-xl font-semibold leading-snug underline-offset-4 group-hover:underline"
        >
          {a.title}
        </h3>
        <p className="mt-2 text-sm opacity-65">{a.text}</p>
      </a>
    </li>
  );
}

/** Three guides from the articles section. */
export default function Stories({ articles = ARTICLES, allHref = "/article" }) {
  const [ref, seen] = useSeen(0.12);
  return (
    <section
      ref={ref}
      id="stories"
      aria-labelledby="stories-title"
      className="bg-[#fbf9f1] py-16 text-[#16210f] md:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[.25em] text-[#4f7d12]">
              Guides and stories
            </p>
            <h2
              id="stories-title"
              style={serif}
              className="max-w-xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl"
            >
              Local advice, before you go
            </h2>
          </div>
          <a
            href={allHref}
            className="group flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
          >
            All articles{" "}
            <span className="transition-transform group-hover:translate-x-0.5">
              <Arrow />
            </span>
          </a>
        </div>
        <ul className="mt-10 grid gap-8 md:grid-cols-3">
          {articles.map((a, i) => (
            <Card key={a.slug} a={a} i={i} seen={seen} />
          ))}
        </ul>
      </div>
    </section>
  );
}
