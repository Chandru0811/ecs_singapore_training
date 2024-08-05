import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../config/BaseUrl";
import toast from "react-hot-toast";
import ReactStars from 'react-rating-stars-component';
import ImageURL from "../../config/ImageURL";

const validationSchema = Yup.object({
  profile: Yup.mixed().required("*Image is required"),
  clientName: Yup.string().required("*Client Name is required"),
  rating: Yup.string().required("*Rating is required"),
  description: Yup.string().required("*Description is required"),
});

function CourseTestimonial() {
  const [show, setShow] = useState(false);
  const [datas, setDatas] = useState([]);

  const fetchDatas = async () => {
    try {
      const response = await api.get("coursetestimonial");
      setDatas(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  const formik = useFormik({
    initialValues: {
      profile: null,
      clientName: "",
      rating: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append('profile', values.profile);
        formData.append('clientName', values.clientName);
        formData.append('rating', values.rating);
        formData.append('description', values.description);

        const response = await api.post("coursetestimonial", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          toast.success(response.data.message);
          handleClose();
          fetchDatas(); // Fetch updated data
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage);
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

  const handleDeleteCard = async (id) => {
    try {
      const response = await api.delete(`coursetestimonial/${id}`);
      if (response.status === 200) {
        toast.success(response.data.message);
        fetchDatas(); // Fetch updated data after deletion
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between p-3 bg-light">
        <h3 className="fw-bold">Course Testimonials</h3>
        <div className="d-flex">
          <button
            type="button"
            className="btn btn-sm btn-primary mx-2"
            onClick={handleShow}
          >
            Add
          </button>
          <button type="button" className="btn btn-sm btn-danger">
            Publish
          </button>
        </div>
      </div>

      <div className="row m-0 p-3">
        {datas.map((data) => (
          <div key={data.id} className="col-md-3 col-12 p-2">
            <div className="h-100 course-cards">
              <div className="head-content">
                <div className="d-flex justify-content-between align-items-start p-2">
                  <button
                    type="button"
                    onClick={() => handleDeleteCard(data.id)}
                    className="btn link-light ms-2"
                    style={{
                      width: "fit-content",
                      height: "fit-content",
                    }}
                  >
                    <FaTrash className="text-light" />
                  </button>
                </div>
                <div className="text-start">
                  <div className="d-flex justify-content-between align-items-center px-2">
                    <div
                      className="d-flex align-items-center"
                      style={{ width: "20%" }}
                    >
                      <img
                        className="img-fluid rounded-circle"
                        src={`${ImageURL}${data.profile_path}`}
                        alt="image"
                      />
                      <span>
                        <h5 className="text-light fw-bold ps-1">
                          {data.clientName}
                        </h5>
                      </span>
                    </div>

                    <div className="rating">
                      <p className="text-light">
                        Rating
                        <span
                          className="ms-2 rounded fw-light px-1"
                          style={{ border: "2px solid #fff" }}
                        >
                          {data.rating}
                          <IoIosStar size={12} style={{ color: "white" }} />
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 text-secondary text-start">
                <p className="card-text">{data.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {formik.values.id ? "Edit Card" : "Add Course Testimonal"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="formClientName">
              <Form.Label>Name</Form.Label><span className="text-danger">*</span>
              <Form.Control
                type="text"
                name="clientName"
                value={formik.values.clientName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.clientName && formik.errors.clientName}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.clientName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formRating">
              <Form.Label>Rating</Form.Label><span className="text-danger">*</span>
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
              <Form.Control.Feedback type="invalid">
                {formik.errors.rating}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label><span className="text-danger">*</span>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.description && formik.errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.description}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label><span className="text-danger">*</span>
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
              <Button variant="primary" type="submit">
                Save
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CourseTestimonial;
