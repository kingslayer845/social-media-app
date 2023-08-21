import mongoose, { Schema, model, Document, Model } from "mongoose";
import isEmail from "validator/lib/isEmail";
import { compare, hash } from "bcryptjs";
import CustomError from "../utils/CustomError";
import FriendRequest from "./FriendRequest";
export interface IUser extends Document<mongoose.Types.ObjectId, any, any> {
  firstName: string;
  lastName: string;
  location: string;
  occupation: string;
  avatar: string;
  email: string;
  password: string;
  confirmPassword?: string;
  friendsInfo: {
    friends: mongoose.Types.ObjectId[];
    friendRequestsSent: mongoose.Types.ObjectId[];
    friendRequestsReceived: mongoose.Types.ObjectId[];
  };
}
interface IUserMethods {
  checkPassword(password: string): Promise<boolean>;
}

interface UserModel extends Model<IUser, {}, IUserMethods> {
  sendFriendRequest(
    senderId: mongoose.Types.ObjectId,
    receiverId: mongoose.Types.ObjectId
  ): Promise<void>;
  acceptFriendRequest(
    userId: mongoose.Types.ObjectId,
    requestId: mongoose.Types.ObjectId
  ): Promise<void>;
  declineFriendRequest(
    userId: mongoose.Types.ObjectId,
    requestId: mongoose.Types.ObjectId
  ): Promise<void>;
}

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    firstName: { type: String, required: [true, "Provide a firstName"] },
    lastName: { type: String, required: [true, "Provide a lastName"] },
    location: { type: String, required: [true, "Provide a location"] },
    avatar: {
      type: String,
      default: process.env.DEFAULT_USER_AVATAR,
    },
    occupation: String,
    email: {
      unique: true,
      type: String,
      required: [true, "Provide an email"],
      validate: [isEmail, "Invalid email format"],
    },
    password: {
      type: String,
      required: [true, "Provide a location"],
      min: [8, "Password must be 8 or more characters"],
      max: [20, "Password must be lower than 20 characters"],
      select: false,
    },
    confirmPassword: {
      type: String,
      validate: {
        validator: function (this: IUser, value: string): boolean {
          this as IUser;
          return value === this.password;
        },
        message: "Passwords do not match",
      },
    },
    friendsInfo: {
      friends: [{ type: mongoose.Types.ObjectId, ref: "User" }],

      friendRequestsReceived: [
        { type: mongoose.Types.ObjectId, ref: "FriendRequest" },
      ],
      friendRequestsSent: [
        { type: mongoose.Types.ObjectId, ref: "FriendRequest" },
      ],
    },
  },
  {
    toJSON: { versionKey: false, virtuals: true },
    toObject: { versionKey: false, virtuals: true },
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.method(
  "checkPassword",
  async function (enterdPassword: string): Promise<boolean> {
    return await compare(enterdPassword, this.password);
  }
);

userSchema.static(
  "sendFriendRequest",
  async function (
    this: UserModel,
    senderId: mongoose.Types.ObjectId,
    receiverId: mongoose.Types.ObjectId
  ): Promise<void> {
    if (senderId.equals(receiverId))
      throw new CustomError("you cant send a friend request to yourself", 400);
    const request = await FriendRequest.findOne({
      sender: senderId,
      receiver: receiverId,
    });
    if (request) throw new CustomError("Friend request already sent", 400);
    const [sender, receiver] = await Promise.all([
      this.findById(senderId),
      this.findById(receiverId),
    ]);

    if (!sender || !receiver) {
      throw new CustomError("User not found", 404);
    }

    if (
      sender.friendsInfo.friends.includes(receiverId) ||
      receiver.friendsInfo.friends.includes(senderId)
    ) {
      throw new CustomError("You are already friends", 400);
    }

    if (
      sender.friendsInfo.friendRequestsSent.includes(receiverId) ||
      receiver.friendsInfo.friendRequestsReceived.includes(senderId)
    ) {
      throw new CustomError(
        "A friend request has already been sent or received",
        400
      );
    }

    const friendRequest = await FriendRequest.create({
      sender: senderId,
      receiver: receiverId,
    });

    sender.friendsInfo.friendRequestsSent.push(friendRequest._id);
    receiver.friendsInfo.friendRequestsReceived.push(friendRequest._id);

    await Promise.all([sender.save(), receiver.save()]);
  }
);

userSchema.static(
  "acceptFriendRequest",
  async function (
    this: UserModel,
    userId: mongoose.Types.ObjectId,
    requestId: mongoose.Types.ObjectId
  ): Promise<void> {
    const receiver = await this.findById(userId);

    if (!receiver) {
      throw new CustomError("User not found", 404);
    }

    const request = await FriendRequest.findById(requestId);

    if (!request) {
      throw new CustomError("Friend request not found", 404);
    }

    if (request.sender.equals(userId)) {
      throw new CustomError(
        "You are not authorized to accept this request",
        403
      );
    }

    const sender = await this.findById(request.sender);
    if (sender) {
      receiver.friendsInfo.friends.push(sender._id);
      sender.friendsInfo.friends.push(userId);

      receiver.friendsInfo.friendRequestsReceived =
        receiver.friendsInfo.friendRequestsReceived.filter((r) =>
          r.equals(requestId)
        );
      sender.friendsInfo.friendRequestsSent =
        sender.friendsInfo.friendRequestsSent.filter((r) =>
          r.equals(requestId)
        );

      await receiver.save();
      await sender.save();
    }

    await FriendRequest.findByIdAndDelete(requestId);
  }
);
userSchema.static(
  "declineFriendRequest",
  async function (
    this: UserModel,
    userId: mongoose.Types.ObjectId,
    requestId: mongoose.Types.ObjectId
  ): Promise<void> {
    const [receiver, request] = await Promise.all([
      this.findById(userId),
      FriendRequest.findById(requestId),
    ]);

    if (!receiver || !request) {
      throw new CustomError("User or friend request not found", 404);
    }

    if (!request.receiver.equals(userId)) {
      throw new CustomError(
        "You are not authorized to decline this request",
        403
      );
    }

    const sender = await this.findById(request.sender);
    if (sender) {
      receiver.friendsInfo.friendRequestsReceived =
        receiver.friendsInfo.friendRequestsReceived.filter(
          (r) => !r.equals(requestId)
        );
      sender.friendsInfo.friendRequestsSent =
        sender.friendsInfo.friendRequestsSent.filter(
          (r) => !r.equals(requestId)
        );

      await Promise.all([receiver.save(), sender.save()]);
    }

    await FriendRequest.findByIdAndDelete(requestId);
  }
);
const populateFriendsInfoMiddleware = async function (
  this: IUser,
  next: () => void
) {
  this.populate({
    path: "friendsInfo.friendRequestsReceived",
    select: "sender -_id",
    populate: {
      path: "sender",
      select: "email fullName firstName id avatar",
    },
  });
  this.populate({
    path: "friendsInfo.friendRequestsSent",
    select: "receiver -_id",
    populate: {
      path: "receiver",
      select: "email fullName firstName id avatar",
    },
  });
  this.populate("friendsInfo.friends");

  next();
};

userSchema.pre(/^find(One|ById)/, populateFriendsInfoMiddleware);

const User = model<IUser, UserModel>("User", userSchema);

export default User;
