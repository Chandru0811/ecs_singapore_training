import React, { useState } from "react";
import { useFormik } from "formik";
import { FaEdit, FaSave, FaTimes, FaPlus, FaTrash } from "react-icons/fa";

export const PrivacyPolicy = () => {
  const [isEditing, setIsEditing] = useState(null);
  const formik = useFormik({
    initialValues: {
      heading: "Privacy Policy",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  });

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

  return (
    <>
      <div className="container-fluid d-flex align-items-center justify-content-between p-2">
        <h4>Privacy Policy</h4>
        <button className="btn btn-primary">Publish</button>
      </div>
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          {/* Hero */}
          <div className="row mt-3">
            <div className="col-lg-7">
              {isEditing === "heading" ? (
                <div className="d-flex flex-column">
                  <input
                    type="text"
                    name="heading"
                    value={formik.values.heading}
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
                  <h3 className="display-5 text-start fw-bold">
                    {formik.values.heading}
                  </h3>
                  <FaEdit
                    onClick={() => handleEditClick("heading")}
                    className="text-secondary ms-3"
                    style={{ width: "30px", height: "30px" }}
                  />
                </div>
              )}

              {isEditing === "description" ? (
                <div className="d-flex flex-column">
                  <textarea
                    name="description"
                    value={formik.values.description}
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
                  <p className="text-start">{formik.values.description}</p>
                  <FaEdit
                    onClick={() => handleEditClick("description")}
                    className="text-secondary ms-3"
                    style={{ width: "30px", height: "30px" }}
                  />
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
