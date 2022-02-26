import { del, get, post, put } from "../common/base_api";

export const getAllVideos = () => {
  return get(`/api/video`);
};

export const getVideoByID = (videoID) => {
  return get(`/api/video/${videoID}`);
};

export const postVideo = (data) => {
  return post(`/api/video`, data);
};

export const putVideo = (videoID, data) => {
  return put(`/api/video/${videoID}`, data);
};

export const deleteVideo = (videoID) => {
  return del(`/api/video/${videoID}`);
};

export const getReaction = (videoID) => {
  return post(`/api/video/reaction/${videoID}`);
};

export const likeVideo = (videoID) => {
  return post(`/api/video/like/${videoID}`);
};

export const dislikeVideo = (videoID) => {
  return post(`/api/video/dislike/${videoID}`);
};

export const setNoReactionToVideo = (videoID) => {
  return post(`/api/video/noreaction/${videoID}`);
};
