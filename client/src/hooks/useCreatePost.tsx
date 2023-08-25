import { useMutation, useQueryClient } from "react-query";
import { createPost } from "../api/endpoints/posts";

export default () => {
  const queryClient = useQueryClient();
  return useMutation((data: FormData) => createPost(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });
};
