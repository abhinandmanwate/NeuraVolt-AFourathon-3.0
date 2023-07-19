import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@mui/material/Pagination";

// Define styles using makeStyles
const useStyles = makeStyles((theme) => ({
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
}));

const CustomPagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const classes = useStyles();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (event, page) => {
    onPageChange(page);
  };

  return (
    <div className={classes.pagination}>
      <Pagination
        count={totalPages} // Total number of pages
        page={currentPage} // Current active page
        onChange={handlePageChange} // Callback function for page change
        color="primary" // Color of pagination
      />
    </div>
  );
};

export default CustomPagination;
