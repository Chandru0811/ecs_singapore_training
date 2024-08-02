import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { TbMail } from "react-icons/tb";
import { Navbar, Nav, Button } from "react-bootstrap";
import logo from "../../assets/client/CRMLogo.png";
import { LuFacebook } from "react-icons/lu";
import { GrInstagram } from "react-icons/gr";
import { LiaTelegram } from "react-icons/lia";
import { FiFigma } from "react-icons/fi";
import { FiGitlab } from "react-icons/fi";
import { FiGithub } from "react-icons/fi";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useFormik } from "formik";
// import { LuFacebook, FiGitlab, FiGithub, GrInstagram, LiaTelegram, FiFigma } from 'react-icons/all';
import { FiEdit } from 'react-icons/fi';


export const FooterEdit = () => {
    const [isEditing, setIsEditing] = useState(null);
    const [editMode, setEditMode] = useState({});
    const formik = useFormik({
        initialValues: {
         
          header: logo,
          Heading: `Hi! My name is Dmitrii Rogozza and I’m an expert in web design and branding. I can help you make your website more attractive.`,
          FooterText: ` 2021 All Rights Reserved`,
          FooterText: ` 2021 All Rights Reserved`,
    
          HeadingText: ` We offer Job Gurantee Courses (Any Degree/Diploma Canditates/Year
              Gap/Non IT/Any Passed outs)`,
        },
        onSubmit: (values) => {
          console.log("Form data", values);
        },
      });

      const handleEditClick = (field) => {
        setIsEditing(field);
      };
    
      const handleSaveClick = () => {
        setIsEditing(null);
        formik.handleSubmit();
      };
    
      const handleCancel = () => {
        setIsEditing(null);
      };

      const [links, setLinks] = useState({
        facebook: "#facebook",
        gitlab: "#Gitlab",
        github: "#Github",
        instagram: "#Instagram",
        telegram: "#Telegram",
        figma: "#Figma"
      });
    
      const handleEditToggle = (name) => {
        setEditMode((prev) => ({ ...prev, [name]: !prev[name] }));
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setLinks({
          ...links,
          [name]: value
        });
      };
    
  return (
     <div >
    <div className="card-header d-flex align-items-center px-0 py-3 mb-2 bg-light">
        <h3 className="fw-bold">Footer</h3>
        <div className="container-fluid d-flex justify-content-end">
          <button className="btn btn-sm btn-danger mx-2">Publish</button>
        </div>
      </div>
        <div
          className="container-fluid text-light "
          style={{ backgroundColor: "#31135E" }}
        >
          <div className=" row px-3 pt-5">
            <div className="col-md-3 col-12  mb-0 ">
              <div className="">
                <img
                  src={logo}
                  alt="ECS Training"
                  className="img-fluid h-25 w-25 mb-3"
                />
                <span>ECS</span>
                <span>Training</span>
              </div>
              {isEditing === "Heading" ? (
                  <div>
                    <div className="d-flex">
                      <button
                        onClick={() => handleSaveClick("Heading")}
                        className="btn btn-sm link-primary ms-2"
                        style={{ width: "fit-content" }}
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn btn-sm link-danger ms-2"
                        style={{ width: "fit-content" }}
                      >
                        <FaTimes />
                      </button>
                    </div>
                    <input
                      type="text"
                      name="Heading"
                      {...formik.getFieldProps("Heading")}
                      onChange={formik.handleChange}
                      className="form-control"
                    />
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => handleEditClick("Heading")}
                      className="btn btn-sm link-secondary ms-2"
                      style={{ width: "fit-content" }}
                    >
                      <FaEdit />
                    </button>
                    <p className="text-light">
                      {formik.values.Heading}
                    </p>
                  </div>
                )}
             
            </div>
            <div className="col-md-3 col-12  mb-0 text-start">
              <h5 className="mb-4 ms-1 text-start">Contact Us</h5>
              <div className="row ">
                <div className="col-auto pe-0">
                  <IoLocationOutline size={20} />
                </div>
                <div className="col ps-0">
                  <p className="fw-light text-start mb-3 ms-1">
                    Wisconsin Ave, Suite 700 Chevy Chase, Maryland 20815
                  </p>
                </div>
              </div>
              <div className="row ">
                <div className="col-auto pe-0">
                  <TbMail size={20} />
                </div>
                <div className="col ps-0">
                  <p className="fw-light text-start ms-1">support@figma.com</p>
                </div>
              </div>
            </div>
            <div className="col-md-2 col-6 mb-md-0 text-start">
              <h5 className="mb-4 ">For Businesses</h5>
              <ul className="list-unstyled ">
                <Nav.Link href="#job-post" className="mb-2">
                  Job Post
                </Nav.Link>
                <Nav.Link href="#courses" className="mb-2">
                  Courses
                </Nav.Link>
                <Nav.Link href="##careers" className="mb-2">
                  Careers
                </Nav.Link>
              </ul>
            </div>
            <div className="col-md-2 col-6 mb-md-0 text-start">
              <h5 className="mb-4 ">Company</h5>
              <ul className="list-unstyled">
                <div className="d-flex flex-column">
                  <Nav.Link href="#about" className="mb-2">
                    About
                  </Nav.Link>
                  <Nav.Link href="#blogs" className="mb-2">
                    Blogs
                  </Nav.Link>
                  <Nav.Link href="#contact-us" className="mb-2">
                    Contact Us
                  </Nav.Link>
                </div>
              </ul>
            </div>
            <div className="col-md-2 col-12 text-start mb-3">
              <h5 className="mb-4 ">Let's do it!</h5>
              <div>
              <ul className="footer-social list-inline ps-0">
              <div className="d-flex flex-wrap gap-2 ">
                  <div>
                    <Nav.Link href="#facebook">
                      <LuFacebook />
                    </Nav.Link>
                    <span>
                      <FaEdit />
                    </span>
                  </div>
                  <div>
                    <Nav.Link href="#Gitlab">
                      <FiGitlab />
                    </Nav.Link>
                    <span>
                      <FaEdit />
                    </span>
                  </div>
                  <div>
                    <Nav.Link href="#Github">
                      <FiGithub />
                    </Nav.Link>
                    <span>
                      <FaEdit />
                    </span>
                  </div>
                  <div>
                    <Nav.Link href="#Instagram">
                      <GrInstagram />
                    </Nav.Link>
                    <span>
                      <FaEdit />
                    </span>
                  </div>
                  <div>
                    <Nav.Link href="#Telegram">
                      <LiaTelegram />
                    </Nav.Link>
                    <span>
                      <FaEdit />
                    </span>
                  </div>
                  <div>
                    <Nav.Link href="#Figma">
                      <FiFigma />
                    </Nav.Link>
                    <span>
                      <FaEdit />
                    </span>
                  </div>
                </div>
    </ul>
    </div>
              <button className="footer-btn border-0 rounded-pill mt-3 px-3 py-2">
                Enroll Now
              </button>
            </div>
          </div>
          <hr className="mt-0 mb-3" />
          <div className="container-fluid">
            <div className=" row pb-3">
              <div className="col-md-6 col-12">
                <div className="text-start">
                  <span className="me-3">Privacy Policy</span>
                  <span>Terms of Use</span>
                </div>
              </div>
              <div className="col-md-6 col-12 text-md-end text-start">
                
                 {isEditing === "FooterText" ? (
                  <div>
                    <div className="d-flex">
                      <button
                        onClick={() => handleSaveClick("FooterText")}
                        className="btn btn-sm link-primary ms-2"
                        style={{ width: "fit-content" }}
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn btn-sm link-danger ms-2"
                        style={{ width: "fit-content" }}
                      >
                        <FaTimes />
                      </button>
                    </div>
                    <input
                      type="text"
                      name="FooterText"
                      {...formik.getFieldProps("FooterText")}
                      onChange={formik.handleChange}
                      className="form-control"
                    />
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => handleEditClick("FooterText")}
                      className="btn btn-sm link-secondary ms-2"
                      style={{ width: "fit-content" }}
                    >
                      <FaEdit />
                    </button>
                    <p className="mb-0" style={{ color: "#a0a0a0" }}>
                      {formik.values.FooterText}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div> 
  )
}
