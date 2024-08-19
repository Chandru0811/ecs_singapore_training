import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../config/BaseUrl";
import ImageURL from "../../config/ImageURL";
import Testimonial from "./Testimonial";
import EnrollModel from "./EnrollModel";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 3,
  },
  smallDesktop: {
    breakpoint: { max: 1200, min: 1024 },
    items: 3,
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

function LandingPage() {
  const [loader, setLoader] = useState(true);
  const [apiData, setApiData] = useState([]);
  const validationSchema = Yup.object({
    fullName: Yup.string().required("*Full Name is required"),
    email: Yup.string()
      .email("*Invalid email address")
      .required("*Email is required"),
    mobileNumber: Yup.string().required("*Number is required"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      mobileNumber: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Enroll Data:", values);
      // Optionally reset form after submission
      resetForm();
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const response = await api.get("user/landingsection1");
        if (response.status === 200) {
          setApiData(response.data.data);
          console.log("User Data", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoader(false);
      }
    };
    fetchData();
  }, []);

  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setLoader(true);

      try {
        const cardResponse = await api.get("user/landingsection2");
        console.log(cardResponse.data);
        setData(
          Array.isArray(cardResponse.data.data) ? cardResponse.data.data : []
        );
      } catch (error) {
        console.error(`Error Fetching Data: ${error.message}`);
      } finally {
        setLoader(false);
      }
    };

    getData();
  }, []);

  return (
    <>
      {loader ? (
        <section className="dots-container">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </section>
      ) : (
        <div>
          <form onSubmit={formik.handleSubmit}>
            {/* banner */}
            <div className="container">
              <div className="row py-5 d-flex align-items-center">
                <div className="col-md-7 col-12 py-3 text-start">
                  <h2 className="display-3 fw-bolder text-dark">
                    {apiData?.title}
                  </h2>
                  <h6 className="py-3 fw-light">{apiData?.description}</h6>
                  <div className="py-3">
                    <EnrollModel from={"Landing"} />
                  </div>
                </div>
                <div className="col-md-5 col-12">
                  <img
                    src={`${ImageURL}${apiData?.image_path}`}
                    alt="heroImg"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
            {/* banner */}
            {/* carousel section */}
            <div className="container">
              <div className="row py-4 m-0">
                <div className="col-md-2 col-12 px-1 py-5">
                  <p className="sub-content">WHAT WE GIVE</p>
                  <h5 className="text-start fw-bolder">
                    What do You Get From Us
                  </h5>
                  <h6 className="text-start fw-light">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Ducimus, voluptate minus! Laudantium quidem!
                  </h6>
                </div>
                <div className="col-md-10 col-12 px-1">
                  <Carousel
                    responsive={responsive}
                    infinite={true}
                    autoPlay={false}
                  >
                    {data?.map((card, index) => (
                      <div
                        key={index}
                        className="h-75 card mx-4 my-5 p-2 bg-primary text-light text-start shadow"
                      >
                        <div className="my-2">
                          <div className="text-start w-25 py-1">
                            <img
                              src={`${ImageURL}${card?.image_path}`}
                              alt="cardImg"
                              className="img-fluid rounded-circle"
                            />
                          </div>
                          <div>
                            <h5 className="py-1">{card.name}</h5>
                            <p>{card.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Carousel>
                </div>
              </div>
            </div>
            {/* carousel section */}
            {/* input section */}
            <div className="container">
              <div className="row">
                <div className="col-md-7 col-12 px-5 text-start">
                  <h4 className="fw-bold py-2">
                    Available Online Live Courses
                  </h4>
                  <ReactPlayer
                    url={apiData?.youtube_link}
                    controls
                    className="rounded"
                    width="100%"
                    height="400px"
                    title="YouTube Video"
                  />
                </div>
                <div className="col-md-5 col-12 p-5">
                  <div className="card text-start p-4 py-3">
                    <h3 className="input-title fw-bold">Enroll Now</h3>
                    <div className="py-3">
                      <label htmlFor="fullName">Full Name</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        className={`form-control ${formik.touched.fullName && formik.errors.fullName ? "is-invalid" : ""}`}
                        style={{ borderRadius: "3px" }}
                        placeholder="Enter a Full Name"
                        {...formik.getFieldProps("fullName")}
                      />
                      {formik.touched.fullName && formik.errors.fullName && (
                        <div className="invalid-feedback">{formik.errors.fullName}</div>
                      )}
                    </div>
                    <div className="py-3">
                      <label htmlFor="mobileNumber">Mobile Number</label>
                      <input
                        type="text"
                        id="mobileNumber"
                        name="mobileNumber"
                        className={`form-control ${formik.touched.mobileNumber && formik.errors.mobileNumber ? "is-invalid" : ""}`}
                        style={{ borderRadius: "3px" }}
                        placeholder="Enter a Mobile Number"
                        {...formik.getFieldProps("mobileNumber")}
                      />
                      {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                        <div className="invalid-feedback">{formik.errors.mobileNumber}</div>
                      )}
                    </div>
                    <div className="py-3">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
                        style={{ borderRadius: "3px" }}
                        placeholder="Enter an Email ID"
                        {...formik.getFieldProps("email")}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <div className="invalid-feedback">{formik.errors.email}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <button type="submit" className="enrollbtn">
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <Testimonial />
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default LandingPage;