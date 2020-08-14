const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  password: String,
  username: String,
  createdAt: String,
});

// hash the password before saving
userSchema.pre("save", function () {
  const hashedPassword = bcrypt.hashSync(this.password, 10);
  this.password = hashedPassword;
});

const user = mongoose.model("User", userSchema);

module.exports = user;
