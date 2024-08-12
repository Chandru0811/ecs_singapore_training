import React, { useEffect, useState } from "react";
import { FaEdit, FaSave, FaTimes, FaYoutube, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";
import { IoLogoWhatsapp } from "react-icons/io";
import { TbMail } from "react-icons/tb";
import { Nav } from "react-bootstrap";
import { AiFillInstagram } from "react-icons/ai";
import { useFormik } from "formik";
import api from '../../config/BaseUrl';
import ImageURL from "../../config/ImageURL";
import toast from "react-hot-toast";

export const FooterEdit = () => {
  const [isEditing, setIsEditing] = useState(null);
  const [apiData, setApiData] = useState({});
  const [loadIndicator, setLoadIndicator] = useState(false);

  const formik = useFormik({
    initialValues: {
      footer_title: "",
      logo_image: null,
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
      try {
        const formData = new FormData();
        for (const key in values) {
          if (values[key] !== null) {
            formData.append(key, values[key]);
          }
        }
        const response = await api.post("update/footer", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log("Response data:", response.data);
        setApiData(response.data.data);
        setIsEditing(null);
        toast.success(response.data.message);
      } catch (error) {
        console.error("Error saving data:", error);
        toast.error("Error saving data.");
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue('logo_image', file);
    }
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

  const handleFooterPublish = async () => {
    setLoadIndicator(true);
    try {
      const response = await api.post(`publish/footer`);
      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (e) {
      toast.error("Error Publishing Data", e?.response?.data?.message);
    } finally {
      setLoadIndicator(false);
    }
  }
  return (
    <div>
      <div className="card-header d-flex align-items-center justify-content-between p-2 bg-light">
        <h3 className="fw-bold">Footer</h3>
        <div>
          <button
            type="submit"
            className="btn btn-danger mx-2"
            disabled={loadIndicator}
            onClick={handleFooterPublish}
          >
            {loadIndicator && (
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              ></span>
            )}
            Publish
          </button>
        </div>
      </div>
      <div
        className="container-fluid text-light"
        style={{ backgroundColor: "#31135E" }}
      >
        <div className=" row px-3 pt-5">
          <div className="col-md-3 col-12 text-start mb-0">
            <div className="d-flex align-items-center">
              {isEditing === 'logo_image' && (
                <div className="d-flex">
                  <input
                    type="file"
                    name="logo_image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="form-control"
                  />
                  <FaSave
                    onClick={handleSaveClick}
                    className="text-primary mx-2 mt-2" />
                  <FaTimes
                    onClick={handleCancel}
                    className="text-danger mt-2" />
                </div>
              )}
              {isEditing !== 'logo_image' && (
                <FaEdit
                  className="text-secondary"
                  onClick={() => handleEditClick("logo_image")}
                />
              )}
            </div>
            <div className="d-flex">
              <img src={`${ImageURL}${apiData.logo_path}`}
                alt={apiData.footer_title}
                className="img-fluid mb-3"
                style={{ height: "15%", width: "15%" }}
              />
              {isEditing === "footer_title" ? (
                <div className="d-flex mx-2 mt-2">
                  <input
                    type="text"
                    name="footer_title"
                    style={{ height: "65%" }}
                    {...formik.getFieldProps("footer_title")}
                    onChange={formik.handleChange}
                    className="form-control"
                  />
                  <button
                    onClick={() => handleSaveClick("footer_title")}
                    className="btn link-primary mx-2 mb-3"
                    style={{ width: "fit-content", padding: 0 }}
                  >
                    <FaSave />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn link-danger mb-3"
                    style={{ width: "fit-content", padding: 0 }}
                  >
                    <FaTimes />
                  </button>
                </div>
              ) : (
                <h4 className="mx-2 mt-2 fw-bold">{apiData.footer_title}
                  <button
                    onClick={() => handleEditClick("footer_title")}
                    className="btn link-secondary ms-1 mb-1"
                    style={{ width: "fit-content", padding: 0 }}
                  >
                    <FaEdit />
                  </button>
                </h4>
              )}
            </div>
            {isEditing === "footer_content" ? (
              <div className="d-flex">
                <textarea
                  name="footer_content"
                  {...formik.getFieldProps("footer_content")}
                  onChange={formik.handleChange}
                  className="form-control"
                />
                <button
                  onClick={() => handleSaveClick("footer_content")}
                  className="btn link-primary"
                  style={{ width: "fit-content" }}
                >
                  <FaSave />
                </button>
                <button
                  onClick={handleCancel}
                  className="btn link-danger"
                  style={{ width: "fit-content" }}
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <div>
                <p className="text-light text-start">{apiData.footer_content}
                  <button
                    onClick={() => handleEditClick("footer_content")}
                    className="btn link-secondary ms-1 mb-2"
                    style={{ width: "fit-content", padding: 0 }}
                  >
                    <FaEdit />
                  </button>
                </p>
              </div>
            )}
          </div>
          <div className="col-md-3 col-12  mb-0 text-start">
            <h5 className="mb-4 ms-1 text-start">Contact Us</h5>
            <div className="row ">
              <div className="col-auto pe-0">
                <LuMapPin size={20} />
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
                    <Nav.Link href={apiData.fb_link} target="_blank">
                      <FaFacebook />
                    </Nav.Link>
                    {!isEditing && (
                      <span className="text-secondary" onClick={() => handleEditClick("fb_link")}>
                        <FaEdit />
                      </span>
                    )}
                  </div>
                  {isEditing === "fb_link" && (
                    <div className="d-flex">
                      <input
                        type="text"
                        name="fb_link"
                        {...formik.getFieldProps("fb_link")}
                        onChange={formik.handleChange}
                        className="form-control"
                      />
                      <button
                        onClick={() => handleSaveClick("fb_link")}
                        className="btn link-primary ms-2"
                        style={{ width: "fit-content", padding: 0 }}
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn link-danger ms-2"
                        style={{ width: "fit-content", padding: 0 }}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                  <div>
                    <Nav.Link href={apiData.insta_link} target="_blank">
                      <AiFillInstagram size={18} />
                    </Nav.Link>
                    {!isEditing && (
                      <span className="text-secondary" onClick={() => handleEditClick("insta_link")}>
                        <FaEdit />
                      </span>
                    )}
                  </div>
                  {isEditing === "insta_link" && (
                    <div className="d-flex">
                      <input
                        type="text"
                        name="insta_link"
                        {...formik.getFieldProps("insta_link")}
                        onChange={formik.handleChange}
                        className="form-control"
                      />
                      <button
                        onClick={() => handleSaveClick("insta_link")}
                        className="btn link-primary ms-2"
                        style={{ width: "fit-content", padding: 0 }}
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn link-danger ms-2"
                        style={{ width: "fit-content", padding: 0 }}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                  <div>
                    <Nav.Link href={apiData.youtube_link} target="_blank">
                      <FaYoutube size={18} />
                    </Nav.Link>
                    {!isEditing && (
                      <span className="text-secondary" onClick={() => handleEditClick("youtube_link")}>
                        <FaEdit />
                      </span>
                    )}
                  </div>
                  {isEditing === "youtube_link" && (
                    <div className="d-flex">
                      <input
                        type="text"
                        name="youtube_link"
                        {...formik.getFieldProps("youtube_link")}
                        onChange={formik.handleChange}
                        className="form-control"
                      />
                      <button
                        onClick={() => handleSaveClick("youtube_link")}
                        className="btn link-primary ms-2"
                        style={{ width: "fit-content", padding: 0 }}
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn link-danger ms-2"
                        style={{ width: "fit-content", padding: 0 }}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                  <div>
                    <Nav.Link href={apiData.twitter_link} target="_blank">
                      <FaTwitter />
                    </Nav.Link>
                    {!isEditing && (
                      <span className="text-secondary" onClick={() => handleEditClick("twitter_link")}>
                        <FaEdit />
                      </span>
                    )}
                  </div>
                  {isEditing === "twitter_link" && (
                    <div className="d-flex">
                      <input
                        type="text"
                        name="twitter_link"
                        {...formik.getFieldProps("twitter_link")}
                        onChange={formik.handleChange}
                        className="form-control"
                      />
                      <button
                        onClick={() => handleSaveClick("twitter_link")}
                        className="btn link-primary ms-2"
                        style={{ width: "fit-content", padding: 0 }}
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn link-danger ms-2"
                        style={{ width: "fit-content", padding: 0 }}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                  <div>
                    <Nav.Link href={apiData.linkedin_link} target="_blank">
                      <FaLinkedin />
                    </Nav.Link>
                    {!isEditing && (
                      <span className="text-secondary" onClick={() => handleEditClick("linkedin_link")}>
                        <FaEdit />
                      </span>
                    )}
                  </div>
                  {isEditing === "linkedin_link" && (
                    <div className="d-flex">
                      <input
                        type="text"
                        name="linkedin_link"
                        {...formik.getFieldProps("linkedin_link")}
                        onChange={formik.handleChange}
                        className="form-control"
                      />
                      <button
                        onClick={() => handleSaveClick("linkedin_link")}
                        className="btn link-primary ms-2"
                        style={{ width: "fit-content", padding: 0 }}
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn link-danger ms-2"
                        style={{ width: "fit-content", padding: 0 }}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                  <div>
                    <Nav.Link href={apiData.whatsapp_link} target="_blank">
                      <IoLogoWhatsapp />
                    </Nav.Link>
                    {!isEditing && (
                      <span className="text-secondary" onClick={() => handleEditClick("whatsapp_link")}>
                        <FaEdit />
                      </span>
                    )}
                  </div>
                  {isEditing === "whatsapp_link" && (
                    <div className="d-flex">
                      <input
                        type="text"
                        name="whatsapp_link"
                        {...formik.getFieldProps("whatsapp_link")}
                        onChange={formik.handleChange}
                        className="form-control"
                      />
                      <button
                        onClick={() => handleSaveClick("whatsapp_link")}
                        className="btn link-primary ms-2"
                        style={{ width: "fit-content", padding: 0 }}
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn btn-sm link-danger ms-2"
                        style={{ width: "fit-content", padding: 0 }}
                      >
                        <FaTimes />
                      </button>
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
                <div className="d-flex">
                  <input
                    type="text"
                    name="copyrights"
                    {...formik.getFieldProps("copyrights")}
                    onChange={formik.handleChange}
                    className="form-control"
                  />
                  <button
                    onClick={() => handleSaveClick("copyrights")}
                    className="btn link-primary ms-2"
                    style={{ width: "fit-content", padding: 0 }}
                  >
                    <FaSave />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn link-danger ms-2"
                    style={{ width: "fit-content", padding: 0 }}
                  >
                    <FaTimes />
                  </button>
                </div>
              ) : (
                <p className="mb-0" style={{ color: "#a0a0a0" }}>
                  {apiData.copyrights}
                  <button
                    onClick={() => handleEditClick("copyrights")}
                    className="btn link-secondary ms-2 mb-2"
                    style={{ width: "fit-content", padding: 0 }}
                  >
                    <FaEdit />
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};