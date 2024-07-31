import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import {
  Navbar,
  Nav,
  Button,
} from "react-bootstrap";
import logo from "../../../assets/admin/CRMLogo.png";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import java from "../../../assets/admin/javaicon.png";
import react from "../../../assets/admin/reacticon.png";
import php from "../../../assets/admin/php.png";
import angular from "../../../assets/admin/angularicon.png";
import aws from "../../../assets/admin/aws.png";
import datascience from "../../../assets/admin/datasciencicon.png";
import devops from "../../../assets/admin/devopsicon.png";
import fultter from "../../../assets/admin/fluttericon.png";
import python from "../../../assets/admin/pythone.png";
import node from "../../../assets/admin//nodeicon.png";
import { FaSearch } from "react-icons/fa";

const Header = ({ handleLogin }) => {
  const [course, setCourse] = useState(false);
  const navigate = useNavigate();
  const courseRef = useRef(null);
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
      if (courseRef.current && !courseRef.current.contains(event.target)) {
        setCourse(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);


    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
 

  return (
    <>
      <div className="" style={{position:"sticky" ,top:"0",zIndex:"999"}}>
        <p
          className="mb-0 text-light fw-light topHeader"
          
        >
          We offer Job Gurantee Courses (Any Degree/Diploma Canditates/Year
          Gap/Non IT/Any Passed outs)
        </p>
        <Navbar bg="light" expand="lg" className="shadow-lg">
        <Navbar.Brand as={NavLink} to="/home" className="ms-3">
            <img
              src={logo}
              height="40"
              className="d-inline-block align-top"
              alt="ECS Training"
            />

            <span>ECS </span>
            <span>Training</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav " />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end me-5"
          >
            <Nav className=" gap-4">
            {/* <div
                className="btn btn-outline-primary rounded-0"
                onMouseEnter={() => setCourse(true)}
                // onMouseLeave={() => setCourse(false)}
              >
                All Course{" "}
                {course ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
              </div> */}
              <div ref={courseRef}>
                <button
                  className="btn btn-outline-primary rounded-0"
                  onClick={() => setCourse(!course)}
                >
                  All Course
                  {course ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                </button>
              </div>
              <div className="form-group position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  style={{minWidth:"40%"}}
                />
                <span className="search-icon">
                  <FaSearch className="" />
                </span>
              </div>
              <Nav.Link >Home</Nav.Link>
              <Nav.Link as={NavLink} to="/about">About</Nav.Link>
              <Nav.Link >Blogs</Nav.Link>
              <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>

              <Link to="/login">
                <Button variant="primary" className="ml-2" >
                  Login
                </Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        </div>
        {course && (
          <div
            className="container-fluid pt-4 shadow CourseDropDown"
            style={{
               position:"sticky",
               top:"91px",
               zIndex:"999",
              backgroundColor: "#f1f6ff",
              borderBottom: "1px solid #7bbff4",
            }}
            ref={courseRef}
          >
            <div className="row">
              {courses.map((course, index) => (
                <div key={index} className="col-md-2 col-4 d-flex">
                  <div className="col-3">
                    <img
                      src={course.icon}
                      alt={`icon`}
                      className="course-icon"
                    />
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
      
    </>
  );
};

export default Header;
