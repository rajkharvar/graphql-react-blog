import React from "react";

import "./Input.scss";

export default function Input({
  type,
  name,
  value,
  placeholder,
  label,
  className,
  onChange,
  required,
}) {
  return (
    <div className="input-container">
      <label htmlFor={label}>{label}</label>
      <br />
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={className}
        onChange={onChange}
        required
      />
    </div>
  );
}
