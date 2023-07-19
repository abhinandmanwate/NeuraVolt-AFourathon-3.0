import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../css/Dmodal.css";
import Config from "../../Config/Config";

const MCabModal = ({
  cabRegistrationNumber, // The cab registration number to be edited
  drivers, // An array of drivers to be displayed in the driver selection dropdown
  onClose, // Callback function to close the modal
  onCabUpdate, // Callback function to update the cab details
  onDeleteCab, // Callback function to delete the cab
}) => {
  // State to track the selected driver for the cab
  const [selectedDriver, setSelectedDriver] = useState("");

  // Ref to the modal container
  const modalRef = useRef(null);

  // Reset selectedDriver when cabRegistrationNumber changes
  useEffect(() => {
    setSelectedDriver("");
  }, [cabRegistrationNumber]);

  // Handle cab update
  const handleUpdate = () => {
    axios
      .put(
        `${Config.apiRequest}://${Config.apiHost}:${Config.apiPort}/${Config.apiCab}/${cabRegistrationNumber}/${Config.driver}/${selectedDriver}`
      )
      .then(() => {
        onCabUpdate(); // Call the provided callback to update the parent component
        onClose(); // Close the modal after successful update
      })
      .catch((error) => {
        console.error("Error updating cab:", error);
      });
  };

  // Handle cab delete
  const handleDelete = () => {
    axios
      .delete(
        `${Config.apiRequest}://${Config.apiHost}:${Config.apiPort}/${Config.apiCab}/${cabRegistrationNumber}/${Config.driver}`
      )
      .then(() => {
        onDeleteCab(); // Call the provided callback to update the parent component
        onClose(); // Close the modal after successful delete
      })
      .catch((error) => {
        console.error("Error deleting cab:", error);
      });
  };

  // Handle click outside the modal to close it
  const handleModalClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose(); // Close the modal when clicking outside
    }
  };

  return (
    <div className="modal-container" onClick={handleModalClick}>
      <div className="modal" ref={modalRef}>
        <h2>Edit Cab</h2>
        <p>Cab Registration Number: {cabRegistrationNumber}</p>
        <label>
          Select Driver:
          <select
            value={selectedDriver}
            onChange={(e) => setSelectedDriver(e.target.value)}
          >
            <option value="">Select a driver</option>
            {drivers.map((driver) => (
              <option key={driver.driverIdNumber} value={driver.driverIdNumber}>
                {driver.driverName}
              </option>
            ))}
          </select>
        </label>
        <button onClick={handleUpdate}>Submit</button>
        <button onClick={onClose}>Close</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default MCabModal;
