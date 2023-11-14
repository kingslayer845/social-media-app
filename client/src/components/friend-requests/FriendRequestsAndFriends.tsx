import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  FriendsAndRequestsType,
  getFriendsAndRequests,
} from "../../api/endpoints/friends";
import FriendsTap from "./FriendsTap";
import SentRequestsTap from "./SentRequestsTap";
import ReceivedRequestsTap from "./ReceivedRequestsTap";

enum tap {
  friends,
  sentRequests,
  receivedRequests,
}
export default function FriendRequestsAndFriends() {
  const [currentTap, setCurrentTap] = useState<tap>(tap.friends);
  const friendsQuery = useQuery<FriendsAndRequestsType>(
    "friends",
    getFriendsAndRequests
  );

  useEffect(() => {
    setCurrentTap(tap.friends);
  }, [friendsQuery.data]);

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
        case tap.receivedRequests:
          return (
            <ReceivedRequestsTap
              friendRequestsReceived={friendsInfo.friendRequestsReceived}
            />
          );
      }
    };
    return (
      <div className="bg-white rounded-lg p-5 dark:bg-dark-400">
        <ul className="flex justify-evenly border-b pb-3 dark:border-dark-100">
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
