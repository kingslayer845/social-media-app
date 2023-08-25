import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Post, { IPost } from "../models/Post";
import mongoose, { Schema } from "mongoose";
import CustomError from "../utils/CustomError";
import Like from "../models/Like";
function setImagesPath(posts: IPost[], hostName: string) {
  const port = process.env.PORT || 4000;
  const imageBaseUrl = `http://${hostName}:${port}/post-image`;
  posts.forEach((post) => (post.image = `${imageBaseUrl}/${post.image}`));
}
export const createUserPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { message } = req.body;
    if (!req.file) throw new CustomError("image is not provided", 400);
    const image = req.file.filename;
    const newPost = await Post.create({
      image,
      message,
      author: req.user.id,
    });

    res.status(201).json({
      data: { post: newPost },
    });
  }
);
export const getUserPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await Post.find({ author: req.user });

    res.status(200).json({
      data: { posts },
    });
  }
);

export const getAllPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await Post.postsWithIsLiked(req.user.id);
    setImagesPath(posts, req.hostname);
    res.status(200).json({
      posts: posts,
    });
  }
);

export const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;
    await Post.findByIdAndDelete(postId);
    await Like.deleteMany({ post: postId });

    res.status(200).json({});
  }
);
