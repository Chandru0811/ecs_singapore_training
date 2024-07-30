import React from "react";
import heroImg from "../../assets/client/landing_hero_img.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import courseImg from "../../assets/client/landing_card_logo.jpg";
import Testimonial from "./Testimonial";

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
  return (
    <div>
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
              <button className="enrollbtn">Enroll</button>
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
        <div className="row py-4 m-0">
          <div className="col-md-2 col-12 py-3">
            <p className="sub-content">WHAT WE GIVE</p>
            <h5 className="text-start fw-bolder">What do You Get From Us</h5>
            <h6 className="text-start fw-light">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus,
              voluptate minus! Laudantium quidem!
            </h6>
          </div>
          <div className="col-md-10 col-12  position-relative ">
            <Carousel responsive={responsive} infinite={true} autoPlay={false}>
              {cardData.map((card) => (
                <div key={card.id}>
                  <div className="row m-0 py-4">
                    <div className="col-md-4 col-12 pe-auto">
                      <div
                        className="text-start card h-100 mx-1 landing-cards text-light"
                        style={{ width: "18.5rem" }}
                      >
                        <img
                          className="card-img-top img-fluid w-25 h-25 rounded-circle p-2"
                          src={card.img}
                          alt="Card image cap"
                        />
                        <div className="card-body">
                          <h5 className="card-title">{card.title}</h5>
                          <p className="card-text">{card.text}</p>
                        </div>
                      </div>
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
            <div className="card text-start p-4 py-3">
              <h3 className="input-title fw-bold">Enroll Now</h3>
              <div className="py-3">
                <label htmlFor="fullName">Full Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="fullName"
                  placeholder="Enter Full Name..."
                />
              </div>
              <div className="py-3">
                <label htmlFor="mobileNumber">Mobile Number</label>
                <input
                  className="form-control"
                  type="text"
                  name="mobileNumber"
                  placeholder="Enter mobile number..."
                />
              </div>
              <div className="py-3">
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="Enter email..."
                />
              </div>
              <div className="float-end">
                <button className="enrollbtn">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* input section  */}
      {/* landing testimonial */}
      <div className="container">
        <Testimonial />
      </div>
      {/* landing testimonial */}
    </div>
  );
}

export default LandingPage;
