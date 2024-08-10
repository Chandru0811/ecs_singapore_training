import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import api from "../../../config/BaseUrl";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";

function AdminLandingModalEdit({ id, onSuccess }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const handleClose = () => {
    setShow(false);
    getData();
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
        formData.append("_method", "PUT");
        formData.append("name", values.name);
        formData.append("description", values.description);
        if (values.image) {
          formData.append("image", values.image);
        }

        const response = await api.post(`landingpage2/${id}`, formData, {
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
  const getData = async () => {
    try {
      const response = await api.get(`landingpage2/${id}`);
      formik.setValues(response.data.data);
    } catch (error) {
      console.error("Error fetching data ", error);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div>
      <FaEdit className="text-light" onClick={handleShow} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Card</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <form onSubmit={formik.handleSubmit}>
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
                className={`form-control`}
                onChange={(event) => {
                  formik.setFieldValue("image", event.currentTarget.files[0]);
                }}
              />
            </div>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" disabled={loadIndicator}>
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
    </div>
  );
}

export default AdminLandingModalEdit;
