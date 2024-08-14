import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import * as Yup from "yup";
import { useFormik } from "formik";
import api from "../../config/BaseUrl";
import ImgUrl from "../../config/ImageURL";
import { useParams } from "react-router-dom";

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

function CourseView() {
  const { id } = useParams();
  const [showAllSections, setShowAllSections] = useState(false);
  const [courseValue, setCourseValue] = useState(null);

  const getData = async () => {
    try {
      const response = await api.get(`user/course/${id}`);
      setCourseValue(response.data.data);
      console.log("responseData", response.data.data);
    } catch (error) {
      console.error("Error fetching data ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Quick Enquiry Data:", values);
    },
  });

  const toggleShowAllSections = () => {
    setShowAllSections(!showAllSections);
  };

  if (!courseValue) {
    return <div>Loading...</div>;
  }

  const calculatedOfferPrice =
    courseValue.price && courseValue.offer_price
      ? parseFloat(courseValue.price) - parseFloat(courseValue.offer_price)
      : 0;

  return (
    <section className="mt-1 container-fluid">
      <div className="mb-5" style={{ border: "1px solid #118AEF" }}>
        <div className="row mt-4 mx-2">
          <div className="col-md-7 col-12 d-flex flex-column align-items-start justify-content-start">
            <div className="w-25 p-3">
              <img
                src={`${ImgUrl}${courseValue?.logo_path}`}
                alt="logo"
                className="img-fluid"
                style={{ minHeight: "10vh" }}
              ></img>
            </div>
            <div>
              <h1 className="text-start" style={{ color: "#118AEF" }}>
                {courseValue.title}
              </h1>
              <p className="text-start">{courseValue.description}</p>
              <p className="text-start">{courseValue.description}</p>
            </div>
          </div>
          <div className="col-md-5 col-12 mb-3">
            <div className="row ">
              <div className="offset-1 col-10">
                <div
                  className="container shadow"
                  style={{ border: "1px solid #118AEF" }}
                >
                  <div className="row mb-3 ">
                    <div className="col-md-5 col-12 mt-2 d-flex flex-column align-items-start justify-content-start">
                      <p>Course Syllabus :</p>
                      <p>Total Amount :</p>
                      <p>Discount Amount :</p>
                      <p>Amount to pay :</p>
                    </div>
                    <div className="col-md-7 col-12 mt-2 d-flex flex-column align-items-start justify-content-start">
                      <p className="text-start">
                        {courseValue?.syllabus
                          ?.map((syllabus) => syllabus.session)
                          .join(", ")}
                      </p>
                      <p className="text-start">
                        {courseValue.price
                          ? parseFloat(courseValue.price).toFixed(2)
                          : ""}
                      </p>
                      <p className="text-start">
                        {courseValue.offer_price
                          ? parseFloat(courseValue.offer_price).toFixed(2)
                          : ""}
                      </p>
                      <p className="text-start">
                        {calculatedOfferPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                      <button className="btn btn-primary">Enroll Now</button>
                      <button className="btn btn-outline-primary ms-2">
                        Download Syllabus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-5 mb-5">
        <div className="row">
          <div className="col-md-6 col-12">
            <h5 className="text-start">
              Batch Schedule for {courseValue.title}
            </h5>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ backgroundColor: "#118AEF", color: "white" }}>
                      DATE
                    </th>
                    <th style={{ backgroundColor: "#118AEF", color: "white" }}>
                      DAY
                    </th>
                    <th style={{ backgroundColor: "#118AEF", color: "white" }}>
                      TIMING
                    </th>
                    <th style={{ backgroundColor: "#118AEF", color: "white" }}>
                      DURATION
                    </th>
                    <th style={{ backgroundColor: "#118AEF", color: "white" }}>
                      Fees
                    </th>
                  </tr>
                </thead>
                <tbody style={{ border: "1px solid #118AEF" }}>
                  {courseValue.batches?.map((batch, index) => (
                    <tr key={index}>
                      <td style={{ borderRight: "1px solid #118AEF" }}>
                        {batch.date}
                      </td>
                      <td style={{ borderRight: "1px solid #118AEF" }}>
                        {batch.day}
                      </td>
                      <td style={{ borderRight: "1px solid #118AEF" }}>
                        {batch.start_time} - {batch.end_time}
                      </td>
                      <td style={{ borderRight: "1px solid #118AEF" }}>
                        {batch.duration}
                      </td>
                      <td>
                        <a href="#">Get Fees</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <p>Can’t find a batch you’re looking for!</p>
              <p>
                {" "}
                <a href="#" className="ms-2">
                  Request a Batch
                </a>
              </p>
              <p>
                {" "}
                <a href="#" className="ms-2">
                  Request a Callback
                </a>
              </p>
            </div>
          </div>
          <div className="col-md-6 col-12 flex-column ">
            <div className="row text-start mb-2">
              <h4 style={{ color: "#118AEF" }}>Benefits</h4>
              <p>{courseValue.benefits}</p>
            </div>
            <div className="row text-start mb-2">
              <h4 className="text start" style={{ color: "#118AEF" }}>
                Key Features
              </h4>
              <div className="col-md-12 col-12">
                <ul
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    listStyle: "none",
                    padding: 0,
                  }}
                >
                  {courseValue.features?.map((feature, index) => (
                    <li
                      key={index}
                      style={{ flex: "0 0 50%", textDecoration: "none" }}
                    >
                      <FaStar style={{ color: "#118AEF" }} /> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <div className="row">
          <div className="col-md-7 col-12 px-5 mb-4">
            <div className="row mb-5">
              <h5 className="text-start mb-3">
                {courseValue.title} Certification Course FAQs
              </h5>
              <div className="accordion accordion-flush" id="accordionExample">
                {courseValue.faqs?.map((faq, index) => (
                  <div className="accordion-item" key={index}>
                    <h2 className="accordion-header" id={`heading${index}`}>
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#flush-collapse${index}`}
                        aria-expanded="false"
                        aria-controls={`flush-collapse${index}`}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div
                      id={`flush-collapse${index}`}
                      className="accordion-collapse collapse"
                      aria-labelledby={`heading${index}`}
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body text-start">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="row">
              <div className="d-flex justify-content-between mb-3">
                <h5 className="text-start mb-3">AWS Master Program Syllabus</h5>
                <button className="btn btn-outline-primary">
                  <LuDownload />
                  Syllabus
                </button>
              </div>
              {courseValue.syllabus && courseValue.syllabus.length > 0 ? (
                <div
                  className="card"
                  style={{ boxShadow: "1px 1px 4px 0px #118AEF" }}
                >
                  {courseValue.syllabus
                    .slice(0, showAllSections ? courseValue.syllabus.length : 3)
                    ?.map((section, index) => (
                      <div className="mb-3" key={index}>
                        <div className="card-body">
                          <h6 className="text-start fw-bold">
                            {section.session}
                          </h6>
                          <div className="row">
                            <div className="col-md-6 col-12 text-start">
                              {section?.lessons?.map((lesson, i) => (
                                <div key={i}>{lesson.lesson}</div>
                              ))}
                            </div>
                            <div
                              className="col-md-3 col-12"
                              style={{ color: "#118AEF" }}
                            >
                              {/* Assuming sectionView is not part of the API response */}
                            </div>
                            <div
                              className="col-md-3 col-12"
                              style={{ color: "#118AEF" }}
                            >
                              {section.lessons?.map((lesson, i) => (
                                <div key={i}>{lesson.duration}</div>
                              ))}
                            </div>
                          </div>
                          <hr className="mb-2" />
                        </div>
                      </div>
                    ))}
                  <div className="card-body">
                    <p
                      style={{ color: "#118AEF", cursor: "pointer" }}
                      onClick={toggleShowAllSections}
                    >
                      {showAllSections ? "Show Less " : "Show More "}
                      {showAllSections ? <FaAngleUp /> : <FaAngleDown />}
                    </p>
                  </div>
                </div>
              ) : (
                <p>No sections available.</p>
              )}
            </div>
          </div>
          <div className="col-md-5 col-12">
            <div
              className="card"
              style={{ boxShadow: "1px 1px 4px 0px #118AEF" }}
            >
              <h4 className="mt-3" style={{ color: "#118AEF" }}>
                Quick Enquiry
              </h4>
              <form onSubmit={formik.handleSubmit} className="p-4">
                <div className="row">
                  <div className="col-md-12 col-12 text-start">
                    <div className="mb-3">
                      <label
                        for="exampleFormControlInput1"
                        className="form-label"
                      >
                        Name<span className="text-danger">*</span>
                      </label>
                      <input
                        {...formik.getFieldProps("name")}
                        type="text"
                        className={`form-control  ${
                          formik.touched.name && formik.errors.name
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.name && formik.errors.name && (
                        <div className="invalid-feedback">
                          {formik.errors.name}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12 col-12 text-start">
                    <div className="mb-3">
                      <label
                        for="exampleFormControlInput1"
                        className="form-label"
                      >
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
                        <div className="invalid-feedback">
                          {formik.errors.email}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12 col-12 text-start">
                    <div className="mb-3">
                      <label
                        for="exampleFormControlInput1"
                        className="form-label"
                      >
                        Phone Number<span className="text-danger">*</span>
                      </label>
                      <input
                        {...formik.getFieldProps("phoneNumber")}
                        type="text"
                        className={`form-control  ${
                          formik.touched.phoneNumber &&
                          formik.errors.phoneNumber
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.phoneNumber &&
                        formik.errors.phoneNumber && (
                          <div className="invalid-feedback">
                            {formik.errors.phoneNumber}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-md-12 col-12 text-start">
                    <div className="mb-3">
                      <label
                        for="exampleFormControlInput1"
                        className="form-label"
                      >
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
                        <div className="invalid-feedback">
                          {formik.errors.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="">
                  <button className="btn btn-primary">SUBMIT</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CourseView;