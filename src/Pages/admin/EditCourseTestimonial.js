import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Modal, Button, Form } from "react-bootstrap";
import ReactStars from 'react-rating-stars-component';
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import api from "../../config/BaseUrl";

const validationSchema = Yup.object({
    // profile: Yup.mixed().required("*Image is required"),
    client_name: Yup.string().required("*Client Name is required"),
    rating: Yup.string().required("*Rating is required"),
    description: Yup.string().required("*Description is required"),
});

function EditCourseTestimonial({ id, onSuccess }) {
    const [show, setShow] = useState(false);
    const [loadIndicator, setLoadIndicator] = useState(false);

    const formik = useFormik({
        initialValues: {
            profile: "",
            client_name: "",
            rating: "",
            description: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoadIndicator(true);
            try {
                const formData = new FormData();
                formData.append("_method", "PUT");
                if (values.profile) {
                    formData.append("profile", values.profile);
                }
                formData.append("client_name", values.client_name);
                formData.append("rating", values.rating);
                formData.append("description", values.description);

                const response = await api.post(`coursetestimonial/${id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.status === 200) {
                    toast.success(response.data.message);
                    handleClose();
                    if (onSuccess) onSuccess();
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
                const response = await api.get(`coursetestimonial/${id}`);
                const data = response.data.data;
                formik.setValues({
                    profile: data.profile,
                    client_name: data.client_name,
                    rating: data.rating,
                    description: data.description,
                });
            } catch (error) {
                console.error("Error fetching data ", error);
            }
        };
        if (show) {
            getData();
        }
    }, [id, show]);

    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () => {
        setShow(true);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            formik.setFieldValue("profile", file);

        }
    };

    return (
        <div>
            <button
                type="button"
                className="btn link-light ms-2"
                style={{ width: "fit-content", height: "fit-content" }}
                onClick={handleShow}
            >
                <FaEdit />
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Course Testimonial</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group controlId="formclient_name">
                            <Form.Label>Client Name</Form.Label><span className="text-danger">*</span>
                            <Form.Control
                                type="text"
                                name="client_name"
                                value={formik.values.client_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.client_name && formik.errors.client_name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.client_name}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formRating">
                            <Form.Label>Rating</Form.Label><span className="text-danger">*</span>
                            <ReactStars
                                count={5}
                                value={formik.values.rating}
                                onChange={(newRating) => formik.setFieldValue("rating", newRating)}
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
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={formik.handleSubmit} disabled={loadIndicator}>
                        {loadIndicator && (
                            <span
                                className="spinner-border spinner-border-sm me-2"
                                aria-hidden="true"
                            ></span>
                        )}
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EditCourseTestimonial;
