// DriverCRUD.js
import React, { useState, useEffect } from "react";
import Dtable from "../driverInfo/Dtable";
import Dmodal from "../driverInfo/Dmodal";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import {
  getDrivers,
  deleteDriver,
  updateDriver,
  createDriver,
} from "../../Config/DriverAPI"; // Import the API functions from api.js

function DriverCRUD() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [search, setSearch] = useState(""); // Rename searchTerm to search

  useEffect(() => {
    getDriver();
  }, []);

  // Fetch driver data from the API
  const getDriver = async () => {
    try {
      const driversData = await getDrivers();
      setRows(driversData);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete a driver
  const handleDeleteDriver = async (deleteDriverIdNumber) => {
    console.log("Entered delete " + deleteDriverIdNumber);
    try {
      await deleteDriver(deleteDriverIdNumber);
      // Perform any additional actions or update UI as needed

      // Fetch driver data again after deletion
      getDriver();
    } catch (error) {
      console.error(error);
    }
  };

  // Edit a driver
  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    console.log(rowToEdit);

    setModalOpen(true);
  };

  // Handle form submission
  const handleSubmit = async (newRow) => {
    try {
      if (rowToEdit === null) {
        // If rowToEdit is null, it's a new driver, call createDriver API
        await createDriver(newRow);
      } else {
        // Otherwise, it's an existing driver, call updateDriver API
        await updateDriver(rows[rowToEdit].driverIdNumber, newRow);
      }
      // Close the modal after successful form submission
      closeModal();
      // Fetch driver data again after update/create
      getDriver();
    } catch (error) {
      console.error(error);
    }
  };

  // Close the modal
  const closeModal = () => {
    setModalOpen(false);
    setRowToEdit(null);
  };

  // Function to handle search
  const handleSearch = (searchTerm) => {
    setSearch(searchTerm);
    console.log(searchTerm);
  };

  return (
    <div className="DriverCRUD">
      <div className="form">
        <h1 className="heading">List of Drivers</h1>
        {/* Using the SearchBar component */}
        <SearchBar search={search} handleSearch={handleSearch} />
        <Dtable
          rows={rows.filter((row) => {
            const searchLower = search.toLowerCase();
            return (
              row.driverName.toLowerCase().includes(searchLower) ||
              row.driverIdNumber.toLowerCase().includes(searchLower) ||
              row.driverEmail.toLowerCase().includes(searchLower) ||
              row.driverPhoneNumber.toLowerCase().includes(searchLower)
            );
          })}
          deleteRow={handleDeleteDriver}
          editRow={handleEditRow}
        />
        <div className="buttons">
          <button className="btn" id="Back">
            Back
          </button>

          <button className="btn" onClick={() => setModalOpen(true)}>
            Add Driver
          </button>

          <Link to="/assign-cab" className="btn" id="Assign">
            Assign
          </Link>
        </div>
        {modalOpen && (
          <Dmodal
            closeModal={closeModal}
            onSubmit={handleSubmit}
            defaultValue={rowToEdit !== null && rows[rowToEdit]}
          />
        )}
      </div>
    </div>
  );
}

export default DriverCRUD;
