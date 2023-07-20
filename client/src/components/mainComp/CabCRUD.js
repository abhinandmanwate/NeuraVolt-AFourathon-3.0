import React, { useState, useEffect } from "react";
import Ctable from "../cabInfo/Ctable";
import Cmodal from "../cabInfo/Cmodal";
import { Link } from "react-router-dom";
import { getCabs, deleteCab, updateCab, createCab } from "../../Config/CabAPI"; // Import the API functions from api.js

function CabCRUD() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);

  useEffect(() => {
    getCab();
  }, []);

  // Fetch Cab data from the API
  const getCab = async () => {
    try {
      const cabsData = await getCabs();
      setRows(cabsData);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete a cab
  const handleDeleteCab = async (deleteCabIdNumber) => {
    try {
      await deleteCab(deleteCabIdNumber);
      // Perform any additional actions or update UI as needed

      // Fetch Cab data again after deletion
      getCab();
    } catch (error) {
      console.error(error);
    }
  };

  // Edit a cab
  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    console.log(rowToEdit);

    setModalOpen(true);
  };

  // Handle form submission
  const handleSubmit = async (newRow) => {
    try {
      if (rowToEdit === null) {
        // If rowToEdit is null, it's a new Cab, call createCab API
        await createCab(newRow);
      } else {
        // Otherwise, it's an existing Cab, call updateCab API
        await updateCab(rows[rowToEdit].cabRegistrationNumber, newRow);
      }
      // Close the modal after successful form submission
      closeModal();
      // Fetch Cab data again after update/create
      getCab();
    } catch (error) {
      console.error(error);
    }
  };

  // Close the modal
  const closeModal = () => {
    setModalOpen(false);
    setRowToEdit(null);
  };

  return (
    <div className="DriverCRUD">
      <h1 className="heading">List of Cabs</h1>
      <Ctable rows={rows} deleteRow={handleDeleteCab} editRow={handleEditRow} />
      <div className="buttons">
        <button className="btn" id="Back">
          Back
        </button>

        <button className="btn" onClick={() => setModalOpen(true)}>
          Add Cab
        </button>

        <Link to="/assign-driver" className="btn" id="Assign">
          Assign
        </Link>
      </div>
      {modalOpen && (
        <Cmodal
          closeModal={closeModal}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
    </div>
  );
}

export default CabCRUD;
