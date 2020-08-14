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

module.exports = { checkAuth };
