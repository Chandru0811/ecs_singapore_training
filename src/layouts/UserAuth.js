import React from "react";
import Login from "../components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/client/common/Header";
import Footer from "../components/client/common/Footer";
import ClientAbout from "../Pages/client/ClientAbout";
import Contact from "../Pages/client/Contact";
import Home from "../Pages/client/Home";
import LandingPage from "../Pages/client/LandingPage";

const UserAuth = ({ handleLogin }) => {
  return (
    <>
      <BrowserRouter>
        <div className="container-fluid p-0">
          <Header handleLogin={handleLogin} />
          <div
            className="my-2"
            style={{
              minHeight: "90vh",
            }}
          >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login handleLogin={handleLogin} />} />
            <Route path="/about" element={<ClientAbout />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
};

export default UserAuth;
