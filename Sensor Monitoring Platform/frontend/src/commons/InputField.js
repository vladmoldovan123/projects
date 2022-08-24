import React  from "react";
import './commons.css'

const InputField = ({ value, label, name, placeholder, type, onChange }) => (
    <div className="formGroup">
        {label && <label className="form-label" htmlFor="input-field">{label}</label>}
        <input
            type={type}
            value={value}
            name={name}
            className="form-control"
            placeholder={placeholder}
            onChange={onChange}
        />
    </div>
);

export default InputField;