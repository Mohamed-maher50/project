const mongoose = require("mongoose");
const { isEmail } = require("validator");
const { hastPassword } = require("../utils/hashPassword");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last Name"],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email"],
    trim: true,
    validate: [isEmail, "invalid email"],
  },
  password: {
    type: String,
    required: [true, "password"],
  },
});

userSchema.pre("save", async function () {
  this.password = await hastPassword(this.password);
});

module.exports = mongoose.model("Users", userSchema);
