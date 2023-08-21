import { useMutation, useQueryClient } from "react-query";
import { togglePostLike } from "../api/endpoints/posts";

export default () => {
  const queryClient = useQueryClient();

  return useMutation((postId: string) => togglePostLike(postId), {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });
};
