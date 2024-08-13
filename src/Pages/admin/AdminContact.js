import React, { useState, useEffect } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { IoMailOpenOutline } from "react-icons/io5";
import { LuMapPin } from "react-icons/lu";
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { BiSolidQuoteRight } from "react-icons/bi";
import { useFormik } from "formik";
import api from "../../config/BaseUrl";
import toast from "react-hot-toast";
import * as Yup from "yup";

const contactValidationSchema = Yup.object({
  firstName: Yup.string().required("*First Name is required"),
  lastName: Yup.string().required("*Last Name is required"),
  email: Yup.string().required("*Email is required"),
  phoneNumber: Yup.string().required("*Phone Number is required"),
});

function AdminContact() {
  const [isEditing, setIsEditing] = useState(null);
  const [editingContactMap, setEditingContactMap] = useState("");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const formik = useFormik({
    initialValues: {
      phone: "",
      email: "",
      location: "",
      title: "",
      subTitle: "",
      detail: "",
      map_url: "",
    },
    onSubmit: async (values) => {
      const contactDescription = {
        title: values.title,
        subTitle: values.subTitle,
        detail: values.detail,
      };

      const payload = {
        ...values,
        contact_description: contactDescription,
      };

      try {
        const response = await api.post("contactus", payload);
        if (response.status === 200) {
          getData();
          toast.success(response.data.message);
          console.log("updated", response.data);
        }
      } catch (e) {
        console.log("Error updating contact data:", e);
      }
    },
  });

  const contactFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
    validationSchema: contactValidationSchema,
    onSubmit: (values) => {
      console.log("Contact Form Submitted", values);
    },
  });

  const getData = async () => {
    try {
      const response = await api.get("edit/contactus");
      if (response.status === 200) {
        const { phone, email, location, map_url, contact_description } =
          response.data.data;

        formik.setValues({
          phone,
          email,
          location,
          title: contact_description.title,
          subTitle: contact_description.subTitle,
          detail: contact_description.detail,
          map_url: map_url,
        });
        setData(response.data.data);
      }
    } catch (e) {
      console.log("Error fetching contact data:", e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleEditClick = (field) => {
    setIsEditing(field);
    if (field === "map_url") {
      setEditingContactMap(formik.values.map_url);
    }
  };

  const handleSaveClick = () => {
    if (isEditing === "map_url") {
      formik.setFieldValue("map_url", editingContactMap);
    }
    setIsEditing(null);
    formik.handleSubmit();
  };

  const handleCancel = () => {
    setIsEditing(null);
  };

  const publishData = async () => {
    try {
      setLoading(true);
      const response = await api.post("publish/contactus");
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
    <section>
      <div className="container-fluid py-2 bg-white">
        <div className="row">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="fw-bold">Contact</h3>
            <div>
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
          </div>
        </div>
      </div>

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
                        {...formik.getFieldProps("phone")}
                        onChange={formik.handleChange}
                      />
                      <FaSave
                        onClick={() => handleSaveClick("phone")}
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
                        <button
                          onClick={() => handleEditClick("phone")}
                          className="btn btn-sm link-secondary ms-2"
                          style={{ width: "fit-content" }}
                        >
                          <FaEdit size={20} />
                        </button>
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
                        {...formik.getFieldProps("email")}
                        onChange={formik.handleChange}
                      />
                      <FaSave
                        onClick={() => handleSaveClick("email")}
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
                        {formik.values.email}
                        <button
                          onClick={() => handleEditClick("email")}
                          className="btn btn-sm link-secondary ms-2"
                          style={{ width: "fit-content" }}
                        >
                          <FaEdit size={20} />
                        </button>
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
                      <input
                        type="text"
                        className="form-control me-2"
                        name="location"
                        {...formik.getFieldProps("location")}
                        onChange={formik.handleChange}
                      />
                      <FaSave
                        onClick={() => handleSaveClick("location")}
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
                        <button
                          onClick={() => handleEditClick("location")}
                          className="btn btn-sm link-secondary ms-2"
                          style={{ width: "fit-content" }}
                        >
                          <FaEdit size={20} />
                        </button>
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
      <form onSubmit={contactFormik.handleSubmit}>
        <div className="container-fluid contactDetails1">
          <div className="container py-5">
            <div className="row py-5">
              {/* Contact Form */}
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
                    <input
                      type="text"
                      className={`form-control ${
                        contactFormik.touched.firstName &&
                        contactFormik.errors.firstName
                          ? "is-invalid"
                          : ""
                      }`}
                      {...contactFormik.getFieldProps("firstName")}
                    />
                    {contactFormik.touched.firstName &&
                      contactFormik.errors.firstName && (
                        <div className="invalid-feedback">
                          {contactFormik.errors.firstName}
                        </div>
                      )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Last Name<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        contactFormik.touched.lastName &&
                        contactFormik.errors.lastName
                          ? "is-invalid"
                          : ""
                      }`}
                      {...contactFormik.getFieldProps("lastName")}
                    />
                    {contactFormik.touched.lastName &&
                      contactFormik.errors.lastName && (
                        <div className="invalid-feedback">
                          {contactFormik.errors.lastName}
                        </div>
                      )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Email<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        contactFormik.touched.email &&
                        contactFormik.errors.email
                          ? "is-invalid"
                          : ""
                      }`}
                      {...contactFormik.getFieldProps("email")}
                    />
                    {contactFormik.touched.email &&
                      contactFormik.errors.email && (
                        <div className="invalid-feedback">
                          {contactFormik.errors.email}
                        </div>
                      )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Phone Number<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        contactFormik.touched.phoneNumber &&
                        contactFormik.errors.phoneNumber
                          ? "is-invalid"
                          : ""
                      }`}
                      {...contactFormik.getFieldProps("phoneNumber")}
                    />
                    {contactFormik.touched.phoneNumber &&
                      contactFormik.errors.phoneNumber && (
                        <div className="invalid-feedback">
                          {contactFormik.errors.phoneNumber}
                        </div>
                      )}
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Message</label>
                    <textarea
                      rows={5}
                      className="form-control"
                      {...contactFormik.getFieldProps("message")}
                    />
                  </div>
                  <div className="mb-3">
                    <button
                      className="btn btn-danger py-2"
                      style={{ width: "100%" }}
                      type="submit"
                      disabled={loadIndicator}
                    >
                      {loadIndicator && (
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          aria-hidden="true"
                        ></span>
                      )}
                      Send
                    </button>
                  </div>
                </div>
              </div>
              {/* Contact Form End */}
              <div className="col-lg-6 col-12 text-start mt-3 px-5">
                {isEditing === "title" ? (
                  <div className="d-flex">
                    <textarea
                      type="text"
                      className="form-control me-2"
                      name="title"
                      {...formik.getFieldProps("title")}
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
                      {formik.values.title}
                      <FaEdit
                        size={20}
                        className="text-secondary ms-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEditClick("title")}
                      />
                    </p>
                  </div>
                )}
                {isEditing === "subTitle" ? (
                  <div className="d-flex">
                    <textarea
                      type="text"
                      className="form-control me-2"
                      name="subTitle"
                      {...formik.getFieldProps("subTitle")}
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
                    {formik.values.subTitle}
                    <FaEdit
                      size={20}
                      className="text-dark ms-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEditClick("subTitle")}
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
                  {isEditing === "detail" ? (
                    <div className="d-flex">
                      <textarea
                        type="text"
                        className="form-control me-2"
                        name="detail"
                        style={{ width: "450px" }}
                        {...formik.getFieldProps("detail")}
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
                      {formik.values.detail}
                      <FaEdit
                        size={20}
                        className="text-secondary ms-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEditClick("detail")}
                      />
                    </h5>
                  )}
                </div>
                {isEditing === "map_url" ? (
                  <div className="d-flex">
                    <input
                      type="text"
                      className="form-control me-2"
                      name="map_url"
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
                ) : (
                  <>
                    <FaEdit
                      size={20}
                      className="text-secondary ms-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEditClick("map_url")}
                    />
                    <div className="card" style={{ borderRadius: "30px" }}>
                      <iframe
                        src={formik.values.map_url}
                        width="100%"
                        height="400"
                        style={{ borderRadius: "30px" }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default AdminContact;
