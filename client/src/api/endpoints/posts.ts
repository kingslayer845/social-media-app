import API from "../API";

export const getAllPosts = async () => {
  const { data } = await API.get("/posts");
  return data.posts;
};
export const togglePostLike = async (postId: string) => {
  const { data } = await API.post(`/posts/${postId}/toggle-like`);
  return data;
};
