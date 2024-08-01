import React, { useState } from "react";
import heroImg from "../../assets/client/landing_hero_img.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import courseImg from "../../assets/client/landing_card_logo.jpg";
import { useFormik } from "formik";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import ReactPlayer from "react-player";

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
    items: 2,
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

function AdminLandingPage() {
  const cardData = [
    {
      id: 1,
      title: "Card title 1",
      subTitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, blanditiis rerum explicabo molestiae totam numquam praesentium consequatur cupiditate voluptate quas!",
      carouselImg: courseImg,
    },
    {
      id: 2,
      title: "Card title 2",
      subTitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, blanditiis rerum explicabo molestiae totam numquam praesentium consequatur cupiditate voluptate quas!",
      carouselImg: courseImg,
    },
    {
      id: 3,
      title: "Card title 3",
      subTitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, blanditiis rerum explicabo molestiae totam numquam praesentium consequatur cupiditate voluptate quas!",
      carouselImg: courseImg,
    },
    {
      id: 4,
      title: "Card title 4",
      subTitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, blanditiis rerum explicabo molestiae totam numquam praesentium consequatur cupiditate voluptate quas!",
      carouselImg: courseImg,
    },
    {
      id: 5,
      title: "Card title 5",
      subTitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, blanditiis rerum explicabo molestiae totam numquam praesentium consequatur cupiditate voluptate quas!",
      carouselImg: courseImg,
    },
    {
      id: 6,
      title: "Card title 6",
      subTitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, blanditiis rerum explicabo molestiae totam numquam praesentium consequatur cupiditate voluptate quas!",
      carouselImg: courseImg,
    },
  ];
  const [isEditing, setIsEditing] = useState(null);
  const [show, setShow] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const formik = useFormik({
    initialValues: {
      LandingPageHeading: `Let's Find The Right Course For You`,
      landingPageSubheading: `Where to grow your business as a photographer: site or social media?`,
      landingPageSecondHeading: `WHAT WE GIVE`,
      landingPageSecondSubHeading: `What do You Get From Us`,
      landingPageSecondDescription: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, voluptate minus! Laudantium quidem!`,
      landingPageHeroImg: heroImg,
      landingCarouselCards: cardData,
      landingIframe: `https://www.youtube.com/embed/dQw4w9WgXcQ`,
    },
    onSubmit: (values) => {
      console.log("Form data", values);
    },
  });

  const handleEditClick = (field) => {
    setIsEditing(field);
  };

  const handleSaveClick = () => {
    setIsEditing(null);
    formik.handleSubmit();
  };

  const handleCancel = () => {
    setIsEditing(null);
  };

  const handleClose = () => setShow(false);

  const handleShow = (card) => {
    setSelectedCard(card);
    setShow(true);
  };

  const handleModalChange = (event) => {
    const { name, value } = event.target;
    setSelectedCard((prevCard) => ({
      ...prevCard,
      [name]: value,
    }));
  };

  const handleModalSaveClick = () => {
    formik.handleSubmit();
    const updatedCardValues = formik.values.landingCarouselCards.map((card) =>
      card.id === selectedCard.id ? selectedCard : card
    );
    formik.setFieldValue("landingCarouselCards", updatedCardValues);
    setShow(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue("landingPageHeroImg", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCardImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedCard((prevCard) => ({
          ...prevCard,
          carouselImg: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="d-flex justify-content-between p-3 bg-light">
          <h3 className="fw-bold">Landing Page</h3>
          <button type="button" className="btn btn-sm btn-danger">
            Publish
          </button>
        </div>

        <div>
          {/* banner */}
          <div className="container">
            <div className="row py-5  d-flex align-items-center">
              <div className="col-md-7 col-12 py-3 text-start">
                {isEditing === "LandingPageHeading" ? (
                  <div>
                    <div className="d-flex">
                      <button
                        onClick={() => handleSaveClick("LandingPageHeading")}
                        className="btn btn-sm link-primary ms-2"
                        style={{ width: "fit-content" }}
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn btn-sm link-danger ms-2"
                        style={{ width: "fit-content" }}
                      >
                        <FaTimes />
                      </button>
                    </div>
                    <input
                      type="text"
                      name="LandingPageHeading"
                      {...formik.getFieldProps("LandingPageHeading")}
                      onChange={formik.handleChange}
                      className="form-control"
                    />
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => handleEditClick("LandingPageHeading")}
                      className="btn btn-sm link-secondary ms-2"
                      style={{ width: "fit-content" }}
                    >
                      <FaEdit />
                    </button>
                    <h2 className="display-3 fw-bolder text-dark">
                      {formik.values.LandingPageHeading}
                    </h2>
                  </div>
                )}
                {isEditing === "landingPageSubheading" ? (
                  <div>
                    <div className="d-flex">
                      <button
                        onClick={() => handleSaveClick("landingPageSubheading")}
                        className="btn btn-sm link-primary ms-2"
                        style={{ width: "fit-content" }}
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn btn-sm link-danger ms-2"
                        style={{ width: "fit-content" }}
                      >
                        <FaTimes />
                      </button>
                    </div>
                    <input
                      type="text"
                      name="landingPageSubheading"
                      {...formik.getFieldProps("landingPageSubheading")}
                      onChange={formik.handleChange}
                      className="form-control"
                    />
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => handleEditClick("landingPageSubheading")}
                      className="btn btn-sm link-secondary ms-2"
                      style={{ width: "fit-content" }}
                    >
                      <FaEdit />
                    </button>
                    <h6 className="py-3 fw-light">
                      {formik.values.landingPageSubheading}
                    </h6>
                  </div>
                )}

                <div className="py-3">
                  <button className="enrollbtn">Enroll</button>
                </div>
              </div>
              <div className="col-md-5 col-12">
                {isEditing === "landingPageHeroImg" ? (
                  <div>
                    <div className="d-flex">
                      <button
                        onClick={() => handleSaveClick("landingPageHeroImg")}
                        className="btn btn-sm link-primary ms-2"
                        style={{ width: "fit-content" }}
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn btn-sm link-danger ms-2"
                        style={{ width: "fit-content" }}
                      >
                        <FaTimes />
                      </button>
                    </div>
                    <input
                      type="file"
                      name="carouselImg"
                      onChange={handleImageChange}
                      className="form-control"
                    />
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => handleEditClick("landingPageHeroImg")}
                      className="btn btn-sm link-secondary"
                      style={{ width: "fit-content" }}
                    >
                      <FaEdit />
                    </button>
                    {formik.values.landingPageHeroImg &&
                      (typeof formik.values.landingPageHeroImg === "string" ? (
                        <img
                          src={formik.values.landingPageHeroImg}
                          alt="heroImg"
                          className="img-fluid"
                        />
                      ) : (
                        <img
                          src={URL.createObjectURL(
                            formik.values.landingPageHeroImg
                          )}
                          alt="heroImg"
                          className="img-fluid"
                        />
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* banner */}
          {/* carousel section */}
          <div className="container">
            <div className="row py-4 m-0">
              <div className="col-md-2 col-12 py-3">
                {isEditing === "landingPageSecondHeading" ? (
                  <div>
                    <div className="d-flex">
                      <button
                        onClick={() =>
                          handleSaveClick("landingPageSecondHeading")
                        }
                        className="btn btn-sm link-primary ms-2"
                        style={{ width: "fit-content" }}
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn btn-sm link-danger ms-2"
                        style={{ width: "fit-content" }}
                      >
                        <FaTimes />
                      </button>
                    </div>
                    <input
                      type="text"
                      name="landingPageSecondHeading"
                      {...formik.getFieldProps("landingPageSecondHeading")}
                      onChange={formik.handleChange}
                      className="form-control"
                    />
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() =>
                        handleEditClick("landingPageSecondHeading")
                      }
                      className="btn btn-sm link-secondary"
                      style={{ width: "fit-content" }}
                    >
                      <FaEdit />
                    </button>
                    <p className="sub-content">
                      {formik.values.landingPageSecondHeading}
                    </p>
                  </div>
                )}
                {isEditing === "landingPageSecondSubHeading" ? (
                  <div>
                    <div className="d-flex">
                      <button
                        onClick={() =>
                          handleSaveClick("landingPageSecondSubHeading")
                        }
                        className="btn btn-sm link-primary ms-2"
                        style={{ width: "fit-content" }}
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn btn-sm link-danger ms-2"
                        style={{ width: "fit-content" }}
                      >
                        <FaTimes />
                      </button>
                    </div>
                    <input
                      type="text"
                      name="landingPageSecondSubHeading"
                      {...formik.getFieldProps("landingPageSecondSubHeading")}
                      onChange={formik.handleChange}
                      className="form-control"
                    />
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() =>
                        handleEditClick("landingPageSecondSubHeading")
                      }
                      className="btn btn-sm link-secondary"
                      style={{ width: "fit-content" }}
                    >
                      <FaEdit />
                    </button>
                    <h5 className="text-start fw-bolder">
                      {formik.values.landingPageSecondSubHeading}
                    </h5>
                  </div>
                )}
                {isEditing === "landingPageSecondDescription" ? (
                  <div>
                    <div className="d-flex">
                      <button
                        onClick={() =>
                          handleSaveClick("landingPageSecondDescription")
                        }
                        className="btn btn-sm link-primary ms-2"
                        style={{ width: "fit-content" }}
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn btn-sm link-danger ms-2"
                        style={{ width: "fit-content" }}
                      >
                        <FaTimes />
                      </button>
                    </div>
                    <textarea
                      type="text"
                      name="landingPageSecondDescription"
                      {...formik.getFieldProps("landingPageSecondDescription")}
                      onChange={formik.handleChange}
                      className="form-control"
                      style={{ minHeight: "150px" }}
                    />
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() =>
                        handleEditClick("landingPageSecondDescription")
                      }
                      className="btn btn-sm link-secondary"
                      style={{ width: "fit-content" }}
                    >
                      <FaEdit />
                    </button>

                    <h6 className="text-start fw-light">
                      {formik.values.landingPageSecondDescription}
                    </h6>
                  </div>
                )}
              </div>
              <div className="col-md-10 col-12 px-1 position-relative ">
                <Carousel
                  responsive={responsive}
                  infinite={true}
                  autoPlay={false}
                >
                  {formik.values.landingCarouselCards.map((cards) => (
                    <div key={cards.id}>
                      <div className="row m-0 px-1 py-5">
                        <div className="col-md-4 col-12 px-4">
                          <div
                            className="text-start card h-100 px-3 landing-cards text-light"
                            style={{ width: "16rem" }}
                          >
                            <button
                              type="button"
                              onClick={() => handleShow(cards)}
                              className="btn link-light ms-2"
                              style={{
                                width: "fit-content",
                                height: "fit-content",
                              }}
                            >
                              <FaEdit />
                            </button>
                            <img
                              className="card-img-top img-fluid w-25 h-25 rounded-circle p-2"
                              src={cards.carouselImg}
                              alt="Card image cap"
                            />
                            <div>
                              <h6 className="card-title">{cards.title}</h6>
                              <p>{cards.subTitle}</p>
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
                {isEditing === "landingIframe" ? (
                  <div>
                    <div className="d-flex">
                      <button
                        onClick={() => handleSaveClick("landingIframe")}
                        className="btn btn-sm link-primary ms-2"
                        style={{ width: "fit-content" }}
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn btn-sm link-danger ms-2"
                        style={{ width: "fit-content" }}
                      >
                        <FaTimes />
                      </button>
                    </div>
                    <input
                      type="video"
                      name="landingIframe"
                      {...formik.getFieldProps("landingIframe")}
                      onChange={formik.handleChange}
                      className="form-control"
                    />
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => handleEditClick("landingIframe")}
                      className="btn btn-sm link-secondary"
                      style={{ width: "fit-content" }}
                    >
                      <FaEdit />
                    </button>
                    <ReactPlayer
                      url={formik.values.landingIframe}
                      controls
                      className="rounded"
                      width="100%"
                      height="400px"
                      title="YouTube Video"
                    />
                  </div>
                )}
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
          <div className="container"></div>
          {/* landing testimonial */}
        </div>
      </form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="d-flex justify-content-between align-items-center">
              <div className="me-5">
                <h4>Edit Cards</h4>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <div
          style={{
            height: "1px",
            backgroundColor: "#000",
            margin: "0 10px",
          }}
        />
        <Modal.Body className="p-4">
          <div className="p-2">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={selectedCard ? selectedCard.title : ""}
              onChange={handleModalChange}
              className="form-control"
            />
          </div>
          <div className="p-2">
            <label htmlFor="subTitle">Sub Title</label>
            <p>
              <b>
                <input
                  type="text"
                  name="subTitle"
                  value={selectedCard ? selectedCard.subTitle : ""}
                  onChange={handleModalChange}
                  className="form-control"
                />
              </b>
            </p>
          </div>
          <div className="p-2">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              name="carouselImg"
              onChange={handleCardImageChange}
              className="form-control my-2"
            />
          </div>
          <div className="d-flex justify-content-end mt-3">
            <span>
              <button
                className="btn btn-primary btn-sm"
                onClick={handleModalSaveClick}
              >
                Save
              </button>
            </span>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AdminLandingPage;
