import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../css/Dmodal.css";
import Config from "../../Config/Config";

const MCabModal = ({
  cabRegistrationNumber,
  drivers,
  onClose,
  onCabUpdate,
  onDeleteCab,
}) => {
  const [selectedDriver, setSelectedDriver] = useState("");
  const modalRef = useRef(null);

  useEffect(() => {
    setSelectedDriver("");
  }, [cabRegistrationNumber]);

  const handleUpdate = () => {
    axios
      .put(
        `${Config.apiRequest}://${Config.apiHost}:${Config.apiPort}/${Config.apiCab}/${cabRegistrationNumber}/${Config.driver}/${selectedDriver}`
      )
      .then(() => {
        onCabUpdate();
        onClose();
      })
      .catch((error) => {
        console.error("Error updating cab:", error);
      });
  };

  const handleDelete = () => {
    axios
      .delete(
        `${Config.apiRequest}://${Config.apiHost}:${Config.apiPort}/${Config.apiCab}/${cabRegistrationNumber}/${Config.driver}`
      )
      .then(() => {
        onDeleteCab();
        onClose();
      })
      .catch((error) => {
        console.error("Error deleting cab:", error);
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
