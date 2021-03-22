import React from "react";

const select = ({ name, label, statuses, ...rest }) => {
  return (
    <div className="form-group mb-3">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} {...rest} className="form-select">
        <option>...</option>
        {statuses.map(({ _id, status }) => (
          <option key={_id} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.memo(select);
