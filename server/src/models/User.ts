import { Schema, model, Document, Model } from "mongoose";
import isEmail from "validator/lib/isEmail";
import { compare, hash } from "bcryptjs";
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  location: string;
  occupation: string;
  avatar: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
interface IUserMethods {
  checkPassword(password: string): Promise<boolean>;
}
type UserModel = Model<IUser, {}, IUserMethods>;

const userShema = new Schema<IUser, UserModel, IUserMethods>(
  {
    firstName: { type: String, required: [true, "Provide a firstName"] },
    lastName: { type: String, required: [true, "Provide a lastName"] },
    location: { type: String, required: [true, "Provide a location"] },
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
  },
  {
    toJSON: { versionKey: false, virtuals: true },
    toObject: { versionKey: false, virtuals: true },
  }
);
userShema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userShema.method(
  "checkPassword",
  async function (enterdPassword: string): Promise<boolean> {
    console.log(this.password);
    
    return await compare(enterdPassword, this.password);
  }
);
const User = model<IUser, UserModel>("User", userShema);

export default User;
