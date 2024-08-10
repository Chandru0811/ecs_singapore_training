import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { FaEdit, FaSave, FaTimes, FaPlus, FaTrash } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";
import api from "../../../config/BaseUrl";

function TrainingPlacements() {
  const [isEditing, setIsEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [datas, setDatas] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [show, setShow] = useState(false);
  const [newAccordion, setNewAccordion] = useState({
    question: "",
    answer: "",
  });

  //Form Validation
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

  const formikContact = useFormik({
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

  const formik = useFormik({
    initialValues: {
      aboutAccordion: [],
      id: null,
    },
    onSubmit: async (values) => {
      const { id, aboutAccordion } = values;
      console.log("Training Placements Data:", values);
      const faqId = formik.values.aboutAccordion[editingIndex];
      console.log("objectwww", faqId);
      const datas = {
        ques_and_ans: [faqId],
      };

      try {
        const response = await api.put(`homefaq/${id}`, datas);
        if (response.status === 200) {
          getData();
          console.log("updated", response.data);
        }
      } catch (e) {
        console.log("object", e);
      } finally {
        setIsEditing(null);
      }
    },
  });

  const handleSaveClick = (id) => {
    if (id) {
      formik.setFieldValue("id", id);
      formik.handleSubmit();
    } else {
      formik.setFieldValue("id", null);
      formik.handleSubmit();
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEditClick = (field, index) => {
    setIsEditing(field);
    setEditingIndex(index);
  };

  const handleSaveNewAccordion = async () => {
    const ques_and_ans = {
      ques_and_ans: [newAccordion],
    };
    try {
      const response = await api.post("homefaq", ques_and_ans);
      if (response.data.status === 200) {
        getData();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setNewAccordion({
        answer: "",
        question: "",
      });
      handleClose();
    }
  };

  const handleChangeNewAccordion = (e) => {
    const { name, value } = e.target;
    setNewAccordion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRemoveAccordion = async (index) => {
    try {
      const response = await api.delete(`homefaq/${index}`);
      if (response.data.status === 200) {
        getData();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getData = async () => {
    // setLoading(true)
    try {
      const response = await api.get("homefaq");
      if (response.data.status === 200) {
        setDatas(response.data.data);
        formik.setFieldValue(
          "aboutAccordion",
          datas.map((dataItem) => ({
            question: dataItem.ques_and_ans[0].question,
            answer: dataItem.ques_and_ans[0].answer,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  
  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <div className="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      ) : (
        <div>
          <div className="container-fluid d-flex justify-content-between p-2 bg-light">
            <h3 className="fw-bold"> Home FAQ</h3>
            <button className="btn btn-sm btn-danger">Publish</button>
          </div>
          <div>
            <div className="container-fluid trainingplacements mt-3 mb-5">
              <h1 className="secondheading text-start mb-3">
                Cloud Ecs , Software Training and Placements in India
              </h1>
              <div className="row d-flex">
                <div className="col-md-6 col-12">
                  <div className="accordion" id="accordionExample">
                    <div className="d-flex align-items-center justify-content-end">
                      <button className="btn" onClick={handleShow}>
                        <FaPlus className="" /> Add New
                      </button>
                    </div>
                    {datas.map((item, index) => (
                      <div className="accordion-item mb-2" key={item.id}>
                        <div className="d-flex align-items-end justify-content-end">
                          <button
                            className="btn"
                            onClick={() =>
                              handleEditClick("aboutAccordion", index)
                            }
                          >
                            <FaEdit />
                          </button>

                          <button
                            className="btn"
                            onClick={() => handleRemoveAccordion(item.id)}
                          >
                            <FaTrash className="text-danger " />
                          </button>
                        </div>
                        {isEditing === "aboutAccordion" &&
                        editingIndex === index ? (
                          <div className="p-3">
                            <input
                              type="text"
                              name={`aboutAccordion.${index}.question`}
                              value={
                                formik.values.aboutAccordion[index]?.question ||
                                ""
                              }
                              onChange={formik.handleChange}
                              className="form-control mb-3"
                            />
                            <textarea
                              name={`aboutAccordion.${index}.answer`}
                              value={
                                formik.values.aboutAccordion[index]?.answer ||
                                ""
                              }
                              onChange={formik.handleChange}
                              className="form-control mb-3"
                            />
                            <div className="d-flex">
                              <FaSave
                                onClick={() => handleSaveClick(item.id)}
                                className="mx-2 text-primary"
                              />
                              <FaTimes
                                onClick={handleCancel}
                                className="text-danger"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="accordion-item">
                            <h2 className="accordion-header">
                              <button
                                className="accordion-button collapsed accordion-header"
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
                  {/* {/ Modal for adding new accordion /} */}
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
                        onChange={handleChangeNewAccordion}
                        className="form-control mb-3"
                      />
                      <textarea
                        type="text"
                        name="answer"
                        placeholder="Answer"
                        value={newAccordion.answer}
                        onChange={handleChangeNewAccordion}
                        className="form-control mb-3"
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <FaSave
                        onClick={handleSaveNewAccordion}
                        className="mx-2 text-primary"
                      />
                      <FaTimes onClick={handleClose} className="text-danger" />
                    </Modal.Footer>
                  </Modal>
                </div>
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
                              formikContact.errors.firstName
                                ? "is-invalid"
                                : ""
                            }`}
                            {...formikContact.getFieldProps("firstName")}
                          />
                          {formikContact.touched.firstName &&
                            formikContact.errors.firstName && (
                              <div className="invalid-feedback">
                                {formikContact.errors.firstName}
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
                              formikContact.touched.lastName &&
                              formikContact.errors.lastName
                                ? "is-invalid"
                                : ""
                            }`}
                            {...formikContact.getFieldProps("lastName")}
                          />
                          {formikContact.touched.lastName &&
                            formikContact.errors.lastName && (
                              <div className="invalid-feedback">
                                {formikContact.errors.lastName}
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
                              formikContact.touched.email &&
                              formikContact.errors.email
                                ? "is-invalid"
                                : ""
                            }`}
                            {...formikContact.getFieldProps("email")}
                          />
                          {formikContact.touched.email &&
                            formikContact.errors.email && (
                              <div className="invalid-feedback">
                                {formikContact.errors.email}
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
                              formikContact.touched.phoneNumber &&
                              formikContact.errors.phoneNumber
                                ? "is-invalid"
                                : ""
                            }`}
                            {...formikContact.getFieldProps("phoneNumber")}
                          />
                          {formikContact.touched.phoneNumber &&
                            formikContact.errors.phoneNumber && (
                              <div className="invalid-feedback">
                                {formikContact.errors.phoneNumber}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-12 text-start">
                          <label className="form-label">Message</label>
                          <textarea
                            className="form-control homeInput"
                            {...formikContact.getFieldProps("message")}
                          ></textarea>
                        </div>
                      </div>
                      <div className="text-start">
                        <button type="submit" className="btn submitBtn btn-lg">
                          Send Message
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
    </div>
  );
}

export default TrainingPlacements;
