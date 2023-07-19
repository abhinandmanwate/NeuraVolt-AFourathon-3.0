import "./css/DriverCRUD.css";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Home/Navbar";

// Components
import Landing from "./components/mainComp/Landing";

// Lazy-loaded Pages
const DriverPage = lazy(() => import("./Pages/DriverPage"));
const CabPage = lazy(() => import("./Pages/CabPage"));
const AssignCab = lazy(() => import("./Pages/AsssignCab"));
const AssignDriver = lazy(() => import("./Pages/AssignDriver"));

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar /> {/* Add your Navbar component */}
        <Suspense fallback={<h1>Loading</h1>}>
          <Routes>
            {/* Define your routes */}
            <Route path="/" element={<Landing />} /> {/* Landing page */}
            <Route path="/driver" element={<DriverPage />} />{" "}
            {/* Driver page */}
            <Route path="/cab" element={<CabPage />} /> {/* Cab page */}
            <Route path="/assign-cab" element={<AssignCab />} />{" "}
            {/* Assign Cab page */}
            <Route path="/assign-driver" element={<AssignDriver />} />{" "}
            {/* Assign Driver page */}
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
