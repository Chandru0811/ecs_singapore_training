import React, { useState } from "react";
import { useFormik } from "formik";
import { FaEdit, FaTrash } from "react-icons/fa";
import { CardImg, Modal } from "react-bootstrap";
import ReactPlayer from "react-player";

const cardData = [
  {
    id: 1,
    name: "Alice",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, blanditiis rerum explicabo molestiae totam numquam praesentium consequatur cupiditate voluptate quas!",
    CardImg: `https://www.youtube.com/embed/dQw4w9WgXcQ`,
  },
  {
    id: 2,
    name: "Bob",
    description:
      "Suspendisse potenti. Ut pharetra auctor felis, a faucibus nisi volutpat vel. Integer scelerisque, elit at pellentesque malesuada, eros justo egestas purus.",
    CardImg: `https://www.youtube.com/watch?v=pRbxlpvXw2s`,
  },
  {
    id: 3,
    name: "Charlie",
    description:
      "Vivamus fermentum sem ut aliquet vulputate. Morbi et dui nec neque consequat sagittis a at odio. Etiam facilisis odio nec eros congue.",
    CardImg: `https://www.youtube.com/watch?v=UcA5SuPso4g`,
  },
  {
    id: 4,
    name: "Diana",
    description:
      "Donec non eros sit amet arcu interdum vulputate. Cras tincidunt bibendum arcu, et ultricies orci. Quisque vitae turpis quam.",
    CardImg: `https://www.youtube.com/watch?v=26QzZ2Zz99E&list=PLuHGmgpyHfRx4rP_5VdE33LNKrYe4FvQw`,
  },
  {
    id: 5,
    name: "Edward",
    description:
      "Nullam tempor ligula ac erat sollicitudin, nec laoreet tortor egestas. Phasellus scelerisque leo in mi convallis, at fermentum libero sodales.",
    CardImg: `https://www.youtube.com/watch?v=nH9E25nkk3I`,
  },
  {
    id: 6,
    name: "Fiona",
    description:
      "Proin at nulla varius, vulputate justo a, tempus eros. Ut vel turpis ut enim vestibulum tincidunt ac ac erat.",
    CardImg: `https://www.youtube.com/watch?v=qwfE7fSVaZM`,
  },
  {
    id: 7,
    name: "Grace",
    description:
      "Fusce non justo et neque semper consectetur. Sed auctor, nunc sed tincidunt vulputate, justo mi iaculis neque, in convallis dolor mi nec arcu.",
    CardImg: `https://www.youtube.com/embed/dQw4w9WgXcQ`,
  },
  {
    id: 8,
    name: "Henry",
    description:
      "Nullam convallis, quam nec lobortis tristique, justo nisi efficitur dui, in fermentum orci neque vel ipsum.",
    CardImg: `https://www.youtube.com/watch?v=26QzZ2Zz99E&list=PLuHGmgpyHfRx4rP_5VdE33LNKrYe4FvQw`,
  },
];
function CourseVideoTestimonial() {
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
      const updatedCards = formik.values.testimonialCards.map((card) =>
        card.id === selectedCard.id ? selectedCard : card
      );
      formik.setFieldValue("testimonialCards", updatedCards);
    } else {
      const newCard = {
        ...selectedCard,
        id: formik.values.testimonialCards.length + 1,
        CardImg: selectedCard.CardImg || CardImg,
      };
      formik.setFieldValue("testimonialCards", [
        ...formik.values.testimonialCards,
        newCard,
      ]);
    }
    formik.handleSubmit();
    handleClose();
  };

  const handleCardImageChange = (event) => {
    const { value } = event.target;
    setSelectedCard((prevCard) => ({
      ...prevCard,
      CardImg: value,
    }));
  };

  const handleAddCardClick = () => {
    setSelectedCard({
      id: null,
      name: "",
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
          <h3 className="fw-bold">Online Training Review</h3>
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
          {formik.values.testimonialCards.map((card) => (
            <div key={card.id} className="col-md-3 col-12 p-2">
              <div className="h-100 rounded video-card p-2">
                <div className="d-flex justify-content-between align-items-start p-2">
                  <button
                    type="button"
                    onClick={() => handleShow(card)}
                    className="btn link-light ms-2"
                  >
                    <FaEdit className="text-secondary" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteCard(card.id)}
                    className="btn link-light ms-2"
                  >
                    <FaTrash className="text-danger" />
                  </button>
                </div>
                <ReactPlayer
                  url={card.CardImg}
                  controls
                  className="rounded"
                  width="100%"
                  height="180px"
                />
                <div className="p-2 text-start">
                  <h4
                    className="card-text text-primary"
                    style={{ borderBottom: "2px solid" }}
                  >
                    {card.name}
                  </h4>
                  <p className="card-text text-secondary">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedCard?.id ? "Edit Card" : "Add Card"}
            </Modal.Title>
          </Modal.Header>
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
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                value={selectedCard ? selectedCard.description : ""}
                onChange={handleModalChange}
                className="form-control"
                style={{ height: "100px" }}
              />
            </div>
            <div className="p-2">
              <label htmlFor="CardImg">Video URL</label>
              <input
                type="text"
                name="CardImg"
                value={selectedCard ? selectedCard.CardImg : ""}
                onChange={handleCardImageChange}
                className="form-control my-2"
              />
            </div>
            <div className="d-flex justify-content-end mt-3">
              <button
                className="btn btn-primary btn-sm"
                onClick={handleModalSaveClick}
              >
                Save
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </form>
    </div>
  );
}

export default CourseVideoTestimonial;
