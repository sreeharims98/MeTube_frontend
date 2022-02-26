import { Button, Form, Input, Upload } from "antd";
import React, { useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useVideoStore } from "../../../store/Video";

export const AddVideoForm = ({ form, onFinish, formID }) => {
  const [{ video }, {}] = useVideoStore();

  useEffect(() => {
    if (formID === "editVideoForm") {
      form.setFieldsValue(video);
    }
  }, []);

  return (
    <Form
      id={formID}
      form={form}
      scrollToFirstError
      onFinish={(values) => onFinish(values)}
    >
      <div className="font-medium text-base my-1">Name</div>
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Please enter name!" }]}
      >
        <Input size="large" />
      </Form.Item>
      <div className="font-medium text-base my-1">Description</div>
      <Form.Item
        name="description"
        rules={[{ required: true, message: "Please enter description!" }]}
      >
        <Input size="large" />
      </Form.Item>
      <div className="font-medium text-base my-1">Video</div>
      <Form.Item
        name="file"
        rules={[{ required: true, message: "Please upload a video file!" }]}
      >
        <Upload
          accept="video/mp4"
          maxCount={1}
          onChange={(info) => {
            info.file.status = "done";
          }}
        >
          <Button icon={<UploadOutlined />}>Click to upload video</Button>
        </Upload>
      </Form.Item>
    </Form>
  );
};
