import React, { useEffect, useState } from "react";
import { FaSearch, FaEdit, FaSave, FaTimes, FaYoutube, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import { IoLocationOutline, IoLogoWhatsapp } from "react-icons/io5";
import { TbMail } from "react-icons/tb";
import { Navbar, Nav, Button } from "react-bootstrap";
import logo from "../../assets/client/CRMLogo.png";
import { GrInstagram } from "react-icons/gr";
import { useFormik } from "formik";
import api from '../../config/BaseUrl';
import ImageURL from "../../config/ImageURL";
import toast from "react-hot-toast";

export const FooterEdit = () => {
  const [isEditing, setIsEditing] = useState(null);
  const [editMode, setEditMode] = useState({});
  const [apiData, setApiData] = useState({});
  const [loading, setLoadIndicator] = useState(false);


  const formik = useFormik({
    initialValues: {
      footer_title: "",
      logo_path: "",
      footer_content: "",
      fb_link: "",
      insta_link: "",
      youtube_link: "",
      twitter_link: "",
      linkedin_link: "",
      whatsapp_link: "",
      copyrights: ""
    },
    onSubmit: async (values) => {
      console.log("Form data", values);
      setLoadIndicator(true);
      try {
        const response = await api.post("update/footer", values);
        console.log("Response data:", response.data);
        setApiData(response.data.data);
        setIsEditing(null);
      } catch (error) {
        console.error("Error saving data:", error);
      }finally{
        setLoadIndicator(false);
      }
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

  const getData = async () => {
    try {
      const response = await api.get("/edit/footer");
      setApiData(response.data.data);
      formik.setValues(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handelFooterPublish = async () => {
    try {
      const response = await api.post(`publish/footer`)
      if (response.status === 200) {
        toast.success(response.data.message)
      }
    } catch (e) {
      toast.error("Error Publishing Data", e?.response?.data?.message)
    }
  }
  return (
    <div>
      <div className="card-header d-flex align-items-center px-0 py-3 mb-2 bg-light">
        <h3 className="fw-bold">Footer</h3>
        <div className="container-fluid d-flex justify-content-end">
          {/* <button className="btn btn-sm btn-danger mx-2" onClick={handelFooterPublish}>Publish</button> */}
          <button
                  type="submit"
                  className="btn btn-sm btn-danger mx-2"
                  disabled={loading}
                  onClick={handelFooterPublish}
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
        className="container-fluid text-light "
        style={{ backgroundColor: "#31135E" }}
      >
        <div className=" row px-3 pt-5">
          <div className="col-md-3 col-12 text-start  mb-0 ">
            <div className="">
              <img src={`${ImageURL}${apiData.logo_path}`} alt="Logo" className="img-fluid mb-3" style={{ height: '15%', width: "15%" }} />
              <span className="mx-1">{apiData.footer_title}</span>
            </div>
            {isEditing === "footer_content" ? (
              <div>
                <div className="d-flex">
                  <button
                    onClick={() => handleSaveClick("footer_content")}
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
                  name="footer_content"
                  {...formik.getFieldProps("footer_content")}
                  onChange={formik.handleChange}
                  className="form-control"
                />
              </div>
            ) : (
              <div>
                <button
                  onClick={() => handleEditClick("footer_content")}
                  className="btn btn-sm link-secondary ms-2"
                  style={{ width: "fit-content" }}
                >
                  <FaEdit />
                </button>
                <p className="text-light text-start">{apiData.footer_content}</p>
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
                <p className="fw-light text-start mailto:ms-1">support@figma.com</p>
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
                    <Nav.Link href={apiData.fb_link}>
                      <FaFacebook />
                    </Nav.Link>
                    {!isEditing && (
                      <span onClick={() => handleEditClick("fb_link")}>
                        <FaEdit />
                      </span>)}
                  </div>
                  {isEditing === "fb_link" && (
                    <div>
                      <div className="d-flex">
                        <button
                          onClick={() => handleSaveClick("fb_link")}
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
                        name="fb_link"
                        {...formik.getFieldProps("fb_link")}
                        onChange={formik.handleChange}
                        className="form-control"
                      />
                    </div>
                  )}
                  <div>
                    <Nav.Link href={apiData.insta_link}>
                      <GrInstagram />
                    </Nav.Link>
                    {!isEditing && (
                      <span onClick={() => handleEditClick("insta_link")}>
                        <FaEdit />
                      </span>)}
                  </div>
                  {isEditing === "insta_link" && (
                    <div>
                      <div className="d-flex">
                        <button
                          onClick={() => handleSaveClick("insta_link")}
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
                        name="insta_link"
                        {...formik.getFieldProps("insta_link")}
                        onChange={formik.handleChange}
                        className="form-control"
                      />
                    </div>
                  )}
                  <div>
                    <Nav.Link href={apiData.youtube_link}>
                      <FaYoutube />
                    </Nav.Link>
                    {!isEditing && (
                      <span onClick={() => handleEditClick("youtube_link")}>
                        <FaEdit />
                      </span>)}
                  </div>
                  {isEditing === "youtube_link" && (
                    <div>
                      <div className="d-flex">
                        <button
                          onClick={() => handleSaveClick("youtube_link")}
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
                        name="youtube_link"
                        {...formik.getFieldProps("youtube_link")}
                        onChange={formik.handleChange}
                        className="form-control"
                      />
                    </div>
                  )}
                  <div>
                    <Nav.Link href={apiData.twitter_link}>
                      <FaTwitter />
                    </Nav.Link>
                    {!isEditing && (
                      <span onClick={() => handleEditClick("twitter_link")}>
                        <FaEdit />
                      </span>)}
                  </div>
                  {isEditing === "twitter_link" && (
                    <div>
                      <div className="d-flex">
                        <button
                          onClick={() => handleSaveClick("twitter_link")}
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
                        name="twitter_link"
                        {...formik.getFieldProps("twitter_link")}
                        onChange={formik.handleChange}
                        className="form-control"
                      />
                    </div>
                  )}
                  <div>
                    <Nav.Link href={apiData.linkedin_link}>
                      <FaLinkedin />
                    </Nav.Link>
                    {!isEditing && (
                      <span onClick={() => handleEditClick("linkedin_link")}>
                        <FaEdit />
                      </span>)}
                  </div>
                  {isEditing === "linkedin_link" && (
                    <div>
                      <div className="d-flex">
                        <button
                          onClick={() => handleSaveClick("linkedin_link")}
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
                        name="linkedin_link"
                        {...formik.getFieldProps("linkedin_link")}
                        onChange={formik.handleChange}
                        className="form-control"
                      />
                    </div>
                  )}
                  <div>
                    <Nav.Link href={apiData.whatsapp_link}>
                      <IoLogoWhatsapp />
                    </Nav.Link>
                    {!isEditing && (
                      <span onClick={() => handleEditClick("whatsapp_link")}>
                        <FaEdit />
                      </span>)}
                  </div>
                  {isEditing === "whatsapp_link" && (
                    <div>
                      <div className="d-flex">
                        <button
                          onClick={() => handleSaveClick("whatsapp_link")}
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
                        name="whatsapp_link"
                        {...formik.getFieldProps("whatsapp_link")}
                        onChange={formik.handleChange}
                        className="form-control"
                      />
                    </div>
                  )}
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
              {isEditing === "copyrights" ? (
                <div>
                  <div className="d-flex">
                    <button
                      onClick={() => handleSaveClick("copyrights")}
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
                    name="copyrights"
                    {...formik.getFieldProps("copyrights")}
                    onChange={formik.handleChange}
                    className="form-control"
                  />
                </div>
              ) : (
                <div className="d-flex justify-content-end">

                  <p className="mb-0" style={{ color: "#a0a0a0" }}>
                    {apiData.copyrights}
                  </p>
                  <button
                    onClick={() => handleEditClick("copyrights")}
                    className="btn btn-sm link-secondary ms-2"
                    style={{ width: "fit-content" }}
                  >
                    <FaEdit />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
