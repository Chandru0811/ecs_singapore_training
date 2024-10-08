import React, { useEffect, useState } from "react";
import { IoIosStar } from "react-icons/io";
import api from "../../config/BaseUrl";
import ImageURL from "../../config/ImageURL";

function CourseTestimonial() {
  const [datas, setDatas] = useState([]);
  const [showAll, setShowALL] = useState(false);

  const fetchDatas = async () => {
    try {
      const response = await api.get("course/testimonial");
      setDatas(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  const toggleView = () => {
    setShowALL((prve) => !prve);
  };
  const displayCards = showAll ? datas : datas.slice(0, 8);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items center py-2">
        <h4 className="text-start">Review for Master Program</h4>
        {datas.length > 8 && (
          <button className="btn btn-sm btn-primary" onClick={toggleView}>
            {showAll ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
      <div className="card">
        <div className="d-flex align-items-center justify-content-center">
          <h5 className="fw-bold py-2">Big Date Master Program</h5>
          &nbsp;&nbsp;
          <div className="d-flex align-items-center justify-content-center">
            <h5 className="fw-bold" style={{ color: "#118aef" }}>
              $3942
            </h5>
            &nbsp;
            <h6>
              {" "}
              <del className="text-muted">$232</del>
            </h6>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9 col-12"></div>
          <div className="col-md-3 col-12">
            <div className="row">
              <div className="col-6">
                <div className="text-end fw-bold ps-1">
                  <p className="mb-1">Training Mode :</p>
                  <p className="mb-1">Skill Levels :</p>
                  <p className="mb-1">Total Learners :</p>
                </div>
              </div>
              <div className="col-6">
                <div className="text-start fw-light">
                  <p className="mb-1">Online | classroom</p>
                  <p className="mb-1">Expert</p>
                  <p className="mb-1">2352 Learners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          {displayCards && displayCards.length > 0 ? (
            displayCards.map((data) => (
              <div key={data.id} className="col-lg-3 col-md-6 col-sm-12 p-4">
                <div className="h-100 course-cards">
                  <div className="card-header head-content">
                    <div className="row">
                      <div
                        className="col-md-9 col-12"
                        style={{ minHeight: "70px" }}
                      >
                        <div className="d-flex align-items-center p-1">
                          <img
                            className="img-fluid rounded-circle"
                            src={`${ImageURL}${data.profile_path}`}
                            alt="image"
                            style={{ width: "30%", height: "30%" }}
                          />
                          <p className="text-light fw-bold ps-1 text-start">
                            {data.client_name}
                          </p>
                        </div>
                      </div>
                      {/* <div className="col-md-3 col-12">
                        <div className="d-flex align-items-center">
                          <span
                            className="ms-2 rounded text-light fw-light px-1"
                            style={{ border: "2px solid #fff" }}
                          >
                            {data.rating}
                            <IoIosStar size={18} style={{ color: "white" }} />
                          </span>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-secondary text-start">
                      {data.description}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="container-fluid p-5">
              <div className="row">
                <div className="col-12 text-center">
                  <h3>Review master program unavailable</h3>
                  <p>
                    We are working to add new Review for master program in this
                    section. Please check back later.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseTestimonial;
