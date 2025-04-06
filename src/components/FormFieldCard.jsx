// src/components/FormFieldCard.jsx
import { Info } from "lucide-react";
import { useState } from "react";

export default function FormFieldCard({ field, value, onChange }) {
  const [showHelp, setShowHelp] = useState(false);

  const renderInput = () => {
    if (field.type === "select") {
      return (
        <select
          name={field.name}
          value={value || ""}
          onChange={onChange}
          className="mt-1 block w-full border border-white/20 bg-white/10 text-white placeholder-white rounded px-3 py-2 backdrop-blur-sm"
        >
          <option value="">Select an option</option>
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
        type={field.type || "text"}
        name={field.name}
        value={value || ""}
        onChange={onChange}
        className="mt-1 block w-full border border-white/20 bg-white/10 text-white placeholder-white rounded px-3 py-2 backdrop-blur-sm"
      />
    );
  };

  return (
    <div
      className="p-5 rounded-2xl shadow-md border border-white/20 bg-steel/30 backdrop-blur-md text-white"
      style={{
        backgroundColor: "rgba(120, 107, 128, 0.3)", // fallback steel tint
      }}
    >
      <label className="block text-white font-display text-base">
        {field.label}
        <button
          type="button"
          onClick={() => setShowHelp(!showHelp)}
          className="ml-2 text-sm text-white/70 hover:text-white"
        >
          <Info className="inline-block w-4 h-4" />
        </button>
      </label>

      {renderInput()}

      {showHelp && (
        <p className="text-sm text-white/80 bg-white/10 border border-white/10 p-3 rounded-md font-sans leading-snug mt-2 backdrop-blur-sm">
          {field.helpText}
        </p>
      )}
    </div>
  );
}
