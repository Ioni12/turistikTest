// Placeholder badge above a region label: coloured circle with the region's initial.
// Swap the inner span for an <img> later when photos are ready.
export default function Badge({ u, active }) {
  const size = active ? 48 : 34;
  return (
    <span
      className="mb-1 flex items-center justify-center rounded-full border-2 border-white text-sm font-semibold not-italic shadow-lg transition-all duration-300"
      style={{ width: size, height: size, background: u.color }}
    >
      {u.name[0]}
    </span>
  );
}
