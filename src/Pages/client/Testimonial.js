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
    title: "It was very good experience",
    name: "Leo",
    position: "Lead Designer",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, blanditiis rerum explicabo molestiae totam numquam praesentium consequatur cupiditate voluptate quas!",
    img: courseImg,
  },
  {
    id: 2,
    title: "It was very good experience",
    name: "Leo",
    position: "Lead Designer",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, blanditiis rerum explicabo molestiae totam numquam praesentium consequatur cupiditate voluptate quas!",
    img: courseImg,
  },
  {
    id: 3,
    title: "It was very good experience",
    name: "Leo",
    position: "Lead Designer",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, blanditiis rerum explicabo molestiae totam numquam praesentium consequatur cupiditate voluptate quas!",
    img: courseImg,
  },
  {
    id: 4,
    title: "It was very good experience",
    name: "Leo",
    position: "Lead Designer",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, blanditiis rerum explicabo molestiae totam numquam praesentium consequatur cupiditate voluptate quas!",
    img: courseImg,
  },
  {
    id: 5,
    title: "It was very good experience",
    name: "Leo",
    position: "Lead Designer",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, blanditiis rerum explicabo molestiae totam numquam praesentium consequatur cupiditate voluptate quas!",
    img: courseImg,
  },
  {
    id: 6,
    title: "It was very good experience",
    name: "Leo",
    position: "Lead Designer",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, blanditiis rerum explicabo molestiae totam numquam praesentium consequatur cupiditate voluptate quas!",
    img: courseImg,
  },
];

function Testimonial() {
  return (
    <div className="carousel-container-testimonial">
      <h1 className="fw-bolder py-3">Testimonial</h1>
      <Carousel responsive={responsive} infinite={true} autoPlay={false}>
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
                        className=" img-fluid rounded-circle p-3"
                        src={card.img}
                        alt="Card image cap"
                      />
                    </div>
                    <div className="person-details fw-bold">
                      <h4 className="fw-bold">{card.name}</h4>
                      <div className="d-flex gap-1">
                        <p>{card.position}</p>
                        <div>
                          {[...Array(5)].map((_, starIndex) => (
                            <IoIosStar
                              key={starIndex}
                              style={{ color: "gold" }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body py-1">
                    <h6 className="fw-bold">{card.title}</h6>
                    <p className="card-text">{card.text}</p>
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
