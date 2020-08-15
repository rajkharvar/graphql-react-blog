import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { AuthContext } from "../context/auth";
import "./Navbar.scss";

export default function Navbar() {
  const [show, setShow] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const isMobile = useMediaQuery({
    query: "(max-width: 480px)",
  });

  return (
    <nav>
      <ul>
        {isMobile && (
          <button onClick={() => setShow(!show)}> {show ? "X" : "☰"}</button>
        )}
        {!user ? (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <div>
              <li className="other">
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </div>
          </>
        ) : (
          <>
            <li>
              <Link to="/">
                Hi, {user.firstName} {user.lastName}
              </Link>
            </li>
            <div>
              <li className="other">
                <Link to="/create">Create Post</Link>
              </li>
              <li>
                <Link to={`/user/${user.username}`}>My Profile</Link>
              </li>
              <li>
                <Link to="/" onClick={() => logout()}>
                  Logout
                </Link>
              </li>
            </div>
          </>
        )}
      </ul>
    </nav>
  );
}
