const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Import the v4 function from the uuid package

const orderSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuidv4().replace(/\-/g, ""), // Generate a new UUID
  },
  UserId: {
    type: String,
    required: true,
  },
  OrderDate: {
    type: Date,
    required: true,
  },
  ProductsTotal: {
    type: Number,
    required: true,
  },
  ShippingTotal: {
    type: Number,
    required: true,
  },
  OrderTotal: {
    type: Number,
    required: true,
  },
  ShippingAddress: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
