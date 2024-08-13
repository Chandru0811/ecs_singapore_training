import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { FaEdit } from "react-icons/fa";
import api from "../../../config/BaseUrl";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
    client_name: Yup.string().required("*Name is required"),
    description: Yup.string().required("*Description is required"),
});

function EditCourseVideoTestimonial({ id, onSuccess }) {
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
            description: "",
            video: null
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoadIndicator(true);
            try {
                const formData = new FormData();
                formData.append("_method", "PUT");
                formData.append("client_name", values.client_name);
                formData.append("description", values.description);
                if (values.video) {
                    formData.append("video", values.video);
                }
                const response = await api.post(`videotestimonial/${id}`, formData, {
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
                const response = await api.get(`videotestimonial/${id}`);
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
            <button className="btn text-secondary" onClick={handleShow}>
                <FaEdit />
            </button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Online Training Review</Modal.Title>
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
                                    className={`form-control ${formik.touched.client_name && formik.errors.client_name
                                        ? "is-invalid"
                                        : ""
                                        }`}
                                    {...formik.getFieldProps("client_name")}
                                />
                                {formik.touched.client_name && formik.errors.client_name && (
                                    <div className="invalid-feedback">{formik.errors.client_name}</div>
                                )}
                            </div>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Description<span className="text-danger">*</span></label>
                            <div className="mb-3">
                                <textarea
                                    name="description"
                                    rows="5"
                                    className={`form-control ${formik.touched.description && formik.errors.description
                                        ? "is-invalid"
                                        : ""
                                        }`}
                                    {...formik.getFieldProps("description")}
                                />
                                {formik.touched.description && formik.errors.description && (
                                    <div className="invalid-feedback">{formik.errors.description}</div>
                                )}
                            </div>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">
                                Video
                            </label>
                            <div className="mb-3">
                                <input
                                    type="file"
                                    name="video"
                                    className={`form-control`}
                                    onChange={(event) => {
                                        formik.setFieldValue(
                                            "video",
                                            event.currentTarget.files[0]
                                        );
                                    }}
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

export default EditCourseVideoTestimonial;