import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { IOrder } from "../types";

const orderSchema = new Schema<IOrder>({
  _id: {
    type: String,
    default: () => uuidv4().replace(/\-/g, ""),
  },
  UserId: {
    type: String,
    required: true,
  },
  OrderCartOrigin: {
    type: String,
    required: true,
  },
  OrderDate: {
    type: Date,
    required: true,
  },
  OrderTotalQuantity: {
    type: Number,
    required: true,
  },
  OrderTotalShipping: {
    type: Number,
    required: true,
  },
  OrderTotalProducts: {
    type: Number,
    required: true,
  },
  OrderTotalTaxes: {
    type: Number,
    required: true,
  },
  ShippingAddress: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
