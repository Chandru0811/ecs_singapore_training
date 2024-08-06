import React from "react";
import heroImg from "../../assets/client/landing_hero_img.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import courseImg from "../../assets/client/landing_card_logo.jpg";
import Testimonial from "./Testimonial";
import { useFormik } from "formik";
import * as Yup from "yup";
import EnrollModel from "../admin/EnrollModel";
import EnrollForm from "./EnrollForm";

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

const cardData = [
  {
    id: 1,
    title: "Card title 1",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, blanditiis rerum explicabo molestiae totam numquam praesentium consequatur cupiditate voluptate quas!",
    img: courseImg,
  },
  {
    id: 2,
    title: "Card title 2",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, blanditiis rerum explicabo molestiae totam numquam praesentium consequatur cupiditate voluptate quas!",
    img: courseImg,
  },
  {
    id: 3,
    title: "Card title 3",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, blanditiis rerum explicabo molestiae totam numquam praesentium consequatur cupiditate voluptate quas!",
    img: courseImg,
  },
  {
    id: 4,
    title: "Card title 4",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, blanditiis rerum explicabo molestiae totam numquam praesentium consequatur cupiditate voluptate quas!",
    img: courseImg,
  },
  {
    id: 5,
    title: "Card title 5",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, blanditiis rerum explicabo molestiae totam numquam praesentium consequatur cupiditate voluptate quas!",
    img: courseImg,
  },
  {
    id: 6,
    title: "Card title 6",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, blanditiis rerum explicabo molestiae totam numquam praesentium consequatur cupiditate voluptate quas!",
    img: courseImg,
  },
];


function LandingPage() {

  const validationSchema = Yup.object({
    fullName: Yup.string()
    .required("*Full Name is required"),
    email: Yup.string()
      .email("*Invalid email address")
      .required("*Email is required"),
      mobileNumber: Yup.string()
      
      .required("*Number is required"),
  
  });

  const formik = useFormik({
    initialValues: {
     
      fullName: "",
      email: "",
      mobileNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form data", values);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
      {/* banner */}
      <div className="container">
        <div className="row py-5  d-flex align-items-center">
          <div className="col-md-7 col-12 py-3 text-start">
            <h2 className="display-3 fw-bolder text-dark">
              Let's Find The Right Course For You
            </h2>
            <h6 className="py-3 fw-light">
              Where to grow your business as a photographer: site or social
              media?
            </h6>
            <div className="py-3">
              <EnrollModel from={"Landing"} />
            </div>
          </div>
          <div className="col-md-5 col-12">
            <img src={heroImg} alt="heroImg" className="img-fluid" />
          </div>
        </div>
      </div>
      {/* banner */}
      {/* carousel section */}
      <div className="container">
        <div className="row py-4 m-0 ">
          <div className="col-md-2 col-12 px-1 py-5">
            <p className="sub-content">WHAT WE GIVE</p>
            <h5 className="text-start fw-bolder">What do You Get From Us</h5>
            <h6 className="text-start fw-light">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus,
              voluptate minus! Laudantium quidem!
            </h6>
          </div>
          <div className="col-md-10 col-12 px-1">
            <Carousel responsive={responsive} infinite={true} autoPlay={false}>
              {cardData.map((card) => (
                <div key={card.id}>
                  <div className="mx-4 my-5 p-2 bg-primary text-light h-75 text-start shadow rounded card">
                    <div>
                      <img
                        src={card.img}
                        alt="courseImg"
                        className="img-fluid rounded-circle"
                      />
                    </div>
                    <div>
                      <h5>{card.title}</h5>
                      <p>{card.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
      {/* carousel section */}
      {/* input section  */}
      <div className="container">
        <div className="row">
          <div className="col-md-7 col-12 px-5 text-start">
            <h4 className="fw-bold py-2">Available Online Live Courses</h4>
            <iframe
              className="rounded"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              width="100%"
              height="400"
              title="YouTube Video"
            />
          </div>
          <div className="col-md-5 col-12 p-5">
          <EnrollForm />
            {/* <div className="card text-start p-4 py-3">
              <h3 className="input-title fw-bold">Enroll Now</h3>
              <div className="py-3">
                <label htmlFor="fullName">Full Name</label>
                <input
                        type="fullName"
                        className={`form-control ${
                          formik.touched.fullName && formik.errors.fullName
                            ? "is-invalid"
                            : ""
                        }`}
                        style={{ borderRadius: "3px" }}
                        placeholder="Enter fullName"
                        {...formik.getFieldProps("fullName")}
                      />
                      {formik.touched.fullName && formik.errors.fullName && (
                        <div className="invalid-feedback">
                          {formik.errors.fullName}
                        </div>
                      )}
              </div>
              <div className="py-3">
                <label htmlFor="mobileNumber">Mobile Number</label>
                <input
                        type="mobileNumber"
                        className={`form-control ${
                          formik.touched.mobileNumber && formik.errors.mobileNumber
                            ? "is-invalid"
                            : ""
                        }`}
                        style={{ borderRadius: "3px" }}
                        placeholder="Enter mobileNumber"
                        {...formik.getFieldProps("mobileNumber")}
                      />
                      {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                        <div className="invalid-feedback">
                          {formik.errors.mobileNumber}
                        </div>
                      )}
              </div>
              <div className="py-3">
                <label htmlFor="email">Email</label>
                <input
                        type="email"
                        className={`form-control ${
                          formik.touched.email && formik.errors.email
                            ? "is-invalid"
                            : ""
                        }`}
                        style={{ borderRadius: "3px" }}
                        placeholder="Enter email"
                        {...formik.getFieldProps("email")}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <div className="invalid-feedback">
                          {formik.errors.email}
                        </div>
                      )}
              </div>
              <div className="float-end">
                <button type="submit" className="enrollbtn">Send</button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      {/* input section  */}
      {/* landing testimonial */}
      <div className="container">
        <Testimonial />
      </div>
      {/* landing testimonial */}
      </form>
    </div>
  );
}

export default LandingPage;
