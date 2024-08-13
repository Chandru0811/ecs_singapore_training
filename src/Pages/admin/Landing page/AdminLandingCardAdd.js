import { useFormik } from "formik";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import api from "../../../config/BaseUrl";
import toast from "react-hot-toast";

function AdminLandingCardAdd({ onSuccess }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };

  const handleShow = () => setShow(true);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: null,
    },
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("image", values.image);

        const response = await api.post("update/landingpage2", formData, {
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
      <button className="btn btn-primary" onClick={handleShow}>
        Add Cards
      </button>

      <Modal show={show} onHide={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add Cards</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <div className="p-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                className={`form-control ${
                  formik.touched.name && formik.errors.name ? "is-invalid" : ""
                }`}
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="invalid-feedback">{formik.errors.name}</div>
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

export default AdminLandingCardAdd;
