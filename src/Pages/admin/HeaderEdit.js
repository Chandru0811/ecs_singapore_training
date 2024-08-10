import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useFormik } from "formik";
import api from "../../config/BaseUrl";
import ImageURL from "../../config/ImageURL";
import toast from "react-hot-toast";

const HeaderFooter = () => {
  const [course, setCourse] = useState(false);
  const [headerData, setHeaderData] = useState();
  const [loading, setLoadIndicator] = useState(false);

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
  const formik = useFormik({
    initialValues: {
      header: logo,
      HeadingText: ``,
    },
    onSubmit: async (values) => {
      console.log("object",values.header)
      setLoadIndicator(true);
      const formData = new FormData();
      formData.append("top_bar", values.HeadingText);
      if (
        values.header instanceof ArrayBuffer ||
        values.header instanceof Blob
      ) {
        formData.append("logo_image", values.header);
      }
      try {
        const response = await api.post("update/header", formData);
        if (response.status === 200) {
          getData();
          toast.success(response.data.message)
          console.log("updated", response.data);
        }
      } catch (e) {
        console.log("object", e);
      }finally{
        setLoadIndicator(false);
      }
    },
  });

  // api Get Data
  const getData = async () => {
    try {
      const response = await api.get("edit/header");
      if (response.status === 200) {
        formik.setFieldValue("HeadingText", response.data.data.top_bar);
        setHeaderData(response.data.data);
      }
    } catch (e) {
      console.log("object", e);
    }
  };

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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue("header", file);
    }
  };
  // publish Data
  const publishData = async () => {
    try {
      const response = await api.post("publish/header");
      if (response.status === 200) {
        toast.success(response.data.message)
        console.log("published successfully!");
      }
    } catch (e) {
      console.log("object", e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container-fluid px-0">
      <div>
        <div className="card-header d-flex align-items-center px-0 py-3 mb-2 bg-light">
          <h3 className="fw-bold">Header</h3>
          <div className="container-fluid d-flex justify-content-end">
            {/* <button className="btn btn-sm btn-danger mx-2" onClick={publishData}>Publish</button> */}
            <button
                  type="submit"
                  className="btn btn-sm btn-danger mx-2"
                  disabled={loading}
                  onClick={publishData}
                >
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    <span></span>
                  )}
                   Publish
                   </button>
          </div>
        </div>
        <div
          className=""
          style={{ position: "sticky", top: "0", zIndex: "999" }}
        >
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
            <Navbar.Brand className="w-50">
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
                    onChange={handleImageChange}
                    className="form-control"
                  />
                </div>
              ) : (
                <div
                  className="d-flex align-items-center"
                  style={{ width: "75%", height: "auto" }}
                >
                  <button
                    onClick={() => handleEditClick("header")}
                    className="btn btn-sm link-secondary"
                    style={{ width: "fit-content" }}
                  >
                    <FaEdit />
                  </button>
                  {formik.values.header && (
                    <img
                      src={`${ImageURL}${headerData?.logo_path}`}
                      alt="logo"
                      className="img-fluid"
                      style={{
                        width: "75%",
                        height: "auto",
                        objectFit: "contain",
                      }}
                    />
                  )}
                </div>
              )}

              {/* <span className="d-flex">ECS </span> */}
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav " />
            <Navbar.Collapse id="basic-navbar-nav" className=" ">
              <Nav className="gap-3">
                <div ref={courseRef2}>
                  <button
                    className="btn btn-outline-primary rounded-1 courseBtn"
                    // onClick={() => setCourse(!course)}
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
                <Nav.Link>Home</Nav.Link>
                <Nav.Link>About</Nav.Link>
                <Nav.Link>Blogs</Nav.Link>
                <Nav.Link>Contact</Nav.Link>

                <Link>
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
      </div>
    </div>
  );
};

export default HeaderFooter;
