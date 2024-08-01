import React, { useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
// import './Login.css';

const ForgotPassword = ({handleLogin}) => {
  const [showPassword, setShowPassword] = React.useState(false);
 const navigate =useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
const handleLoginClikLogin=()=>{
  navigate("/home")
  handleLogin();
}
  return (
    <div className="login-container w-100 mt-5">
      <div className="container d-flex justify-content-center align-items-center ">
        <div className="login-box p-4 rounded shadow-sm bg-white">
          <h2 className="text-center mb-4">Forgot Password</h2>
          
          <form>
            <div className="form-group mb-3 text-start">
              <label htmlFor="email" className="form-label">Email ID</label>
              <input type="email" id="email" className="form-control form-control-sm" required />
            </div>
            {/* <div className="form-group mb-3 text-start">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="form-control form-control-sm"
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary p-0 border-0"
                  onClick={togglePasswordVisibility}
                  style={{ borderRadius: '0 0.25rem 0.25rem 0' }}
                >
                  <span className="input-group-text" style={{ cursor: "pointer", borderRadius: "0" }}>
                    {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </span>
                </button>
              </div>
            </div>

            <div className="form-group mb-3 text-end">
              <a className="text-primary" href="#forgot-password">Forgot Password?</a>
            </div> */}
            <button type="button" className="btn btn-primary w-100 mb-3" onClick={handleLoginClikLogin}>Reset Password</button>
          </form>
        
          {/* <button className="btn btn-outline-primary w-100">
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google logo" className="me-2" />
            Sign in with Google
          </button> */}
        </div>
      </div>

    </div>
  );
};

export default ForgotPassword;
