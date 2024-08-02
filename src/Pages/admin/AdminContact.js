import React, { useState } from 'react';
import { FiPhoneCall } from "react-icons/fi";
import { IoMailOpenOutline } from "react-icons/io5";
import { LuMapPin } from "react-icons/lu";
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { BiSolidQuoteRight } from "react-icons/bi";
import { useFormik } from "formik";

function AdminContact() {
    const [isEditing, setIsEditing] = useState(null);

    const iconsMap = {
        FiPhoneCall: <FiPhoneCall color='#e41111' size={60} />,
        IoMailOpenOutline: <IoMailOpenOutline color='#e41111' size={60} />,
        LuMapPin: <LuMapPin color='#e41111' size={60} />
    };

    const formik = useFormik({
        initialValues: {
            contactCardIcon1: "FiPhoneCall",
            contactCardTitle1: "Phone",
            contactCardContent1: "+65 8894 1306",
            contactCardLink1: "tel:+6588941306",
            contactCardIcon2: "IoMailOpenOutline",
            contactCardTitle2: "Email",
            contactCardContent2: "info@ecscloudinfotech.com",
            contactCardLink2: "mailto:info@ecscloudinfotech.com",
            contactCardIcon3: "LuMapPin",
            contactCardTitle3: "Location",
            contactCardContent3: "The Alexcier, 237 Alexandra Road, #04-10, Singapore-159929.",
            contactCardLink3: "https://maps.app.goo.gl/Y4UnULL1Gs7nAGRS8",
            contactHeading: "Get in Touch with Us for Your ECS Cloud Training Needs",
            contactContent: "Our ECS Cloud Training System operates with precision and speed, effortlessly handling the movement and storage of pallets within your warehouse.",
            contactSubheading: "Streamline Your Warehouse Operations with ECS Cloud Training!",
            contactMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8044732252415!2d103.81118677348974!3d1.2916846617631323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1bb95520771b%3A0xf2b9dfa378aa9a6e!2sThe%20Alexcier!5e0!3m2!1sen!2sin!4v1722418479744!5m2!1sen!2sin"
        },
        onSubmit: (values) => {
            console.log("Contact Datas:", values);
            setIsEditing(null);
        },
    });

    const handleEditClick = (field) => {
        setIsEditing(field);
    };

    const handleSaveClick = () => {
        formik.handleSubmit();
    };

    const handleCancel = () => {
        setIsEditing(null);
        formik.resetForm();
    };

    return (
        <section>
            <div className="container-fluid py-2 bg-white">
                <div className="row">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="fw-bold">Contact</h3>
                        <div>
                            <button type="button" className="btn btn-primary">
                                Publish
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className='container py-5' style={{ overflowX: "hidden" }}>
                    <div className='row'>
                        <div className='col-lg-6 col-xl-4 col-12'>
                            <div className='card contactDetails p-4'>
                                <div className='row'>
                                    <div className='col-lg-3 col-12 d-flex justify-content-center align-items-center'>
                                        {iconsMap[formik.values.contactCardIcon1]}
                                    </div>
                                    <div className='col-lg-9 col-12'>
                                        <h3 className='text-start fw-bold'>{formik.values.contactCardTitle1}</h3>
                                        <hr className='my-4' />
                                        {isEditing === 'contactCardContent1' ? (
                                            <div className='d-flex'>
                                                <input
                                                    type="text"
                                                    className="form-control me-2"
                                                    name="contactCardContent1"
                                                    value={formik.values.contactCardContent1}
                                                    onChange={formik.handleChange}
                                                />
                                                <FaSave onClick={handleSaveClick} className="text-primary mt-2" />
                                                <FaTimes onClick={handleCancel} className="ms-2 text-danger mt-2" />
                                            </div>
                                        ) : (
                                            <div className='d-flex'>
                                                <p className='text-start fw-medium paraText'>
                                                    {formik.values.contactCardContent1}
                                                    <FaEdit size={20}
                                                        className="text-secondary ms-3"
                                                        onClick={() => handleEditClick('contactCardContent1')}
                                                    />
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='arrow-icon mb-5'>
                                <a href={formik.values.contactCardLink1} target="_blank"><FaCircleArrowRight /></a>
                            </div>
                        </div>
                        <div className='col-lg-6 col-xl-4 col-12'>
                            <div className='card contactDetails p-4'>
                                <div className='row'>
                                    <div className='col-lg-3 col-12 d-flex justify-content-center align-items-center'>
                                        {iconsMap[formik.values.contactCardIcon2]}
                                    </div>
                                    <div className='col-lg-9 col-12'>
                                        <h3 className='text-start fw-bold'>{formik.values.contactCardTitle2}</h3>
                                        <hr className='my-4' />
                                        {isEditing === 'contactCardContent2' ? (
                                            <div className='d-flex'>
                                                <input
                                                    type="text"
                                                    className="form-control me-2"
                                                    name="contactCardContent2"
                                                    value={formik.values.contactCardContent2}
                                                    onChange={formik.handleChange}
                                                />
                                                <FaSave onClick={handleSaveClick} className="text-primary mt-2" />
                                                <FaTimes onClick={handleCancel} className="ms-2 text-danger mt-2" />
                                            </div>
                                        ) : (
                                            <div className='d-flex'>
                                                <p className='text-start fw-medium paraText' style={{ wordBreak: 'break-word' }}>
                                                    {formik.values.contactCardContent2}
                                                    <FaEdit size={20}
                                                        className="text-secondary ms-3"
                                                        onClick={() => handleEditClick('contactCardContent2')}
                                                    />
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='arrow-icon mb-5'>
                                <a href={formik.values.contactCardLink2} target="_blank"><FaCircleArrowRight /></a>
                            </div>
                        </div>
                        <div className='col-lg-6 col-xl-4 col-12'>
                            <div className='card contactDetails p-4'>
                                <div className='row'>
                                    <div className='col-lg-3 col-12 d-flex justify-content-center align-items-center'>
                                        {iconsMap[formik.values.contactCardIcon3]}
                                    </div>
                                    <div className='col-lg-9 col-12'>
                                        <h3 className='text-start fw-bold'>{formik.values.contactCardTitle3}</h3>
                                        <hr className='my-4' />
                                        {isEditing === 'contactCardContent3' ? (
                                            <div className='d-flex'>
                                                <textarea
                                                    className="form-control me-2"
                                                    name="contactCardContent3"
                                                    value={formik.values.contactCardContent3}
                                                    onChange={formik.handleChange}
                                                />
                                                <FaSave onClick={handleSaveClick} className="text-primary mt-2" />
                                                <FaTimes onClick={handleCancel} className="ms-2 text-danger mt-2" />
                                            </div>
                                        ) : (
                                            <div className='d-flex'>
                                                <p className='text-start fw-medium paraText'>
                                                    {formik.values.contactCardContent3}
                                                    <FaEdit size={20}
                                                        className="text-secondary ms-3"
                                                        onClick={() => handleEditClick('contactCardContent3')}
                                                    />
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='arrow-icon mb-5'>
                                <a href={formik.values.contactCardLink3} target="_blank"><FaCircleArrowRight /></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container-fluid contactDetails1'>
                    <div className='container py-5'>
                        <div className='row py-5'>
                            <div className='col-lg-6 col-12'>
                                <div className='card text-start p-5' style={{ border: "none", borderRadius: "30px" }}>
                                    <h3 className='fw-bold mb-5'>We Are Ready To Help You</h3>
                                    <div className='mb-3'>
                                        <label className='form-label'>First Name<span className='text-danger'>*</span></label>
                                        <input type='text'
                                            className={`form-control`}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label className='form-label'>Last Name<span className='text-danger'>*</span></label>
                                        <input type='text'
                                            className={`form-control`}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label className='form-label'>Email<span className='text-danger'>*</span></label>
                                        <input type='text'
                                            className={`form-control`}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label className='form-label'>Phone Number<span className='text-danger'>*</span></label>
                                        <input type='text'
                                            className={`form-control`}
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label className='form-label'>Message</label>
                                        <textarea rows={5}
                                            className='form-control'
                                        ></textarea>
                                    </div>
                                    <div className='mb-3'>
                                        <button type='submit' className='btn btn-danger py-2' style={{ width: "100%" }}>Send</button>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-6 col-12 text-start mt-3 px-5'>
                                {isEditing === 'contactHeading' ? (
                                    <div className='d-flex'>
                                        <input
                                            type="text"
                                            className="form-control me-2"
                                            name="contactHeading"
                                            value={formik.values.contactHeading}
                                            onChange={formik.handleChange}
                                        />
                                        <FaSave onClick={handleSaveClick} className="text-primary mt-2" />
                                        <FaTimes onClick={handleCancel} className="ms-2 text-danger mt-2" />
                                    </div>
                                ) : (
                                    <h1 className='fw-bold mb-3'>
                                        {formik.values.contactHeading}
                                        <FaEdit size={25}
                                            className="text-secondary ms-3"
                                            onClick={() => handleEditClick('contactHeading')}
                                        />
                                    </h1>
                                )}
                                {isEditing === 'contactContent' ? (
                                    <div className='d-flex'>
                                        <textarea
                                            type="text"
                                            className="form-control me-2"
                                            name="contactContent"
                                            value={formik.values.contactContent}
                                            onChange={formik.handleChange}
                                        />
                                        <FaSave onClick={handleSaveClick} className="text-primary mt-2" />
                                        <FaTimes onClick={handleCancel} className="ms-2 text-danger mt-2" />
                                    </div>
                                ) : (
                                    <p className='fw-medium paraText mb-4'>
                                        {formik.values.contactContent}
                                        <FaEdit size={20}
                                            className="text-dark ms-3"
                                            onClick={() => handleEditClick('contactContent')}
                                        />
                                    </p>
                                )}
                                <div className='d-flex align-items-center justify-content-center mb-4' style={{ marginLeft: "1.25rem" }}>
                                    <span> <BiSolidQuoteRight size={70} color='#e41111' /></span>
                                    {isEditing === 'contactSubheading' ? (
                                        <div className='d-flex'>
                                            <textarea
                                                type="text"
                                                className="form-control me-2"
                                                name="contactSubheading"
                                                style={{ width: "450px" }}
                                                value={formik.values.contactSubheading}
                                                onChange={formik.handleChange}
                                            />
                                            <FaSave onClick={handleSaveClick} className="text-primary mt-2" />
                                            <FaTimes onClick={handleCancel} className="ms-2 text-danger mt-2" />
                                        </div>
                                    ) : (
                                        <h5 className='fw-bold' style={{ marginLeft: "0.5rem" }}>
                                            {formik.values.contactSubheading}
                                            <FaEdit size={20}
                                                className="text-secondary ms-3"
                                                onClick={() => handleEditClick('contactSubheading')}
                                            />
                                        </h5>
                                    )}
                                </div>
                                {isEditing === 'contactMap' ? (
                                    <div className='d-flex mb-2'>
                                        <textarea
                                            type="text"
                                            className="form-control me-2"
                                            name="contactMap"
                                            value={formik.values.contactMap}
                                            onChange={formik.handleChange}
                                        />
                                        <FaSave onClick={handleSaveClick} className="text-primary mt-2" />
                                        <FaTimes onClick={handleCancel} className="ms-2 text-danger mt-2" />
                                    </div>
                                ) : null}
                                {isEditing !== 'contactMap' && (
                                    <FaEdit onClick={() => handleEditClick("contactMap")} className="text-secondary " />
                                )}
                                <div className='card' style={{ borderRadius: "30px" }}>
                                    <iframe
                                        src={formik.values.contactMap}
                                        width="100%"
                                        height="400"
                                        style={{ borderRadius: "30px" }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default AdminContact;