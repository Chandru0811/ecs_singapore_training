import React, { useState, useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../config/BaseUrl";
import toast from "react-hot-toast";
import ReactStars from "react-rating-stars-component";
import ImageURL from "../../config/ImageURL";
import EditCourseTestimonial from "./EditCourseTestimonial";
import DeleteModel from "../../components/DeleteModel";

const validationSchema = Yup.object({
  profile: Yup.mixed().required("*Image is required"),
  client_name: Yup.string().required("*Client Name is required"),
  rating: Yup.string().required("*Rating is required"),
  description: Yup.string().required("*Description is required"),
});

function CourseTestimonial() {
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [datas, setDatas] = useState([]);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const fetchDatas = async () => {
    setLoading(true);
    try {
      const response = await api.get("coursetestimonial");
      setDatas(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  const formik = useFormik({
    initialValues: {
      profile: null,
      client_name: "",
      rating: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const formData = new FormData();
        formData.append("profile", values.profile);
        formData.append("client_name", values.client_name);
        formData.append("rating", values.rating);
        formData.append("description", values.description);

        const response = await api.post("coursetestimonial", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          toast.success(response.data.message);
          handleClose();
          fetchDatas();
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

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue("profile", file);
    }
  };

  const handleRatingChange = (newRating) => {
    formik.setFieldValue("rating", newRating);
  };

  const PublishCourseTestimonial = async () => {
    setLoadIndicator(true);
    try {
      const response = await api.post("/publish/coursetestimonial", null, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        toast.success(
          response.data.message ||
          "Course Testimonials Changes Published Successfully!"
        );
      } else {
        console.error("Publishing Course Testimonial failed");
        toast.error(response.data.message || "Failed to publish.");
      }
      fetchDatas();
    } catch (error) {
      console.error("Error publishing data:", error.message);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An error occurred during publishing.";
      toast.error(errorMessage);
    } finally {
      setLoadIndicator(false);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between p-3 bg-light">
        <h3 className="fw-bold">Course Testimonials</h3>
        <div className="d-flex">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleShow}
            onSuccess={fetchDatas}
          >
            Add +
          </button>
          <button
            type="button"
            className="btn btn-danger mx-2"
            onClick={PublishCourseTestimonial}
            disabled={loadIndicator}
          >
            {loadIndicator && (
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              ></span>
            )}
            Publish
          </button>
        </div>
      </div>
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
        <div className="row m-0 p-3">
          {datas.map((data) => (
            <div key={data.id} className="col-md-3 col-12 p-2">
              <div className="h-100 course-cards">
                <div className="card-header head-content">
                  <div className="d-flex justify-content-between align-items-start p-2">
                    <EditCourseTestimonial id={data.id} onSuccess={fetchDatas} />
                    <DeleteModel onSuccess={fetchDatas} className="text-danger"
                      path={`/coursetestimonial/${data.id}`} />
                  </div>
                  <div className="row">
                    <div
                      className="col-md-9 col-12"
                      style={{ minHeight: "70px" }}
                    >
                      <div className="d-flex align-items-center">
                        <img
                          className="img-fluid rounded-circle"
                          src={`${ImageURL}${data.profile_path}`}
                          alt="image"
                          style={{ width: "30%", height: "30%" }}
                        />
                        <p className="text-light fw-bold ps-1 text-start">
                          {data.client_name}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-3 col-12">
                      <div className="d-flex align-items-center">
                        <span
                          className="ms-2 rounded text-light fw-light px-1"
                          style={{ border: "2px solid #fff" }}
                        >
                          {data.rating}
                          <IoIosStar size={18} style={{ color: "white" }} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="p-3 text-secondary text-start">
                    <p className="card-text">{data.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {formik.values.id ? "Edit Card" : "Add Course Testimonial"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="formclient_name">
              <Form.Label>Name</Form.Label>
              <span className="text-danger">*</span>
              <Form.Control
                type="text"
                name="client_name"
                value={formik.values.client_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.client_name && formik.errors.client_name
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.client_name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formRating">
              <Form.Label>Rating</Form.Label>
              <span className="text-danger">*</span>
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
                className={`form-control ${formik.touched.rating && formik.errors.rating
                  ? "is-invalid"
                  : ""
                  }`}
              />
              {formik.touched.rating && formik.errors.rating && (
                <div className="error text-danger">{formik.errors.rating}</div>
              )}
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <span className="text-danger">*</span>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.description && formik.errors.description
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.description}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <span className="text-danger">*</span>
              <Form.Control
                type="file"
                name="profile"
                onChange={handleImageChange}
                isInvalid={formik.touched.profile && formik.errors.profile}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.profile}
              </Form.Control.Feedback>
            </Form.Group>
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
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CourseTestimonial;