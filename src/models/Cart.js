const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Import the v4 function from the uuid package

// Define the schema for the Cart model
const cartSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4, // Use uuidv4 to generate a new unique ID
  },
  UserId: { type: Number, required: true },
  ProductQuantity: { type: Number, required: true },
  Status: { type: String, required: true },
});

// Create the Cart model using the schema
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
