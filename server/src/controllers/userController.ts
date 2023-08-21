import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import User from "../models/User";
import CustomError from "../utils/CustomError";

export const getUserProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      user,
    });
  }
);
