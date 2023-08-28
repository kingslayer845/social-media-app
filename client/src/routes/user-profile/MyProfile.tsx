import { useQuery } from "react-query";
import CreatePost from "../../components/CreatePost";
import { getMyPosts } from "../../api/endpoints/posts";
import PostCard, { PostType } from "../../components/PostCard";
import { UserData } from "../../components/UserInfo";
import { getUser } from "../../api/endpoints/auth";

export default function MyProfile() {
  const postQuery = useQuery<PostType[]>("profilePosts", getMyPosts);
  const userQuery = useQuery<UserData>("myProfile", () => getUser("myProfile"));

  if (postQuery.isSuccess)
    return (
      <section>
        <CreatePost />
        <div>
          {postQuery.data.map((post) => (
            <PostCard key={post.id} post={post} userProfile={userQuery.data} />
          ))}
        </div>
      </section>
    );
}