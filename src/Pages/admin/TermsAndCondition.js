import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import api from "../../config/BaseUrl";
import toast from "react-hot-toast";

export const TermsAndCondition = () => {
  const [isEditing, setIsEditing] = useState(null);
  const [headerData, setHeaderData] = useState();

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: async (values) => {
      console.log("object", values.header)
      try {
        const response = await api.post("update/terms", values);
        if (response.status === 200) {
          getData();
          toast.success(response.data.message);
          console.log("updated", response.data);
          handleCancel();
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
    getData();
    setIsEditing(null);
  };

  const getData = async () => {
    try {
      const response = await api.get("edit/terms");
      if (response.status === 200) {
        formik.setValues(response.data.data)
        setHeaderData(response.data.data);
      }
    } catch (e) {
      console.log("object", e);
    }
  };

  useEffect(() => {
    formik.setValues(headerData)
    getData();
  }, []);

  const publishData = async () => {
    try {
      const response = await api.post("publish/terms");
      if (response.status === 200) {
        toast.success(response.data.message);
        console.log()
      }
    } catch (e) {
      console.log("object", e);
    }
  }

  return (
    <>
      <div className="container-fluid d-flex align-items-center justify-content-between p-2">
        <h4>
          Terms And Condition</h4>
        <button className="btn btn-primary" onClick={publishData}>Publish</button>
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
                    {headerData?.title}
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
                  <p className="text-start">{headerData?.content}</p>
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