import React, { useState } from 'react'
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import Star from "../../../assets/client/starimg.png";
import HomeImg from "../../../assets/client/homeImg.png";
import BookImg from "../../../assets/client/bookImg.png";
import Duration from "../../../assets/client/durationImg.png";
import CourseDuration from "../../../assets/client/nextCourseImg.png";
import { useFormik } from 'formik';

function HeroSection() {
    const [isEditing, setIsEditing] = useState(null);
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            heading: 'The Best Platform Enroll in your Special Courses',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
            heroImg: HomeImg,
            herocardImg1: BookImg,
            herocardImg2: Duration,
            herocardImg3: CourseDuration,
            herocardText1: 'Learning Format Online Bootcamp',
            herocardText2: 'Course Duration',
            herocardText3: 'Next Course Starts at October 12, 2024',
        },
        onSubmit: (values) => {
            console.log("Hero Datas", values);
            setIsEditing(null);
        },
    })

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

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                formik.setFieldValue('heroImg', reader.result);
                console.log("Updated Formik values:", formik.values);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCardImageUpload = (event) => {
        const { name } = event.target;
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                formik.setFieldValue(name, reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <>
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
                        <h3 className="fw-bold">Hero Section</h3>
                        <button className="btn btn-sm btn-danger">Publish</button>
                    </div>
                    <div>
                        {/* Hero */}
                        <div className="container-fluid row mt-3">
                            <div className="col-lg-7">
                                <div className="d-flex mb-3">
                                    <img src={Star} alt="homestar" style={{ width: "30px", height: "30px" }} />
                                    <p className="subhead ml-2">Start Learning Today</p>
                                </div>
                                {isEditing === 'heading' ? (
                                    <div className="d-flex flex-column">
                                        <input
                                            type="text"
                                            name="heading"
                                            value={formik.values.heading}
                                            onChange={formik.handleChange}
                                            className="form-control mb-2"
                                        />
                                        <div className="d-flex justify-content-end">
                                            <FaSave onClick={handleSaveClick} className="text-secondary me-2" />
                                            <FaTimes onClick={handleCancel} className="text-secondary" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="d-flex align-items-center">
                                        <h1 className="display-5 text-start fw-bold">{formik.values.heading}</h1>
                                        <FaEdit onClick={() => handleEditClick('heading')} className="text-secondary ms-3" style={{ width: "30px", height: "30px" }} />
                                    </div>
                                )}

                                {isEditing === 'description' ? (
                                    <div className="d-flex flex-column">
                                        <textarea
                                            name="description"
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            className="form-control mb-2"
                                        />
                                        <div className="d-flex justify-content-end">
                                            <FaSave onClick={handleSaveClick} className="text-secondary me-2" />
                                            <FaTimes onClick={handleCancel} className="text-secondary" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="d-flex align-items-center">
                                        <p className="text-start">{formik.values.description}</p>
                                        <FaEdit onClick={() => handleEditClick('description')} className="text-secondary ms-3" style={{ width: "30px", height: "30px" }} />
                                    </div>
                                )}
                                <div className="mt-4 text-start">
                                    <button type="button" className="btn btn-primary btn-lg me-3">Get Started</button>
                                    <button type="button" className="btn btn-outline-primary btn-lg">Learn More</button>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                {isEditing === 'heroImg' ? (
                                    <div className="d-flex flex-column">
                                        <input
                                            type="file"
                                            name="heroImg"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="form-control mb-2"
                                        />
                                        <div className="d-flex justify-content-end">
                                            <FaSave onClick={handleSaveClick} className="text-secondary me-2" />
                                            <FaTimes onClick={handleCancel} className="text-secondary" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="d-flex flex-column align-items-center">
                                        <img src={formik.values.heroImg} style={{ maxWidth: "100%", height: "auto" }} alt="home illustration" />
                                        <FaEdit onClick={() => handleEditClick('heroImg')} className="text-secondary mt-2" />
                                    </div>
                                )}
                            </div>
                            {/* Cards */}
                            <div className='card homeCard mb-5'>
                                <div className='card-body'>
                                    <div className='row d-flex pt-3'>
                                        <div className='col-md-4 d-flex justify-content-center'>
                                            {isEditing === 1 ? (
                                                <>
                                                    <div className="d-flex justify-content-center mb-2">
                                                        <FaSave onClick={handleSaveClick} className="text-secondary" />
                                                        <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="file"
                                                            name="herocardImg1"
                                                            accept="image/*"
                                                            onChange={handleCardImageUpload}
                                                        />
                                                        <textarea
                                                            name="herocardText1"
                                                            value={formik.values.herocardText1}
                                                            onChange={formik.handleChange}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <FaEdit onClick={() => handleEditClick(1)} className="text-secondary mx-2" />
                                                    <img src={formik.values.herocardImg1} alt='BookImg' style={{ width: "30px", height: "30px" }} />
                                                    <p className='mx-2'>{formik.values.herocardText1}</p>
                                                </>
                                            )}
                                        </div>
                                        <div className='col-md-4 d-flex justify-content-center'>
                                            {isEditing === 2 ? (
                                                <>
                                                    <div className="d-flex justify-content-center mb-2">
                                                        <FaSave onClick={handleSaveClick} className="text-secondary" />
                                                        <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="file"
                                                            name="herocardImg2"
                                                            accept="image/*"
                                                            onChange={handleCardImageUpload}
                                                        />
                                                        <textarea
                                                            name="herocardText2"
                                                            value={formik.values.herocardText2}
                                                            onChange={formik.handleChange}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <FaEdit onClick={() => handleEditClick(2)} className="text-secondary mx-2" />
                                                    <img src={formik.values.herocardImg2} alt='BookImg' style={{ width: "30px", height: "30px" }} />
                                                    <p className='mx-2'>{formik.values.herocardText2}</p>
                                                </>
                                            )}
                                        </div>
                                        <div className='col-md-4 d-flex justify-content-center'>
                                            {isEditing === 3 ? (
                                                <>
                                                    <div className="d-flex justify-content-center mb-2">
                                                        <FaSave onClick={handleSaveClick} className="text-secondary" />
                                                        <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="file"
                                                            name="herocardImg3"
                                                            accept="image/*"
                                                            onChange={handleCardImageUpload}
                                                        />
                                                        <textarea
                                                            name="herocardText3"
                                                            value={formik.values.herocardText3}
                                                            onChange={formik.handleChange}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <FaEdit onClick={() => handleEditClick(3)} className="text-secondary mx-2" />
                                                    <img src={formik.values.herocardImg3} alt='BookImg' style={{ width: "30px", height: "30px" }} />
                                                    <p className='mx-2'>{formik.values.herocardText3}</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default HeroSection;