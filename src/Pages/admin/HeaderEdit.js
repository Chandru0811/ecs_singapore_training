import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import logo from "../../assets/client/CRMLogo.png";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import java from "../../assets/client/javaicon.png";
import react from "../../assets/client/reacticon.png";
import php from "../../assets/client/php.png";
import angular from "../../assets/client/angularicon.png";
import aws from "../../assets/client/aws.png";
import datascience from "../../assets/client/datasciencicon.png";
import devops from "../../assets/client/devopsicon.png";
import fultter from "../../assets/client/fluttericon.png";
import python from "../../assets/client/pythone.png";
import node from "../../assets/client//nodeicon.png";
import { FaSearch } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { TbMail } from "react-icons/tb";

import { LuFacebook } from "react-icons/lu";
import { GrInstagram } from "react-icons/gr";
import { LiaTelegram } from "react-icons/lia";
import { FiFigma } from "react-icons/fi";
import { FiGitlab } from "react-icons/fi";
import { FiGithub } from "react-icons/fi";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useFormik } from "formik";

const HeaderFooter = ({ handleLogin }) => {
  const [course, setCourse] = useState(false);
  const navigate = useNavigate();
  const courseRef = useRef(null);
  const courseRef2 = useRef(null);
  const courses = [
    {
      name: "Java Developer",
      description: "Master Java from basics to advanced.",
      icon: java,
    },
    {
      name: "Flutter Developer",
      description: "Create beautiful mobile applications.",
      icon: fultter,
    },
    {
      name: "AWS Developer",
      description: "Leverage AWS for cloud solutions.",
      icon: aws,
    },
    {
      name: "Node.js Developer",
      description: "Develop scalable backend systems.",
      icon: node,
    },
    {
      name: "Data Science",
      description: "Analyze data and gain actionable insights effectively.",
      icon: datascience,
    },
    {
      name: "React Developer",
      description: "Build dynamic web apps with React.",
      icon: react,
    },
    {
      name: "Angular Developer",
      description: "Develop robust front-end apps with Angular.",
      icon: angular,
    },
    {
      name: "PHP Developer",
      description: "Build dynamic websites with PHP.",
      icon: php,
    },
    {
      name: "Python Developer",
      description: "Learn Python for various applications.",
      icon: python,
    },
    {
      name: "DevOps Engineer",
      description: "Streamline development and operations.",
      icon: devops,
    },
  ];
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        courseRef.current &&
        courseRef2.current &&
        !courseRef.current.contains(event.target) &&
        !courseRef2.current.contains(event.target)
      ) {
        setCourse(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isEditing, setIsEditing] = useState(null);
  const [show, setShow] = useState(false);
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
  const handleShow = (card) => {
    
    setShow(true);
  };


  const handleClose = () => setShow(false);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue("header", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="container-fluid px-0">
      <div >
      <div className="card-header d-flex align-items-center px-0 py-3 mb-2 bg-light">
        <h3 className="fw-bold">Header</h3>
        <div className="container-fluid d-flex justify-content-end">
          <button className="btn btn-sm btn-danger mx-2">Publish</button>
        </div>
      </div>
      <div className="" style={{ position: "sticky", top: "0", zIndex: "999" }}>
       {isEditing === "HeadingText" ? (
                  <div>
                    <div className="d-flex">
                      <button
                        onClick={() => handleSaveClick("HeadingText")}
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
                      name="HeadingText"
                      {...formik.getFieldProps("HeadingText")}
                      onChange={formik.handleChange}
                      className="form-control"
                    />
                  </div>
                ) : (
                  <div>
                   
                    <p className="mb-0 text-light fw-light topHeader">
                      {formik.values.HeadingText}
                      <button
                      onClick={() => handleEditClick("HeadingText")}
                      className="btn btn-sm link-secondary ms-2"
                      style={{ width: "fit-content" }}
                    >
                      <FaEdit />
                    </button>
                    </p>
                  </div>
                )}

        <Navbar bg="light" expand="lg" className="clientNav shadow-lg px-1">
          <Navbar.Brand className="">
             {isEditing === "header" ? (
                  <div>
                    <div className="d-flex">
                      <button
                        onClick={() => handleSaveClick("header")}
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
                      type="file"
                      name="carouselImg"
                      onChange={handleImageChange}
                      className="form-control"
                    />
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => handleEditClick("header")}
                      className="btn btn-sm link-secondary"
                      style={{ width: "fit-content" }}
                    >
                      <FaEdit />
                    </button>
                    {formik.values.header &&
                      (typeof formik.values.header === "string" ? (
                        <img
                          src={formik.values.header}
                          alt="logo"
                          className="img-fluid w-25"
                        />
                      ) : (
                        <img
                          src={URL.createObjectURL(
                            formik.values.header
                          )}
                          alt="logo"
                          className="img-fluid"
                        />
                      ))}
                  </div>
                )}

            <span>ECS </span>
            <span>Training</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav " />
          <Navbar.Collapse id="basic-navbar-nav" className=" ">
            <Nav className="gap-3">
              <div ref={courseRef2}>
                <button
                  className="btn btn-outline-primary rounded-1 courseBtn"
                  onClick={() => setCourse(!course)}
                >
                  All Course
                  {course ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                </button>
              </div>
              <div
                className="form-group position-relative headerInput"
                style={{ width: "40vw" }}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
                <span className="search-icon">
                  <FaSearch className="" />
                </span>
              </div>
            </Nav>
            <Nav
              className=" gap-4 justify-content-end me-2"
              style={{ flexGrow: "inherit !important" }}
            >
              <Nav.Link as={NavLink} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about">
                About
              </Nav.Link>
              <Nav.Link>Blogs</Nav.Link>
              <Nav.Link as={NavLink} to="/contact">
                Contact
              </Nav.Link>

              <Link to="/login">
                <Button className="loginBtn">Login</Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      {course && (
        <div
          className="container-fluid pt-4 shadow CourseDropDown"
          style={{
            position: "fixed",
            // top: "91px",
            // overflow:"auto",
            zIndex: "99",
            backgroundColor: "#f1f6ff",
            borderBottom: "1px solid #7bbff4",
          }}
          ref={courseRef}
        >
          <div className="row">
            {courses.map((course, index) => (
              <div key={index} className="col-sm-4 col-md-2 col-6 d-flex">
                <div className="col-3">
                  <img src={course.icon} alt={`icon`} className="course-icon" />
                </div>
                <div
                  className="col-9 text-start fw-light"
                  // style={{ fontSize: "0.8vw" }}
                >
                  <h5 className="mb-0">{course.name}</h5>
                  <p>{course.description}</p>
                </div>
              </div>
            ))}
            <p className="text-info text-end mb-0">see more..</p>
          </div>
        </div>
      )}
      </div>

      {/* Footer */}
      {/* <div className="" style={{marginTop:"5rem"}}>
    
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
              <ul className="footer-social list-inline ps-0">
                <div className="d-flex flex-wrap gap-2 ">
                  <Nav.Link href="#facebook">
                    <LuFacebook />
                  </Nav.Link>
                  <Nav.Link href="#Gitlab">
                    <FiGitlab />
                  </Nav.Link>
                  <Nav.Link href="#Github">
                    <FiGithub />
                  </Nav.Link>
                  <Nav.Link href="#Instagram">
                    <GrInstagram />
                  </Nav.Link>
                  <Nav.Link href="#Telegram">
                    <LiaTelegram />
                  </Nav.Link>
                  <Nav.Link href="#Figma">
                    <FiFigma />
                  </Nav.Link>
                </div>
              </ul>
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
      </div> */}
    </div>
  );
};

export default HeaderFooter;
