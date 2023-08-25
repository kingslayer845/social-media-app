import mongoose, {
  Document,
  InferSchemaType,
  Model,
  Schema,
  model,
} from "mongoose";
import Like from "./Like";
export interface IPost extends Document {
  message?: string;
  author: mongoose.Types.ObjectId;
  image: string;
}

interface PostModel extends Model<IPost> {
  postsWithIsLiked(userId: mongoose.ObjectId): Promise<IPost[]>;
}
const postSchema = new Schema<IPost, PostModel>(
  {
    message: String,
    image: {
      type: String,

      required: [true, "Please provide a post image!"],
    },
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

postSchema.virtual("likes", {
  ref: "Like",
  localField: "_id",
  foreignField: "post",
  count: true,
});
postSchema.static(
  "postsWithIsLiked",
  async function (this: PostModel, userId: mongoose.Types.ObjectId) {
    const posts: IPost[] = await this.find()
      .populate("likes")
      .populate("author", "-friendsInfo");

    if (posts.length === 0) return posts;

    const likedPosts = await Like.find({
      user: userId,
    }).distinct("post");

    if (likedPosts.length === 0) return posts;
    const likedPostIds = likedPosts.map((id) => id.toString());
    const postsWithIsLiked = posts.map((post) => ({
      ...post.toObject(),
      isLiked: likedPostIds.includes(post._id.toString()),
    }));

    return postsWithIsLiked;
  }
);


const Post = model<IPost, PostModel>("Post", postSchema);

export default Post;
