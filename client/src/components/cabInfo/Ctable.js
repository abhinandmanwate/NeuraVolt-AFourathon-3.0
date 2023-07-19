import React, { useState } from "react";
import "../../css/Dtable.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomPagination from "../Pagination";

const Ctable = ({ rows, deleteRow, editRow }) => {
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
            <th>Sr No.</th>
            <th className="expand">Cab Registration Number</th>
            <th>Cab Model</th>
            <th>Cab Color</th>
            {/* <th>Driver Phone Number</th> */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row, idx) => {
            const rowIndex = indexOfFirstItem + idx;
            return (
              <tr key={rowIndex}>
                {/* Display the serial number for each row */}
                <td data-title="Sr No.">{rowIndex + 1}</td>
                {/* Display the cab registration number */}
                <td data-title="Cab Registration Number" className="expand">
                  {row.cabRegistrationNumber}
                </td>
                {/* Display the cab model */}
                <td data-title="Cab Model">{row.cabModel}</td>
                {/* Display the cab color */}
                <td data-title="Cab Color">{row.cabColour}</td>
                <td>
                  {/* Action buttons */}
                  <span className="actions">
                    {/* Edit button with onClick event */}
                    <EditIcon
                      className="edit-btn"
                      onClick={() => editRow(rowIndex)}
                    />
                    {/* Delete button with onClick event */}
                    <DeleteIcon
                      className="delete-btn"
                      onClick={() => deleteRow(row.cabRegistrationNumber)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Pagination */}
      {/* CustomPagination component for handling pagination */}
      <CustomPagination
        totalItems={rows.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Ctable;
