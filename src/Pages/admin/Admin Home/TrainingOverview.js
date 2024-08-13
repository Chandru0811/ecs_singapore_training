import React, { useEffect, useState } from "react";
import { FaEdit, FaSave, FaTimes, FaPlus, FaTrash } from "react-icons/fa";
import { useFormik } from "formik";
import ContactUs from "../../../assets/client/phoneImg.png";
import CirclePoints from "../../../assets/client/circlePoint.png";
import api from "../../../config/BaseUrl";
import toast from "react-hot-toast";

function TrainingOverview() {
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(null);
  const [isAddingPoint, setIsAddingPoint] = useState(false);
  const [newPoint, setNewPoint] = useState("");
  const [datas, setDatas] = useState();
  const [loadIndicator, setLoadIndicator] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      contact_no: "",
      key_points: [],
    },
    onSubmit: async (values) => {
      console.log("Home Section 3 Datas", values);
      setIsEditing(null);
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("contact_no", values.contact_no);

      values.key_points.forEach((point, index) => {
        formData.append(`key_points[]`, point);
      });
      try {
        const response = await api.post("update/homesection3", values);
        if (response.status === 200) {
          getData();
          toast.success(response.data.message);
          console.log("Updated Data", response.data);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log("Error updating data:", error);
        toast.error("Error deleting data:", error);
      }
    },
  });

  const getData = async () => {
    setLoading(true);
    try {
      const response = await api.get("edit/homesection3");
      if (response.status === 200) {
        setDatas(response.data.data);
      }
    } catch (e) {
      console.log("Error fetching data:", e);
    } finally {
      setLoading(false);
    }
  };

  const publishData = async () => {
    setLoadIndicator(true);
    try {
      const response = await api.post("publish/homesection3");
      if (response.status === 200) {
        toast.success(response.data.message);
        console.log("Published data Successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Error publishing data:", error);
      toast.error("Error deleting data:", error);
    } finally {
      setLoadIndicator(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (datas) {
      formik.setFieldValue("title", datas.title);
      formik.setFieldValue("description", datas.description);
      formik.setFieldValue("contact_no", datas.contact_no);
      formik.setFieldValue("key_points", datas.key_points || []);
    }
  }, [datas]);

  const handleEditClick = (field) => {
    setIsEditing(field);
  };

  const handleSaveClick = () => {
    formik.handleSubmit();
  };

  const handleCancel = () => {
    setIsEditing(null);
    setIsAddingPoint(false);
    setNewPoint("");
    getData();
  };

  const handlePointChange = (event, index) => {
    const updatedPoints = formik.values.key_points.map((point, i) =>
      i === index ? event.target.value : point
    );
    formik.setFieldValue("key_points", updatedPoints);
  };

  const handleAddPoint = () => {
    if (newPoint.trim() === "") {
      return;
    }
    formik.setFieldValue("key_points", [...formik.values.key_points, newPoint]);
    setNewPoint("");
    setIsAddingPoint(false);
  };

  const handleDeletePoint = (index) => {
    const updatedPoints = formik.values.key_points.filter(
      (_, i) => i !== index
    );
    formik.setFieldValue("key_points", updatedPoints);
  };

  return (
    <section>
      <div className="container-fluid d-flex justify-content-between p-2 bg-light">
        <h3 className="fw-bold">Training Overview</h3>
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
      {loading ? (
        <div className="loader-container">
          <div className="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      ) : (
        <div>
          <div className="container trainingOverview mt-3">
            <div className="row d-flex">
              {/* Title Section */}
              {isEditing === "title" ? (
                <div className="d-flex mb-3">
                  <input
                    type="input"
                    name="title"
                    value={formik.values.title}
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
              ) : (
                <h1 className="secondheading text-start mb-3">
                  {datas?.title}
                  <FaEdit
                    size={20}
                    onClick={() => handleEditClick("title")}
                    className="text-secondary mx-2"
                  />
                </h1>
              )}

              {/* Description Section */}
              <div className="col-md-8">
                {isEditing === "description" ? (
                  <div className="d-flex mb-2">
                    <textarea
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      className="form-control"
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
                  <p className="text-start paraContent">
                    {datas?.description}
                    <FaEdit
                      size={20}
                      onClick={() => handleEditClick("description")}
                      className="text-secondary mx-2"
                    />
                  </p>
                )}
              </div>

              {/* Contact Section */}
              <div className="col-md-4 card p-4">
                <div className="row d-flex">
                  <div className="col-md-8">
                    <p>CONTACT US</p>
                    {isEditing === "contact_no" ? (
                      <div className="d-flex">
                        <input
                          type="text"
                          onInput={(event) => {
                            event.target.value = event.target.value.replace(
                              /[^0-9]/g,
                              ""
                            );
                          }}
                          name="contact_no"
                          onChange={formik.handleChange}
                          value={formik.values.contact_no}
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
                      <h3>
                        {datas?.contact_no}
                        <FaEdit
                          size={20}
                          onClick={() => handleEditClick("contact_no")}
                          className="text-secondary ms-2 mb-2"
                        />
                      </h3>
                    )}
                    <p>Toll Free No</p>
                  </div>
                  <div className="col-md-4 pt-4">
                    <img
                      src={ContactUs}
                      alt="ContactImg"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Points Section */}
          <div className="container PointsSection py-4">
            <div className="points-container row">
              {formik.values.key_points.map((point, index) => (
                <div
                  className="point-item col-md-3 mb-3 d-flex align-items-center"
                  key={index}
                >
                  <img
                    src={CirclePoints}
                    className="me-2"
                    alt="circleImg"
                    style={{ width: "30px", height: "30px" }}
                  />
                  {isEditing === "key_points" ? (
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => handlePointChange(e, index)}
                      className="form-control"
                    />
                  ) : (
                    <span>{point}</span>
                  )}
                  {isEditing === "key_points" && (
                    <FaTrash
                      onClick={() => handleDeletePoint(index)}
                      className="text-danger ms-2"
                    />
                  )}
                </div>
              ))}
            </div>
            {isEditing === "key_points" ? (
              <>
                {isAddingPoint && (
                  <div className="text-start col-md-4 mt-2 d-flex align-items-center">
                    <input
                      type="text"
                      value={newPoint}
                      onChange={(e) => setNewPoint(e.target.value)}
                      className="form-control"
                      placeholder="Enter new point"
                    />
                    <FaTimes
                      onClick={() => setIsAddingPoint(false)}
                      className="text-danger ms-2"
                    />
                  </div>
                )}
                <div className="d-flex justify-content-center mt-3">
                  <FaPlus
                    className="text-success"
                    onClick={() => setIsAddingPoint(true)}
                  />
                  <FaSave
                    onClick={() => {
                      if (newPoint.trim()) {
                        handleAddPoint();
                      }
                      handleSaveClick();
                    }}
                    className="text-primary mx-3"
                  />
                  <FaTimes onClick={handleCancel} className="text-danger" />
                </div>
              </>
            ) : (
              <div className="mt-3 d-flex justify-content-center">
                <FaEdit
                  size={20}
                  onClick={() => handleEditClick("key_points")}
                  className="text-secondary mx-2"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default TrainingOverview;
