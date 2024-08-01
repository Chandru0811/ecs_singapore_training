import React, { useState } from 'react';
import AboutHero from '../../assets/client/about_hero_image.png';
import AboutImage from '../../assets/client/about-imgae 1.jpg'
import { LuDiamond } from "react-icons/lu";
import { Tabs, Tab } from 'react-bootstrap';
import selfLevel from '../../assets/client/self level.png';
import Assignment from '../../assets/client/assignment.png';
import Support from '../../assets/client/suppoet 24-7.png';
import AsianStudent from '../../assets/client/About-Aisian-student-scaled.jpeg'
import { TbMessage2Exclamation } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";
import { useFormik } from "formik";
import { FaEdit, FaSave, FaTimes, FaPlus, FaTrash } from "react-icons/fa";
import heroImg from '../../assets/client/about_bg-image.png';
import { IoIosCloseCircleOutline, IoMdAdd } from "react-icons/io";
import { Modal } from 'react-bootstrap';
import AboutBgImage from '../../assets/client/about_bg-image.png';
import AboutUsBannerBgimg from '../../assets/client/about_bg-image-1.jpg';

function AdminAbout() {
    const [show, setShow] = useState(false);
    const [newAccordion, setNewAccordion] = useState({ accordionQuestion: '', accordionAnswer: '' });
    const [isEditing, setIsEditing] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [editingIndex, setEditingIndex] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const formik = useFormik({
        initialValues: {
            homeHeroImg: heroImg,
            aboutBgHeroImg: AboutBgImage,
            aboutHeroImg: AboutHero,
            heading: "What is Courses and how valid is it?",
            paragraph: "The meaning of production in Carlio is the creation, development, and the path to progress, and the starting point to achieve the goals that we all have the Petroforce bran with over 20 years of experience in the oil and petrochemical industry.",
            aboutUsTitle: "Our Company Overview",
            aboutUsContent: "Carlio brand is one of the most reliable motor oil manufacturers, which is engaged in the production of high quality products with a history of more than decades in the industry. In order to get more information about other aspects and products of the Carlio brand, you can use the following buttons:",
            companyContent: "The meaning of production in Carlio is the creation, development, and the path to progress, and the starting point to achieve the goals that we all have the Petroforce brand, with over 20 years of experience in the oil and petrochemical industry, we officially started our activities in the field of design, engineering, construction of refinery equipment, and the production of various motor and industrial lubricants in the year 1390 (2011)",
            allCoursesContent: "The meaning of production in Carlio is the creation, development, and the path to progress, and the starting point to achieve the goals that we all have the Petroforce brand, with over 20 years of experience in the oil and petrochemical industry, we officially started our activities in the field of design, engineering, construction of refinery equipment, and the production of various motor and industrial lubricants in the year 1390 (2011)",
            ourTeamContent: "The meaning of production in Carlio is the creation, development, and the path to progress, and the starting point to achieve the goals that we all have the Petroforce brand, with over 20 years of experience in the oil and petrochemical industry, we officially started our activities in the field of design, engineering, construction of refinery equipment, and the production of various motor and industrial lubricants in the year 1390 (2011)",
            aboutImage: AboutImage,
            aboutUsBannerBgimg: AboutUsBannerBgimg,
            aboutUsBannerTitle: "The feature of Courses that you will benefit from",
            aboutUsBannerSubTitle: "Courses Features",
            aboutUsBannerCard1Img: selfLevel,
            aboutUsBannerCard1Text: "Self-level Beginner",
            aboutUsBannerCard2Img: Assignment,
            aboutUsBannerCard2Text: "Assignment Provide",
            aboutUsBannerCard3Img: Support,
            aboutUsBannerCard3Text: "Support 24/7",
            aboutAsianStudent: AsianStudent,
            aboutFAQTitle: "Frequently Asked Questions",
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
            console.log("About Datas:", values);
            setIsEditing(null);
        },
    });

    const handleEditClick = (field, index) => {
        setIsEditing(field);
        setEditingIndex(index);
    };

    const handleSaveClick = () => {
        formik.handleSubmit();
        setIsEditing(null);
        setEditingIndex(null);
    };

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                formik.setFieldValue(fieldName, reader.result);
                if (fieldName === 'aboutBgHeroImg') {
                    setPreviewImage(reader.result);
                }
                else if (fieldName === 'aboutUsBannerBgimg') {
                    setPreviewImage(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCancel = () => {
        setIsEditing(null);
        setEditingIndex(null);
        formik.resetForm();
    };

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

    const handleAddAccordion = () => {
        handleShow();
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
        <section>
            <div className='d-flex align-items-center justify-content-between p-2'>
                <h4>About</h4>
                <button className="btn btn-primary">Publish</button>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="container-fluid mb-4">
                    <div>
                        <FaEdit onClick={() => handleEditClick('aboutBgHeroImg')} className="text-warning" />
                    </div>
                    {isEditing === 'aboutBgHeroImg' ? (
                        <div>
                            <div className="d-flex justify-content-center mb-2">
                                <FaSave onClick={handleSaveClick} className="text-warning" />
                                <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-warning" />
                            </div>
                            <input
                                type="file"
                                name="aboutBgHeroImg"
                                onChange={(e) => handleFileChange(e, 'aboutBgHeroImg')}
                                className="form-control mb-3"
                                style={{ margin: '0 auto', width: '300px' }}
                            />
                        </div>
                    ) : (
                        <>
                        </>
                    )}
                    <div className="row adminAbout-banner">
                        <div className="content-wrapper">
                            <div
                                className="img-fluid"
                                style={{
                                    position: 'relative',
                                    width: '100%',
                                    height: '100vh',
                                    backgroundImage: `url(${previewImage || formik.values.aboutBgHeroImg})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                                }}>
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        color: 'white',
                                        textAlign: 'center',
                                        width: '100%',
                                        zIndex: 2
                                    }}
                                >
                                    {/* Editable text content */}
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-7 col-12">
                                                <div className="about-head">
                                                    {isEditing === 'heading' ? (
                                                        <div>
                                                            <div className="d-flex justify-content-center mb-2">
                                                                <FaSave onClick={handleSaveClick} className="text-warning" />
                                                                <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-warning" />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                name="heading"
                                                                value={formik.values.heading}
                                                                onChange={formik.handleChange}
                                                                className="form-control"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <FaEdit onClick={() => handleEditClick('heading')} className="text-warning" />
                                                            <h1 className="display-5 fw-bold" style={{ paddingLeft: "10px" }}>{formik.values.heading}</h1>
                                                        </div>
                                                    )}
                                                    {isEditing === 'paragraph' ? (
                                                        <div>
                                                            <div className="d-flex justify-content-center mb-2">
                                                                <FaSave onClick={handleSaveClick} className="text-warning" />
                                                                <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-warning" />
                                                            </div>
                                                            <textarea
                                                                name="paragraph"
                                                                value={formik.values.paragraph}
                                                                onChange={formik.handleChange}
                                                                className="form-control mb-3"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <FaEdit onClick={() => handleEditClick('paragraph')} className="text-warning" />
                                                            <p>{formik.values.paragraph}</p>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="d-flex mb-4">
                                                    <button className="btn enroll-btn">Enroll Now</button>
                                                    <button className="btn contact-btn ms-3">Contact Us</button>
                                                </div>
                                            </div>
                                            <div className="col-md-5 col-12">
                                                <div className="p-3">
                                                    {isEditing === 'aboutHeroImg' ? (
                                                        <div>
                                                            <div className="d-flex justify-content-center mb-2">
                                                                <FaSave onClick={handleSaveClick} className="text-warning" />
                                                                <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-warning" />
                                                            </div>
                                                            <input
                                                                type="file"
                                                                onChange={(e) => handleFileChange(e, 'aboutHeroImg')}
                                                                className="form-control"
                                                                style={{ margin: '0 auto', width: '300px' }}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <FaEdit onClick={() => handleEditClick('aboutHeroImg')} className="text-warning" />
                                                            <img
                                                                src={formik.values.aboutHeroImg}
                                                                alt='About Hero'
                                                                className="img-fluid"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mb-4">
                    <div className="row">
                        <div className="col-md-6 col-12 mb-3 d-flex align-items-center justify-content-center">
                            {isEditing === 'aboutImage' ? (
                                <div>
                                    <div className="d-flex justify-content-center mb-2">
                                        <FaSave onClick={handleSaveClick} className="text-secondary" />
                                        <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                                    </div>
                                    <input type="file"
                                        onChange={(e) => handleFileChange(e, 'aboutImage')}
                                        className="form-control"
                                        style={{ margin: '0 auto', width: '300px' }} />
                                </div>
                            ) : (
                                <div>
                                    <FaEdit onClick={() => handleEditClick('aboutImage')} className="text-secondary" />
                                    <img src={formik.values.aboutImage} alt='img' className="img-fluid" />
                                </div>
                            )}
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="d-flex text-start">
                                <div className="d-flex align-items-center justify-content-center">
                                    <div className="p-1 mx-2 mb-3" style={{ backgroundColor: "#ec9fc2", borderRadius: "5px" }}>
                                        <LuDiamond color='#AA205E' size={30} />
                                    </div>
                                    <p className="fw-medium">About Us</p>
                                </div>
                            </div>
                            <div className="text-start">
                                {isEditing === 'aboutUsTitle' ? (
                                    <div>
                                        <div className="d-flex justify-content-center mb-2">
                                            <FaSave onClick={handleSaveClick} className="text-secondary" />
                                            <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                                        </div>
                                        <input
                                            type="text"
                                            name="aboutUsTitle"
                                            value={formik.values.aboutUsTitle}
                                            onChange={formik.handleChange}
                                            className="form-control mb-2"
                                        />
                                        <textarea
                                            name="aboutUsContent"
                                            value={formik.values.aboutUsContent}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <FaEdit onClick={() => handleEditClick('aboutUsTitle')} className="text-secondary" />
                                        <h3 className="fw-bold">{formik.values.aboutUsTitle}</h3>
                                        <p>{formik.values.aboutUsContent}</p>
                                    </div>
                                )}
                                <Tabs defaultActiveKey="company" id="fill-tab-example" className="mb-3 tab">
                                    <Tab eventKey="company" title="Company">
                                        {isEditing === 'companyContent' ? (
                                            <div>
                                                <div className="d-flex justify-content-center mb-2">
                                                    <FaSave onClick={handleSaveClick} className="text-secondary" />
                                                    <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                                                </div>
                                                <textarea
                                                    name="companyContent"
                                                    value={formik.values.companyContent}
                                                    onChange={formik.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <FaEdit onClick={() => handleEditClick('companyContent')} className="text-secondary" />
                                                <p>{formik.values.companyContent}</p>
                                            </div>
                                        )}
                                    </Tab>
                                    <Tab eventKey="allCourses" title="All Courses">
                                        {isEditing === 'allCoursesContent' ? (
                                            <div>
                                                <div className="d-flex justify-content-center mb-2">
                                                    <FaSave onClick={handleSaveClick} className="text-secondary" />
                                                    <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                                                </div>
                                                <textarea
                                                    name="allCoursesContent"
                                                    value={formik.values.allCoursesContent}
                                                    onChange={formik.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <FaEdit onClick={() => handleEditClick('allCoursesContent')} className="text-secondary" />
                                                <p>{formik.values.allCoursesContent}</p>
                                            </div>
                                        )}
                                    </Tab>
                                    <Tab eventKey="ourTeam" title="Our Team">
                                        {isEditing === 'ourTeamContent' ? (
                                            <div>
                                                <div className="d-flex justify-content-center mb-2">
                                                    <FaSave onClick={handleSaveClick} className="text-secondary" />
                                                    <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                                                </div>
                                                <textarea
                                                    name="ourTeamContent"
                                                    value={formik.values.ourTeamContent}
                                                    onChange={formik.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <FaEdit onClick={() => handleEditClick('ourTeamContent')} className="text-secondary" />
                                                <p>{formik.values.ourTeamContent}</p>
                                            </div>
                                        )}
                                    </Tab>
                                </Tabs>
                                <button className="learn-btn">Learn More</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid mb-4">
                    <div>
                        <FaEdit onClick={() => handleEditClick('aboutUsBannerBgimg')} className="text-warning" />
                    </div>
                    {isEditing === 'aboutUsBannerBgimg' ? (
                        <div>
                            <div className="d-flex justify-content-center mb-2">
                                <FaSave onClick={handleSaveClick} className="text-warning" />
                                <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-warning" />
                            </div>
                            <input
                                type="file"
                                name="aboutUsBannerBgimg"
                                onChange={(e) => handleFileChange(e, 'aboutUsBannerBgimg')}
                                className="form-control mb-3"
                                style={{ margin: '0 auto', width: '300px' }}
                            />
                        </div>
                    ) : (
                        <>
                        </>
                    )}
                    <div className="row adminAbout-banner1" style={{ backgroundImage: `url(${previewImage || formik.values.aboutUsBannerBgimg})` }}>
                        <div className="content-wrapper1">
                            <div
                                className="img-fluid"
                                style={{
                                    position: 'relative',
                                    width: '100%',
                                    height: '100vh',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            >
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        color: 'white',
                                        textAlign: 'center',
                                        width: '100%',
                                        zIndex: 2
                                    }}
                                >
                                    {/* Editable text content */}
                                    <div className="container">
                                        <div className="row mb-4">
                                            <div className="col-md-6 col-12 mb-3 d-flex flex-column align-items-start justify-content-center">
                                                <div className="about-head1">
                                                    <div className="d-flex align-items-start justify-content-">
                                                        <p>
                                                            <FaEdit
                                                                onClick={() => handleEditClick('aboutUsBannerSubTitle')}
                                                                className="text-secondary"
                                                            />
                                                        </p>
                                                    </div>
                                                    {isEditing === 'aboutUsBannerSubTitle' ? (
                                                        <div>
                                                            <div className="d-flex justify-content-center mb-2">
                                                                <FaSave
                                                                    onClick={handleSaveClick}
                                                                    className="text-secondary"
                                                                />
                                                                <FaTimes
                                                                    onClick={handleCancel}
                                                                    style={{ marginLeft: '10px' }}
                                                                    className="text-secondary"
                                                                />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                name="aboutUsBannerSubTitle"
                                                                value={formik.values.aboutUsBannerSubTitle}
                                                                onChange={formik.handleChange}
                                                                className="form-control mb-2"
                                                            />
                                                            <input
                                                                type="text"
                                                                name="aboutUsBannerTitle"
                                                                value={formik.values.aboutUsBannerTitle}
                                                                onChange={formik.handleChange}
                                                                className="form-control mb-2"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className="d-flex align-items-start justify-content-start">
                                                                <div
                                                                    className="p-1 mx-2 mb-3"
                                                                    style={{
                                                                        backgroundColor: '#ec9fc2',
                                                                        borderRadius: '5px',
                                                                    }}
                                                                >
                                                                    <BsBoxSeam color="#AA205E" size={30} />
                                                                </div>
                                                                <div>
                                                                    <p>{formik.values.aboutUsBannerSubTitle}</p>
                                                                </div>
                                                            </div>
                                                            <h1 className="display-5 fw-bold">
                                                                {formik.values.aboutUsBannerTitle}
                                                            </h1>
                                                        </>
                                                    )}
                                                    <button className="btn contact-btn">All Courses</button>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-12 d-flex align-items-center justify-content-center">
                                                <div className="row">
                                                    <div className="col-md-4 col-6 mb-2">
                                                        <p>
                                                            <FaEdit
                                                                onClick={() => handleEditClick('aboutUsBannerCard1Img')}
                                                                className="text-secondary"
                                                            />
                                                        </p>
                                                        <div className="card about-card h-100 d-flex flex-column align-items-center justify-content-center">
                                                            {isEditing === 'aboutUsBannerCard1Img' ? (
                                                                <div>
                                                                    <div className="d-flex justify-content-center mb-2">
                                                                        <FaSave
                                                                            onClick={handleSaveClick}
                                                                            className="text-secondary"
                                                                        />
                                                                        <FaTimes
                                                                            onClick={handleCancel}
                                                                            style={{ marginLeft: '10px' }}
                                                                            className="text-secondary"
                                                                        />
                                                                    </div>
                                                                    <input
                                                                        type="file"
                                                                        name="aboutUsBannerCard1Img"
                                                                        onChange={(e) => handleFileChange(e, 'aboutUsBannerCard1Img')}
                                                                        className="form-control mb-3"
                                                                        style={{ margin: '0 auto', width: '300px' }}
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        name="aboutUsBannerCard1Text"
                                                                        value={formik.values.aboutUsBannerCard1Text}
                                                                        onChange={formik.handleChange}
                                                                        className="form-control mb-2"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div className="p-2">
                                                                    <img
                                                                        src={formik.values.aboutUsBannerCard1Img}
                                                                        alt="img"
                                                                        className="img-fluid mb-4"
                                                                    />
                                                                    <p className="about-textWhite text-center mb-4">
                                                                        {formik.values.aboutUsBannerCard1Text}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-6 mb-2">
                                                        <p>
                                                            <FaEdit
                                                                onClick={() => handleEditClick('aboutUsBannerCard2Img')}
                                                                className="text-secondary"
                                                            />
                                                        </p>
                                                        <div className="card about-card h-100 d-flex flex-column align-items-center justify-content-center">
                                                            {isEditing === 'aboutUsBannerCard2Img' ? (
                                                                <div>
                                                                    <div className="d-flex justify-content-center mb-2">
                                                                        <FaSave
                                                                            onClick={handleSaveClick}
                                                                            className="text-secondary"
                                                                        />
                                                                        <FaTimes
                                                                            onClick={handleCancel}
                                                                            style={{ marginLeft: '10px' }}
                                                                            className="text-secondary"
                                                                        />
                                                                    </div>
                                                                    <input
                                                                        type="file"
                                                                        name="aboutUsBannerCard2Img"
                                                                        onChange={(e) => handleFileChange(e, 'aboutUsBannerCard2Img')}
                                                                        className="form-control mb-3"
                                                                        style={{ margin: '0 auto', width: '300px' }}
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        name="aboutUsBannerCard2Text"
                                                                        value={formik.values.aboutUsBannerCard2Text}
                                                                        onChange={formik.handleChange}
                                                                        className="form-control mb-2"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div className="p-2">
                                                                    <img
                                                                        src={formik.values.aboutUsBannerCard2Img}
                                                                        alt="img"
                                                                        className="img-fluid mb-4"
                                                                    />
                                                                    <p className="about-textWhite text-center mb-4">
                                                                        {formik.values.aboutUsBannerCard2Text}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-6 mb-2">
                                                        <p>
                                                            <FaEdit
                                                                onClick={() => handleEditClick('aboutUsBannerCard3Img')}
                                                                className="text-secondary"
                                                            />
                                                        </p>
                                                        <div className="card about-card h-100 d-flex flex-column align-items-center justify-content-center">
                                                            {isEditing === 'aboutUsBannerCard3Img' ? (
                                                                <div>
                                                                    <div className="d-flex justify-content-center mb-2">
                                                                        <FaSave
                                                                            onClick={handleSaveClick}
                                                                            className="text-secondary"
                                                                        />
                                                                        <FaTimes
                                                                            onClick={handleCancel}
                                                                            style={{ marginLeft: '10px' }}
                                                                            className="text-secondary"
                                                                        />
                                                                    </div>
                                                                    <input
                                                                        type="file"
                                                                        name="aboutUsBannerCard3Img"
                                                                        onChange={(e) => handleFileChange(e, 'aboutUsBannerCard3Img')}
                                                                        className="form-control mb-3"
                                                                        style={{ margin: '0 auto', width: '300px' }}
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        name="aboutUsBannerCard3Text"
                                                                        value={formik.values.aboutUsBannerCard3Text}
                                                                        onChange={formik.handleChange}
                                                                        className="form-control mb-2"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div className="p-2">
                                                                    <img
                                                                        src={formik.values.aboutUsBannerCard3Img}
                                                                        alt="img"
                                                                        className="img-fluid mb-4"
                                                                    />
                                                                    <p className="about-textWhite text-center mb-4">
                                                                        {formik.values.aboutUsBannerCard3Text}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mb-4">
                    <div className="row">
                        <div className="col-md-6 col-12 mb-3 d-flex align-items-center justify-content-center">
                            <div  >
                                {isEditing === 'aboutAsianStudent' ? (
                                    <div>
                                        <div className="d-flex justify-content-center mb-2">
                                            <FaSave onClick={handleSaveClick} className="text-secondary" />
                                            <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                                        </div>
                                        <input
                                            type="file"
                                            name="aboutAsianStudent"
                                            onChange={(e) => handleFileChange(e, 'aboutAsianStudent')}
                                            className="form-control"
                                            style={{ margin: '0 auto', width: '300px' }}
                                        />
                                    </div>
                                ) : (
                                    <><FaEdit onClick={() => handleEditClick('aboutAsianStudent')} className="text-secondary" />
                                        <div className="imgDesign">
                                            <img src={formik.values.aboutAsianStudent} alt='img' className="img-fluid" />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="d-flex text-start">
                                <div className="d-flex align-items-center justify-content-center">
                                    <div className="p-1 mx-2 mb-3" style={{ backgroundColor: "#ec9fc2", borderRadius: "5px" }}>
                                        <TbMessage2Exclamation color='#AA205E' size={30} />
                                    </div>
                                    <p className="fw-medium">FAQ Question</p>
                                </div>
                            </div>
                            <div className="text-start">
                                {isEditing === 'aboutFAQTitle' ? (
                                    <div>
                                        <div className="d-flex justify-content-center mb-2">
                                            <FaSave onClick={handleSaveClick} className="text-secondary" />
                                            <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                                        </div>
                                        <input
                                            type="text"
                                            name="aboutFAQTitle"
                                            value={formik.values.aboutFAQTitle}
                                            onChange={formik.handleChange}
                                            className="form-control mb-2"
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <div>
                                            <FaEdit onClick={() => handleEditClick('aboutFAQTitle')} className="text-secondary" />
                                            <h3 className="fw-bold mb-3">{formik.values.aboutFAQTitle}</h3>
                                        </div>
                                    </>
                                )}
                            </div>
                            <>
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
                                {/* Modal for adding new accordion */}
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
                            </>
                        </div>
                    </div>
                </div>
            </form>

        </section >
    );
}

export default AdminAbout;
