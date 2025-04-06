// src/pages/CRElens/NarrativeForm.jsx
import { useState, useEffect } from "react";
import { formFields } from "../../data/formFields"; // Import shared form field definitions

// Convert array of fields into an object for quick access by field name
const fieldData = Object.fromEntries(formFields.map((f) => [f.name, f]));

const isMobile = () => window.innerWidth <= 768;

export default function NarrativeForm({ onComplete }) {
  const [formState, setFormState] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [mobile, setMobile] = useState(isMobile());

  useEffect(() => {
    const handleResize = () => setMobile(isMobile());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Split all field names into chunks of max 4 per page
  const allFieldNames = formFields.map((field) => field.name);
  const chunkFields = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const pages = chunkFields(allFieldNames, 4);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const renderField = (name) => {
    const field = fieldData[name];
    const value = formState[name] || "";

    if (field.type === "select") {
      return (
        <select
          key={name}
          name={name}
          value={value}
          onChange={handleChange}
          className="inline-block mx-1 px-2 py-1 rounded bg-white text-steel border border-silver"
        >
          <option value="">Select</option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        key={name}
        type={field.type}
        name={name}
        value={value}
        onChange={handleChange}
        className="inline-block mx-1 px-2 py-1 rounded border border-silver text-steel"
        placeholder={field.label}
      />
    );
  };

  const renderNarrativeStep = () => {
    const step = pages[currentPage];

    const narratives = {
      projectType: () => <>My project type is {renderField("projectType")}</>,
      loanPurpose: () => <>the purpose of the loan is {renderField("loanPurpose")}</>,
      unitCount: () => <>and the project includes {renderField("unitCount")} units</>,
      yearsOfExperience: () => <>I have {renderField("yearsOfExperience")} years of development experience</>,
      projectsCompleted: () => <>and I have completed {renderField("projectsCompleted")} projects</>,
      largestProjectUnitCount: () => <>with my largest being {renderField("largestProjectUnitCount")} units</>,
      hasCompletedProjectType: () => <>I have {renderField("hasCompletedProjectType")} completed a similar type of project</>,
      location: () => <>The project is located in {renderField("location")}</>,
      projectStage: () => <>and is currently at the {renderField("projectStage")} stage</>,
      totalProjectCost: () => <>with a total cost of {renderField("totalProjectCost")}</>,
      requestedLoanAmount: () => <>I’m requesting a loan of {renderField("requestedLoanAmount")}</>,
      expectedProjectValue: () => <>and expect the project to be worth {renderField("expectedProjectValue")}</>,
      expectedRevenue: () => <>and generate {renderField("expectedRevenue")} in revenue</>,
      presales: () => <>I have secured {renderField("presales")} in presales</>,
      loanTerm: () => <>with a loan term of {renderField("loanTerm")} months</>,
      loanPriority: () => <>and the loan priority is {renderField("loanPriority")}</>,
      priorLoansSum: () => <>there is {renderField("priorLoansSum")} in higher-priority loans</>,
      guarantorPnw: () => <>the guarantors' personal net worth is {renderField("guarantorPnw")}</>,
      cashEquity: () => <>and cash equity contributed is {renderField("cashEquity")}</>,
    };

    return (
      <p>
        {step.map((fieldName, index) => (
          <span key={fieldName}>
            {index > 0 ? " " : ""}
            {narratives[fieldName]()}
            {index === step.length - 1 ? "." : ","}
          </span>
        ))}
      </p>
    );
  };

  const progress = Math.round(((currentPage + 1) / pages.length) * 100);

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage((p) => p + 1);
    } else {
      onComplete(formState);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-2 bg-whisper rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink to-purple"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="bg-white p-6 rounded-2xl shadow text-lg font-display text-graphite">
        {renderNarrativeStep()}
      </div>

      {/* Navigation */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleNext}
          className="bg-gradient-to-r from-pink to-purple hover:brightness-110 text-white px-6 py-2 rounded-2xl font-display tracking-wide shadow-md transition duration-200"
        >
          {currentPage === pages.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
