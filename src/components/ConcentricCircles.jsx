import React, { useLayoutEffect, useRef, useState } from 'react';

const ConcentricCircles = ({ value }) => {
  // Ref to the element that defines our max available width/height
  const containerRef = useRef(null);
  // The size (in px) we'll use for our square drawing area
  const [size, setSize] = useState(0);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      const { width, height } = containerRef.current.getBoundingClientRect();
      // pick the smaller so we never overflow
      setSize(Math.min(width, height));
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(containerRef.current);
    window.addEventListener('resize', updateSize);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  // ——— value → percentage & color logic ———
  const safeValue = Math.min(Math.max(value, 0), 10);
  const percentage = Math.round((safeValue / 10) * 100);

  let fillColor;
  if (percentage <= 35) fillColor = 'bg-blush';
  else if (percentage <= 69) fillColor = 'bg-sun';
  else fillColor = 'bg-forest';

  // ——— concentric rings definition & circle positions ———
  const rings = [
    { count: 1, radiusPercent: 0 },
    { count: 6, radiusPercent: 15 },
    { count: 12, radiusPercent: 25 },
    { count: 18, radiusPercent: 35 },
    { count: 24, radiusPercent: 45 },
  ];

  // Build an array of { x, y } coords in % of the container
  const circles = rings.flatMap((ring) =>
    Array.from({ length: ring.count }, (_, i) => {
      let x = 50, y = 50;
      if (ring.radiusPercent > 0) {
        const angle = (2 * Math.PI / ring.count) * i;
        x = 50 + ring.radiusPercent * Math.cos(angle);
        y = 50 + ring.radiusPercent * Math.sin(angle);
      }
      return { x, y };
    })
  );

  const totalCircles = circles.length;
  const filledCount = Math.round(totalCircles * (percentage / 100));
  const circleDiameterPercent = 8; // size of each small dot

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center w-full h-full"
    >
      {/* Percentage text (scales with size) */}
      <div
        className="mr-4 font-display text-night"
        style={{ fontSize: `${size * 0.3}px` }}
      >
        {percentage}%
      </div>

      {/* The square in which we draw our circles */}
      <div
        className="relative"
        style={{ width: size, height: size }}
      >
        {circles.map(({ x, y }, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${
              i < filledCount ? fillColor : 'bg-silver opacity-30'
            }`}
            style={{
              left:  `${x}%`,
              top:   `${y}%`,
              width:  `${circleDiameterPercent}%`,
              height: `${circleDiameterPercent}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ConcentricCircles;
