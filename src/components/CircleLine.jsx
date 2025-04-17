import React from 'react';

const CircleLine = ({ value }) => {
  const clamped = Math.max(0, Math.min(10, value));
  const pct = Math.round((clamped / 10) * 100);
  const fillClass =
    pct <= 35 ? 'bg-blush' : pct <= 69 ? 'bg-sun' : 'bg-leaf';
  const filledCount = Math.floor(clamped);

  const circles = Array.from({ length: 10 }, (_, i) => {
    const base = i < filledCount ? fillClass : 'bg-whisper opacity-50';
    return (
      <div
        key={i}
        className={`flex-1 m-0.5 rounded-full transition-colors ${base} aspect-square`}
      />
    );
  });

  return (
    <div className="flex items-center w-full">
      <div className="flex flex-1 w-full">{circles}</div>
      <div className="ml-2 text-xl text-right text-alabaster font-display font-bold">
        {pct}%
      </div>
    </div>
  );
};

export default CircleLine;
