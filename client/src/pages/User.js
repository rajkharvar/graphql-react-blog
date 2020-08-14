import React from "react";
import { useParams } from "react-router-dom";

export default function User() {
  const { username } = useParams();
  return (
    <div>
      <h1>User with username: {username}</h1>
    </div>
  );
}
