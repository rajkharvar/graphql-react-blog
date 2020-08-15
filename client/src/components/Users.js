import React from "react";

import User from "../components/User";
import Title from "../components/Title";
import "./Users.scss";

export default function Users({ users }) {
  return (
    <div>
      <Title title="Users" />

      <div className="users">
        {users.map((user) => (
          <User user={user} key={user.id} />
        ))}
      </div>
    </div>
  );
}
