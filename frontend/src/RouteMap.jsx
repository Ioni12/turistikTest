"use client";
import { useMemo } from "react";
import { UNITS } from "./albaniaData";

// Flat map of Albania (the same county shapes as the 3D map) with the tour route drawn on top.
const LON0 = 19.2,
  LAT1 = 42.75,
  KX = 83.8,
  KZ = 111;
const px = (lon) => (lon - LON0) * KX;
const py = (lat) => (LAT1 - lat) * KZ;
const W = 1.95 * KX,
  H = 3.2 * KZ;
const inPoly = (lon, lat, P) => {
  let c = false;
  for (let i = 0, j = P.length - 1; i < P.length; j = i++) {
    const a = P[i],
      b = P[j];
    if (
      a[1] > lat !== b[1] > lat &&
      lon < ((b[0] - a[0]) * (lat - a[1])) / (b[1] - a[1]) + a[0]
    )
      c = !c;
  }
  return c;
};

/**
 * route: [{ name, lon, lat, day?, label? }] in travel order. Entries with `day` get a numbered marker.
 * activeDay: the route line is drawn up to this day and its marker is highlighted.
 */
export default function RouteMap({ route, activeDay = 0, className = "" }) {
  const { d, pts, cum, total, visited } = useMemo(() => {
    const pts = route.map((r) => ({ ...r, x: px(r.lon), y: py(r.lat) }));
    const cum = [0];
    for (let i = 1; i < pts.length; i++)
      cum.push(
        cum[i - 1] +
          Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y),
      );
    const visited = new Set(
      UNITS.filter((u) => route.some((r) => inPoly(r.lon, r.lat, u.poly))).map(
        (u) => u.id,
      ),
    );
    return {
      d: "M" + pts.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join("L"),
      pts,
      cum,
      total: cum[cum.length - 1],
      visited,
    };
  }, [route]);

  const idx = pts.findIndex((p) => p.day === activeDay);
  const frac = idx >= 0 ? cum[idx] / total : 0;

  return (
    <svg
      viewBox={`-6 -6 ${W + 12} ${H + 12}`}
      role="img"
      aria-label="Map of the tour route across Albania"
      className={className}
    >
      {UNITS.map((u) => (
        <path
          key={u.id}
          d={
            "M" +
            u.poly
              .map((p) => `${px(p[0]).toFixed(1)} ${py(p[1]).toFixed(1)}`)
              .join("L") +
            "Z"
          }
          fill={visited.has(u.id) ? "#D3CAB5" : "#EFEBE2"}
          stroke="#fff"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      ))}
      <path
        d={d}
        fill="none"
        stroke="#141414"
        strokeOpacity=".25"
        strokeWidth="1.6"
        strokeDasharray="3 4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={d}
        pathLength="1"
        fill="none"
        stroke="#141414"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1 1"
        strokeDashoffset={1 - frac}
        style={{
          transition: "stroke-dashoffset 900ms cubic-bezier(.3,.7,.2,1)",
        }}
      />

      {pts.map(
        (p, i) =>
          !p.day && (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="2"
              fill="#fff"
              stroke="#141414"
              strokeWidth="1"
            />
          ),
      )}
      {pts.map((p, i) => {
        if (!p.day) return null;
        const act = p.day === activeDay,
          done = p.day < activeDay;
        return (
          <g
            key={i}
            style={{ transition: "opacity 300ms" }}
            opacity={p.day <= activeDay ? 1 : 0.55}
          >
            {act && (
              <circle
                cx={p.x}
                cy={p.y}
                r="11"
                fill="#D93A2B"
                fillOpacity=".6"
                className="animate-ping"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              />
            )}
            <circle
              cx={p.x}
              cy={p.y}
              r={act ? 8 : 6}
              fill={act ? "#D93A2B" : done ? "#141414" : "#fff"}
              stroke="#141414"
              strokeWidth="1.6"
              style={{ transition: "r 300ms" }}
            />
            <text
              x={p.x}
              y={p.y + 2.6}
              textAnchor="middle"
              fontSize="7"
              fontWeight="700"
              fill={done ? "#fff" : "#141414"}
              fontFamily="system-ui, sans-serif"
            >
              {p.day}
            </text>
            {act && (
              <text
                x={p.x + 12}
                y={p.y + 3}
                fontSize="9"
                fontWeight="700"
                fill="#141414"
                stroke="#fff"
                strokeWidth="3"
                paintOrder="stroke"
                fontFamily="Georgia, serif"
              >
                {p.label || p.name}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
