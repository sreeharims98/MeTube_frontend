import axios from "axios";
import { getStorage } from "../../common/functions/Storage";
import { config } from "../config";

const baseURL = config.BASE_URL;

const base = async (options) => {
  try {
    const token = getStorage("token");
    const res = await axios({
      baseURL,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      ...options,
    });
    return res.data;
  } catch (error) {
    console.log(error?.response, "api base error");
    throw error?.response;
  }
};

const baseNoToken = async (options) => {
  try {
    const res = await axios({
      baseURL,
      headers: {
        Accept: "application/json",
      },
      ...options,
    });
    return res.data;
  } catch (error) {
    console.log(error?.response, "api base error");
    throw error?.response;
  }
};

export const get = (url, params) => {
  const options = {
    method: "get",
    url,
    params,
  };
  return base(options);
};

export const patch = (url, data) => {
  const options = {
    method: "patch",
    url,
    data,
  };
  return base(options);
};

export const post = (url, data) => {
  const options = {
    method: "post",
    url,
    data,
  };
  return base(options);
};

export const put = (url, data) => {
  const options = {
    method: "put",
    url,
    data,
  };
  return base(options);
};

export const del = (url, data) => {
  const options = {
    method: "delete",
    url,
    data,
  };
  return base(options);
};

export const postNoToken = (url, data) => {
  const options = {
    method: "post",
    url,
    data,
  };
  return baseNoToken(options);
};
