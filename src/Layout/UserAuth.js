import React from "react";
import Login from "../Common/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const UserAuth = ({handleLogin}) => {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login handleLogin={handleLogin}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default UserAuth;
