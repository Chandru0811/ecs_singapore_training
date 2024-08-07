import React, { useState, useEffect } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { IoMailOpenOutline } from "react-icons/io5";
import { LuMapPin } from "react-icons/lu";
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { BiSolidQuoteRight } from "react-icons/bi";
import { useFormik } from "formik";
import api from "../../config/BaseUrl";

function AdminContact() {
  const [isEditing, setIsEditing] = useState(null);
  const [editingContactMap, setEditingContactMap] = useState("");
  const [data, setData] = useState();

  const formik = useFormik({
    initialValues: {
      phone: "",
      email: "",
      location: "",
      contact_description: "",
      title: "",
      contactMap: "",
      contactCardLink1: "",
      contactCardLink2: "",
      contactCardLink3: "",
    },
    onSubmit: async (values) => {
      console.log("values", values);

      try {
        const response = await api.post("contactus", values);
        if (response.status === 200) {
          getData();
          console.log("updated", response.data);
        }
      } catch (e) {
        console.log("object", e);
      }
    },
  });

  // API Get Data
  const getData = async () => {
    try {
      const response = await api.get("contactus");
      if (response.status === 200) {
        const { phone, email, location, map_url, contact_description } =
          response.data.data;

        formik.setValues({
          phone,
          email,
          location,
          contact_description: contact_description
            .map((desc) => `${desc.title}: ${desc.detail}`)
            .join(", "),
          contactMap: map_url,
        });
        setData(response.data.data);
      }
    } catch (e) {
      console.log("object", e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleEditClick = (field) => {
    setIsEditing(field);
    if (field === "contactMap") {
      setEditingContactMap(formik.values.contactMap);
    }
  };

  const handleSaveClick = () => {
    if (isEditing === "contactMap") {
      formik.setFieldValue("contactMap", editingContactMap);
    }
    formik.handleSubmit();
    setIsEditing(null);
  };

  const handleCancel = () => {
    setIsEditing(null);
    formik.resetForm();
  };
  return (
    <section>
      <div className="container-fluid py-2 bg-white">
        <div className="row">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="fw-bold">Contact</h3>
            <div>
              <button type="button" className="btn btn-primary">
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="container py-5" style={{ overflowX: "hidden" }}>
          <div className="row">
            <div className="col-lg-6 col-xl-4 col-12">
              <div className="card contactDetails p-4">
                <div className="row">
                  <div className="col-lg-3 col-12 d-flex justify-content-center align-items-center">
                    <FiPhoneCall color="#e41111" size={60} />
                  </div>
                  <div className="col-lg-9 col-12">
                    <h3 className="text-start fw-bold">Phone</h3>
                    <hr className="my-4" />
                    {isEditing === "phone" ? (
                      <div className="d-flex">
                        <input
                          type="text"
                          className="form-control me-2"
                          name="phone"
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                        />
                        <FaSave
                          onClick={handleSaveClick}
                          className="text-primary mt-2"
                        />
                        <FaTimes
                          onClick={handleCancel}
                          className="ms-2 text-danger mt-2"
                        />
                      </div>
                    ) : (
                      <div className="d-flex">
                        <p className="text-start fw-medium paraText">
                          {formik.values.phone}
                          <FaEdit
                            size={20}
                            className="text-secondary ms-3"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleEditClick("phone")}
                          />
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="arrow-icon mb-5">
                <a
                  href={formik.values.contactCardLink1}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaCircleArrowRight />
                </a>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4 col-12">
              <div className="card contactDetails p-4">
                <div className="row">
                  <div className="col-lg-3 col-12 d-flex justify-content-center align-items-center">
                    <IoMailOpenOutline color="#e41111" size={60} />
                  </div>
                  <div className="col-lg-9 col-12">
                    <h3 className="text-start fw-bold">Email</h3>
                    <hr className="my-4" />
                    {isEditing === "email" ? (
                      <div className="d-flex">
                        <input
                          type="text"
                          className="form-control me-2"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                        />
                        <FaSave
                          onClick={handleSaveClick}
                          className="text-primary mt-2"
                        />
                        <FaTimes
                          onClick={handleCancel}
                          className="ms-2 text-danger mt-2"
                        />
                      </div>
                    ) : (
                      <div className="d-flex">
                        <p
                          className="text-start fw-medium paraText"
                          style={{ wordBreak: "break-word" }}
                        >
                          {formik.values.email}
                          <FaEdit
                            size={20}
                            className="text-secondary ms-3"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleEditClick("email")}
                          />
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="arrow-icon mb-5">
                <a
                  href={formik.values.contactCardLink2}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaCircleArrowRight />
                </a>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4 col-12">
              <div className="card contactDetails p-4">
                <div className="row">
                  <div className="col-lg-3 col-12 d-flex justify-content-center align-items-center">
                    <LuMapPin color="#e41111" size={60} />
                  </div>
                  <div className="col-lg-9 col-12">
                    <h3 className="text-start fw-bold">Location</h3>
                    <hr className="my-4" />
                    {isEditing === "location" ? (
                      <div className="d-flex">
                        <textarea
                          className="form-control me-2"
                          name="location"
                          value={formik.values.location}
                          onChange={formik.handleChange}
                        />
                        <FaSave
                          onClick={handleSaveClick}
                          className="text-primary mt-2"
                        />
                        <FaTimes
                          onClick={handleCancel}
                          className="ms-2 text-danger mt-2"
                        />
                      </div>
                    ) : (
                      <div className="d-flex">
                        <p className="text-start fw-medium paraText">
                          {formik.values.location}
                          <FaEdit
                            size={20}
                            className="text-secondary ms-3"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleEditClick("location")}
                          />
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="arrow-icon mb-5">
                <a
                  href={formik.values.contactCardLink3}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaCircleArrowRight />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid contactDetails1">
          <div className="container py-5">
            <div className="row py-5">
              <div className="col-lg-6 col-12">
                <div
                  className="card text-start p-5"
                  style={{ border: "none", borderRadius: "30px" }}
                >
                  <h3 className="fw-bold mb-5">We Are Ready To Help You</h3>
                  <div className="mb-3">
                    <label className="form-label">
                      First Name<span className="text-danger">*</span>
                    </label>
                    <input type="text" className={`form-control`} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Last Name<span className="text-danger">*</span>
                    </label>
                    <input type="text" className={`form-control`} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Email<span className="text-danger">*</span>
                    </label>
                    <input type="text" className={`form-control`} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Phone Number<span className="text-danger">*</span>
                    </label>
                    <input type="text" className={`form-control`} />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Message</label>
                    <textarea rows={5} className="form-control"></textarea>
                  </div>
                  <div className="mb-3">
                    <button
                      type="submit"
                      className="btn btn-danger py-2"
                      style={{ width: "100%" }}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-12 text-start mt-3 px-5">
                {isEditing === "contact_description" ? (
                  <div className="d-flex">
                    <textarea
                      type="text"
                      className="form-control me-2"
                      name="contact_description"
                      value={formik.values.contact_description}
                      onChange={formik.handleChange}
                    />
                    <FaSave
                      onClick={handleSaveClick}
                      className="text-primary mt-2"
                    />
                    <FaTimes
                      onClick={handleCancel}
                      className="ms-2 text-danger mt-2"
                    />
                  </div>
                ) : (
                  <div className="d-flex">
                    <p className="text-start fw-medium paraText">
                      {formik.values.contact_description}
                      <FaEdit
                        size={20}
                        className="text-secondary ms-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEditClick("contact_description")}
                      />
                    </p>
                  </div>
                )}
                {isEditing === "title" ? (
                  <div className="d-flex">
                    <textarea
                      type="text"
                      className="form-control me-2"
                      name="title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                    />
                    <FaSave
                      onClick={handleSaveClick}
                      className="text-primary mt-2"
                    />
                    <FaTimes
                      onClick={handleCancel}
                      className="ms-2 text-danger mt-2"
                    />
                  </div>
                ) : (
                  <p className="fw-medium paraText mb-4">
                    {formik.values.title}
                    <FaEdit
                      size={20}
                      className="text-dark ms-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEditClick("title")}
                    />
                  </p>
                )}
                <div
                  className="d-flex align-items-center justify-content-center mb-4"
                  style={{ marginLeft: "1.25rem" }}
                >
                  <span>
                    {" "}
                    <BiSolidQuoteRight size={70} color="#e41111" />
                  </span>
                  {isEditing === "contactSubheading" ? (
                    <div className="d-flex">
                      <textarea
                        type="text"
                        className="form-control me-2"
                        name="contactSubheading"
                        style={{ width: "450px" }}
                        value={formik.values.contactSubheading}
                        onChange={formik.handleChange}
                      />
                      <FaSave
                        onClick={handleSaveClick}
                        className="text-primary mt-2"
                      />
                      <FaTimes
                        onClick={handleCancel}
                        className="ms-2 text-danger mt-2"
                      />
                    </div>
                  ) : (
                    <h5 className="fw-bold" style={{ marginLeft: "0.5rem" }}>
                      {formik.values.contactSubheading}
                      <FaEdit
                        size={20}
                        className="text-secondary ms-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEditClick("contactSubheading")}
                      />
                    </h5>
                  )}
                </div>
                {isEditing === "contactMap" ? (
                  <div className="d-flex mb-2">
                    <textarea
                      type="text"
                      className="form-control me-2"
                      name="contactMap"
                      value={editingContactMap}
                      onChange={(e) => setEditingContactMap(e.target.value)}
                    />
                    <FaSave
                      onClick={handleSaveClick}
                      className="text-primary mt-2"
                    />
                    <FaTimes
                      onClick={handleCancel}
                      className="ms-2 text-danger mt-2"
                    />
                  </div>
                ) : null}
                {isEditing !== "contactMap" && (
                  <FaEdit
                    size={20}
                    onClick={() => handleEditClick("contactMap")}
                    className="text-secondary"
                    style={{ cursor: "pointer" }}
                  />
                )}
                <div className="card" style={{ borderRadius: "30px" }}>
                  <iframe
                    src={formik.values.contactMap}
                    width="100%"
                    height="400"
                    style={{ borderRadius: "30px" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default AdminContact;
