// src/components/GlassCard.jsx
import React from 'react';

export default function GlassCard({ title = "", value, children, className = "" }) {
  const splitIndex = title.length - 5;
  const firstWord = title.substring(0, splitIndex);
  const secondWord = title.substring(splitIndex);

  return (
    <div
      className={
        `
        relative flex flex-col items-start justify-start
        h-full w-full min-h-0                 /* Allow flex children to shrink */
        rounded-3xl border-r-2 border-b-2 border-white/35 bg-white/5 backdrop-blur-md
        shadow-lg p-2 text-alabaster
        ${className}
      `}
    >
      {/* decorative shine */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/30 to-white/5 opacity-50" />

      <div className="relative z-10 flex flex-col items-start gap-2 text-left flex-1 w-full min-h-0">
        {/* ALWAYS show your title */}
        <span className="text-xs uppercase font-sans font-light tracking-widest text-alabaster ml-2 glow-effect">
          {firstWord} {secondWord}
        </span>

        {/* if there are children, show them; otherwise show the numeric value */}
        {children ? (
          children
        ) : (
          <span className="text-3xl font-display font-bold">
            {value}
          </span>
        )}
      </div>
    </div>
  );
}