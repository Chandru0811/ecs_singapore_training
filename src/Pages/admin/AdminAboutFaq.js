import React, { useState, useEffect } from "react";
import { IoIosCloseCircleOutline, IoMdAdd } from "react-icons/io";
import { Modal } from "react-bootstrap";
import { TbMessage2Exclamation } from "react-icons/tb";
import { FaEdit, FaSave, FaTimes, FaPlus, FaTrash } from "react-icons/fa";
import { useFormik } from "formik";
import AsianStudent from "../../assets/client/About-Aisian-student-scaled.jpeg";
import api from "../../config/BaseUrl";
import toast from "react-hot-toast";

function AdminAboutFaq() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isEditing, setIsEditing] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newAccordion, setNewAccordion] = useState({
    question: "",
    answer: "",
  });
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      aboutAsianStudent: AsianStudent,
      aboutFAQTitle: "Frequently Asked Questions",
      faq: [],
    },
    onSubmit: async (values) => {
      const payload = {
        question: formik.values.faq[editingIndex].question,
        answer: formik.values.faq[editingIndex].answer,
        about_id: 1,
      };
      try {
        const faqId = values.faq[editingIndex]?.id;
        if (faqId) {
          const response = await api.put(`aboutfaq/${faqId}`, payload);
          if (response.status === 200) {
            getData();
            toast.success("FAQ updated successfully");
          }
        }
      } catch (e) {
        toast.error("Error updating FAQ");
      } finally {
        setIsEditing(null);
        setEditingIndex(null);
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

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue(fieldName, reader.result);
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
    setEditingIndex(null);
    getData();
  };

  const getData = async () => {
    try {
      const response = await api.get("aboutfaq");
      const fetchedData = response.data.data;
      formik.setValues({ ...fetchedData, faq: fetchedData });
      setDatas(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handlePublish = async () => {
    try {
      const response = await api.post("publish/about/faq");
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      getData();
    } catch (error) {
      toast.error("Error publishing FAQ");
    }
  };

  const handleAddAccordion = () => {
    handleShow();
  };

  const handleSaveNewAccordion = async () => {
    const payload = { ...newAccordion, about_id: 1 };
    try {
      const response = await api.post("aboutfaq", payload);
      if (response.status === 200) {
        toast.success("FAQ added successfully");
        formik.setFieldValue("faq", [...formik.values.faq, response.data]);
        handleClose();
        setNewAccordion({ question: "", answer: "" });
      }
      getData();
    } catch (error) {
      toast.error("Error adding FAQ");
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
    const payload = { ...newAccordion, about_id: 1 };
    try {
      const faqId = formik.values.faq[index]?.id;
      if (faqId) {
        const response = await api.delete(`aboutfaq/${faqId}`, payload);
        if (response.status === 200) {
          toast.success("FAQ Deleted successfully");
          const updatedFaq = formik.values.faq.filter((_, i) => i !== index);
          formik.setFieldValue("faq", updatedFaq);
        }
      }
    } catch (error) {
      toast.error("Error deleting FAQ");
    }
  };

  return (
    <section>
      <div className="d-flex align-items-center justify-content-between p-2">
        <h4>About Faq</h4>
        <button className="btn btn-primary" onClick={handlePublish}>
          Publish
        </button>
      </div>
      <div className="container mb-4">
        <div className="row">
          <div className="col-md-6 col-12 mb-3 d-flex align-items-center justify-content-center">
            <div>
              {isEditing === "aboutAsianStudent" ? (
                <div>
                  <div className="d-flex justify-content-center mb-2">
                    <FaSave
                      onClick={handleSaveClick}
                      className="text-secondary"
                    />
                    <FaTimes
                      onClick={handleCancel}
                      style={{ marginLeft: "10px" }}
                      className="text-secondary"
                    />
                  </div>
                  <input
                    type="file"
                    name="aboutAsianStudent"
                    onChange={(e) => handleFileChange(e, "aboutAsianStudent")}
                    className="form-control mb-3"
                    style={{ margin: "0 auto", width: "300px" }}
                  />
                </div>
              ) : null}
              <>
                {isEditing !== "aboutAsianStudent" && (
                  <>
                    {/* <FaEdit
                    onClick={() => handleEditClick("aboutAsianStudent")}
                    className="text-secondary "
                  /> */}
                  </>
                )}
                <div className="imgDesign">
                  <img
                    src={AsianStudent}
                    // src={formik.values.aboutAsianStudent}
                    alt="img"
                    className="img-fluid"
                  />
                </div>
              </>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="d-flex text-start">
              <div className="d-flex align-items-center justify-content-center">
                <div
                  className="p-1 mx-2 mb-3"
                  style={{ backgroundColor: "#ec9fc2", borderRadius: "5px" }}
                >
                  <TbMessage2Exclamation color="#AA205E" size={30} />
                </div>
                <p className="fw-medium">FAQ Question</p>
              </div>
            </div>
            <div className="text-start">
              {isEditing === "aboutFAQTitle" ? (
                <div>
                  <div className="d-flex justify-content-center mb-2">
                    <FaSave
                      onClick={handleSaveClick}
                      className="text-secondary"
                    />
                    <FaTimes
                      onClick={handleCancel}
                      style={{ marginLeft: "10px" }}
                      className="text-secondary"
                    />
                  </div>
                  <input
                    type="text"
                    name="aboutFAQTitle"
                    value={formik.values.aboutFAQTitle}
                    onChange={formik.handleChange}
                    className="form-control mb-2"
                  />
                </div>
              ) : (
                <>
                  <div>
                    {/* <FaEdit
                      onClick={() => handleEditClick("aboutFAQTitle")}
                      className="text-secondary"
                    /> */}
                    <h3 className="fw-bold mb-3">
                      {/* {formik.values.aboutFAQTitle} */}
                      Frequently Asked Questions
                    </h3>
                  </div>
                </>
              )}
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
                    <div className="d-flex align-items-end justify-content-end p-3">
                      <FaSave onClick={() => handleSaveClick(accordionIndex)} />
                      <FaEdit
                        onClick={() => handleEditClick("faq", accordionIndex)}
                        className="ms-3"
                      />
                      <FaTrash
                        onClick={() => handleRemoveAccordion(accordionIndex)}
                        className="text-danger ms-3"
                      />
                    </div>
                    {isEditing === "faq" && editingIndex === accordionIndex ? (
                      <div className="p-3">
                        <input
                          type="text"
                          name={`faq.${accordionIndex}.question`}
                          value={
                            formik.values.faq[accordionIndex]?.question || ""
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
                        <FaTimes
                          onClick={handleCancel}
                          style={{ marginLeft: "10px" }}
                          className="text-secondary"
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
          <form>
            <div className="form-group mb-3">
              <label htmlFor="question">Question</label>
              <input
                type="text"
                className="form-control"
                id="question"
                name="question"
                value={newAccordion.question}
                onChange={handleChangeNewAccordion}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="answer">Answer</label>
              <textarea
                className="form-control"
                id="answer"
                name="answer"
                value={newAccordion.answer}
                onChange={handleChangeNewAccordion}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handleSaveNewAccordion}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default AdminAboutFaq;
