import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import api from "../../../config/BaseUrl";
import toast from "react-hot-toast";
const SUPPORTED_VIDEO_FORMATS = [
  "video/mp4",
  "video/avi",
  "video/mkv",
  "video/webm",
];
const validationSchema = Yup.object({
  client_name: Yup.string().required("*Name is required"),
  description: Yup.string().required("*Description is required"),
  video: Yup.mixed()
    .required("*Video is required")
    .test(
      "fileFormat",
      "*Unsupported file format",
      (value) => value && SUPPORTED_VIDEO_FORMATS.includes(value.type)
    ),
});

function AddCourseVideoTestimonial({ onSuccess }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };

  const handleShow = () => setShow(true);

  const formik = useFormik({
    initialValues: {
      client_name: "",
      description: "",
      video: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const formData = new FormData();
        formData.append("client_name", values.client_name);
        formData.append("description", values.description);
        formData.append("video", values.video);
        const response = await api.post("videotestimonial", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status === 200) {
          onSuccess();
          handleClose();
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage);
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div class="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      ) : (
        <button className="btn btn-primary btn-sm" onClick={handleShow}>
          Add +
        </button>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Online Training Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-2">
              <label className="form-label">
                Name<span className="text-danger">*</span>
              </label>
              <div className="mb-3">
                <input
                  type="text"
                  name="client_name"
                  className={`form-control ${
                    formik.touched.client_name && formik.errors.client_name
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("client_name")}
                />
                {formik.touched.client_name && formik.errors.client_name && (
                  <div className="invalid-feedback">
                    {formik.errors.client_name}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-2">
              <label className="form-label">
                Description<span className="text-danger">*</span>
              </label>
              <div className="mb-3">
                <textarea
                  name="description"
                  rows="5"
                  className={`form-control ${
                    formik.touched.description && formik.errors.description
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("description")}
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="invalid-feedback">
                    {formik.errors.description}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-2">
              <label className="form-label">
                Video<span className="text-danger">*</span>
              </label>
              <div className="mb-3">
                <input
                  type="file"
                  name="video"
                  className={`form-control ${
                    formik.touched.video && formik.errors.video
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={(event) => {
                    formik.setFieldValue("video", event.currentTarget.files[0]);
                  }}
                />
                {formik.touched.video && formik.errors.video && (
                  <div className="invalid-feedback">{formik.errors.video}</div>
                )}
              </div>
            </div>
            <Modal.Footer>
              <Button
                className="btn btn-sm btn-secondary"
                onClick={handleClose}
              >
                Close
              </Button>
              <Button
                className="btn btn-sm btn-primary"
                type="submit"
                disabled={loadIndicator}
              >
                {loadIndicator && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                )}
                Submit
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddCourseVideoTestimonial;
