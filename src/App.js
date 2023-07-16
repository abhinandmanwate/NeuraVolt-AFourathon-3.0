import "./css/DriverCRUD.css";

//                                            Driver
import DriverCRUD from "./components/mainComp/DriverCRUD";

//                                            Cab
import CabCRUD from "./components/mainComp/CabCRUD";

//                                          Cab & Diver
import { lazy, Suspense } from "react";
import Landing from "./components/mainComp/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Home/Navbar";
const DriverPage = lazy(() => import("./Pages/DriverPage"));
const CabPage = lazy(() => import("./Pages/CabPage"));
const AsssignCab = lazy(() => import("./Pages/AsssignCab"));
const AssignDriver = lazy(() => import("./Pages/AssignDriver"));

function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<h1 className="">Loading</h1>}>
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route exact path="/" component={Landing} />
            <Route path="/driver" element={<DriverPage />}></Route>
            <Route path="/cab" element={<CabPage />}></Route>
            <Route path="/assign-cab" element={<AsssignCab />}></Route>
            <Route path="/assign-driver" element={<AssignDriver />}></Route>
          </Routes>
        </Suspense>
      </Router>
      {/* <Router>
        <Routes></Routes>
      </Router> */}
    </div>
  );
}

export default App;
