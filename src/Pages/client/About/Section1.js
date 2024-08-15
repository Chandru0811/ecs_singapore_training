import React, { useEffect, useState } from "react";
import { LuDiamond } from "react-icons/lu";
import { BsBoxSeam } from "react-icons/bs";
import EnrollModel from "../../admin/EnrollModel";
import { Link } from "react-router-dom";
import api from "../../../config/BaseUrl";
import ImageURL from "../../../config/ImageURL";

function Section1() {
  const [datas, setDatas] = useState([]);
  const [dataImg, setDataImg] = useState("");
  const [loader, setLoader] = useState(true);

  const fetchDatas = async () => {
    setLoader(true);
    try {
      const response = await api.get("about");
      setDatas(response.data.data);
      setDataImg(
        `${ImageURL}${response.data.data.background_image}`.replace(/\\/g, "/")
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  return (
    <>
      {loader ? (
        <section class="dots-container">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </section>
      ) : (
        <section>
          {/* About Banner */}
          <div className="container-fluid mb-4 ">
            <div className="row about-banner">
              <div className="content-warpper">
                <div
                  className="img-fluid"
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100vh",
                    backgroundImage: `url(${dataImg})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "white",
                      textAlign: "center",
                      width: "100%",
                      zIndex: 2,
                    }}
                  >
                    <div className="container">
                      <div className="row">
                        <div className="col-md-7 col-12">
                          <div className="about-head">
                            <h1
                              className="display-5 fw-bold"
                              style={{ paddingLeft: "10px" }}
                            >
                              {datas.title}
                            </h1>
                            <p>{datas.description}</p>
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
                              // src={Image}
                              src={`${ImageURL}${datas.banner_image}`}
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
            </div>
          </div>
          {/* Our Company Overview */}
          <div className="container mb-4">
            <div className="row">
              <div className="col-md-6 col-12 mb-3 d-flex align-items-center justify-content-center">
                <div className="">
                  <img
                    src={`${ImageURL}${datas.about_image}`}
                    alt="img"
                    className="img-fluid"
                  ></img>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="d-flex text-start">
                  <div className="d-flex align-items-center justify-content-center">
                    <div
                      className="p-1 mx-2 mb-3"
                      style={{
                        backgroundColor: "#ec9fc2",
                        borderRadius: "5px",
                      }}
                    >
                      <LuDiamond color="#AA205E" size={30} />
                    </div>
                    <p className="fw-medium">About Us</p>
                  </div>
                </div>
                <div className="text-start">
                  {/* <h3 className="fw-bold">Our Company Overview</h3> */}
                  <p>{datas.aboutus_content}</p>
                  <div>
                    {/* <Tabs
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
                </Tabs> */}
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
              <div
                style={{
                  backgroundImage: `url(${ImageURL}${datas.background_image})`,
                }}
              >
                <div className="content-wrapper1">
                  <div
                    className="img-fluid"
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100vh",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                        textAlign: "center",
                        width: "100%",
                        zIndex: 2,
                      }}
                    >
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
                                <p className="fw-medium">
                                  {datas.feature_title}
                                </p>
                              </div>
                              <h1 className="display-5 fw-bold">
                                {datas.feature_description}
                              </h1>
                            </div>
                            <Link to="/course">
                              <button className="btn contact-btn">
                                All Courses
                              </button>
                            </Link>
                          </div>
                          <div className="col-md-6 col-12 d-flex align-items-center justify-content-center">
                            <div className="row">
                              <div className="col-md-4 col-6 mb-2">
                                <div className="card about-card h-100 d-flex flex-column align-items-center justify-content-center">
                                  <img
                                    src={`${ImageURL}${datas.image_1}`}
                                    alt="About Hero"
                                    className="img-fluid mb-4"
                                  ></img>
                                  <p className="about-textWhite text-center mb-4">
                                    {datas.image1_description}
                                  </p>
                                </div>
                              </div>
                              <div className="col-md-4 col-6 mb-2">
                                <div className="card about-card h-100 d-flex flex-column align-items-center justify-content-center">
                                  <img
                                    src={`${ImageURL}${datas.image_2}`}
                                    alt="About Hero"
                                    className="img-fluid mb-4"
                                  ></img>
                                  <p className="about-textWhite text-center mb-4">
                                    {datas.image2_description}
                                  </p>
                                </div>
                              </div>
                              <div className="col-md-4 col-6 mb-2">
                                <div className="card about-card h-100 d-flex flex-column align-items-center justify-content-center">
                                  <img
                                    src={`${ImageURL}${datas.image_3}`}
                                    alt="About Hero"
                                    className="img-fluid mb-4"
                                  ></img>
                                  <p className="about-textWhite text-center mb-4">
                                    {datas.image3_description}
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
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Section1;
