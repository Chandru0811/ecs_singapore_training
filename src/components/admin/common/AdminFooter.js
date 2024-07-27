import React from "react";
import logo from "../../../assets/admin/CRMLogo.png";
import { IoLocationOutline } from "react-icons/io5";
import { TbMail } from "react-icons/tb";

const AdminFooter = () => {
  return (
    <footer
      className="container-fluid px-0 text-light"
      style={{ backgroundColor: "#31135E" }}
    >
      <div className="container-fluid row px-3 pt-5">
        <div className="col-md-3 col-12 mb-4 mb-md-0 ">
          <img src={logo} alt="ECS Training" className="img-fluid h-25 mb-3" />
          <p className="fw-light text-start">
            Hi! My name is Dmitrii Rogozza and I’m an expert in web design and
            branding. I can help you make your website more attractive.
          </p>
        </div>
        <div className="col-md-3 col-12 mb-4 mb-md-0 text-start">
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
        <div className="col-md-2 col-6 mb-4 mb-md-0 text-start">
          <h5 className="mb-4 ">For Businesses</h5>
          <ul className="list-unstyled">
            <li>
              <a href="#job-post">Job Post</a>
            </li>
            <li>
              <a href="#courses">Courses</a>
            </li>
            <li>
              <a href="#careers">Careers</a>
            </li>
          </ul>
        </div>
        <div className="col-md-2 col-6 mb-4 mb-md-0 text-start">
          <h5 className="mb-4 ">Company</h5>
          <ul className="list-unstyled">
            <li>
              <a href="#about-us">About Us</a>
            </li>
            <li>
              <a href="#blogs">Blogs</a>
            </li>
            <li>
              <a href="#contact-us">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="col-md-2 col-12">
          <h5 className="mb-4 ">Let's do it!</h5>
          <ul className="footer-social list-inline">
            <li className="list-inline-item">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li className="list-inline-item">
                <i className="fas fa-globe"></i>
            </li>
          </ul>
          <button className="footer-button mt-3">Enroll Now</button>
        </div>
      </div>
      <hr className="mt-0 mb-3" />
      <div className="container-fluid row pb-3">
        <div className="col-md-6 col-12">
          <div>
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
    </footer>
  );
};

export default AdminFooter;
