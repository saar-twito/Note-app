import React from "react";

const Input = ({ icon, name, label, small, error, ...rest }) => (
  <article className="mb-3 form-group">
    <label htmlFor={name}>{label}</label>
    <input {...rest} name={name} id={name} className="form-control" />
    <small className="form-text text-muted">{small}</small>
    {error && <div className="alert alert-danger">{error}</div>}
  </article>
);

export default Input;
