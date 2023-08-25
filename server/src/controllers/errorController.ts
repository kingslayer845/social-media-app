import { Request, Response, NextFunction } from "express";
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken"; // Import JWT error types

export default (
  error: Error,
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

  res.status(400).json({
    error,
    message: error.message,
    stack: error.stack,
  });
};
