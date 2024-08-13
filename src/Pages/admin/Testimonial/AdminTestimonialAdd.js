import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import api from "../../../config/BaseUrl";
import toast from "react-hot-toast";
import ReactStars from "react-rating-stars-component";

const FILE_SIZE = 2048 * 1024; // 2048 KB in bytes
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const validationSchema = Yup.object({
  client_name: Yup.string().required("*Client Name is required"),
  designation: Yup.string().required("*Designation is required"),
  rating: Yup.string().required("*Rating is required"),
  title: Yup.string().required("*Title is required"),
  description: Yup.string().required("*Description is required"),
  image: Yup.mixed()
    .required("*Image is required")
    .test(
      "fileSize",
      "File too large. Maximum size is 2 MB.",
      (value) => value && value.size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "Unsupported Format. Please use jpg, jpeg, or png.",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
});

function AdminTestimonialAdd({ onSuccess }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };

  const handleShow = () => setShow(true);

  const formik = useFormik({
    initialValues: {
      client_name: "",
      designation: "",
      rating: "",
      title: "",
      description: "",
      image: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const formData = new FormData();
        formData.append("client_name", values.client_name);
        formData.append("designation", values.designation);
        formData.append("rating", values.rating);
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("image", values.image);

        const response = await api.post("testimonial", formData, {
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

  const handleRatingChange = (newRating) => {
    formik.setFieldValue("rating", newRating);
  };

  const handleCardImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue("image", file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <button className="btn btn-primary btn-sm" onClick={handleShow}>
        Add +
      </button>

      <Modal show={show} onHide={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add Testimonial</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <div className="p-2">
              <label htmlFor="client_name">Name</label>
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
            <div className="p-2">
              <label htmlFor="designation">Designation</label>
              <input
                type="text"
                name="designation"
                onChange={formik.handleChange}
                className={`form-control ${
                  formik.touched.designation && formik.errors.designation
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("designation")}
              />
              {formik.touched.designation && formik.errors.designation && (
                <div className="invalid-feedback">
                  {formik.errors.designation}
                </div>
              )}
            </div>
            <div className="p-2">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                onChange={formik.handleChange}
                className={`form-control ${
                  formik.touched.title && formik.errors.title
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("title")}
              />
              {formik.touched.title && formik.errors.title && (
                <div className="invalid-feedback">{formik.errors.title}</div>
              )}
            </div>
            <div className="p-2">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                onChange={formik.handleChange}
                className={`form-control ${
                  formik.touched.description && formik.errors.description
                    ? "is-invalid"
                    : ""
                }`}
                style={{ height: "100px" }}
                {...formik.getFieldProps("description")}
              />
              {formik.touched.description && formik.errors.description && (
                <div className="invalid-feedback">
                  {formik.errors.description}
                </div>
              )}
            </div>
            <div className="p-2">
              <label htmlFor="description">Rating</label>
              <ReactStars
                count={5}
                value={formik.values.rating}
                onChange={handleRatingChange}
                size={24}
                isHalf={false}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
                name="rating"
              />
              {formik.touched.rating && formik.errors.rating && (
                <div className="error text-danger">{formik.errors.rating}</div>
              )}
            </div>
            <div className="p-2">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                name="image"
                onChange={(event) => {
                  formik.setFieldValue("image", event.currentTarget.files[0]);
                }}
                className={`form-control ${
                  formik.touched.image && formik.errors.image
                    ? "is-invalid"
                    : ""
                }`}
                accept=".jpg, .jpeg, .png"
              />
              {formik.touched.image && formik.errors.image && (
                <div className="invalid-feedback">{formik.errors.image}</div>
              )}
            </div>
            <div className="d-flex justify-content-end mt-3">
              <button
                className="btn btn-sm btn-secondary"
                onClick={handleClose}
                type="button"
              >
                Close
              </button>
              <button
                className="btn btn-sm btn-primary mx-2"
                type="submit"
                disabled={loadIndicator}
              >
                {loadIndicator && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                )}
                Save
              </button>
            </div>
          </Modal.Body>
        </form>
      </Modal>
    </>
  );
}

export default AdminTestimonialAdd;
