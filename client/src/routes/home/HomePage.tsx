import UserInfo from "../../components/UserInfo";
import PostsContainers from "./PostsContainers";

export default function HomePage() {
  return (
    <section className=" max-w-sm mx-auto space-y-5 py-5" >
      <UserInfo />
      <PostsContainers />
    </section>
  );
}
