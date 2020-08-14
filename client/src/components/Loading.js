import React from "react";
import ReactLoading from "react-loading";

import "./Loading.scss";

export default function Loading({ title }) {
  return (
    <div className="loading">
      <ReactLoading type="spin" color="#2d3748" height={125} width={125} />
      {title && <h3 className="title">{title}</h3>}
    </div>
  );
}
