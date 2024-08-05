import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import courseImg from "../../assets/client/landing_card_logo.jpg";
import { IoIosStar } from "react-icons/io";

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
    <div>
      <h1 className="fw-bolder py-3">Testimonial</h1>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={false}
        showDots={false}
      >
        {cardData.map((card, index) => (
          <div key={index} className="mx-4 my-5 p-1 h-75 shadow rounded card">
            <div className="d-flex align-items-center px-2">
              <div>
                <img src={card.img} alt={card.title} className="img-fluid" />
              </div>
              <div className="text-start">
                <h5>{card.name}</h5>
                <p>
                  {card.position}
                  <span>
                    {[...Array(5)].map((_, starIndex) => (
                      <IoIosStar key={starIndex} style={{ color: "gold" }} />
                    ))}
                  </span>
                </p>
              </div>
            </div>
            <div className="p-2 fit-content">
              <h5 className="text-start">{card.title}</h5>
              <p className="text-start">{card.text}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Testimonial;
