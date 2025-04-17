// src/components/StaticBars.jsx
import React from 'react';

const StaticBars = ({ value }) => {
  // Clamp the incoming value to [0, 10]
  const clampedValue = Math.max(0, Math.min(10, value));
  // Calculate overall percentage (e.g., 3 becomes 30%)
  const percentage = clampedValue * 10;

  // Define the bar heights as percentages of the graphic container's height.
  // The left-most bar is the shortest and the right-most the tallest.
  const barHeights = [40, 50, 60, 70, 80];
  // Total “area” is the sum of these percentages.
  const totalArea = barHeights.reduce((sum, h) => sum + h, 0);
  // Calculate the fill area that needs to be filled based on the value.
  const fillAreaNeeded = (clampedValue / 10) * totalArea;

  // Determine the number of fully filled bars (rounding down—no partial fills)
  let remainingFill = fillAreaNeeded;
  let fullBars = 0;
  for (const h of barHeights) {
    if (remainingFill >= h) {
      fullBars++;
      remainingFill -= h;
    } else {
      break;
    }
  }

  // Choose fill color based on the overall percentage:
  // 0–35%: red, 36–69%: yellow, 70–100%: green.
  let fillColor = '';
  if (percentage <= 35) {
    fillColor = 'bg-blush';
  } else if (percentage <= 69) {
    fillColor = 'bg-sun';
  } else {
    fillColor = 'bg-leaf';
  }

  return (
    <div className="flex flex-col h-full w-full">
      {/* Percentage display */}
      <span className="text-xl text-alabaster font-display font-bold">{percentage}%</span>
      {/* Graphic container now fills whatever height GlassCard gives it */}
      <div className="flex-1 w-full flex items-end space-x-8">
        {barHeights.map((height, index) => (
          <div
            key={index}
            className="relative flex-1"
            style={{ height: `${height}%` }}
          >
            {/* Background rectangle (pill) with low opacity */}
            <div className="absolute inset-0 bg-whisper rounded-2xl opacity-50" />
            {/* Render filled rectangle if this bar is completely filled */}
            {index < fullBars && (
              <div className={`absolute inset-0 rounded-2xl ${fillColor}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaticBars;
