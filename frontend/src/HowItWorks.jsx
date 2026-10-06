'use client';
import { useEffect, useRef, useState } from 'react';

// Load Fraunces (Google Fonts / next/font) for the headings; Georgia is the fallback.
const serif = { fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif" };

const icon = (d) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);

/* ===== EDIT HERE =====
   Step names follow the live site ("We make holidays simple"); the descriptions are suggestions. */
const STEPS = [
  {
    title: 'Explore our itineraries',
    text: 'Browse tours built around the Alps, the coast and the old towns, or start from the places you liked on the map.',
    icon: icon(<><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5z" /></>),
  },
  {
    title: 'Make it your own',
    text: 'Tell us your dates, pace and interests. Our team adapts the trip to you, private or shared.',
    icon: icon(<><path d="M4 7h10M18 7h2M4 17h2M10 17h10" /><circle cx="16" cy="7" r="2" /><circle cx="8" cy="17" r="2" /></>),
  },
  {
    title: 'Travel with confidence',
    text: 'Flexible cancellation, secure payments, and a local team you can reach before, during and after your trip.',
    icon: icon(<><path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z" /><path d="M9 12l2 2 4-4" /></>),
  },
];
/* ===== end of editable data ===== */

/** "We make holidays simple": three steps joined by a line that draws itself. */
export default function HowItWorks({ steps = STEPS, toursHref = '/tours', enquireHref = '/inquiry' }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id="how-it-works" aria-labelledby="how-title" className="bg-[#f6f3e8] py-16 text-[#16210f] md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[.25em] text-[#4f7d12]">How it works</p>
          <h2 id="how-title" style={serif} className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
            We make holidays <em className="font-medium text-[#4f7d12]">simple</em>
          </h2>
        </div>

        <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {/* connecting line: horizontal on desktop, vertical on phones */}
          <span aria-hidden="true" style={{ transitionDelay: '300ms' }} className={`absolute left-7 top-7 bottom-7 w-0 origin-top border-l-2 border-dashed border-[#4f7d12]/40 transition-transform duration-[1400ms] ease-out motion-reduce:transition-none md:hidden ${seen ? 'scale-y-100' : 'scale-y-0'}`} />
          <span aria-hidden="true" style={{ transitionDelay: '300ms' }} className={`absolute left-[16.6%] right-[16.6%] top-7 hidden h-0 origin-left border-t-2 border-dashed border-[#4f7d12]/40 transition-transform duration-[1400ms] ease-out motion-reduce:transition-none md:block ${seen ? 'scale-x-100' : 'scale-x-0'}`} />

          {steps.map((s, i) => (
            <li
              key={s.title}
              style={{ transitionDelay: `${250 + i * 350}ms` }}
              className={`flex gap-5 transition-all duration-700 motion-reduce:transition-none md:flex-col md:items-center md:text-center ${seen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
            >
              <span className="relative z-10 flex h-14 w-14 flex-none items-center justify-center rounded-full bg-[#BBDF86] text-[#16210f] shadow-[0_0_0_8px_#f6f3e8]">{s.icon}</span>
              <div>
                <span style={serif} className="text-sm font-semibold text-[#4f7d12]">Step {i + 1}</span>
                <h3 style={serif} className="mt-1 text-2xl font-semibold leading-snug">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed opacity-70 md:mx-auto md:max-w-xs">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className={`mt-14 flex flex-wrap justify-center gap-3 transition-all duration-700 motion-reduce:transition-none ${seen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '1300ms' }}>
          <a href={toursHref} className="rounded-full bg-[#16210f] px-6 py-3.5 font-semibold text-white transition hover:bg-[#4f7d12]">Explore tours</a>
          <a href={enquireHref} className="rounded-full border border-[#16210f]/30 px-6 py-3.5 font-semibold transition hover:border-[#16210f] hover:bg-[#16210f]/5">Start planning</a>
        </div>
      </div>
    </section>
  );
}
