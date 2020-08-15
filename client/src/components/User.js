import React from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { Smartphone, User as UserIcon } from "react-feather";

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
          <div className="icon">
            <UserIcon />
            <p>{username}</p>
          </div>
          <div className="icon">
            <Smartphone />
            <p>{phone}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
