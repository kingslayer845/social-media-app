import { useQuery } from "react-query";
import PostCard, { PostType } from "../../components/PostCard";
import { UserData } from "../../components/UserInfo";
import { getUser } from "../../api/endpoints/auth";
import { getUserPosts } from "../../api/endpoints/posts";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { userId } = useParams();
  const postQuery = useQuery<PostType[]>("profilePosts", () =>
    getUserPosts(userId!)
  );
  const userQuery = useQuery<UserData>("userProfile", () => getUser("userProfile",userId));
  console.log(userId);

  if (postQuery.isSuccess)
    return (
      <section className="max-w-sm mx-auto space-y-5 py-5 md:max-w-lg lg:max-w-5xl lg:gap-5 lg:py-10 xl:max-w-7xl">
        <div className="flex flex-col gap-5">
          {postQuery.data.map((post) => (
            <PostCard key={post.id} post={post} userProfile={userQuery.data} />
          ))}
        </div>
      </section>
    );
}
