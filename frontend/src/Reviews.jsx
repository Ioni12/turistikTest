"use client";
import { useState } from "react";
import useSeen from "./useSeen";

const serif = { fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif" };

/* ===== EDIT HERE =====
   Review 1 is the real "Travelers Favourite" from the live homepage. The site shows it cut off with "...":
   paste the full text from the review itself. Add more reviews to the list (image is optional) and they
   appear as extra cards below. The ratings list comes from the live tour cards (checked when this was written). */
const REVIEWS = [
  {
    name: "Melise S.",
    country: "Denmark",
    rating: 5,
    tour: null,
    text: "Loved it All! Unforgettable for the way how satisfying it was to visit a country so easy, no hassle ...",
    image:
      "https://vlunzjvalrwlcazcaefl.supabase.co/storage/v1/render/image/public/review-media/reviews/4ec09059-43b2-4e4b-a631-3d6c89148f33/72702183-7d6c-40c1-bf04-1af5c1bc6d6d.jpg?width=900&quality=78",
  },
];
const RATINGS = [
  { tour: "Essential Albania Express", rating: 5.0, count: 3 },
  { tour: "Theth to Valbona Hiking Adventure", rating: 5.0, count: 1 },
  { tour: "Theth and Blue Eye", rating: 5.0, count: 1 },
  { tour: "Albania Slow Travel Journey", rating: 4.5, count: 2 },
];
/* ===== end of editable data ===== */

const Stars = ({ n = 5, size = 18 }) => (
  <span className="flex gap-0.5" role="img" aria-label={`${n} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <svg
        key={i}
        viewBox="0 0 20 20"
        width={size}
        height={size}
        fill={i <= Math.round(n) ? "#e8a317" : "rgba(0,0,0,.15)"}
        aria-hidden="true"
      >
        <path d="M10 1.5l2.6 5.5 6 .8-4.4 4.1 1.1 5.9L10 14.9 4.7 17.8l1.1-5.9L1.4 7.8l6-.8z" />
      </svg>
    ))}
  </span>
);

/** "Travellers' favourite": a featured review with the traveller's photo, a rating summary, and room for more reviews. */
export default function Reviews({
  reviews = REVIEWS,
  ratings = RATINGS,
  toursHref = "/tours",
}) {
  const [ref, seen] = useSeen(0.2);
  const [bad, setBad] = useState({});
  const total = ratings.reduce((a, r) => a + r.count, 0);
  const avg = total
    ? ratings.reduce((a, r) => a + r.rating * r.count, 0) / total
    : 0;
  const [first, ...more] = reviews;
  const rise = (ms) => ({ transitionDelay: `${ms}ms` });
  const cls = `transition-all duration-700 motion-reduce:transition-none ${seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`;

  return (
    <section
      ref={ref}
      id="reviews"
      aria-labelledby="reviews-title"
      className="bg-[#FAF8F4] py-16 text-[#141414] md:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {first.image && !bad.first && (
            <figure
              style={rise(0)}
              className={`relative m-0 aspect-[4/3] overflow-hidden rounded-[28px] shadow-[0_30px_60px_-30px_rgba(0,0,0,.8)] ${cls}`}
            >
              <img
                src={first.image}
                alt={`Travel photo shared by ${first.name}`}
                loading="lazy"
                onError={() => setBad((b) => ({ ...b, first: true }))}
                className="h-full w-full object-cover"
              />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs backdrop-blur">
                Photo shared by {first.name}
              </figcaption>
            </figure>
          )}
          <div>
            <p
              style={rise(100)}
              className={`mb-4 text-xs font-semibold uppercase tracking-[.25em] text-[#D93A2B] ${cls}`}
            >
              Travellers&rsquo; favourite
            </p>
            <span
              aria-hidden="true"
              style={{ ...serif, ...rise(150) }}
              className={`block h-12 text-7xl leading-none text-[#D93A2B]/40 ${cls}`}
            >
              &ldquo;
            </span>
            <h2 id="reviews-title" className="sr-only">
              What travellers say
            </h2>
            <blockquote
              style={{ ...serif, ...rise(220) }}
              className={`text-2xl font-medium leading-snug md:text-3xl ${cls}`}
            >
              {first.text}
            </blockquote>
            <figcaption
              style={rise(340)}
              className={`mt-6 flex items-center gap-3 text-sm ${cls}`}
            >
              <Stars n={first.rating} />
              <span>
                <b>{first.name}</b>, {first.country}
              </span>
            </figcaption>
            {total > 0 && (
              <div
                style={rise(460)}
                className={`mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-black/10 pt-6 ${cls}`}
              >
                <div className="flex items-center gap-3">
                  <b
                    style={serif}
                    className="text-5xl font-semibold leading-none"
                  >
                    {avg.toFixed(1)}
                  </b>
                  <div>
                    <Stars n={avg} size={14} />
                    <span className="mt-1 block text-xs text-[#141414]/60">
                      from {total} traveller{" "}
                      {total === 1 ? "review" : "reviews"} across our tours
                    </span>
                  </div>
                </div>
                <a
                  href={toursHref}
                  className="ml-auto rounded-full bg-[#141414] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#D93A2B]"
                >
                  See the tours
                </a>
              </div>
            )}
          </div>
        </div>

        {more.length > 0 && (
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {more.map((r) => (
              <li
                key={r.name + r.text}
                className="rounded-3xl border border-black/10 bg-white p-6"
              >
                <Stars n={r.rating} size={14} />
                <p className="mt-3 text-[15px] leading-relaxed text-[#141414]/85">
                  &ldquo;{r.text}&rdquo;
                </p>
                <p className="mt-4 text-sm">
                  <b>{r.name}</b>, {r.country}
                  {r.tour ? (
                    <span className="text-[#141414]/55"> · {r.tour}</span>
                  ) : null}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
