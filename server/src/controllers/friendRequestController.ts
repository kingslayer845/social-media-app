import express, { NextFunction, Request, Response } from "express";
import FriendRequest from "../models/FriendRequest";
import User from "../models/User";
import catchAsync from "../utils/catchAsync";
import CustomError from "../utils/CustomError";
import mongoose, { Schema } from "mongoose";
export interface Friend {
  email: string;
  fullName: string;
  id: string;
  avatar: string;
  occupation: string;
}
interface Receiver {
  id: string;
  receiver: Friend;
}
interface Sender {
  id: string;
  sender: Friend;
}
export interface FriendsAndRequestsType {
  friends: [];
  friendRequestsSent: Receiver[];
  friendRequestsReceived: Sender[];
}
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

export const removeFriend = catchAsync(async (req, res, next) => {
  const friendId = req.params.friendId;

  if (!mongoose.Types.ObjectId.isValid(friendId)) {
    throw new CustomError("Invalid friendId", 400);
  }

  const user = await User.findById(req.user.id);
  const friend = await User.findById(friendId);
  if (!user) {
    throw new CustomError("This user doesn't exist!", 404);
  }
  if (!friend) {
    throw new CustomError("This user's friend doesn't exist!", 404);
  }

  const friendIndex = user.friendsInfo.friends.findIndex((friend) =>
    friend.equals(friend._id)
  );

  if (friendIndex === -1) {
    throw new CustomError("Friend not found in the user's friend list", 404);
  }
  const userIndex = friend.friendsInfo.friends.findIndex((friend) =>
    friend.equals(user._id)
  );

  friend.friendsInfo.friends.splice(userIndex, 1);
  user.friendsInfo.friends.splice(friendIndex, 1);
  await user.save();
  await friend.save();
  res.status(200).json({
    message: "Friend removed successfully",
  });
});

export const getFriendsAndRequests = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = (await User.findById(req.user.id)
      .select("friendsInfo -_id")
      .populateFriendsInfo())!;
    const friendsInfo = user.friendsInfo as unknown as FriendsAndRequestsType;

    const modifiedFriendRequestsSent = friendsInfo.friendRequestsSent.map(
      (request) => ({
        requestId: request.id,
        fullName: request.receiver.fullName,
        email: request.receiver.email,
        id: request.receiver.id,
        avatar: request.receiver.avatar,
        occupation: request.receiver.occupation,
      })
    );

    const modifiedFriendRequestsReceived =
      friendsInfo.friendRequestsReceived.map((request) => ({
        requestId: request.id,
        fullName: request.sender.fullName,
        email: request.sender.email,
        id: request.sender.id,
        avatar: request.sender.avatar,
        occupation: request.sender.occupation,
      }));

    const modifiedFriendsInfo = {
      friends: friendsInfo.friends,
      friendRequestsSent: modifiedFriendRequestsSent,
      friendRequestsReceived: modifiedFriendRequestsReceived,
    };

    res.status(200).json({ friendsInfo: modifiedFriendsInfo });
  }
);
