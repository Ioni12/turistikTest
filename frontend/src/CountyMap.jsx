import { UNITS } from "./albaniaData";

// Flat, clickable map of the counties (same shapes as the 3D map).
const LON0 = 19.2,
  LAT1 = 42.75,
  KX = 83.8,
  KZ = 111;
const px = (lon) => (lon - LON0) * KX;
const py = (lat) => (LAT1 - lat) * KZ;
const W = 1.95 * KX,
  H = 3.2 * KZ;

/** highlight: county id to emphasise (the others fade). onHover(id|null) and onSelect(id) make it interactive. */
export default function CountyMap({
  highlight = null,
  hovered = null,
  onHover,
  onSelect,
  className = "",
}) {
  return (
    <svg
      viewBox={`-4 -4 ${W + 8} ${H + 8}`}
      role="img"
      aria-label="Map of Albania's counties"
      className={className}
    >
      {UNITS.map((u) => {
        const on = highlight ? u.id === highlight : true;
        const hot = hovered === u.id;
        return (
          <path
            key={u.id}
            d={
              "M" +
              u.poly
                .map((p) => `${px(p[0]).toFixed(1)} ${py(p[1]).toFixed(1)}`)
                .join("L") +
              "Z"
            }
            fill={highlight === u.id || hot ? "#D93A2B" : u.tone}
            fillOpacity={hot ? 1 : on ? 1 : 0.5}
            stroke="#fff"
            strokeWidth="1.6"
            strokeLinejoin="round"
            tabIndex={onSelect ? 0 : undefined}
            role={onSelect ? "link" : undefined}
            aria-label={onSelect ? u.name : undefined}
            style={{
              cursor: onSelect ? "pointer" : "default",
              transition: "fill-opacity 200ms, transform 200ms",
              transformBox: "fill-box",
              transformOrigin: "center",
              transform: hot ? "scale(1.03)" : "none",
            }}
            onMouseEnter={() => onHover?.(u.id)}
            onMouseLeave={() => onHover?.(null)}
            onFocus={() => onHover?.(u.id)}
            onBlur={() => onHover?.(null)}
            onClick={() => onSelect?.(u.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSelect?.(u.id);
            }}
          />
        );
      })}
    </svg>
  );
}
