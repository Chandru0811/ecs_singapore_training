import React, { useEffect, useState } from "react";
import { IoIosStar } from "react-icons/io";
import api from "../../../config/BaseUrl";
import toast from "react-hot-toast";
import AdminTestimonialAdd from "./AdminTestimonialAdd";
import AdminTestimonialEdit from "./AdminTestimonialEdit";
import DeleteModel from "../../../components/DeleteModel";
import ImageURL from "../../../config/ImageURL";

function AdminTestimonial({ onSuccess }) {
  const [loader, setLoader] = useState(true);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [datas, setDatas] = useState([]);

  const getData = async () => {
    setLoader(true);
    try {
      const response = await api.get("testimonial");
      setDatas(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const PublishTestimonial = async () => {
    setLoadIndicator(true);
    try {
      const response = await api.post("publish/testimonial", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        console.log("Published successfully!");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Error publishing contact data", error);
    } finally {
      setLoadIndicator(false);
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
    <>
      {loader ? (
        <section class="dots-container">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </section>
      ) : (
        <div>
          <div className="d-flex justify-content-between p-2 bg-light">
            <h3 className="fw-bold">Testimonials</h3>
            <div className="d-flex">
              <AdminTestimonialAdd onSuccess={getData} />
              <button
                type="submit"
                className="btn btn-danger mx-2"
                disabled={loadIndicator}
                onClick={PublishTestimonial}
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
                      <AdminTestimonialEdit id={data.id} onSuccess={getData} />
                    </button>
                    <DeleteModel
                      className="text-danger"
                      onSuccess={getData}
                      path={`/testimonial/${data.id}`}
                    />
                  </div>
                  <div className="card-body text-start">
                    <div className="d-flex align-items-center">
                      <div className="w-25 h-25 fit-content">
                        <img
                          className="img-fluid rounded-circle p-2"
                          src={`${ImageURL}${data.image_path}`}
                          alt="Admin Testimonial"
                          style={{ width: "70%", height: "70%" }}
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
        </div>
      )}
    </>
  );
}

export default AdminTestimonial;
