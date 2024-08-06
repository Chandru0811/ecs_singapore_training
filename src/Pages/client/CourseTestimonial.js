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
  const displayCards = showAll ? datas : datas.slice(0,8);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items center py-2">
        <h4 className="text-start">Review for Master Program</h4>
        <button className="btn btn-sm btn-primary" onClick={toggleView}>{showAll ? 'Show Less' : 'Show More'}</button>
      </div>
      <div className="card">
        <div className="d-flex align-items-center justify-content-center">
          <h5 className="fw-bold py-2">Big Date Master Program</h5>
          &nbsp;&nbsp;
          <div>
            <span>$3942</span>&nbsp;
            <span>
              <del className="text-muted">$232</del>
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9 col-12"></div>
          <div className="col-md-3 col-12">
            <div className="row">
              <div className="col-6">
                <div className="text-start fw-bold ps-1">
                  <p>Training Mode :</p>
                  <p>Skill Levels :</p>
                  <p>Total Learners :</p>
                </div>
              </div>
              <div className="col-6">
                <div className="text-start fw-light">
                  <p>Online | classroom</p>
                  <p>Expert</p>
                  <p>2352 Learners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          {displayCards.map((data) => (
            <div key={data.id} className="col-lg-3 col-md-6 col-sm-12 p-4">
              <div className="review-cards h-100">
                <div className="d-flex justify-content-between align-items-center header bg-primary text-light p-2">
                  <div className="d-flex justify-content-start align-items-center">
                    <div className=" p-1">
                      <img
                        src={`${ImageURL}${data.profile_path}`}
                        alt="avatar"
                        className="img-fluid rounded-circle"
                      />
                    </div>
                    &nbsp;
                    <div className="name ml-2">
                      <h6 className="mb-0">{data.client_name}</h6>
                    </div>
                  </div>
                  <div className="rating d-flex">
                    <p className="mb-0">Rating </p>&nbsp;
                    <p>
                      <span className="rating-review">
                        {data.rating} <IoIosStar style={{ color: "gold" }} />
                      </span>
                    </p>
                  </div>
                </div>
                <div className="card-body p-3 text-start text-muted">
                  {data.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseTestimonial;
