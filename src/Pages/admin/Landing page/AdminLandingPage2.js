import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useFormik } from "formik";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";
import toast from "react-hot-toast";
import api from "../../../config/BaseUrl";

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

function AdminLandingPage2() {
  const [isEditing, setIsEditing] = useState(null);
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isAddingNewCard, setIsAddingNewCard] = useState(false);

  const validationSchema = Yup.object({
    fullName: Yup.string().required("*Full Name is required"),
    email: Yup.string()
      .email("*Invalid email address")
      .required("*Email is required"),
    mobileNumber: Yup.string().required("*Number is required"),
  });

  const formik = useFormik({
    initialValues: {
      sub_heading: "",
      sub_title: "",
      description: "",
      landingCarouselCards: [],
      fullName: "",
      email: "",
      mobileNumber: "",
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Form data2", values);
      const formData = new FormData();
      formData.append("sub_heading", values.sub_heading);
      formData.append("sub_title", values.sub_title);
      formData.append("description", values.description);
      formData.append(
        "landingCarouselCards",
        JSON.stringify(values.landingCarouselCards)
      );
      try {
        const response = await api.post("update/landingsection2", formData);
        if (response.status === 200) {
          getData();
          toast.success(response.data.message);
        }
      } catch (e) {
        console.error("Error updating landing page data:", e);
      }
    },
  });

  const getData = async () => {
    try {
      const response = await api.get("edit/landingsection2");
      if (response.status === 200) {
        const parsedCart = JSON.parse(response.data.data.cart || "[]");
        const landingCarouselCards = parsedCart.map((item, index) => ({
          id: index + 1,
          title: item.title || `Card title ${index + 1}`,
          subTitle: item.subtitle || "",
          image: item.image,
        }));

        formik.setValues({
          sub_heading: response.data.data.sub_heading || "",
          sub_title: response.data.data.sub_title || "",
          description: response.data.data.description || "",
          landingCarouselCards: landingCarouselCards,
        });

        setData(response.data.data);
      }
    } catch (e) {
      console.error("Error fetching landing page data:", e);
      toast.error("Failed to fetch landing page data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleEditClick = (field) => {
    setIsEditing(field);
  };

  const handleSaveClick = () => {
    formik.handleSubmit();
    setIsEditing(null);
  };

  const handleCancel = () => {
    setIsEditing(null);
  };

  const handleClose = () => {
    setShow(false);
    setIsAddingNewCard(false);
  };

  const handleShow = (card = null) => {
    setSelectedCard(card);
    setShow(true);
  };

  const handleAddCardClick = () => {
    setSelectedCard({
      id: formik.values.landingCarouselCards.length + 1,
      title: "",
      subTitle: "",
      image: "",
    });
    setIsAddingNewCard(true);
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
    const updatedCardValues = formik.values.landingCarouselCards?.map((card) =>
      card.id === selectedCard.id ? selectedCard : card
    );

    if (isAddingNewCard) {
      formik.setFieldValue("landingCarouselCards", [
        ...formik.values.landingCarouselCards,
        selectedCard,
      ]);
    } else {
      formik.setFieldValue("landingCarouselCards", updatedCardValues);
    }

    setShow(false);
    setIsAddingNewCard(false);
  };

  const handleCardImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedCard((prevCard) => ({
          ...prevCard,
          image: reader.result,
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
          <div className="d-flex">
            <div className="px-2">
              <button
                onClick={handleAddCardClick}
                type="button"
                className="btn btn-sm btn-primary "
              >
                Add card
              </button>
            </div>
            <div className="px-2">
              <button type="button" className="btn btn-sm btn-danger">
                Publish
              </button>
            </div>
          </div>
        </div>

        <div>
          {/* carousel section */}
          <div className="container">
            <div className="row py-4 m-0">
              <div className="col-md-2 col-12 py-3">
                {isEditing === "sub_heading" ? (
                  <div>
                    <div className="d-flex">
                      <button
                        type="button"
                        onClick={handleSaveClick}
                        className="btn btn-sm link-primary ms-2"
                        style={{ width: "fit-content" }}
                      >
                        <FaSave />
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="btn btn-sm link-danger ms-2"
                        style={{ width: "fit-content" }}
                      >
                        <FaTimes />
                      </button>
                    </div>
                    <input
                      type="text"
                      {...formik.getFieldProps("sub_heading")}
                      className="form-control"
                    />
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => {
                        handleEditClick("sub_heading");
                      }}
                      className="btn btn-sm link-secondary"
                      style={{ width: "fit-content" }}
                    >
                      <FaEdit />
                    </button>
                    <p className="sub-content">{data?.sub_heading}</p>
                  </div>
                )}
                {isEditing === "sub_title" ? (
                  <div>
                    <div className="d-flex">
                      <button
                        type="submit"
                        onClick={handleSaveClick}
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
                      {...formik.getFieldProps("sub_title")}
                      onChange={formik.handleChange}
                      className="form-control"
                    />
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => handleEditClick("sub_title")}
                      className="btn btn-sm link-secondary"
                      style={{ width: "fit-content" }}
                    >
                      <FaEdit />
                    </button>
                    <h5 className="text-start fw-bolder">{data?.sub_title}</h5>
                  </div>
                )}
                {isEditing === "description" ? (
                  <div>
                    <div className="d-flex">
                      <button
                        type="submit"
                        onClick={handleSaveClick}
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
                      {...formik.getFieldProps("description")}
                      onChange={formik.handleChange}
                      className="form-control"
                      style={{ minHeight: "150px" }}
                    />
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => handleEditClick("description")}
                      className="btn btn-sm link-secondary"
                      style={{ width: "fit-content" }}
                    >
                      <FaEdit />
                    </button>

                    <h6 className="text-start fw-light">{data?.description}</h6>
                  </div>
                )}
              </div>

              <div className="col-md-10 col-12 px-1 position-relative ">
                {formik.values.landingCarouselCards &&
                formik.values.landingCarouselCards?.length > 0 ? (
                  <Carousel
                    responsive={responsive}
                    infinite={true}
                    autoPlay={false}
                  >
                    {formik.values.landingCarouselCards?.map((card) => (
                      <div key={card.id}>
                        <div className="row m-0 px-1 py-5">
                          <div className="col-md-4 col-12 px-4">
                            <div
                              className="text-start card h-100 px-3 landing-cards text-light"
                              style={{ width: "16rem" }}
                            >
                              <button
                                type="button"
                                onClick={() => handleShow(card)}
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
                                src={card.image}
                                alt="Card image cap"
                              />
                              <div>
                                <h6 className="card-title">{card.title}</h6>
                                <p>{card.subTitle}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  <p>No items to display</p>
                )}
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-7 col-12 px-5 text-start"> </div>
              <div className="col-md-5 col-12 p-5">
                <div className="card text-start p-4 py-3">
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
                        formik.touched.mobileNumber &&
                        formik.errors.mobileNumber
                          ? "is-invalid"
                          : ""
                      }`}
                      style={{ borderRadius: "3px" }}
                      placeholder="Enter mobileNumber"
                      {...formik.getFieldProps("mobileNumber")}
                    />
                    {formik.touched.mobileNumber &&
                      formik.errors.mobileNumber && (
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
                    <button type="submit" className="enrollbtn">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isAddingNewCard ? "Add New Card" : "Edit Card"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={selectedCard?.title || ""}
                onChange={handleModalChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="subTitle" className="form-label">
                Subtitle
              </label>
              <input
                type="text"
                name="subTitle"
                className="form-control"
                value={selectedCard?.subTitle || ""}
                onChange={handleModalChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                type="file"
                name="image"
                className="form-control"
                onChange={handleCardImageChange}
              />
              {selectedCard?.image && (
                <img
                  src={selectedCard.image}
                  alt="Selected"
                  className="img-fluid mt-2"
                />
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleModalSaveClick}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminLandingPage2;
