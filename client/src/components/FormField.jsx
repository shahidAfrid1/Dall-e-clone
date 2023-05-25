import React from "react";
import "../styles/formfield.css";
const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => (
  <div>
    <div className="form-field">
      <label htmlFor={name} className="form-field-label">
        {labelName}
      </label>
      {isSurpriseMe && (
        <button type="button" onClick={handleSurpriseMe} className="form-btn">
          Surprise me
        </button>
      )}
    </div>
    <input
      type={type}
      id={name}
      name={name}
      className="form-input-field"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
    />
  </div>
);

export default FormField;
