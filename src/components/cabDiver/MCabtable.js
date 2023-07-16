import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../../css/Dtable.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomPagination from "../Pagination";
import Config from "../../Config/Config";

const MCabTable = ({ rows, onEditClick, getAssignedDriver, onCabUpdate }) => {
  const [assignedDrivers, setAssignedDrivers] = useState({});
  const modalRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page navigation
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchAssignedDrivers();
  }, [rows]);

  const fetchAssignedDrivers = async () => {
    const driversData = {};
    for (const row of rows) {
      const assignedDriver = await getAssignedDriver(row.cabRegistrationNumber);
      driversData[row.cabRegistrationNumber] = assignedDriver;
    }
    setAssignedDrivers(driversData);
  };

  const handleEditClick = (cabRegistrationNumber) => {
    onEditClick(cabRegistrationNumber);
  };

  const handleCabUpdate = () => {
    onCabUpdate();
  };

  const handleCabDelete = (cabRegistrationNumber) => {
    axios
      .delete(`http://${Config.apiHost}:${Config.apiPort}/${Config.apiCab}/${cabRegistrationNumber}/${Config.driver}`)
      .then(() => {
        fetchAssignedDrivers();
        onCabUpdate();
      })
      .catch((error) => {
        console.error("Error deleting cab:", error);
      });
  };

  const handleModalClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onEditClick(null); // Close the modal when clicking outside
    }
  };

  return (
    <div className="table-wrapper" onClick={handleModalClick}>
      <table className="table">
        <thead>
          <tr>
            <th>Sr No.</th>
            <th className="">Cab Reg Number</th>
            <th>Cab Model</th>
            <th>Cab Color</th>
            <th>Driver Assign</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row, idx) => {
            const rowIndex = indexOfFirstItem + idx;
            return (
              <tr key={rowIndex}>
                <td data-title="Sr No.">{rowIndex + 1}</td>
                <td data-title="Cab Reg Number" className="">
                  {row.cabRegistrationNumber}
                </td>
                <td data-title="Cab Model">{row.cabModel}</td>
                <td data-title="Cab Color">{row.cabColour}</td>
                <td data-title="Driver Assign">
                  {assignedDrivers[row.cabRegistrationNumber]}
                </td>
                <td>
                  <span className="actions">
                    <EditIcon
                      className="edit-btn"
                      onClick={() => handleEditClick(row.cabRegistrationNumber)}
                    />
                    <DeleteIcon
                      className="delete-btn"
                      onClick={() => handleCabDelete(row.cabRegistrationNumber)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Pagination */}
      <CustomPagination
        totalItems={rows.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MCabTable;
