const serif = { fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif" };

/** Dark title band used at the top of every inner page (the floating Header sits over it). */
export default function PageHero({
  eyebrow,
  title,
  text,
  crumbs = [],
  accent = "#D93A2B",
  children,
}) {
  return (
    <section className="bg-[#FAF8F4] border-b border-black/10 pb-12 pt-32 text-[#141414] md:pb-16 md:pt-40">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {crumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mb-5 text-sm text-[#141414]/60"
          >
            {crumbs.map(([label, href], i) => (
              <span key={label}>
                {i > 0 && " / "}
                {href ? (
                  <a href={href} className="hover:text-[#141414]">
                    {label}
                  </a>
                ) : (
                  <span className="text-[#141414]/90">{label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[.25em]"
            style={{ color: accent }}
          >
            {eyebrow}
          </p>
        )}
        <h1
          style={serif}
          className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl"
        >
          {title}
        </h1>
        {text && (
          <p className="mt-5 max-w-2xl text-base text-[#141414]/75 md:text-lg">
            {text}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
