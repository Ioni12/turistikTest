"use client";
import { useEffect, useRef, useState } from "react";
import RouteMap from "./RouteMap.jsx";
import FAQ from "./FAQ.jsx";
import TrustStrip from "./TrustStrip.jsx";
import { TourCard } from "./FeaturedTours.jsx";

const serif = { fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif" };
const PHONE = "+355 69 229 0036";
const PHONE_HREF = "tel:+355692290036";
const eur = (n) => "\u20ac" + n.toLocaleString("en");

const Check = () => (
  <svg
    viewBox="0 0 20 20"
    width="16"
    height="16"
    fill="none"
    stroke="#D93A2B"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="mt-0.5 flex-none"
  >
    <path d="M4 10.5l4 4 8-9" />
  </svg>
);
const Cross = () => (
  <svg
    viewBox="0 0 20 20"
    width="16"
    height="16"
    fill="none"
    stroke="#D93A2B"
    strokeWidth="2.4"
    strokeLinecap="round"
    aria-hidden="true"
    className="mt-0.5 flex-none"
  >
    <path d="M5 5l10 10M15 5L5 15" />
  </svg>
);
const Arrow = ({ dir = 1 }) => (
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
    style={{ transform: dir < 0 ? "scaleX(-1)" : undefined }}
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function Section({ id, eyebrow, title, children }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-t`}
      className="scroll-mt-24 py-10 md:py-14"
    >
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[.25em] text-[#D93A2B]">
          {eyebrow}
        </p>
      )}
      <h2
        id={`${id}-t`}
        style={serif}
        className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl"
      >
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function BookingBox({ tour, people, setPeople, date, setDate }) {
  const href = `/book/departure/${tour.slug}?people=${people}${date ? `&date=${date}` : ""}`;
  return (
    <div
      id="booking"
      className="scroll-mt-24 rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_24px_50px_-28px_rgba(22,33,15,.6)]"
    >
      <h2 style={serif} className="text-2xl font-semibold">
        Book this trip
      </h2>
      <p className="mt-1 text-sm opacity-65">
        Secure your spot with a deposit, then pay the balance on the schedule
        shown, with no interest or fees.
      </p>
      <div className="mt-5 flex items-end gap-2">
        <div>
          <span className="block text-[11px] uppercase tracking-wider opacity-55">
            From
          </span>
          <b style={serif} className="text-4xl font-semibold leading-none">
            {eur(tour.price)}
          </b>
        </div>
        <span className="pb-1 text-sm opacity-60">
          per person
          <br />
          flights not included
        </span>
      </div>
      <span className="mt-3 inline-block rounded-full bg-[#ECE7DC] px-3 py-1 text-xs font-semibold">
        100% money-back guarantee
      </span>
      <label className="mt-5 block text-sm font-semibold">
        Dates
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-black/20 bg-white px-3 py-2.5 text-[15px] font-normal"
        />
      </label>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-semibold">People</span>
        <span className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Fewer people"
            onClick={() => setPeople(Math.max(1, people - 1))}
            className="h-9 w-9 rounded-full border border-black/20 text-lg leading-none hover:bg-black/5"
          >
            &minus;
          </button>
          <b className="w-5 text-center">{people}</b>
          <button
            type="button"
            aria-label="More people"
            onClick={() => setPeople(Math.min(20, people + 1))}
            className="h-9 w-9 rounded-full border border-black/20 text-lg leading-none hover:bg-black/5"
          >
            +
          </button>
        </span>
      </div>
      <a
        href={href}
        className="mt-5 block rounded-full bg-[#141414] py-3.5 text-center font-semibold text-white transition hover:bg-[#D93A2B]"
      >
        Check availability
      </a>
      <a
        href={`/book/departure/${tour.slug}`}
        className="mt-3 block text-center text-sm font-semibold underline underline-offset-4"
      >
        Or view shared departures
      </a>
      <ul className="mt-5 space-y-3 border-t border-black/10 pt-5 text-sm">
        <li>
          <a href={PHONE_HREF} className="font-semibold">
            {PHONE}
          </a>
          <span className="block opacity-60">Call for any question.</span>
        </li>
        <li>
          <a href="/cancelation" className="font-semibold">
            Free cancellation
          </a>
          <span className="block opacity-60">
            until 48 hours before departure.
          </span>
        </li>
      </ul>
    </div>
  );
}

export default function TourPage({ tour }) {
  const [img, setImg] = useState(0);
  const [active, setActive] = useState(1);
  const [people, setPeople] = useState(2);
  const [date, setDate] = useState("");
  const [copied, setCopied] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const dayRefs = useRef([]);
  const day = tour.itinerary.find((x) => x.day === active) || tour.itinerary[0];

  useEffect(() => {
    // which itinerary day is on screen -> drives the route map
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.day));
        }),
      { rootMargin: "-30% 0px -60% 0px" },
    );
    dayRefs.current.filter(Boolean).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    const on = () => setShowBar(window.scrollY > 700);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.title = `${tour.title} | Wonder Albania`;
  }, [tour.title]);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: tour.title, url });
        return;
      } catch {
        /* cancelled */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };
  const goDay = (n) =>
    dayRefs.current[n - 1]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  const pr = tour.practical;

  return (
    <>
      <main id="main">
        {/* top: title, price, gallery */}
        <section className="bg-[#FAF8F4] border-b border-black/10 pb-12 pt-32 text-[#141414] md:pb-16">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:px-8 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <nav
                aria-label="Breadcrumb"
                className="mb-5 text-sm text-[#141414]/60"
              >
                <a href="/tours" className="hover:text-[#141414]">
                  Tours
                </a>{" "}
                /{" "}
                <span className="text-[#141414]/90">
                  {tour.days}-day journey
                </span>
              </nav>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[.25em] text-[#D93A2B]">
                {tour.days} days &middot; {tour.level} level
              </p>
              <h1
                style={serif}
                className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl"
              >
                {tour.title}
              </h1>
              <p className="mt-4 max-w-lg text-[#141414]/75">{tour.summary}</p>
              <div className="mt-6 flex items-end gap-3">
                <b
                  style={serif}
                  className="text-5xl font-semibold leading-none"
                >
                  {eur(tour.price)}
                </b>
                <span className="pb-1 text-sm text-[#141414]/60">
                  per person
                  <br />
                  excluding flights
                </span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#booking"
                  className="rounded-full bg-[#141414] px-6 py-3.5 font-semibold text-white transition hover:bg-[#D93A2B]"
                >
                  Check availability
                </a>
                <button
                  type="button"
                  onClick={share}
                  className="rounded-full border border-black/10 px-6 py-3.5 font-semibold transition hover:bg-black/5"
                >
                  {copied ? "Link copied" : "Share"}
                </button>
              </div>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {tour.facts.map(([t, s]) => (
                  <li
                    key={t}
                    className="rounded-2xl border border-black/10 bg-white p-4"
                  >
                    <b className="block text-sm">{t}</b>
                    <span className="text-xs text-[#141414]/65">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#EFEBE2,#DCD5C4)] shadow-2xl">
                <img
                  key={img}
                  src={tour.images[img]}
                  alt={tour.title}
                  className="h-full w-full animate-[fadeIn_.6s_ease] object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              {tour.images.length > 1 && (
                <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-[#0b1a14]/75 px-2 py-1.5 text-sm text-white backdrop-blur">
                  <button
                    type="button"
                    aria-label="Previous photo"
                    onClick={() =>
                      setImg(
                        (img + tour.images.length - 1) % tour.images.length,
                      )
                    }
                    className="rounded-full p-1.5 hover:bg-white/15"
                  >
                    <Arrow dir={-1} />
                  </button>
                  <span className="tabular-nums">
                    {img + 1} / {tour.images.length}
                  </span>
                  <button
                    type="button"
                    aria-label="Next photo"
                    onClick={() => setImg((img + 1) % tour.images.length)}
                    className="rounded-full p-1.5 hover:bg-white/15"
                  >
                    <Arrow />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
        <style>{`@keyframes fadeIn { from { opacity: 0; transform: scale(1.03); } to { opacity: 1; transform: none; } }`}</style>

        {/* details + sticky booking box */}
        <div className="bg-[#F3F0E9] text-[#141414]">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-6 md:px-8 lg:grid-cols-[1fr_380px]">
            <div className="min-w-0 divide-y divide-black/10">
              <Section
                id="about"
                eyebrow="About this trip"
                title="A broad journey, without the blur"
              >
                <div className="space-y-4 text-[17px] leading-relaxed opacity-80">
                  {tour.about.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
                <p className="mt-6 text-sm opacity-60">
                  Planned and organised by Wonder Albania.{" "}
                  <a
                    href="/contact"
                    className="font-semibold underline underline-offset-4"
                  >
                    Any questions? Contact us
                  </a>
                </p>
              </Section>

              <Section
                id="itinerary"
                eyebrow="The full itinerary"
                title="Day by day"
              >
                {/* route tracker: follows you down the page and shows where you are */}
                <div className="sticky top-20 z-20 mb-6 grid grid-cols-[96px_1fr] items-center gap-4 rounded-3xl border border-black/10 bg-white/95 p-3 shadow-lg backdrop-blur md:grid-cols-[120px_1fr] md:p-4">
                  <RouteMap
                    route={tour.route}
                    activeDay={active}
                    className="h-auto max-h-[180px] w-full md:max-h-[220px]"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#D93A2B]">
                      Day {day.day} of {tour.days}
                    </p>
                    <p
                      style={serif}
                      className="mt-1 text-xl font-semibold leading-tight md:text-2xl"
                    >
                      {day.place}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {tour.itinerary.map((x) => (
                        <button
                          key={x.day}
                          type="button"
                          aria-label={`Go to day ${x.day}`}
                          aria-current={x.day === active}
                          onClick={() => goDay(x.day)}
                          className={`h-7 w-7 rounded-full text-xs font-semibold transition ${x.day === active ? "bg-[#141414] text-white" : x.day < active ? "bg-[#D93A2B]" : "bg-black/10"}`}
                        >
                          {x.day}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <ol className="space-y-4">
                  {tour.itinerary.map((x, i) => (
                    <li
                      key={x.day}
                      ref={(el) => (dayRefs.current[i] = el)}
                      data-day={x.day}
                      className={`scroll-mt-48 rounded-3xl border p-6 transition-all duration-500 ${x.day === active ? "border-[#D93A2B]/50 bg-white shadow-lg" : "border-black/10 bg-white/60"}`}
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 style={serif} className="text-2xl font-semibold">
                          <span className="mr-3 text-[#D93A2B]">
                            Day {x.day}
                          </span>
                          {x.place}
                        </h3>
                        <span className="text-sm tabular-nums opacity-55">
                          {x.time}
                        </span>
                      </div>
                      <p className="mt-3 leading-relaxed opacity-80">
                        {x.text}
                      </p>
                      <p className="mt-4 text-sm">
                        <span className="font-semibold">You will visit: </span>
                        {x.visit[1] ? (
                          <a
                            href={x.visit[1]}
                            className="underline underline-offset-4"
                          >
                            {x.visit[0]}
                          </a>
                        ) : (
                          x.visit[0]
                        )}
                      </p>
                    </li>
                  ))}
                </ol>
              </Section>

              <Section
                id="included"
                eyebrow="What you get"
                title="What is and isn\u2019t included"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl bg-white p-6">
                    <h3 className="mb-3 font-semibold">Included</h3>
                    <ul className="space-y-3 text-[15px]">
                      {tour.included.map((t) => (
                        <li key={t} className="flex gap-2.5">
                          <Check />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-3xl bg-white p-6">
                    <h3 className="mb-3 font-semibold">Not included</h3>
                    <ul className="space-y-3 text-[15px]">
                      {tour.notIncluded.map((t) => (
                        <li key={t} className="flex gap-2.5">
                          <Cross />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Section>

              <Section
                id="highlights"
                eyebrow="Highlights"
                title="Trip highlights"
              >
                <ul className="grid gap-3 sm:grid-cols-2">
                  {tour.highlights.map(([t, s]) => (
                    <li
                      key={t}
                      className="rounded-2xl border border-black/10 bg-white/70 p-5"
                    >
                      <b
                        style={serif}
                        className="block text-lg font-semibold leading-snug"
                      >
                        {t}
                      </b>
                      <span className="mt-1 block text-sm opacity-70">{s}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section
                id="practical"
                eyebrow="Before you go"
                title="The practical side"
              >
                <div className="grid gap-4">
                  {[
                    ["Best time to travel", pr.bestTime],
                    ["Food shaped around you", pr.food],
                    ["What to bring", pr.bring],
                  ].map(([t, b]) => (
                    <div key={t} className="rounded-3xl bg-white p-6">
                      <h3 style={serif} className="text-xl font-semibold">
                        {t}
                      </h3>
                      <p className="mt-2 text-[15px] opacity-75">{b.text}</p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {b.chips.map((c) => (
                          <li
                            key={c}
                            className="rounded-full bg-[#ECE7DC] px-3 py-1 text-xs font-medium"
                          >
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Section>

              <Section
                id="level"
                eyebrow="Pace and effort"
                title={`This trip is ${tour.level}`}
              >
                <div className="flex flex-wrap items-center gap-6 rounded-3xl bg-white p-6">
                  <span className="flex gap-1" aria-hidden="true">
                    {[1, 2, 3].map((n) => (
                      <i
                        key={n}
                        className={`h-2 w-8 rounded-full ${n <= 2 ? "bg-[#D93A2B]" : "bg-black/15"}`}
                      />
                    ))}
                  </span>
                  <p className="min-w-[200px] flex-1 text-[15px] opacity-75">
                    {tour.levelText}
                  </p>
                  <div className="flex gap-4 text-sm font-semibold">
                    <a
                      href={tour.levelHref}
                      className="underline underline-offset-4"
                    >
                      Level guide
                    </a>
                    <a
                      href={tour.collectionHref}
                      className="underline underline-offset-4"
                    >
                      Trips at this level
                    </a>
                  </div>
                </div>
              </Section>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <BookingBox
                  tour={tour}
                  people={people}
                  setPeople={setPeople}
                  date={date}
                  setDate={setDate}
                />
              </div>
            </aside>
          </div>
        </div>

        {/* booking box again on small screens */}
        <div className="bg-[#F3F0E9] px-5 pb-12 text-[#141414] lg:hidden">
          <div className="mx-auto max-w-md">
            <BookingBox
              tour={tour}
              people={people}
              setPeople={setPeople}
              date={date}
              setDate={setDate}
            />
          </div>
        </div>

        <FAQ
          faqs={tour.faqs}
          id="tour-faq"
          title="Frequently asked questions"
          eyebrow="Before you go"
        />
        <TrustStrip />

        <section
          aria-labelledby="related-t"
          className="bg-[#FAF8F4] py-16 text-[#141414] md:py-20"
        >
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <h2
              id="related-t"
              style={serif}
              className="text-3xl font-semibold tracking-tight md:text-4xl"
            >
              You might also like
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tour.related.map((t, i) => (
                <TourCard key={t.slug} t={t} i={i} />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* sticky price bar on phones */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-black/10 bg-white/95 px-4 py-3 pb-[calc(12px+env(safe-area-inset-bottom))] text-[#141414] backdrop-blur transition-transform duration-300 lg:hidden ${showBar ? "translate-y-0" : "translate-y-full"}`}
      >
        <span>
          <span className="block text-[11px] uppercase tracking-wider text-[#141414]/55">
            from
          </span>
          <b style={serif} className="text-xl">
            {eur(tour.price)}
          </b>
        </span>
        <a
          href="#booking"
          className="rounded-full bg-[#141414] px-6 py-3 font-semibold text-white"
        >
          Check availability
        </a>
      </div>
    </>
  );
}
