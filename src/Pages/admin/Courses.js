import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import StarIcon from "../../assets/client/CoursePointImg.png";
import ClientCourseImg from "../../assets/client/ClientCourseImg.png";
import { FaEdit, FaSave, FaTimes, FaPlus, FaTrash } from "react-icons/fa";
import api from "../../config/BaseUrl";
import ImageURL from "../../config/ImageURL";
import toast from "react-hot-toast";

function Courses() {
  const [headerData, setHeaderData] = useState();
  const [isEditing, setIsEditing] = useState(null);
  const [isAddingPoint, setIsAddingPoint] = useState(false);
  const [newPoint, setNewPoint] = useState("");
  const [editPointId, setEditPointId] = useState(null);

  const formik = useFormik({
    initialValues: {
      image_path: ClientCourseImg,
      heading_section: "Your Courses to Success Trusted Training Platform",
      description:
        "Best Live Instructor-Led Online Training Courses with 100% Placement Support",
      features: [],
    },
    onSubmit: async (values) => {
      console.log("ClientCourse Datas", values);
      setIsEditing(null);
      setIsAddingPoint(false);
      setNewPoint("");
      const formData = new FormData();
      formData.append("heading_section", values.heading_section);
      formData.append("description", values.description);
      values.features.forEach((fea)=>( 
        formData.append("features[]",fea)
      ))
      
      if (
        values.image_path instanceof ArrayBuffer ||
        values.image_path instanceof Blob
      ) {
        formData.append("image", values.image_path);
      }
      try {
        const response = await api.post("update/course/content", formData);
        if (response.status === 200) {
          getData();
          console.log("updated", response.data);
        }
      } catch (e) {
        console.log("object", e);
      }
    },
  });

  const getData = async () => {
    try {
      const response = await api.get("edit/course/content");
      if (response.status === 200) {
        setHeaderData(response.data.data);
        formik.setValues(headerData);
      }
    } catch (e) {
      console.log("object", e);
    }
  };

  const handleEditClick = (field) => {
    setIsEditing(field);
    formik.setValues(headerData);
  };

  const handleSaveClick = () => {
    formik.handleSubmit();
  };

  const handleCancel = () => {
    setIsEditing(null);
    setEditPointId(null);
    setIsAddingPoint(false);
    formik.setValues(headerData);
    // formik.resetForm();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        formik.setFieldValue("image_path", file);
    }
  };

  const handleAddPoint = () => {
    if (newPoint.trim() === "") {
      return;
    }
    formik.setFieldValue("features", [...formik.values.features, newPoint]);
    setNewPoint("");
    setIsAddingPoint(false);
  };

  const handleDeletePoint = (id) => {
    const updatedPoints = formik.values.features.filter((point, i) => i !== id);
    formik.setFieldValue("features", updatedPoints);
  };

  const publishData = async () => {
    try {
      const response = await api.post("publish/course/content");
      if (response.status === 200) {
        toast.success(response?.data?.message);
      }
    } catch (e) {
      console.log("object", e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container-fluid" style={{ backgroundColor: "#FAFCFF" }}>
      <div className="d-flex align-items-center justify-content-between p-2">
        <h4>Courses</h4>
        <button className="btn btn-primary" onClick={publishData}>
          Publish
        </button>
      </div>
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <div className="row CoursesHome">
            <div className="col-md-8 pt-5">
              {isEditing === "heading_section" ? (
                <div className="d-flex flex-column">
                  <input
                    type="text"
                    name="heading_section"
                    value={formik.values?.heading_section}
                    onChange={formik.handleChange}
                    className="form-control mb-2"
                  />
                  <div className="d-flex justify-content-end">
                    <FaSave
                      onClick={handleSaveClick}
                      className="text-secondary me-2"
                    />
                    <FaTimes
                      onClick={handleCancel}
                      className="text-secondary"
                    />
                  </div>
                </div>
              ) : (
                <div className="d-flex align-items-center">
                  <h1 className="display-5 text-start fw-bold">
                    {headerData?.heading_section}
                  </h1>
                  <FaEdit
                    onClick={() => handleEditClick("heading_section")}
                    className="text-secondary ms-3"
                    style={{ width: "30px", height: "30px" }}
                  />
                </div>
              )}
              {isEditing === "description" ? (
                <div className="d-flex flex-column">
                  <textarea
                    name="description"
                    value={formik.values?.description}
                    onChange={formik.handleChange}
                    className="form-control mb-2"
                  />
                  <div className="d-flex justify-content-end">
                    <FaSave
                      onClick={handleSaveClick}
                      className="text-secondary me-2"
                    />
                    <FaTimes
                      onClick={handleCancel}
                      className="text-secondary"
                    />
                  </div>
                </div>
              ) : (
                <div className="d-flex align-items-center">
                  <p className="text-start coursepara">
                    {headerData?.description}
                  </p>
                  <FaEdit
                    onClick={() => handleEditClick("description")}
                    className="text-secondary ms-3"
                  />
                </div>
              )}

              <div className="row pt-4 mb-4">
                {isEditing === "features" ? (
                  <>
                    <div className="col-md-12">
                      <ul style={{ listStyle: "none", padding: 0 }}>
                        <div className="row">
                          {formik.values.features?.map((course, index) => (
                            <div className="col-md-6" key={course.id}>
                              <li className="d-flex align-items-center">
                                <img
                                  src={StarIcon}
                                  className="me-2"
                                  style={{ width: "18px", height: "18px" }}
                                  alt="Star Icon"
                                />
                                <input
                                  type="text"
                                  name={`features[${index}]`}
                                  value={formik.values.features[index]}
                                  onChange={formik.handleChange}
                                  className="form-control mb-2"
                                />
                                <FaTrash
                                  onClick={() => handleDeletePoint(index)}
                                  className="text-secondary ms-2"
                                />
                              </li>
                            </div>
                          ))}
                        </div>
                      </ul>
                    </div>
                    {isAddingPoint ? (
                      <div className="col-md-6 d-flex align-items-center mb-2">
                        <input
                          type="text"
                          value={newPoint}
                          onChange={(e) => setNewPoint(e.target.value)}
                          className="form-control me-2"
                          placeholder="Enter new point"
                        />
                        <FaTimes
                          onClick={() => setIsAddingPoint(false)}
                          className="text-secondary"
                        />
                      </div>
                    ) : (
                      <div className="d-flex align-items-center mb-2">
                        <FaPlus
                          onClick={() => setIsAddingPoint(true)}
                          className="text-secondary"
                        />
                      </div>
                    )}
                    <div className="d-flex justify-content-center">
                      <FaSave
                        onClick={() => {
                            if (newPoint.trim()) {
                              handleAddPoint();
                              formik.handleSubmit();
                            }else{handleSaveClick()}
                          }}
                        className="text-secondary ms-2"
                      />
                      <FaTimes
                        onClick={handleCancel}
                        className="text-secondary"
                      />
                    </div>
                  </>
                ) : (
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    <div className="row">
                      {headerData?.features?.map((course) => (
                        <div className="col-md-6 mb-2" key={course.id}>
                          <li className="d-flex align-items-center mb-3">
                            <img
                              src={StarIcon}
                              className="me-2"
                              style={{ width: "18px", height: "18px" }}
                              alt="Star Icon"
                            />
                            <p className="mb-0">{course}</p>
                          </li>
                        </div>
                      ))}
                    </div>
                    <FaEdit
                      onClick={() => handleEditClick("features")}
                      className="text-secondary ms-3"
                    />
                  </ul>
                )}
              </div>
            </div>
            <div className="col-md-4 pt-5">
              {isEditing === "image_path" ? (
                <div>
                  <input
                    type="file"
                    name="image_path"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="form-control mb-2"
                  />
                  <div className="d-flex justify-content-end">
                    <FaSave
                      onClick={handleSaveClick}
                      className="text-secondary me-2"
                    />
                    <FaTimes
                      onClick={handleCancel}
                      className="text-secondary"
                    />
                  </div>
                </div>
              ) : (
                <div className="d-flex flex-column align-items-center">
                  {headerData?.image_path && (
                    <img
                      src={`${ImageURL}${headerData?.image_path}`}
                      className="img-fluid"
                      alt="CourseImage"
                    />
                  ) }
                  <FaEdit
                    onClick={() => handleEditClick("image_path")}
                    className="text-secondary mt-2"
                  />
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Courses;
