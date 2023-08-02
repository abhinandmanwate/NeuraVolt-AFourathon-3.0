import React from "react";
import ManageDriver from "../components/mainComp/ManageDriver";
import Sidebar from "../components/sidebar/Sidebar";

const AsssignCab = () => {
  return (
    <div>
      <Sidebar/>
      <ManageDriver /> {/* Add your ManageDriver component */}
    </div>
  );
};

export default AsssignCab;
