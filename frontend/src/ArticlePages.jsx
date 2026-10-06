'use client';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHero from './PageHero.jsx';
import { NotFoundPage } from './InfoPages.jsx';
import { ARTICLES } from './Stories.jsx';

const serif = { fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif" };

function Photo({ src, className = '' }) {
  const [bad, setBad] = useState(false);
  return <div className={`overflow-hidden bg-[linear-gradient(135deg,#BBDF86,#78B89A)] ${className}`}>{!bad && <img src={src} alt="" loading="lazy" onError={() => setBad(true)} className="h-full w-full object-cover" />}</div>;
}

/** /article: list of guides. Only the three articles from Stories.jsx are listed: add the rest to ARTICLES there. */
export function ArticlesPage() {
  return (
    <>
      <PageHero eyebrow="Guides and stories" title="Local advice, before you go" text="Practical guides from the people who live here." crumbs={[['Home', '/'], ['Articles']]} />
      <main id="main" className="bg-[#fbf9f1] py-12 text-[#16210f] md:py-16">
        <ul className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-3 md:px-8">
          {ARTICLES.map((a) => (
            <li key={a.slug}><a href={`/article/${a.slug}`} className="group block">
              <Photo src={a.image} className="aspect-[4/3] rounded-3xl" />
              <p className="mt-4 text-xs uppercase tracking-widest opacity-55">Travel guide &middot; {a.read}</p>
              <h2 style={serif} className="mt-2 text-xl font-semibold leading-snug group-hover:underline">{a.title}</h2>
              <p className="mt-2 text-sm opacity-65">{a.text}</p>
            </a></li>
          ))}
        </ul>
      </main>
    </>
  );
}

/** /article/<slug>: article template. The article text itself still has to be added (see the note on the page). */
export function ArticlePage() {
  const { slug } = useParams();
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) return <NotFoundPage />;
  return (
    <>
      <PageHero eyebrow={`Travel guide \u00b7 ${a.read}`} title={a.title} text={a.text} crumbs={[['Home', '/'], ['Articles', '/article'], ['Guide']]} />
      <main id="main" className="bg-[#fbf9f1] pb-16 text-[#16210f]">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <Photo src={a.image} className="-mt-8 aspect-[16/9] rounded-[28px] shadow-2xl md:-mt-12" />
          <div className="mt-10 rounded-3xl border border-dashed border-black/25 p-6 text-[15px]">
            <b style={serif} className="text-lg">The full article is being moved over</b>
            <p className="mt-2 opacity-70">Until its text is added to this page, you can read it on our current site.</p>
            <a href={`https://wonderalbania.com/article/${a.slug}`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block rounded-full bg-[#16210f] px-5 py-2.5 text-sm font-semibold text-white">Read the article</a>
          </div>
          <div className="mt-10 flex flex-wrap gap-3"><a href="/tours" className="rounded-full bg-[#BBDF86] px-6 py-3 font-semibold">Explore tours</a><a href="/inquiry" className="rounded-full border border-black/30 px-6 py-3 font-semibold">Plan my trip</a></div>
        </div>
      </main>
    </>
  );
}
