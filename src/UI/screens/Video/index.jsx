import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../../../API/config";
import { LoadingSpinner } from "../../common/components/LoadingSpinner";
import { useVideoStore } from "../../store/Video";
import {
  DeleteFilled,
  DislikeOutlined,
  DislikeTwoTone,
  EditFilled,
  LikeOutlined,
  LikeTwoTone,
} from "@ant-design/icons";
import { AddVideoModal } from "./modals/AddVideoModal";
import { routes } from "../../common/routes";
import { Popconfirm } from "antd";
import { EditVideoModal } from "./modals/EditVideoModal";
import { useAuthStore } from "../../store/Auth";

export const Video = () => {
  let navigate = useNavigate();
  const { videoID } = useParams();
  const [
    { video, reaction, getLoading },
    { getVideoByID, setReaction, deleteVideo, setEditVideoModal },
  ] = useVideoStore();

  const [{ user }, {}] = useAuthStore();

  useEffect(() => {
    getVideoByID(videoID);
  }, []);

  if (getLoading)
    return <LoadingSpinner tip="Loading video" isFullPage={false} />;
  return (
    <div className="Video mb-8">
      <video
        controls
        controlsList="nodownload"
        autoPlay
        className="w-full object-cover"
        style={{ maxHeight: "calc(100vh - 30vh)" }}
      >
        <source src={config.BASE_URL + "/" + video?.file} type="video/mp4" />
        {video?.name}
      </video>
      <div className="flex items-start justify-between">
        <div className="text-gray-800 font-bold text-xl mt-4 whitespace-nowrap	overflow-hidden overflow-ellipsis">
          {video?.name}
        </div>
        <div className="like-dilike-con flex mt-4">
          <div className="like-con flex items-center">
            {reaction === "liked" ? (
              <LikeTwoTone
                className="text-2xl m-2 cursor-pointer"
                onClick={() => setReaction("no_reaction", videoID)}
              />
            ) : (
              <LikeOutlined
                className="text-2xl m-2 cursor-pointer"
                onClick={() => setReaction("liked", videoID)}
              />
            )}
            <div className="text-gray-800 font-bold text-base">
              {video?.likes.length}
            </div>
          </div>
          <div className="dislike-con flex items-center ">
            {reaction === "disliked" ? (
              <DislikeTwoTone
                className="text-2xl m-2 cursor-pointer"
                onClick={() => setReaction("no_reaction", videoID)}
              />
            ) : (
              <DislikeOutlined
                className="text-2xl m-2 cursor-pointer"
                onClick={() => setReaction("disliked", videoID)}
              />
            )}
            <div className="text-gray-800 font-bold text-base">
              {video?.dislikes.length}
            </div>
          </div>
          {user?.is_admin && (
            <EditFilled
              className="text-2xl m-2 cursor-pointer"
              onClick={() => setEditVideoModal(true)}
            />
          )}
          {user?.is_admin && (
            <Popconfirm
              title="Are you sure to delete this video?"
              onConfirm={() =>
                deleteVideo(video?._id, () => navigate(routes.HOME))
              }
              okText="Yes"
              cancelText="No"
            >
              <DeleteFilled className="text-2xl m-2 cursor-pointer" />
            </Popconfirm>
          )}
        </div>
      </div>
      <div className="text-gray-600 font-medium text-base mt-2">
        {video?.description}
      </div>
      <AddVideoModal />
      <EditVideoModal />
    </div>
  );
};
