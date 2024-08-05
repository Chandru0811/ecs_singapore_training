import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import logo from "../../../assets/client/CRMLogo.png";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import java from "../../../assets/client/javaicon.png";
import react from "../../../assets/client/reacticon.png";
import php from "../../../assets/client/php.png";
import angular from "../../../assets/client/angularicon.png";
import aws from "../../../assets/client/aws.png";
import datascience from "../../../assets/client/datasciencicon.png";
import devops from "../../../assets/client/devopsicon.png";
import fultter from "../../../assets/client/fluttericon.png";
import python from "../../../assets/client/pythone.png";
import node from "../../../assets/client//nodeicon.png";
import { FaSearch } from "react-icons/fa";
import ImageURL from "../../../config/ImageURL";
import api from "../../../config/BaseUrl";

const Header = ({ handleLogin }) => {
  const [course, setCourse] = useState(false);
  const [apiData, setApiData] = useState({});
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

  const getData = async () => {
    try {
      const response = await api.get("header");
      setApiData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="" style={{ position: "sticky", top: "0", zIndex: "999" }}>
        <p className="mb-0 text-light fw-light topHeader">
         {apiData?.top_bar}
        </p>
        <Navbar bg="light" expand="lg" className="clientNav shadow-lg">
          <Navbar.Brand as={NavLink} to="/" className="ms-3">
            <img
              src={`${ImageURL}${apiData?.logo_path}`}
              height="40"
              className="d-inline-block align-top"
              alt="ECS Training"
            />
           <div>
           {/* <span>{apiData?.title}</span> */}
           </div>
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
                <Link to={"/course"} style={{textDecoration:"none"}} onClick={()=>(setCourse(false))}>
                <div className="col-3" >
                  <img src={course.icon} alt={`icon`} className="course-icon" />
                </div>
                <div
                  className="col-9 text-start text-dark fw-light"
                  style={{textDecoration:"none"}}
                >
                  <h5 className="mb-0">{course.name}</h5>
                  <p>{course.description}</p>
                </div>
            </Link>
              </div>
            ))}
            <Link to={"/course"} style={{textDecoration:"none"}} onClick={()=>(setCourse(false))}>
              <p className="text-info text-end mb-0">see more..</p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
