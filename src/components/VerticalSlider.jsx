import React, { useRef, useState, useEffect } from 'react';

const VerticalSlider = ({ value }) => {
  const parentRef = useRef(null);
  const trackRef  = useRef(null);

  const [dims, setDims] = useState({ parentW: 0, trackH: 0 });

  // Measure parent width & track height
  useEffect(() => {
    const update = () => {
      if (parentRef.current && trackRef.current) {
        const pw = parentRef.current.getBoundingClientRect().width;
        const th = trackRef.current.getBoundingClientRect().height;
        setDims({ parentW: pw, trackH: th });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // clamp 0–10 → 0–100%
  const pct = Math.max(0, Math.min(10, value)) * 10;

  // Thumb = full parent width, but never taller than the track
  const rawThumbD = dims.parentW;
  const thumbD    = Math.min(rawThumbD, dims.trackH);

  // Track = 80% of thumb
  const trackW = thumbD * 0.8;

  // Color logic
  let fillClass = '';
  if (pct <= 35)       fillClass = 'bg-gradient-to-t from-blush to-fire';
  else if (pct <= 69)  fillClass = 'bg-gradient-to-t from-sun to-amber';
  else                 fillClass = 'bg-gradient-to-t from-leaf to-leaf';

  // Calculate bottom offset so that:
  //   pct=0 → bottom: 0px
  //   pct=100 → bottom: trackH - thumbD
  const bottomOffset = (pct / 100) * (dims.trackH - thumbD);

  return (
    <div className="w-full h-full flex flex-col items-center">
      {/* Percentage label */}
      <div className="mb-2 text-alabaster font-display font-bold text-xl">
        {Math.round(pct)}%
      </div>

      {/* Parent wrapper we measure for width */}
      <div
        ref={parentRef}
        className="relative w-full flex-1 overflow-visible flex justify-center"
      >
        {/* The track itself, we measure its height */}
        <div
          ref={trackRef}
          className="relative rounded-full"
          style={{
            width:  `${trackW}px`,
            height: '100%',
          }}
        >
          {/* Track background */}
          <div className="absolute inset-0 bg-whisper opacity-50 rounded-full" />

          {/* Filled portion */}
          <div
            className={`absolute bottom-0 left-0 w-full ${fillClass} rounded-full`}
            style={{ height: `${pct}%` }}
          />

          {/* Thumb */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{
              width:  `${thumbD}px`,
              height: `${thumbD}px`,
              bottom: `${bottomOffset}px`,
            }}
          >
            <div
              className={`w-full h-full rounded-full shadow-md ${fillClass}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalSlider;
