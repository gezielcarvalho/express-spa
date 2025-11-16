import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { ICartItem } from "../types";

const cartItemSchema = new Schema<ICartItem>({
  _id: {
    type: String,
    default: () => uuidv4().replace(/\-/g, ""),
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

const CartItem = mongoose.model<ICartItem>("CartItem", cartItemSchema);

export default CartItem;
