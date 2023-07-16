import "./css/DriverCRUD.css";

//                                            Driver
import DriverCRUD from "./components/mainComp/DriverCRUD";

//                                            Cab
import CabCRUD from "./components/mainComp/CabCRUD";

//                                          Cab & Diver
import ManageCab from "./components/mainComp/ManageCab";
import ManageDriver from "./components/mainComp/ManageDriver";
import Landing from "./components/mainComp/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Home/Navbar";
import DriverPage from "./Pages/DriverPage";
import CabPage from "./Pages/CabPage";
import AsssignCab from "./Pages/AsssignCab";
import AssignDriver from "./Pages/AssignDriver";

function App() {
  return (
    <div className="App">
      {/* <DriverCRUD />
      <CabCRUD />
      <ManageCab />
      <ManageDriver />
      <Landing /> */}
      <Router>
        {/* <Suspense fallback={<h1 className='load'>Loading</h1>}> */}
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            {/* <Route path="/Students" element={<Students />}></Route>
            <Route path="/Books" element={<Books />}></Route> */}
          </Routes>
        {/* </Suspense> */}
      </Router> 
      <Router>
      <Routes>
        <Route exact path="/" component={Landing} />
        <Route path="/driver" element={<DriverPage />}></Route>
        <Route path="/cab" element={<CabPage />}></Route>
        <Route path="/assign-cab" element={<AsssignCab />}></Route>
        <Route path="/assign-driver" element={<AssignDriver />}></Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
