import React from "react";

// Helper function that converts a hex color to an rgba string with given opacity.
const hexToRgba = (hex, opacity) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const GlassJar = ({ value }) => {
  // Clamp the value between 0 and 10 and calculate percentage.
  const normalizedValue = Math.max(0, Math.min(value, 10));
  const percentage = normalizedValue * 10;
  
  // Determine the active fill color and its corresponding hex code.
  let fillColorClass = "";
  let fillHex = "";
  
  if (percentage <= 35) {
    fillColorClass = "bg-blush";
    fillHex = "#fda4af"; // Tailwind red-500
  } else if (percentage <= 69) {
    fillColorClass = "bg-sun";
    fillHex = "#fde047"; // Tailwind yellow-500
  } else {
    fillColorClass = "bg-forest";
    fillHex = "#10b981"; // Tailwind green-500
  }
  
  // Use the same active color at a reduced opacity for the jar background.
  const jarBg = hexToRgba(fillHex, 0.3);
  
  // Generate a URL-encoded SVG for the wave overlay.
  // This SVG uses the active fill color for its fill.
  const svgWave = encodeURIComponent(
    `<svg width="120" height="20" viewBox="0 0 120 20" xmlns="http://www.w3.org/2000/svg">
       <path d="M0 10 Q30 0 60 10 T120 10 V20 H0 Z" fill="${fillHex}"/>
     </svg>`
  );
  const waveUrl = `url("data:image/svg+xml,${svgWave}")`;
  
  return (
    <div
      className="relative w-full h-full rounded-full overflow-hidden"
      style={{
        backgroundColor: jarBg,
        borderWidth: '10px', 
        borderColor: hexToRgba(fillHex, 0.05)
      }}
    >
      {/* Fill container: Positioned at the bottom, height determined by percentage */}
      <div
        className={`absolute bottom-0 w-full ${fillColorClass}`}
        style={{ height: `${percentage * 0.9}% ` }}
      >
        {/* Wave overlay: now at the top of the fill, using the same active fill color */}
        <div
          className="absolute top-0 left-0 w-full h-6"
          style={{
            top: "-20px",
            backgroundImage: waveUrl,
            backgroundSize: "120px 20px",
          }}
        ></div>
      </div>
      
      {/* Centered percentage label */}
      <div className="absolute inset-0 flex items-center justify-center text-night font-display font-bold text-xl">
        {percentage}%
      </div>
    </div>
  );
};

export default GlassJar;
