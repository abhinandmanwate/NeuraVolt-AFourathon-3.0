import React from "react";
import CabCRUD from "../components/mainComp/CabCRUD";
import Sidebar from "../components/sidebar/Sidebar";

const CabPage = () => {
  return (
    <div>
      <Sidebar/>
      <CabCRUD /> {/* Add your CabCRUD component */}
    </div>
  );
};

export default CabPage;
