import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "../types";

// Create a schema
const userSchema = new Schema<IUser>({
  _id: {
    type: String,
    default: uuidv4,
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
const User = mongoose.model<IUser>("User", userSchema);

export default User;
