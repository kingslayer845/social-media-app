import { useQuery } from "react-query";
import CreatePost from "../../components/CreatePost";
import { getMyPosts } from "../../api/endpoints/posts";
import PostCard, { PostType } from "../../components/PostCard";
import UserInfo, { UserData } from "../../components/UserInfo";
import { getUser } from "../../api/endpoints/auth";

export default function MyProfile() {
  const postQuery = useQuery<PostType[]>("profilePosts", getMyPosts);
  const userQuery = useQuery<UserData>("myProfile", () => getUser("myProfile"));

  if (postQuery.isSuccess)
    return (
      <section className="max-w-sm mx-auto  md:max-w-lg lg:max-w-4xl py-5 lg:py-10 space-y-5 lg:grid lg:grid-cols-3 lg:space-y-0 lg:gap-5">
        <div className="hidden lg:block lg:col-span-1">

        <UserInfo />
        </div>
        <div className="space-y-5 lg:col-span-2">
          <CreatePost />
          <div className="flex flex-col gap-5">
            {postQuery.data.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                userProfile={userQuery.data}
              />
            ))}
          </div>
        </div>
      </section>
    );
}
