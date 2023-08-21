import { useState } from "react";
import { useQuery } from "react-query";
import {
  Friend,
  FriendsAndRequestsType,
  getFriendsAndRequests,
} from "../api/endpoints/friends";
import Avatar from "./Avatar";
enum tap {
  friends,
  sentRequests,
  receivedRequests,
}

export default function FriendRequestsAndFriends() {
  const [currentTap, setCurrentTap] = useState<tap>(tap.friends);
  const friendsQuery = useQuery("friends", getFriendsAndRequests);
  if (friendsQuery.isLoading) return;
  if (friendsQuery.isSuccess) {
    const friendsInfo = friendsQuery.data;
    const renderedTap = () => {
      switch (currentTap) {
        case tap.friends:
          return <FriendsTap friends={friendsInfo.friends} />;
        case tap.sentRequests:
          return (
            <SentRequestsTap
              friendRequestsSent={friendsInfo.friendRequestsSent}
            />
          );
      }
    };
    return (
      <div className="bg-white rounded-lg p-5">
        <ul className="flex justify-evenly">
          <li>
            <button
              className={`font-semibold  ${
                currentTap === tap.friends ? "text-blue-400" : ""
              }`}
              onClick={() => setCurrentTap(tap.friends)}
            >
              Friends
            </button>
          </li>
          {friendsInfo.friendRequestsSent.length > 0 && (
            <li>
              <button
                className={`font-semibold  ${
                  currentTap === tap.sentRequests ? "text-blue-400" : ""
                }`}
                onClick={() => setCurrentTap(tap.sentRequests)}
              >
                Pending
              </button>
            </li>
          )}
          {friendsInfo.friendRequestsReceived.length > 0 && (
            <li>
              <button
                className={`font-semibold  ${
                  currentTap === tap.receivedRequests ? "text-blue-400" : ""
                }`}
                onClick={() => setCurrentTap(tap.receivedRequests)}
              >
                Friend requests
              </button>
            </li>
          )}
        </ul>
        {renderedTap()}
      </div>
    );
  }
}

function FriendsTap({ friends }: { friends: Friend[] }) {
  if (friends.length === 0)
    return <p className="py-3">You don't have friends yet.</p>;
  return <div></div>;
}
function SentRequestsTap({
  friendRequestsSent,
}: {
  friendRequestsSent: any[];
}) {
  return (
    <div>
      {friendRequestsSent.map((friend) => (
        <div>
          <Avatar key={friend.id} friend={friend} />
        </div>
      ))}
    </div>
  );
}
