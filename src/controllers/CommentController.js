const Comment = require("../models/Comment");

// Controller for creating a new comment
const createComment = async (req, res) => {
  try {
    const { ProductId, OrderId, CommentText, Image, Rating } = req.body;
    const newComment = await Comment.create({
      ProductId,
      OrderId,
      CommentText,
      Image,
      Rating,
    });
    // destructure the new comment object to omit the __v and _id fields
    const { __v, _id, ...comment } = newComment.toObject();
    res.status(201).json({ Id: _id, ...comment });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller for getting all comments
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    // destructure the new comment object to omit the __v and _id fields and include the Id field with the _id value
    const commentsFormatted = comments.map((comment) => {
      const { __v, _id, ...commentFormatted } = comment.toObject();
      return { Id: _id, ...commentFormatted };
    });
    res.status(200).json(commentsFormatted);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller for getting a specific comment by Id
const getCommentById = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }
    // destructure the new comment object to omit the __v and _id fields and include the Id field with the _id value
    const { __v, _id, ...commentFormatted } = comment.toObject();
    res.status(200).json({ Id: _id, ...commentFormatted });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller for updating a comment
const updateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const { ProductId, OrderId, CommentText, Image, Rating } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { ProductId, OrderId, CommentText, Image, Rating },
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found." });
    }
    const { __v, _id, ...commentFormatted } = updatedComment.toObject();
    res.status(200).json({ Id: _id, ...commentFormatted });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller for deleting a comment
const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found." });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
};
