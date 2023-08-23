import { useMutation, useQueryClient } from "react-query";
import { acceptFriendRequest } from "../api/endpoints/friends";

export default () => {
  const queyQlient = useQueryClient();

  return useMutation((requestId: string) => acceptFriendRequest(requestId), {
    onSuccess: () => {
      queyQlient.invalidateQueries("friends");
    },
  });
};
