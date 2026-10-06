"use client";
import { useEffect, useRef, useState } from "react";
import { UNITS, INFO } from "./albaniaData";

// Load Fraunces (Google Fonts / next/font) for the wordmark and headings; Georgia is the fallback.
const FONT = "'Fraunces', Georgia, 'Times New Roman', serif";
const serif = { fontFamily: FONT };

const LINKS = [
  { label: "Tours", href: "/tours", menu: "tours" },
  { label: "Destinations", href: "/destinations", menu: "destinations" },
  { label: "Collections", href: "/collection" },
  { label: "Stories", href: "/article" },
  { label: "About", href: "/about" },
];
const LANGS = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
];
// Tours and prices from the live homepage (first four) plus two from the tour pages. Collection slugs match the live site.
const TOURS = [
  {
    title: "Theth and Blue Eye",
    sub: "2-day Alps escape",
    days: 2,
    price: 128,
    href: "/tour/theth-alpine-adventure",
  },
  {
    title: "Theth to Valbona Hiking",
    sub: "3-day Alps crossing",
    days: 3,
    price: 250,
    href: "/tour/theth-valbona-hiking-adventure",
  },
  {
    title: "Albania Slow Travel Journey",
    sub: "Cultural and coastal adventure",
    days: 12,
    price: 1515,
    href: "/tour/albania-slow-travel-journey",
  },
  {
    title: "Albania Grand Mosaic",
    sub: "Alps, heritage and Riviera",
    days: 10,
    price: 1390,
    href: "/tour/albania-grand-mosaic-10-day-tour",
  },
  {
    title: "Essential Albania Express",
    sub: "UNESCO towns and Riviera",
    days: 5,
    price: 790,
    href: "/tour/essential-albania-express-5-day-tour",
  },
  {
    title: "Albania Signature Journey",
    sub: "Mountains to Mediterranean",
    days: 8,
    price: 1090,
    href: "/tour/albania-signature-journey-8-days",
  },
];
const TYPES = [
  ["Hiking tours", "/collection/hiking-tours"],
  ["Couples holidays", "/collection/couples-holidays"],
  ["Family holidays", "/collection/family-holiday"],
  ["Summer holidays", "/collection/summer-holidays"],
];
const SEARCH = [
  ...UNITS.map((u) => ({
    kind: "County",
    title: u.name,
    sub: INFO[u.id]?.tag || "",
    href: `/destinations/${u.id}`,
    color: u.color,
  })),
  ...TOURS.map((t) => ({
    kind: "Tour",
    title: t.title,
    sub: `${t.days} days · from €${t.price}`,
    href: t.href,
  })),
];

const svg =
  (d, s = 18) =>
  (p) => (
    <svg
      viewBox="0 0 24 24"
      width={s}
      height={s}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...p}
    >
      {d}
    </svg>
  );
const Icon = {
  chevron: svg(<path d="M6 9l6 6 6-6" />, 14),
  phone: svg(
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />,
    16,
  ),
  menu: svg(<path d="M4 8h16M4 16h16" />, 22),
  close: svg(<path d="M6 6l12 12M18 6L6 18" />, 22),
  search: svg(
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </>,
    18,
  ),
  arrow: svg(<path d="M5 12h14M13 6l6 6-6 6" />, 16),
};

/**
 * Floating glass header with mega menus, search (Ctrl/Cmd+K), language switcher and a mobile menu.
 * tone: 'dark' = light text over a dark hero (default); 'light' = dark text over a light page.
 * currentPath: marks the active link (pass usePathname() in Next.js). Swap the wordmark for your logo image if you like.
 */
