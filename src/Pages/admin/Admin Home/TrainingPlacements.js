import { useFormik } from 'formik';
import React, { useState } from 'react'
import { FaEdit, FaSave, FaTimes, FaPlus, FaTrash } from 'react-icons/fa';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Modal } from 'react-bootstrap';
import * as Yup from "yup";

function TrainingPlacements() {
    const [isEditing, setIsEditing] = useState(null);
    const [loading, setLoading] = useState(false);

    //Form Validation
    const validationSchema = Yup.object({
        firstName: Yup.string().required("*First Name is required"),
        lastName: Yup.string().required("*Last Name is required"),
        email: Yup.string()
            .email("*Invalid Email Address")
            .required("*Email is required"),
        phoneNumber: Yup.string()
            .matches(/^\d+$/, "*Must be a Number")
            .min(8, "*Invalid Phone Number")
            .max(10, "*Invalid Phone Number")
            .required("*Phone Number is required")
    });

    const formikContact = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            message: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log("Contact Details:", values);
        },
    });

    const formik = useFormik({
        initialValues: {
            aboutAccordion: [
                {
                    id: 1,
                    accordionQuestion: "Lorem Ipsum is simply dummy text of the printing and typesetting industry?",
                    accordionAnswer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                    description: []
                },
                {
                    id: 2,
                    accordionQuestion: "Lorem Ipsum is simply dummy text of the printing and typesetting industry?",
                    accordionAnswer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                    description: []
                },
                {
                    id: 3,
                    accordionQuestion: "Lorem Ipsum is simply dummy text of the printing and typesetting industry?",
                    accordionAnswer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                    description: []
                },
                {
                    id: 4,
                    accordionQuestion: "Lorem Ipsum is simply dummy text of the printing and typesetting industry?",
                    accordionAnswer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                    description: []
                },
                {
                    id: 5,
                    accordionQuestion: "Lorem Ipsum is simply dummy text of the printing and typesetting industry?",
                    accordionAnswer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                    description: []
                },
            ],
        },
        onSubmit: (values) => {
            console.log("Training Placements Data:", values);
            setIsEditing(null);
        }
    });

    const handleSaveClick = () => {
        formik.handleSubmit();
    };

    const handleCancel = () => {
        setIsEditing(null);
        formik.resetForm();
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show, setShow] = useState(false);
    const [newAccordion, setNewAccordion] = useState({ accordionQuestion: '', accordionAnswer: '' });

    const handleAddAccordion = () => {
        handleShow();
    };

    const handleEditClick = (field, index) => {
        setIsEditing(field);
        setEditingIndex(index);
    };

    const [editingIndex, setEditingIndex] = useState(null);
    const handleDescriptionChange = (e, accordionIndex, descIndex) => {
        const { value } = e.target;
        const newAboutAccordion = formik.values.aboutAccordion.map((accordion, i) => {
            if (i === accordionIndex) {
                return {
                    ...accordion,
                    description: accordion.description.map((desc, j) =>
                        j === descIndex ? value : desc
                    ),
                };
            }
            return accordion;
        });
        formik.setFieldValue("aboutAccordion", newAboutAccordion);
    };

    const handleAddDescription = (accordionIndex) => {
        const newAboutAccordion = formik.values.aboutAccordion.map((accordion, i) => {
            if (i === accordionIndex) {
                return {
                    ...accordion,
                    description: [...accordion.description, ""],
                };
            }
            return accordion;
        });
        formik.setFieldValue("aboutAccordion", newAboutAccordion);
        console.log("Updated Formik values:", formik.values);
    };

    const handleDeleteDescription = (accordionIndex, descIndex) => {
        const newAboutAccordion = formik.values.aboutAccordion.map((accordion, i) => {
            if (i === accordionIndex) {
                return {
                    ...accordion,
                    description: accordion.description.filter((_, j) => j !== descIndex),
                };
            }
            return accordion;
        });
        formik.setFieldValue("aboutAccordion", newAboutAccordion);
    };

    const handleSaveNewAccordion = () => {
        const newAccordionItem = {
            id: formik.values.aboutAccordion.length + 1,
            ...newAccordion,
            description: []
        };
        formik.setFieldValue("aboutAccordion", [...formik.values.aboutAccordion, newAccordionItem]);
        handleClose();
    };

    const handleChangeNewAccordion = (e) => {
        const { name, value } = e.target;
        setNewAccordion(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRemoveAccordion = (index) => {
        const newAboutAccordion = formik.values.aboutAccordion.filter((_, i) => i !== index);
        formik.setFieldValue("aboutAccordion", newAboutAccordion);
    };
    return (
        <div>
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
                <div>
                    <div className="container-fluid d-flex justify-content-between p-2 bg-light">
                        <h3 className="fw-bold"> Home FAQ</h3>
                        <button className="btn btn-sm btn-danger">Publish</button>
                    </div>
                    <div>
                        <div className='container-fluid trainingplacements mt-3 mb-5'>
                            <h1 className='secondheading text-start mb-3'>Cloud Ecs , Software Training and Placements in India</h1>
                            <div className='row d-flex'>
                                <div className="col-md-6 col-12">
                                    <div className="accordion" id="accordionExample">
                                        <div className="d-flex align-items-center justify-content-end">
                                            <FaPlus onClick={handleAddAccordion} className="mt-3 mb-3" /> Add New
                                        </div>
                                        {formik.values.aboutAccordion.map((accordion, accordionIndex) => (
                                            <div className="accordion-item mb-2" key={accordion.id}>
                                                <div className="d-flex align-items-end justify-content-end p-3">
                                                    <FaEdit onClick={() => handleEditClick('aboutAccordion', accordionIndex)} />
                                                    <FaTrash onClick={() => handleRemoveAccordion(accordionIndex)} className="text-danger ms-3" />
                                                </div>
                                                {isEditing === 'aboutAccordion' && editingIndex === accordionIndex ? (
                                                    <div className="p-3">
                                                        <input
                                                            type="text"
                                                            name={`aboutAccordion.${accordionIndex}.accordionQuestion`}
                                                            value={accordion.accordionQuestion}
                                                            onChange={formik.handleChange}
                                                            className="form-control mb-3 "
                                                        />
                                                        <textarea
                                                            type="text"
                                                            name={`aboutAccordion.${accordionIndex}.accordionAnswer`}
                                                            value={accordion.accordionAnswer}
                                                            onChange={formik.handleChange}
                                                            className="form-control mb-3"
                                                        />
                                                        {accordion.description.map((desc, descIndex) => (
                                                            <div key={descIndex} className="d-flex">
                                                                <input
                                                                    value={desc}
                                                                    onChange={(e) => handleDescriptionChange(e, accordionIndex, descIndex)}
                                                                    rows="2"
                                                                    className="form-control mb-3"
                                                                    style={{ margin: '5px 0' }}
                                                                />
                                                                <IoIosCloseCircleOutline
                                                                    color="Red"
                                                                    size={25}
                                                                    className="ms-2 mt-2"
                                                                    onClick={() => handleDeleteDescription(accordionIndex, descIndex)}
                                                                />
                                                            </div>
                                                        ))}
                                                        <div className="d-flex">
                                                            <FaPlus onClick={() => handleAddDescription(accordionIndex)} className="text-success" />
                                                            <FaSave onClick={handleSaveClick} className="mx-2 text-primary" />
                                                            <FaTimes onClick={handleCancel} className="text-danger" />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header">
                                                            <button
                                                                className="accordion-button collapsed accordion-header"
                                                                type="button"
                                                                data-bs-toggle="collapse"
                                                                data-bs-target={`#collapse${accordion.id}`}
                                                                aria-expanded="false"
                                                                aria-controls={`collapse${accordion.id}`}
                                                            >
                                                                {accordion.accordionQuestion}
                                                            </button>
                                                        </h2>
                                                        <div id={`collapse${accordion.id}`} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                            <div className="accordion-body text-start">
                                                                <p>{accordion.accordionAnswer}</p>
                                                                {accordion.description.map((desc, descIndex) => (
                                                                    <p key={descIndex}>{desc}</p>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    {/* {/ Modal for adding new accordion /} */}
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Add New Accordion</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <input
                                                type="text"
                                                name="accordionQuestion"
                                                placeholder="Question"
                                                value={newAccordion.accordionQuestion}
                                                onChange={handleChangeNewAccordion}
                                                className="form-control mb-3"
                                            />
                                            <textarea
                                                type="text"
                                                name="accordionAnswer"
                                                placeholder="Answer"
                                                value={newAccordion.accordionAnswer}
                                                onChange={handleChangeNewAccordion}
                                                className="form-control mb-3"
                                            />
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <FaSave onClick={handleSaveNewAccordion} className="mx-2 text-primary" />
                                            <FaTimes onClick={handleClose} className="text-danger" />
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                                <div className='col-md-6'>
                                    <div className='card p-4 enquiryform'>
                                        <form onSubmit={formikContact.handleSubmit}>
                                            <div className='row mb-3'>
                                                <div className='col-md-6 text-start'>
                                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                                    <input
                                                        type='text'
                                                        className={`form-control homeInput ${formikContact.touched.firstName && formikContact.errors.firstName ? "is-invalid" : ""}`}
                                                        {...formikContact.getFieldProps("firstName")}
                                                    />
                                                    {formikContact.touched.firstName && formikContact.errors.firstName && (
                                                        <div className="invalid-feedback">
                                                            {formikContact.errors.firstName}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className='col-md-6 text-start'>
                                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                                    <input
                                                        type='text'
                                                        className={`form-control homeInput ${formikContact.touched.lastName && formikContact.errors.lastName ? "is-invalid" : ""}`}
                                                        {...formikContact.getFieldProps("lastName")}
                                                    />
                                                    {formikContact.touched.lastName && formikContact.errors.lastName && (
                                                        <div className="invalid-feedback">
                                                            {formikContact.errors.lastName}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='row mb-3'>
                                                <div className='col-md-6 text-start'>
                                                    <label htmlFor="email" className="form-label">Email</label>
                                                    <input
                                                        type='email'
                                                        className={`form-control homeInput ${formikContact.touched.email && formikContact.errors.email ? "is-invalid" : ""}`}
                                                        {...formikContact.getFieldProps("email")}
                                                    />
                                                    {formikContact.touched.email && formikContact.errors.email && (
                                                        <div className="invalid-feedback">
                                                            {formikContact.errors.email}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className='col-md-6 text-start'>
                                                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                                    <input
                                                        type='number'
                                                        className={`form-control homeInput ${formikContact.touched.phoneNumber && formikContact.errors.phoneNumber ? "is-invalid" : ""}`}
                                                        {...formikContact.getFieldProps("phoneNumber")}
                                                    />
                                                    {formikContact.touched.phoneNumber && formikContact.errors.phoneNumber && (
                                                        <div className="invalid-feedback">
                                                            {formikContact.errors.phoneNumber}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='row mb-3'>
                                                <div className='col-md-12 text-start'>
                                                    <label className="form-label">Message</label>
                                                    <textarea
                                                        className='form-control homeInput'
                                                        {...formikContact.getFieldProps("message")}
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <div className='text-start'>
                                                <button type='submit' className='btn submitBtn btn-lg'>Send Message</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}

export default TrainingPlacements;
