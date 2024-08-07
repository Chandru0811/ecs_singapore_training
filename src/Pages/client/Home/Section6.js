import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  firstName: Yup.string().required("*First Name is required"),
  lastName: Yup.string().required("*Last Name is required"),
  email: Yup.string()
    .email("*Invalid Email Address")
    .required("*Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\d+$/, "*Must be a Number")
    .min(8, "*Invalid Phone Number")
    .max(10, "*Invalid Phone Number")
    .required("*Phone Number is required"),
});

function Section6() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Contact Details:", values);
    },
  });

  return (
    <section>
      <div className="trainingplacements mt-3 mb-5">
        <h1 className="secondheading text-start mb-3">
          Cloud Ecs , Software Training and Placements in India
        </h1>
        <div className="row d-flex">
          <div className="col-md-6 col-12">
            <div className="accordion" id="accordionExample">
              <div
                className="accordion-item mb-3"
                style={{ paddingLeft: "10px" }}
              >
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Introduction about ClousEcs
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body text-start paraContent">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,
                  </div>
                </div>
              </div>
              <div
                className="accordion-item mb-3"
                style={{ paddingLeft: "10px" }}
              >
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Our Features
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body text-start paraContent">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,
                  </div>
                </div>
              </div>
              <div
                className="accordion-item mb-3"
                style={{ paddingLeft: "10px" }}
              >
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Best Technologies Online training and Certificate Courses
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body text-start paraContent">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,{" "}
                  </div>
                </div>
              </div>
              <div
                className="accordion-item mb-3"
                style={{ paddingLeft: "10px" }}
              >
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    Lorem Ipsum is simply dummy text of the prin....?
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body text-start paraContent">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <form onSubmit={formik.handleSubmit}>
              <div className="card p-4 enquiryform">
                <div className="row mb-3">
                  <div className="col-md-6 text-start">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className={`form-control homeInput ${
                        formik.touched.firstName && formik.errors.firstName
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("firstName")}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <div className="invalid-feedback">
                        {formik.errors.firstName}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 text-start">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className={`form-control homeInput ${
                        formik.touched.lastName && formik.errors.lastName
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("lastName")}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <div className="invalid-feedback">
                        {formik.errors.lastName}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 text-start">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className={`form-control homeInput ${
                        formik.touched.email && formik.errors.email
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="invalid-feedback">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 text-start">
                    <label htmlFor="phoneNumber" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      className={`form-control homeInput ${
                        formik.touched.phoneNumber && formik.errors.phoneNumber
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("phoneNumber")}
                    />
                    {formik.touched.phoneNumber &&
                      formik.errors.phoneNumber && (
                        <div className="invalid-feedback">
                          {formik.errors.phoneNumber}
                        </div>
                      )}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12 text-start">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control homeInput"
                      {...formik.getFieldProps("message")}
                    ></textarea>
                  </div>
                </div>
                <div className="text-start">
                  <button type="submit" className="btn submitBtn btn-lg">
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section6;
