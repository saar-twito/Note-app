import React from "react";

const Select = ({ name, label, statuses, ...rest }) => (
  <article className="form-group mb-3">
    <label htmlFor={name}>{label}</label>
    <select name={name} id={name} {...rest} className="form-select">
      <option>...</option>
      {statuses.map(({ _id, status }) => (
        <option key={_id} value={status}>
          {status}
        </option>
      ))}
    </select>
  </article>
);

export default React.memo(Select);
