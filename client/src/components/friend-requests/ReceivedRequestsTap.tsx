import { Friend } from "../../api/endpoints/friends";
import useAcceptFriend from "../../hooks/useAcceptFriend";
import useDeclineFriend from "../../hooks/useDeclineFriend";

export default function ReceivedRequestsTap({
  friendRequestsReceived,
}: {
  friendRequestsReceived: Friend[];
}) {
  const acceptFriendMutation = useAcceptFriend();
  const declineFriendMutation = useDeclineFriend();
  const handleAcceptBtn = (requestId: string) => {
    acceptFriendMutation.mutate(requestId);
  };

  const handleDeclineBtn = (requestId: string) => {
    declineFriendMutation.mutate(requestId);
  };
  return (
    <div className="flex flex-col gap-1">
      {friendRequestsReceived.map((friend) => (
        <div key={friend.id} className="border-b border-gray-200 py-3 flex justify-between items-center pr-5">
          <div className="flex gap-5 ">
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
          <div className="space-x-3">
            <button
              onClick={() => handleAcceptBtn(friend.requestId)}
              className=" bg-blue-100 hover:opacity-75 text-blue-500 rounded-lg px-3 py-1 font-semibold text-xs "
            >
              Accept
            </button>
            <button
              onClick={() => handleDeclineBtn(friend.requestId)}
              className=" bg-red-100 hover:opacity-75 text-red-500 rounded-lg px-3 py-1 font-semibold text-xs "
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
