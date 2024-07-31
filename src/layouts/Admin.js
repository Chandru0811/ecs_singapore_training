import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminHeader from "../components/admin/common/AdminHeader";
import AdminFooter from "../components/admin/common/AdminFooter";
import Dashboard from "../Pages/admin/Dashboard";
import AdminHome from "../Pages/admin/AdminHome";
import AdminAbout from "../Pages/admin/AdminAbout";
import AdminLandingPage from "../Pages/admin/AdminLandingPage";

const Admin = ({ handleLogout }) => {
  return (
    <BrowserRouter>
      <div className="container-fluid p-0" style={{ backgroundColor: '#f2f2f2' }}>
        <AdminHeader handleLogout={handleLogout} />
        <div
          className=""
          style={{
            minHeight: "90vh",
          }}
        >
          <Routes>
            <Route path="/dashborad" element={<Dashboard />} />
            <Route path="/" element={<AdminLandingPage />} />
            <Route path="/home" element={<AdminHome />} />
            <Route path="/about" element={<AdminAbout />} />
          </Routes>
        </div>
        <AdminFooter />
      </div>
    </BrowserRouter>
  );
};

export default Admin;
