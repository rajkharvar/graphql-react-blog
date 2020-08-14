import React from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { Smartphone } from "react-feather";

import "./User.scss";

export default function User({
  user: { firstName, lastName, username, phone },
}) {
  return (
    <div className="user">
      <Link to={`/user/${username}`}>
        <Avatar size="60" name={username} round={true} textSizeRatio={1.5} />
      </Link>
      <Link to={`/user/${username}`}>
        <div className="info">
          <h2>
            {firstName} {lastName}
          </h2>
          <p>{username}</p>
          <div className="phone">
            <Smartphone />
            {phone}
          </div>
        </div>
      </Link>
    </div>
  );
}
