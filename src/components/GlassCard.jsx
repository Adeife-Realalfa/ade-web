// src/components/GlassCard.jsx
export default function GlassCard({ title, value, children, className = "" }) {
  return (
    <div
      className={`
        relative flex flex-col items-center justify-center
        rounded-2xl border border-white/10 bg-white/20 backdrop-blur
        shadow-lg p-4 text-white
        ${className}
      `}
    >
      {/* decorative shine */}
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-white/5 opacity-30" />

      <div className="relative z-10 flex flex-col items-center gap-1 text-center">
        {children ?? (
          <>
            <span className="text-xs uppercase font-sans font-light tracking-widest text-steel">
              {title}
            </span>
            <span className="text-2xl font-display font-semibold text-night">{value}</span>
          </>
        )}
      </div>
    </div>
  );
}
