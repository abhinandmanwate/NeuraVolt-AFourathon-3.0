import React, { useState } from "react";
import axios from "axios";
import "../../css/CDassign.css"

const MDriverAssign = ({ cabs, onDriverUpdate, getAssignedCab }) => {
  const [driverId, setDriverId] = useState("");
  const [selectedCab, setSelectedCab] = useState("");

  const handleAssign = async () => {
    try {
      await axios.post(
        `http://localhost:8080/driverapi/${driverId}/cab/${selectedCab}`
      );
      const assignedCab = await getAssignedCab(driverId);
      onDriverUpdate();
      setSelectedCab("");
      setDriverId("");
      console.log("Assigned Cab:", assignedCab);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <h2 className="head2">Assign Cab to Driver</h2>
      </div>
      
      <label>
        Driver ID:
        <input
          type="text"
          value={driverId}
          onChange={(e) => setDriverId(e.target.value)}
        />
      </label>
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
      <button className="btn" onClick={handleAssign}>Assign</button>
    </div>
  );
};

export default MDriverAssign;
