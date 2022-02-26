import { message } from "antd";
import { onLogin, onSignup } from "../../../API/auth";
import {
  getStorage,
  removeStorage,
  setStorage,
} from "../../../common/functions/Storage";

const actions = {
  setLoading:
    (loading) =>
    ({ setState }) => {
      setState({ loading });
    },

  setIsAuthenticated:
    (isAuthenticated) =>
    ({ setState }) => {
      setState({ isAuthenticated });
    },

  checkAuthenticate:
    () =>
    ({ setState }) => {
      setState({ authLoader: true });
      const token = getStorage("token");
      const user = JSON.parse(getStorage("user"));

      if (token && user?.name) {
        setState({ isAuthenticated: true });
        setState({ user: user });
      } else {
        setState({ isAuthenticated: false });
      }
      setState({ authLoader: false });
    },

  onLogin:
    (data, navigateHome) =>
    async ({ setState, dispatch }) => {
      try {
        setState({ loading: true });
        const res = await onLogin(data);
        setStorage("token", res?.token);
        setStorage(
          "user",
          JSON.stringify({
            email: res?.email,
            name: res?.name,
            is_admin: res?.is_admin,
          })
        );
        dispatch(actions.setIsAuthenticated(true));
        navigateHome();
      } catch (error) {
        console.log(error?.data, "error");
        message.error(error?.data?.message);
      } finally {
        setState({ loading: false });
      }
    },

  onSignup:
    (data, navigateHome) =>
    async ({ setState, dispatch }) => {
      try {
        setState({ loading: true });
        const res = await onSignup(data);
        setStorage("token", res?.token);
        setStorage(
          "user",
          JSON.stringify({
            email: res?.email,
            name: res?.name,
            is_admin: res?.is_admin,
          })
        );
        dispatch(actions.setIsAuthenticated(true));
        navigateHome();
      } catch (error) {
        console.log(error?.data, "error");
        message.error(error?.data?.message);
      } finally {
        setState({ loading: false });
      }
    },

  onLogout:
    (navigateLogin) =>
    async ({ dispatch }) => {
      removeStorage("token");
      removeStorage("user");
      dispatch(actions.setIsAuthenticated(false));
      navigateLogin();
    },
};

export default actions;
