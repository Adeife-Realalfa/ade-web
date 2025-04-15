import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

const RectBorder = ({ value }) => {
  // Clamp the value between 0 and 10, then compute the percentage (0-100)
  const safeValue = Math.max(0, Math.min(10, value));
  const percent = Math.round(safeValue * 10);

  // Set the stroke color explicitly instead of relying on CSS classes.
  // Adjust these hex values to your desired colors.
  let strokeColor = '';
  if (percent < 35) {
    strokeColor = '#fda4af'; // blush color
  } else if (percent < 70) {
    strokeColor = '#fde047'; // sun color (example)
  } else {
    strokeColor = '#10b981'; // forest color (example)
  }

  // Define an open path for the rounded rectangle.
  // (We remove any closing command so the dash pattern applies continuously.)
  const pathData =
    "M15,5 H105 A10,10 0 0 1 115,15 V45 A10,10 0 0 1 105,55 H15 A10,10 0 0 1 5,45 V15 A10,10 0 0 1 15,5";

  // Reference the path element so that we can compute its total length.
  const pathRef = useRef(null);
  const [dash, setDash] = useState(null);

  useEffect(() => {
    if (pathRef.current) {
      // Measure the total length of the continuous path
      const totalLength = pathRef.current.getTotalLength();
      const filledLength = totalLength * (percent / 100);
      // Set the dash array so that the first part (filledLength) is drawn,
      // and the rest is the gap.
      setDash(`${filledLength} ${totalLength - filledLength}`);
    }
  }, [percent]);

  return (
    <div className="relative w-full h-full">
      <svg
        className="w-full h-full"
        viewBox="0 0 120 60"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background rectangle track */}
        <rect
          x="5"
          y="5"
          width="110"
          height="50"
          rx="10"
          fill="transparent"
          stroke="silver"
          strokeWidth="15"
          strokeOpacity="0.3"
          vectorEffect="non-scaling-stroke"
        />
        {/* Progress path with inline stroke color and increased stroke width */}
        <path
          ref={pathRef}
          d={pathData}
          fill="transparent"
          stroke={strokeColor} 
          strokeWidth="15"
          strokeDasharray={dash} // dynamically computed dash array
          strokeDashoffset={0}
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
        />
      </svg>
      {/* Centered fixed-size text overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-night font-display font-bold text-xl">{percent}%</span>
      </div>
    </div>
  );
};

RectBorder.propTypes = {
  value: PropTypes.number.isRequired,
};

export default RectBorder;
