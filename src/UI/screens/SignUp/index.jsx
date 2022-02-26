import React, { useEffect } from "react";
import { Button, Card, Form, Input } from "antd";
import { useAuthStore } from "../../store/Auth";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../common/routes";
import { LoadingSpinner } from "../../common/components/LoadingSpinner";

export const SignUp = () => {
  const [
    { loading, isAuthenticated, authLoader },
    { onSignup, checkAuthenticate },
  ] = useAuthStore();
  let navigate = useNavigate();

  useEffect(() => {
    checkAuthenticate();
    if (isAuthenticated) {
      navigate(routes.HOME);
    }
  }, [checkAuthenticate, isAuthenticated, navigate]);

  if (authLoader) return <LoadingSpinner tip="Authenticating" isFullPage />;
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "calc(100vh - 128px)" }}
    >
      <Card
        title={<div className="text-xl font-bold">SIGNUP</div>}
        className="w-full max-w-sm shadow-xl"
      >
        <Form
          name="login"
          onFinish={(values) => onSignup(values, () => navigate(routes.HOME))}
        >
          <div className="font-medium text-base my-1">Name</div>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input size="large" />
          </Form.Item>
          <div className="font-medium text-base my-1">Email</div>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter email", type: "email" },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <div className="font-medium text-base my-1">Password</div>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password size="large" />
          </Form.Item>
          <div className="flex-col items-center justify-center my-2 text-center">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full mb-2"
              size="large"
              loading={loading}
            >
              SIGNUP
            </Button>
            <Link to={routes.LOGIN}>Already have an account?</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};
