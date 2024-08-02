import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import courseImg from "../../assets/client/landing_card_logo.jpg";
import { IoIosStar } from "react-icons/io";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  laptop: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 768, min: 320 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 320, min: 0 },
    items: 1,
  },
};

const cardData = [
  {
    id: 1,
    title: "A Wonderful Experience",
    name: "Alice",
    position: "Senior Developer",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, blanditiis rerum explicabo molestiae totam numquam praesentium consequatur cupiditate voluptate quas!",
    img: courseImg,
  },
  {
    id: 2,
    title: "Learning Made Easy",
    name: "Bob",
    position: "Project Manager",
    text: "Suspendisse potenti. Ut pharetra auctor felis, a faucibus nisi volutpat vel. Integer scelerisque, elit at pellentesque malesuada, eros justo egestas purus.",
    img: courseImg,
  },
  {
    id: 3,
    title: "Highly Recommend",
    name: "Charlie",
    position: "UI/UX Designer",
    text: "Vivamus fermentum sem ut aliquet vulputate. Morbi et dui nec neque consequat sagittis a at odio. Etiam facilisis odio nec eros congue.",
    img: courseImg,
  },
  {
    id: 4,
    title: "Top-notch Training",
    name: "Diana",
    position: "Software Engineer",
    text: "Donec non eros sit amet arcu interdum vulputate. Cras tincidunt bibendum arcu, et ultricies orci. Quisque vitae turpis quam.",
    img: courseImg,
  },
  {
    id: 5,
    title: "Exceptional Quality",
    name: "Edward",
    position: "Backend Developer",
    text: "Nullam tempor ligula ac erat sollicitudin, nec laoreet tortor egestas. Phasellus scelerisque leo in mi convallis, at fermentum libero sodales.",
    img: courseImg,
  },
  {
    id: 6,
    title: "Great Support",
    name: "Fiona",
    position: "QA Specialist",
    text: "Proin at nulla varius, vulputate justo a, tempus eros. Ut vel turpis ut enim vestibulum tincidunt ac ac erat.",
    img: courseImg,
  },
];

function Testimonial() {
  return (
    <div className="carousel-container-testimonial">
      <h1 className="fw-bolder py-3">Testimonial</h1>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={false}
        showDots={true}
      >
        {cardData.map((card) => (
          <div key={card.id} className="react-multi-carousel-items">
            <div className="row m-0 p-5">
              <div className="col-md-4 col-12">
                <div
                  className="card shadow border-0 h-100 text-start"
                  style={{ width: "18rem" }}
                >
                  <div className="d-flex pt-3">
                    <div className="landing-card-img">
                      <img
                        className=" img-fluid rounded-circle p-2"
                        src={card.img}
                        alt="Card image cap"
                      />
                    </div>
                    <div className="person-details fw-bold">
                      <h4 className="fw-bold">{card.name}</h4>
                      <div className="d-flex">
                        <span className="fw-light">{card.position}</span>
                        <span>
                          {[...Array(5)].map((_, starIndex) => (
                            <IoIosStar
                              key={starIndex}
                              style={{ color: "gold" }}
                            />
                          ))}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-body py-1"
                    style={{ minHeight: "200px" }}
                  >
                    <h6 className="fw-bold">{card.title}</h6>
                    <p className="card-text ">{card.text}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Testimonial;
