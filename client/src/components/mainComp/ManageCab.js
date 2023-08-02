import React, { useEffect, useState } from "react";
import MCabAssign from "../cabDiver/MCabAssign";
import MCabModal from "../cabDiver/MCabmodal";
import MCabTable from "../cabDiver/MCabtable";
import axios from "axios";
//update---
import { getCabs, deleteCab } from "../../Config/CabAPI"; // Import getCabs from CabAPI.js
import { getDrivers } from "../../Config/DriverAPI"; // Import getDrivers from DriverAPI.js
// ---
import "../../css/ManageCab.css";
import Config from "../../Config/Config";

const ManageCab = () => {
  const [rows, setRows] = useState([]);
  const [selectedCab, setSelectedCab] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [assignedDrivers, setAssignedDrivers] = useState({});

  useEffect(() => {
    getCabsFromAPI();
    getDriversFromAPI();
  }, []);

  useEffect(() => {
    fetchAssignedDrivers();
  }, [rows]);

  // Fetch cabs from the API
  const getCabsFromAPI = async () => {
    try {
      const response = await getCabs();
      console.log(response);
      setRows(response);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch drivers from the API
  const getDriversFromAPI = async () => {
    try {
      const response = await getDrivers();
      console.log(response);
      setDrivers(response);
    } catch (error) {
      console.error(error);
    }
  };

  // Get the assigned driver for a cab
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

  // Fetch assigned drivers for all cabs
  const fetchAssignedDrivers = async () => {
    const driversData = {};
    for (const row of rows) {
      const assignedDriver = await getAssignedDriver(row.cabRegistrationNumber);
      driversData[row.cabRegistrationNumber] = assignedDriver;
    }
    setAssignedDrivers(driversData);
  };

  // Handle edit button click for a cab
  const handleEditClick = (cabRegistrationNumber) => {
    setSelectedCab(cabRegistrationNumber);
    setModalOpen(true);
  };

  // Handle cab update
  const handleCabUpdate = () => {
    getCabsFromAPI();
  };

  const handleCabDelete = async () => {
    try {
      await deleteCab(selectedCab);
      fetchAssignedDrivers();
      getCabsFromAPI();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="ManageCab">
      <div className="form">
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
    </div>
  );
};

export default ManageCab;
