import { useQuery } from "react-query";
import { getAllPosts } from "../../api/endpoints/posts";
import PostCard, { PostType } from "../../components/PostCard";

export default function PostsContainers() {
  const {
    data: posts,
    isSuccess,
    isLoading,
  } = useQuery<PostType[]>("posts", () => getAllPosts());
  if (isLoading) return;
  if (isSuccess)
    return (
      <div className="flex flex-col gap-5">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    );
}
