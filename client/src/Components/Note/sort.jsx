import React from "react";
import classes from "../../Style/index.module.css";

const sort = ({ filters, onSort }) => {
  const style = { cursor: "pointer" };
  return (
    <div className={classes.Sort}>
      <button
        className="btn dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Filter by :
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        {filters.map((item) => (
          <li
            onClick={() => onSort(item)}
            style={style}
            className={"dropdown-item"}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default sort;
