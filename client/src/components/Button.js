import React from "react";

import "./Button.scss";

export default function Button({ type, title, disabled, style }) {
  return (
    <div>
      <button type={type} className="btn" disabled={disabled} style={style}>
        {title}
      </button>
    </div>
  );
}
