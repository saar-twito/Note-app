import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./Input";
import Select from "./Select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validateForm = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateField = ({ name, value }) => {
    const filed = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(filed, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validateForm();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  doSubmit = () => {};

  handleChange = ({ target }) => {
    const { data, errors } = { ...this.state };
    const errorMessage = this.validateField(target);
    if (errorMessage) errors[target.name] = errorMessage;
    else delete errors[target.name];
    data[target.name] = target.value;
    this.setState({ data, errors });
  };

  handleError(ex) {
    if (ex.response && ex.response.status === 400) {
      const errors = { ...this.state.errors };
      errors.email = ex.response.data;
      this.setState({ errors });
    }
  }

  renderButton(icon, label) {
    return (
      <button
        disabled={this.validateForm()}
        className="btn btn-outline-primary"
      >
        {icon}
        {label}
      </button>
    );
  }

  renderSelect(name, label, statuses) {
    const { data } = this.state;
    return (
      <Select
        name={name}
        label={label}
        statuses={statuses}
        onChange={this.handleChange}
        value={data[name]}
      />
    );
  }

  renderInput(icon, name, label, placeholder, type = "text", small) {
    const { errors, data } = this.state;
    return (
      <Input
        icon={icon}
        name={name}
        label={label}
        small={small}
        value={data[name]}
        error={errors[name]}
        type={type}
        placeholder={placeholder}
        onChange={this.handleChange}
      />
    );
  }
}

export default Form;
