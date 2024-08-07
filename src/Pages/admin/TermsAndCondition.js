
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { FaEdit, FaSave, FaTimes, FaPlus, FaTrash } from "react-icons/fa";
import api from "../../config/BaseUrl";

export const TermsAndCondition = () => {
  const [isEditing, setIsEditing] = useState(null);
  const [headerData, setHeaderData] = useState();

  const formik = useFormik({
    initialValues: {
      title: "Terms And Condition",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    onSubmit: async (values) => {
        console.log("object",values.header)
        
        
        try {
          const response = await api.post("update/terms");
          if (response.status === 200) {
            getData();
            console.log("updated", response.data);
          }
        } catch (e) {
          console.log("object", e);
        }
      }
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

 


  const getData = async () => {
    try {
      const response = await api.get("edit/terms");
      if (response.status === 200) {
        
        setHeaderData(response.data.data);
      }
    } catch (e) {
      console.log("object", e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container-fluid d-flex align-items-center justify-content-between p-2">
        <h4>
            Terms And Condition</h4>
        <button className="btn btn-primary">Publish</button>
      </div>
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          {/* Hero */}
          <div className="row mt-3">
            <div className="col-lg-7">
              {isEditing === "title" ? (
                <div className="d-flex flex-column">
                  <input
                    type="text"
                    name="title"
                    value={formik.values.title}
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
                    {formik.values.title}
                  </h3>
                  <FaEdit
                    onClick={() => handleEditClick("title")}
                    className="text-secondary ms-3"
                    style={{ width: "30px", height: "30px" }}
                  />
                </div>
              )}

              {isEditing === "content" ? (
                <div className="d-flex flex-column">
                  <textarea
                    name="content"
                    value={formik.values.content}
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
                  <p className="text-start">{formik.values.content}</p>
                  <FaEdit
                    onClick={() => handleEditClick("content")}
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
