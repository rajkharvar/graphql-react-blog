const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
require("dotenv").config();

const User = require("../../models/user");
const { checkRegisterInput, checkLoginInput } = require("../../util");

const userResolver = {
  Query: {
    async users() {
      try {
        const users = await User.find().select("-password");
        return users;
      } catch (err) {
        throw new Error("Error caused while fetching users");
      }
    },
    async user(_, { username }) {
      try {
        const userData = await User.findOne({ username }).select("-password");

        return userData;
      } catch (err) {
        throw new Error("Error caused while fetching user");
      }
    },
  },
  Mutation: {
    // * _ stands for parent
    // * args for argument
    // * context of server
    // * infor contains meta data for app

    async login(_, { username, password }) {
      const user = await User.findOne({ username });

      // * check for empty username or password input

      const errors = checkLoginInput(username, password);

      if (Object.keys(errors).length > 0) {
        throw new UserInputError("Error", {
          errors,
        });
      }

      // * check if user with username exist or not
      if (!user) {
        throw new UserInputError("No user found", {
          errors: {
            username: "No user found with this username",
          },
        });
      }

      // * If exist check for password
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        throw new UserInputError("Incorrect Password", {
          errors: {
            password: "Incorrect Password",
          },
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          username: user.username,
        },
        process.env.JWT_SECRET || "somesecret",
        { expiresIn: "24h" }
      );

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { firstName, lastName, phone, username, password } },
      context,
      info
    ) {
      // * check for username if exists
      const checkUser = await User.findOne({ username });

      if (checkUser) {
        throw new UserInputError("Username is already taken", {
          errors: {
            username: "Username is already taken",
          },
        });
      }

      const errors = checkRegisterInput(
        firstName,
        lastName,
        phone,
        username,
        password
      );

      if (Object.keys(errors).length > 0) {
        throw new UserInputError("Error", {
          errors,
        });
      }

      const user = new User({
        firstName,
        lastName,
        phone,
        username,
        password,
        createdAt: new Date().toISOString(),
      });
      const res = await user.save();

      // * generate JWT token
      const token = jwt.sign(
        {
          id: res.id,
          firstName: res.firstName,
          lastName: res.lastName,
          phone: res.phone,
          username: res.username,
        },
        process.env.JWT_SECRET || "somesecret",
        { expiresIn: "24h" }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};

module.exports = userResolver;
