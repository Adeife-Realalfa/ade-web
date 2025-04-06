// src/pages/CRElens/index.jsx
import { useState } from "react";
import Landing from "./Landing";
import NarrativeForm from "./NarrativeForm"; // ← changed from Form
import Dashboard from "./Dashboard";
import calculateResults from "../../utils/calculator.js";

export default function CRElens() {
  const [step, setStep] = useState("landing"); // 'landing' | 'form' | 'dashboard'
  const [formData, setFormData] = useState(null);
  const [results, setResults] = useState(null);

  const handleFormComplete = (data) => {
    setFormData(data); // Store form state
    const output = calculateResults(data); // Calculate results from form
    setResults(output);
    setStep("dashboard"); // Move to dashboard
  };

  return (
    <div className="min-h-screen w-full px-4 py-6">
      {step === "landing" && <Landing onStart={() => setStep("form")} />}
      {step === "form" && <NarrativeForm onComplete={handleFormComplete} />} {/* ← updated */}
      {step === "dashboard" && <Dashboard data={results} />}
    </div>
  );
}
