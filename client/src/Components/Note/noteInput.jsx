import React from "react";

const NoteInput = ({ name, label, error, ...rest }) => (
  <div className="mb-3 form-group">
    <label htmlFor={name}>{label}</label>
    <textarea
      {...rest}
      name={name}
      id={name}
      className="form-control"
      rows="4"
      cols="20"
    />
    {error && <div className="alert alert-danger">{error}</div>}
  </div>
);

export default NoteInput;
