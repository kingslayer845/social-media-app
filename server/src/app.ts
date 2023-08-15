import express, { NextFunction } from "express";
import userRouter from "./routes/userRoutes";
import globalErrorHandler from "./controllers/errorController";
import CustomError from "./utils/CustomError";
import cors from "cors";

const app = express();
//middlewares
app.use(cors());
app.use(express.json());
//routes
app.use("/api/v1/users", userRouter);
app.use("*", (req, res, next) => {
  next(new CustomError(`Cant find ${req.originalUrl} on the server`, 404));
});
app.use(globalErrorHandler);
export default app;
