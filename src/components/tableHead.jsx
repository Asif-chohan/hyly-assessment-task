import React from "react";

function TableHead({ header, handleSort, sortOrder, sortedColumn }) {
  const handleClick = () => {
    handleSort(header);
  };

  return (
    <th style={{ cursor: "pointer" }} onClick={handleClick}>
      {header}{" "}
      {sortedColumn === header ? (sortOrder === "asc" ? "↑" : "↓") : null}
    </th>
  );
}

export default TableHead;
