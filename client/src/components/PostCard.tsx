import { BsPersonAdd } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { UserData } from "./UserInfo";
import useLikePost from "../hooks/useLikePost";
import useAddFriend from "../hooks/useAddFriend";
import { Link } from "react-router-dom";
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
  userProfile,
}: {
  post: PostType;
  userProfile: UserData | undefined;
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
    <div className="bg-white p-5 rounded-lg space-y-4 dark:bg-dark-400 dark:text-gray-200">
      <div className="flex justify-between">
        <Link
          to={`${
            userProfile?.id === post.author.id ? "/profile" : `/${post.author.id}`
          }`}
        >
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
              <p className="text-xs text-gray-500 font-semibold ">
                {post.author.location}
              </p>
            </div>
          </div>
        </Link>
        {userProfile?.id !== post.author.id && (
          <button onClick={handleAddFriend} disabled={userProfile?.friendsInfo.friends.includes(post.author.id)}>
            <BsPersonAdd />
          </button>
        )}
      </div>
      {post.message && <p className=" py-3">{post.message}</p>}
      <img
        className="rounded-lg w-full h-full object-cover"
        src={post.image}
        alt="post image"
      />
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
