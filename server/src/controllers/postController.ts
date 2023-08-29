import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Post, { IPost } from "../models/Post";
import mongoose, { Schema } from "mongoose";
import CustomError from "../utils/CustomError";
import Like from "../models/Like";
import _ from "lodash"; // Import the lodash library

const getLikedPostIds = async (userId: string) => {
  const likedPosts = await Like.find({ user: userId }).distinct("post");
  return likedPosts.map<string>((id) => id.toString());
};

const formatImageUrls = (hostName: string, posts: IPost[]) => {
  const port = process.env.PORT || 4000;
  const imageBaseUrl = `http://${hostName}:${port}/post-image`;

  return posts.map<any>((post) => ({
    ...post.toObject(),
    image: `${imageBaseUrl}/${post.image}`,
  }));
};

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
    const userId = req.params.userId || req.user.id;

    const posts = await Post.find({ author: userId })
      .populate("likes")
      .populate("author", "-friendsInfo")
      .sort("likes");
    const likedPostIds = await getLikedPostIds(req.user.id);

    const postsWithIsLiked = formatImageUrls(req.hostname, posts).map(
      (post) => ({
        ...post,
        isLiked: likedPostIds.includes(post._id.toString()),
      })
    );
    const sortedPosts = _.orderBy(postsWithIsLiked, ["likes"], ["desc"]);

    res.status(200).json({
      posts: sortedPosts,
    });
  }
);

export const getAllPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts: IPost[] = await Post.find()
      .populate("likes")
      .populate("author", "-friendsInfo");

    const likedPostIds = await getLikedPostIds(req.user.id);

    const postsWithIsLiked = formatImageUrls(req.hostname, posts).map(
      (post) => ({
        ...post,
        isLiked: likedPostIds.includes(post._id.toString()),
      })
    );
    const sortedPosts = _.orderBy(postsWithIsLiked, ["likes"], ["desc"]);
    res.status(200).json({
      posts: sortedPosts,
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
