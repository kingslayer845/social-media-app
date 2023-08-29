import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import User from "../models/User";
export const getUserProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId || req.user.id;
    const user = await User.findById(userId);

    res.status(200).json({
      user,
    });
  }
);