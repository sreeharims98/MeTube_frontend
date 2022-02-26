import { message } from "antd";
import {
  deleteVideo,
  dislikeVideo,
  getAllVideos,
  getReaction,
  getVideoByID,
  likeVideo,
  postVideo,
  putVideo,
  setNoReactionToVideo,
} from "../../../API/videos";

const actions = {
  getLoading:
    (getLoading) =>
    ({ setState }) => {
      setState({ getLoading });
    },
  setPostLoading:
    (postLoading) =>
    ({ setState }) => {
      setState({ postLoading });
    },

  setAddVideoModal:
    (addVideoModal) =>
    ({ setState }) => {
      setState({ addVideoModal });
    },
  setEditVideoModal:
    (editVideoModal) =>
    ({ setState }) => {
      setState({ editVideoModal });
    },

  setReaction:
    (reaction, videoID) =>
    async ({ setState, dispatch }) => {
      if (reaction === "liked") {
        await likeVideo(videoID);
      } else if (reaction === "disliked") {
        await dislikeVideo(videoID);
      } else {
        await setNoReactionToVideo(videoID);
      }
      setState({ reaction });
      dispatch(actions.getVideoByID(videoID));
    },

  getReaction:
    (videoID) =>
    async ({ setState, dispatch }) => {
      try {
        dispatch(actions.getLoading(true));
        const res = await getReaction(videoID);
        setState({ reaction: res?.reaction });
      } catch (error) {
        message.error(error.message);
      } finally {
        dispatch(actions.getLoading(false));
      }
    },

  getAllVideos:
    () =>
    async ({ setState, dispatch }) => {
      try {
        dispatch(actions.getLoading(true));
        const res = await getAllVideos();
        setState({ allVideos: res });
      } catch (error) {
        message.error(error.message);
      } finally {
        dispatch(actions.getLoading(false));
      }
    },

  getVideoByID:
    (videoID) =>
    async ({ setState, dispatch }) => {
      try {
        dispatch(actions.getLoading(true));
        setState({ reaction: "no_reaction" });
        const res = await getVideoByID(videoID);
        setState({ video: res });
        dispatch(actions.getReaction(videoID));
      } catch (error) {
        message.error(error.message);
      } finally {
        dispatch(actions.getLoading(false));
      }
    },

  postVideos:
    (values) =>
    async ({ dispatch }) => {
      try {
        dispatch(actions.setPostLoading(true));

        const data = new FormData();
        data.append("name", values?.name);
        data.append("description", values?.description);
        data.append("file", values?.file?.file?.originFileObj);
        await postVideo(data);

        dispatch(actions.setPostLoading(false));
        dispatch(actions.setAddVideoModal(false));
        dispatch(actions.getAllVideos());
      } catch (error) {
        message.error(error.message);
      }
    },

  putVideo:
    (values) =>
    async ({ dispatch, getState }) => {
      try {
        dispatch(actions.setPostLoading(true));
        const videoID = getState().video?._id;

        const data = new FormData();
        data.append("name", values?.name);
        data.append("description", values?.description);
        if (typeof values?.file === "string") {
          data.append("file", values?.file);
        } else {
          data.append("file", values?.file?.file?.originFileObj);
        }
        await putVideo(videoID, data);

        dispatch(actions.setPostLoading(false));
        dispatch(actions.setEditVideoModal(false));
        dispatch(actions.getVideoByID(videoID));
      } catch (error) {
        message.error(error.message);
      }
    },

  deleteVideo:
    (videoID, navigateHome) =>
    async ({ dispatch }) => {
      try {
        dispatch(actions.setPostLoading(true));
        await deleteVideo(videoID);
        dispatch(actions.setPostLoading(false));
        message.success("Video deleted successfully");
        navigateHome();
      } catch (error) {
        message.error(error.message);
      }
    },
};

export default actions;
