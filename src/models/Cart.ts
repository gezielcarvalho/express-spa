import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { ICart } from "../types";

// Define the schema for the Cart model
const cartSchema = new Schema<ICart>({
  _id: {
    type: String,
    default: uuidv4,
  },
  UserId: { type: Number, required: true },
  ProductQuantity: { type: Number, required: true },
  Status: { type: String, required: true },
});

// Create the Cart model using the schema
const Cart = mongoose.model<ICart>("Cart", cartSchema);

export default Cart;
