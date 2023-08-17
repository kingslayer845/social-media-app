import mongoose, { Schema, model } from "mongoose";
import { IPost } from "./Post";
import { IUser } from "./User";

export interface ILike extends Document {
  user: IUser["_id"];
  post: IPost["_id"];
}

const likeSchema = new Schema<ILike>({
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  post: { type: mongoose.Types.ObjectId, ref: "Post" },
});

const Like = model<ILike>("Like", likeSchema);
export default Like;
