import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/BaseUrl";

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
  const [datas, setDatas] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoader(true);
      try {
        const response = await api.get("home/faq");
        setDatas(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoader(false);
      }
    };
    getData();
  }, []);

  const formik2 = useFormik({
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
    <>
      {loader ? (
        <section class="dots-container">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </section>
      ) : (
        <section>
          <div className="trainingplacements mt-3 mb-5">
            <h1 className="secondheading text-start mb-3">
              Cloud Ecs, Software Training and Placements in India
            </h1>
            <div className="row">
              {/* Accordion Section */}
              <div className="col-md-6">
                {datas.map((data, index) => (
                  <div
                    className="accordion"
                    id={`accordion-${index}`}
                    key={index}
                  >
                    {data.ques_and_ans.map((qa, qaIndex) => (
                      <div className="accordion-item mb-3" key={qaIndex}>
                        <h2 className="accordion-header">
                          <button
                            className={`accordion-button ${
                              activeIndex === `${index}-${qaIndex}`
                                ? ""
                                : "collapsed"
                            }`}
                            type="button"
                            onClick={() =>
                              setActiveIndex(
                                activeIndex === `${index}-${qaIndex}`
                                  ? null
                                  : `${index}-${qaIndex}`
                              )
                            }
                            aria-expanded={
                              activeIndex === `${index}-${qaIndex}`
                            }
                            aria-controls={`collapse-${index}-${qaIndex}`}
                          >
                            {qa.question}
                          </button>
                        </h2>
                        <div
                          id={`collapse-${index}-${qaIndex}`}
                          className={`accordion-collapse collapse ${
                            activeIndex === `${index}-${qaIndex}` ? "show" : ""
                          }`}
                          data-bs-parent={`#accordion-${index}`}
                        >
                          <div className="accordion-body text-start paraContent">
                            {qa.answer}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Contact Form Section */}
              <div className="col-md-6">
                <form onSubmit={formik2.handleSubmit}>
                  <div className="card p-4 enquiryform">
                    <div className="row mb-3">
                      <div className="col-md-6 text-start">
                        <label htmlFor="firstName" className="form-label">
                          First Name
                        </label>
                        <input
                          type="text"
                          className={`form-control homeInput ${
                            formik2.touched.firstName &&
                            formik2.errors.firstName
                              ? "is-invalid"
                              : ""
                          }`}
                          {...formik2.getFieldProps("firstName")}
                        />
                        {formik2.touched.firstName &&
                          formik2.errors.firstName && (
                            <div className="invalid-feedback">
                              {formik2.errors.firstName}
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
                            formik2.touched.lastName && formik2.errors.lastName
                              ? "is-invalid"
                              : ""
                          }`}
                          {...formik2.getFieldProps("lastName")}
                        />
                        {formik2.touched.lastName &&
                          formik2.errors.lastName && (
                            <div className="invalid-feedback">
                              {formik2.errors.lastName}
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
                            formik2.touched.email && formik2.errors.email
                              ? "is-invalid"
                              : ""
                          }`}
                          {...formik2.getFieldProps("email")}
                        />
                        {formik2.touched.email && formik2.errors.email && (
                          <div className="invalid-feedback">
                            {formik2.errors.email}
                          </div>
                        )}
                      </div>
                      <div className="col-md-6 text-start">
                        <label htmlFor="phoneNumber" className="form-label">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          className={`form-control homeInput ${
                            formik2.touched.phoneNumber &&
                            formik2.errors.phoneNumber
                              ? "is-invalid"
                              : ""
                          }`}
                          {...formik2.getFieldProps("phoneNumber")}
                        />
                        {formik2.touched.phoneNumber &&
                          formik2.errors.phoneNumber && (
                            <div className="invalid-feedback">
                              {formik2.errors.phoneNumber}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-12 text-start">
                        <label className="form-label">Message</label>
                        <textarea
                          className="form-control homeInput"
                          {...formik2.getFieldProps("message")}
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
      )}
    </>
  );
}

export default Section6;
