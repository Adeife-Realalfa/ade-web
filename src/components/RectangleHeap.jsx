import React from "react";

const RectangleHeap = ({ value }) => {
  // Ensure value is between 0 and 10
  const normalizedValue = Math.max(0, Math.min(10, value));
  const percentage = normalizedValue * 10; // for display (0–100%)

  // Determine fill color (using Tailwind background classes)
  let fillClass;
  if (percentage <= 35) {
    fillClass = "bg-blush";
  } else if (percentage <= 69) {
    fillClass = "bg-sun";
  } else {
    fillClass = "bg-leaf";
  }

  const totalRectangles = 10;
  const fullRectangles = Math.floor(normalizedValue);
  const hasPartial = normalizedValue - fullRectangles > 0;
  const partialFillPercentage = (normalizedValue - fullRectangles) * 100;
  // The number of rows to fill (fully or partially)
  const filledCount = fullRectangles + (hasPartial ? 1 : 0);
  // Filled rectangles start from this index (0 = top, 9 = bottom)
  const filledStartIndex = totalRectangles - filledCount;

  const rectangles = [];
  for (let i = 0; i < totalRectangles; i++) {
    // Make the width increase from top (small) to bottom (large).
    const rectStyle = { width: `${(i + 1) * 10}%` };

    let content;
    if (i < filledStartIndex) {
      // This rectangle is unfilled: use a gray background with low opacity.
      content = (
        <div className="w-full h-full bg-whisper opacity-50 rounded-full"></div>
      );
    } else if (hasPartial && i === filledStartIndex) {
      // This rectangle is only partially filled: layer a fill from the bottom.
      content = (
        <div className="relative w-full h-full rounded-full overflow-hidden">
          <div className="w-full h-full bg-whisper opacity-50 rounded-full"></div>
          <div
            className={`absolute bottom-0 left-0 w-full ${fillClass} rounded-full`}
            style={{ height: `${partialFillPercentage}%` }}
          ></div>
        </div>
      );
    } else {
      // This rectangle is completely filled.
      content = (
        <div className={`w-full h-full ${fillClass} rounded-full`}></div>
      );
    }

    rectangles.push(
      <div
        key={i}
        className="flex-1 mx-auto my-1 overflow-hidden"
        style={rectStyle}
      >
        {content}
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      {/* Display the percentage at the top */}
      <div className="mb-2 text-xl text-alabaster font-display font-bold">{percentage}%</div>
      <div className="w-full flex-1 flex flex-col justify-end">
        {rectangles}
      </div>
    </div>
  );
};

export default RectangleHeap;
