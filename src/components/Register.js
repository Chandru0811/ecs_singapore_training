import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
// import './Login.css';

const Register = ({ handleLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    fullName: Yup.string().required("*Full Name is required"),
    email: Yup.string()
      .email("*Invalid email address")
      .required("*Email is required"),
    password: Yup.string()
      .min(8, "*Password must be at least 8 characters")
      .required("*Password is required"),
    confirmPassword: Yup.string()
      .min(8, "*Password must be at least 8 characters")
      .required("*Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("fisrt", values);
      resetForm();
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleCPasswordVisibility = () => {
    setShowCPassword(!showCPassword);
  };

  const handleLoginClikLogin = () => {
    navigate("/home");
    handleLogin();
  };

  

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="login-container w-100 my-5">
      <div className="container d-flex justify-content-center align-items-center ">
        <div className="login-box p-4 rounded shadow-lg bg-white">
          <h2 className="text-center mb-0">Create an Account</h2>
          <p className="text-center mb-3">
            Already have an account? <Link to={"/login"}>Login</Link>
          </p>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group mb-3 text-start">
              <label htmlFor="name" className="form-label mb-0">
                Full Name
              </label>
              <input
                type="fullName"
                className={`form-control ${
                  formik.touched.fullName && formik.errors.fullName
                    ? "is-invalid"
                    : ""
                }`}
                style={{ borderRadius: "3px" }}
                placeholder="Enter fullName"
                {...formik.getFieldProps("fullName")}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <div className="invalid-feedback mt-0">
                  {formik.errors.fullName}
                </div>
              )}
            </div>
            <div className="form-group mb-3 text-start">
              <label htmlFor="email" className="form-label mb-0">
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
                <div className="invalid-feedback mt-0">
                  {formik.errors.email}
                </div>
              )}
            </div>
            <div className="form-group mb-3 text-start">
              <label htmlFor="password" className="form-label mb-0">
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className={`form-control ${
                    formik.touched.password && formik.errors.password
                      ? "is-invalid"
                      : ""
                  }`}
                  style={{
                    borderRadius: "3px",
                    borderRight: "none",
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                  }}
                  name="password"
                  {...formik.getFieldProps("password")}
                />
                <span
                  className={`input-group-text iconInputBackground`}
                  id="basic-addon1"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer", borderRadius: "3px" }}
                >
                  {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </span>
                {formik.touched.password && formik.errors.password && (
                  <div className="invalid-feedback mt-0">
                    {formik.errors.password}
                  </div>
                )}
              </div>
            </div>
            <div className="form-group mb-3 text-start">
              <label htmlFor="confirmPassword" className="form-label mb-0">
                Confirm Password
              </label>
              <div className="input-group">
                <input
                  type={showCPassword ? "text" : "password"}
                  placeholder="Enter confirmPassword"
                  className={`form-control ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "is-invalid"
                      : ""
                  }`}
                  style={{
                    borderRadius: "3px",
                    borderRight: "none",
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                  }}
                  name="confirmPassword"
                  {...formik.getFieldProps("confirmPassword")}
                />
                <span
                  className={`input-group-text iconInputBackground`}
                  id="basic-addon1"
                  onClick={toggleCPasswordVisibility}
                  style={{ cursor: "pointer", borderRadius: "3px" }}
                >
                  {showCPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </span>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <div className="invalid-feedback mt-0">
                      {formik.errors.confirmPassword}
                    </div>
                  )}
              </div>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />{" "}
                <span className="" style={{fontSize:".8vw"}}>I’ve read and agree with your{" "}
                <a
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
                .
                </span>
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-100  my-3">
              Register Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
