const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Import the v4 function from the uuid package

// Create a schema
const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4, // Use uuidv4 to generate a new unique ID
  },
  FullName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  UserName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  Email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 1024,
  },
  Address: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
});

// Create a model
const User = mongoose.model("User", userSchema);

module.exports = User;
