const serif = { fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif" };

/** Round county marker with its initial. White with a dark ring normally; solid dark with a red ring when in focus. */
export default function Badge({ u, active = false }) {
  return (
    <span
      aria-hidden="true"
      style={serif}
      className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-[12px] font-bold shadow-[0_2px_8px_rgba(0,0,0,.25)] transition-colors ${
        active
          ? "border-[#D93A2B] bg-[#141414] text-white"
          : "border-[#141414] bg-white text-[#141414]"
      }`}
    >
      {u.name[0]}
    </span>
  );
}
