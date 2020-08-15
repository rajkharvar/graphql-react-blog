import React from "react";

import "./Button.scss";

export default function Button({ type, title }) {
  return (
    <div>
      <button type={type} className="btn">
        {title}
      </button>
    </div>
  );
}
