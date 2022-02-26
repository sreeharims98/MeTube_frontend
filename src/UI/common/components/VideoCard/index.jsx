import React from "react";
import { config } from "../../../../API/config";
import { CaretRightOutlined } from "@ant-design/icons";
import "./style.css";
import { Link } from "react-router-dom";
import { routes } from "../../routes";

const VideoCard = ({ data }) => {
  console.log("Video card");
  return (
    <Link
      className="VideoCard w-full h-52 text-inherit"
      to={routes.VIDEO(data?._id)}
    >
      <video className="w-full h-44 object-cover">
        <source src={config.BASE_URL + "/" + data?.file} type="video/mp4" />
        {data?.name}
      </video>
      <div className="play-btn hidden">
        <CaretRightOutlined style={{ color: "#f5f5f5" }} className="text-7xl" />
      </div>
      <div className="text-gray-800 font-medium text-base mt-2 whitespace-nowrap	overflow-hidden overflow-ellipsis">
        {data?.name}
      </div>
    </Link>
  );
};
export default React.memo(VideoCard);
