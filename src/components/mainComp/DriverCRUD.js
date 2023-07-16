import React, { useState, useEffect } from "react";
import axios from "axios";
import Dtable from "../driverInfo/Dtable";
import Dmodal from "../driverInfo/Dmodal";
import Config from "../../Config/Config";
import { Link } from 'react-router-dom';


function DriverCRUD() {
  const [modalOpen, setModalOpen] = useState(false);

  const [rows, setRows] = useState([]);

  const [rowToEdit, setRowToEdit] = useState(null);

  const getDriver = async () => {
    try {
      const response = await axios.get(`http://${Config.apiHost}:${Config.apiPort}/${Config.apiDriver}`);
      console.log(response.data);
      setRows(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDriver();
  }, []);

  const deleteDriver = async (deleteDriverIdNumber) => {
    console.log("Entered delete " + deleteDriverIdNumber);
    try {
      const response = await axios.delete(
        `http://${Config.apiHost}:${Config.apiPort}/${Config.apiDriver}/${deleteDriverIdNumber}`
      );
      console.log(response.data);
      // Perform any additional actions or update UI as needed

      // getCabs() to reload the table
      getDriver();
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
      <h1 className="heading">List of Drivers</h1>
      <Dtable rows={rows} deleteRow={deleteDriver} editRow={handleEditRow} />
      <div className="buttons">
        <button className="btn" id="Back">
          Back
        </button>

        <button className="btn" onClick={() => setModalOpen(true)}>
          Add Driver
        </button>

        <Link to="/assign-cab" className="btn" id="Assign">Assign</Link>

      </div>
      {modalOpen && (
        <Dmodal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
            getDriver();
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
    </div>
  );
}

export default DriverCRUD;
