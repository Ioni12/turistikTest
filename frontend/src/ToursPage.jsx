'use client';
import { useMemo, useState } from 'react';
import PageHero from './PageHero.jsx';
import { TourCard, KINDS, WHO } from './FeaturedTours.jsx';
import { ALL_TOURS } from './toursData.js';

const LENGTHS = [['any', 'Any length'], ['short', 'Up to 3 days'], ['mid', '4 to 7 days'], ['long', '8 days or more']];
const SORTS = [['best', 'Best match'], ['price-asc', 'Price: low to high'], ['price-desc', 'Price: high to low'], ['days-asc', 'Shortest first'], ['rating', 'Top rated']];
const RANK = { available: 0, check: 1, 'sold-out': 2 };
const inLen = (t, l) => l === 'any' || (l === 'short' && t.days <= 3) || (l === 'mid' && t.days >= 4 && t.days <= 7) || (l === 'long' && t.days >= 8);

const chip = (on) => `rounded-full border px-4 py-1.5 text-sm transition ${on ? 'border-transparent bg-[#16210f] text-white' : 'border-black/15 hover:border-black/40'}`;

/** /tours: every tour, with filters and sorting. */
export default function ToursPage() {
  const [kind, setKind] = useState('any');
  const [who, setWho] = useState('any');
  const [len, setLen] = useState('any');
  const [sort, setSort] = useState('best');

  const list = useMemo(() => {
    const l = ALL_TOURS.filter((t) => (kind === 'any' || t.kinds.includes(kind)) && (who === 'any' || t.who.includes(who)) && inLen(t, len));
    const by = {
      best: (a, b) => RANK[a.availability] - RANK[b.availability],
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      'days-asc': (a, b) => a.days - b.days,
      rating: (a, b) => (b.rating || 0) - (a.rating || 0),
    }[sort];
    return [...l].sort(by);
  }, [kind, who, len, sort]);
  const reset = () => { setKind('any'); setWho('any'); setLen('any'); setSort('best'); };

  return (
    <>
      <PageHero eyebrow="Tours" title="Tours and holidays in Albania" text="Private or shared journeys from the Alps to the Ionian coast, led by licensed local guides." crumbs={[['Home', '/'], ['Tours']]} />
      <main id="main" className="bg-[#fbf9f1] py-12 text-[#16210f] md:py-16">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-5 rounded-3xl border border-black/10 bg-white p-5 md:p-6">
            {[['What kind of trip?', KINDS, kind, setKind], ['Who is going?', WHO, who, setWho]].map(([label, opts, val, set]) => (
              <div key={label} role="group" aria-label={label}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[.2em] opacity-55">{label}</p>
                <div className="flex flex-wrap gap-2">{opts.map(([id, text]) => (<button key={id} type="button" aria-pressed={val === id} onClick={() => set(id)} className={chip(val === id)}>{text}</button>))}</div>
              </div>
            ))}
            <div className="flex flex-wrap items-end gap-4">
              <label className="text-sm font-semibold">Length
                <select value={len} onChange={(e) => setLen(e.target.value)} className="mt-1.5 block rounded-xl border border-black/20 bg-white px-3 py-2.5 text-[15px] font-normal">{LENGTHS.map(([v, t]) => (<option key={v} value={v}>{t}</option>))}</select>
              </label>
              <label className="text-sm font-semibold">Sort by
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="mt-1.5 block rounded-xl border border-black/20 bg-white px-3 py-2.5 text-[15px] font-normal">{SORTS.map(([v, t]) => (<option key={v} value={v}>{t}</option>))}</select>
              </label>
              <button type="button" onClick={reset} className="ml-auto text-sm font-semibold underline underline-offset-4">Clear filters</button>
            </div>
          </div>

          <p className="mt-6 text-sm opacity-60" aria-live="polite">{list.length} {list.length === 1 ? 'tour' : 'tours'} found</p>
          {list.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-dashed border-black/20 p-10 text-center">
              <p className="opacity-70">No tours match those choices yet.</p>
              <div className="mt-4 flex justify-center gap-3"><button type="button" onClick={reset} className="rounded-full bg-[#16210f] px-5 py-2.5 text-sm font-semibold text-white">Clear filters</button><a href="/inquiry" className="rounded-full border border-black/30 px-5 py-2.5 text-sm font-semibold">Ask for a tailor-made trip</a></div>
            </div>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map((t, i) => (<TourCard key={t.slug} t={t} i={i} />))}</div>
          )}
        </div>
      </main>
    </>
  );
}
