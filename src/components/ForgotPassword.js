import { useFormik } from "formik";
import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Link } from "react-router-dom";

// import './Login.css';

const ForgotPassword = ({ handleLogin }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLoginClikLogin = () => {
    navigate("/home");
    handleLogin();
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("*Invalid email address")
      .required("*Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      resetForm();
    },
  });

  return (
    <div className="login-container w-100 mt-5">
      <div className="container d-flex justify-content-center align-items-center ">
        <div className="login-box p-4 rounded shadow-lg bg-white">
          <h2 className="text-center mb-4">Forgot Password</h2>

          <form onSubmit={formik.handleSubmit}>
            <div className="form-group mb-3 text-start">
              <label htmlFor="email" className="form-label">
                Email ID
              </label>
              <input
                type="email"
                className={`form-control ${
                  formik.touched.email && formik.errors.email
                    ? "is-invalid"
                    : ""
                }`}
                style={{ borderRadius: "3px" }}
                placeholder="Enter email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="invalid-feedback">{formik.errors.email}</div>
              )}
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
            <Link to="/resetpassword">
              <button
                //  type="submit"
                className="btn btn-primary w-100 mb-3"
              >
                Reset Password
              </button>
            </Link>
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
