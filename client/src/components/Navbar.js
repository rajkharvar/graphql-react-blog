import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Home, LogIn, LogOut, User, UserPlus, PlusSquare } from "react-feather";

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
        {isMobile ? (
          <>
            <button onClick={() => setShow(!show)}> {show ? "X" : "☰"}</button>
            {show && (
              <>
                {!user ? (
                  <>
                    <li>
                      <Link to="/">
                        Home <Home />
                      </Link>
                    </li>
                    <div>
                      <li className="other">
                        <Link to="/login">
                          Login <LogIn />
                        </Link>
                      </li>
                      <li>
                        <Link to="/register">
                          Register <UserPlus />
                        </Link>
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
                    <div style={{ display: "flex" }}>
                      <li className="other">
                        <Link to="/create">
                          Create Post
                          <PlusSquare />
                        </Link>
                      </li>
                      <li>
                        <Link to={`/user/${user.username}`}>
                          My Profile
                          <User />
                        </Link>
                      </li>
                      <li>
                        <Link to="/" onClick={() => logout()}>
                          Logout
                          <LogOut />
                        </Link>
                      </li>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <>
            {!user ? (
              <>
                <li>
                  <Link to="/">
                    Home <Home />
                  </Link>
                </li>
                <div>
                  <li className="other">
                    <Link to="/login">
                      Login <LogIn />
                    </Link>
                  </li>
                  <li>
                    <Link to="/register">
                      Register <UserPlus />
                    </Link>
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
                <div style={{ display: "flex" }}>
                  <li className="other">
                    <Link to="/create">
                      Create Post
                      <PlusSquare />
                    </Link>
                  </li>
                  <li>
                    <Link to={`/user/${user.username}`}>
                      My Profile
                      <User />
                    </Link>
                  </li>
                  <li>
                    <Link to="/" onClick={() => logout()}>
                      Logout
                      <LogOut />
                    </Link>
                  </li>
                </div>
              </>
            )}
          </>
        )}
      </ul>
    </nav>
  );
}
