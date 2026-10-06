'use client';
import { useParams } from 'react-router-dom';
import PageHero from './PageHero.jsx';
import CountyMap from './CountyMap.jsx';
import { TourCard } from './FeaturedTours.jsx';
import { NotFoundPage } from './InfoPages.jsx';
import { UNITS, INFO } from './albaniaData';
import { ALL_TOURS } from './toursData.js';

const serif = { fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif" };

/** /destinations/<county id>: overview, highlights and the tours that pass through. */
export default function DestinationPage() {
  const { id } = useParams();
  const i = UNITS.findIndex((u) => u.id === id);
  if (i < 0) return <NotFoundPage />;
  const u = UNITS[i], info = INFO[u.id] || { tag: '', best: '', cards: [] };
  const prev = UNITS[(i + UNITS.length - 1) % UNITS.length], next = UNITS[(i + 1) % UNITS.length];
  const tours = ALL_TOURS.filter((t) => t.counties.includes(u.id));

  return (
    <>
      <PageHero eyebrow={`County ${String(i + 1).padStart(2, '0')} of ${UNITS.length}`} title={u.name} text={info.tag} accent={u.color} crumbs={[['Home', '/'], ['Destinations', '/destinations'], [u.name]]} />
      <main id="main" className="bg-[#f6f3e8] text-[#16210f]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-[1fr_260px]">
          <div>
            <dl className="flex flex-wrap gap-x-10 gap-y-3 text-sm">
              <div><dt className="text-xs uppercase tracking-widest opacity-50">Main town</dt><dd className="mt-1 text-lg font-semibold" style={serif}>{u.main}</dd></div>
              <div><dt className="text-xs uppercase tracking-widest opacity-50">Best for</dt><dd className="mt-1 text-lg font-semibold" style={serif}>{info.best}</dd></div>
            </dl>
            <h2 style={serif} className="mt-10 text-3xl font-semibold tracking-tight">Highlights</h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {info.cards.map(([t, d]) => (
                <li key={t} className="rounded-3xl border border-black/10 bg-white p-6" style={{ backgroundImage: `linear-gradient(160deg, ${u.color}55, transparent 55%)` }}>
                  <b style={serif} className="block text-xl font-semibold leading-snug">{t}</b>
                  <span className="mt-2 block text-[15px] opacity-75">{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden lg:block"><div className="sticky top-28"><CountyMap highlight={u.id} className="h-auto w-full" /></div></div>
        </div>

        <div className="border-t border-black/10 bg-[#fbf9f1] py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <h2 style={serif} className="text-3xl font-semibold tracking-tight">Tours through {u.name}</h2>
            {tours.length ? (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{tours.map((t, k) => (<TourCard key={t.slug} t={t} i={k} />))}</div>
            ) : (
              <p className="mt-4 max-w-xl opacity-70">No ready-made tour stops here yet. <a href="/inquiry" className="font-semibold underline underline-offset-4">Tell us what you would like to do</a> and we will build it for you.</p>
            )}
          </div>
        </div>

        <nav aria-label="Other counties" className="mx-auto flex max-w-6xl justify-between gap-4 px-5 py-8 text-sm font-semibold md:px-8">
          <a href={`/destinations/${prev.id}`} className="underline-offset-4 hover:underline">&larr; {prev.name}</a>
          <a href="/destinations" className="underline-offset-4 hover:underline">All destinations</a>
          <a href={`/destinations/${next.id}`} className="underline-offset-4 hover:underline">{next.name} &rarr;</a>
        </nav>
      </main>
    </>
  );
}
