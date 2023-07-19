import React, { useState } from "react";
import axios from "axios";
import "../../css/CDassign.css";
import Config from "../../Config/Config";

const MCabAssign = ({ drivers, onCabUpdate, getAssignedDriver }) => {
  // State variables to track the cab registration number and the selected driver
  const [cabRegistrationNumber, setCabRegistrationNumber] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");

  // Function to handle the cab assignment
  const handleAssign = async () => {
    try {
      // Send a POST request to the server to assign the selected driver to the cab
      await axios.post(
        `${Config.apiRequest}://${Config.apiHost}:${Config.apiPort}/${Config.apiCab}/${cabRegistrationNumber}/${Config.driver}/${selectedDriver}`
      );

      // Get the assigned driver for the cab from the server using the provided callback function
      const assignedDriver = await getAssignedDriver(cabRegistrationNumber);

      // Call the provided callback function to update the parent component with the latest cab data
      onCabUpdate();

      // Reset the selected driver and cab registration number fields after successful assignment
      setSelectedDriver("");
      setCabRegistrationNumber("");

      console.log("Assigned Driver:", assignedDriver);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="MCabAssign">
      <div>
        <h2 className="head2">Assign Driver to Cab</h2>
      </div>
      <label>
        Cab Registration Number:
        <input
          type="text"
          value={cabRegistrationNumber}
          onChange={(e) => setCabRegistrationNumber(e.target.value)}
        />
      </label>
      <label>
        Select Driver:
        <select
          value={selectedDriver}
          onChange={(e) => setSelectedDriver(e.target.value)}
        >
          <option value="">Select a driver</option>
          {drivers.map((driver) => (
            <option key={driver.driverIdNumber} value={driver.driverIdNumber}>
              {driver.driverIdNumber}
            </option>
          ))}
        </select>
      </label>
      <button className="btn" onClick={handleAssign}>
        Assign
      </button>
    </div>
  );
};

export default MCabAssign;
