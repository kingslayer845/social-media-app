import { BsPersonAdd } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { UserData } from "./UserInfo";
import useLikePost from "../hooks/useLikePost";
import useAddFriend from "../hooks/useAddFriend";
export type PostType = {
  author: {
    id: string;
    avatar: string;
    fullName: string;
    location: string;
  };
  message?: string;

  id: string;
  image: string;
  likes: number;
  isLiked: boolean;
};

const PostCard = ({
  post,
  myProfile,
}: {
  post: PostType;
  myProfile: UserData | undefined;
}) => {
  const likeQuery = useLikePost();
  const friendQuery = useAddFriend();

  function handleLikeBtn() {
    likeQuery.mutate(post.id);
  }
  function handleAddFriend() {
    friendQuery.mutate(post.author.id);
  }
  return (
    <div className="bg-white p-5 rounded-lg space-y-4">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <img
            className="w-10 h-10 rounded-full"
            src={post.author.avatar}
            alt=""
          />
          <div>
            <h5 className="font-semibold capitalize text-sm">
              {post.author.fullName}
            </h5>
            <p className="text-xs text-gray-500 font-semibold">
              {post.author.location}
            </p>
          </div>
        </div>
        {myProfile?.id !== post.author.id && (
          <button onClick={handleAddFriend}>
            <BsPersonAdd />
          </button>
        )}
      </div>
      {post.message && <p className="text-sm py-3">{post.message}</p>}
      <img className="rounded-lg" src={post.image} alt="" />
      <div>
        <button
          onClick={handleLikeBtn}
          disabled={likeQuery.isLoading}
          className="flex gap-1 items-center"
        >
          {post.isLiked ? <AiFillHeart color={"red"} /> : <AiOutlineHeart />}
          <span className="text-xs">{post.likes}</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
