import React from "react";
import Login from "../components/Login";
import ForgotPassword from "../components/ForgotPassword";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/client/common/Header";
import Footer from "../components/client/common/Footer";
import ClientAbout from "../Pages/client/ClientAbout";
import Contact from "../Pages/client/Contact";
import Home from "../Pages/client/Home";
import LandingPage from "../Pages/client/LandingPage";
import Register from "../components/Register";
import UserCourse from "../Pages/client/UserCourse";
import UserCourseView from "../Pages/client/UserCourseView";

const UserAuth = ({ handleLogin }) => {
  return (
    <>
      <BrowserRouter>
        <div className="container-fluid p-0">
          <Header handleLogin={handleLogin} />
          <div
            style={{
              minHeight: "90vh",
            }}
          >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login handleLogin={handleLogin} />} />
            <Route path="/forgotpassword" element={<ForgotPassword/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/about" element={<ClientAbout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/course" element={<UserCourse />} />
            <Route path="/courseview" element={<UserCourseView />} />
          </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
};

export default UserAuth;
