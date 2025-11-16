import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { IComment } from "../types";

const commentSchema = new Schema<IComment>({
  _id: {
    type: String,
    default: () => uuidv4().replace(/\-/g, ""),
  },
  ProductId: {
    type: String,
    required: true,
  },
  OrderId: {
    type: String,
    required: true,
  },
  CommentText: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
  Rating: {
    type: Number,
    required: true,
  },
});

const Comment = mongoose.model<IComment>("Comment", commentSchema);

export default Comment;
