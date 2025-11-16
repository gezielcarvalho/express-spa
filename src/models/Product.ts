import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { IProduct } from "../types";

const productSchema = new Schema<IProduct>({
  _id: {
    type: String,
    default: () => uuidv4().replace(/\-/g, ""),
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

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
