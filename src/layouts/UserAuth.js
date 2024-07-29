import React from "react";
import Login from "../components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/client/common/Header";
import Footer from "../components/client/common/Footer";

const UserAuth = ({ handleLogin }) => {
  return (
    <>
      <BrowserRouter>
        <div className="container-fluid p-0">
          <Header handleLogin={handleLogin} />
          {/* <div
            className="mt-2"
            style={{
              minHeight: "90vh",
              position: "relative",
              top: "91px",
              zIndex: "-999",
            }}
          > */}
            <Routes>
              <Route path="/" element={<Login handleLogin={handleLogin} />} />
            </Routes>
          {/* </div> */}
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
};

export default UserAuth;
