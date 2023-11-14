import { Friend } from "../../api/endpoints/friends";
import useRemoveFriend from "../../hooks/useRemoveFriend";

export default function FriendsTap({ friends }: { friends: Friend[] }) {
  if (friends.length === 0)
    return <p className="py-3">You don't have friends yet.</p>;

  const removeFriendQuery = useRemoveFriend();
  const handleRemoveBtn = (friendId: string) => {
    removeFriendQuery.mutate(friendId);
  };

  return (
    <div className="flex flex-col gap-1 dark:text-gray-200">
      {friends.map((friend) => (
        <div
          key={friend.id}
          className="flex justify-between items-center pr-5 border-b border-gray-200 py-3 dark:border-dark-100"
        >
          <div className=" flex gap-5">
            <img
              className="rounded-full w-10 h-10"
              src={friend.avatar}
              alt=""
            />
            <div>
              <h5 className="font-semibold capitalize text-sm">
                {friend.fullName}
              </h5>
              <span className="text-xs font-semibold text-gray-500">
                {friend.occupation}
              </span>
            </div>
          </div>
          <button
            onClick={() => handleRemoveBtn(friend.id)}
            className=" bg-red-100 hover:opacity-75 text-red-500 rounded-lg px-3 py-1 font-semibold text-xs dark:text-white dark:bg-red-600 dark:hover:bg-red-800"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
