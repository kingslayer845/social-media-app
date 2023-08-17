import mongoose, { Document, Schema, model } from "mongoose";

interface IFriendRequest extends Document {
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  createdAt: Date;
}

const friendRequestSchema = new Schema<IFriendRequest>({
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
  
  createdAt: { type: Date, default: Date.now },
});

const FriendRequest = model<IFriendRequest>(
  "FriendRequest",
  friendRequestSchema
);

export default FriendRequest;
