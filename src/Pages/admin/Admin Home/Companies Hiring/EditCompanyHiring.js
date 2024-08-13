import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { FaEdit } from "react-icons/fa";
import api from "../../../../config/BaseUrl";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
    company_name: Yup.string().required("*Name is required"),
});

function EditCompanyHiring({ id, onSuccess }) {
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
                formData.append("_method", "PUT");
                formData.append("company_name", values.company_name);
                if (values.company_logo) {
                    formData.append("company_logo", values.company_logo);
                }
                const response = await api.post(`companyhiring/${id}`, formData, {
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
                const response = await api.get(`companyhiring/${id}`);
                formik.setValues(response.data.data);
            } catch (error) {
                console.error("Error fetching data ", error);
            }
        };
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
                                Image
                            </label>
                            <div className="mb-3">
                                <input
                                    type="file"
                                    name="company_logo"
                                    className={`form-control`}
                                    onChange={(event) => {
                                        formik.setFieldValue(
                                            "company_logo",
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

export default EditCompanyHiring;