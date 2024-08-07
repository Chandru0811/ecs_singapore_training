import React from "react";
import AboutHero from "../../../assets/client/about_hero_image.png";
import AboutImage from "../../../assets/client/about-imgae 1.jpg";
import { LuDiamond } from "react-icons/lu";
import { Tabs, Tab } from "react-bootstrap";
import selfLevel from "../../../assets/client/self level.png";
import Assignment from "../../../assets/client/assignment.png";
import Support from "../../../assets/client/suppoet 24-7.png";
import { BsBoxSeam } from "react-icons/bs";
import EnrollModel from "../../admin/EnrollModel";
import { Link } from "react-router-dom";

function Section1() {
  return (
    <section>
      {/* About Banner */}
      <div className="container-fluid mb-4">
        <div className="row about-banner">
          <div className="content-wrapper">
            <div className="container">
              <div className="row">
                <div className="col-md-7 col-12">
                  <div className="about-head">
                    <h1
                      className="display-5 fw-bold"
                      style={{ paddingLeft: "10px" }}
                    >
                      What is Courses and how valid is it?
                    </h1>
                    <p>
                      The meaning of production in Carlio is the creation,
                      development, and the path to progress, and the starting
                      point to achieve the goals that we all have the Petroforce
                      bran with over 20 years of experience in the oil and
                      petrochemical industry.
                    </p>
                  </div>
                  <div className="d-flex mb-4">
                    {/* <button className="btn enroll-btn">Enroll Now</button> */}
                    <EnrollModel from={"About"} />
                    <Link to={"/contact"}>
                      <button className="btn contact-btn ms-3">
                        Contact Us
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="col-md-5 col-12">
                  <div>
                    <img
                      src={AboutHero}
                      alt="About Hero"
                      className="img-fluid"
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Our Company Overview */}
      <div className="container mb-4">
        <div className="row">
          <div className="col-md-6 col-12 mb-3 d-flex align-items-center justify-content-center">
            <div className="">
              <img src={AboutImage} alt="img" className="img-fluid"></img>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="d-flex text-start">
              <div className="d-flex align-items-center justify-content-center">
                <div
                  className="p-1 mx-2 mb-3"
                  style={{ backgroundColor: "#ec9fc2", borderRadius: "5px" }}
                >
                  <LuDiamond color="#AA205E" size={30} />
                </div>
                <p className="fw-medium">About Us</p>
              </div>
            </div>
            <div className="text-start">
              <h3 className="fw-bold">Our Company Overview</h3>
              <p>
                Carlio brand is one of the most reliable motor oil
                manufacturers, which is engaged in the production of high
                quality products with a history of more than decades in the
                industry. In order to get more information about other aspects
                and products of the Carlio brand, you can use the following
                buttons:
              </p>
              <div>
                <Tabs
                  defaultActiveKey="company"
                  id="fill-tab-example"
                  className="mb-3 tab"
                >
                  <Tab eventKey="company" title="Company">
                    <div className="row mt-5">
                      <p>
                        The meaning of production in Carlio is the creation,
                        development, and the path to progress, and the starting
                        point to achieve the goals that we all have the
                        Petroforce brand, with over 20 years of experience in
                        the oil and petrochemical industry, we officially
                        started our activities in the field of design,
                        engineering, construction of refinery equipment, and the
                        production of various motor and industrial lubricants in
                        the year 1390 (2011)
                      </p>
                    </div>
                  </Tab>
                  <Tab eventKey="allCourses" title="All Courses">
                    <div className="row mt-5">
                      <p>
                        The meaning of production in Carlio is the creation,
                        development, and the path to progress, and the starting
                        point to achieve the goals that we all have the
                        Petroforce brand, with over 20 years of experience in
                        the oil and petrochemical industry, we officially
                        started our activities in the field of design,
                        engineering, construction of refinery equipment, and the
                        production of various motor and industrial lubricants in
                        the year 1390 (2011)
                      </p>
                    </div>
                  </Tab>
                  <Tab eventKey="ourTeam" title="Our Team">
                    <div className="row mt-5">
                      <p>
                        The meaning of production in Carlio is the creation,
                        development, and the path to progress, and the starting
                        point to achieve the goals that we all have the
                        Petroforce brand, with over 20 years of experience in
                        the oil and petrochemical industry, we officially
                        started our activities in the field of design,
                        engineering, construction of refinery equipment, and the
                        production of various motor and industrial lubricants in
                        the year 1390 (2011)
                      </p>
                    </div>
                  </Tab>
                </Tabs>
                <a href="https://ecscloudinfotech.com/ecs/" target="_blank">
                  <button className="learn-btn">Learn More</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Courses Features */}
      <div className="container-fluid mb-4">
        <div className="row about-banner1">
          <div className="content-wrapper1">
            <div className="container">
              <div className="row mb-4">
                <div className="col-md-6 col-12 mb-3 d-flex flex-column align-items-start justify-content-center">
                  <div className="about-head1">
                    <div className="d-flex align-items-start justify-content-start">
                      <div
                        className="p-1 mx-2 mb-3"
                        style={{
                          backgroundColor: "#ec9fc2",
                          borderRadius: "5px",
                        }}
                      >
                        <BsBoxSeam color="#AA205E" size={30} />
                      </div>
                      <p className="fw-medium">Courses Features</p>
                    </div>
                    <h1 className="display-5 fw-bold">
                      The feature of Courses that you will benefit from
                    </h1>
                  </div>
                  <Link to="/course">
                    <button className="btn contact-btn">All Courses</button>
                  </Link>
                </div>
                <div className="col-md-6 col-12 d-flex align-items-center justify-content-center">
                  <div className="row">
                    <div className="col-md-4 col-6 mb-2">
                      <div className="card about-card h-100 d-flex flex-column align-items-center justify-content-center">
                        <img
                          src={selfLevel}
                          alt="About Hero"
                          className="img-fluid mb-4"
                        ></img>
                        <p className="about-textWhite text-center mb-4">
                          Self-level Beginner
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4 col-6 mb-2">
                      <div className="card about-card h-100 d-flex flex-column align-items-center justify-content-center">
                        <img
                          src={Assignment}
                          alt="About Hero"
                          className="img-fluid mb-4"
                        ></img>
                        <p className="about-textWhite text-center mb-4">
                          Assignment Provide
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4 col-6 mb-2">
                      <div className="card about-card h-100 d-flex flex-column align-items-center justify-content-center">
                        <img
                          src={Support}
                          alt="About Hero"
                          className="img-fluid mb-4"
                        ></img>
                        <p className="about-textWhite text-center mb-4">
                          Support 24/7
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section1;
