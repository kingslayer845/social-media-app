import { useMutation, useQueryClient } from "react-query";
import { sendFriendRequest } from "../api/endpoints/friends";

export default () => {
  const queryClient = useQueryClient();

  return useMutation((receiverId: string) => sendFriendRequest(receiverId), {
    onSuccess: () => {
      queryClient.invalidateQueries("friendRequests");
    },
  });
};
