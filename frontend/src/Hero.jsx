"use client";
import { useEffect, useRef, useState } from "react";

// Load Fraunces (Google Fonts / next/font) for the headline; Georgia is the fallback.
const serif = { fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif" };

// Sticker monuments: transparent PNGs at {cutoutBase}/{id}.webp (WebP with transparency). A missing file shows a placeholder tower.
// x/h = desktop centre % and height (vh); xm/hm = mobile; d = parallax depth (0 to 1).
// Positions keep the stickers on the right so they never cover the text. Wide monuments get a smaller height.
const STICKERS = [
  {
    id: "fier",
    label: "Ancient columns",
    color: "#B7DC84",
    x: 68,
    h: 22,
    xm: 22,
    hm: 10,
    d: 0.3,
  },
  {
    id: "gjirokaster",
    label: "Gjirokast\u00ebr Castle",
    color: "#E8C28F",
    x: 76,
    h: 44,
    xm: 46,
    hm: 17,
    d: 0.5,
  },
  {
    id: "skanderbeg",
    label: "Skanderbeg Square",
    color: "#F0B58F",
    x: 87,
    h: 60,
    xm: 72,
    hm: 23,
    d: 0.9,
  },
  {
    id: "tirane",
    label: "Tirana Clock Tower",
    color: "#8CC5D8",
    x: 95,
    h: 68,
    xm: 93,
    hm: 27,
    d: 0.7,
  },
];
const OUTLINE =
  "drop-shadow(3px 0 0 #fff) drop-shadow(-3px 0 0 #fff) drop-shadow(0 3px 0 #fff) drop-shadow(0 -3px 0 #fff) drop-shadow(0 14px 22px rgba(0,0,0,.22))";
const FILTER = "grayscale(1) contrast(1.08)"; // 'none' for full colour, 'sepia(.6)' for a warm look

const FACTS = [
  "Flexible cancellation",
  "Licensed local guides",
  "Private or shared trips",
  "Tours from €128",
];

function Tower({ color, label }) {
  return (
    <svg viewBox="0 0 300 460" className="h-full w-auto">
      <path
        d="M40 440V200h70L150 30l40 170h70v240z"
        fill={color}
        stroke="#fff"
        strokeWidth="18"
        strokeLinejoin="round"
      />
      <text
        x="150"
        y="400"
        textAnchor="middle"
        fontSize="22"
        fontFamily="Georgia, serif"
        fill="#141414"
      >
        {label}
      </text>
    </svg>
  );
}

const Check = () => (
  <svg
    viewBox="0 0 20 20"
    width="14"
    height="14"
    fill="none"
    stroke="#D93A2B"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 10.5l4 4 8-9" />
  </svg>
);

/**
 * Opening screen. Put it first on the page, directly under the fixed Header, and give the map section id="map".
 * Background photo: defaults to the live hero photo (the Alps). Copy it into public/albania/bg/albania.jpg and pass photo="/albania/bg/albania.jpg"
 * for your own copy, or pass photo={null} for a clean white hero.
 */
export default function Hero({
  photo = "https://wonderalbania.com/hero.JPG", // the live hero photo; replace with your own copy when you can
  founderImage = "https://wonderalbania.com/about/alfred-founder.jpg",
  cutoutBase = "/albania/cutouts",
  exploreHref = "/tours",
  enquireHref = "/inquiry",
  mapHref = "#map",
}) {
  const root = useRef(null);
  const [on, setOn] = useState(false);
  const [bad, setBad] = useState({});
  const [badFounder, setBadFounder] = useState(false);

  useEffect(() => {
    const r = requestAnimationFrame(() => setOn(true));
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const el = root.current;
    const onMove = (e) => {
      // mouse parallax: set CSS variables directly, no re-render
      if (reduce || e.pointerType === "touch") return;
      el.style.setProperty(
        "--mx",
        (e.clientX / window.innerWidth - 0.5) * -50 + "px",
      );
      el.style.setProperty(
        "--my",
        (e.clientY / window.innerHeight - 0.5) * -30 + "px",
      );
    };
    const onScroll = () => {
      if (!reduce)
        el.style.setProperty(
          "--sy",
          Math.min(window.scrollY, window.innerHeight) + "px",
        );
    };
    el.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(r);
      el.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // headline line: slides up from behind a mask
  const line = (i, children) => (
    <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
      <span
        className={`block transition-transform duration-[1000ms] ease-[cubic-bezier(.2,.7,.1,1)] motion-reduce:transition-none ${on ? "translate-y-0" : "translate-y-[110%]"}`}
        style={{ transitionDelay: `${250 + i * 140}ms` }}
      >
        {children}
      </span>
    </span>
  );
  const fade = `transition-all duration-700 motion-reduce:transition-none ${on ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`;
  const after = (ms) => ({ transitionDelay: `${ms}ms` });

  const rise = (i) => ({
    transitionDelay: `${450 + i * 130}ms`,
  });

  return (
    <section
      ref={root}
      aria-label="Welcome"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-[#FAF8F4] text-[#141414]"
    >
      <style>{`
        @keyframes hero-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(calc(var(--amp, 10px) * -1)); } }
        @keyframes hero-zoom { from { transform: scale(1); } to { transform: scale(1.08); } }
        .hero-zoom { animation: hero-zoom 26s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) { .hero-float, .hero-zoom { animation: none !important; } }
      `}</style>
      {photo && (
        <div
          aria-hidden="true"
          className="hero-zoom absolute inset-0 -z-20 bg-cover bg-center saturate-[.85]"
          style={{ backgroundImage: `url(${photo})` }}
        />
      )}
      {/* readability: strong white wash on the text side (all over on phones), clear on the right, fade into the next section */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[#FAF8F4]/70 md:hidden"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden bg-[linear-gradient(90deg,#FAF8F4_0%,rgba(250,248,244,.94)_28%,rgba(250,248,244,.6)_52%,rgba(250,248,244,.08)_78%,transparent_100%)] md:block"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-1/4 bg-[linear-gradient(to_top,#FAF8F4,transparent)]"
      />

      {/* sticker monuments */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[5]"
      >
        {STICKERS.map((s, i) => (
          <div
            key={s.id}
            className="absolute bottom-[-3vh] left-[var(--xm)] h-[var(--hm)] md:left-[var(--x)] md:h-[var(--h)]"
            style={{
              "--x": s.x + "%",
              "--xm": s.xm + "%",
              "--h": s.h + "vh",
              "--hm": s.hm + "vh",
              transform: `translate3d(calc(var(--mx, 0px) * ${s.d}), calc(var(--my, 0px) * ${s.d} + var(--sy, 0px) * ${s.d * -0.25}), 0) translateX(-50%)`,
            }}
          >
            <div
              className={`h-full transition-all duration-[900ms] ease-out motion-reduce:transition-none ${on ? "translate-y-0 opacity-50 md:opacity-90" : "translate-y-[40%] opacity-0"}`}
              style={{ ...rise(i), transformOrigin: "50% 100%" }}
            >
              <div
                className="hero-float h-full"
                style={{
                  "--amp": `${6 + (i % 3) * 4}px`,
                  animation: `hero-float ${5 + i * 0.8}s ease-in-out ${1.8 + i * 0.3}s infinite`,
                }}
              >
                {bad[s.id] ? (
                  <Tower color={s.color} label={s.label} />
                ) : (
                  <img
                    src={`${cutoutBase}/${s.id}.webp`}
                    alt=""
                    className="h-full w-auto max-w-none"
                    style={{ filter: `${FILTER} ${OUTLINE}` }}
                    onError={() => setBad((b) => ({ ...b, [s.id]: true }))}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* copy */}
      <div className="mx-auto w-full max-w-6xl px-5 pb-28 pt-24 sm:pt-28 md:px-8 md:pb-16">
        <div className="max-w-[780px]">
          <p
            style={after(100)}
            className={`mb-4 text-xs font-semibold uppercase tracking-[.25em] text-[#D93A2B] ${fade}`}
          >
            Local experts · Tailor-made trips
          </p>
          <h1
            style={serif}
            className="text-[clamp(32px,10.5vw,44px)] font-semibold leading-[1.02] tracking-tight sm:text-[clamp(44px,8vw,60px)] md:text-[clamp(44px,min(6.5vw,7.2vh),76px)]"
          >
            <span className="sr-only">
              Albania, planned by people who live here.
            </span>
            <span aria-hidden="true">
              {line(0, "Albania, planned")}
              {line(1, "by people who")}
              {line(
                2,
                <em className="font-medium text-[#D93A2B]">live here.</em>,
              )}
            </span>
          </h1>
          <p
            style={after(800)}
            className={`mt-5 max-w-xl text-base text-[#141414]/80 md:text-lg ${fade}`}
          >
            Private or shared journeys from the Alps to the Ionian coast, led by
            licensed local guides, with flexible cancellation and secure
            payments.
          </p>
          <div
            style={after(950)}
            className={`mt-8 flex flex-wrap items-center gap-3 ${fade}`}
          >
            <a
              href={exploreHref}
              className="group flex flex-1 items-center justify-center gap-2 rounded-full bg-[#141414] px-6 py-3.5 font-semibold text-white transition hover:bg-[#D93A2B] sm:flex-none"
            >
              Explore tours
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
                className="transition-transform group-hover:translate-x-0.5"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a
              href={enquireHref}
              className="flex-1 rounded-full border border-black/10 px-6 py-3.5 text-center font-semibold backdrop-blur transition hover:border-[#141414] hover:bg-black/5 sm:flex-none"
            >
              Enquire
            </a>
            <a
              href="/about"
              className="flex w-full items-center gap-2.5 rounded-full py-1 pl-1 pr-3 text-[13px] text-[#141414]/85 underline-offset-4 transition hover:text-[#141414] hover:underline sm:w-auto"
            >
              <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-[#ECE7DC] text-sm font-bold text-[#141414]">
                {badFounder ? (
                  "A"
                ) : (
                  <img
                    src={founderImage}
                    alt=""
                    className="h-full w-full object-cover"
                    onError={() => setBadFounder(true)}
                  />
                )}
              </span>
              Local guides, passionate tripmakers
            </a>
          </div>
          <ul
            style={after(1100)}
            className={`mt-6 grid grid-cols-2 gap-x-4 gap-y-2 text-[13px] text-[#141414]/75 sm:flex sm:flex-wrap sm:gap-x-5 sm:text-sm ${fade}`}
          >
            {FACTS.map((f) => (
              <li key={f} className="flex items-center gap-1.5">
                <Check />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* scroll cue (hidden on phones) */}
      <a
        href={mapHref}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[.2em] text-[#141414]/70 hover:text-[#141414] md:left-8 md:flex md:translate-x-0"
      >
        Scroll to explore the map
        <span
          aria-hidden="true"
          className="h-8 w-px animate-pulse bg-black/40"
        />
      </a>
    </section>
  );
}
