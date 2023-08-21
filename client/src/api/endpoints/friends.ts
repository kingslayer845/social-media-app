import API from "../API";
export interface Friend {
  email: string;
  firstName: string;
  id: string;
  avatar: string;
}
interface Receiver {
  receiver: Friend;
}
interface Sender {
  sender: Friend;
}
export interface FriendsAndRequestsType {
  friends: [];
  friendRequestsSent: Receiver[];
  friendRequestsReceived: Sender[];
}
export const sendFriendRequest = async (receiverId: string) => {
  const { data } = await API.post(`/friends/send-request`, { receiverId });
  return data;
};

export const getFriendsAndRequests = async () => {
  const { data } = await API.get("/friends/friends-requests");
  const friendsInfo: FriendsAndRequestsType = data.friendsInfo;
  const modifiedFriendRequestsSent = friendsInfo.friendRequestsSent.map(
    (request) => ({
      email: request.receiver.email,
      id: request.receiver.id,
      avatar: request.receiver.avatar,
    })
  );
  const modifiedFriendRequestsReceived = friendsInfo.friendRequestsReceived.map(
    (request) => ({
      email: request.sender.email,
      id: request.sender.id,
      avatar: request.sender.avatar,
    })
  );
  // Create the modified friendsInfo object in the response data
  return {
    friends: friendsInfo.friends,
    friendRequestsSent: modifiedFriendRequestsSent,
    friendRequestsReceived: modifiedFriendRequestsReceived,
  };

  // Return the response data with the modified friendsInfo
};
