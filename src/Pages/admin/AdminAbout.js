import React, { useEffect, useState } from "react";
import { LuDiamond } from "react-icons/lu";
import { Tabs, Tab } from "react-bootstrap";
import { BsBoxSeam } from "react-icons/bs";
import { useFormik } from "formik";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import api from "../../config/BaseUrl";
import toast from "react-hot-toast";
import ImageURL from "../../config/ImageURL";

function AdminAbout() {
  const [isEditing, setIsEditing] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoadIndicator] = useState(false);
  const [dataImg, setDataImg] = useState('');

  const formik = useFormik({
    initialValues: {
      background_image: null,
      banner_image: null,
      title: "",
      description: "",
      about_image: null,
      aboutus_content: "",
      feature_title: "",
      feature_description: "",
      image_1: null,
      image1_description: "",
      image_2: null,
      image2_description: "",
      image_3: null,
      image3_description: "",
    },
    onSubmit: async (values) => {
      console.log("About Data", values);
      setLoadIndicator(true);
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("aboutus_content", values.aboutus_content);
      formData.append("feature_title", values.feature_title);
      formData.append("feature_description", values.feature_description);
      formData.append("image1_description", values.image1_description);
      formData.append("image2_description", values.image2_description);
      formData.append("image3_description", values.image3_description);
  
      // Append files if they exist
      const images = ['background_image', 'banner_image', 'about_image', 'image_1', 'image_2', 'image_3'];
      images.forEach(image => {
        if (values[image] instanceof ArrayBuffer ||
            values[image] instanceof Blob) {
          formData.append(image, values[image]);
        }
      });
  
      try {
        const response = await api.post("update/about", formData);
        if (response.status === 200) {
          toast.success(response.data.message);
          getData();
          console.log("About updated", response.data);
        }
      } catch (e) {
        console.log("object", e);
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  const handleEditClick = (field, index) => {
    setIsEditing(field);
    setEditingIndex(index);
  };

  const handleSaveClick = () => {
    formik.handleSubmit();
    setIsEditing(null);
    setEditingIndex(null);
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
        formik.setFieldValue(fieldName, file);
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
    setEditingIndex(null);
    getData();
  };

  // api Get Data
  const getData = async () => {
    try {
      const response = await api.get("edit/about");
      formik.setValues(response.data.data);
      setDatas(response.data.data);
      setDataImg(`${ImageURL}${response.data.data.background_image}`.replace(/\\/g, '/'))
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadIndicator(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // publish Data
  const publishData = async () => {
    try {
      const response = await api.post("publish/about");
      if (response.status === 200) {
        toast.success(response.data.message || "About Changes Published Successfully!");
        console.log("published successfully!");
      }
    } catch (e) {
      console.log("object", e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section>
      <div className="d-flex align-items-center justify-content-between p-2">
        <h4>About</h4>
        <button className="btn btn-primary" onClick={publishData}>
          Publish
        </button>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="container-fluid mb-4">
          <div>
            <FaEdit
              onClick={() => handleEditClick("background_image")}
              className="text-warning"
            />
          </div>
          {isEditing === "background_image" ? (
            <div>
              <div className="d-flex justify-content-center mb-2">
                <FaSave onClick={handleSaveClick} className="text-warning" />
                <FaTimes
                  onClick={handleCancel}
                  style={{ marginLeft: "10px" }}
                  className="text-warning"
                />
              </div>
              <input
                type="file"
                name="background_image"
                onChange={(e) => handleFileChange(e, "background_image")}
                className="form-control mb-3"
                style={{ margin: "0 auto", width: "300px" }}
              />
            </div>
          ) : (
            <></>
          )}
          <div className="row adminAbout-banner">
            <div className="content-wrapper">
              <div
                className="img-fluid"
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100vh",
                  backgroundImage: `url(${dataImg})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                    textAlign: "center",
                    width: "100%",
                    zIndex: 2,
                  }}
                >
                  {/* Editable text content */}
                  <div className="container">
                    <div className="row">
                      <div className="col-md-7 col-12">
                        <div className="about-head">
                          {isEditing === "title" ? (
                            <div>
                              <div className="d-flex justify-content-center mb-2">
                                <FaSave
                                  onClick={handleSaveClick}
                                  className="text-warning"
                                />
                                <FaTimes
                                  onClick={handleCancel}
                                  style={{ marginLeft: "10px" }}
                                  className="text-warning"
                                />
                              </div>
                              <input
                                type="text"
                                name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                className="form-control"
                                {...formik.getFieldProps("title")}
                              />
                            </div>
                          ) : (
                            <div>
                              <FaEdit
                                onClick={() => handleEditClick("title")}
                                className="text-warning"
                              />
                              <h1
                                className="display-5 fw-bold"
                                style={{ paddingLeft: "10px" }}
                              >
                                {datas.title}
                              </h1>
                            </div>
                          )}
                          {isEditing === "description" ? (
                            <div>
                              <div className="d-flex justify-content-center mb-2">
                                <FaSave
                                  onClick={handleSaveClick}
                                  className="text-warning"
                                />
                                <FaTimes
                                  onClick={handleCancel}
                                  style={{ marginLeft: "10px" }}
                                  className="text-warning"
                                />
                              </div>
                              <textarea
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                className="form-control mb-3"
                                {...formik.getFieldProps("description")}
                              />
                            </div>
                          ) : (
                            <div>
                              <FaEdit
                                onClick={() => handleEditClick("description")}
                                className="text-warning"
                              />
                              <p>{datas.description}</p>
                            </div>
                          )}
                        </div>
                        <div className="d-flex mb-4">
                          <button className="btn enroll-btn">Enroll Now</button>
                          <button className="btn contact-btn ms-3">
                            Contact Us
                          </button>
                        </div>
                      </div>
                      <div className="col-md-5 col-12">
                        <div className="p-3">
                          {isEditing === "banner_image" ? (
                            <div>
                              <div className="d-flex justify-content-center mb-2">
                                <FaSave
                                  onClick={handleSaveClick}
                                  className="text-warning"
                                />
                                <FaTimes
                                  onClick={handleCancel}
                                  style={{ marginLeft: "10px" }}
                                  className="text-warning"
                                />
                              </div>
                              <input
                                type="file"
                                onChange={(e) =>
                                  handleFileChange(e, "banner_image")
                                }
                                className="form-control"
                                style={{ margin: "0 auto", width: "300px" }}
                              />
                            </div>
                          ) : null}
                          {isEditing !== "banner_image" && (
                            <FaEdit
                              onClick={() => handleEditClick("banner_image")}
                              className="text-warning "
                            />
                          )}
                          <div>
                            {/* <FaEdit onClick={() => handleEditClick('banner_image')} className="text-warning" /> */}
                            <img
                              src={`${ImageURL}${formik.values.banner_image}`}
                              alt="About Hero"
                              className="img-fluid"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Our Company */}
        <div className="container mb-4">
          <div className="row">
            <div className="col-md-6 col-12 mb-3 d-flex align-items-center justify-content-center">
              <div>
                {isEditing === "about_image" ? (
                  <div>
                    <div className="d-flex justify-content-center mb-2">
                      <FaSave
                        onClick={handleSaveClick}
                        className="text-secondary"
                      />
                      <FaTimes
                        onClick={handleCancel}
                        style={{ marginLeft: "10px" }}
                        className="text-secondary"
                      />
                    </div>
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, "about_image")}
                      className="form-control mb-3"
                      style={{ margin: "0 auto", width: "300px" }}
                    />
                  </div>
                ) : null}
                <div>
                  {isEditing !== "about_image" && (
                    <FaEdit
                      onClick={() => handleEditClick("about_image")}
                      className="text-secondary "
                    />
                  )}
                  <div>
                    {/* <FaEdit onClick={() => handleEditClick('about_image')} className="text-secondary" /> */}
                    <img
                      src={`${ImageURL}${formik.values.about_image}`}
                      alt="img"
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="d-flex text-start">
                <div className="d-flex align-items-center justify-content-center">
                  <div
                    className="p-1 mx-2 mb-3"
                    style={{ backgroundColor: "#ec9fc2", borderRadius: "5px" }}
                  >
                    <LuDiamond color="#AA205E" size={30} />
                  </div>
                  <p className="fw-medium">About Us</p>
                </div>
              </div>
              <div className="text-start">
                {isEditing === "aboutus_content" ? (
                  <div>
                    <div className="d-flex justify-content-center mb-2">
                      <FaSave
                        onClick={handleSaveClick}
                        className="text-secondary"
                      />
                      <FaTimes
                        onClick={handleCancel}
                        style={{ marginLeft: "10px" }}
                        className="text-secondary"
                      />
                    </div>
                    <textarea
                      name="aboutus_content"
                      value={formik.values.aboutus_content}
                      onChange={formik.handleChange}
                      className="form-control"
                      {...formik.getFieldProps("aboutus_content")}
                    />
                  </div>
                ) : (
                  <div>
                    <FaEdit
                      onClick={() => handleEditClick("aboutus_content")}
                      className="text-secondary"
                    />
                    <p className="fw-medium">{datas.aboutus_content}</p>
                  </div>
                )}
                <button className="learn-btn">Learn More</button>
              </div>
            </div>
          </div>
        </div>
        {/* Features  */}
        <div className="container-fluid mb-4">
          <div>
            <FaEdit
              onClick={() => handleEditClick("background_image")}
              className="text-warning"
            />
          </div>
          {isEditing === "background_image" ? (
            <div>
              <div className="d-flex justify-content-center mb-2">
                <FaSave onClick={handleSaveClick} className="text-warning" />
                <FaTimes
                  onClick={handleCancel}
                  style={{ marginLeft: "10px" }}
                  className="text-warning"
                />
              </div>
              <input
                type="file"
                name="background_image"
                onChange={(e) => handleFileChange(e, "background_image")}
                className="form-control mb-3"
                style={{ margin: "0 auto", width: "300px" }}
              />
            </div>
          ) : (
            <></>
          )}
          <div
            className="row adminAbout-banner1"
            style={{
              backgroundImage: `url(${ImageURL}${formik.values.background_image})`,
            }}
          >
            <div className="content-wrapper1">
              <div
                className="img-fluid"
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100vh",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                    textAlign: "center",
                    width: "100%",
                    zIndex: 2,
                  }}
                >
                  {/* Editable text content */}
                  <div className="container">
                    <div className="row mb-4">
                      <div className="col-md-6 col-12 mb-3 d-flex flex-column align-items-start justify-content-center">
                        <div className="about-head1">
                          <div className="d-flex align-items-start justify-content-">
                            <p>
                              <FaEdit
                                onClick={() => handleEditClick("feature_title")}
                                className="text-secondary"
                              />
                            </p>
                          </div>
                          {isEditing === "feature_title" ? (
                            <div>
                              <div className="d-flex justify-content-center mb-2">
                                <FaSave
                                  onClick={handleSaveClick}
                                  className="text-secondary"
                                />
                                <FaTimes
                                  onClick={handleCancel}
                                  style={{ marginLeft: "10px" }}
                                  className="text-secondary"
                                />
                              </div>
                              <input
                                type="text"
                                name="feature_title"
                                value={formik.values.feature_title}
                                onChange={formik.handleChange}
                                className="form-control mb-2"
                                {...formik.getFieldProps("feature_title")}
                              />
                              <input
                                type="text"
                                name="feature_description"
                                value={formik.values.feature_description}
                                onChange={formik.handleChange}
                                className="form-control mb-2"
                                {...formik.getFieldProps("feature_description")}
                              />
                            </div>
                          ) : (
                            <>
                              <div className="d-flex align-items-start justify-content-start">
                                <div
                                  className="p-1 mx-2 mb-3"
                                  style={{
                                    backgroundColor: "#ec9fc2",
                                    borderRadius: "5px",
                                  }}
                                >
                                  <BsBoxSeam color="#AA205E" size={30} />
                                </div>
                                <div>
                                  <p>{datas.feature_title}</p>
                                </div>
                              </div>
                              <h1 className="display-5 fw-bold">
                                {datas.feature_description}
                              </h1>
                            </>
                          )}
                          <button className="btn contact-btn">
                            All Courses
                          </button>
                        </div>
                      </div>
                      <div className="col-md-6 col-12 d-flex align-items-center justify-content-center">
                        <div className="row">
                          <div className="col-md-4 col-6 mb-2">
                            <p>
                              <FaEdit
                                onClick={() => handleEditClick("image_1")}
                                className="text-secondary"
                              />
                            </p>
                            <div className="card about-card h-100 d-flex flex-column align-items-center justify-content-center">
                              {isEditing === "image_1" ? (
                                <div>
                                  <div className="d-flex justify-content-center mb-2">
                                    <FaSave
                                      onClick={handleSaveClick}
                                      className="text-secondary"
                                    />
                                    <FaTimes
                                      onClick={handleCancel}
                                      style={{ marginLeft: "10px" }}
                                      className="text-secondary"
                                    />
                                  </div>
                                  <input
                                    type="file"
                                    name="image_1"
                                    onChange={(e) =>
                                      handleFileChange(e, "image_1")
                                    }
                                    className="form-control mb-3"
                                    style={{ margin: "0 auto", width: "300px" }}
                                  />
                                  <input
                                    type="text"
                                    name="image1_description"
                                    value={formik.values.image1_description}
                                    onChange={formik.handleChange}
                                    className="form-control mb-2"
                                  />
                                </div>
                              ) : (
                                <div className="p-2">
                                  <img
                                    src={`${ImageURL}${formik.values.image_1}`}
                                    alt="img"
                                    className="img-fluid mb-4"
                                  />
                                  <p className="about-textWhite text-center mb-4">
                                    {datas.image1_description}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-md-4 col-6 mb-2">
                            <p>
                              <FaEdit
                                onClick={() => handleEditClick("image_2")}
                                className="text-secondary"
                              />
                            </p>
                            <div className="card about-card h-100 d-flex flex-column align-items-center justify-content-center">
                              {isEditing === "image_2" ? (
                                <div>
                                  <div className="d-flex justify-content-center mb-2">
                                    <FaSave
                                      onClick={handleSaveClick}
                                      className="text-secondary"
                                    />
                                    <FaTimes
                                      onClick={handleCancel}
                                      style={{ marginLeft: "10px" }}
                                      className="text-secondary"
                                    />
                                  </div>
                                  <input
                                    type="file"
                                    name="image_2"
                                    onChange={(e) =>
                                      handleFileChange(e, "image_2")
                                    }
                                    className="form-control mb-3"
                                    style={{ margin: "0 auto", width: "300px" }}
                                  />
                                  <input
                                    type="text"
                                    name="image2_description"
                                    value={formik.values.image2_description}
                                    onChange={formik.handleChange}
                                    className="form-control mb-2"
                                  />
                                </div>
                              ) : (
                                <div className="p-2">
                                  <img
                                    src={`${ImageURL}${formik.values.image_2}`}
                                    alt="img"
                                    className="img-fluid mb-4"
                                  />
                                  <p className="about-textWhite text-center mb-4">
                                    {datas.image2_description}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-md-4 col-6 mb-2">
                            <p>
                              <FaEdit
                                onClick={() => handleEditClick("image_3")}
                                className="text-secondary"
                              />
                            </p>
                            <div className="card about-card h-100 d-flex flex-column align-items-center justify-content-center">
                              {isEditing === "image_3" ? (
                                <div>
                                  <div className="d-flex justify-content-center mb-2">
                                    <FaSave
                                      onClick={handleSaveClick}
                                      className="text-secondary"
                                    />
                                    <FaTimes
                                      onClick={handleCancel}
                                      style={{ marginLeft: "10px" }}
                                      className="text-secondary"
                                    />
                                  </div>
                                  <input
                                    type="file"
                                    name="image_3"
                                    onChange={(e) =>
                                      handleFileChange(e, "image_3")
                                    }
                                    className="form-control mb-3"
                                    style={{ margin: "0 auto", width: "300px" }}
                                  />
                                  <input
                                    type="text"
                                    name="image3_description"
                                    value={formik.values.image3_description}
                                    onChange={formik.handleChange}
                                    className="form-control mb-2"
                                  />
                                </div>
                              ) : (
                                <div className="p-2">
                                  <img
                                    src={`${ImageURL}${formik.values.image_3}`}
                                    alt="img"
                                    className="img-fluid mb-4"
                                  />
                                  <p className="about-textWhite text-center mb-4">
                                    {datas.image3_description}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
export default AdminAbout;
