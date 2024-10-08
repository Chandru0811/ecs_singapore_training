import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { IoIosStar } from "react-icons/io";
import api from "../../config/BaseUrl";
import ImgUrl from "../../config/ImageURL";

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

function Testimonial() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const response = await api.get("testimonials");
        console.log(response.data);
        setData(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error(`Error Fetching Data: ${error.message}`);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <IoIosStar
          key={i}
          size={24}
          style={{ color: i < rating ? "#ffd700" : "#e4e5e9" }}
        />
      );
    }
    return stars;
  };

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
      ) : data.length === 0 ? (
        <div className="container-fluid p-5">
          <div className="row">
            <div className="col-12 text-center">
              <h3>Testimonial unavailable</h3>
              <p>
                We are working to add new testimonial in this section. Please
                check back later.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="fw-bolder py-3">Testimonial</h1>
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={false}
            showDots={false}
          >
            {data.map((card, index) => (
              <div
                key={index}
                className="mx-4 my-5 p-1 h-75 shadow rounded card"
              >
                <div className="d-flex align-items-center px-2">
                  <div className="w-25 p-1">
                    <img
                      src={`${ImgUrl}${card.image_path}`}
                      alt={card.title}
                      className="img-fluid"
                      style={{ width: "80%", height: "80%" }}
                    />
                  </div>
                  <div className="text-start">
                    <h5>{card.client_name}</h5>
                    <p>
                      {card.designation}
                      <span>{renderStars(card.rating)}</span>
                    </p>
                  </div>
                </div>
                <div className="p-2 fit-content">
                  <h5 className="text-start">{card.title}</h5>
                  <p className="text-start">{card.description}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </>
  );
}

export default Testimonial;
