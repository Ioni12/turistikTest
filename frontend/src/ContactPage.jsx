"use client";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHero from "./PageHero.jsx";
import { UNITS } from "./albaniaData";
import { ALL_TOURS } from "./toursData.js";

const serif = { fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif" };
const PHONE = "+355 69 229 0036",
  PHONE_HREF = "tel:+355692290036";

/* ===== EDIT HERE =====
   Connect the form: set ENDPOINT to the address that should receive the enquiry (your backend, a form service, an
   email function). It gets a JSON POST with the fields below. While it is null the form only logs to the console and
   still shows the thank-you screen, so you can test the design. */
const ENDPOINT = null;
/* ===== end of editable data ===== */

const field =
  "mt-1.5 w-full rounded-xl border border-black/20 bg-white px-3.5 py-3 text-[15px] font-normal outline-none transition focus:border-[#D93A2B] focus:ring-2 focus:ring-[#D93A2B]/30";
const label = "block text-sm font-semibold";

/** /inquiry and /contact: the enquiry form. `business` switches the wording for partner enquiries. */
export default function ContactPage({ business = false }) {
  const [params] = useSearchParams();
  const [f, setF] = useState({
    name: "",
    email: "",
    phone: "",
    trip: params.get("tour") || "",
    people: params.get("people") || "2",
    dates: params.get("date") || "",
    counties: [],
    message: "",
    consent: false,
    website: "",
  });
  const [err, setErr] = useState({});
  const [state, setState] = useState("idle"); // idle | sending | done | failed
  const set = (k) => (e) =>
    setF({
      ...f,
      [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  const toggle = (id) =>
    setF({
      ...f,
      counties: f.counties.includes(id)
        ? f.counties.filter((x) => x !== id)
        : [...f.counties, id],
    });

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!f.name.trim()) er.name = "Please tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(f.email))
      er.email = "Please enter a valid email address.";
    if (!f.consent) er.consent = "Please agree so we can reply to you.";
    setErr(er);
    if (Object.keys(er).length || f.website) return; // `website` is a hidden spam trap
    setState("sending");
    try {
      const body = {
        ...f,
        type: business ? "business" : "trip",
        page: window.location.href,
      };
      delete body.website;
      delete body.consent;
      if (ENDPOINT) {
        const r = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!r.ok) throw new Error("bad response");
      } else console.info("Enquiry (form not connected yet):", body);
      setState("done");
    } catch {
      setState("failed");
    }
  };

  const title = business ? "Partner with us" : "Let\u2019s plan your trip";
  const tour = ALL_TOURS.find((t) => t.slug === f.trip);

  return (
    <>
      <PageHero
        eyebrow={business ? "Partners and business" : "Enquire"}
        title={title}
        text={
          business
            ? "Travel agents, affiliates and businesses: tell us about yourself and what you have in mind."
            : "Tell us what you have in mind and our local team will shape a trip around it, private or shared."
        }
        crumbs={[["Home", "/"], [business ? "Partners" : "Enquire"]]}
      />
      <main id="main" className="bg-[#F3F0E9] py-12 text-[#141414] md:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:px-8 lg:grid-cols-[1.5fr_1fr]">
          {state === "done" ? (
            <div className="rounded-[28px] bg-white p-8 md:p-10" role="status">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#141414] text-2xl text-white">
                &#10003;
              </span>
              <h2 style={serif} className="mt-5 text-3xl font-semibold">
                Thank you, {f.name.split(" ")[0]}.
              </h2>
              <p className="mt-3 max-w-md opacity-75">
                We have your message{tour ? ` about ${tour.title}` : ""}. A
                member of our local team will reply to {f.email}.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/tours"
                  className="rounded-full bg-[#141414] px-6 py-3 font-semibold text-white"
                >
                  Browse tours
                </a>
                <a
                  href="/"
                  className="rounded-full border border-black/30 px-6 py-3 font-semibold"
                >
                  Back to the homepage
                </a>
              </div>
            </div>
          ) : (
            <form
              onSubmit={submit}
              noValidate
              className="grid gap-5 rounded-[28px] bg-white p-6 md:p-10"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className={label}>
                  Your name
                  <input
                    value={f.name}
                    onChange={set("name")}
                    autoComplete="name"
                    aria-invalid={!!err.name}
                    className={field}
                  />
                  {err.name && (
                    <span
                      role="alert"
                      className="mt-1 block text-sm font-normal text-[#D93A2B]"
                    >
                      {err.name}
                    </span>
                  )}
                </label>
                <label className={label}>
                  Email
                  <input
                    type="email"
                    value={f.email}
                    onChange={set("email")}
                    autoComplete="email"
                    aria-invalid={!!err.email}
                    className={field}
                  />
                  {err.email && (
                    <span
                      role="alert"
                      className="mt-1 block text-sm font-normal text-[#D93A2B]"
                    >
                      {err.email}
                    </span>
                  )}
                </label>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className={label}>
                  Phone or WhatsApp{" "}
                  <span className="font-normal opacity-70">(optional)</span>
                  <input
                    type="tel"
                    value={f.phone}
                    onChange={set("phone")}
                    autoComplete="tel"
                    className={field}
                  />
                </label>
                {!business && (
                  <label className={label}>
                    Number of travellers
                    <input
                      type="number"
                      min="1"
                      max="40"
                      value={f.people}
                      onChange={set("people")}
                      className={field}
                    />
                  </label>
                )}
              </div>
              {!business && (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className={label}>
                      Which trip interests you?
                      <select
                        value={f.trip}
                        onChange={set("trip")}
                        className={field}
                      >
                        <option value="">Not sure yet, tailor-made</option>
                        {ALL_TOURS.map((t) => (
                          <option key={t.slug} value={t.slug}>
                            {t.title}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className={label}>
                      When are you thinking of travelling?
                      <input
                        value={f.dates}
                        onChange={set("dates")}
                        placeholder="For example June, or 12 to 22 September"
                        className={field}
                      />
                    </label>
                  </div>
                  <fieldset>
                    <legend className={label}>
                      Places you would like to see{" "}
                      <span className="font-normal opacity-70">(optional)</span>
                    </legend>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {UNITS.map((u) => (
                        <button
                          key={u.id}
                          type="button"
                          aria-pressed={f.counties.includes(u.id)}
                          onClick={() => toggle(u.id)}
                          className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition ${f.counties.includes(u.id) ? "border-transparent bg-[#141414] text-white" : "border-black/15 hover:border-black/40"}`}
                        >
                          <i
                            className="h-2 w-2 rounded-full"
                            style={{ background: u.tone }}
                          />
                          {u.name}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </>
              )}
              <label className={label}>
                {business
                  ? "Tell us about your business"
                  : "Anything else we should know?"}
                <textarea
                  rows={5}
                  value={f.message}
                  onChange={set("message")}
                  className={field}
                />
              </label>
              <div className="hidden" aria-hidden="true">
                <label>
                  Website
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    value={f.website}
                    onChange={set("website")}
                  />
                </label>
              </div>
              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={f.consent}
                  onChange={set("consent")}
                  className="mt-1 h-4 w-4 accent-[#D93A2B]"
                />
                <span>
                  I agree that Wonder Albania may use these details to reply to
                  my enquiry.{" "}
                  <a
                    href="/privacy-policy"
                    className="font-semibold underline underline-offset-4"
                  >
                    Privacy policy
                  </a>
                </span>
              </label>
              {err.consent && (
                <span role="alert" className="-mt-3 text-sm text-[#D93A2B]">
                  {err.consent}
                </span>
              )}
              {state === "failed" && (
                <p
                  role="alert"
                  className="rounded-xl bg-[#D93A2B]/10 p-3 text-sm text-[#A82A1F]"
                >
                  Sorry, that did not send. Please try again, or call us on{" "}
                  {PHONE}.
                </p>
              )}
              <button
                type="submit"
                disabled={state === "sending"}
                className="rounded-full bg-[#141414] px-8 py-4 font-semibold text-white transition hover:bg-[#D93A2B] disabled:opacity-60 sm:justify-self-start"
              >
                {state === "sending" ? "Sending..." : "Send enquiry"}
              </button>
            </form>
          )}

          <aside className="grid content-start gap-4">
            <div className="rounded-[28px] bg-[#ECE7DC] p-6 text-[#141414] md:p-8">
              <h2 style={serif} className="text-2xl font-semibold">
                Prefer to talk?
              </h2>
              <a
                href={PHONE_HREF}
                className="mt-3 block text-xl font-semibold text-[#D93A2B]"
              >
                {PHONE}
              </a>
              <p className="mt-2 text-sm text-[#141414]/65">
                A real person from our local team, before and during your trip.
              </p>
            </div>
            <ul className="rounded-[28px] border border-black/10 bg-white p-6 text-sm md:p-8">
              {[
                "Clear cancellation terms",
                "Happiness guarantee",
                "Local and registered",
                "Tourism professionals",
              ].map((t) => (
                <li key={t} className="flex gap-2.5 py-1.5">
                  <span className="text-[#D93A2B]">&#10003;</span>
                  {t}
                </li>
              ))}
              <li className="pt-3">
                <a
                  href="/faq"
                  className="font-semibold underline underline-offset-4"
                >
                  Read the FAQ
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </main>
    </>
  );
}
