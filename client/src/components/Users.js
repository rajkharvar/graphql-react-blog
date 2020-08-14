import React from "react";

import User from "../components/User";
import "./Users.scss";

export default function Users({ users }) {
  return (
    <div className="users">
      {users.map((user) => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
}
