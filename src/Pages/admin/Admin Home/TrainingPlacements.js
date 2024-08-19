import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { FaEdit, FaSave, FaTimes, FaPlus, FaTrash } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";
import api from "../../../config/BaseUrl";
import toast from "react-hot-toast";
import DeleteModel from "../../../components/DeleteModel";

function TrainingPlacements() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [datas, setDatas] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(true);
  const [newAccordion, setNewAccordion] = useState({
    question: "",
    answer: "",
  });
  const [loadIndicator, setLoadIndicator] = useState(false)

  // Formik validation schema for contact form
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

  // Formik for Contact Form
  const formikContact = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Contact Details:", values);
    },
  });

  // Formik for FAQ Form
  const formik = useFormik({
    initialValues: { aboutAccordion: [], id: null },
    onSubmit: async (values) => {
      const { id, aboutAccordion } = values;
      try {
        const response = await api.put(`homefaq/${id}`, {
          ques_and_ans: aboutAccordion,
        });
        if (response.status === 200) {
          toast.success(response.data.message);
          console.log("Updated:", response.data);
          getData();
        }
      } catch (error) {
        console.error("Update failed:", error);
      } finally {
        setIsEditing(false);
      }
    },
  });

  // Fetch data from API
  const getData = async () => {
    setLoader(true);
    try {
      const response = await api.get("homefaq");
      if (response.data.status === 200) {
        setDatas(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoader(false);
    }
  };

  // Set values for editing
  const handleEditClick = (index) => {
    const selectedData = datas[index]?.ques_and_ans[0] || {
      question: "",
      answer: "",
    };
    formik.setFieldValue("aboutAccordion", [{ ...selectedData }]);
    formik.setFieldValue("id", datas[index]?.id || null);
    setIsEditing(true);
    setEditingIndex(index);
  };

  // Save new FAQ item
  const handleSaveNewAccordion = async () => {
    if (newAccordion.question && newAccordion.answer) {
      try {
        const response = await api.post("homefaq", {
          ques_and_ans: [newAccordion],
        });
        if (response.data.status === 200) {
          toast.success(response.data.message);
          getData();
          setNewAccordion({ question: "", answer: "" });
          handleClose();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error deleting data:", error);
        console.error("Failed to save new accordion:", error);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClose = () => {
    setNewAccordion({ question: "", answer: "" });
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handlePublish = async () => {
    setLoadIndicator(true);
    try {
      const response = await api.post("publish/homefaq");
      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Error publishing FAQ");
    } finally {
      setLoadIndicator(false);
    }
  };

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
        <div>
          <div>
            {/* Header Section */}
            <div className="container-fluid d-flex justify-content-between p-2 bg-light">
              <h3 className="fw-bold">Home FAQ</h3>
              <button
                className="btn btn-danger"
                onClick={handlePublish}
                disabled={loadIndicator}
              >
                {loadIndicator && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                )}
                Publish
              </button>
            </div>
              <div className="container-fluid trainingplacements mt-3 mb-5">
                <h1 className="secondheading text-start mb-3">
                  Cloud Ecs, Software Training and Placements in India
                </h1>
                <div className="row d-flex">
                  {/* FAQ Accordion Section */}
                  <div className="col-md-6 col-12">
                    <div className="accordion" id="accordionExample">
                      <div className="d-flex align-items-center justify-content-end">
                        <button className="btn" onClick={handleShow}>
                          <span className="fw-medium">Add New</span>{" "}
                          <FaPlus size={12} />
                        </button>
                      </div>

                      {/* Accordion Items */}
                      {datas.map((item, index) => (
                        <div className="accordion-item mb-2" key={item.id}>
                          <div className="d-flex align-items-end justify-content-end">
                            <button
                              className="btn"
                              onClick={() => handleEditClick(index)}
                            >
                              <FaEdit size={18} className="text-secondary" />
                            </button>
                            <DeleteModel
                              className="text-danger"
                              onSuccess={getData}
                              path={`homefaq/${item.id}`}
                            />
                          </div>

                          {isEditing && editingIndex === index ? (
                            <div className="p-3">
                              <input
                                type="text"
                                name="aboutAccordion[0].question"
                                value={
                                  formik.values.aboutAccordion[0]?.question ||
                                  ""
                                }
                                onChange={formik.handleChange}
                                className="form-control mb-3"
                              />
                              <textarea
                                name="aboutAccordion[0].answer"
                                value={
                                  formik.values.aboutAccordion[0]?.answer || ""
                                }
                                onChange={formik.handleChange}
                                className="form-control mb-3"
                              />
                              <div className="d-flex">
                                <FaSave
                                  onClick={formik.handleSubmit}
                                  className="mx-2 text-primary"
                                  role="button"
                                />
                                <FaTimes
                                  onClick={() => setIsEditing(false)}
                                  className="text-danger"
                                  role="button"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="accordion-item">
                              <h2 className="accordion-header">
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target={`#collapse${item.id}`}
                                  aria-expanded="false"
                                  aria-controls={`collapse${item.id}`}
                                >
                                  {item.ques_and_ans[0]?.question}
                                </button>
                              </h2>
                              <div
                                id={`collapse${item.id}`}
                                className="accordion-collapse collapse"
                                data-bs-parent="#accordionExample"
                              >
                                <div className="accordion-body text-start">
                                  <p>{item.ques_and_ans[0]?.answer}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Modal for Adding New Accordion */}
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Add New Accordion</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <input
                          type="text"
                          name="question"
                          placeholder="Question"
                          value={newAccordion.question}
                          onChange={(e) =>
                            setNewAccordion((prev) => ({
                              ...prev,
                              question: e.target.value,
                            }))
                          }
                          className="form-control mb-3"
                        />
                        <textarea
                          type="text"
                          name="answer"
                          placeholder="Answer"
                          value={newAccordion.answer}
                          onChange={(e) =>
                            setNewAccordion((prev) => ({
                              ...prev,
                              answer: e.target.value,
                            }))
                          }
                          className="form-control mb-3"
                        />
                      </Modal.Body>
                      <Modal.Footer>
                        <FaSave
                          onClick={handleSaveNewAccordion}
                          className="mx-2 text-primary"
                          role="button"
                        />
                        <FaTimes
                          onClick={handleClose}
                          className="text-danger"
                          role="button"
                        />
                      </Modal.Footer>
                    </Modal>
                  </div>

                  {/* Contact Form Section */}
                  <div className="col-md-6">
                    <div className="card p-4 enquiryform">
                      <form onSubmit={formikContact.handleSubmit}>
                        <div className="row mb-3">
                          <div className="col-md-6 text-start">
                            <label htmlFor="firstName" className="form-label">
                              First Name
                            </label>
                            <input
                              type="text"
                              className={`form-control homeInput ${
                                formikContact.touched.firstName &&
                                formikContact.errors.firstName &&
                                "is-invalid"
                              }`}
                              id="firstName"
                              name="firstName"
                              value={formikContact.values.firstName}
                              onChange={formikContact.handleChange}
                              onBlur={formikContact.handleBlur}
                            />
                            {formikContact.touched.firstName &&
                            formikContact.errors.firstName ? (
                              <div className="invalid-feedback">
                                {formikContact.errors.firstName}
                              </div>
                            ) : null}
                          </div>
                          <div className="col-md-6 text-start">
                            <label htmlFor="lastName" className="form-label">
                              Last Name
                            </label>
                            <input
                              type="text"
                              className={`form-control homeInput ${
                                formikContact.touched.lastName &&
                                formikContact.errors.lastName &&
                                "is-invalid"
                              }`}
                              id="lastName"
                              name="lastName"
                              value={formikContact.values.lastName}
                              onChange={formikContact.handleChange}
                              onBlur={formikContact.handleBlur}
                            />
                            {formikContact.touched.lastName &&
                            formikContact.errors.lastName ? (
                              <div className="invalid-feedback">
                                {formikContact.errors.lastName}
                              </div>
                            ) : null}
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
                                formikContact.touched.email &&
                                formikContact.errors.email &&
                                "is-invalid"
                              }`}
                              id="email"
                              name="email"
                              value={formikContact.values.email}
                              onChange={formikContact.handleChange}
                              onBlur={formikContact.handleBlur}
                            />
                            {formikContact.touched.email &&
                            formikContact.errors.email ? (
                              <div className="invalid-feedback">
                                {formikContact.errors.email}
                              </div>
                            ) : null}
                          </div>
                          <div className="col-md-6 text-start">
                            <label htmlFor="phoneNumber" className="form-label">
                              Phone Number
                            </label>
                            <input
                              type="text"
                              className={`form-control homeInput ${
                                formikContact.touched.phoneNumber &&
                                formikContact.errors.phoneNumber &&
                                "is-invalid"
                              }`}
                              id="phoneNumber"
                              name="phoneNumber"
                              value={formikContact.values.phoneNumber}
                              onChange={formikContact.handleChange}
                              onBlur={formikContact.handleBlur}
                            />
                            {formikContact.touched.phoneNumber &&
                            formikContact.errors.phoneNumber ? (
                              <div className="invalid-feedback">
                                {formikContact.errors.phoneNumber}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="mb-3 text-start">
                          <label htmlFor="message" className="form-label">
                            Message
                          </label>
                          <textarea
                            className="form-control"
                            id="message"
                            name="message"
                            value={formikContact.values.message}
                            onChange={formikContact.handleChange}
                            onBlur={formikContact.handleBlur}
                          />
                        </div>
                        <div className="text-end">
                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TrainingPlacements;
