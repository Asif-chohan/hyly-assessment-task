import React, { useCallback, useState } from "react";
import useTableData from "../hooks/useTableData";
import TableHead from "../components/tableHead";

const tableHeaders = [
  "id",
  "title",
  "price",
  "discountPercentage",
  "discountedPrice",
  "category",
];

function DataTable() {
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const { data, loading } = useTableData();

  const handleSort = (header) => {
    if (sortedColumn === header) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(header);
      setSortOrder("asc");
    }
  };

  const sortData = useCallback(
    (a, b) => {
      if (!sortedColumn) return 0;

      const isNumber = !isNaN(a[sortedColumn]);

      console.log("afds", isNumber);

      if (isNumber) {
        if (a[sortedColumn] < b[sortedColumn]) {
          return sortOrder === "asc" ? -1 : 1;
        }
        if (a[sortedColumn] > b[sortedColumn]) {
          return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
      } else {
        return sortOrder === "asc"
          ? a[sortedColumn].localeCompare(b[sortedColumn])
          : b[sortedColumn].localeCompare(a[sortedColumn]);
      }
    },
    [sortedColumn, sortOrder]
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    // render table
    <table>
      {/* render table headers */}

      <thead>
        <tr>
          {tableHeaders.map((header) => (
            <TableHead
              handleSort={handleSort}
              header={header}
              sortOrder={sortOrder}
              sortedColumn={sortedColumn}
            />
          ))}
        </tr>
      </thead>

      {/* render table body */}
      <tbody>
        {data.sort(sortData).map((row) => (
          <tr key={row.id}>
            {tableHeaders.map((header) => (
              <td key={header}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
