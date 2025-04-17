// src/pages/CRElens/Dashboard.jsx
import React from "react";
import GlassCard from "../../components/GlassCard";
import RiskGuage from "../../components/RiskGuage"
import RectangleGrid from "../../components/RectangleGrid";
import RectBorder from "../../components/RectBorder";
import GlassJar from "../../components/GlassJar";
import RectRows from "../../components/RectRows";
import ActiveBox from "../../components/ActiveBox";
import RectangleHeap from "../../components/RectangleHeap";
import VerticalSlider from "../../components/VerticalSlider";
import StaticBars from "../../components/StaticBars";
import ConcentricCricles from "../../components/ConcentricCircles";
import TiltedRects from "../../components/TiltedRects";
import CircleLine from "../../components/CircleLine";

export default function Dashboard({ data, className = "" }) {
  if (!data) return <p className="text-center">No data to display</p>;

  const entries = Object.entries(data);
  const [c1, c2, c3] = [
    entries.slice(0, 4),
    entries.slice(4, 8),
    entries.slice(8, 12),
  ];

  return (
    <div
      className={`
        flex flex-col
        h-[calc(100vh-64px)]
        pb-0 md:pb-2
        overflow-hidden
        ${className}
      `}
    >
      {/* Fixed header */}
      <h2 className="text-3xl text-night font-display px-4 py-1 shrink-0">
        Your Results
      </h2>

      {/* MOBILE: one column (4 cards) per “page” */}
      <div className="md:hidden flex-1 overflow-y-auto overflow-x-hidden snap-y snap-mandatory">
        {/* Column 1 */}
        <section className="w-full h-full min-h-0 snap-start p-1
                            grid grid-cols-2 gap-4
                            [grid-template-rows:2fr_1fr_1fr]">
          {c1[0] && (
            <GlassCard title={c1[0][0]} className="col-span-2 h-full">
              <RiskGuage value={c1[0][1]} />
            </GlassCard>
          )}
          {c1[1] && (
            <GlassCard title={c1[1][0]} className="col-span-2 h-full">
              <RectangleGrid value={c1[1][1]} />
            </GlassCard>
          )}
          {c1[2] && (
            <GlassCard title={c1[2][0]} className="h-full">
              <RectBorder value={c1[2][1]} />
            </GlassCard>
          )}
          {c1[3] && (
            <GlassCard title={c1[3][0]} className="h-full">
              <GlassJar value={c1[3][1]} />
            </GlassCard>
          )}
        </section>

        {/* Column 2 */}
        <section className="w-full h-full min-h-0 snap-start p-1
                            grid grid-cols-2 gap-4
                            [grid-template-rows:1fr_2fr]">
          {c2[0] && (
            <GlassCard title={c2[0][0]} className="h-full">
              <RectRows value={c2[0][1]} />
            </GlassCard>
          )}
          {c2[1] && (
            <GlassCard title={c2[1][0]} className="h-full">
              <ActiveBox value={c2[1][1]} />
            </GlassCard>
          )}
          {c2[2] && (
            <GlassCard title={c2[2][0]} className="h-full">
              <RectangleHeap value={c2[2][1]} />
            </GlassCard>
          )}
          {c2[3] && (
            <GlassCard title={c2[3][0]} className="h-full">
              <VerticalSlider value={c2[3][1]} />
            </GlassCard>
          )}
        </section>

        {/* Column 3 */}
        <section className="w-full h-full min-h-0 snap-start p-1
                            grid gap-4
                            [grid-template-rows:2.5fr_2.5fr_1fr_1fr]">
          {c3[0] && (
            <GlassCard title={c3[0][0]} className="h-full">
              <StaticBars value={c3[0][1]} />
            </GlassCard>
          )}
          {c3[1] && (
            <GlassCard title={c3[1][0]} className="h-full">
              <ConcentricCricles value={c3[1][1]} />
            </GlassCard>
          )}
          {c3[2] && (
            <GlassCard title={c3[2][0]} className="h-full">
              <TiltedRects value={c3[2][1]} />
            </GlassCard>
          )}
          {c3[3] && (
            <GlassCard title={c3[3][0]} className="h-full">
              <CircleLine value={c3[3][1]} />
            </GlassCard>
          )}
        </section>
      </div>

      {/* DESKTOP: three fixed columns */}
      <div
        className="
          hidden md:grid md:grid-cols-3 gap-4 p-1 flex-1
          overflow-y-auto md:overflow-hidden
          snap-none
        "
      >
        {/* COLUMN 1 */}
        <section className="h-full min-h-0 grid grid-cols-2 gap-4 snap-start [grid-template-rows:2fr_1fr_1fr]">
          {c1[0] && (
            <GlassCard title={c1[0][0]} className="col-span-2 h-full">
              <RiskGuage value={c1[0][1]} />
            </GlassCard>
          )}

          {c1[1] && (
            <GlassCard title={c1[1][0]} className="col-span-2">
              <RectangleGrid value={c1[1][1]} />
            </GlassCard>
          )}
          {c1[2] && (
            <GlassCard title={c1[2][0]}>
              <RectBorder value={c1[2][1]} />
            </GlassCard>
          )}
          {c1[3] && (
            <GlassCard title={c1[3][0]}>
              <GlassJar value={c1[3][1]} />
            </GlassCard>
          )}
        </section>

        {/* COLUMN 2 */}
        <section className="h-full min-h-0 grid grid-cols-2 gap-4 snap-start [grid-template-rows:1fr_2fr]">
          {c2[0] && (
            <GlassCard title={c2[0][0]}>
              <RectRows value={c2[0][1]} />
            </GlassCard>
          )}
          {c2[1] && (
            <GlassCard title={c2[1][0]}>
              <ActiveBox value={c2[1][1]} />
            </GlassCard>
          )}
          {c2[2] && (
            <GlassCard title={c2[2][0]}>
              <RectangleHeap value={c2[2][1]} />
            </GlassCard>
          )}
          {c2[3] && (
            <GlassCard title={c2[3][0]}>
              <VerticalSlider value={c2[3][1]} />
            </GlassCard>
          )}
        </section>

        {/* COLUMN 3 */}
        <section className="h-full min-h-0 grid grid-cols-2 gap-4 snap-start [grid-template-rows:2fr_2fr_1fr_1fr]">
          {c3[0] && (
            <GlassCard title={c3[0][0]} className="col-span-2">
              <StaticBars value={c3[0][1]} />
            </GlassCard>
          )}
          {c3[1] && (
            <GlassCard title={c3[1][0]} className="col-span-2">
              <ConcentricCricles value={c3[1][1]} />
            </GlassCard>
          )}
          {c3[2] && (
            <GlassCard title={c3[2][0]} className="col-span-2">
              <TiltedRects value={c3[2][1]} />
            </GlassCard>
          )}
          {c3[3] && (
            <GlassCard title={c3[3][0]} className="col-span-2">
              <CircleLine value={c3[3][1]} />
            </GlassCard>
          )}
        </section>
      </div>
    </div>
  );
}
