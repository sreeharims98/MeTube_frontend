import { Button, Col, Empty, Row } from "antd";
import React, { useEffect } from "react";
import { LoadingSpinner } from "../../common/components/LoadingSpinner";
import VideoCard from "../../common/components/VideoCard";
import { useVideoStore } from "../../store/Video";
import { AddVideoModal } from "../Video/modals/AddVideoModal";
import { VideoCameraAddOutlined } from "@ant-design/icons";
import { useAuthStore } from "../../store/Auth";

export const Home = () => {
  const [{ allVideos, getLoading }, { getAllVideos, setAddVideoModal }] =
    useVideoStore();
  const [{ user }, {}] = useAuthStore();

  useEffect(() => {
    getAllVideos();
  }, []);

  if (getLoading) return <LoadingSpinner tip="Loading videos" />;
  return (
    <div className="Home">
      {user?.is_admin && (
        <div className="flex justify-end mb-8">
          <Button
            style={{ display: "flex" }}
            size="large"
            type="primary"
            onClick={() => setAddVideoModal(true)}
            icon={<VideoCameraAddOutlined className="text-xl" />}
          >
            Add video
          </Button>
        </div>
      )}
      <div className="all-videos-con mb-12">
        {allVideos.length === 0 ? (
          <Empty description="No videos uploaded ☹" />
        ) : (
          <Row gutter={[25, 25]}>
            {allVideos?.map((v) => (
              <Col xs={24} sm={12} lg={8} xxl={6} key={v?._id}>
                <VideoCard data={v} />
              </Col>
            ))}
          </Row>
        )}
      </div>
      <AddVideoModal />
    </div>
  );
};
