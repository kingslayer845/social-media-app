import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import Post from "../models/Post";
import CustomError from "../utils/CustomError";
import Like from "../models/Like";

export const toggleLike = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;
    const userId = req.user._id;
    const post = await Post.findById(postId);
    if (!post) {
      throw new CustomError("Post not found", 404);
    }
    const existingLike = await Like.findOne({ user: userId, post: postId });
    if (existingLike) {
      await existingLike.deleteOne();
      res.status(200).json({
        status: "success",
        message: "removed like",
      });
    } else {
      await Like.create({ user: userId, post: postId });
      res.status(200).json({
        status: "success",
        message: "added like",
      });
    }
  }
);
