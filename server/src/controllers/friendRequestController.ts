import express, { NextFunction, Request, Response } from "express";
import FriendRequest from "../models/FriendRequest";
import User from "../models/User";
import catchAsync from "../utils/catchAsync";
import CustomError from "../utils/CustomError";
import mongoose from "mongoose";

export const sendFriendRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const senderId = new mongoose.Types.ObjectId(req.user.id);
    const receiverId = new mongoose.Types.ObjectId(req.body.receiverId);

    if (!receiverId) {
      throw new CustomError("receiverId is not provided!", 400);
    }

    await User.sendFriendRequest(senderId, receiverId);
    res.status(201).json({ message: "Friend request sent successfully" });
  }
);

export const acceptRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { requestId } = req.body;
    const userId = req.user.id;

    if (!requestId) throw new CustomError("requestId is missing!", 400);

    await User.acceptFriendRequest(userId, requestId);
    res.status(200).json({ message: "Friend request accepted" });
  }
);

export const declineRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { requestId } = req.body;
    const receiverId = req.user.id;

    if (!requestId) {
      throw new CustomError("requestId is missing!", 400);
    }

    await User.declineFriendRequest(receiverId, requestId);
    res.status(200).json({ message: "Friend request declined" });
  }
);

export const removeFriend = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { friendId } = req.body;
    if (!friendId) throw new CustomError("friendId is missing", 400);
    const user = (await User.findById(req.user.id))!;

    const friendIndex = user.friendsInfo.friends.indexOf(friendId);

    if (friendIndex === -1) {
      throw new CustomError("Friend not found in the user's friend list", 404);
    }

    user.friendsInfo.friends.splice(friendIndex, 1);
    await user.save();

    res.status(200).json({
      message: "Friend removed successfully",
    });
  }
);

export const getFriendsAndRequests = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user.id).select("friendsInfo -_id");
    
    res.status(200).json({
      friendsInfo: user?.friendsInfo,
    });
  }
);
