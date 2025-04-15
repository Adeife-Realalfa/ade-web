import React from 'react';

const TiltedRects = ({ value, containerClassName = "w-full h-24" }) => {
  // Clamp value to be within 0 and 10.
  const clampedValue = Math.max(0, Math.min(10, value));

  // Calculate the percentage for display.
  const percentage = Math.round((clampedValue / 10) * 100);

  // Determine fill and border color based on percentage thresholds.
  let fillColor;
  let borderColor;
  if (percentage <= 35) {
    fillColor = 'bg-blush';
    borderColor = 'border-blush';
  } else if (percentage <= 69) {
    fillColor = 'bg-sun';
    borderColor = 'border-sun';
  } else {
    fillColor = 'bg-forest';
    borderColor = 'border-forest';
  }

  // Calculate how many of the 20 rectangles should be "filled".
  const filledCount = Math.round(clampedValue * 2);

  return (
    <div className={`flex items-center space-x-4 p-2 ${containerClassName}`}>
      {/* Responsive rectangle container */}
      <div className={`flex flex-1 w-full h-full border-2 ${borderColor} rounded-lg p-4`}>
        {Array.from({ length: 20 }).map((_, idx) => {
          const isFilled = idx < filledCount;
          return (
            <div
              key={idx}
              className={`flex-1 mx-0.5 h-full rounded ${
                isFilled ? fillColor : 'bg-silver opacity-30'
              }`}
              style={{ transform: 'skewX(-30deg)' }}
            />
          );
        })}
      </div>
      {/* Display the percentage */}
      <div className="ml-2 text-xl text-right text-night font-display font-bold">{percentage}%</div>
    </div>
  );
};

export default TiltedRects;
