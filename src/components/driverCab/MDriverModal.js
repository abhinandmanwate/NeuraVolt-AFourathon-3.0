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
    setSelectedCab("");
  }, [driverId]);

  const handleUpdate = () => {
    axios
      .put(
        `${Config.apiRequest}://${Config.apiHost}:${Config.apiPort}/${Config.apiDriver}/${driverId}/${Config.cab}/${selectedCab}`
      )
      .then(() => {
        onDriverUpdate();
        onClose();
      })
      .catch((error) => {
        console.error("Error updating driver:", error);
      });
  };

  const handleDelete = () => {
    axios
      .delete(
        `${Config.apiRequest}://${Config.apiHost}:${Config.apiPort}/${Config.apiDriver}/${driverId}`
      )
      .then(() => {
        onDeleteDriver();
        onClose();
      })
      .catch((error) => {
        console.error("Error deleting driver:", error);
      });
  };

  const handleModalClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose(); // Close the modal when clicking outside
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
