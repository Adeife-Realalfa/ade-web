import React from 'react';

const TiltedRects = ({ value, containerClassName = "w-full h-full" }) => {
  const clampedValue = Math.max(0, Math.min(10, value));
  const percentage = Math.round((clampedValue / 10) * 100);

  let fillColor, borderColor;
  if (percentage <= 35) {
    fillColor = 'bg-blush'; borderColor = 'border-blush';
  } else if (percentage <= 69) {
    fillColor = 'bg-sun';   borderColor = 'border-sun';
  } else {
    fillColor = 'bg-forest';borderColor = 'border-forest';
  }

  const filledCount = Math.round(clampedValue * 2);

  return (
    <div className={`flex items-center space-x-4 ${containerClassName}`}>
      {/* parent clips overflow */}
      <div className={`relative flex-1 w-full h-full border-2 ${borderColor} rounded-lg overflow-hidden`}>
        {/* absolutely fill, then align bars to the bottom */}
        <div className="absolute inset-0 p-2 xsm:p-4 2xl:p-6 flex items-end space-x-1">
          {Array.from({ length: 20 }).map((_, idx) => {
            const bg = idx < filledCount ? fillColor : 'bg-silver opacity-30';
            return (
              <div
                key={idx}
                className={`flex-1 h-full rounded ${bg}`}
                style={{
                  transform: 'skewX(-30deg)',
                  transformOrigin: 'bottom left',
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="text-xl text-right text-night font-display font-bold">
        {percentage}%
      </div>
    </div>
  );
};

export default TiltedRects;
