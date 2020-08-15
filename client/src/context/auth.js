import React, { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

const SOME_SECRET_TOKEN = "SOME_SECRET_TOKEN";

const initState = {
  user: null,
};

if (localStorage.getItem(SOME_SECRET_TOKEN)) {
  const decodedToken = jwtDecode(localStorage.getItem(SOME_SECRET_TOKEN));

  if (decodedToken.exp * 1000 * 60 * 24 < Date.now()) {
    localStorage.removeItem(SOME_SECRET_TOKEN);
  } else {
    initState.user = decodedToken;
  }
}

// * user - contains username, token, name and phone
const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initState);

  const login = (userData) => {
    localStorage.setItem(SOME_SECRET_TOKEN, userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem(SOME_SECRET_TOKEN);
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    ></AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
