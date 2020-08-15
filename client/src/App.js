import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Register from "./pages/Register";
import User from "./pages/User";
import Navbar from "./components/Navbar";
import Create from "./pages/Create";
import "./App.scss";

import { AuthContext } from "./context/auth";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Router>
        <Navbar />
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
          <Route path="/register">
            {user ? <Redirect to="/" /> : <Register />}
          </Route>
          <Route path="/create" component={Create} />
          <Route path="/post/:id" component={Post} />
          <Route path="/user/:username" component={User} />
        </div>
      </Router>
    </div>
  );
}

export default App;
