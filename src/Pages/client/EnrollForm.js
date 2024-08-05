import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("*Name is required"),
  phoneNumber: Yup.string()
    .matches(
      /^(?:\+?65)?\s?(?:\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4})$/,
      "*Invalid Phone Number"
    )
    .required("*Phone Number is required"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "*Enter a valid email address"
    )
    .required("*Email is required"),
  message: Yup.string().required("*Message is required"),
});

const EnrollForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Quick Enqury Data ;", values);
    },
  });

  return (
    <div
      className="card"
      style={{
        boxShadow: "1px 1px 4px 0px #118AEF",
        position: "sticky",
        top:"6rem"
      }}
    >
      <h4 className="mt-3" style={{ color: "#118AEF" }}>
        Quick Enquiry
      </h4>
      <form onSubmit={formik.handleSubmit} className="p-4">
        <div className="row">
          <div className="col-md-12 col-12 text-start">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Name<span className="text-danger">*</span>
              </label>
              <input
                {...formik.getFieldProps("name")}
                type="text"
                className={`form-control  ${
                  formik.touched.name && formik.errors.name ? "is-invalid" : ""
                }`}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="invalid-feedback">{formik.errors.name}</div>
              )}
            </div>
          </div>
          <div className="col-md-12 col-12 text-start">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Email<span className="text-danger">*</span>
              </label>
              <input
                {...formik.getFieldProps("email")}
                type="email"
                className={`form-control  ${
                  formik.touched.email && formik.errors.email
                    ? "is-invalid"
                    : ""
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="invalid-feedback">{formik.errors.email}</div>
              )}
            </div>
          </div>
          <div className="col-md-12 col-12 text-start">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Phone Number<span className="text-danger">*</span>
              </label>
              <input
                {...formik.getFieldProps("phoneNumber")}
                type="text"
                className={`form-control  ${
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? "is-invalid"
                    : ""
                }`}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className="invalid-feedback">
                  {formik.errors.phoneNumber}
                </div>
              )}
            </div>
          </div>
          <div className="col-md-12 col-12 text-start">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Message<span className="text-danger">*</span>
              </label>
              <textarea
                {...formik.getFieldProps("message")}
                type="text"
                className={`form-control  ${
                  formik.touched.message && formik.errors.message
                    ? "is-invalid"
                    : ""
                }`}
              />
              {formik.touched.message && formik.errors.message && (
                <div className="invalid-feedback">{formik.errors.message}</div>
              )}
            </div>
          </div>
        </div>
        <div className="">
          <button className="btn btn-primary">SUBMIT</button>
        </div>
      </form>
    </div>
  );
};

export default EnrollForm;
