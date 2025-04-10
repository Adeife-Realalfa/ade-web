import React, { useState, useEffect, useRef } from 'react';

const VerticalSlider = ({ value }) => {
  // Reference for the slider container for measuring its width.
  const sliderRef = useRef(null);
  const [sliderWidth, setSliderWidth] = useState(0);

  // Update the slider width on mount and when the window is resized.
  useEffect(() => {
    const updateWidth = () => {
      if (sliderRef.current) {
        const { width } = sliderRef.current.getBoundingClientRect();
        setSliderWidth(width);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  // Clamp the value between 0 and 10 and calculate the corresponding percentage (0% to 100%).
  const clampedValue = Math.max(0, Math.min(10, value));
  const percentage = (clampedValue / 10) * 100;

  // Determine active gradient and thumb color based on the percentage.
  let fillClass = '';
  let thumbClass = '';
  if (percentage <= 35) {
    fillClass = 'bg-gradient-to-t from-blush to-fire';
  } else if (percentage <= 69) {
    fillClass = 'bg-gradient-to-t from-sun to-amber';
  } else {
    fillClass = 'bg-gradient-to-t from-leaf to-forest';
  }

  // Calculate the thumb's diameter.
  // Here, the thumb's diameter is 130% of the slider's width.
  const thumbDiameter = sliderWidth * 1.3;

  return (
    <div className="w-full h-full flex flex-col items-center">
      {/* Display the value as a percentage at the top */}
      <div className="mb-2 text-night font-display font-bold text-xl">{Math.round(percentage)}%</div>
      {/* Slider container */}
      <div ref={sliderRef} className="relative w-full flex-1 rounded-full">
        {/* Unfilled gray background with low opacity */}
        <div className="absolute inset-0 bg-silver opacity-40 rounded-full" />
        {/* Filled gradient portion from bottom up */}
        <div
          className={`absolute bottom-0 left-0 w-full ${fillClass} rounded-full`}
          style={{ height: `${percentage}%` }}
        />
        {/* Static slider thumb positioned at the top edge of the filled portion */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2"
          style={{
            // Offset the thumb so that its center aligns with the top of the fill.
            bottom: `calc(${percentage}% - ${thumbDiameter / 1.2}px)`,
          }}
        >
          <div
            className={`rounded-full shadow-md ${fillClass}`}
            style={{
              width: thumbDiameter,
              height: thumbDiameter,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VerticalSlider;
