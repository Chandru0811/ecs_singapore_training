import React, { useEffect, useState } from "react";
import { IoIosStar } from "react-icons/io";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { ImUserPlus } from "react-icons/im";
import { Link, useSearchParams } from "react-router-dom";
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

function UserCourse() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [carouselHovered, setCarouselHovered] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [apiData, setApiData] = useState({});
  const [searchParams] = useSearchParams();
  const categoryID = searchParams.get("categoryID");
  const [courseData, setCourseData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loader, setLoader] = useState(true);

  const renderContent = () => {
    const activeCategory = categoryData.find(
      (category) => category.id === activeTab
    );
    if (activeCategory && activeCategory.courses.length > 0) {
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
            <div className="container-fluid p-5">
              <div className="row">
                {activeCategory.courses.map((card, index) => (
                  <div className="col-lg-3 col-md-6 col-12 p-2" key={card.id}>
                    <div
                      className="rounded h-100"
                      style={{
                        border: "2px solid #118AEF",
                        cursor: "pointer",
                        minHeight: "280px",
                        transition:
                          "transform 0.5s ease, border 0.5s, min-height 0.5s",
                        transform:
                          hoveredIndex === index
                            ? "translateY(-10px)"
                            : "translateY(0)",
                      }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <Link
                        to={`/courseview/${card.id}`}
                        style={{ textDecoration: "none" }}
                        className="text-dark"
                      >
                        <div>
                          <div className="card-content container-fluid px-0">
                            <div
                              className="bg-primary px-2"
                              style={{ minHeight: "10rem" }}
                            >
                              <div className="heading-content py-2 d-flex justify-content-between">
                                <h5 className="text-light fw-bold">
                                  CloudeECS
                                </h5>
                              </div>
                              <div className="image-content d-flex justify-content-center align-items-center">
                                <img
                                  src={`${ImageURL}${card.logo_path}`}
                                  alt="companyLogo"
                                  className="img-fluid w-25"
                                />
                              </div>
                            </div>
                            {hoveredIndex === index ? (
                              <div
                                className="text-content px-2 pt-2 fit-content bg-light rounded"
                                style={{
                                  position: "relative",
                                  top: "-80px",
                                  height: "110px",
                                }}
                              >
                                <p className="card-title text-start  mb-0 text-truncate fw-bold">
                                  {card.title}
                                </p>
                                <p className="card-title text-start py-2 text-truncate">
                                  {card.description}
                                </p>
                                <div className="text-start">
                                  <p className="fw-medium">
                                    Training Mode :{" "}
                                    <span className="fw-light">Online</span>
                                  </p>
                                  <p>
                                    ${parseFloat(card.offer_price).toFixed(2)}
                                    &nbsp;&nbsp;&nbsp;
                                    <del className="fw-light">
                                      ${parseFloat(card.price).toFixed(2)}
                                    </del>
                                    &nbsp;&nbsp;&nbsp;
                                    <span className="rounded bg-primary p-1 text-light">
                                      {calculateDiscountPercentage(
                                        card.price,
                                        card.offer_price
                                      ).toFixed(0)}
                                      % off
                                    </span>
                                  </p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
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
                                <p className="card-title text-start py-1 text-truncate fw-bold">
                                  {card.title}
                                </p>
                                <div className="d-flex justify-content-between align-items-center py-1 fit-content">
                                  <div className="sub-contents">Beginner</div>
                                  <div className="learners-count p-1">
                                    Learners (5000)
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
          )}
        </>
      );
    } else {
      return (
        <div className="container-fluid p-5">
          <div className="row">
            <div className="col-12 text-center">
              <h3>Courses unavailable</h3>
              <p>
                We are working to add new courses in this category. Please check
                back later.
              </p>
            </div>
          </div>
        </div>
      );
    }
  };

  const getData = async () => {
    setLoader(true);
    try {
      const response = await api.get("course/content");
      setApiData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await api.get(`home/category/${categoryID}`);
        setCourseData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCategoryData();
  }, [categoryID]);

  const calculateDiscountPercentage = (price, offerPrice) => {
    if (price <= 0) return 0;
    return ((price - offerPrice) / price) * 100;
  };

  const categoryBasedCourseData = async () => {
    try {
      const response = await api.get("home/courses");
      const categories = response.data.data;
      setCategoryData(categories);
      if (categories.length > 0) {
        setActiveTab(categories[0].id); // Set the first category as active
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    categoryBasedCourseData();
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
          <div className="container">
            <div className="row">
              <div className="col-md-7 col-12 text-start">
                <h1 className="fw-bold py-3 display-5">
                  {apiData?.heading_section}
                </h1>
                <p className="py-3">{apiData?.description}</p>
                <div className="row">
                  {apiData?.features?.map((feature, index) => (
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
                <img
                  src={`${ImageURL}${apiData?.image_path}`}
                  alt="courseImg"
                  className="img-fluid "
                />
              </div>
            </div>
          </div>
          {/* Courses by Category ID */}
          <div className="container-fluid">
            {courseData?.courses && courseData.courses.length > 0 ? (
              <>
                <h3 className="text-start fw-bold ms-2 mb-0">
                  {courseData.title}
                </h3>
                <Carousel
                  responsive={responsive}
                  infinite={true}
                  autoPlay={false}
                >
                  {courseData?.courses?.map((card, index) => (
                    <div
                      className="mx-4 my-5 rounded h-75"
                      style={{
                        border: "2px solid #118AEF",
                        cursor: "pointer",
                        minHeight: "280px",
                        transition:
                          "transform 0.6s ease, border 0.5s, min-height 0.5s",
                        transform:
                        carouselHovered === index
                            ? "translateY(-10px)"
                            : "translateY(0)",
                      }}
                      onMouseEnter={() => setCarouselHovered(index)}
                      onMouseLeave={() => setCarouselHovered(null)}
                    >
                      <Link
                        to={`/courseview/${card.id}`}
                        style={{ textDecoration: "none" }}
                        className="text-dark"
                      >
                        <div
                          key={card.id}
                          className="card-content container-fluid px-0"
                        >
                          <div
                            className="bg-primary px-2"
                            style={{ minHeight: "10rem" }}
                          >
                            <div className="heading-content py-2 d-flex justify-content-between">
                              <h5 className="text-start ms-2 text-light fw-bold">
                                CloudECS
                              </h5>
                              {/* <div className="rating text-light">
                              <span>
                                {[...Array(4)].map((_, starIndex) => (
                                  <IoIosStar
                                    key={starIndex}
                                    style={{ color: "gold" }}
                                  />
                                ))}
                              </span>
                              Rating &nbsp;{card.rating}
                            </div> */}
                            </div>
                            <div className="image-content d-flex justify-content-center align-items-center">
                              <img
                                src={`${ImageURL}${card.logo_path}`}
                                alt="companyLogo"
                                className="img-fluid w-25"
                              />
                            </div>
                          </div>
                          {carouselHovered === index ? (
                            <div
                              className="text-content px-2 pt-2 fit-content bg-light rounded"
                              style={{
                                position: "relative",
                                top: "-80px",
                                height: "100px",
                                // transition: "top 0.5s ease, height 0.5s ease"
                              }}
                            >
                              <p className="card-title text-start mb-0 text-truncate fw-bold">
                                {card.title}
                              </p>
                              <p className="card-title text-start py-2 text-truncate">
                                {card.description}
                              </p>
                              <div className="text-start">
                                <p className="fw-medium">
                                  Training Mode :{" "}
                                  <span className="fw-light">Online</span>
                                </p>
                                <p>
                                  ${parseFloat(card.offer_price).toFixed(2)}
                                  &nbsp;&nbsp;&nbsp;
                                  <del className="fw-light">
                                    ${parseFloat(card.price).toFixed(2)}
                                  </del>
                                  &nbsp;&nbsp;&nbsp;
                                  <span className="rounded bg-primary p-1 text-light">
                                    {calculateDiscountPercentage(
                                      card.price,
                                      card.offer_price
                                    ).toFixed(0)}
                                    % off
                                  </span>
                                </p>
                              </div>
                              <div className="d-flex justify-content-between align-items-center">
                                <button className="btn btn-sm btn-primary mx-2">
                                  Enroll Now <ImUserPlus />
                                </button>
                                <button className="btn btn-sm btn-outline-primary">
                                  Read More <FaArrowRightLong />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div  className="text-content p-2 fit-content">
                              <p className="card-title text-start py-1 text-truncate fw-bold">
                                {card.title}
                              </p>
                              <div className="d-flex justify-content-between align-items-center py-1">
                                <div className="sub-contents">Beginner</div>
                                <div className="learners-count p-1">
                                  Learners (5000)
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </Link>
                    </div>
                  ))}
                </Carousel>
              </>
            ) : null}
          </div>
          {/* Tabs */}
          <div className="container-fluid bg-light py-4">
            <h3 className="py-2 text-start">
              All Certification Courses and Master Programs
            </h3>
            <div className="custom-tabs mt-5">
              <div className="row tabs-header">
                {categoryData.map((category) => (
                  <div
                    key={category.id}
                    className="col-6 col-md-3 col-lg-2 py-2"
                  >
                    <button
                      className={`w-100 ${
                        activeTab === category.id ? "active" : ""
                      }`}
                      onClick={() => setActiveTab(category.id)}
                    >
                      <span className="p-2">{category.title}</span>
                    </button>
                  </div>
                ))}
              </div>
              <div className="tabs-content">{renderContent()}</div>
            </div>
          </div>

          {/* {/ Review cards  /} */}
          <CourseTestimonial />

          {/* {/ Online Training Review  /} */}
          <CourseVideoTestimonial />
        </section>
      )}
    </>
  );
}

export default UserCourse;
