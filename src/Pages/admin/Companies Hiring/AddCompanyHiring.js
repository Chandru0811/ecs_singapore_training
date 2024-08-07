import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import api from "../../../config/BaseUrl";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
    company_name: Yup.string().required("*Name is required"),
    company_logo: Yup.string().required("*Image is required")
});

function AddCompanyHiring({ onSuccess }) {
    const [show, setShow] = useState(false);
    const [loadIndicator, setLoadIndicator] = useState(false);

    const handleClose = () => {
        setShow(false);
        formik.resetForm();
    };

    const handleShow = () => setShow(true);

    const formik = useFormik({
        initialValues: {
            company_name: "",
            company_logo: null
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoadIndicator(true);
            try {
                const formData = new FormData();
                formData.append('company_name', values.company_name);
                formData.append('company_logo', values.company_logo);
                const response = await api.post('companyhiring', formData, {
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
                    <Modal.Title>Add Company Hiring</Modal.Title>
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
                                    name="company_name"
                                    className={`form-control ${formik.touched.company_name && formik.errors.company_name
                                        ? "is-invalid"
                                        : ""
                                        }`}
                                    {...formik.getFieldProps("company_name")}
                                />
                                {formik.touched.company_name && formik.errors.company_name && (
                                    <div className="invalid-feedback">{formik.errors.company_name}</div>
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
                                    name="company_logo"
                                    className={`form-control ${formik.touched.company_logo && formik.errors.company_logo
                                        ? "is-invalid"
                                        : ""
                                        }`}
                                    onChange={(event) => {
                                        formik.setFieldValue("company_logo", event.currentTarget.files[0]);
                                    }}
                                />
                                {formik.touched.company_logo && formik.errors.company_logo && (
                                    <div className="invalid-feedback">
                                        {formik.errors.company_logo}
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

export default AddCompanyHiring;