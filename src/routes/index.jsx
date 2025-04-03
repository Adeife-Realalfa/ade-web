// src/routes/index.jsx
import { Routes, Route } from "react-router-dom";
import CRElens from "../pages/CRElens";
import Vlog from "../pages/Vlog";
import About from "../pages/About";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/crelens" element={<CRElens />} />
      <Route path="/vlog" element={<Vlog />} />
      <Route path="/about" element={<About />} />
      <Route path="/" element={<CRElens />} /> {/* fallback to CRElens */}
    </Routes>
  );
}
