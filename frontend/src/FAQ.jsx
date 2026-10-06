'use client';
import { useState } from 'react';
import useSeen from './useSeen';

const serif = { fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif" };

/* ===== EDIT HERE =====
   DRAFT answers built from facts on the live tour pages. Check that each one is true for ALL tours before launch
   (for example the 48-hour cancellation line and the "licensed leader" line were read on the Grand Mosaic page). */
export const GENERAL_FAQS = [
  { q: 'Can I book privately or join a group?', a: 'Both. Book a private departure for your own dates, or join a shared group departure when one is published. The route and the meals stay the same either way.' },
  { q: 'Are flights included?', a: 'No, international flights are not included. Airport pickup and drop-off are included on the scheduled arrival and departure days.' },
  { q: 'What if my plans change?', a: 'Our cancellation and refund terms are explained clearly before you book, and on our tours cancellation is free until 48 hours before departure.' },
  { q: 'How do payments work?', a: 'Secure your spot with a deposit, then pay the balance on the schedule shown, with no interest or fees.' },
  { q: 'Are meals included?', a: 'Many journeys include all meals, and each tour page lists exactly what is covered. Tell us about dietary needs early (vegetarian, vegan, halal, gluten-free). Options can be more limited in remote mountain areas.' },
  { q: 'How active are the trips?', a: 'Every tour has a level that considers pace, terrain and daily duration together. Our trip level guide explains what each one means, so you can pick the right pace.' },
  { q: 'What if the weather affects a mountain or boat stage?', a: 'Your guide may reorder, shorten or replace the affected stage with the safest suitable alternative, while keeping the overall character of the journey.' },
  { q: 'Who will be with me on the trip?', a: 'A licensed English- or French-speaking tour leader from our local team, and a real person you can reach before and during your trip.' },
];
/* ===== end of editable data ===== */

const Plus = ({ open }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className={`flex-none transition-transform duration-300 ${open ? 'rotate-45' : ''}`}><path d="M12 5v14M5 12h14" /></svg>
);

/** Accordion with FAQPage structured data for search engines. Reused on the homepage and on tour pages. */
export default function FAQ({ faqs = GENERAL_FAQS, title = 'Questions before you book', eyebrow = 'FAQ', contactHref = '/contact', id = 'faq' }) {
  const [openIdx, setOpenIdx] = useState(0);
  const [ref, seen] = useSeen(0.1);
  const ld = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

  return (
    <section ref={ref} id={id} aria-labelledby={`${id}-title`} className="bg-[#f6f3e8] py-16 text-[#16210f] md:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:px-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[.25em] text-[#4f7d12]">{eyebrow}</p>
          <h2 id={`${id}-title`} style={serif} className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">{title}</h2>
          <p className="mt-4 max-w-sm text-[15px] opacity-70">Can&rsquo;t find your answer? A real person from our local team will help.</p>
          <a href={contactHref} className="mt-6 inline-block rounded-full bg-[#16210f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4f7d12]">Ask us a question</a>
        </div>

        <ul className="divide-y divide-[#16210f]/15 border-y border-[#16210f]/15">
          {faqs.map((f, i) => {
            const open = openIdx === i;
            return (
              <li key={f.q} style={{ transitionDelay: `${i * 70}ms` }} className={`transition-all duration-700 motion-reduce:transition-none ${seen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <h3>
                  <button type="button" aria-expanded={open} aria-controls={`${id}-a${i}`} onClick={() => setOpenIdx(open ? -1 : i)} className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-semibold">
                    <span style={serif}>{f.q}</span>
                    <Plus open={open} />
                  </button>
                </h3>
                <div id={`${id}-a${i}`} role="region" className={`grid transition-all duration-300 ease-out motion-reduce:transition-none ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <p className="overflow-hidden pb-0 text-[15px] leading-relaxed opacity-75"><span className="block pb-5">{f.a}</span></p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
