const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Import the v4 function from the uuid package

const cartItemSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuidv4().replace(/\-/g, ""), // Generate a new UUID
  },
  CartId: {
    type: String,
    required: true,
  },
  ProductId: {
    type: String,
    required: true,
  },
  ProductQuantity: {
    type: Number,
    required: true,
  },
  ProductPrice: {
    type: Number,
    required: true,
  },
  ProductShipping: {
    type: Number,
    required: true,
  },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;
