import CreatePost from "../../components/CreatePost";
import FriendRequestsAndFriends from "../../components/friend-requests/FriendRequestsAndFriends";
import UserInfo from "../../components/UserInfo";
import PostsContainers from "./PostsContainers";

export default function HomePage() {
  return (
    <section className="max-w-sm mx-auto space-y-5 py-5 md:max-w-lg lg:max-w-5xl lg:grid lg:grid-cols-7 lg:gap-5 lg:space-y-0 lg:py-10 xl:max-w-7xl xl:grid-cols-10 px-3 ">
      <div className="lg:col-span-2 lg:block hidden xl:col-span-3">
        <UserInfo />
      </div>
      <div className="space-y-5  lg:col-span-3 xl:col-span-4">
        <CreatePost />
        <PostsContainers />
      </div>
      <div className="space-y-5 lg:col-span-2 lg:block hidden xl:col-span-3">
        <FriendRequestsAndFriends />
      </div>
    </section>
  );
}
