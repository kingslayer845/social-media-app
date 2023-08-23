import { useMutation, useQueryClient } from "react-query";
import { declineFriendRequest } from "../api/endpoints/friends";

export default () => {
  const queryClient = useQueryClient();

  return useMutation((requestId: string) => declineFriendRequest(requestId), {
    onSuccess: () => {
      queryClient.invalidateQueries("friends");
    },
  });
};
