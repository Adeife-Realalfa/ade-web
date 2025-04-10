import React, { useEffect, useRef, useState } from 'react';

const ConcentricCricles = ({ value }) => {
  // Reference to the outer flex container; we will measure its parent’s height.
  const containerRef = useRef(null);
  // State for the size (both height and width, since we need a square)
  const [containerSize, setContainerSize] = useState(200); // default fallback size

  useEffect(() => {
    // Function to update size by measuring parent's height
    const updateSize = () => {
      if (containerRef.current && containerRef.current.parentElement) {
        // Get parent's height (in pixels)
        const parentHeight = containerRef.current.parentElement.offsetHeight;
        // Use parent's height if it is available, otherwise use the fallback size
        setContainerSize(parentHeight > 0 ? parentHeight : 200);
      }
    };

    updateSize();

    // Set up ResizeObserver on the parent element so that changes in height update the component.
    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    if (containerRef.current && containerRef.current.parentElement) {
      resizeObserver.observe(containerRef.current.parentElement);
    }

    // Listen to window resize as a backup.
    window.addEventListener('resize', updateSize);

    // Clean up on unmount.
    return () => {
      if (containerRef.current && containerRef.current.parentElement) {
        resizeObserver.unobserve(containerRef.current.parentElement);
      }
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  // Clamp the input value between 0 and 10 and compute a percentage.
  const safeValue = Math.min(Math.max(value, 0), 10);
  const percentage = Math.round((safeValue / 10) * 100);

  // Determine fill color based on percentage thresholds.
  let fillColor = '';
  if (percentage <= 35) {
    fillColor = 'bg-blush';
  } else if (percentage <= 69) {
    fillColor = 'bg-sun';
  } else {
    fillColor = 'bg-forest';
  }

  // Define our rings (5 concentric rings) with how many circles and the radius (as a percentage of the container).
  const rings = [
    { count: 1, radiusPercent: 0 },  // central circle
    { count: 6, radiusPercent: 15 },
    { count: 12, radiusPercent: 25 },
    { count: 18, radiusPercent: 35 },
    { count: 24, radiusPercent: 45 },
  ];

  // Calculate circle coordinates in percentages (relative to a square container).
  let circles = [];
  rings.forEach((ring) => {
    for (let i = 0; i < ring.count; i++) {
      let x = 50;
      let y = 50;
      if (ring.radiusPercent > 0) {
        const angle = (2 * Math.PI / ring.count) * i;
        x = 50 + ring.radiusPercent * Math.cos(angle);
        y = 50 + ring.radiusPercent * Math.sin(angle);
      }
      circles.push({ x, y });
    }
  });

  // Determine the number of circles to fill (from the center outward)
  const totalCircles = circles.length;
  const filledCount = Math.round(totalCircles * (percentage / 100));

  // Size of each small circle as a percentage of the container size.
  const circleDiameterPercent = 8; // Adjust as needed for your design

  return (
    <div className="flex items-center" ref={containerRef}>
      {/* Left side: Percentage text */}
      <div className="mr-4 font-display text-night"  style={{ fontSize: `${containerSize * 0.3}px`}}>
        {percentage}%
      </div>
      {/* Right side: Container whose size is set by the parent's height */}
      <div
        className="relative"
        style={{
          height: containerSize,
          width: containerSize,
        }}
      >
        {circles.map((circle, index) => (
          <div
            key={index}
            className={`absolute rounded-full ${
              index < filledCount ? fillColor : 'bg-silver opacity-50'
            }`}
            style={{
              left: `${circle.x}%`,
              top: `${circle.y}%`,
              width: `${circleDiameterPercent}%`,
              height: `${circleDiameterPercent}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ConcentricCricles;
