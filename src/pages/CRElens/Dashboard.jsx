// src/pages/CRElens/Dashboard.jsx
import React from "react";
import GlassCard from "../../components/GlassCard";

export default function Dashboard({ data, className = "" }) {
  // If no data is provided, show an informative message.
  if (!data) return <p className="text-center">No data to display</p>;

  // Convert the data object into an array of key-value pairs.
  const entries = Object.entries(data);

  // Split the entries into three columns.
  const [c1, c2, c3] = [
    entries.slice(0, 4),
    entries.slice(4, 8),
    entries.slice(8, 12),
  ];

  return (
    // Outer container:
    <div
      className={`flex flex-col h-[calc(100vh-64px)] pb-0 md:pb-2 overflow-y-auto md:overflow-hidden ${className}`}
    >
      {/* Heading: remains fixed at the top */}
      <h2 className="text-3xl text-night font-display px-4 py-1 shrink-0">Your Results</h2>

      {/* Grid container for all columns */}
      <div
        className="
          grid grid-cols-1 md:grid-cols-3 gap-4 p-1 flex-1
          overflow-y-auto md:overflow-hidden
          snap-y snap-mandatory md:snap-none
        "
      >
        {/* COLUMN 1 */}
        <section
          className="
            h-full grid grid-cols-2 gap-4 snap-start
            [grid-template-rows:2fr_1fr_1fr]
          "
        >
          {c1[0] && (
            <GlassCard
              title={c1[0][0]}
              value={c1[0][1]}
              className="col-span-2"
            />
          )}
          {c1[1] && (
            <GlassCard
              title={c1[1][0]}
              value={c1[1][1]}
              className="col-span-2"
            />
          )}
          {c1[2] && (
            <GlassCard
              title={c1[2][0]}
              value={c1[2][1]}
            />
          )}
          {c1[3] && (
            <GlassCard
              title={c1[3][0]}
              value={c1[3][1]}
            />
          )}
        </section>

        {/* COLUMN 2 */}
        <section
          className="
            h-full grid grid-cols-2 gap-4 snap-start
            [grid-template-rows:1fr_2fr]
          "
        >
          {c2[0] && (
            <GlassCard
              title={c2[0][0]}
              value={c2[0][1]}
            />
          )}
          {c2[1] && (
            <GlassCard
              title={c2[1][0]}
              value={c2[1][1]}
            />
          )}
          {c2[2] && (
            <GlassCard
              title={c2[2][0]}
              value={c2[2][1]}
            />
          )}
          {c2[3] && (
            <GlassCard
              title={c2[3][0]}
              value={c2[3][1]}
            />
          )}
        </section>

        {/* COLUMN 3 */}
        <section
          className="
            h-full grid gap-4 snap-start
            [grid-template-rows:2.5fr_2.5fr_1fr_1fr]
          "
        >
          {c3[0] && (
            <GlassCard
              title={c3[0][0]}
              value={c3[0][1]}
            />
          )}
          {c3[1] && (
            <GlassCard
              title={c3[1][0]}
              value={c3[1][1]}
            />
          )}
          {c3[2] && (
            <GlassCard
              title={c3[2][0]}
              value={c3[2][1]}
            />
          )}
          {c3[3] && (
            <GlassCard
              title={c3[3][0]}
              value={c3[3][1]}
            />
          )}
        </section>
      </div>
    </div>
  );
}
