import React from "react";

const Login = ({ handleLogin }) => {
  // const handleLoginClick = () => {
  //   handleLogin();
  // };
  return (
    <div className="d-flex justify-content-center ">
      <h1>Login</h1>
      <button
        className="btn btn-outline-success my-5"
        onClick={handleLogin}
      >
        login
      </button>
    </div>
  );
};

export default Login;
