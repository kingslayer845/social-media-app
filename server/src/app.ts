import express, { NextFunction } from "express";
import userRouter from "./routes/userRoutes";
import postRouter from "./routes/postRoutes";
import friendRequestRouter from "./routes/friendRequestRouter";
import globalErrorHandler from "./controllers/errorController";
import CustomError from "./utils/CustomError";
import cors from "cors";
import path from "path";

const app = express();
//middlewares
// Serve uploaded images from the "uploads" directory
app.use(express.static("public"));
app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/friends", friendRequestRouter);
app.use("*", (req, res, next) => {
  next(new CustomError(`Cant find ${req.originalUrl} on the server`, 404));
});
app.use(globalErrorHandler);
export default app;
