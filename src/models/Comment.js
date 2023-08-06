const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Import the v4 function from the uuid package

const commentSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuidv4().replace(/\-/g, ""), // Generate a new UUID
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

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
