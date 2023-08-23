import API from "../API";
export interface Friend {
  requestId: string;
  email: string;
  fullName: string;
  id: string;
  avatar: string;
  occupation: string;
}

export interface FriendsAndRequestsType {
  friends: Friend[];
  friendRequestsSent: Friend[];
  friendRequestsReceived: Friend[];
}
export const sendFriendRequest = async (receiverId: string) => {
  const { data } = await API.post(`/friends/send-request`, { receiverId });
  return data;
};

export const getFriendsAndRequests = async () => {
  const { data } = await API.get("/friends/friends-requests");
  return data.friendsInfo;
  // Return the response data with the modified friendsInfo
};

export const acceptFriendRequest = async (requestId: string) => {
  const { data } = await API.post(`/friends/accept-request`, { requestId });
  return data;
};
export const declineFriendRequest = async (requestId: string) => {
  const { data } = await API.post(`/friends/decline-request`, { requestId });
  return data;
};

export const removeFriend = async (friendId: string) => {
  const { data } = await API.delete(`/friends/${friendId}`);
  return data;
};
