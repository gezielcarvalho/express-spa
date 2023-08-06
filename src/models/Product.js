const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Import the v4 function from the uuid package

const productSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuidv4().replace(/\-/g, ""), // Generate a new UUID
  },
  Name: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Shipping: {
    type: Number,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
