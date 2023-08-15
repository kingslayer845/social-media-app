import { LoginUserProps, SignupUserProps } from "../../types";
import API from "../API";

export const loginUser = async (props: LoginUserProps): Promise<object> => {
  const { data } = await API.post("/users/login", props);

  return data;
};
export const signupUser = async (props: SignupUserProps): Promise<object> => {
  const { data } = await API.post("/users/signup", props);

  return data;
};
