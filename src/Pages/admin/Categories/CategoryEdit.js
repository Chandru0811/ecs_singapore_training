import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { FaEdit } from "react-icons/fa";
import api from "../../../config/BaseUrl";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  title: Yup.string().required("title is required"),
  description: Yup.string(),
});

function CategoryEdit({ id, onSuccess }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const handleClose = () => setShow(false);
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
        formData.append("_method", "PUT");
        formData.append("logo", values.logo);
        formData.append("title", values.title);
        formData.append("description", values.description);

        const response = await api.post(`category/${id}`, formData, {
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

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`category/${id}`);
        formik.setValues(response.data.data);
      } catch (error) {
        console.error("Error fetching data ", error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <span onClick={handleShow}>
        <FaEdit />
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-2">
              <label className="form-label">
                Image<span className="text-danger">*</span>
              </label>
              <input
                type="file"
                name="logo"
                className={`form-control`}
                onChange={(event) => {
                  formik.setFieldValue("logo", event.currentTarget.files[0]);
                }}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">
                Title<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="title"
                className={`form-control ${formik.touched.title && formik.errors.title ? "is-invalid" : ""}`}
                {...formik.getFieldProps("title")}
              />
              {formik.touched.title && formik.errors.title && (
                <div className="invalid-feedback">{formik.errors.title}</div>
              )}
            </div>
            <div className="mb-2">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control"
                {...formik.getFieldProps("description")}
              />
            </div>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" disabled={loadIndicator}>
                {loadIndicator && (
                  <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
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

export default CategoryEdit;