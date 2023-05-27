const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Enter your email"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Enter your password"],
      trim: true,
    },
    createdDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false }
);

const UsersModel = new mongoose.model("users", UsersSchema);

module.exports = UsersModel;
