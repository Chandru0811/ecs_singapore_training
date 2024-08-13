import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import api from "../../../config/BaseUrl";
import ImgUrl from "../../../config/ImageURL";
import toast from "react-hot-toast";

function AdminLandingPage1() {
  const [isEditing, setIsEditing] = useState(null);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const handleEditClick = (field) => {
    setIsEditing(field);
  };

  const handleSaveClick = () => {
    setIsEditing(null);
    formik.handleSubmit();
  };

  const handleCancel = () => {
    if (data) {
      formik.setValues({
        title: data.title || "",
        description: data.description || "",
        image_path: null,
        youtube_link: data.youtube_link || "",
      });
    }
    setIsEditing(null);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image_path: null,
      youtube_link: "",
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("youtube_link", values.youtube_link);
      if (values.image_path instanceof File) {
        formData.append("image_path", values.image_path);
      }
      try {
        const response = await api.post("update/landingsection1", formData);
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
      const response = await api.get("edit/landingsection1");
      if (response.status === 200) {
        const fetchedData = response.data.data;
        setData(fetchedData);
        formik.setValues({
          title: fetchedData?.title || "",
          description: fetchedData?.description || "",
          image_path: null,
          youtube_link: fetchedData?.youtube_link || "",
        });
      }
    } catch (e) {
      console.error("Error fetching landing page data:", e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue("image_path", file);
    }
  };

  const publishData = async () => {
    try {
      setLoading(true);
      const response = await api.post("publish/landingsection1");
      if (response.status === 200) {
        console.log("Published successfully!");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Error publishing contact data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between p-3 bg-light">
        <h3 className="fw-bold">Landing Page</h3>
        <button
          type="submit"
          className="btn btn-sm btn-danger mx-2"
          disabled={loading}
          onClick={publishData}
        >
          {loading ? (
            <span
              className="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>
          ) : (
            <span></span>
          )}
          Publish
        </button>
      </div>
      <div className="container">
        <div className="row py-5 d-flex align-items-center">
          <div className="col-md-7 col-12 py-3 text-start">
            {isEditing === "title" ? (
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
                  {...formik.getFieldProps("title")}
                  className="form-control"
                />
              </div>
            ) : (
              <div>
                <button
                  type="button"
                  onClick={() => handleEditClick("title")}
                  className="btn btn-sm link-secondary ms-2"
                  style={{ width: "fit-content" }}
                >
                  <FaEdit />
                </button>
                <h2 className="display-3 fw-bolder text-dark">{data?.title}</h2>
              </div>
            )}
            {isEditing === "description" ? (
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
                <textarea
                  {...formik.getFieldProps("description")}
                  className="form-control"
                />
              </div>
            ) : (
              <div>
                <button
                  type="button"
                  onClick={() => handleEditClick("description")}
                  className="btn btn-sm link-secondary ms-2"
                  style={{ width: "fit-content" }}
                >
                  <FaEdit />
                </button>
                <h6 className="py-3 fw-light">{data?.description}</h6>
              </div>
            )}
            <div className="py-3">
              <button className="enrollbtn">Enroll</button>
            </div>
          </div>
          <div className="col-md-5 col-12">
            {isEditing === "image_path" ? (
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
                  type="file"
                  name="image_path"
                  onChange={handleImageChange}
                  className="form-control"
                />
                {data?.image_path && (
                  <img
                    src={ImgUrl + data?.image_path}
                    alt="heroImg"
                    className="img-fluid my-2"
                  />
                )}
              </div>
            ) : (
              <div>
                <button
                  type="button"
                  onClick={() => handleEditClick("image_path")}
                  className="btn btn-sm link-secondary"
                  style={{ width: "fit-content" }}
                >
                  <FaEdit />
                </button>
                {data?.image_path && (
                  <img
                    src={ImgUrl + data?.image_path}
                    alt="heroImg"
                    className="img-fluid"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-7 col-12 p-5 text-start">
            <h4 className="fw-bold py-2">Available Online Live Courses</h4>
            {isEditing === "youtube_link" ? (
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
                  {...formik.getFieldProps("youtube_link")}
                  className="form-control"
                />
                {data?.youtube_link && (
                  <ReactPlayer
                    url={data?.youtube_link}
                    controls
                    className="rounded"
                    width="100%"
                    height="400px"
                    title="YouTube Video"
                  />
                )}
              </div>
            ) : (
              <div>
                <button
                  type="button"
                  onClick={() => handleEditClick("youtube_link")}
                  className="btn btn-sm link-secondary"
                  style={{ width: "fit-content" }}
                >
                  <FaEdit />
                </button>
                {data?.youtube_link && (
                  <ReactPlayer
                    url={data?.youtube_link}
                    controls
                    className="rounded"
                    width="100%"
                    height="400px"
                    title="YouTube Video"
                  />
                )}
              </div>
            )}
          </div>
          <div className="col-md-5 col-12 p-5"></div>
        </div>
      </div>
    </>
  );
}

export default AdminLandingPage1;
