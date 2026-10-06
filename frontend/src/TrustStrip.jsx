'use client';
import { useEffect, useRef, useState } from 'react';

// Load Fraunces (Google Fonts / next/font) for the titles; Georgia is the fallback.
const serif = { fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif" };

const icon = (d) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);

// Wording follows the "Travel with confidence" section on the live site. Edit freely; href is optional.
const ITEMS = [
  {
    title: 'Clear cancellation terms',
    text: 'Cancellation and refund terms are explained before you book.',
    href: '/cancelation',
    icon: icon(<><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4M9 15l2 2 4-4" /></>),
  },
  {
    title: 'Tourism professionals',
    text: 'A local team who know Albania, its places and the people behind them.',
    href: '/about',
    icon: icon(<><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5z" /></>),
  },
  {
    title: 'Happiness guarantee',
    text: "If something isn't right, we'll do everything reasonably possible to put it right.",
    href: '/booking-terms',
    icon: icon(<><circle cx="12" cy="12" r="9" /><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9.5h.01M15 9.5h.01" /></>),
  },
  {
    title: 'Local & registered',
    text: 'A registered Albanian tour operator you can reach before, during and after your trip.',
    href: '/about',
    icon: icon(<><path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z" /><path d="M9 12l2 2 4-4" /></>),
  },
];

/** Thin reassurance row. Place it right after the map section. */
export default function TrustStrip({ items = ITEMS }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => { // fade the items in once, when the strip scrolls into view
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} aria-label="Why travel with us" className="relative z-10 border-y border-black/10 bg-[#f6f3e8] text-[#16210f] dark:border-white/10 dark:bg-[#0f2328] dark:text-[#e8f0e0]">
      <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-y-6 px-5 py-8 sm:grid-cols-2 md:grid-cols-4 md:gap-y-0 md:px-8 md:py-10">
        {items.map((it, i) => {
          const body = (
            <>
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#BBDF86] text-[#16210f]">{it.icon}</span>
              <span>
                <b style={serif} className="block text-base font-semibold leading-snug">{it.title}</b>
                <span className="mt-1 block text-[13px] leading-snug opacity-70">{it.text}</span>
              </span>
            </>
          );
          return (
            <li
              key={it.title}
              style={{ transitionDelay: `${i * 110}ms` }}
              className={`transition-all duration-700 motion-reduce:transition-none md:border-l md:border-black/10 md:px-6 md:first:border-l-0 md:first:pl-0 md:last:pr-0 dark:md:border-white/10 ${seen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            >
              {it.href ? (
                <a href={it.href} className="group flex items-start gap-3 rounded-2xl outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4f7d12]">{body}</a>
              ) : (
                <div className="flex items-start gap-3">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
