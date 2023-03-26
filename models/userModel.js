const mongooes = require("mongoose");

const userSchema = mongooes.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a username"],
    },
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "Email ID already taken"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongooes.model("User", userSchema);
