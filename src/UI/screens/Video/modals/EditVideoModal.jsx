import { Form } from "antd";
import Modal from "antd/lib/modal/Modal";
import React from "react";
import { useVideoStore } from "../../../store/Video";
import { AddVideoForm } from "../forms/AddVideoForm";

export const EditVideoModal = () => {
  const [{ editVideoModal, postLoading }, { setEditVideoModal, putVideo }] =
    useVideoStore();

  const [editVideoForm] = Form.useForm();

  const handleCancel = () => {
    setEditVideoModal(false);
  };

  return (
    <Modal
      visible={editVideoModal}
      title="Edit Video"
      onCancel={handleCancel}
      okText="Save"
      okButtonProps={{
        htmlType: "submit",
        form: "editVideoForm",
        loading: postLoading,
      }}
    >
      <AddVideoForm
        form={editVideoForm}
        onFinish={putVideo}
        formID="editVideoForm"
      />
    </Modal>
  );
};
