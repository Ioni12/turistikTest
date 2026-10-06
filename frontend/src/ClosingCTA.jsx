"use client";
import { useEffect, useRef, useState } from "react";

// Load Fraunces (Google Fonts / next/font) for the headline; Georgia is the fallback.
const serif = { fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif" };

// A few of the monument stickers again (same files as the hero: {cutoutBase}/{id}.png; a missing file shows a tower).
const STICKERS = [
  { id: "berat", label: "Berat Castle", color: "#78B89A", x: 66, h: 58 },
  { id: "shkoder", label: "Rozafa Castle", color: "#B7DC84", x: 82, h: 78 },
  {
    id: "gjirokaster",
    label: "Gjirokastër Castle",
    color: "#E8C28F",
    x: 96,
    h: 64,
  },
];
const OUTLINE =
  "drop-shadow(3px 0 0 #fff) drop-shadow(-3px 0 0 #fff) drop-shadow(0 3px 0 #fff) drop-shadow(0 -3px 0 #fff)";

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
const Phone = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </svg>
);
const Chat = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 12a8 8 0 0 1-11.7 7L3 21l2-5.2A8 8 0 1 1 21 12z" />
  </svg>
);

/**
 * Closing call to action. `whatsapp` is optional: pass a full link such as "https://wa.me/<number>" to show the button.
 * The phone number comes from the tour page on the live site: please confirm it.
 */
export default function ClosingCTA({
  enquireHref = "/inquiry",
  toursHref = "/tours",
  phone = "+355 69 229 0036",
  phoneHref = "tel:+355692290036",
  whatsapp = null,
  cutoutBase = "/albania/cutouts",
}) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  const [bad, setBad] = useState({});

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
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const fade = (ms) => ({ transitionDelay: `${ms}ms` });
  const cls = `transition-all duration-700 motion-reduce:transition-none ${seen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`;

  return (
    <section
      ref={ref}
      aria-labelledby="cta-title"
      className="bg-[#FAF8F4] px-3 pb-3 pt-6 md:px-6 md:pb-6 md:pt-10"
    >
      <div className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-[#ECE7DC] text-[#141414] md:rounded-[44px]">
        {/* monument stickers */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-[1] hidden md:block"
        >
          {STICKERS.map((s, i) => (
            <div
              key={s.id}
              className={`absolute bottom-[-4%] transition-all duration-[1000ms] ease-out motion-reduce:transition-none ${seen ? "translate-y-0 opacity-90" : "translate-y-[30%] opacity-0"}`}
              style={{
                left: s.x + "%",
                height: s.h + "%",
                transform: undefined,
                transitionDelay: `${400 + i * 150}ms`,
              }}
            >
              <div className="h-full -translate-x-1/2">
                {bad[s.id] ? (
                  <Tower color={s.color} label={s.label} />
                ) : (
                  <img
                    src={`${cutoutBase}/${s.id}.png`}
                    alt=""
                    className="h-full w-auto max-w-none"
                    style={{ filter: `grayscale(1) contrast(1.08) ${OUTLINE}` }}
                    onError={() => setBad((b) => ({ ...b, [s.id]: true }))}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="relative px-6 py-16 md:px-14 md:py-24">
          <div className="max-w-xl">
            <p
              style={fade(0)}
              className={`mb-4 text-xs font-semibold uppercase tracking-[.25em] text-[#D93A2B] ${cls}`}
            >
              Ready when you are
            </p>
            <h2
              id="cta-title"
              style={{ ...serif, ...fade(120) }}
              className={`text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl ${cls}`}
            >
              Let&rsquo;s get your{" "}
              <em className="font-medium text-[#D93A2B]">trip</em> started
            </h2>
            <p
              style={fade(260)}
              className={`mt-5 max-w-md text-base text-[#141414]/80 md:text-lg ${cls}`}
            >
              Tell us what you have in mind and our local team will shape a trip
              around it, from a long weekend in the Alps to two weeks along the
              coast.
            </p>
            <div
              style={fade(400)}
              className={`mt-8 flex flex-wrap gap-3 ${cls}`}
            >
              <a
                href={enquireHref}
                className="rounded-full bg-[#141414] px-7 py-3.5 font-semibold text-white transition hover:bg-[#D93A2B]"
              >
                Enquire now
              </a>
              <a
                href={toursHref}
                className="rounded-full border border-black/10 px-7 py-3.5 font-semibold backdrop-blur transition hover:border-[#141414] hover:bg-black/5"
              >
                Explore tours
              </a>
            </div>
            <div
              style={fade(520)}
              className={`mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#141414]/80 ${cls}`}
            >
              <a
                href={phoneHref}
                className="flex items-center gap-2 hover:text-[#141414]"
              >
                <Phone /> {phone}
              </a>
              {whatsapp && (
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#141414]"
                >
                  <Chat /> Chat on WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
