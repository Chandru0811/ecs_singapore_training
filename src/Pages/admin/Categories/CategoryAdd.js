import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import api from "../../../config/BaseUrl";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  logo: Yup.mixed().required("Image is required"),
  title: Yup.string().required("title is required"),
  description: Yup.string(),
});

function CategoryAdd({ onSuccess }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };

  const handleShow = () => setShow(true);

  const formik = useFormik({
    initialValues: {
      logo: null,
      title: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const formData = new FormData();
        formData.append('logo', values.logo);
        formData.append('title', values.title);
        formData.append('description', values.description);

        const response = await api.post("category", formData, {
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
      <button className="btn btn-sm btn-primary" onClick={handleShow}>
        Add Category
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-2">
              <label className="form-label">
                Image<span className="text-danger">*</span>
              </label>
              <div className="mb-3">
                <input
                  type="file"
                  name="logo"
                  className={`form-control ${formik.touched.logo && formik.errors.logo
                    ? "is-invalid"
                    : ""
                    }`}
                  onChange={(event) => {
                    formik.setFieldValue(
                      "logo",
                      event.currentTarget.files[0]
                    );
                  }}
                />
                {formik.touched.logo && formik.errors.logo && (
                  <div className="invalid-feedback">
                    {formik.errors.logo}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-2">
              <label className="form-label">
                Title<span className="text-danger">*</span>
              </label>
              <div className="mb-3">
                <input
                  type="text"
                  name="title"
                  className={`form-control ${formik.touched.title && formik.errors.title
                    ? "is-invalid"
                    : ""
                    }`}
                  {...formik.getFieldProps("title")}
                />
                {formik.touched.title && formik.errors.title && (
                  <div className="invalid-feedback">{formik.errors.title}</div>
                )}
              </div>
            </div>
            <div className="mb-2">
              <label className="form-label">Description</label>
              <div className="mb-3">
                <textarea
                  name="description"
                  className="form-control"
                  {...formik.getFieldProps("description")}
                />
              </div>
            </div>
            <Modal.Footer>
              <Button
                className="btn btn-sm btn-secondary"
                onClick={handleClose}
              >
                Close
              </Button>
              <Button className="btn btn-sm btn-primary" type="submit" disabled={loadIndicator}>
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

export default CategoryAdd;