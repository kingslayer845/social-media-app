import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import User from "../models/User";
import CustomError from "../utils/CustomError";

export const getUserProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user.id)
    //   .populate({
    //     path: "friendsInfo.friendRequestsReceived",
    //     select: "sender -_id",
    //   })
    //   .populate({
    //     path: "friendsInfo.friendRequestsSent",
    //     select: "receiver -_id",
    //   })
    //   .populate("friendsInfo.friends");
    // if (!user) throw new CustomError("User not found!", 400);
    // user = await user.populate(
    //   "friendsInfo.friendRequestsSent.receiver",
    //   "email fullName id"
    // );

    // user = await user.populate(
    //   "friendsInfo.friendRequestsReceived.sender",
    //   "email fullName id"
    // );

    res.status(200).json({
      user
    });
  }
);
