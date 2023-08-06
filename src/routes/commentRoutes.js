const express = require("express");
const router = express.Router();
const commentController = require("../controllers/CommentController");

// Route to create a new comment
router.post("/", commentController.createComment);

// Route to get all comments
router.get("/", commentController.getAllComments);

// Route to get a specific comment by Id
router.get("/:id", commentController.getCommentById);

// Route to update a comment
router.put("/:id", commentController.updateComment);

// Route to delete a comment
router.delete("/:id", commentController.deleteComment);

module.exports = router;
