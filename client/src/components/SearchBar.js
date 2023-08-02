import React from "react";
import TextField from "@mui/material/TextField"; 
import '../css/SearchBar.css'

const SearchBar = ({ search, handleSearch }) => {
  return (
    <div>
      {/* Pretty Material-UI TextField */}
      <TextField
        variant="outlined"
        size="small"
        label="Search"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: "16px" }}
        className="search-bar"
      />
    </div>
  );
};

export default SearchBar;
