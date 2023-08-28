import { useQuery } from "react-query";
import { getAllPosts } from "../../api/endpoints/posts";
import PostCard, { PostType } from "../../components/PostCard";
import { UserData } from "../../components/UserInfo";
import { getUser } from "../../api/endpoints/auth";

export default function PostsContainers() {
  const postsQuery = useQuery<PostType[]>("posts", () => getAllPosts());
  const userQuery = useQuery<UserData>("myProfile", () => getUser("myProfile"));
  if (postsQuery.isLoading) return;
  if (postsQuery.isSuccess)
    return (
      <div className="flex flex-col gap-5">
        {postsQuery.data.map((post) => (
          <PostCard key={post.id} post={post} userProfile={userQuery.data} />
        ))}
      </div>
    );
}
