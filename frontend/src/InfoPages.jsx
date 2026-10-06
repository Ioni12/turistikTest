"use client";
import { useParams } from "react-router-dom";
import PageHero from "./PageHero.jsx";
import FAQ, { GENERAL_FAQS } from "./FAQ.jsx";
import { LEVELS } from "./PlanningHelpers.jsx";
import { UNITS } from "./albaniaData";
import { ALL_TOURS, COLLECTION_PAGES } from "./toursData.js";
import { TOUR_PAGES } from "./tourData.js";
import { ARTICLES } from "./Stories.jsx";

const serif = { fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif" };
const LIVE = "https://wonderalbania.com";

/** 404 */
export function NotFoundPage() {
  return (
    <main
      id="main"
      className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#FAF8F4] p-6 text-center text-[#141414]"
    >
      <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#D93A2B]">
        404
      </p>
      <h1 style={serif} className="text-4xl font-semibold md:text-5xl">
        This page wandered off
      </h1>
      <p className="max-w-md text-[#141414]/70">
        We could not find what you were looking for. Try the tours, or ask us
        directly.
      </p>
      <div className="flex gap-3">
        <a
          href="/tours"
          className="rounded-full bg-[#141414] px-6 py-3 font-semibold text-white"
        >
          Browse tours
        </a>
        <a
          href="/"
          className="rounded-full border border-black/25 px-6 py-3 font-semibold"
        >
          Homepage
        </a>
      </div>
    </main>
  );
}

/** Shown for a listed tour whose full page has not been added to tourData.js yet. */
export function ComingSoonTour({ slug }) {
  const t = ALL_TOURS.find((x) => x.slug === slug);
  if (!t) return <NotFoundPage />;
  return (
    <>
      <PageHero
        eyebrow={`${t.days} days \u00b7 ${t.level} level`}
        title={t.title}
        text={t.sub}
        crumbs={[["Home", "/"], ["Tours", "/tours"], [t.title]]}
      >
        <p className="mt-6 text-[#141414]/70">
          From{" "}
          <b className="text-[#141414]">&euro;{t.price.toLocaleString("en")}</b>{" "}
          per person
        </p>
      </PageHero>
      <main id="main" className="bg-[#F3F0E9] py-14 text-[#141414]">
        <div className="mx-auto max-w-2xl px-5 text-center">
          <h2 style={serif} className="text-3xl font-semibold">
            The full itinerary is being moved over
          </h2>
          <p className="mt-3 opacity-70">
            Add this tour to tourData.js and its full page appears here. Until
            then you can see it on our current site, or ask us about it.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={`${LIVE}/tour/${t.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#141414] px-6 py-3 font-semibold text-white"
            >
              See the tour
            </a>
            <a
              href={`/inquiry?tour=${t.slug}`}
              className="rounded-full border border-black/30 px-6 py-3 font-semibold"
            >
              Enquire about it
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

/** /trip-level and /trip-level/<level> */
export function TripLevelPage() {
  const { level } = useParams();
  const sel = level ? level.toLowerCase() : null;
  return (
    <>
      <PageHero
        eyebrow="Trip level guide"
        title="Find the right pace"
        text="Every tour has a level that considers pace, terrain and daily duration together."
        crumbs={[["Home", "/"], ["Trip levels"]]}
      />
      <main id="main" className="bg-[#F3F0E9] py-12 text-[#141414] md:py-16">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 md:px-8 lg:grid-cols-3">
          {LEVELS.map((l) => {
            const tours = ALL_TOURS.filter((t) => t.level === l.name);
            return (
              <section
                key={l.name}
                id={l.name.toLowerCase()}
                className={`rounded-[28px] border bg-white p-6 md:p-8 ${sel === l.name.toLowerCase() ? "border-[#D93A2B] shadow-lg" : "border-black/10"}`}
              >
                <span className="flex gap-1" aria-hidden="true">
                  {[1, 2, 3].map((n) => (
                    <i
                      key={n}
                      className={`h-2 w-8 rounded-full ${n <= l.bars ? "bg-[#D93A2B]" : "bg-black/15"}`}
                    />
                  ))}
                </span>
                <h2 style={serif} className="mt-4 text-2xl font-semibold">
                  {l.name}
                </h2>
                <p className="mt-2 text-[15px] opacity-70">{l.text}</p>
                <h3 className="mt-6 text-xs font-semibold uppercase tracking-widest opacity-55">
                  Tours at this level
                </h3>
                {tours.length ? (
                  <ul className="mt-2 space-y-1.5 text-sm">
                    {tours.map((t) => (
                      <li key={t.slug}>
                        <a
                          href={`/tour/${t.slug}`}
                          className="underline underline-offset-4"
                        >
                          {t.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm opacity-60">None yet.</p>
                )}
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
}

/** /faq: the general questions plus the tour-specific ones. */
export function FaqPage() {
  const extra = Object.values(TOUR_PAGES).flatMap((t) => t.faqs);
  const all = [
    ...GENERAL_FAQS,
    ...extra.filter((e) => !GENERAL_FAQS.some((g) => g.q === e.q)),
  ];
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        crumbs={[["Home", "/"], ["FAQ"]]}
      />
      <main id="main">
        <FAQ faqs={all} title="Everything people ask before booking" />
      </main>
    </>
  );
}

/** Pages whose real text has not been moved over (legal terms, visa, attractions): point to the live page meanwhile. */
export function MovedPage({ title, eyebrow, path }) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        crumbs={[["Home", "/"], [title]]}
      />
      <main id="main" className="bg-[#F3F0E9] py-14 text-[#141414]">
        <div className="mx-auto max-w-2xl px-5 text-center">
          <h2 style={serif} className="text-3xl font-semibold">
            This page is being moved over
          </h2>
          <p className="mt-3 opacity-70">
            The official text has to be copied across as it is. Until then, the
            current version is on our existing site.
          </p>
          <a
            href={`${LIVE}${path}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-[#141414] px-6 py-3 font-semibold text-white"
          >
            Read it on our current site
          </a>
        </div>
      </main>
    </>
  );
}

/** /sitemap: every page, generated from the data. */
export function SitemapPage() {
  const groups = [
    [
      "Main",
      [
        ["Home", "/"],
        ["Tours", "/tours"],
        ["Destinations", "/destinations"],
        ["Collections", "/collection"],
        ["Articles", "/article"],
        ["About", "/about"],
        ["Our team", "/about/our-team"],
        ["Contact", "/contact"],
        ["Partner with us", "/contact/business"],
      ],
    ],
    ["Tours", ALL_TOURS.map((t) => [t.title, `/tour/${t.slug}`])],
    ["Destinations", UNITS.map((u) => [u.name, `/destinations/${u.id}`])],
    [
      "Collections",
      Object.entries(COLLECTION_PAGES).map(([s, c]) => [
        c.title,
        `/collection/${s}`,
      ]),
    ],
    ["Guides", ARTICLES.map((a) => [a.title, `/article/${a.slug}`])],
    [
      "Information",
      [
        ["Trip level guide", "/trip-level"],
        ["Travel visa", "/visa-albania"],
        ["Attractions", "/attractions"],
        ["FAQ", "/faq"],
        ["Booking terms", "/booking-terms"],
        ["Cancellation terms", "/cancelation"],
        ["Privacy policy", "/privacy-policy"],
      ],
    ],
  ];
  return (
    <>
      <PageHero
        eyebrow="Sitemap"
        title="Every page, in one place"
        crumbs={[["Home", "/"], ["Sitemap"]]}
      />
      <main id="main" className="bg-[#F3F0E9] py-12 text-[#141414] md:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:grid-cols-2 md:px-8 lg:grid-cols-3">
          {groups.map(([g, links]) => (
            <section key={g}>
              <h2 style={serif} className="text-xl font-semibold">
                {g}
              </h2>
              <ul className="mt-3 space-y-1.5 text-sm">
                {links.map(([t, h]) => (
                  <li key={h}>
                    <a href={h} className="underline-offset-4 hover:underline">
                      {t}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
