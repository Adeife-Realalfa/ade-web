// src/pages/About.jsx
import React from "react";
import GlassJar from "../components/GlassJar";
import RiskGuage from "../components/RiskGuage";

export default function About() {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-sans mb-4">About RealFinance</h1>
        <p className="text-gray-700 font-display">
          RealFinance is a lightweight tool to help individuals understand their real estate
          financing options. We provide quick calculations and insights with no data stored or login required.
          This tool is ideal for personal planning or casual financial modeling.
        </p>
        <div className="w-64 h-64">
          <RiskGuage value={0.06}  />
        </div>
      </div>
    );
  }
  