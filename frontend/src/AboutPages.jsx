'use client';
import { useState } from 'react';
import PageHero from './PageHero.jsx';
import Team from './Team.jsx';
import TrustStrip from './TrustStrip.jsx';
import ClosingCTA from './ClosingCTA.jsx';

const serif = { fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif" };

/* ===== EDIT HERE =====
   TEAM: add one entry per person (name, role, photo, a short bio). Only Alfred's photo exists on the live site;
   his role and bio are left blank for you to fill in. */
const TEAM = [
  { name: 'Alfred', role: '', photo: 'https://wonderalbania.com/about/alfred-founder.jpg', bio: '' },
];
/* ===== end of editable data ===== */

/** /about */
export function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About us" title="Local guides, passionate tripmakers" text="Wonder Albania is a registered Albanian tour operator. Every trip is planned and led by people who live here." crumbs={[['Home', '/'], ['About']]} />
      <main id="main"><Team /><TrustStrip /><ClosingCTA /></main>
    </>
  );
}

function Person({ p }) {
  const [bad, setBad] = useState(false);
  return (
    <li className="rounded-3xl border border-black/10 bg-white p-6">
      <div className="mb-4 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-[#BBDF86] text-3xl font-bold">{bad || !p.photo ? p.name[0] : <img src={p.photo} alt={p.name} onError={() => setBad(true)} className="h-full w-full object-cover" />}</div>
      <b style={serif} className="block text-xl font-semibold">{p.name}</b>
      {p.role && <span className="text-sm text-[#4f7d12]">{p.role}</span>}
      {p.bio && <p className="mt-2 text-sm opacity-70">{p.bio}</p>}
    </li>
  );
}

/** /about/our-team */
export function TeamPage() {
  return (
    <>
      <PageHero eyebrow="Our team" title="The people behind your trip" text="A real person, before and during your trip." crumbs={[['Home', '/'], ['About', '/about'], ['Our team']]} />
      <main id="main" className="bg-[#f6f3e8] py-12 text-[#16210f] md:py-16">
        <ul className="mx-auto grid max-w-6xl gap-5 px-5 sm:grid-cols-2 md:px-8 lg:grid-cols-4">{TEAM.map((p) => (<Person key={p.name} p={p} />))}</ul>
      </main>
    </>
  );
}
