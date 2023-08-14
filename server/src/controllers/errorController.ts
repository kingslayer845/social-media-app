import { Request, Response, NextFunction } from "express";

export default (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(400).json({
    error,
    message: error.message,
    stack: error.stack,
  });
};
