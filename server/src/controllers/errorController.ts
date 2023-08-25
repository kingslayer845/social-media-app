import { Request, Response, NextFunction } from "express";
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken"; // Import JWT error types
import CustomError from "../utils/CustomError";

export default (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof TokenExpiredError) {
    return res.status(401).json({ message: "Token expired" });
  }

  if (error instanceof JsonWebTokenError) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const err = {
    ...error,
    message: error.message,
    stack: error.stack,
    name: error.name,
  };

  if (error.isOperational) {
    res.status(error.statusCode).json({
      error,
      message: error.message,
      stack: error.stack,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};
