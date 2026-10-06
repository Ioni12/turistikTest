'use client';
import { useParams } from 'react-router-dom';
import PageHero from './PageHero.jsx';
import Collections from './Collections.jsx';
import { TourCard } from './FeaturedTours.jsx';
import { NotFoundPage } from './InfoPages.jsx';
import { ALL_TOURS, COLLECTION_PAGES } from './toursData.js';

/** /collection (all collections) and /collection/<slug> (tours in one collection). */
export default function CollectionPage() {
  const { slug } = useParams();
  if (!slug) {
    return (<><PageHero eyebrow="Collections" title="Our Albanian specials" text="Pick the kind of holiday you have in mind." crumbs={[['Home', '/'], ['Collections']]} /><main id="main"><Collections /></main></>);
  }
  const c = COLLECTION_PAGES[slug];
  if (!c) return <NotFoundPage />;
  const tours = ALL_TOURS.filter(c.match);
  return (
    <>
      <PageHero eyebrow="Collection" title={c.title} text={c.intro} accent={c.color} crumbs={[['Home', '/'], ['Collections', '/collection'], [c.title]]} />
      <main id="main" className="bg-[#fbf9f1] py-12 text-[#16210f] md:py-16">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="mb-6 text-sm opacity-60">{tours.length} {tours.length === 1 ? 'tour' : 'tours'}</p>
          {tours.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{tours.map((t, i) => (<TourCard key={t.slug} t={t} i={i} />))}</div> : <p className="opacity-70">Nothing here yet. <a href="/inquiry" className="font-semibold underline underline-offset-4">Ask us for a tailor-made trip.</a></p>}
          <p className="mt-10 text-sm"><a href="/tours" className="font-semibold underline underline-offset-4">See all tours</a></p>
        </div>
      </main>
    </>
  );
}
