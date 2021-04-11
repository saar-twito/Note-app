import React from "react";

const Sort = ({ filters, onSort }) => (
  <div style={{ textAlign: "left" }}>
    <button
      className="btn dropdown-toggle"
      type="button"
      id="dropdownMenuButton1"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Filter by
    </button>
    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      {filters.map((item) => (
        <li
          onClick={() => onSort(item)}
          style={{ cursor: "pointer" }}
          className={"dropdown-item"}
        >
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default Sort;
