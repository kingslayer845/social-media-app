import API from "../API";
export const createPost = async (formData: FormData) => {
  const { data } = await API.post("/posts", formData);
  return data;
};
export const getAllPosts = async () => {
  const { data } = await API.get("/posts");
  return data.posts;
};
export const getUserPosts = async (userId: string) => {
  const { data } = await API.get(`/users/${userId}/posts`);
  return data.posts;
};
export const getMyPosts = async () => {
  const { data } = await API.get("/users/profile/posts");
  return data.posts;
};
export const togglePostLike = async (postId: string) => {
  const { data } = await API.post(`/posts/${postId}/toggle-like`);
  return data;
};
