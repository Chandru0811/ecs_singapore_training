import React, { useEffect, useState } from "react";
import logo from "../../../assets/client/CRMLogo.png";
import { IoLocationOutline , IoLogoWhatsapp} from "react-icons/io5";
import { TbMail } from "react-icons/tb";
import { Nav } from "react-bootstrap";
import { LuFacebook } from "react-icons/lu";
import { GrInstagram } from "react-icons/gr";
import { LiaTelegram } from "react-icons/lia";
import { FiFigma } from "react-icons/fi";
import { FiGitlab } from "react-icons/fi";
import { FiGithub } from "react-icons/fi";
import EnrollModel from "../../../Pages/admin/EnrollModel";
import api from '../../../config/BaseUrl';
import { useFormik } from "formik";
import ImageURL from "../../../config/ImageURL";
import { FaSearch, FaEdit, FaSave, FaTimes, FaYoutube, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const [apiData, setApiData] = useState({});

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
    },
  });

  const getData = async () => {
    try {
      const response = await api.get("/footer");
      setApiData(response.data.data);
      formik.setValues(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      className="container-fluid text-light "
      style={{ backgroundColor: "#31135E" }}
    >
      <div className=" row px-3 pt-5">
        <div className="col-md-3 col-12  mb-0 text-start">
          <div className="">
          <img src={`${ImageURL}${apiData?.logo_path}`} alt="Logo" className="img-fluid mb-3" style={{ height: '15%', width: "15%" }} />
          <span className="mx-1">{apiData?.footer_title}</span>
          </div>
          <p className="fw-light text-start">
          {apiData?.footer_content}
          </p>
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
          <Nav.Link href="#courses" className="mb-2">Courses</Nav.Link>
          </ul>
        </div>
        <div className="col-md-2 col-6 mb-md-0 text-start">
          <h5 className="mb-4 ">Company</h5>
          <ul className="list-unstyled">
            <div className="d-flex flex-column">
          <Nav.Link href="#about" className="mb-2">About</Nav.Link>
          <Nav.Link href="#contact-us" className="mb-2">Contact Us</Nav.Link>
          </div>
          </ul>
        </div>
        <div className="col-md-2 col-12 text-start mb-3">
          <h5 className="mb-4 ">Let's do it!</h5>
          <ul className="footer-social list-inline ps-0">
          <div className="d-flex flex-wrap gap-2 ">
          <Nav.Link href={apiData?.fb_link}>
                      <FaFacebook />
                    </Nav.Link>
                    <Nav.Link href={apiData?.insta_link}>
                      <GrInstagram />
                    </Nav.Link>
                    <Nav.Link href={apiData?.youtube_link}>
                      <FaYoutube />
                    </Nav.Link>
                    <Nav.Link href={apiData?.twitter_link}>
                      <FaTwitter />
                    </Nav.Link>
                    <Nav.Link href={apiData?.linkedin_link}>
                      <FaLinkedin />
                    </Nav.Link>
                    <Nav.Link href={apiData?.whatsapp_link}>
                      <IoLogoWhatsapp />
                    </Nav.Link>
          </div>
          </ul>
          <EnrollModel />
        </div>
      </div>
      <hr className="mt-0 mb-3" />
      <div className="container-fluid">
      <div className=" row pb-3">
        <div className="col-md-6 col-12 text-start">
          <div className="" >
          <Link to={"/privacypolicy"} style={{textDecoration:"none",color:"#a0a0a0" }}><span className="me-3">Privacy Policy</span></Link>
            <Link to={"/termsandcondition"} style={{textDecoration:"none",color:"#a0a0a0" }}><span>Terms of Use</span></Link>
          </div>
        </div>
        <div className="col-md-6 col-12 text-md-end text-start">
          <p className="mb-0" style={{ color: "#a0a0a0" }}>
          {apiData?.copyrights}
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Footer;
