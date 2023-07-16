import React, { useState, useEffect } from "react";
import axios from "axios";
import Ctable from "../cabInfo/Ctable";
import Cmodal from "../cabInfo/Cmodal";
import Config from "../../Config/Config";
import { Link } from 'react-router-dom';


function CabCRUD() {
  const [modalOpen, setModalOpen] = useState(false);

  const [rows, setRows] = useState([]);

  const [rowToEdit, setRowToEdit] = useState(null);

  const getCabs = async () => {
    try {
      const response = await axios.get(`http://${Config.apiHost}:${Config.apiPort}/${Config.apiCab}`);
      console.log(response.data);
      setRows(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCabs();
  }, []);

  const deleteCab = async (deleteCabRegistrationNumber) => {
    console.log("Entered delete " + deleteCabRegistrationNumber);
    try {
      const response = await axios.delete(
        `http://${Config.apiHost}:${Config.apiPort}/${Config.apiCab}/${deleteCabRegistrationNumber}`
      );
      console.log(response.data);
      // Perform any additional actions or update UI as needed

      // getCabs() to reload the table
      getCabs();
    } catch (error) {
      console.error(error);
    }
  };

  // Edit the field
  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    console.log(rowToEdit);

    setModalOpen(true);
  };

  // Add new row
  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;
            return newRow;
          })
        );
  };

  return (
    <div className="DriverCRUD">
      <h1 className="heading">List of Cabs</h1>
      <Ctable rows={rows} deleteRow={deleteCab} editRow={handleEditRow} />
      <div className="buttons">
        <button className="btn" id="Back">
          Back
        </button>

        <button className="btn" onClick={() => setModalOpen(true)}>
          Add Cab
        </button>

        <Link to="/assign-driver" className="btn" id="Assign">Assign</Link>

        {/* <button className="btn" id="Assign">
          Assign
        </button> */}
      </div>
      {modalOpen && (
        <Cmodal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
            getCabs();
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
    </div>
  );
}

export default CabCRUD;
