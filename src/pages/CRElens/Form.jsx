// src/pages/CRElens/Form.jsx
import { useState } from "react";
import { formFields } from "../../data/formFields";
import FormFieldCard from "../../components/FormFieldCard";

export default function Form({ onComplete }) {
  const [formState, setFormState] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  const isMobile = window.innerWidth <= 768;
  const steps = isMobile ? 7 : 4;
  const fieldsPerPage = Math.ceil(formFields.length / steps);
  const startIndex = currentPage * fieldsPerPage;
  const currentFields = formFields.slice(startIndex, startIndex + fieldsPerPage);

  const progress = Math.round(((currentPage + 1) / steps) * 100);
  const encouragements = [
    "You're doing great!",
    "Keep going!",
    "Halfway there!",
    "Almost done!",
    "Final stretch!",
    "You're crushing it!",
    "Great job!",
  ];
  const encouragement = encouragements[Math.min(currentPage, encouragements.length - 1)];

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (currentPage < steps - 1) {
      setCurrentPage((p) => p + 1);
    } else {
      onComplete(formState);
    }
  };

  return (
    <div
      className="min-h-screen py-0 px-4"
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-3">
          <div className="h-3 bg-whisper rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(to right, #f93f9b, #8d37de)",
              }}
            ></div>
          </div>
          <p className="mt-3 text-center text-sm text-steel font-sans italic">
            {encouragement}
          </p>
        </div>

        <div className="space-y-4">
          {currentFields.map((field) => (
            <FormFieldCard
              key={field.name}
              field={field}
              value={formState[field.name]}
              onChange={handleChange}
            />
          ))}
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={handleNext}
             className="bg-gradient-to-r from-pink to-purple hover:brightness-110 text-white px-6 py-2 rounded-full font-display tracking-wide shadow-md transition duration-200"
          >
            {currentPage < steps - 1 ? "Next" : "See Results"}
          </button>
        </div>
      </div>
    </div>
  );
}
