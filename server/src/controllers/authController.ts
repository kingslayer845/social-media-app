import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import User from "../models/User";
import { Document } from "mongoose";
import jwt from "jsonwebtoken";
import CustomError from "../utils/CustomError";
import { promisify } from "util";
import { verifyJwt } from "../utils/verifyJwt";

function createAndSendToken(
  user: Document,
  res: Response,
  statusCode: number = 200
) {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const userWithoutPassword = { ...user.toObject() };
  userWithoutPassword.password = undefined;

  res.status(statusCode).json({
    token,
    user: userWithoutPassword,
  });
}

export const signupUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      location,
      occupation,
      avatar,
    } = req.body;
    const newUser = await User.create({
      fullName: `${firstName} ${lastName}`,
      email,
      password,
      confirmPassword,
      location,
      occupation,
      avatar,
    });
    createAndSendToken(newUser, res, 201);
  }
);

export const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      email,
      password,
    }: { email: string | undefined; password: string | undefined } = req.body;
    if (!email || !password)
      throw new CustomError("email or password is missing!", 400);

    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new CustomError("incorrect email or password", 400);
    const pwdMatch = await user.checkPassword(password);
    if (!pwdMatch) throw new CustomError("incorrect email or password", 400);
    createAndSendToken(user, res);
  }
);

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer"))
      throw new CustomError("Provide a valid token!", 400);
    token = token.split(" ")[1];
    const decoded = (await verifyJwt(
      token,
      process.env.JWT_SECRET as string
    )) as jwt.JwtPayload;
    if (!decoded) throw new CustomError("Provide a valid token!", 400);

    const user = await User.findById(decoded.id);
    if (!user) throw new CustomError("The token's user no longer exists", 401);
    // if (user.changedPasswordAfter(decoded.iat))
    //   throw new CustomError("User changed password", 400);

    req.user = user;
    next();
  }
);
