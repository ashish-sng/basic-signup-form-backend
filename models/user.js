const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide your name"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Please provide your username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;