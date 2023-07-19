import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../../css/Dtable.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomPagination from "../Pagination";
import Config from "../../Config/Config";

const MDriverTable = ({ rows, onEditClick, assignedCabs, onDriverUpdate }) => {
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

  // Function to handle edit button click
  const handleEditClick = (driverId) => {
    onEditClick(driverId);
  };

  // Function to trigger driver update
  const handleDriverUpdate = () => {
    onDriverUpdate();
  };

  // Function to handle driver deletion
  const handleDriverDelete = (driverId) => {
    axios
      .delete(
        `${Config.apiRequest}://${Config.apiHost}:${Config.apiPort}/${Config.apiDriver}/${driverId}/${Config.cab}`
      )
      .then(() => {
        onDriverUpdate();
      })
      .catch((error) => {
        console.error("Error deleting driver:", error);
      });
  };

  // Function to handle modal click
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
            <th>Driver Id Number</th>
            <th>Driver Name</th>
            <th className="">Driver Email</th>
            <th>Driver Phone Number</th>
            <th>Assigned Cab</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row, idx) => {
            const rowIndex = indexOfFirstItem + idx;
            return (
              <tr key={rowIndex}>
                <td data-title="Driver Id Number">{row.driverIdNumber}</td>
                <td data-title="Driver Name">{row.driverName}</td>
                <td data-title="Driver Email" className="">
                  {row.driverEmail}
                </td>
                <td data-title="Driver Phone Number">
                  {row.driverPhoneNumber}
                </td>
                <td data-title="Assigned Cab">
                  {assignedCabs[row.driverIdNumber]?.cabRegistrationNumber ||
                    "Not assigned"}
                </td>
                <td>
                  <span className="actions">
                    <EditIcon
                      className="edit-btn"
                      onClick={() => handleEditClick(row.driverIdNumber)}
                    />
                    <DeleteIcon
                      className="delete-btn"
                      onClick={() => handleDriverDelete(row.driverIdNumber)}
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

export default MDriverTable;
