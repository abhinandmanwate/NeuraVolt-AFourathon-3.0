import React, { useState } from "react";
import "../../css/Dtable.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomPagination from "../Pagination";

const Dtable = ({ rows, deleteRow, editRow }) => {
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
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Driver Id Number</th>
            <th>Driver Name</th>
            <th className="expand">Driver Email</th>
            <th>Driver Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row, idx) => {
            const rowIndex = indexOfFirstItem + idx;
            return (
              <tr key={rowIndex}>
                <td data-title="Driver Id Number">{row.driverIdNumber}</td>
                <td data-title="Driver Name">{row.driverName}</td>
                <td data-title="Driver Email" className="expand">
                  {row.driverEmail}
                </td>
                <td data-title="Driver Phone Number">
                  {row.driverPhoneNumber}
                </td>
                <td>
                  <span className="actions">
                    <EditIcon
                      className="edit-btn"
                      onClick={() => editRow(rowIndex)}
                    />
                    <DeleteIcon
                      className="delete-btn"
                      onClick={() => deleteRow(row.driverIdNumber)}
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

export default Dtable;
