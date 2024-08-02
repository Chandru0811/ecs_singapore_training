import React, { useState } from "react";
import courseImg from "../../assets/client/avatar.png";
import { useFormik } from "formik";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { IoIosStar } from "react-icons/io";

const cardData = [
  {
    id: 1,
    name: "Alice",
    rating: "5.0",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, blanditiis rerum explicabo molestiae totam numquam praesentium consequatur cupiditate voluptate quas!",
    CardImg: courseImg,
  },
  {
    id: 2,
    name: "Bob",
    rating: "4.0",
    description:
      "Suspendisse potenti. Ut pharetra auctor felis, a faucibus nisi volutpat vel. Integer scelerisque, elit at pellentesque malesuada, eros justo egestas purus.",
    CardImg: courseImg,
  },
  {
    id: 3,
    name: "Charlie",
    rating: "5.0",
    description:
      "Vivamus fermentum sem ut aliquet vulputate. Morbi et dui nec neque consequat sagittis a at odio. Etiam facilisis odio nec eros congue.",
    CardImg: courseImg,
  },
  {
    id: 4,
    name: "Diana",
    rating: "5.0",
    description:
      "Donec non eros sit amet arcu interdum vulputate. Cras tincidunt bibendum arcu, et ultricies orci. Quisque vitae turpis quam.",
    CardImg: courseImg,
  },
  {
    id: 5,
    name: "Edward",
    rating: "4.0",
    description:
      "Nullam tempor ligula ac erat sollicitudin, nec laoreet tortor egestas. Phasellus scelerisque leo in mi convallis, at fermentum libero sodales.",
    CardImg: courseImg,
  },
  {
    id: 6,
    name: "Fiona",
    rating: "5.0",
    description:
      "Proin at nulla varius, vulputate justo a, tempus eros. Ut vel turpis ut enim vestibulum tincidunt ac ac erat.",
    CardImg: courseImg,
  },
  {
    id: 7,
    name: "Grace",
    rating: "4.0",
    description:
      "Fusce non justo et neque semper consectetur. Sed auctor, nunc sed tincidunt vulputate, justo mi iaculis neque, in convallis dolor mi nec arcu.",
    CardImg: courseImg,
  },
  {
    id: 8,
    name: "Henry",
    rating: "5.0",
    description:
      "Nullam convallis, quam nec lobortis tristique, justo nisi efficitur dui, in fermentum orci neque vel ipsum.",
    CardImg: courseImg,
  },
];

function CourseTestimonial() {
  const [show, setShow] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const formik = useFormik({
    initialValues: {
      testimonialCards: cardData,
    },
    onSubmit: (values) => {
      console.log("testimonial data", values);
    },
  });

  const handleClose = () => {
    setShow(false);
    setSelectedCard(null);
  };

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
    if (selectedCard.id) {
      const updatedCardValues = formik.values.testimonialCards.map((card) =>
        card.id === selectedCard.id ? selectedCard : card
      );
      formik.setFieldValue("testimonialCards", updatedCardValues);
    } else {
      const newCard = {
        ...selectedCard,
        id: formik.values.testimonialCards.length + 1,
        CardImg: selectedCard.CardImg || courseImg,
      };
      formik.setFieldValue("testimonialCards", [
        ...formik.values.testimonialCards,
        newCard,
      ]);
    }
    formik.handleSubmit();
    setShow(false);
  };

  const handleCardImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedCard((prevCard) => ({
          ...prevCard,
          CardImg: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCardClick = () => {
    setSelectedCard({
      id: null,
      name: "",
      position: "",
      title: "",
      description: "",
      CardImg: "",
    });
    setShow(true);
  };

  const handleDeleteCard = (id) => {
    const updatedCards = formik.values.testimonialCards.filter(
      (card) => card.id !== id
    );
    formik.setFieldValue("testimonialCards", updatedCards);
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="d-flex justify-content-between p-3 bg-light">
          <h3 className="fw-bold">Course Tesimmonials</h3>
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-sm btn-primary mx-2"
              onClick={handleAddCardClick}
            >
              Add Cards
            </button>
            <button type="button" className="btn btn-sm btn-danger">
              publish
            </button>
          </div>
        </div>

        <div className="row m-0 p-3">
          {formik.values.testimonialCards.map((cards) => (
            <div key={cards.id} className="col-md-3 col-12 p-2 ">
              <div className="h-100 course-cards">
                <div className="head-content">
                  <div className="d-flex justify-content-between align-items-start p-2">
                    <button
                      type="button"
                      onClick={() => handleShow(cards)}
                      className="btn link-light ms-2"
                      style={{
                        width: "fit-content",
                        height: "fit-content",
                      }}
                    >
                      <FaEdit className="text-light" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCard(cards.id)}
                      className="btn link-light ms-2"
                      style={{
                        width: "fit-content",
                        height: "fit-content",
                      }}
                    >
                      <FaTrash className="text-light" />
                    </button>
                  </div>
                  <div className="text-start">
                    <div className="d-flex justify-content-between align-items-center px-2">
                      <div
                        className="d-flex align-items-center"
                        style={{ width: "20%" }}
                      >
                        <img
                          className="img-fluid rounded-circle"
                          src={cards.CardImg}
                          alt="Admin Testimonial"
                        />
                        <span>
                          <h5 className="text-light fw-bold ps-1">
                            {cards.name}
                          </h5>
                        </span>
                      </div>

                      <div className="rating">
                        <p className="text-light">
                          Rating
                          <span
                            className="ms-2 rounded fw-light px-1"
                            style={{ border: "2px solid #fff" }}
                          >
                            {cards.rating}
                            <IoIosStar size={12} style={{ color: "white" }} />
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 text-secondary text-start">
                  <p className="card-text">{cards.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <div className="d-flex justify-content-between align-items-center">
                <div className="me-5">
                  <h4>{selectedCard?.id ? "Edit Card" : "Add Card"}</h4>
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
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={selectedCard ? selectedCard.name : ""}
                onChange={handleModalChange}
                className="form-control"
              />
            </div>
            <div className="p-2">
              <label htmlFor="rating">Rating</label>
              <input
                type="number"
                name="rating"
                value={selectedCard ? selectedCard.rating : ""}
                onChange={handleModalChange}
                className="form-control"
              />
            </div>
            <div className="p-2">
              <label htmlFor="description">Description</label>
              <p>
                <b>
                  <textarea
                    type="text"
                    name="description"
                    value={selectedCard ? selectedCard.description : ""}
                    onChange={handleModalChange}
                    className="form-control"
                    style={{ height: "100px" }}
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
      </form>
    </div>
  );
}

export default CourseTestimonial;
