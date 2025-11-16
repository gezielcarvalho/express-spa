import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  FullName: string;
  UserName: string;
  Email: string;
  Password: string;
  Address: string;
}

export interface IProduct extends Document {
  _id: string;
  Name: string;
  Description: string;
  Price: number;
  Shipping: number;
  Image: string;
}

export interface ICart extends Document {
  _id: string;
  UserId: number;
  ProductQuantity: number;
  Status: string;
}

export interface ICartItem extends Document {
  _id: string;
  CartId: string;
  ProductId: string;
  ProductQuantity: number;
  ProductPrice: number;
  ProductShipping: number;
}

export interface IOrder extends Document {
  _id: string;
  UserId: string;
  OrderCartOrigin: string;
  OrderDate: Date;
  OrderTotalQuantity: number;
  OrderTotalShipping: number;
  OrderTotalProducts: number;
  OrderTotalTaxes: number;
  ShippingAddress: string;
}

export interface IComment extends Document {
  _id: string;
  ProductId: string;
  OrderId: string;
  CommentText: string;
  Image: string;
  Rating: number;
}
