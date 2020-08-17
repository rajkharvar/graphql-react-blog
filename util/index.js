const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");
require("dotenv").config();

const checkAuth = (context) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    // Bearer "token"
    const token = authHeader.split("Bearer ")[1];

    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET || "somesecret");
        return user;
      } catch (err) {
        throw new AuthenticationError("Session expired or Invalid token");
      }
    }
    throw new Error("Authentication token must be Bearer token");
  }
  throw new Error("Authenticaion is required");
};

const checkRegisterInput = (firstName, lastName, phone, username, password) => {
  const errors = {};

  if (firstName.trim() === "") {
    errors.firstName = "FirstName must not be empty";
  }

  if (lastName.trim() === "") {
    errors.lastName = "LastName must not be empty";
  }

  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }

  if (phone.trim() === "") {
    errors.phone = "Phone Number must not be empty";
  } else {
    const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    if (!phone.match(phoneRegex)) {
      errors.phone = "Enter a valid Phone Number";
    }
  }

  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  } else {
    if (password.length < 8) {
      errors.password = "Password length must be of length greater than 8";
    }
  }

  return errors;
};

const checkLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }

  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return errors;
};

const checkPostInput = (title, description) => {
  const errors = {};

  if (title.trim() === "") {
    errors.title = "Title must not be empty";
  }

  if (description.trim() === "") {
    errors.description = "Description must not be empty";
  }

  return errors;
};

module.exports = {
  checkAuth,
  checkRegisterInput,
  checkLoginInput,
  checkPostInput,
};
