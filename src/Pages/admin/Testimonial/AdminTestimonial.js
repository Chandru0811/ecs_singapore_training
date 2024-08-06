import React, { useEffect, useState } from "react";
import { IoIosStar } from "react-icons/io";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/BaseUrl";
import toast from "react-hot-toast";
import AdminTestimonialAdd from "./AdminTestimonialAdd";
import AdminTestimonialEdit from "./AdminTestimonialEdit";
import DeleteModel from "../../../components/DeleteModel";
import ImageURL from "../../../config/ImageURL";

function AdminTestimonial({ onSuccess }) {
  const [loading, setLoading] = useState(true);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("testimonial");
        setDatas(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    getData();
  }, []);

  // Form Validation
  const validationSchema = Yup.object({
    client_name: Yup.string().required("*Client Name is required"),
    designation: Yup.string().required("*Designation is required"),
    title: Yup.string().required("*Title is required"),
    description: Yup.string().required("*Description is required"),
    image: Yup.mixed().required("Image is required"),
  });

  const formik = useFormik({
    initialValues: {
      client_name: "",
      designation: "",
      title: "",
      description: "",
      image: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const formData = new FormData();
        formData.append("client_name", values.client_name);
        formData.append("designation", values.designation);
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("image", values.image);

        const response = await api.post("testimonial", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          onSuccess();
          handleClose();
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage);
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  const refreshData = async () => {
    setLoading(true);
    try {
      const response = await api.get("testimonial");
      setDatas(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error refreshing data:", error);
      setLoading(false);
    }
  };

  const [show, setShow] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleClose = () => {
    setShow(false);
    setSelectedCard(null);
    formik.resetForm();
  };

  const PublishTestimonial = async () => {
    try {
      const response = await api.post("publish/testimonial", {
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

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <IoIosStar
          key={i}
          size={24}
          style={{ color: i < rating ? "#ffd700" : "#e4e5e9" }}
        />
      );
    }
    return stars;
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="d-flex justify-content-between p-2 bg-light">
          <h3 className="fw-bold">Testimonials</h3>
          <div className="d-flex">
            <AdminTestimonialAdd onSuccess={refreshData} />
            <button
              onClick={PublishTestimonial}
              type="button"
              className="btn btn-sm btn-danger mx-2"
            >
              Publish
            </button>
          </div>
        </div>
        <div className="row m-0 p-3">
          {datas.map((data) => (
            <div key={data.id} className="col-md-4 col-12 p-2 ">
              <div className="card h-100">
                <div className="d-flex justify-content-between align-items-start p-2">
                  <button
                    type="button"
                    className="btn link-light ms-2"
                    style={{
                      width: "fit-content",
                      height: "fit-content",
                    }}
                  >
                    <AdminTestimonialEdit
                      id={data.id}
                      onSuccess={refreshData}
                    />
                  </button>
                  <button
                    type="button"
                    className="btn link-light ms-2"
                    style={{
                      width: "fit-content",
                      height: "fit-content",
                    }}
                  >
                    <DeleteModel
                      onSuccess={refreshData}
                      path={`/testimonial/${data.id}`}
                    />
                  </button>
                </div>
                <div className="card-body text-start">
                  <div className="d-flex align-items-center">
                    <div className="w-25 h-25 fit-content">
                      <img
                        className="img-fluid rounded-circle p-2"
                        src={`${ImageURL}${data.image_path}`}
                        alt="Admin Testimonial"
                      />
                    </div>
                    <div>
                      <h5 className="card-title">{data.client_name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {data.designation}
                      </h6>
                      <div>{renderStars(data.rating)}</div>
                    </div>
                  </div>
                  <div className="p-2">
                    <h5>{data.title}</h5>
                    <p className="card-text">{data.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default AdminTestimonial;
