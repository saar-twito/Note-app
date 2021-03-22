import React from "react";
import Form from "../Common/form";
import NoteInput from "./noteInput";

class NoteForm extends Form {
  renderNoteInput(name, label, placeholder, errors, data) {
    return (
      <NoteInput
        name={name}
        label={label}
        error={errors[name]}
        value={data[name]}
        placeholder={placeholder}
        onChange={this.handleChange}
      />
    );
  }
}

export default NoteForm;
