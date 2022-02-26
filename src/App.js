import React, { useEffect } from "react";
import "./App.less";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Col, Row } from "antd";
import { routes } from "./UI/common/routes";
import { Navbar } from "./UI/common/components/Navbar";
import { Home } from "./UI/screens/Home";
import { Login } from "./UI/screens/Login";
import PrivateRouter from "./UI/Router/PrivateRouter";
import { Video } from "./UI/screens/Video";
import { SignUp } from "./UI/screens/SignUp";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Row className="pt-12">
          <Col xs={1} sm={2}></Col>
          <Col xs={22} sm={20}>
            <Routes>
              {/* public routes */}
              <Route path={routes.LOGIN} element={<Login />} />
              <Route path={routes.SIGNUP} element={<SignUp />} />

              {/* private routes */}
              <Route path={routes.HOME} element={<PrivateRouter />}>
                <Route path={routes.HOME} element={<Home />} />
                <Route path={routes.VIDEO(":videoID")} element={<Video />} />
              </Route>
              {/* not found route */}
              <Route path="*" element={<div>404 Not found</div>} />
            </Routes>
          </Col>
          <Col xs={1} sm={2}></Col>
        </Row>
      </BrowserRouter>
    </div>
  );
};

export default App;
