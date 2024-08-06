import React, { useEffect, useRef, useState } from "react";
import courseImg from "../../assets/client/course_img.jpg";
import { IoIosStar } from "react-icons/io";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Google from "../../assets/client/google.png";
import Delloite from "../../assets/client/deloitte.png";
import WellsFargo from "../../assets/client/wellsfargo.png";
import Tcs from "../../assets/client/tcs.png";
import Zoho from "../../assets/client/zoho.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { ImUserPlus } from "react-icons/im";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import api from "../../config/BaseUrl";
import ImageURL from "../../config/ImageURL";
import CourseVideoTestimonial from "./CourseVideoTestimonial";
import CourseTestimonial from "./CourseTestimonial";


const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 4,
  },
  smallDesktop: {
    breakpoint: { max: 1200, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const cardData = [
  {
    id: 1,
    name: "Alice",
    rating: "5.0",
    textContent: "Training Courses",
    subContent: "Beginner",
    learners: "4234",
    trainingMode: "Online | One To One",
    percentage: "20",
    price: "240",
    CardImg: Google,
    iframe: `https://www.youtube.com/embed/dQw4w9WgXcQ`,
  },
  {
    id: 2,
    name: "Bob",
    rating: "4.0",
    textContent: "Training Courses",
    subContent: "Beginner",
    learners: "4234",
    trainingMode: "Online | One To Many",
    percentage: "20",
    price: "240",
    CardImg: Tcs,
    iframe: `https://www.youtube.com/embed/dQw4w9WgXcQ`,
  },
  {
    id: 3,
    name: "Charlie",
    rating: "5.0",
    textContent: "Training Courses",
    subContent: "Beginner",
    learners: "4234",
    trainingMode: "Offline | Many",
    percentage: "20",
    price: "240",
    CardImg: WellsFargo,
    iframe: `https://www.youtube.com/embed/dQw4w9WgXcQ`,
  },
  {
    id: 4,
    name: "Diana",
    rating: "5.0",
    textContent: "Training Courses",
    subContent: "Beginner",
    learners: "4234",
    trainingMode: "Online | One To One",
    percentage: "20",
    price: "240",
    CardImg: Zoho,
    iframe: `https://www.youtube.com/embed/dQw4w9WgXcQ`,
  },
  {
    id: 5,
    name: "Edward",
    rating: "4.0",
    textContent: "Training Courses",
    subContent: "Beginner",
    learners: "4234",
    trainingMode: "Online | Many",
    percentage: "20",
    price: "240",
    CardImg: Tcs,
    iframe: `https://www.youtube.com/embed/dQw4w9WgXcQ`,
  },
  {
    id: 6,
    name: "Fiona",
    rating: "5.0",
    textContent: "Training Courses",
    subContent: "Beginner",
    learners: "4234",
    trainingMode: "Offline | One To One",
    percentage: "20",
    price: "240",
    CardImg: Delloite,
    iframe: `https://www.youtube.com/embed/dQw4w9WgXcQ`,
  },
  {
    id: 7,
    name: "Grace",
    rating: "4.0",
    textContent: "Training Courses ",
    subContent: "Beginner",
    learners: "4234",
    trainingMode: "Online | One To One",
    percentage: "20",
    price: "240",
    CardImg: WellsFargo,
    iframe: `https://www.youtube.com/embed/dQw4w9WgXcQ`,
  },
  {
    id: 8,
    name: "Henry",
    rating: "5.0",
    textContent: "Training Courses",
    subContent: "Beginner",
    learners: "4234",
    trainingMode: "Online | One To One",
    percentage: "20",
    price: "240",
    CardImg: Tcs,
    iframe: `https://www.youtube.com/embed/dQw4w9WgXcQ`,
  },
];

function UserCourse() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [apiData, setApiData] = useState({});

  const features = [
    "130 + Hours in-depth Online courses",
    "5k + Online Batches Completed",
    "10k + Placed Students",
    "130 + Hours in-depth Online courses",
    "20000 + Learners around the world",
    "100% Certification Pass Guarantee",
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="container-fluid p-5">
            <div className="row">
              {cardData.map((card, index) => (
                <div className="col-lg-3 col-md-6 col-12 p-2">
                  <div
                    className="h-75 rounded"
                    style={{
                      border: "2px solid #118AEF",
                      cursor: "pointer",
                      minHeight: "280px",
                      transition: "border 0.5s, min-height 0.5s",
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <Link
                      to={"/courseview"}
                      style={{ textDecoration: "none" }}
                      className="text-dark"
                    >
                      <div key={card.id}>
                        <div className="card-content container-fluid px-0">
                          <div
                            className="bg-primary px-2"
                            style={{ minHeight: "24vh" }}
                          >
                            <div className="heading-content py-2 d-flex justify-content-between">
                              <h5 className="name text-light">{card.name}</h5>
                              <div className="rating text-light">
                                <span>
                                  {[...Array(4)].map((_, starIndex) => (
                                    <IoIosStar
                                      key={starIndex}
                                      style={{ color: "gold" }}
                                    />
                                  ))}
                                </span>
                                Rating &nbsp;{card.rating}
                              </div>
                            </div>
                            <div className="image-content  p-2 d-flex justify-content-center align-items-center">
                              <img
                                src={card.CardImg}
                                alt="companyLogo"
                                className="img-fluid w-50"
                              />
                            </div>
                          </div>
                          {hoveredIndex === index ? (
                            <div
                              className="text-content p-2 fit-content bg-light rounded"
                              style={{
                                position: "relative",
                                top: "-80px",
                                height: "110px",
                              }}
                            >
                              <p className="card-title text-start py-2">
                                {card.textContent}
                              </p>
                              <div className="text-start">
                                <p className="fw-light">
                                  Training Mode : ${card.trainingMode}
                                </p>
                                <p>
                                  ${card.learners}&nbsp;&nbsp;&nbsp;
                                  <del className="fw-light">${card.price}</del>
                                  &nbsp;&nbsp;&nbsp;
                                  <span className="rounded bg-primary p-1 text-light">
                                    ${card.percentage} % off
                                  </span>
                                </p>
                              </div>
                              <div className="d-flex justify-content-between align-items-center ">
                                <button className="btn btn-sm btn-primary mx-2">
                                  Enroll Now <ImUserPlus />
                                </button>
                                <button className="btn btn-sm btn-outline-primary">
                                  Read More <FaArrowRightLong />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="text-content p-2 fit-content">
                              <p className="card-title text-start py-1">
                                {card.textContent}
                              </p>
                              <div className="d-flex justify-content-between align-items-center py-1 fit-content">
                                <div className="sub-contents p-1">
                                  ${card.subContent}
                                </div>
                                <div className="learners-count p-1">
                                  learners ${card.learners}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "profile":
        return (
          <div className="container-fluid p-5">
            <div className="row">
              {cardData.map((card, index) => (
                <div className="col-lg-3 col-md-6 col-12 p-2">
                  <div
                    className="h-75 rounded"
                    style={{
                      border: "2px solid #118AEF",
                      cursor: "pointer",
                      minHeight: "280px",
                      transition: "border 0.5s, min-height 0.5s",
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <Link
                      to={"/courseview"}
                      style={{ textDecoration: "none" }}
                      className="text-dark"
                    >
                      <div key={card.id}>
                        <div className="card-content container-fluid px-0">
                          <div
                            className="bg-primary px-2"
                            style={{ minHeight: "24vh" }}
                          >
                            <div className="heading-content py-2 d-flex justify-content-between">
                              <h5 className="name text-light">{card.name}</h5>
                              <div className="rating text-light">
                                <span>
                                  {[...Array(4)].map((_, starIndex) => (
                                    <IoIosStar
                                      key={starIndex}
                                      style={{ color: "gold" }}
                                    />
                                  ))}
                                </span>
                                Rating &nbsp;{card.rating}
                              </div>
                            </div>
                            <div className="image-content  p-2 d-flex justify-content-center align-items-center">
                              <img
                                src={card.CardImg}
                                alt="companyLogo"
                                className="img-fluid w-50"
                              />
                            </div>
                          </div>
                          {hoveredIndex === index ? (
                            <div
                              className="text-content p-2 fit-content bg-light rounded"
                              style={{
                                position: "relative",
                                top: "-80px",
                                height: "110px",
                              }}
                            >
                              <p className="card-title text-start py-2">
                                {card.textContent}
                              </p>
                              <div className="text-start">
                                <p className="fw-light">
                                  Training Mode : ${card.trainingMode}
                                </p>
                                <p>
                                  ${card.learners}&nbsp;&nbsp;&nbsp;
                                  <del className="fw-light">${card.price}</del>
                                  &nbsp;&nbsp;&nbsp;
                                  <span className="rounded bg-primary p-1 text-light">
                                    ${card.percentage} % off
                                  </span>
                                </p>
                              </div>
                              <div className="d-flex justify-content-between align-items-center ">
                                <button className="btn btn-sm btn-primary mx-2">
                                  Enroll Now <ImUserPlus />
                                </button>
                                <button className="btn btn-sm btn-outline-primary">
                                  Read More <FaArrowRightLong />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="text-content p-2 fit-content">
                              <p className="card-title text-start py-1">
                                {card.textContent}
                              </p>
                              <div className="d-flex justify-content-between align-items-center py-1 fit-content">
                                <div className="sub-contents p-1">
                                  ${card.subContent}
                                </div>
                                <div className="learners-count p-1">
                                  learners ${card.learners}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  const getData = async () => {
    try {
      const response = await api.get("course/content");
      setApiData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    console.log("sadd");
    getData();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-7 col-12 text-start">
            <h1 className="fw-bold py-3 display-5">
              {apiData?.heading_section}
            </h1>
            <p className="py-3">{apiData?.description}</p>
            <div className="row">
              {features.map((feature, index) => (
                <div key={index} className="col-md-6 col-12">
                  <div className="py-2">
                    <span>
                      <IoIosStar style={{ color: "gold" }} />
                    </span>
                    <span>{feature}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-5 col-12 p-2">
            <img   src={`${ImageURL}${apiData?.image_path}`}
  alt="courseImg" className="img-fluid " />
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <Carousel responsive={responsive} infinite={true} autoPlay={false}>
          {cardData.map((card, index) => (
            <div
              className="mx-4 my-5 h-75 rounded"
              style={{
                border: "2px solid #118AEF",
                cursor: "pointer",
                minHeight: "280px",
                transition: "border 0.5s, min-height 0.5s",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link
                to={"/courseview"}
                style={{ textDecoration: "none" }}
                className="text-dark"
              >
                <div key={card.id}>
                  <div className="card-content container-fluid px-0">
                    <div
                      className="bg-primary px-2"
                      style={{ minHeight: "24vh" }}
                    >
                      <div className="heading-content py-2 d-flex justify-content-between">
                        <h5 className="name text-light">{card.name}</h5>
                        <div className="rating text-light">
                          <span>
                            {[...Array(4)].map((_, starIndex) => (
                              <IoIosStar
                                key={starIndex}
                                style={{ color: "gold" }}
                              />
                            ))}
                          </span>
                          Rating &nbsp;{card.rating}
                        </div>
                      </div>
                      <div className="image-content  p-2 d-flex justify-content-center align-items-center">
                        <img
                          src={card.CardImg}
                          alt="companyLogo"
                          className="img-fluid w-50"
                        />
                      </div>
                    </div>
                    {hoveredIndex === index ? (
                      <div
                        className="text-content p-2 fit-content bg-light rounded"
                        style={{
                          position: "relative",
                          top: "-80px",
                          height: "110px",
                        }}
                      >
                        <p className="card-title text-start py-2">
                          {card.textContent}
                        </p>
                        <div className="text-start">
                          <p className="fw-light">
                            Training Mode : ${card.trainingMode}
                          </p>
                          <p>
                            ${card.learners}&nbsp;&nbsp;&nbsp;
                            <del className="fw-light">${card.price}</del>
                            &nbsp;&nbsp;&nbsp;
                            <span className="rounded bg-primary p-1 text-light">
                              ${card.percentage} % off
                            </span>
                          </p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center ">
                          <button className="btn btn-sm btn-primary mx-2">
                            Enroll Now <ImUserPlus />
                          </button>
                          <button className="btn btn-sm btn-outline-primary">
                            Read More <FaArrowRightLong />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-content p-2 fit-content">
                        <p className="card-title text-start py-1">
                          {card.textContent}
                        </p>
                        <div className="d-flex justify-content-between align-items-center py-1">
                          <div className="sub-contents p-1">
                            ${card.subContent}
                          </div>
                          <div className="learners-count p-1">
                            learners ${card.learners}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
      {/* Tabs */}
      <div className="container-fluid bg-light py-4">
        <h3 className="py-2 text-start">
          All Certification Courses and Master Programs
        </h3>
        <div className="custom-tabs mt-5">
          <div className="row tabs-header">
            <div className="col-6 col-md-3 col-lg-2 py-2">
              <button
                className={`w-100 ${activeTab === "home" ? "active" : ""}`}
                onClick={() => setActiveTab("home")}
              >
                <span className="p-2">Master Programs</span>
              </button>
            </div>
            <div className="col-6 col-md-3 col-lg-2 py-2">
              <button
                className={`w-100 ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <span className="p-2">Cloud Computing</span>
              </button>
            </div>
            <div className="col-6 col-md-3 col-lg-2 py-2">
              <button
                className={`w-100 ${
                  activeTab === "longer-tab" ? "active" : ""
                }`}
                onClick={() => setActiveTab("longer-tab")}
              >
                <span className="p-2">Data Science & AI</span>
              </button>
            </div>
            <div className="col-6 col-md-3 col-lg-2 py-2">
              <button
                className={`w-100 ${activeTab === "new-tab" ? "active" : ""}`}
                onClick={() => setActiveTab("new-tab")}
              >
                <span className="p-2">DevOps</span>
              </button>
            </div>
            <div className="col-6 col-md-3 col-lg-2 py-2">
              <button
                className={`w-100 ${activeTab === "pg-tab" ? "active" : ""}`}
                onClick={() => setActiveTab("pg-tab")}
              >
                <span className="p-2">Programming Languages</span>
              </button>
            </div>

            <div className="row tabs-header">
              <div className="col-6 col-md-3 col-lg-2 py-2">
                <button
                  className={`w-100 ${
                    activeTab === "software-tab" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("software-tab")}
                >
                  <span className="p-2">Software Testing</span>
                </button>
              </div>
              <div className="col-6 col-md-3 col-lg-2 py-2">
                <button
                  className={`w-100 ${activeTab === "web-tab" ? "active" : ""}`}
                  onClick={() => setActiveTab("web-tab")}
                >
                  <span className="p-2">Web Designing</span>
                </button>
              </div>
            </div>
          </div>
          <div className="tabs-content">{renderContent()}</div>
        </div>
      </div>

      
     
      {/* {/ Review cards  /} */}
      <CourseTestimonial />
      
      {/* {/ Online Training Review  /} */}
      <CourseVideoTestimonial />
     
    </div>
  );
}

export default UserCourse;