export default function Header({
  tone = "light",
  currentPath = "/",
  phone = "+355 69 229 0036",
  phoneHref = "tel:+355692290036",
  enquireHref = "/inquiry",
  lang = "en",
  onLang = () => {},
}) {
  const dark = tone === "dark";
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(null); // 'tours' | 'destinations' | null
  const [open, setOpen] = useState(false); // mobile menu
  const [mobileIn, setMobileIn] = useState(false);
  const [acc, setAcc] = useState(false); // mobile destinations accordion
  const [langOpen, setLangOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const [ind, setInd] = useState({ left: 0, width: 0, on: false });
  const last = useRef(0);
  const closeTimer = useRef(null);
  const inputRef = useRef(null);

  const results = q.trim()
    ? SEARCH.filter((r) =>
        (r.title + " " + r.sub).toLowerCase().includes(q.trim().toLowerCase()),
      )
    : SEARCH.slice(0, 7);
  const overlayOpen = open || searchOpen;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY,
        dy = y - last.current;
      setScrolled(y > 20);
      if (y <= 240) {
        setHidden(false);
        last.current = y;
      } else if (Math.abs(dy) > 4) {
        setHidden(dy > 0);
        last.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = overlayOpen ? "hidden" : "";
    window.lenis?.[overlayOpen ? "stop" : "start"](); // pause smooth scrolling behind menus and search
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMenu(null);
        setLangOpen(false);
        setSearchOpen(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.lenis?.start();
    };
  }, [overlayOpen]);

  useEffect(() => {
    // staggered reveal for the mobile menu
    if (!open) {
      setMobileIn(false);
      return;
    }
    const r = requestAnimationFrame(() => setMobileIn(true));
    return () => cancelAnimationFrame(r);
  }, [open]);

  useEffect(() => {
    if (searchOpen) {
      setQ("");
      setCursor(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [searchOpen]);

  const holdMenu = () => clearTimeout(closeTimer.current);
  const leaveMenu = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setMenu(null);
      setInd((i) => ({ ...i, on: false }));
    }, 160);
  };
  const hoverIn = (e, m) => {
    holdMenu();
    setInd({
      left: e.currentTarget.offsetLeft,
      width: e.currentTarget.offsetWidth,
      on: true,
    });
    setMenu(m || null);
  };
  const isActive = (href) =>
    href === "/" ? currentPath === "/" : currentPath.startsWith(href);
  const go = (href) => {
    window.location.href = href;
  };

  const text = dark ? "text-white" : "text-[#141414]";
  const glass = dark
    ? scrolled || menu
      ? "bg-[#0b1a14]/85 border-white/15"
      : "bg-[#0b1a14]/35 border-white/15"
    : scrolled || menu
      ? "bg-white/90 border-black/10"
      : "bg-white/60 border-black/10";
  const hoverPill = dark ? "bg-white/15" : "bg-black/[.07]";
  const hide = hidden && !menu && !overlayOpen && !langOpen;
  const link =
    "relative z-10 flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D93A2B]";
  const dot =
    "after:absolute after:-bottom-0.5 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-[#D93A2B]";

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[80] focus:rounded-full focus:bg-[#141414] focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 px-3 pt-[calc(10px+env(safe-area-inset-top))] transition-transform duration-300 motion-reduce:transition-none ${text} ${hide ? "-translate-y-[130%]" : "translate-y-0"}`}
      >
        <div
          className="relative mx-auto max-w-6xl"
          onMouseEnter={holdMenu}
          onMouseLeave={leaveMenu}
        >
          {/* the floating bar */}
          <div
            className={`flex h-14 items-center justify-between gap-3 rounded-full border pl-5 pr-2 shadow-[0_8px_30px_-12px_rgba(0,0,0,.45)] backdrop-blur-xl transition-colors duration-300 ${glass}`}
          >
            <a
              href="/"
              aria-label="Wonder Albania, home"
              style={serif}
              className="text-xl font-semibold tracking-tight"
            >
              Wonder{" "}
              <em
                className={`font-medium ${dark ? "text-[#D93A2B]" : "text-[#D93A2B]"}`}
              >
                Albania
              </em>
            </a>

            <nav
              aria-label="Main"
              className="relative hidden items-center lg:flex"
              onMouseLeave={() => setInd((i) => ({ ...i, on: false }))}
            >
              <span
                aria-hidden="true"
                className={`absolute top-1/2 h-9 -translate-y-1/2 rounded-full transition-all duration-300 ease-out motion-reduce:transition-none ${hoverPill}`}
                style={{
                  left: ind.left,
                  width: ind.width,
                  opacity: ind.on ? 1 : 0,
                }}
              />
              {LINKS.map((l) => (
                <div
                  key={l.href}
                  className="flex items-center"
                  onMouseEnter={(e) => hoverIn(e, l.menu)}
                >
                  <a
                    href={l.href}
                    className={`${link} ${isActive(l.href) ? dot : ""}`}
                  >
                    {l.label}
                  </a>
                  {l.menu && (
                    <button
                      type="button"
                      aria-label={`Show ${l.label} menu`}
                      aria-expanded={menu === l.menu}
                      onClick={() =>
                        setMenu((m) => (m === l.menu ? null : l.menu))
                      }
                      className="relative z-10 -ml-3 mr-1 rounded-full p-1.5 opacity-70 hover:opacity-100"
                    >
                      <Icon.chevron
                        className={`transition-transform ${menu === l.menu ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-1 md:gap-1.5">
              <button
                type="button"
                aria-label="Search (Ctrl K)"
                onClick={() => setSearchOpen(true)}
                className="hidden rounded-full p-2.5 opacity-80 hover:bg-black/5 hover:opacity-100 sm:block"
              >
                <Icon.search />
              </button>
              <a
                href={phoneHref}
                aria-label={`Call ${phone}`}
                className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm opacity-90 hover:opacity-100 xl:flex"
              >
                <Icon.phone /> {phone}
              </a>
              <div className="relative hidden sm:block">
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={langOpen}
                  onClick={() => setLangOpen((o) => !o)}
                  className="flex items-center gap-1 rounded-full px-2.5 py-2 text-sm font-medium uppercase opacity-90 hover:opacity-100"
                >
                  {lang} <Icon.chevron />
                </button>
                {langOpen && (
                  <ul
                    role="listbox"
                    className="absolute right-0 top-full mt-3 w-36 overflow-hidden rounded-2xl border border-black/10 bg-white py-1 text-[#141414] shadow-xl"
                  >
                    {LANGS.map((l) => (
                      <li
                        key={l.code}
                        role="option"
                        aria-selected={l.code === lang}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            onLang(l.code);
                            setLangOpen(false);
                          }}
                          className={`w-full px-3 py-2 text-left text-sm hover:bg-black/5 ${l.code === lang ? "font-semibold" : ""}`}
                        >
                          {l.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <a
                href={enquireHref}
                className="group ml-1 flex items-center gap-1.5 rounded-full bg-[#141414] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#D93A2B] md:px-5"
              >
                Enquire{" "}
                <Icon.arrow className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((o) => !o)}
                className="rounded-full p-2.5 hover:bg-black/5 lg:hidden"
              >
                {open ? <Icon.close /> : <Icon.menu />}
              </button>
            </div>
          </div>

          {/* mega menus */}
          {menu && (
            <div className="absolute inset-x-0 top-full hidden pt-2 lg:block">
              <div className="grid gap-6 rounded-[28px] border border-black/10 bg-white/95 p-6 text-[#141414] shadow-2xl backdrop-blur-xl md:grid-cols-[1fr_280px]">
                {menu === "destinations" ? (
                  <>
                    <div>
                      <div className="mb-3 text-[11px] font-semibold uppercase tracking-[.2em] opacity-50">
                        Explore by county
                      </div>
                      <ul className="grid grid-cols-3 gap-x-4 gap-y-1">
                        {UNITS.map((u) => (
                          <li key={u.id}>
                            <a
                              href={`/destinations/${u.id}`}
                              className="group flex items-start gap-2.5 rounded-xl p-2 hover:bg-black/5"
                            >
                              <i
                                className="mt-1.5 h-2.5 w-2.5 flex-none rounded-full"
                                style={{ background: u.color }}
                              />
                              <span>
                                <b className="block text-sm font-semibold">
                                  {u.name}
                                </b>
                                <span className="line-clamp-1 text-xs opacity-60">
                                  {INFO[u.id]?.tag}
                                </span>
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col justify-between rounded-2xl bg-[#ECE7DC] p-5">
                      <div>
                        <div
                          style={serif}
                          className="text-2xl font-semibold leading-tight"
                        >
                          Not sure where to go?
                        </div>
                        <p className="mt-2 text-sm opacity-75">
                          Scroll the map from the Alps to the coast and see what
                          each county has to offer.
                        </p>
                      </div>
                      <div className="mt-4 flex flex-col gap-2">
                        <a
                          href="/#map"
                          className="rounded-full bg-[#141414] px-4 py-2.5 text-center text-sm font-semibold text-white"
                        >
                          Explore the map
                        </a>
                        <a
                          href="/destinations"
                          className="text-center text-sm font-semibold underline underline-offset-4"
                        >
                          All destinations
                        </a>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="mb-3 text-[11px] font-semibold uppercase tracking-[.2em] opacity-50">
                        Featured tours
                      </div>
                      <ul className="grid grid-cols-2 gap-2">
                        {TOURS.slice(0, 4).map((t) => (
                          <li key={t.href}>
                            <a
                              href={t.href}
                              className="flex h-full flex-col justify-between rounded-2xl border border-black/10 p-4 transition hover:border-[#D93A2B] hover:bg-[#ECE7DC]"
                            >
                              <span>
                                <b
                                  style={serif}
                                  className="block text-base font-semibold leading-snug"
                                >
                                  {t.title}
                                </b>
                                <span className="text-xs opacity-60">
                                  {t.sub}
                                </span>
                              </span>
                              <span className="mt-3 flex items-center justify-between text-xs">
                                <span className="opacity-60">
                                  {t.days} days
                                </span>
                                <b className="text-[#D93A2B]">
                                  from €{t.price.toLocaleString("en")}
                                </b>
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col rounded-2xl bg-[#141414] p-5 text-white">
                      <div className="mb-2 text-[11px] font-semibold uppercase tracking-[.2em] opacity-60">
                        Browse by style
                      </div>
                      <ul className="flex-1">
                        {TYPES.map(([n, h]) => (
                          <li key={h}>
                            <a
                              href={h}
                              className="flex items-center justify-between border-b border-white/10 py-2 text-sm hover:text-[#D93A2B]"
                            >
                              {n} <Icon.arrow />
                            </a>
                          </li>
                        ))}
                      </ul>
                      <a
                        href="/tours"
                        className="mt-4 rounded-full bg-[#141414] px-4 py-2.5 text-center text-sm font-semibold text-white"
                      >
                        See all tours
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* mobile menu */}
      {open && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-[#FAF8F4] px-6 pb-8 pt-[calc(96px+env(safe-area-inset-top))] text-[#141414] lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {LINKS.map((l, i) => (
              <div
                key={l.href}
                style={{ transitionDelay: `${i * 50}ms` }}
                className={`border-b border-black/10 transition-all duration-500 motion-reduce:transition-none ${mobileIn ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              >
                <div className="flex items-center justify-between">
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    style={serif}
                    className="flex-1 py-4 text-3xl font-semibold tracking-tight"
                  >
                    {l.label}
                  </a>
                  {l.menu === "destinations" && (
                    <button
                      type="button"
                      aria-label="Show counties"
                      aria-expanded={acc}
                      onClick={() => setAcc((a) => !a)}
                      className="p-3"
                    >
                      <Icon.chevron
                        className={`transition-transform ${acc ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}
                </div>
                {l.menu === "destinations" && acc && (
                  <div className="flex flex-wrap gap-2 pb-4">
                    {UNITS.map((u) => (
                      <a
                        key={u.id}
                        href={`/destinations/${u.id}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-1.5 rounded-full border border-black/20 px-3 py-1.5 text-sm"
                      >
                        <i
                          className="h-2 w-2 rounded-full"
                          style={{ background: u.color }}
                        />
                        {u.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {LANGS.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => onLang(l.code)}
                className={`rounded-full border px-4 py-1.5 text-sm ${l.code === lang ? "border-[#141414] bg-[#141414] text-white" : "border-black/25"}`}
              >
                {l.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setSearchOpen(true);
              }}
              className="ml-auto flex items-center gap-1.5 rounded-full border border-black/25 px-4 py-1.5 text-sm"
            >
              <Icon.search /> Search
            </button>
          </div>
          <a
            href={phoneHref}
            className="mt-6 flex items-center gap-2 text-sm opacity-80"
          >
            <Icon.phone /> {phone}
          </a>
          <a
            href={enquireHref}
            onClick={() => setOpen(false)}
            className="mt-6 rounded-full bg-[#141414] py-3.5 text-center font-semibold text-white"
          >
            Enquire about a trip
          </a>
        </div>
      )}

      {/* search overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/60 px-4 pt-[14vh] backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setSearchOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            className="w-full max-w-xl overflow-hidden rounded-3xl bg-white text-[#141414] shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-black/10 px-5">
              <Icon.search className="opacity-50" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setCursor(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setCursor((c) => Math.min(c + 1, results.length - 1));
                  }
                  if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setCursor((c) => Math.max(c - 1, 0));
                  }
                  if (e.key === "Enter" && results[cursor])
                    go(results[cursor].href);
                }}
                placeholder="Search tours and destinations"
                className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-black/40"
              />
              <kbd className="hidden rounded-md border border-black/15 px-1.5 py-0.5 text-[11px] opacity-60 sm:block">
                Esc
              </kbd>
            </div>
            <ul data-lenis-prevent className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-4 py-6 text-center text-sm opacity-60">
                  Nothing found. Try a place like Berat or Theth.
                </li>
              )}
              {results.map((r, i) => (
                <li key={r.href}>
                  <a
                    href={r.href}
                    onMouseEnter={() => setCursor(i)}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${i === cursor ? "bg-[#ECE7DC]" : ""}`}
                  >
                    <i
                      className="h-2.5 w-2.5 flex-none rounded-full"
                      style={{ background: r.color || "#141414" }}
                    />
                    <span className="flex-1">
                      <b className="block text-sm font-semibold">{r.title}</b>
                      <span className="line-clamp-1 text-xs opacity-60">
                        {r.sub}
                      </span>
                    </span>
                    <span className="text-[11px] uppercase tracking-wider opacity-50">
                      {r.kind}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
