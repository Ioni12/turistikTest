"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHero from "./PageHero.jsx";
import CountyMap from "./CountyMap.jsx";
import { UNITS, INFO } from "./albaniaData";
import { ALL_TOURS } from "./toursData.js";

const serif = { fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif" };

/** /destinations: the 12 counties, with a map that highlights the one you point at. */
export default function DestinationsPage() {
  const [hover, setHover] = useState(null);
  const navigate = useNavigate();
  return (
    <>
      <PageHero
        eyebrow="Destinations"
        title="Twelve counties, one small country"
        text="From the Albanian Alps in the north to the Ionian coast in the south. Pick a county to see what it has to offer."
        crumbs={[["Home", "/"], ["Destinations"]]}
      />
      <main id="main" className="bg-[#F3F0E9] py-12 text-[#141414] md:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:px-8 lg:grid-cols-[300px_1fr]">
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <CountyMap
                hovered={hover}
                onHover={setHover}
                onSelect={(id) => navigate(`/destinations/${id}`)}
                className="h-auto w-full"
              />
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {UNITS.map((u, i) => {
              const n = ALL_TOURS.filter((t) =>
                t.counties.includes(u.id),
              ).length;
              return (
                <li key={u.id}>
                  <a
                    href={`/destinations/${u.id}`}
                    onMouseEnter={() => setHover(u.id)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(u.id)}
                    onBlur={() => setHover(null)}
                    className={`group block h-full rounded-3xl border bg-white p-6 transition ${hover === u.id ? "border-[#141414]/40 shadow-lg" : "border-black/10"}`}
                  >
                    <span
                      className="block h-1.5 w-14 rounded-full"
                      style={{ background: u.tone }}
                    />
                    <span className="mt-4 block text-xs tracking-widest opacity-70">
                      {String(i + 1).padStart(2, "0")} / {UNITS.length}
                    </span>
                    <b
                      style={serif}
                      className="mt-1 block text-2xl font-semibold"
                    >
                      {u.name}
                    </b>
                    <span className="mt-2 block text-sm opacity-70">
                      {INFO[u.id]?.tag}
                    </span>
                    <span className="mt-4 flex items-center justify-between text-xs">
                      <span className="opacity-70">Main town: {u.main}</span>
                      <span className="font-semibold text-[#D93A2B]">
                        {n} {n === 1 ? "tour" : "tours"}
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </>
  );
}
