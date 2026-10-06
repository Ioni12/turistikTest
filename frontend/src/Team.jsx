"use client";
import { useState } from "react";
import useSeen from "./useSeen";

const serif = { fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif" };

/* ===== EDIT HERE =====
   Principles, team photos and partner names come from the live About page. Images point at the live site:
   copy them into your own project (public/albania/team/...) and change the paths when you can. */
const SITE = "https://wonderalbania.com";
const PRINCIPLES = [
  ["Personal by design", "Your pace, interests and expectations"],
  ["Deeply local", "Knowledge lived, not looked up"],
  ["Thoughtfully supported", "A real person, before and during your trip"],
];
const PHOTOS = [
  `${SITE}/images/experiences/lia-01.jpg`,
  `${SITE}/images/experiences/lia-02.jpg`,
  `${SITE}/images/experiences/lia-03.jpg`,
];
const PARTNERS = [
  { name: "Komoot", logo: `${SITE}/about/partners/komoot.png` },
  { name: "SIGAL Insurance Group", logo: `${SITE}/about/partners/sigal.png` },
  { name: "Saily", logo: `${SITE}/saily-logo-yellow.svg` },
  {
    name: "Ministry of Tourism and Environment",
    logo: `${SITE}/about/partners/ministry-tourism.png`,
  },
];
const TILT = [
  "-rotate-3 translate-y-4",
  "rotate-2 -translate-y-2",
  "-rotate-1 translate-y-6",
];
/* ===== end of editable data ===== */

function Partner({ p }) {
  const [bad, setBad] = useState(false);
  return bad ? (
    <span className="text-sm text-[#141414]/60">{p.name}</span>
  ) : (
    <img
      src={p.logo}
      alt={p.name}
      loading="lazy"
      onError={() => setBad(true)}
      className="h-8 w-auto opacity-60 brightness-0 transition hover:opacity-100 md:h-9"
    />
  );
}

/** "By people who know your destination": principles, team photos and partners. */
export default function Team({ teamHref = "/about/our-team" }) {
  const [ref, seen] = useSeen(0.15);
  const [bad, setBad] = useState({});
  const cls = `transition-all duration-700 motion-reduce:transition-none ${seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`;
  const d = (ms) => ({ transitionDelay: `${ms}ms` });

  return (
    <section
      ref={ref}
      id="team"
      aria-labelledby="team-title"
      className="overflow-hidden bg-[#F3F0E9] py-16 text-[#141414] md:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <p
              style={d(0)}
              className={`mb-3 text-xs font-semibold uppercase tracking-[.25em] text-[#D93A2B] ${cls}`}
            >
              The people
            </p>
            <h2
              id="team-title"
              style={{ ...serif, ...d(100) }}
              className={`text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl ${cls}`}
            >
              By people who know{" "}
              <em className="font-medium text-[#D93A2B]">your destination</em>
            </h2>
            <ul className="mt-8 divide-y divide-black/10 border-y border-black/10">
              {PRINCIPLES.map(([t, s], i) => (
                <li
                  key={t}
                  style={d(250 + i * 130)}
                  className={`flex items-baseline gap-4 py-4 ${cls}`}
                >
                  <span
                    style={serif}
                    className="text-sm font-semibold text-[#D93A2B]"
                  >
                    0{i + 1}
                  </span>
                  <span>
                    <b style={serif} className="block text-xl font-semibold">
                      {t}
                    </b>
                    <span className="text-sm text-[#141414]/65">{s}</span>
                  </span>
                </li>
              ))}
            </ul>
            <a
              href={teamHref}
              style={d(700)}
              className={`mt-8 inline-block rounded-full bg-[#141414] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D93A2B] ${cls}`}
            >
              Meet our team
            </a>
          </div>

          <div
            aria-hidden="true"
            className="relative mx-auto grid h-[340px] w-full max-w-md grid-cols-3 items-center gap-3 md:h-[420px]"
          >
            {PHOTOS.map((src, i) => (
              <div
                key={src}
                style={d(300 + i * 160)}
                className={`transition-all duration-1000 ease-out motion-reduce:transition-none ${seen ? `opacity-100 ${TILT[i]}` : "translate-y-10 opacity-0"}`}
              >
                <div className="aspect-[3/4] overflow-hidden rounded-2xl border-4 border-white bg-[linear-gradient(135deg,#EFEBE2,#DCD5C4)] shadow-2xl">
                  {!bad[src] && (
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      onError={() => setBad((b) => ({ ...b, [src]: true }))}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={d(900)}
          className={`mt-16 border-t border-black/10 pt-8 ${cls}`}
        >
          <p className="mb-5 text-xs font-semibold uppercase tracking-[.25em] text-[#141414]/50">
            Friends of ours
          </p>
          <ul className="flex flex-wrap items-center gap-x-10 gap-y-5">
            {PARTNERS.map((p) => (
              <li key={p.name}>
                <Partner p={p} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
