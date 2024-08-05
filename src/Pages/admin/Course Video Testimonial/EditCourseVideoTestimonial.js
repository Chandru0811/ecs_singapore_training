import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { FaEdit } from "react-icons/fa";

const validationSchema = Yup.object({
    client_name: Yup.string().required("*Name is required"),
    description: Yup.string().required("*Description is required"),
    video: Yup.string().required("*Video is required")
});

function EditCourseVideoTestimonial({ onSuccess }) {
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
            description: "",
            video: null
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values);
        }
    });

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
                                Video<span className="text-danger">*</span>
                            </label>
                            <div className="mb-3">
                                <input
                                    type="file"
                                    name="video"
                                    className={`form-control ${formik.touched.video && formik.errors.video
                                        ? "is-invalid"
                                        : ""
                                        }`}
                                    onChange={(event) => {
                                        formik.setFieldValue(
                                            "video",
                                            event.currentTarget.files[0]
                                        );
                                    }}
                                />
                                {formik.touched.video && formik.errors.video && (
                                    <div className="invalid-feedback">
                                        {formik.errors.video}
                                    </div>
                                )}
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