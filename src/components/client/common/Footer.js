import React from "react";
import logo from "../../../assets/client/CRMLogo.png";
import { IoLocationOutline } from "react-icons/io5";
import { TbMail } from "react-icons/tb";
import { Nav } from "react-bootstrap";
import { LuFacebook } from "react-icons/lu";
import { GrInstagram } from "react-icons/gr";
import { LiaTelegram } from "react-icons/lia";
import { FiFigma } from "react-icons/fi";
import { FiGitlab } from "react-icons/fi";
import { FiGithub } from "react-icons/fi";
const Footer = () => {
  return (
    <div
      className="container-fluid text-light "
      style={{ backgroundColor: "#31135E" }}
    >
      <div className=" row px-3 pt-5">
        <div className="col-md-3 col-12  mb-0 ">
          <div className="">
          <img src={logo} alt="ECS Training" className="img-fluid h-25 w-25 mb-3" />
          <span>ECS</span><span>Training</span>
          </div>
          <p className="fw-light text-start">
            Hi! My name is Dmitrii Rogozza and I’m an expert in web design and
            branding. I can help you make your website more attractive.
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
          <Nav.Link href="#job-post" className="mb-2">Job Post</Nav.Link>
          <Nav.Link href="#courses" className="mb-2">Courses</Nav.Link>
          <Nav.Link href="##careers" className="mb-2">Careers</Nav.Link>
          </ul>
        </div>
        <div className="col-md-2 col-6 mb-md-0 text-start">
          <h5 className="mb-4 ">Company</h5>
          <ul className="list-unstyled">
            <div className="d-flex flex-column">
          <Nav.Link href="#about" className="mb-2">About</Nav.Link>
          <Nav.Link href="#blogs" className="mb-2">Blogs</Nav.Link>
          <Nav.Link href="#contact-us" className="mb-2">Contact Us</Nav.Link>
          </div>
          </ul>
        </div>
        <div className="col-md-2 col-12 text-start mb-3">
          <h5 className="mb-4 ">Let's do it!</h5>
          <ul className="footer-social list-inline ps-0">
            <div className="d-flex gap-2">
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
          <button className="footer-btn border-0 rounded-pill mt-3 px-3 py-2">Enroll Now</button>
        </div>
      </div>
      <hr className="mt-0 mb-3" />
      <div className="container-fluid">
      <div className=" row pb-3">
        <div className="col-md-6 col-12">
          <div className="">
            <span className="me-3">Privacy Policy</span>
            <span>Terms of Use</span>
          </div>
        </div>
        <div className="col-md-6 col-12 text-md-end text-start">
          <p className="mb-0" style={{ color: "#a0a0a0" }}>
            &copy; 2021 All Rights Reserved
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Footer;
