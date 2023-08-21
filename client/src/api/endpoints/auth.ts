import { QueryKey } from "react-query";
import { LoginUserProps, SignupUserProps } from "../../types";
import API from "../API";

export const loginUser = async (
  props: LoginUserProps
): Promise<{ token: string }> => {
  const { data } = await API.post("/users/login", props);

  return data;
};
export const signupUser = async (
  props: SignupUserProps
): Promise<{ token: string }> => {
  const { data } = await API.post("/users/signup", props);

  return data;
};

export const getUser = async (key: QueryKey, userId?: string) => {
  if (key === "myProfile") {
    const { data } = await API.get("/users/profile");
    return data.user;
  } else {
    const { data } = await API.get(`/users/profile/${userId}`);
    return data.user;
  }
};
