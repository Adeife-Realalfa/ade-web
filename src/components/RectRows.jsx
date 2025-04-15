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
    fillColor = "bg-blush";
  } else if (percentage <= 69) {
    fillColor = "bg-sun";
  } else {
    fillColor = "bg-forest";
  }

  // Build a cells array for our 10 rectangles.
  // We have a 5x2 grid; however, note that
  // DOM order will list the top row (row 0) first then the bottom (row 1).
  // We want to fill the cells from bottom left to top right.
  // For each cell:
  //    - Cells in the top row (DOM indices 0-4): fillOrder = 5 + col
  //    - Cells in the bottom row (DOM indices 5-9): fillOrder = col
  // Cells with a fillOrder lower than filledCount will be colored.
  const cells = [];
  for (let i = 0; i < 10; i++) {
    let fillOrder;
    if (i < 5) {
      // Top row: cell index 0 maps to (row 0, col 0)
      fillOrder = 5 + i;
    } else {
      // Bottom row: cell index 5 maps to (row 1, col 0)
      fillOrder = i - 5;
    }
    const isFilled = fillOrder < filledCount;
    cells.push({ id: i, isFilled });
  }

  return (
    <div className="w-full h-full flex">

      {/* Grid container: 5 columns and 2 rows */}
      <div className="flex-1 grid grid-cols-5 grid-rows-2 gap-1">
        {cells.map(cell => (
          <div
            key={cell.id}
            className={`w-full h-full rounded
                        ${cell.isFilled ? fillColor : "bg-silver opacity-30"}`}
          />
        ))}
      </div>
      <div className="ml-4 mt-4 text-xl text-right text-night font-display font-bold">
        {percentage.toFixed(0)}%
      </div>
    </div>
  );
};

export default RectRows;
