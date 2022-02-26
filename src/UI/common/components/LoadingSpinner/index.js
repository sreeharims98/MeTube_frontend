import React from "react";
import { Spin } from "antd";

export const LoadingSpinner = ({ tip = null, isFullPage = false }) => {
  return (
    <div
      style={isFullPage ? { height: "calc(100vh - 80px)" } : {}}
      className={
        isFullPage
          ? "absolute w-full flex justify-center items-center bg-opacity-50 z-20"
          : "w-full flex justify-center items-center"
      }
    >
      <Spin tip={tip} size="large" />
    </div>
  );
};
