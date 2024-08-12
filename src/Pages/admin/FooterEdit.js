import React, { useEffect, useState } from "react";
import { FaEdit, FaSave, FaTimes, FaYoutube, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import { IoLocationOutline, IoLogoWhatsapp } from "react-icons/io5";
import { TbMail } from "react-icons/tb";
import { Nav } from "react-bootstrap";
import { GrInstagram } from "react-icons/gr";
import { useFormik } from "formik";
import api from '../../config/BaseUrl';
import ImageURL from "../../config/ImageURL";
import toast from "react-hot-toast";

export const FooterEdit = () => {
  const [isEditing, setIsEditing] = useState(null);
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
      setLoadIndicator(true);
      try {
        const formData = new FormData();
        for (const key in values) {
          formData.append(key, values[key]);
        }
        const response = await api.post("update/footer", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setApiData(response.data.data);
        setIsEditing(null);
        toast.success(response.data.message);
      } catch (error) {
        console.error("Error saving data:", error);
      } finally {
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

  const handleFileChange = (event) => {
    formik.setFieldValue("logo_path", event.currentTarget.files[0]);
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
      const response = await api.post(`publish/footer`);
      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (e) {
      toast.error("Error Publishing Data", e?.response?.data?.message);
    }
  }

  return (
    <div>
      <div className="card-header d-flex align-items-center px-0 py-3 mb-2 bg-light">
        <h3 className="fw-bold">Footer</h3>
        <div className="container-fluid d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-danger mx-2"
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
        className="container-fluid text-light"
        style={{ backgroundColor: "#31135E" }}
      >
        <div className="row px-3 pt-5">
          <div className="col-md-3 col-12 text-start mb-0">
            <div className="d-flex align-items-center">
              {isEditing === "logo_path" ? (
                <div className="d-flex">
                  <input
                    type="file"
                    name="logo_path"
                    onChange={handleFileChange}
                    className="form-control mb-3"
                  />
                  <button
                    onClick={() => handleSaveClick("logo_path")}
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
                <>
                  <img
                    src={`${ImageURL}${apiData.logo_path}`}
                    alt="Logo"
                    className="img-fluid mb-3"
                    style={{ height: "15%", width: "15%" }}
                  />
                  <button
                    onClick={() => handleEditClick("logo_path")}
                    className="btn link-secondary ms-1 mb-1"
                    style={{ width: "fit-content", padding: 0 }}
                  >
                    <FaEdit />
                  </button>
                </>
              )}
              {isEditing === "footer_title" ? (
                <div className="d-flex">
                  <input
                    type="text"
                    name="footer_title"
                    {...formik.getFieldProps("footer_title")}
                    onChange={formik.handleChange}
                    className="form-control mb-3"
                  />
                  <button
                    onClick={() => handleSaveClick("footer_title")}
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
                <h4 className="mx-2 mb-3 fw-bold">{apiData.footer_title}
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
                    className="btn link-secondary ms-1 mb-1"
                    style={{ width: "fit-content", padding: 0 }}
                  >
                    <FaEdit />
                  </button>
                </p>
              </div>
            )}
          </div>
          <div className="col-md-3 col-12 mb-0 text-start">
            <h5 className="mb-4 text-start">Contact Us</h5>
            <div className="row">
              <div className="col-auto pe-0">
                <IoLocationOutline size={20} />
              </div>
              <div className="col ps-0">
                <p className="fw-light text-start mb-3">
                  Wisconsin Ave, Suite 700 Chevy Chase, Maryland 20815
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-auto pe-0">
                <TbMail size={20} />
              </div>
              <div className="col ps-0">
                <p className="fw-light text-start mailto:">support@figma.com</p>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-6 mb-md-0 text-start">
            <h5 className="mb-4">For Businesses</h5>
            <ul className="list-unstyled">
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
            <h5 className="mb-4">For Students</h5>
            <ul className="list-unstyled">
              <Nav.Link href="#remote-jobs" className="mb-2">
                Remote Jobs
              </Nav.Link>
              <Nav.Link href="#freelancer" className="mb-2">
                Freelancer
              </Nav.Link>
              <Nav.Link href="#part-time" className="mb-2">
                Part-Time Jobs
              </Nav.Link>
            </ul>
          </div>
          <div className="col-md-2 col-12 text-start">
            <h5 className="mb-4 text-md-end">Socials</h5>
            <div className="d-flex justify-content-md-end justify-content-start">
              <Nav.Link href={apiData.fb_link} className="p-1">
                <FaFacebook />
              </Nav.Link>
              <Nav.Link href={apiData.insta_link} className="p-1">
                <GrInstagram />
              </Nav.Link>
              <Nav.Link href={apiData.youtube_link} className="p-1">
                <FaYoutube />
              </Nav.Link>
              <Nav.Link href={apiData.twitter_link} className="p-1">
                <FaTwitter />
              </Nav.Link>
              <Nav.Link href={apiData.linkedin_link} className="p-1">
                <FaLinkedin />
              </Nav.Link>
              <Nav.Link href={apiData.whatsapp_link} className="p-1">
                <IoLogoWhatsapp />
              </Nav.Link>
            </div>
          </div>
        </div>
        <div className="row px-3 pt-3 pb-5">
          <div className="col-md-8 col-12 text-start">
            {isEditing === "copyrights" ? (
              <div className="d-flex">
                <input
                  type="text"
                  name="copyrights"
                  {...formik.getFieldProps("copyrights")}
                  onChange={formik.handleChange}
                  className="form-control mb-3"
                />
                <button
                  onClick={() => handleSaveClick("copyrights")}
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
              <p>
                &copy; {new Date().getFullYear()} {apiData.copyrights}
                <button
                  onClick={() => handleEditClick("copyrights")}
                  className="btn link-secondary ms-1 mb-1"
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
  );
};
