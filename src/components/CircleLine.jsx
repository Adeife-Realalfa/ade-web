import React from 'react';

const ScoreIndicator = ({ value }) => {
  // Clamp the incoming value between 0 and 10.
  const clampedValue = Math.max(0, Math.min(10, value));
  // Convert the value to a percentage.
  const percentage = Math.round((clampedValue / 10) * 100);

  // Determine which Tailwind CSS background color class to use
  // based on the calculated percentage:
  // - 0% to 35%: use "bg-blush"
  // - 36% to 69%: use "bg-sun"
  // - Above 69%: use "bg-forest"
  const fillColorClass =
    percentage <= 35 ? 'bg-blush' : percentage <= 69 ? 'bg-sun' : 'bg-forest';

  // The integer portion of the value determines how many circles are filled.
  const filledCirclesCount = Math.floor(clampedValue);

  // Create an array for 10 circles.
  const circles = Array.from({ length: 10 }, (_, index) => {
    // Apply the fill color if the circle index is within the filled count;
    // otherwise, use a gray color with reduced opacity.
    const circleClasses =
      index < filledCirclesCount
        ? `${fillColorClass} opacity-100`
        : 'bg-silver opacity-50';

    return (
      <div
        key={index}
        // Here, the Tailwind classes ensure the circles:
        // - Grow equally in a flex container (flex-1),
        // - Have margin for spacing (m-1),
        // - Are rounded (rounded-full) to make a circle,
        // - And transition color changes (transition-colors).
        className={`flex-1 m-0.5 rounded-full transition-colors ${circleClasses}`}
        // The inline style maintains a 1:1 aspect ratio for each circle.
        style={{ aspectRatio: '1' }}
      ></div>
    );
  });

  return (
    <div className="flex items-center">
      {/* The circles container grows to fill available space */}
      <div className="flex flex-1">{circles}</div>
      {/* Percentage indicator on the right */}
      <div className="ml-2 text-xl text-right text-night font-display font-bold">{percentage}%</div>
    </div>
  );
};

export default ScoreIndicator;
