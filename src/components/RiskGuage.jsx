import React from 'react';

/** Convert polar coordinates to Cartesian */
const polarToCartesian = (cx, cy, r, deg) => {
  const rad = (deg - 90) * Math.PI / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

/** Generate an SVG arc path between two angles, with inner & outer radii */
const describeArc = (x, y, or, ir, sa, ea) => {
  const so = polarToCartesian(x, y, or, ea);
  const eo = polarToCartesian(x, y, or, sa);
  const si = polarToCartesian(x, y, ir, sa);
  const ei = polarToCartesian(x, y, ir, ea);
  const laf = ea - sa <= 180 ? '0' : '1';

  return [
    'M', so.x, so.y,
    'A', or, or, 0, laf, 0, eo.x, eo.y,
    'L', si.x, si.y,
    'A', ir, ir, 0, laf, 1, ei.x, ei.y,
    'Z'
  ].join(' ');
};

const RiskGuage = ({ value }) => {
  // Determine which segment to highlight based on the value
  let idx;
  if      (value <= 0.03) idx = 4;
  else if (value <= 0.06) idx = 3;
  else if (value <= 0.09) idx = 2;
  else if (value <= 0.12) idx = 1;
  else                    idx = 0;

  const segments = [
    { color: '#d94545', risk: 'Relatively high risk'    },
    { color: '#f67585', risk: 'Medium to high risk'     },
    { color: '#fde047', risk: 'Relatively medium risk'  },
    { color: '#bbf7d0', risk: 'Low to medium risk'      },
    { color: '#10b981', risk: 'Relatively low risk'     },
  ];

  // Arc dimensions & positioning
  const outerR = 40;
  const innerR = 20;
  const center = { x: 50, y: 50 };
  const startAngle = -45;
  const sliceAngle = 48;

  // Build each arc path, adding a border to the highlighted slice
  const arcs = segments.map((seg, i) => {
    const sa = startAngle + i * sliceAngle;
    const ea = sa + sliceAngle;
    return (
      <path
        key={i}
        d={describeArc(center.x, center.y, outerR, innerR, sa, ea)}
        fill={seg.color}
        fillOpacity={i === idx ? 1 : 0.15}
        stroke={seg.color}
        strokeWidth={i === idx ? 2 : 0}
        strokeLinejoin="round"
      />
    );
  });

  return (
    <div className="grid grid-rows-[1fr_auto] h-full p-2">
      {/* TOP ROW: label + donut */}
      <div className="grid grid-cols-[1fr_1.4fr] items-center h-full w-full">
        <span className="md:text-3xl text-xl font-bold text-night font-display">
          Prime + {(value * 100).toFixed(0)}%
        </span>
        <div className="flex items-center justify-end h-full">
          <svg viewBox="0 0 100 100" className="h-full w-auto max-w-full">
            {arcs}
          </svg>
        </div>
      </div>

      {/* BOTTOM ROW: risk message */}
      <div className="mt-2 text-xs text-steel font-display text-center">
        {segments[idx].risk}
      </div>
    </div>
  );
};

export default RiskGuage;
