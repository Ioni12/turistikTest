"use client";
import useSeen from "./useSeen";

const serif = { fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif" };

/* ===== EDIT HERE =====
   Best-time wording comes from the Grand Mosaic page ("late April through June and September through October...
   July and August warmer and livelier on the coast"; recommended window Apr to Oct; 18 to 31 C typical daytime range).
   The Moderate level text is the live site's. The Easy and Challenging lines are DRAFTS: replace with the trip level guide's wording. */
// 0 = outside the usual window, 1 = comfortable and quieter, 2 = warm and lively on the coast
const MONTHS = [
  ["Jan", 0],
  ["Feb", 0],
  ["Mar", 0],
  ["Apr", 1],
  ["May", 1],
  ["Jun", 1],
  ["Jul", 2],
  ["Aug", 2],
  ["Sep", 1],
  ["Oct", 1],
  ["Nov", 0],
  ["Dec", 0],
];
const LEGEND = [
  [1, "Comfortable and quieter"],
  [2, "Warm, lively coast"],
  [0, "Outside the usual window"],
];
export const LEVELS = [
  {
    name: "Easy",
    bars: 1,
    text: "A relaxed pace with short walks and plenty of free time.",
  },
  {
    name: "Moderate",
    bars: 2,
    text: "An active pace balanced with breaks, with ordinary preparation recommended.",
  },
  {
    name: "Challenging",
    bars: 3,
    text: "Longer days on foot and rougher terrain, best with some hiking experience.",
  },
];
/* ===== end of editable data ===== */

const tone = {
  0: "bg-black/10 text-black/40",
  1: "bg-[#141414] text-white",
  2: "bg-[#D93A2B]/15 text-[#141414]",
};

/** Best time to go, trip levels, and visa and arrival, in three cards. */
export default function PlanningHelpers({
  levelHref = "/trip-level",
  visaHref = "/visa-albania",
}) {
  const [ref, seen] = useSeen(0.15);
  const card = (i) => ({
    style: { transitionDelay: `${i * 140}ms` },
    className: `rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_18px_40px_-26px_rgba(22,33,15,.5)] transition-all duration-700 motion-reduce:transition-none md:p-8 ${seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`,
  });

  return (
    <section
      ref={ref}
      id="planning"
      aria-labelledby="planning-title"
      className="border-t border-black/10 bg-[#FAF8F4] py-16 text-[#141414] md:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[.25em] text-[#D93A2B]">
          Plan with confidence
        </p>
        <h2
          id="planning-title"
          style={serif}
          className="max-w-xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl"
        >
          Before you pick a date
        </h2>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          {/* best time */}
          <div {...card(0)}>
            <h3 style={serif} className="text-2xl font-semibold">
              Best time to travel
            </h3>
            <p className="mt-2 max-w-md text-[15px] opacity-70">
              Late April to June and September to October are usually
              comfortable with fewer crowds. July and August are warmer and
              livelier on the coast. Mountain and boat stages stay
              weather-dependent.
            </p>
            <ol className="mt-6 grid grid-cols-6 gap-2 sm:grid-cols-12">
              {MONTHS.map(([m, s], i) => (
                <li
                  key={m}
                  style={{ transitionDelay: `${300 + i * 60}ms` }}
                  className={`origin-bottom rounded-xl py-3 text-center text-xs font-semibold transition-all duration-500 motion-reduce:transition-none ${tone[s]} ${seen ? "scale-y-100 opacity-100" : "scale-y-50 opacity-0"}`}
                >
                  {m}
                </li>
              ))}
            </ol>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs">
              {LEGEND.map(([s, l]) => (
                <li key={l} className="flex items-center gap-2">
                  <i className={`h-3 w-3 rounded ${tone[s].split(" ")[0]}`} />
                  {l}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm opacity-60">
              Typical daytime temperatures range from 18 to 31&deg;C depending
              on region and season. Alpine conditions can change quickly.
            </p>
          </div>

          <div className="grid gap-5">
            {/* levels */}
            <div {...card(1)}>
              <h3 style={serif} className="text-2xl font-semibold">
                Trip levels
              </h3>
              <ul className="mt-4 space-y-3">
                {LEVELS.map((l) => (
                  <li key={l.name} className="flex gap-3">
                    <span
                      className="mt-1.5 flex flex-none gap-0.5"
                      aria-hidden="true"
                    >
                      {[1, 2, 3].map((n) => (
                        <i
                          key={n}
                          className={`h-1.5 w-3.5 rounded-full ${n <= l.bars ? "bg-[#D93A2B]" : "bg-black/15"}`}
                        />
                      ))}
                    </span>
                    <span className="text-sm">
                      <b>{l.name}</b>
                      <span className="block opacity-65">{l.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href={levelHref}
                className="mt-4 inline-block text-sm font-semibold underline underline-offset-4"
              >
                Read the level guide
              </a>
            </div>

            {/* visa and arrival */}
            <div {...card(2)}>
              <h3 style={serif} className="text-2xl font-semibold">
                Visa and getting here
              </h3>
              <ul className="mt-3 space-y-2 text-sm opacity-75">
                <li>
                  Entry rules depend on your passport, so check before you book.
                </li>
                <li>
                  Flights are not included. We meet you on the scheduled arrival
                  day and take you back for departure.
                </li>
                <li>Our trips start and end in Tirana.</li>
              </ul>
              <a
                href={visaHref}
                className="mt-4 inline-block text-sm font-semibold underline underline-offset-4"
              >
                Check visa information
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
