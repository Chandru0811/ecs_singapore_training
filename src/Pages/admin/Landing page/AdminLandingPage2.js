import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import api from "../../../config/BaseUrl";
import ImgUrl from "../../../config/ImageURL";
import AdminLandingModalEdit from "./AdminLandingModalEdit";
import AdminLandingCardAdd from "./AdminLandingCardAdd";
import DeleteModel from "../../../components/DeleteModel";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 3,
  },
  smallDesktop: {
    breakpoint: { max: 1200, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function AdminLandingPage2() {
  const [loading, setLoading] = useState(true);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [data, setData] = useState([]);

  const validationSchema1 = Yup.object({
    fullName: Yup.string().required("*Full Name is required"),
    email: Yup.string()
      .email("*Invalid email address")
      .required("*Email is required"),
    mobileNumber: Yup.string().required("*Number is required"),
  });

  const formik1 = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      mobileNumber: "",
    },
    validationSchema: validationSchema1,
    onSubmit: (values, { resetForm }) => {
      setLoadIndicator(true);
      console.log("Enroll Datas:", values);
      setTimeout(() => {
        setLoadIndicator(false);
        toast.success("Enroll Form Submitted Successfully!");
        resetForm();
      }, 2000);
    },
  });

  const getData = async () => {
    setLoading(true);
    try {
      const response = await api.get("landingpage2");
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const formik2 = useFormik({
    initialValues: {
      name: "",
      description: "",
      image_path: null,
    },
    onSubmit: async (values) => {
      console.log("Form data2", values);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      if (values.image_path) {
        formData.append("image_path", values.image_path);
      }
      try {
        const response = await api.post("update/landingpage2", formData);
        if (response.status === 200) {
          getData();
          toast.success(response.data.message);
        }
      } catch (e) {
        console.error("Error updating Card data:", e);
      }
    },
  });

  const PublishLandingCards = async () => {
    setLoadIndicator(true);
    try {
      const response = await api.post("publish/landingpage2", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error saving data:", error.message);
    } finally {
      setLoadIndicator(false);
    }
  };

  return (
    <>
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
        <>
          <div className="d-flex justify-content-between p-3 bg-light">
            <h3 className="fw-bold">Landing Page</h3>
            <div className="d-flex">
              <AdminLandingCardAdd onSuccess={getData} />
              <button
                onClick={PublishLandingCards}
                disabled={loadIndicator}
                type="button"
                className="btn btn-danger mx-2"
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
          </div>

          <div>
            {/* carousel section */}
            <div className="container">
              <div className="row py-4 m-0">
                <div className="col-md-2 col-12 py-3">
                  <p className="sub-content">What We Do Know</p>
                  <h5 className="text-start fw-bolder">
                    Lorem, ipsum dolor sit amet consectetur.
                  </h5>
                  <h6 className="text-start fw-light">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Deleniti quibusdam inventore quis corporis error, culpa
                    assumenda! Voluptas aliquid magni fugit omnis ut.
                  </h6>
                </div>

                <div className="col-md-10 col-12 px-1">
                  <Carousel
                    responsive={responsive}
                    infinite={true}
                    autoPlay={false}
                  >
                    {data?.map((card) => (
                      <div
                        key={card.id}
                        className="h-75 card mx-4 my-5 p-2 bg-primary text-light  text-start shadow"
                      >
                        <div className="my-2">
                          <div className="d-flex justify-content-between align-items-start p-2">
                            <button
                              type="button"
                              className="btn link-light ms-2"
                              style={{
                                width: "fit-content",
                                height: "fit-content",
                              }}
                            >
                              <AdminLandingModalEdit
                                id={card.id}
                                onSuccess={getData}
                              />
                            </button>
                            <DeleteModel
                              className="text-danger"
                              onSuccess={getData}
                              path={`/landingpage2/${card.id}`}
                            />
                          </div>
                          <div className="text-start w-25 py-1">
                            <img
                              src={`${ImgUrl}${card.image_path}`}
                              alt="cardImg"
                              className="img-fluid rounded-circle"
                            />
                          </div>
                          <div>
                            <h5 className="py-1">{card.name}</h5>
                            <p>{card.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Carousel>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-7 col-12 px-5 text-start"> </div>
                <div className="col-md-5 col-12 p-5">
                  <form onSubmit={formik1.handleSubmit}>
                    <div className="card text-start p-4 py-3">
                      <h3 className="input-title fw-bold">Enroll Now</h3>
                      <div className="py-3">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                          type="fullName"
                          className={`form-control ${
                            formik1.touched.fullName && formik1.errors.fullName
                              ? "is-invalid"
                              : ""
                          }`}
                          style={{ borderRadius: "3px" }}
                          placeholder="Enter fullName"
                          {...formik1.getFieldProps("fullName")}
                        />
                        {formik1.touched.fullName &&
                          formik1.errors.fullName && (
                            <div className="invalid-feedback">
                              {formik1.errors.fullName}
                            </div>
                          )}
                      </div>
                      <div className="py-3">
                        <label htmlFor="mobileNumber">Mobile Number</label>
                        <input
                          type="mobileNumber"
                          className={`form-control ${
                            formik1.touched.mobileNumber &&
                            formik1.errors.mobileNumber
                              ? "is-invalid"
                              : ""
                          }`}
                          style={{ borderRadius: "3px" }}
                          placeholder="Enter mobileNumber"
                          {...formik1.getFieldProps("mobileNumber")}
                        />
                        {formik1.touched.mobileNumber &&
                          formik1.errors.mobileNumber && (
                            <div className="invalid-feedback">
                              {formik1.errors.mobileNumber}
                            </div>
                          )}
                      </div>
                      <div className="py-3">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          className={`form-control ${
                            formik1.touched.email && formik1.errors.email
                              ? "is-invalid"
                              : ""
                          }`}
                          style={{ borderRadius: "3px" }}
                          placeholder="Enter email"
                          {...formik1.getFieldProps("email")}
                        />
                        {formik1.touched.email && formik1.errors.email && (
                          <div className="invalid-feedback">
                            {formik1.errors.email}
                          </div>
                        )}
                      </div>
                      <div className="float-end">
                        <button
                          type="submit"
                          className="enrollbtn"
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
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AdminLandingPage2;
