// src/components/RectRows.jsx
import React from 'react';

const RectRows = ({ value }) => {
  // Clamp the value between 0 and 10.
  const clampedValue = Math.max(0, Math.min(value, 10));
  // Determine the count of completely filled cells.
  const filledCount = Math.floor(clampedValue);
  // Calculate the percentage.
  const percentage = (clampedValue / 10) * 100;

  // Determine fill color based on the percentage.
  let fillColor;
  if (percentage <= 35) {
    fillColor = 'bg-blush';
  } else if (percentage <= 69) {
    fillColor = 'bg-sun';
  } else {
    fillColor = 'bg-leaf';
  }

  // Build a cells array for our 10 rectangles.
  const cells = [];
  for (let i = 0; i < 10; i++) {
    // Top‑row indices 0–4 map to fillOrder 5–9; bottom‑row 5–9 map to 0–4.
    const fillOrder = i < 5 ? 5 + i : i - 5;
    cells.push({ id: i, isFilled: fillOrder < filledCount });
  }

  return (
    // Use flex-1 instead of h-full to avoid the “100% of nothing” stretch
    <div className="flex flex-1 w-full min-h-0">
      <div className="flex-1 grid grid-cols-5 grid-rows-2 gap-1 min-h-0">
        {cells.map(cell => (
          <div
            key={cell.id}
            className={`w-full h-full rounded ${
              cell.isFilled ? fillColor : 'bg-whisper opacity-50'
            }`}
          />
        ))}
      </div>

      <div className="ml-4 self-center text-xl text-right text-alabaster font-display font-bold">
        {percentage.toFixed(0)}%
      </div>
    </div>
  );
};

export default RectRows;
