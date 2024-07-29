import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminHeader from "../components/admin/common/AdminHeader";
import AdminFooter from "../components/admin/common/AdminFooter";
import Dashboard from "../Pages/admin/Dashboard";
const Admin = ({ handleLogout }) => {
  return (
    <BrowserRouter>
      <div className="container-fluid p-0">
        <AdminHeader handleLogout={handleLogout} />
        <button onClick={handleLogout} type="submit">
          Logout
        </button>
        <div
          className="mt-2"
          style={{
            minHeight: "90vh",
            position: "relative",
            top: "91px",
            zIndex: "-999",
          }}
        >
          <Routes>
            {/* <Route path="/" element={<Dashboard />} /> */}
          </Routes>
        </div>
        <AdminFooter />
      </div>
    </BrowserRouter>
  );
};

export default Admin;
