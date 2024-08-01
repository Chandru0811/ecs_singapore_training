import React, { useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
// import './Login.css';

const Register = ({handleLogin}) => {
  const [showPassword, setShowPassword] = React.useState(false);
 const navigate =useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
const handleLoginClikLogin=()=>{
  navigate("/home")
  handleLogin();
}

const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="login-container w-100 mt-5">
      <div className="container d-flex justify-content-center align-items-center ">
        <div className="login-box p-4 rounded shadow-sm bg-white">
          <h2 className="text-center mb-4">Create an Account</h2>
          <p className="text-center mb-4">
            Already have an account? <Link to={"/login"}>Login</Link>
          </p>
          <form>
            <div className="form-group mb-3 text-start">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input type="name" id="name" className="form-control form-control-sm" required />
            </div>
            <div className="form-group mb-3 text-start">
              <label htmlFor="email" className="form-label">Email ID</label>
              <input type="email" id="email" className="form-control form-control-sm" required />
            </div>
            <div className="form-group mb-3 text-start">
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
            <div className="form-group mb-3 text-start">
              <label htmlFor="password" className="form-label">Confirm Password</label>
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
            <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        {' '}
        I’ve read and agree with your{' '}
        <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">
          Terms and Conditions
        </a>
        {' '}and{' '}
        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>.
      </label>
    </div>
            <button type="button" className="btn btn-primary w-100  my-3" onClick={handleLoginClikLogin}>Register Now</button>
          </form>
          
        </div>
      </div>

    </div>
  );
};

export default Register;
