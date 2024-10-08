import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../config/BaseUrl";
import toast from "react-hot-toast";

const Login = ({ handleLogin,handleClientLogin }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoadIndicator] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("*Invalid Email Address")
      .required("*Email is required"),
    password: Yup.string()
      .min(8, "*Password must be at least 8 characters")
      .required("*Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("login:", values);
      setLoadIndicator(true);
      try {
        const response = await api.post(`login`, values);
        if (response.status === 200) {
          const { role, id, name, email } = response.data.data.userDetails;
          const { token } = response.data.data;
          const { message } = response.data;

          toast.success(message);
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("role", role);
          sessionStorage.setItem("userId", id);
          sessionStorage.setItem("userName", name);
          sessionStorage.setItem("email", email);
          if (role === "0") {
            handleLogin();
          }else if(role ==="1"){
            handleClientLogin();
          }
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error.response && error.response.status === 402) {
          if (error.response.data.message) {
            toast.error(error.response.data.message);
          }
        } else {
          toast.error(error.response.data.message);
        }
      }finally{
        setLoadIndicator(false);
      }
    },
  });

  return (
    <div className="login-container w-100 mt-5">
      <div className="container d-flex justify-content-center align-items-center ">
        <div className="login-box p-4 rounded shadow-lg bg-white">
          <h2 className="text-center mb-5">Login</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group mb-3 text-start">
              <label htmlFor="email" className="form-label">
                Email ID
              </label>
              <input
                type="text"
                placeholder="Enter Your Email"
                className={`form-control ${
                  formik.touched.email && formik.errors.email
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="invalid-feedback">{formik.errors.email}</div>
              )}
            </div>
            <div className="form-group mb-3 text-start">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className={`form-control password ${
                    formik.touched.password && formik.errors.password
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("password")}
                  name="password"
                />
                <span
                  className="input-group-text passwordIcon"
                  id="basic-addon1"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </span>
                {formik.touched.password && formik.errors.password && (
                  <div className="invalid-feedback">
                    {formik.errors.password}
                  </div>
                )}
              </div>
            </div>

            <div className="form-group mb-3 text-end">
              <Link to={"/forgotpassword"}>Forgot Password?</Link>
            </div>
            
            <button
                  type="submit"
                  className="btn btn-primary w-100 mb-2"
                  disabled={loading}
                >
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    <span></span>
                  )}
                   Login
                   </button>
          </form>
          <div className="divider text-center mb-2">or</div>
          <p className="text-center mb-4">
            Don't have an account? <Link to={"/register"}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
