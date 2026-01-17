const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: function () {
      return this.authProvider === "local";
    },
  },

  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },

  role: {
    type: String,
    default: "user",
  },
});

module.exports = mongoose.model("User", UserSchema);
