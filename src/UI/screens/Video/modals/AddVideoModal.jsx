import { Form } from "antd";
import Modal from "antd/lib/modal/Modal";
import React from "react";
import { useVideoStore } from "../../../store/Video";
import { AddVideoForm } from "../forms/AddVideoForm";

export const AddVideoModal = () => {
  const [{ addVideoModal, postLoading }, { setAddVideoModal, postVideos }] =
    useVideoStore();

  const [addVideoForm] = Form.useForm();

  const handleCancel = () => {
    setAddVideoModal(false);
  };

  return (
    <Modal
      visible={addVideoModal}
      title="Add Video"
      onCancel={handleCancel}
      okText="Save"
      okButtonProps={{
        htmlType: "submit",
        form: "addVideoForm",
        loading: postLoading,
      }}
    >
      <AddVideoForm
        form={addVideoForm}
        onFinish={postVideos}
        formID="addVideoForm"
      />
    </Modal>
  );
};
