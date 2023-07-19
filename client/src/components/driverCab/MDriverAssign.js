import React, { useState } from "react";
import axios from "axios";
import "../../css/CDassign.css";
import Config from "../../Config/Config";

const MDriverAssign = ({ cabs, onDriverUpdate, getAssignedCab }) => {
  const [driverId, setDriverId] = useState(""); // State to store the driver ID
  const [selectedCab, setSelectedCab] = useState(""); // State to store the selected cab

  // Function to handle cab assignment to a driver
  const handleAssign = async () => {
    try {
      // Send a POST request to assign the selected cab to the driver
      await axios.post(
        `${Config.apiRequest}://${Config.apiHost}:${Config.apiPort}/${Config.apiDriver}/${driverId}/${Config.cab}/${selectedCab}`
      );

      // Get the assigned cab details for the driver after assignment
      const assignedCab = await getAssignedCab(driverId);

      // Call the onDriverUpdate callback to refresh the driver table with the updated data
      onDriverUpdate();

      // Reset the selectedCab and driverId state to empty values after assignment
      setSelectedCab("");
      setDriverId("");

      console.log("Assigned Cab:", assignedCab);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="MCabAssign">
      <div>
        <h2 className="head2">Assign Cab to Driver</h2>
      </div>
      {/* Input field for entering the driver ID */}
      <label>
        Driver ID:
        <input
          type="text"
          value={driverId}
          onChange={(e) => setDriverId(e.target.value)}
        />
      </label>

      {/* Dropdown for selecting the cab to be assigned */}
      <label>
        Select Cab:
        <select
          value={selectedCab}
          onChange={(e) => setSelectedCab(e.target.value)}
        >
          <option value="">Select a cab</option>
          {cabs.map((cab) => (
            <option
              key={cab.cabRegistrationNumber}
              value={cab.cabRegistrationNumber}
            >
              {cab.cabRegistrationNumber}
            </option>
          ))}
        </select>
      </label>

      {/* Button to trigger the cab assignment */}
      <button className="btn" onClick={handleAssign}>
        Assign
      </button>
    </div>
  );
};

export default MDriverAssign;
