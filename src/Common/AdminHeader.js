import React from "react";
import { useNavigate } from "react-router-dom";

const AdminHeader = ({ handleLogout }) => {
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    handleLogout();
    navigate("/");
  };
  return (
    <div className="d-flex justify-content-center gap-3">
      <h1>AdminHeader </h1>
      <button className="btn btn-danger m-2" onClick={handleLogoutClick}>
        logout
      </button>
    </div>
  );
};

export default AdminHeader;
