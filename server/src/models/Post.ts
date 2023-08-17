import { Document, InferSchemaType, Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    message: String,
    image: { type: String, required: [true, "Please provide a post image!"] },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Post author id is missing"],
    },
  },
  {
    toJSON: { versionKey: false, virtuals: true },
    toObject: { versionKey: false, virtuals: true },
  }
);


export type IPost = InferSchemaType<typeof postSchema> & Document;
postSchema.virtual("likes", {
  ref: "Like",
  localField: "_id",
  foreignField: "post",
  count:true
});

const Post = model<IPost>("Post", postSchema);

export default Post;
