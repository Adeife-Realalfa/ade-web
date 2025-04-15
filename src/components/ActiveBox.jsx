import React from 'react';

/**
 * ActiveBox Component
 *
 * Props:
 *   value: a number between 0 and 10
 */
const ActiveBox = ({ value }) => {
  // Clamp the value between 0 and 10, then convert it to a percentage (0 to 100)
  const clampedValue = Math.max(0, Math.min(value, 10));
  const percentage = Math.round((clampedValue / 10) * 100);

  // Determine the active rectangle based on the percentage:
  // 0% to 35%  => red is active (index 0)
  // Above 35% to 69% => yellow is active (index 1)
  // Above 69% => green is active (index 2)
  let activeIndex;
  if (percentage <= 35) {
    activeIndex = 0;
  } else if (percentage <= 69) {
    activeIndex = 1;
  } else {
    activeIndex = 2;
  }

  // Define the three rectangles with corresponding colors
  const rectangles = [
    { color: 'bg-blush' },
    { color: 'bg-sun' },
    { color: 'bg-forest' },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Thin background bar centered horizontally and vertically.
          The inline style sets its height to be thinner than the rectangles. */}
      <div 
        className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 bg-whisper rounded-full"
        style={{ height: '4px' }}
      />
      {/* Container for the three rectangles */}
      <div className="relative flex justify-between items-center w-full px-2 gap-6">
        {rectangles.map((rect, index) => (
          <div
            key={index}
            // The inactive rectangles have reduced opacity but are still visible.
            className={`flex-1 mx-1 relative transition-opacity duration-300 ${
              index === activeIndex ? 'opacity-100' : 'opacity-20'
            }`}
          >
            <div
              className={`${rect.color} w-full h-12 rounded-full flex items-center justify-center`}
            >
              {/* Only show percentage text on the active rectangle */}
              {index === activeIndex && (
                <span className="text-night font-display font-bold text-xl">
                  {percentage}%
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveBox;
