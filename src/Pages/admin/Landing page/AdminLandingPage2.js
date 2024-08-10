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

  const validationSchema = Yup.object({
    fullName: Yup.string().required("*Full Name is required"),
    email: Yup.string()
      .email("*Invalid email address")
      .required("*Email is required"),
    mobileNumber: Yup.string().required("*Number is required"),
  });

  const getData = async () => {
    try {
      const response = await api.get("landingpage2");
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      image_path: null,
      fullName: "",
      email: "",
      mobileNumber: "",
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Form data2", values);
      setLoadIndicator(true);
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

  const refreshData = async () => {
    setLoading(true);
    try {
      const response = await api.get("landingpage2");
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error refreshing data:", error);
      setLoading(false);
    }
  };

  const PublishLandingCards = async () => {
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
    }
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="d-flex justify-content-between p-3 bg-light">
          <h3 className="fw-bold">Landing Page</h3>
          <div className="d-flex">
            <div className="px-2">
              <AdminLandingCardAdd onSuccess={refreshData} />
            </div>
            <div className="px-2">
              <button
                onClick={PublishLandingCards}
                type="button"
                className="btn btn-sm btn-danger"
              >
                Publish
              </button>
            </div>
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

              <div className="col-md-10 col-12 px-1 position-relative">
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
                      <div className="d-flex flex-column">
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
                              onSuccess={refreshData}
                            />
                          </button>
                          <button
                            type="button"
                            className="btn link-danger ms-2"
                            style={{
                              width: "fit-content",
                              height: "fit-content",
                            }}
                          >
                            <DeleteModel
                              className={"text-light"}
                              onSuccess={refreshData}
                              path={`/landingpage2/${card.id}`}
                            />
                          </button>
                        </div>
                        <div className="text-start w-25 py-2">
                          <img
                            src={`${ImgUrl}${card.image_path}`}
                            alt="cardImg"
                            className="img-fluid rounded-circle"
                          />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="card-title">{card.name}</h6>
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
                <div className="card text-start p-4 py-3">
                  <h3 className="input-title fw-bold">Enroll Now</h3>
                  <div className="py-3">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      type="fullName"
                      className={`form-control ${
                        formik.touched.fullName && formik.errors.fullName
                          ? "is-invalid"
                          : ""
                      }`}
                      style={{ borderRadius: "3px" }}
                      placeholder="Enter fullName"
                      {...formik.getFieldProps("fullName")}
                    />
                    {formik.touched.fullName && formik.errors.fullName && (
                      <div className="invalid-feedback">
                        {formik.errors.fullName}
                      </div>
                    )}
                  </div>
                  <div className="py-3">
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <input
                      type="mobileNumber"
                      className={`form-control ${
                        formik.touched.mobileNumber &&
                        formik.errors.mobileNumber
                          ? "is-invalid"
                          : ""
                      }`}
                      style={{ borderRadius: "3px" }}
                      placeholder="Enter mobileNumber"
                      {...formik.getFieldProps("mobileNumber")}
                    />
                    {formik.touched.mobileNumber &&
                      formik.errors.mobileNumber && (
                        <div className="invalid-feedback">
                          {formik.errors.mobileNumber}
                        </div>
                      )}
                  </div>
                  <div className="py-3">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className={`form-control ${
                        formik.touched.email && formik.errors.email
                          ? "is-invalid"
                          : ""
                      }`}
                      style={{ borderRadius: "3px" }}
                      placeholder="Enter email"
                      {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="invalid-feedback">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>
                  <div className="float-end">
                    <button type="submit" className="enrollbtn">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default AdminLandingPage2;
