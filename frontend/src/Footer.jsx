"use client";

// Load Fraunces (Google Fonts / next/font) for the wordmark; Georgia is the fallback.
const serif = { fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif" };

/* ===== EDIT HERE =====
   Columns and links follow the live site's footer. Left out on purpose: Experiences, All Inclusive, Careers, Press Kit
   and Travel Insurance, because on the live site they point to pages that already exist elsewhere. */
const COLUMNS = [
  {
    title: "Explore",
    links: [
      ["Tours", "/tours"],
      ["Collections", "/collection"],
      ["Destinations", "/destinations"],
      ["Attractions", "/attractions"],
      ["Articles", "/article"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About us", "/about"],
      ["Our team", "/about/our-team"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Useful information",
    links: [
      ["Trip level guide", "/trip-level"],
      ["Travel visa", "/visa-albania"],
      ["FAQ", "/faq"],
      ["How to find us", "/contact"],
      ["Sitemap", "/sitemap"],
    ],
  },
  {
    title: "Legal terms",
    links: [
      ["Booking terms", "/booking-terms"],
      ["Cancellation terms", "/cancelation"],
      ["Privacy policy", "/privacy-policy"],
    ],
  },
  {
    title: "Partners",
    links: [
      ["Affiliate", "/contact/business"],
      ["Wonder Partner", "/contact/business"],
      ["Partner policy", "/privacy-policy"],
    ],
  },
];
const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/wonder.albania/",
    d: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/wonderalbania",
    d: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 10v6M8 7.5h.01M12 16v-6M12 12.5c0-1.5 1-2.5 2.5-2.5S17 11 17 12.5V16" />
      </>
    ),
  },
  {
    label: "Google",
    href: "https://www.google.com/search?kgmid=/g/11xd20lhh3&q=Wonder+Albania",
    d: <path d="M20 12h-8M20 12a8 8 0 1 1-2.3-5.7" />,
  },
];
/* ===== end of editable data ===== */

export default function Footer({ columns = COLUMNS, socials = SOCIALS }) {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-black/10 bg-[#FAF8F4] text-[#141414]">
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-16 md:px-8 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_2.4fr]">
          {/* brand */}
          <div>
            <a
              href="/"
              aria-label="Wonder Albania, home"
              style={serif}
              className="text-3xl font-semibold tracking-tight"
            >
              Wonder <em className="font-medium text-[#D93A2B]">Albania</em>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#141414]/65">
              Tours and holidays in Albania, planned and led by a registered
              local team.
            </p>
            <ul className="mt-6 flex gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition hover:border-[#141414] hover:bg-[#141414] hover:text-[#141414]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {s.d}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* link columns */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-5"
          >
            {columns.map((c) => (
              <div key={c.title}>
                <h3 className="text-[11px] font-semibold uppercase tracking-[.2em] text-[#D93A2B]">
                  {c.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map(([label, href]) => (
                    <li key={href}>
                      <a
                        href={href}
                        className="text-sm text-[#141414]/70 transition hover:text-[#141414]"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-black/10 pt-6 text-xs text-[#141414]/50">
          <p>
            &copy; {year} Wonder Albania. A registered Albanian tour operator.
          </p>
          <p>Made with care in Albania.</p>
        </div>
      </div>

      {/* oversized wordmark, cropped by the bottom edge */}
      <div
        aria-hidden="true"
        style={serif}
        className="pointer-events-none select-none whitespace-nowrap text-center text-[17vw] font-semibold leading-[.8] tracking-tighter text-black/[.05]"
      >
        Wonder Albania
      </div>
    </footer>
  );
}
