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
import { FaEdit, FaSave, FaTimes, FaPlus } from "react-icons/fa";
import heroImg from '../../assets/client/about_bg-image.png';

function AdminAbout() {
    const [isEditing, setIsEditing] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const formik = useFormik({
        initialValues: {
            homeHeroImg: heroImg,
            aboutHeroImg: AboutHero,
            heading: "What is Courses and how valid is it?",
            paragraph: "The meaning of production in Carlio is the creation, development, and the path to progress, and the starting point to achieve the goals that we all have the Petroforce bran with over 20 years of experience in the oil and petrochemical industry.",
            aboutUsTitle: "Our Company Overview",
            aboutUsContent: "Carlio brand is one of the most reliable motor oil manufacturers, which is engaged in the production of high quality products with a history of more than decades in the industry. In order to get more information about other aspects and products of the Carlio brand, you can use the following buttons:",
            companyContent: "The meaning of production in Carlio is the creation, development, and the path to progress, and the starting point to achieve the goals that we all have the Petroforce brand, with over 20 years of experience in the oil and petrochemical industry, we officially started our activities in the field of design, engineering, construction of refinery equipment, and the production of various motor and industrial lubricants in the year 1390 (2011)",
            allCoursesContent: "The meaning of production in Carlio is the creation, development, and the path to progress, and the starting point to achieve the goals that we all have the Petroforce brand, with over 20 years of experience in the oil and petrochemical industry, we officially started our activities in the field of design, engineering, construction of refinery equipment, and the production of various motor and industrial lubricants in the year 1390 (2011)",
            ourTeamContent: "The meaning of production in Carlio is the creation, development, and the path to progress, and the starting point to achieve the goals that we all have the Petroforce brand, with over 20 years of experience in the oil and petrochemical industry, we officially started our activities in the field of design, engineering, construction of refinery equipment, and the production of various motor and industrial lubricants in the year 1390 (2011)",
            aboutImage: AboutImage,
        },
        onSubmit: (values) => {
            console.log("About Datas:", values);
            setIsEditing(null);
        },
    });

    const handleEditClick = (field) => {
        setIsEditing(field);
    };

    const handleSaveClick = () => {
        formik.handleSubmit();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const fieldName = e.target.name;
        formik.setFieldValue(fieldName, file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleCancel = () => {
        setIsEditing(null);
        formik.resetForm();
    };

    return (
        <section>
            <form onSubmit={formik.handleSubmit}>
                <div className="container-fluid mb-4">
                    <div className="row about-banner" style={{ backgroundImage: `url(${formik.values.homeHeroImg})` }}>
                        <div className="content-wrapper">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-7 col-12">
                                        <div className="about-head">
                                            {isEditing === 'heading' ? (
                                                <div>
                                                    <div className="d-flex justify-content-center mb-2">
                                                        <FaSave onClick={handleSaveClick} className="text-secondary" />
                                                        <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
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
                                                    <FaEdit onClick={() => handleEditClick('heading')} className="text-secondary" />
                                                    <h1 className="display-5 fw-bold" style={{ paddingLeft: "10px" }}>{formik.values.heading}</h1>
                                                </div>
                                            )}

                                            {isEditing === 'paragraph' ? (
                                                <div>
                                                    <div className="d-flex justify-content-center mb-2">
                                                        <FaSave onClick={handleSaveClick} className="text-secondary" />
                                                        <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                                                    </div>
                                                    <textarea
                                                        name="paragraph"
                                                        value={formik.values.paragraph}
                                                        onChange={formik.handleChange}
                                                        className="form-control"
                                                    />
                                                </div>
                                            ) : (
                                                <div>
                                                    <FaEdit onClick={() => handleEditClick('paragraph')} className="text-secondary" />
                                                    <p>{formik.values.paragraph}</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="d-flex">
                                            <button className="btn enroll-btn">Enroll Now</button>
                                            <button className="btn contact-btn ms-3">Contact Us</button>
                                        </div>
                                    </div>
                                    <div className="col-md-5 col-12">
                                        {isEditing === 'aboutHeroImg' ? (
                                            <div>
                                                <div className="d-flex justify-content-center mb-2">
                                                    <FaSave onClick={handleSaveClick} className="text-secondary" />
                                                    <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                                                </div>
                                                <input
                                                    type="file"
                                                    name="aboutHeroImg"
                                                    onChange={handleFileChange}
                                                    className="form-control"
                                                    style={{ margin: '0 auto', width: '300px' }}
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <FaEdit onClick={() => handleEditClick('aboutHeroImg')} className="text-secondary" />
                                                <img src={formik.values.aboutHeroImg} alt='About Hero' className="img-fluid" />
                                            </div>
                                        )}
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
                                    <input
                                        type="file"
                                        name="aboutImage"
                                        onChange={handleFileChange}
                                        className="form-control"
                                        style={{ margin: '0 auto', width: '300px' }}
                                    />
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
                                {isEditing === 'aboutUs' ? (
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
                                        <FaEdit onClick={() => handleEditClick('aboutUs')} className="text-secondary" />
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
                    <div className="row about-banner1">
                        <div className="content-wrapper1">
                            <div className="container">
                                <div className="row mb-4">
                                    <div className="col-md-6 col-12 mb-3 d-flex flex-column align-items-start justify-content-center">
                                        <div className="about-head1">
                                            <div className="d-flex align-items-start justify-content-">
                                                <div className="p-1 mx-2 mb-3" style={{ backgroundColor: "#ec9fc2", borderRadius: "5px" }}>
                                                    <BsBoxSeam color='#AA205E' size={30} />
                                                </div>
                                                <p className="fw-medium">Courses Features</p>
                                            </div>
                                            <h1 className="display-5 fw-bold">The feature of Courses that you will benefit from</h1>
                                        </div>
                                        <button className="btn contact-btn">All Courses</button>
                                    </div>
                                    <div className="col-md-6 col-12 d-flex align-items-center justify-content-center">
                                        <div className="row">
                                            <div className="col-md-4 col-6 mb-2">
                                                <div className="card about-card h-100 d-flex flex-column align-items-center justify-content-center">
                                                    <img src={selfLevel} alt='About Hero' className="img-fluid mb-4"></img>
                                                    <p className="about-textWhite text-center mb-4">Self-level Beginner</p>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-6 mb-2">
                                                <div className="card about-card h-100 d-flex flex-column align-items-center justify-content-center">
                                                    <img src={Assignment} alt='About Hero' className="img-fluid mb-4"></img>
                                                    <p className="about-textWhite text-center mb-4">Assignment Provide</p>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-6 mb-2">
                                                <div className="card about-card h-100 d-flex flex-column align-items-center justify-content-center">
                                                    <img src={Support} alt='About Hero' className="img-fluid mb-4"></img>
                                                    <p className="about-textWhite text-center mb-4">Support 24/7</p>
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
                            <div className="imgDesign" >
                                <img src={AsianStudent} alt='img' className="img-fluid">
                                </img>
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
                                <h3 className="fw-bold mb-3">Frequently Asked Questions</h3>
                            </div>
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item mb-3" style={{ paddingLeft: "10px" }}>
                                    <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                            Lorem Ipsum is simply dummy text of the prin....?
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                        <div className="accordion-body text-start">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-3" style={{ paddingLeft: "10px" }}>
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Lorem Ipsum is simply dummy text of the prin....?
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body text-start">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-3" style={{ paddingLeft: "10px" }}>
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            Lorem Ipsum is simply dummy text of the prin....?
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body text-start">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,                                    </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-3" style={{ paddingLeft: "10px" }}>
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                            Lorem Ipsum is simply dummy text of the prin....?
                                        </button>
                                    </h2>
                                    <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body text-start">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,                                    </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-3" style={{ paddingLeft: "10px" }}>
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                            Lorem Ipsum is simply dummy text of the prin....?
                                        </button>
                                    </h2>
                                    <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body text-start">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
           
        </section>
    );
}

export default AdminAbout;
