import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import api from "../../../config/BaseUrl";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";

const validationSchema = Yup.object({
  client_name: Yup.string().required("*Client Name is required"),
  designation: Yup.string().required("*Designation is required"),
  rating: Yup.string().required("*Rating is required"),
  title: Yup.string().required("*Title is required"),
  description: Yup.string().required("*Description is required"),
});

function AdminTestimonialEdit({ id, onSuccess }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const handleClose = () => {
    setShow(false);
    getData();
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
        formData.append("_method", "PUT");
        formData.append("client_name", values.client_name);
        formData.append("designation", values.designation);
        formData.append("rating", values.rating);
        formData.append("title", values.title);
        formData.append("description", values.description);
        if (values.image) {
          formData.append("image", values.image);
        }

        const response = await api.post(`testimonial/${id}`, formData, {
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
        const response = await api.get(`testimonial/${id}`);
        formik.setValues(response.data.data);
      } catch (error) {
        console.error("Error fetching data ", error);
      }
    };

    useEffect(() => {
    getData();
  }, [id]);

  return (
    <>
      <FaEdit className="text-secondary" onClick={handleShow} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Testimonial</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <form onSubmit={formik.handleSubmit}>
            <div className="p-2">
              <label htmlFor="client_name">Name</label>
              <input
                type="text"
                name="client_name"
                value={formik.values.client_name}
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
              <label htmlFor="rating">Rating</label>
              <ReactStars
                count={5}
                value={formik.values.rating}
                onChange={(newValue) =>
                  formik.setFieldValue("rating", newValue)
                }
                size={24}
                isHalf={false}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
                name="rating"
                className={`form-control ${formik.touched.rating && formik.errors.rating
                  ? "is-invalid"
                  : ""
                }`}
              />
              {formik.touched.rating && formik.errors.rating && (
                <div className="error text-danger">{formik.errors.rating}</div>
              )}
            </div>
            <div className="p-2">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
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
    </>
  );
}

export default AdminTestimonialEdit;
