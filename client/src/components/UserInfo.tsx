import React from "react";
import { useQuery } from "react-query";
import { getUser } from "../api/endpoints/auth";
import { CiLocationOn } from "react-icons/ci";
import { MdBusinessCenter } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
export interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  location: string;
  occupation: string;
  email: string;
  fullName: string;
  avatar: string;
  id: string;
  friendsInfo: {
    friendRequestsReceived: string[];
    friendRequestsSent: string[];
    friends: string[];
  };
}

const UserInfo: React.FC<{ userId?: string }> = ({ userId }) => {
  const { logout } = useAuth();
  const queryKey = userId ? ["userProfile", userId] : "myProfile";
  const {
    isSuccess,
    data: user,
    isLoading,
  } = useQuery<UserData>(queryKey, () => getUser(queryKey, userId));
  if (isLoading) return;

  if (isSuccess)
    return (
      <div className="bg-white p-5 rounded-lg">
        <div className="flex gap-5 border-b border-gray-400 py-3">
          <img className="rounded-full w-10 h-10" src={user.avatar} alt="avatar" />
          <div className="flex-1">
            <div className="flex justify-between">
              <h5 className="font-semibold capitalize text-sm">
                {user.fullName}
              </h5>
              <button
                onClick={logout}
                className="text-sm font-semibold bg-red-100 rounded-lg py-1 px-2 hover:bg-red-300"
              >
                Logout
              </button>
            </div>
            <p className="text-xs text-gray-500 font-semibold">
              {user.friendsInfo.friends.length} friends
            </p>
          </div>
        </div>
        <div>
          <div className="flex  items-center gap-3 px-2 py-3">
            <CiLocationOn size={25} />
            <p className="text-sm text-gray-500">{user.location}</p>
          </div>
          <div className="flex  items-center gap-3 px-2 py-3">
            <MdBusinessCenter size={25} />
            <p className="text-sm text-gray-500">{user.occupation}</p>
          </div>
        </div>
      </div>
    );
};

export default UserInfo;
