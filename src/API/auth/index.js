import { postNoToken } from "../common/base_api";

export const onLogin = (data) => {
  return postNoToken("/api/user/login", data);
};

export const onSignup = (data) => {
  return postNoToken("/api/user", data);
};
