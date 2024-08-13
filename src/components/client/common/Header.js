import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import ImageURL from "../../../config/ImageURL";
import api from "../../../config/BaseUrl";

const Header = ({ handleLogout }) => {
  const [course, setCourse] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoginFromStorage = sessionStorage.getItem("isClientAuthenticated");
  const expand = "lg";
  const [apiData, setApiData] = useState({});
  const courseRef = useRef(null);
  const courseRef2 = useRef(null);
  const [courses, setCourses] = useState([]);

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

  useEffect(() => {
    const getCourseData = async () => {
      try {
        const response = await api.get("header/course");
        const formattedCourses = response.data.data.map((course) => ({
          name: course.title,
          description: course.description,
          icon: course.logo_path,
        }));
        setCourses(formattedCourses);
        // console.log(formattedCourses)
      } catch (e) {
        console.error("Failed to fetch courses", e);
      }
    };

    getCourseData();
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

  // useEffect(() => {
  //   const handleStorageChange = (event) => {
  //     if (event.key === "isClientAuthenticated") {
  //       if (event.newValue === "false") {0
  //         setIsClientAuthenticated(false);
  //       }else if(event.newValue === "true"){
  //         setIsClientAuthenticated(true);
  //       }
  //     }
  //   };

  //   window.addEventListener("storage", handleStorageChange);

  //   // Clean up the event listener on component unmount
  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);

  // useEffect(() => {
  //   const isLoginFromStorage = sessionStorage.getItem("isClientAuthenticated");

  //   const isLoginBoolean = isLoginFromStorage === "true";
  //   if (isLoggedIn !== isLoginBoolean) {
  //     setIsLoggedIn(isLoginBoolean);
  //   }

  // }, []);
  return (
    <>
      <div className="" style={{ position: "sticky", top: "0", zIndex: "999" }}>
        <p className="mb-0 text-light fw-light topHeader">{apiData?.top_bar}</p>
        <Navbar
          bg="light"
          isLoggedIn={expand}
          expand={expand}
          className="clientNav shadow"
        >
          <Navbar.Brand as={NavLink} to="/" className="ms-3">
            <img
              src={`${ImageURL}${apiData?.logo_path}`}
              height="40"
              className="d-inline-block align-top"
              alt="ECS Training"
            />
            <div>{/* <span>{apiData?.title}</span> */}</div>
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
              {isLoginFromStorage ? (
                <Link onClick={handleLogout}>
                  <Button className="loginBtn">logout</Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button className="loginBtn">Login</Button>
                </Link>
              )}
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
                <Link
                  to={"/course"}
                  style={{ textDecoration: "none" }}
                  onClick={() => setCourse(false)}
                >
                  <div className="col-3">
                    <img
                      src={`${ImageURL}${course.icon}`}
                      alt={course.icon}
                      width={50}
                      height={50}
                      style={{ borderRadius: "50%" }}
                      className="course-icon"
                    />
                  </div>
                  <div
                    className="col-9 text-start text-dark fw-light"
                    style={{ textDecoration: "none" }}
                  >
                    <h5 className="mb-0">{course.name}</h5>
                    <p>{course.description}</p>
                  </div>
                </Link>
              </div>
            ))}
            <Link
              to={"/course"}
              style={{ textDecoration: "none" }}
              onClick={() => setCourse(false)}
            >
              <p className="text-info text-end mb-0">see more..</p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
