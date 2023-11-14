import { useQuery } from "react-query";
import PostCard, { PostType } from "../../components/PostCard";
import UserInfo, { UserData } from "../../components/UserInfo";
import { getUser } from "../../api/endpoints/auth";
import { getUserPosts } from "../../api/endpoints/posts";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { userId } = useParams();
  const postQuery = useQuery<PostType[]>("profilePosts", () =>
    getUserPosts(userId!)
  );
  const userQuery = useQuery<UserData>("userProfile", () =>
    getUser("userProfile", userId)
  );
  console.log(userId);

  if (postQuery.isSuccess)
    return (
      <section className="max-w-sm mx-auto py-5 md:max-w-lg lg:max-w-4xl lg:gap-5 lg:py-10 lg:grid lg:grid-cols-3">
        <div className="col-span-1">

        <UserInfo userId={userId} />
        </div>
        <div className="flex flex-col  lg:col-span-2">
          {postQuery.data.map((post) => (
            <PostCard key={post.id} post={post} userProfile={userQuery.data} />
          ))}
        </div>
      </section>
    );
}
