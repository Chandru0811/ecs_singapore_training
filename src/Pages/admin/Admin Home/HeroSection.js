import React, { useEffect, useState } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import Star from "../../../assets/client/starimg.png";
import BookImg from "../../../assets/client/bookImg.png";
import Duration from "../../../assets/client/durationImg.png";
import CourseDuration from "../../../assets/client/nextCourseImg.png";
import { useFormik } from "formik";
import api from "../../../config/BaseUrl";
import ImageURL from "../../../config/ImageURL";
import toast from "react-hot-toast";

function HeroSection() {
  const [heroData, setHeroData] = useState();
  const [loader, setLoader] = useState(true);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "The Best Platform Enroll in your Special Courses",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      image_path: null,
      herocardImg1: BookImg,
      herocardImg2: Duration,
      herocardImg3: CourseDuration,
      subcontent_1: "Learning Format Online Bootcamp",
      subcontent_2: "Course Duration",
      subcontent_3: "Next Course Starts at October 12, 2024",
    },
    onSubmit: async (values) => {
      console.log("Home Hero Section Datas", values);
      setIsEditing(null);
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("subcontent_1", values.subcontent_1);
      formData.append("subcontent_2", values.subcontent_2);
      formData.append("subcontent_3", values.subcontent_3);
      if (values.image_path) {
        formData.append("image_path", values.image_path);
      }
      try {
        const response = await api.post("update/homesection1", formData);
        if (response.status === 200) {
          toast.success(response.data.message);
          getData();
          console.log("Updated Data", response.data);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log("object", error);
        toast.error("Error deleting data:", error);
      }
    },
  });

  const getData = async () => {
    setLoader(true);
    try {
      const response = await api.get("edit/homesection1");
      if (response.status === 200) {
        formik.setFieldValue("title", response.data.data.title);
        formik.setFieldValue("description", response.data.data.description);
        formik.setFieldValue("subcontent_1", response.data.data.subcontent_1);
        formik.setFieldValue("subcontent_2", response.data.data.subcontent_2);
        formik.setFieldValue("subcontent_3", response.data.data.subcontent_3);
        setHeroData(response.data.data);
      }
    } catch (error) {
      console.log("object", error);
      toast.error("Error deleting data:", error);
    } finally {
      setLoader(false);
    }
  };

  const [isEditing, setIsEditing] = useState(null);
  const handleEditClick = (field) => {
    setIsEditing(field);
  };

  const handleSaveClick = () => {
    formik.handleSubmit();
  };

  const handleCancel = () => {
    setIsEditing(null);
    formik.resetForm();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue("image_path", file);
    }
  };

  const publishData = async () => {
    setLoadIndicator(true);
    try {
      const response = await api.post("publish/homesection1");
      if (response.status === 200) {
        toast.success(response.data.message);
        console.log("Published data Successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("object", error);
      toast.error("Error deleting data:", error);
    } finally {
      setLoadIndicator(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
      ) : (
        <section>
          <div className="container-fluid d-flex justify-content-between p-2 bg-light">
            <h3 className="fw-bold">Hero Section</h3>
            <button
              className="btn btn-danger"
              onClick={publishData}
              disabled={loadIndicator}
            >
              {loadIndicator && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
              )}
              Publish
            </button>
          </div>
            <div className="container">
              <form onSubmit={formik.handleSubmit}>
                {/* Hero */}
                <div className="container-fluid row mt-3">
                  <div className="col-lg-7">
                    <div className="d-flex mb-3">
                      <img
                        src={Star}
                        alt="homestar"
                        style={{ width: "30px", height: "30px" }}
                      />
                      <p className="subhead ml-2">Start Learning Today</p>
                    </div>
                    {isEditing === "title" ? (
                      <div className="d-flex">
                        <input
                          type="text"
                          name="title"
                          value={formik.values.title}
                          onChange={formik.handleChange}
                          className="form-control mb-2"
                        />
                        <FaSave
                          onClick={handleSaveClick}
                          className="text-primary mx-2 mt-2"
                        />
                        <FaTimes
                          onClick={handleCancel}
                          className="text-danger mt-2"
                        />
                      </div>
                    ) : (
                      <h1 className="display-5 text-start fw-bold">
                        {formik.values.title}
                        <FaEdit
                          size={20}
                          onClick={() => handleEditClick("title")}
                          className="text-secondary ms-3"
                        />
                      </h1>
                    )}
                    {isEditing === "description" ? (
                      <div className="d-flex">
                        <textarea
                          name="description"
                          value={formik.values.description}
                          onChange={formik.handleChange}
                          className="form-control mb-2"
                        />
                        <FaSave
                          onClick={handleSaveClick}
                          className="text-primary mx-2 mt-4"
                        />
                        <FaTimes
                          onClick={handleCancel}
                          className="text-danger mt-4"
                        />
                      </div>
                    ) : (
                      <p className="text-start">
                        {formik.values.description}
                        <FaEdit
                          size={20}
                          onClick={() => handleEditClick("description")}
                          className="text-secondary ms-3"
                        />
                      </p>
                    )}
                    <div className="mt-4 text-start">
                      <button
                        type="button"
                        className="btn btn-primary btn-lg me-3"
                      >
                        Get Started
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-lg"
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    {isEditing === "image_path" ? (
                      <div className="d-flex mb-2">
                        <input
                          type="file"
                          name="image_path"
                          accept="image/*"
                          style={{ maxWidth: "100%", height: "auto" }}
                          onChange={handleImageUpload}
                          className="form-control"
                        />
                        <FaSave
                          onClick={handleSaveClick}
                          className="text-primary mx-2 mt-2"
                        />
                        <FaTimes
                          onClick={handleCancel}
                          className="text-danger mt-2"
                        />
                      </div>
                    ) : (
                      <FaEdit
                        size={20}
                        onClick={() => handleEditClick("image_path")}
                        className="text-secondary"
                      />
                    )}
                    <div>
                      <img
                        src={`${ImageURL}${heroData?.image_path}`}
                        className="img-fluid"
                        alt={heroData?.title}
                      />
                    </div>
                  </div>
                  {/* Cards */}
                  <div className="card homeCard mt-3 mb-5">
                    <div className="card-body">
                      <div className="row d-flex pt-3">
                        <div className="col-md-4 d-flex justify-content-center">
                          <img
                            src={formik.values.herocardImg1}
                            alt="BookImg"
                            className="me-2"
                            style={{ width: "30px", height: "30px" }}
                          />
                          {isEditing === "subcontent_1" ? (
                            <>
                              <div className="d-flex">
                                <input
                                  type="text"
                                  name="subcontent_1"
                                  value={formik.values.subcontent_1}
                                  onChange={formik.handleChange}
                                  className="form-control"
                                />
                                <FaSave
                                  onClick={handleSaveClick}
                                  className="text-primary mx-2 mt-2"
                                />
                                <FaTimes
                                  onClick={handleCancel}
                                  className="text-danger mt-2"
                                />
                              </div>
                            </>
                          ) : (
                            <p>
                              {formik.values.subcontent_1}
                              <FaEdit
                                onClick={() => handleEditClick("subcontent_1")}
                                className="text-secondary mx-2"
                              />
                            </p>
                          )}
                        </div>
                        <div className="col-md-4 d-flex justify-content-center">
                          <img
                            src={formik.values.herocardImg2}
                            className="me-2"
                            alt="BookImg"
                            style={{ width: "30px", height: "30px" }}
                          />
                          {isEditing === "subcontent_2" ? (
                            <>
                              <div className="d-flex">
                                <input
                                  type="text"
                                  name="subcontent_2"
                                  value={formik.values.subcontent_2}
                                  onChange={formik.handleChange}
                                  className="form-control"
                                />
                                <FaSave
                                  onClick={handleSaveClick}
                                  className="text-primary mx-2 mt-2"
                                />
                                <FaTimes
                                  onClick={handleCancel}
                                  className="text-danger mt-2"
                                />
                              </div>
                            </>
                          ) : (
                            <p>
                              {formik.values.subcontent_2}
                              <FaEdit
                                onClick={() => handleEditClick("subcontent_2")}
                                className="text-secondary mx-2"
                              />
                            </p>
                          )}
                        </div>
                        <div className="col-md-4 d-flex justify-content-center">
                          <img
                            src={formik.values.herocardImg3}
                            className="me-2"
                            alt="BookImg"
                            style={{ width: "30px", height: "30px" }}
                          />
                          {isEditing === "subcontent_3" ? (
                            <>
                              <div className="d-flex">
                                <input
                                  type="text"
                                  name="subcontent_3"
                                  value={formik.values.subcontent_3}
                                  onChange={formik.handleChange}
                                  className="form-control"
                                />
                                <FaSave
                                  onClick={handleSaveClick}
                                  className="text-primary mt-2 mx-2"
                                />
                                <FaTimes
                                  onClick={handleCancel}
                                  className="text-danger mt-2"
                                />
                              </div>
                            </>
                          ) : (
                            <p>
                              {formik.values.subcontent_3}
                              <FaEdit
                                onClick={() => handleEditClick("subcontent_3")}
                                className="text-secondary mx-2"
                              />
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>   
        </section>
      )}
    </>
  );
}

export default HeroSection;
