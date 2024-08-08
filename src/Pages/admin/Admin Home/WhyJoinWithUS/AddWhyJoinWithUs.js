import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import api from "../../../../config/BaseUrl";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
    image_path: Yup.string().required("*Image is required"),
    title: Yup.string().required("*Title is required"),
    description: Yup.string().required("*Description is required"),
});
function AddWhyJoinWithUs({ onSuccess }) {
    const [show, setShow] = useState(false);
    const [loadIndicator, setLoadIndicator] = useState(false);

    const handleClose = () => {
        setShow(false);
        formik.resetForm();
    };

    const handleShow = () => setShow(true);

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            image_path: null
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoadIndicator(true);
            try {
                const formData = new FormData();
                formData.append('title', values.title);
                formData.append('description', values.description);
                formData.append('image_path', values.image_path);
                const response = await api.post('homesection2', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
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
                Add +
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Why Join With Us</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={formik.handleSubmit}>
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
                            <label className="form-label">
                                Description<span className="text-danger">*</span>
                            </label>
                            <div className="mb-3">
                                <textarea
                                    name="description"
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
                                Image<span className="text-danger">*</span>
                            </label>
                            <div className="mb-3">
                                <input
                                    type="file"
                                    name="image_path"
                                    className={`form-control ${formik.touched.image_path && formik.errors.image_path
                                        ? "is-invalid"
                                        : ""
                                        }`}
                                    onChange={(event) => {
                                        formik.setFieldValue("image_path", event.currentTarget.files[0]);
                                    }}
                                />
                                {formik.touched.image_path && formik.errors.image_path && (
                                    <div className="invalid-feedback">
                                        {formik.errors.image_path}
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

export default AddWhyJoinWithUs
