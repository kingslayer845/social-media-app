import { useMutation, useQueryClient } from "react-query";
import { removeFriend } from "../api/endpoints/friends";

export default () => {
  const queryClient = useQueryClient();
  return useMutation((friendId: string) => removeFriend(friendId), {
    onSuccess: () => {
      queryClient.invalidateQueries("friends");
    },
  });
};
