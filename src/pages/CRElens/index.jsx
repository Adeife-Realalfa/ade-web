// src/pages/CRElens/index.jsx
import { useState } from "react";
import Landing from "./Landing";
import Form from "./Form";
import Dashboard from "./Dashboard";
import calculateResults from "../../utils/calculator.js";

export default function CRElens() {
  const [step, setStep] = useState("landing"); // 'landing' | 'form' | 'dashboard'
  const [formData, setFormData] = useState(null);
  const [results, setResults] = useState(null);

  const handleFormComplete = (data) => {
    setFormData(data);
    const output = calculateResults(data); // Can be async later
    setResults(output);
    setStep("dashboard");
  };

  return (
    <div className="min-h-screen w-full px-4 py-6">
      {step === "landing" && <Landing onStart={() => setStep("form")} />}
      {step === "form" && <Form onComplete={handleFormComplete} />}
      {step === "dashboard" && <Dashboard data={results} />}
    </div>
  );
}
