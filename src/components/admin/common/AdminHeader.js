import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
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

const AdminHeader = ({ handleLogout }) => {
  const [course, setCourse] = useState(false);
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    handleLogout();
    navigate("/");
  };
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
      icon: datascience,
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
  return (
    <>
      <div style={{ position: "fixed", top: "0", width: "100%" }}>
        <p
          className="mb-0 text-light fw-light"
          style={{
            backgroundColor: "#11235A",
            padding: "2px 0",
            // fontSize: "1vw",
          }}
        >
          We offer Job Gurantee Courses (Any Degree/Diploma Canditates/Year
          Gap/Non IT/Any Passed outs)
        </p>
        <Navbar bg="light" expand="lg" className="shadow-lg">
          <Navbar.Brand href="#" className="ms-3">
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
              <button
                className="btn btn-outline-primary rounded-0"
                onClick={() => setCourse(!course)}
              >
                All Course{" "}
                {course ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
              </button>
              <div className="form-group position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
                <span className="search-icon">
                  <FaSearch className=""/>
                </span>
              </div>

              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#job-post">Job Post</Nav.Link>
              <Nav.Link href="#blogs">Blogs</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>

              <Button
                variant="primary"
                className="ml-2"
                onClick={handleLogoutClick}
              >
                Login
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {course && (
          <div
            className="container-fluid pt-4 shadow"
            style={{
              backgroundColor: "#f1f6ff",
              borderBottom: "1px solid #7bbff4",
            }}
          >
            <div className="row">
              {courses.map((course, index) => (
                <div key={index} className="col-md-2 d-flex">
                  <div className="col-3">
                    <img
                      src={course.icon}
                      alt={` icon`}
                      className="course-icon"
                    />
                  </div>
                  <div
                    className="col-9 text-start"
                    style={{ fontSize: "0.8vw" }}
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
    </>
  );
};

export default AdminHeader;
