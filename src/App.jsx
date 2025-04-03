// src/App.jsx
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes";
import './index.css';


function App() {
  return (
    <Router>
      <div className="min-h-screen w-full">
        <Navbar />
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;

