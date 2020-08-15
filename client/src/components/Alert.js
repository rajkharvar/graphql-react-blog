import React from "react";
import { AlertCircle } from "react-feather";

import "./Alert.scss";

export default function Alert({ title }) {
  return (
    <div className="error">
      <AlertCircle />
      <span>{title}</span>
    </div>
  );
}
