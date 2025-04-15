import React from 'react';

/**
 * Converts polar coordinates to cartesian (x,y) values.
 * @param {number} centerX - x coordinate of the center.
 * @param {number} centerY - y coordinate of the center.
 * @param {number} radius - radius length.
 * @param {number} angleInDegrees - angle in degrees.
 * @returns {object} Object with x and y properties.
 */
const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
};

/**
 * Generates an SVG path for a donut segment given start/end angles and outer/inner radii.
 *
 * @param {number} x - Center x coordinate.
 * @param {number} y - Center y coordinate.
 * @param {number} outerRadius - Outer radius of the donut.
 * @param {number} innerRadius - Inner radius (hole) of the donut.
 * @param {number} startAngle - Starting angle in degrees.
 * @param {number} endAngle - Ending angle in degrees.
 * @returns {string} SVG path data string.
 */
const describeArc = (x, y, outerRadius, innerRadius, startAngle, endAngle) => {
  const startOuter = polarToCartesian(x, y, outerRadius, endAngle);
  const endOuter = polarToCartesian(x, y, outerRadius, startAngle);
  const startInner = polarToCartesian(x, y, innerRadius, startAngle);
  const endInner = polarToCartesian(x, y, innerRadius, endAngle);
  const largeArcFlag = (endAngle - startAngle) <= 180 ? "0" : "1";

  return [
    "M", startOuter.x, startOuter.y,
    "A", outerRadius, outerRadius, 0, largeArcFlag, 0, endOuter.x, endOuter.y,
    "L", startInner.x, startInner.y,
    "A", innerRadius, innerRadius, 0, largeArcFlag, 1, endInner.x, endInner.y,
    "Z"
  ].join(" ");
};

/**
 * RiskGuage Component.
 *
 * Props:
 * - value: number (expected between 0 and 0.19, representing 0% to 19%).
 *
 * The component displays:
 * - A label on the left: "Prime + {percentage}%".
 * - A 240° donut divided into 5 segments (each 48°). The segment
 *   corresponding to the given value shows full opacity while the others are faded.
 * - A risk state message below the donut.
 */
const RiskGuage = ({ value }) => {
  // Determine which segment to highlight based on the received value.
  // Value thresholds: 0-0.03, >0.03-0.06, >0.06-0.09, >0.09-0.12, >0.12.
  let activeIndex;
  if (value >= 0 && value <= 0.03) {
    activeIndex = 4;
  } else if (value > 0.03 && value <= 0.06) {
    activeIndex = 3;
  } else if (value > 0.06 && value <= 0.09) {
    activeIndex = 2;
  } else if (value > 0.09 && value <= 0.12) {
    activeIndex = 1;
  } else {
    activeIndex = 0;
  }

  // Define the data for each of the 5 segments: threshold range, color, and risk message.
  const segmentsData = [
    { range: [0.12, 0.19], color: "#d94545", risk: "Relatively high risk" },
    { range: [0.09, 0.12], color: "#f67585", risk: "Medium to high risk" },
    { range: [0.06, 0.09], color: "#fde047", risk: "Relatively medium risk" },
    { range: [0.03, 0.06], color: "#bbf7d0", risk: "Low to medium risk" },
    { range: [0, 0.03], color: "#10b981", risk: "Relatively low risk" },
  ];

  const riskMessage = segmentsData[activeIndex].risk;

  // Donut parameters:
  // - SVG viewBox is 100x100 with the donut centered at (50,50).
  // - Outer radius is 40 and inner radius is 20 for a thicker appearance.
  const outerRadius = 40;
  const innerRadius = 20;
  const center = { x: 50, y: 50 };

  // Donut spans 240° (each segment is 48° since 240° / 5 = 48°).
  // We set the starting angle to -150° so the arc runs from -150° to 90°,
  // leaving a 120° gap.
  const donutStart = -45;
  const segmentAngle = 48;

  // Generate the SVG path for each donut segment.
  const arcs = segmentsData.map((seg, index) => {
    const startAngle = donutStart + index * segmentAngle;
    const endAngle = startAngle + segmentAngle;
    const path = describeArc(center.x, center.y, outerRadius, innerRadius, startAngle, endAngle);
    const isActive = index === activeIndex;
    return (
      <path
        key={index}
        d={path}
        fill={seg.color}
        fillOpacity={isActive ? 1 : 0.2}
      />
    );
  });

  return (
    <div className="flex flex-col items-center p-4">
      {/* Top section with the percentage label and the donut */}
      <div className="flex items-center">
        <span className="mr-0 text-xl font-bold text-night text-center font-display">
          Prime + {(value * 100).toFixed(0)}%
        </span>
        <div>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {arcs}
          </svg>
        </div>
      </div>
      {/* Risk state message */}
      <div className="mt-0 text-xs text-steel font-display text-center">{riskMessage}</div>
    </div>
  );
};

export default RiskGuage;
