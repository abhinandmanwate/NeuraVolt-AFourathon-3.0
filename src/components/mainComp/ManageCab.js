import React, { useEffect, useState } from "react";
import MCabAssign from "../cabDiver/MCabAssign";
import MCabModal from "../cabDiver/MCabmodal";
import MCabTable from "../cabDiver/MCabtable";
import axios from "axios";
import "../../css/ManageCab.css";
import Config from "../../Config/Config";

const ManageCab = () => {
  const [rows, setRows] = useState([]);
  const [selectedCab, setSelectedCab] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [assignedDrivers, setAssignedDrivers] = useState({});

  useEffect(() => {
    getCabs();
    getDrivers();
  }, []);

  useEffect(() => {
    fetchAssignedDrivers();
  }, [rows]);

  const getCabs = async () => {
    try {
      const response = await axios.get(
        `${Config.apiRequest}://${Config.apiHost}:${Config.apiPort}/${Config.apiCab}`
      );
      console.log(response.data);
      setRows(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDrivers = async () => {
    try {
      const response = await axios.get(
        `${Config.apiRequest}://${Config.apiHost}:${Config.apiPort}/${Config.apiDriver}`
      );
      console.log(response.data);
      setDrivers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAssignedDriver = async (cabRegistrationNumber) => {
    try {
      const response = await axios.get(
        `${Config.apiRequest}://${Config.apiHost}:${Config.apiPort}/${Config.apiCab}/${cabRegistrationNumber}/${Config.driver}`
      );
      console.log(response.data.driverName);
      return response.data?.driverName || "Not assigned";
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("Driver not assigned:", error);
        return "Not assigned";
      } else {
        console.error("Error fetching assigned driver:", error);
      }
    }
  };

  const fetchAssignedDrivers = async () => {
    const driversData = {};
    for (const row of rows) {
      const assignedDriver = await getAssignedDriver(row.cabRegistrationNumber);
      driversData[row.cabRegistrationNumber] = assignedDriver;
    }
    setAssignedDrivers(driversData);
  };

  const handleEditClick = (cabRegistrationNumber) => {
    setSelectedCab(cabRegistrationNumber);
    setModalOpen(true);
  };

  const handleCabUpdate = () => {
    getCabs();
  };

  const handleCabDelete = () => {
    fetchAssignedDrivers();
    getCabs();
  };

  return (
    <div>
      <div>
        <h1 className="heading">Manage Cabs</h1>
      </div>
      <div className="gridMCab">
        <MCabAssign
          drivers={drivers}
          onCabUpdate={handleCabUpdate} // Pass the handleCabUpdate function
          getAssignedDriver={getAssignedDriver}
        />

        <MCabTable
          rows={rows}
          onEditClick={handleEditClick}
          getAssignedDriver={getAssignedDriver}
          onCabUpdate={handleCabUpdate} // Pass the handleCabUpdate function
        />
      </div>
      {modalOpen && (
        <MCabModal
          cabRegistrationNumber={selectedCab}
          drivers={drivers}
          onClose={() => setModalOpen(false)}
          onCabUpdate={handleCabUpdate} // Pass the handleCabUpdate function
          onDeleteCab={handleCabDelete} // Pass the handleCabDelete function
        />
      )}
      <div className="back">
        <button className="btn">Back</button>
      </div>
    </div>
  );
};

export default ManageCab;
