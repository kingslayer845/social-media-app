import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Post from "../models/Post";
import mongoose, { Schema } from "mongoose";
import CustomError from "../utils/CustomError";
import Like from "../models/Like";

export const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newPost = await Post.create(req.body);
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
    const posts =await Post.postsWithIsLiked(req.user.id);
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
