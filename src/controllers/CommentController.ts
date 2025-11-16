import { Request, Response } from "express";
import Comment from "../models/Comment";

// Controller for creating a new comment
export const createComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  let uploadPath;
  let imageName = "default.jpg";
  if (
    !req.files ||
    Object.keys(req.files).length === 0 ||
    !(req.files.Image as any)?.name.match(/\.(jpg|jpeg|png)$/i)
  ) {
    console.log("No image files were uploaded.");
  } else {
    const Image = req.files.Image as any;
    imageName = `${Date.now()}-${Image.name}`;
    console.log(imageName);
    uploadPath = "./public/images/comments/" + imageName;
    Image.mv(uploadPath, async (err: any) => {
      if (err) {
        console.log(err);
      }
    });
  }
  try {
    const { ProductId, OrderId, CommentText, Rating } = req.body;
    const newComment = await Comment.create({
      ProductId,
      OrderId,
      CommentText,
      Image: imageName,
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
export const getAllComments = async (
  req: Request,
  res: Response
): Promise<void> => {
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
export const getCommentById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      res.status(404).json({ message: "Comment not found." });
      return;
    }
    // destructure the new comment object to omit the __v and _id fields and include the Id field with the _id value
    const { __v, _id, ...commentFormatted } = comment.toObject();
    res.status(200).json({ Id: _id, ...commentFormatted });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller for updating a comment
export const updateComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const commentId = req.params.id;
    const { ProductId, OrderId, CommentText, Rating } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { ProductId, OrderId, CommentText, Rating },
      { new: true }
    );
    if (!updatedComment) {
      res.status(404).json({ message: "Comment not found." });
      return;
    }
    const { __v, _id, ...commentFormatted } = updatedComment.toObject();
    res.status(200).json({ Id: _id, ...commentFormatted });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller for deleting a comment
export const deleteComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const commentId = req.params.id;
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      res.status(404).json({ message: "Comment not found." });
      return;
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error });
  }
};
