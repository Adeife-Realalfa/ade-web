// ────────────────────────────────────────────────────────────────
// src/pages/CRElens/index.jsx
// Main “wizard” page that swaps between Landing → Form → Dashboard
// ────────────────────────────────────────────────────────────────

import { useState } from "react";
import Landing from "./Landing";
import NarrativeForm from "./NarrativeForm";
import Dashboard from "./Dashboard";
import calculateResults from "../../utils/calculator.js";

export default function CRElens() {
  /* Which “step” are we on?  ----------------------------------- */
  // "landing"   → show the welcome screen
  // "form"      → show the questionnaire
  // "dashboard" → show the calculated results
  const [step, setStep]     = useState("landing");
  const [formData, setFormData] = useState(null);     // raw answers
  const [results, setResults]   = useState(null);     // calculated output

  /* When the form finishes, calculate results & move forward ---- */
  const handleFormComplete = (data) => {
    setFormData(data);
    const output = calculateResults(data);
    setResults(output);
    setStep("dashboard");
  };

  /*  ────────────────────────────────────────────────────────────
      Layout rules (important for the “no‑scroll” dashboard):
      1.  This wrapper takes **exactly** the height handed to it
          by its parent layout (which is already `h-screen` minus
          the navbar).
      2.  `flex-1` on children lets each step decide whether it
          needs its own scroll.  Landing/Form can scroll; Dashboard
          must not on desktop.
      3.  No vertical padding here → prevents accidental overflow.
      ──────────────────────────────────────────────────────────── */
  return (
    <div className="flex flex-col h-full w-full px-4 overflow-hidden">
      {/* ---------- LANDING STEP ---------- */}
      {step === "landing" && (
        /* Landing may be taller than the viewport, so allow scroll */
        <div className="flex-1 overflow-y-auto">
          <Landing onStart={() => setStep("form")} />
        </div>
      )}

      {/* ---------- FORM STEP ---------- */}
      {step === "form" && (
        /* Same logic: form can scroll if the questions overflow    */
        <div className="flex-1 overflow-y-auto">
          <NarrativeForm onComplete={handleFormComplete} />
        </div>
      )}

      {/* ---------- DASHBOARD STEP ---------- */}
      {step === "dashboard" && (
        /* Dashboard already manages its own height and must fill
           the remaining space without scrolling on desktop.       */
        <Dashboard data={results} />
      )}
    </div>
  );
}
