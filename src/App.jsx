// src/App.jsx
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes";
import './index.css';


function App() {
  return (
    <Router>
      <div className="h-screen w-full flex flex-col">
        <Navbar />
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;

