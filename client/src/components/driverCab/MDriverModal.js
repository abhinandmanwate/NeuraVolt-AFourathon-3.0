import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../css/Dmodal.css";
import Config from "../../Config/Config";

const MDriverModal = ({
  driverId,
  cabs,
  onClose,
  onDriverUpdate,
  onDeleteDriver,
}) => {
  const [selectedCab, setSelectedCab] = useState("");
  const modalRef = useRef(null);

  useEffect(() => {
    setSelectedCab(""); // Reset selectedCab when the modal is opened or closed
  }, [driverId]);

  // Function to handle the update of the driver's assigned cab
  const handleUpdate = () => {
    axios
      .put(
        `${Config.apiRequest}://${Config.apiHost}:${Config.apiPort}/${Config.apiDriver}/${driverId}/${Config.cab}/${selectedCab}`
      )
      .then(() => {
        onDriverUpdate(); // Call the onDriverUpdate callback to refresh the driver table
        onClose(); // Close the modal after the update is successful
      })
      .catch((error) => {
        console.error("Error updating driver:", error);
      });
  };

  // Function to handle the deletion of the driver
  const handleDelete = () => {
    axios
      .delete(
        `${Config.apiRequest}://${Config.apiHost}:${Config.apiPort}/${Config.apiDriver}/${driverId}`
      )
      .then(() => {
        onDeleteDriver(); // Call the onDeleteDriver callback to refresh the driver table
        onClose(); // Close the modal after the deletion is successful
      })
      .catch((error) => {
        console.error("Error deleting driver:", error);
      });
  };

  // Function to handle modal click and close the modal when clicking outside
  const handleModalClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div className="modal-container" onClick={handleModalClick}>
      <div className="modal" ref={modalRef}>
        <h2>Edit Driver</h2>
        <p>Driver ID: {driverId}</p>
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
        <button onClick={handleUpdate}>Submit</button>
        <button onClick={onClose}>Close</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default MDriverModal;
