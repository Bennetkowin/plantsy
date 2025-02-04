import React from "react";

function Search({ setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Search plants..."
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default Search;