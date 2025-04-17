import React from 'react';

const RectangleGrid = ({ value }) => {
  // Ensure the value stays within the 0-10 range
  const sanitizedValue = Math.max(0, Math.min(10, value));
  
  // Calculate the percentage (0-100) based on the value,
  // rounding to the nearest whole number.
  const percentage = Math.round(sanitizedValue * 10);
  
  // Determine how many rectangles (out of 100) should be filled.
  const filledCount = percentage;
  
  // Determine the fill color based on the percentage:
  // 0%-35%: red, 36%-69%: yellow, 70%-100%: green.
  let fillColor;
  if (percentage <= 35) {
    fillColor = 'bg-blush';
  } else if (percentage <= 69) {
    fillColor = 'bg-sun';
  } else {
    fillColor = 'bg-forest';
  }
  
  // Create an array of 100 rectangles. Using w-full and aspect-square
  // makes each rectangle responsive and maintain a square ratio.
  const rectangles = Array.from({ length: 100 }, (_, idx) => (
    <div
      key={idx}
      className={`w-full aspect-square rounded-full ${idx < filledCount ? fillColor : 'bg-silver opacity-30'}`}
    />
  ));
  
  return (
    <div className="p-4 rounded w-full h-full flex items-center"> 
      {/* 
        The grid container uses Tailwind’s arbitrary value syntax for a 20-column grid.
        This ensures 100 items are laid out in 20 columns (producing 5 rows).
        The w-full and h-full classes help the grid be responsive to the parent's dimensions.
      */}
      <div className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-1 w-full h-full">
        {rectangles}
      </div>
      <div className="ml-4 mt-1 text-xl text-right text-night font-display font-bold">{percentage}%</div>
    </div>
  );
};

export default RectangleGrid;
