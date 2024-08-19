import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../config/BaseUrl";
import toast from "react-hot-toast";

const Register = ({ handleLogin,handleClientLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoadIndicator] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("*Full Name is required"),
    email: Yup.string()
      .email("*Invalid email address")
      .required("*Email is required"),
    password: Yup.string()
      .min(8, "*Password must be at least 8 characters")
      .required("*Password is required"),
      password_confirmation: Yup.string()
      .min(8, "*Password must be at least 8 characters")
      .required("*Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("fisrt", values);
      setLoadIndicator(true);
      try {
        const response = await api.post(`/register`, values);

        if (response.status === 200) {
          toast.success(response.data.message);
          resetForm();
          handleClientLogin();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("error");
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleCPasswordVisibility = () => {
    setShowCPassword(!showCPassword);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="login-container w-100 my-5">
      <div className="container d-flex justify-content-center align-items-center ">
        <div className="login-box p-4 rounded shadow-lg bg-white">
          <h2 className="text-center mb-0">Create an Account</h2>
          <p className="text-center mb-3" style={{ fontSize: ".9vw" }}>
            Already have an account? <Link to={"/login"}>Login</Link>
          </p>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group mb-3 text-start">
              <label htmlFor="name" className="form-label mb-0">
                Name
              </label>
              <input
                type="text"
                className={`form-control ${
                  formik.touched.name && formik.errors.name
                    ? "is-invalid"
                    : ""
                }`}
                style={{ borderRadius: "3px" }}
                placeholder="Enter name"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="invalid-feedback mt-0">
                  {formik.errors.name}
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
                    formik.touched.password_confirmation &&
                    formik.errors.password_confirmation
                      ? "is-invalid"
                      : ""
                  }`}
                  style={{
                    borderRadius: "3px",
                    borderRight: "none",
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                  }}
                  name="password_confirmation"
                  {...formik.getFieldProps("password_confirmation")}
                />
                <span
                  className={`input-group-text iconInputBackground`}
                  id="basic-addon1"
                  onClick={toggleCPasswordVisibility}
                  style={{ cursor: "pointer", borderRadius: "3px" }}
                >
                  {showCPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </span>
                {formik.touched.password_confirmation &&
                  formik.errors.password_confirmation && (
                    <div className="invalid-feedback mt-0">
                      {formik.errors.password_confirmation}
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
                <span className="" style={{ fontSize: ".8vw" }}>
                  I’ve read and agree with your{" "}
                  <a
                    href="/termsandcondition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacypolicy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-100  my-3" disabled={loading}
                >
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    <span></span>
                  )}
              Register Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
