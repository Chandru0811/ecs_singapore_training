import { useFormik } from "formik";
import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const RestPassword = ({ handleLogin }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [loadIndicator, setLoadIndicator] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleLoginClikLogin = () => {
    navigate("/home");
    handleLogin();
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("*Invalid email address")
      .required("*Email is required"),
    new_password: Yup.string().required("*Please enter a new password"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "*Passwords must match")
      .required("*Please enter a confirm password"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      new_password: "",
      confirm_password: "",
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
          <h2 className="text-center mb-4">Reset Password</h2>
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
            <div className="form-group mb-3 text-start">
              <label htmlFor="new_password" className="form-label">
                New Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter New Password"
                  className={`form-control ${
                    formik.touched.new_password && formik.errors.new_password
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("new_password")}
                />
                <span
                  className="input-group-text passwordIcon"
                  id="basic-addon1"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </span>
              </div>
              {formik.touched.new_password && formik.errors.new_password && (
                <div className="invalid-feedback">
                  {formik.errors.new_password}
                </div>
              )}
            </div>
            <div className="form-group mb-3 text-start">
              <label htmlFor="confirm_password" className="form-label">
                Confirm Password
              </label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter Confirm Password"
                  className={`form-control ${
                    formik.touched.confirm_password &&
                    formik.errors.confirm_password
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("confirm_password")}
                />
                <span
                  className="input-group-text passwordIcon"
                  id="basic-addon1"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </span>
              </div>
              {formik.touched.confirm_password &&
                formik.errors.confirm_password && (
                  <div className="invalid-feedback">
                    {formik.errors.confirm_password}
                  </div>
                )}
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 mb-3"
              disabled={loadIndicator}
            >
              {loadIndicator && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
              )}
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RestPassword;
