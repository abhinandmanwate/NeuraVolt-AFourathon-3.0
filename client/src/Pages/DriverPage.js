import React from "react";
import DriverCRUD from "../components/mainComp/DriverCRUD";
import Sidebar from "../components/sidebar/Sidebar";

const DriverPage = () => {
  return (
    <div>
      <Sidebar/>
      <DriverCRUD /> {/* Add your DriverCRUD component */}
    </div>
  );
};

export default DriverPage;
