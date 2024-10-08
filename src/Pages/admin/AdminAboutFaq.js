import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { TbMessage2Exclamation } from "react-icons/tb";
import { FaEdit, FaSave, FaTimes, FaPlus } from "react-icons/fa";
import { useFormik } from "formik";
import AsianStudent from "../../assets/client/About-Aisian-student-scaled.jpeg";
import api from "../../config/BaseUrl";
import toast from "react-hot-toast";
import * as Yup from "yup";
import DeleteModel from "../../components/DeleteModel";

function AdminAboutFaq() {
  const validationSchema = Yup.object({
    question: Yup.string().required("*Question field is required"),
    answer: Yup.string().required("*Answer field is required"),
  });

  const [show, setShow] = useState(false);
  const handleClose = () => {
    modalFormik.resetForm();
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [isEditing, setIsEditing] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [saveloading, setSaveLoading] = useState(false);
  const [publishloading, setPublishLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  const formik = useFormik({
    initialValues: {
      faq: [],
    },
    onSubmit: async (values) => {
      const payload = {
        question: formik.values.faq[editingIndex].question,
        answer: formik.values.faq[editingIndex].answer,
        about_id: 1,
      };
      setLoader(true);
      try {
        const faqId = values.faq[editingIndex]?.id;
        if (faqId) {
          const response = await api.put(`aboutfaq/${faqId}`, payload);
          if (response.status === 200) {
            getData();
            toast.success(response.data.message);
          }
        }
      } catch (error) {
        toast.error("Error updating FAQ", error);
      } finally {
        setIsEditing(null);
        setEditingIndex(null);
        setLoader(false);
      }
    },
  });

  const modalFormik = useFormik({
    initialValues: {
      question: "",
      answer: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const payload = { ...values, about_id: 1 };
      setSaveLoading(true);
      try {
        const response = await api.post("aboutfaq", payload);
        if (response.status === 200) {
          toast.success(response.data.message);
          formik.setFieldValue("faq", [...formik.values.faq, response.data]);
          handleClose();
          resetForm(); // Reset the form after successful submission
        }
        getData();
      } catch (error) {
        toast.error("Error adding FAQ", error);
      } finally {
        setSaveLoading(false);
      }
    },
  });

  const handleEditClick = (field, index) => {
    setIsEditing(field);
    setEditingIndex(index);
  };

  const handleSaveClick = () => {
    formik.handleSubmit();
    setIsEditing(null);
  };

  const handleCancel = () => {
    setIsEditing(null);
    setEditingIndex(null);
    getData();
  };

  const getData = async () => {
    setLoader(true);
    try {
      const response = await api.get("aboutfaq");
      const fetchedData = response.data.data;
      formik.setValues({ ...fetchedData, faq: fetchedData });
      formik.setValues({ ...formik.values, faq: fetchedData });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setSaveLoading(false);
      setLoader(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handlePublish = async () => {
    setPublishLoading(true);
    try {
      const response = await api.post("publish/about/faq");
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      getData();
    } catch (error) {
      toast.error("Error publishing FAQ", error);
    } finally {
      setPublishLoading(false);
    }
  };

  const handleAddAccordion = () => {
    handleShow();
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
        <section>
          <div className="d-flex align-items-center justify-content-between p-2">
            <h4>About Faq</h4>
            <button
              className="btn btn-primary"
              onClick={handlePublish}
              disabled={publishloading}
            >
              {publishloading && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
              )}
              Publish
            </button>
          </div>
          <div className="container mb-4">
            <div className="row">
              <div className="col-md-6 col-12 mb-3 d-flex align-items-center justify-content-center">
                <div className="imgDesign">
                  <img
                    src={AsianStudent}
                    alt="img"
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="d-flex text-start">
                  <div className="d-flex align-items-center justify-content-center">
                    <div
                      className="p-1 mx-2 mb-3"
                      style={{
                        backgroundColor: "#ec9fc2",
                        borderRadius: "5px",
                      }}
                    >
                      <TbMessage2Exclamation color="#AA205E" size={30} />
                    </div>
                    <p className="fw-medium">FAQ Question</p>
                  </div>
                </div>
                <div className="text-start">
                  <h3 className="fw-bold mb-3">
                    Frequently Asked Questions
                  </h3>
                </div>
                <>
                  <div className="accordion" id="accordionExample">
                    <div className="d-flex align-items-center justify-content-end">
                      <button
                        onClick={handleAddAccordion}
                        className="btn mt-3 mb-3"
                      >
                        <FaPlus /> Add New
                      </button>
                    </div>
                    {formik.values.faq?.map((faq, accordionIndex) => (
                      <div className="accordion-item mb-2" key={faq.id}>
                        <div className="d-flex justify-content-end">
                          <FaEdit size={18}
                            onClick={() =>
                              handleEditClick("faq", accordionIndex)
                            }
                            style={{ marginTop: "12px" }}
                            className="ms-3 text-secondary"
                          />
                          <DeleteModel
                            className="text-danger"
                            onSuccess={getData}
                            path={`aboutfaq/${faq.id}`}
                          />
                        </div>
                        {isEditing === "faq" &&
                          editingIndex === accordionIndex ? (
                          <div className="p-3">
                            <input
                              type="text"
                              name={`faq.${accordionIndex}.question`}
                              value={
                                formik.values.faq[accordionIndex]?.question ||
                                ""
                              }
                              onChange={formik.handleChange}
                              className="form-control mb-3"
                            />
                            <textarea
                              name={`faq.${accordionIndex}.answer`}
                              value={
                                formik.values.faq[accordionIndex]?.answer || ""
                              }
                              onChange={formik.handleChange}
                              className="form-control mb-3"
                            />
                            <FaSave
                              className="text-primary"
                              onClick={() => handleSaveClick(accordionIndex)}
                            />
                            <FaTimes
                              onClick={handleCancel}
                              style={{ marginLeft: "10px" }}
                              className="text-danger"
                            />
                          </div>
                        ) : (
                          <div className="accordion-item">
                            <h2 className="accordion-header">
                              <button
                                className="accordion-button collapsed accordion-header text-start"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse${faq.id}`}
                                aria-expanded="false"
                                aria-controls={`collapse${faq.id}`}
                              >
                                {faq.question}
                              </button>
                            </h2>
                            <div
                              id={`collapse${faq.id}`}
                              className="accordion-collapse collapse"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body text-start">
                                {faq.answer}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              </div>
            </div>
          </div>

          {/* Modal */}
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Add FAQ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={modalFormik.handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="question">
                    Question <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="question"
                    name="question"
                    value={modalFormik.values.question}
                    onChange={modalFormik.handleChange}
                    onBlur={modalFormik.handleBlur}
                    className={`form-control ${modalFormik.touched.question &&
                      modalFormik.errors.question
                      ? "is-invalid"
                      : ""
                      }`}
                  />
                  {modalFormik.touched.question &&
                    modalFormik.errors.question && (
                      <div className="invalid-feedback mt-0">
                        {modalFormik.errors.question}
                      </div>
                    )}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="answer">
                    Answer <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="answer"
                    name="answer"
                    value={modalFormik.values.answer}
                    onChange={modalFormik.handleChange}
                    onBlur={modalFormik.handleBlur}
                    className={`form-control ${modalFormik.touched.answer && modalFormik.errors.answer
                      ? "is-invalid"
                      : ""
                      }`}
                  />
                  {modalFormik.touched.answer && modalFormik.errors.answer && (
                    <div className="invalid-feedback mt-0">
                      {modalFormik.errors.answer}
                    </div>
                  )}
                </div>
                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary ms-2"
                    disabled={saveloading}
                  >
                    {saveloading && (
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        aria-hidden="true"
                      ></span>
                    )}
                    Save
                  </button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        </section>
      )}
    </>
  );
}

export default AdminAboutFaq;