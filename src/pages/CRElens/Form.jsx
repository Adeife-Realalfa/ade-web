// src/pages/CRElens/Form.jsx
import { useState } from "react";

const TOTAL_FIELDS = 19;

export default function Form({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formState, setFormState] = useState({});

  const fields = [
    // Simulated input field keys
    "propertyValue", "loanAmount", "interestRate", "termYears", // etc.
  ];

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (currentStep < fields.length - 1) setCurrentStep((s) => s + 1);
  };

  const handleSubmit = () => {
    onComplete(formState); // Exports input to parent
  };

  const progress = Math.round(((currentStep + 1) / fields.length) * 100);

  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-4 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Example input, dynamically change later */}
      <div className="space-y-4">
        <label className="block">
          <span className="text-gray-700">{fields[currentStep]}</span>
          <input
            name={fields[currentStep]}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </label>
      </div>

      <div className="flex justify-end mt-6">
        {currentStep < fields.length - 1 ? (
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            See Results
          </button>
        )}
      </div>
    </div>
  );
}
