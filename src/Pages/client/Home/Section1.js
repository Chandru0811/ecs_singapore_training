import React, { useEffect, useState } from "react";
import api from "../../../config/BaseUrl";
import ImageURL from "../../../config/ImageURL";
import Star from "../../../assets/client/starimg.png";
// import HomeImg from "../../../assets/client/homeImg.png";
import BookImg from "../../../assets/client/bookImg.png";
import Duration from "../../../assets/client/durationImg.png";
import CourseDuration from "../../../assets/client/nextCourseImg.png";

function Section1() {
  const [apiData, setApiData] = useState({});
  const [loader, setLoader] = useState(true);

  const getData = async () => {
    setLoader(true);
    try {
      const response = await api.get("homesection1");
      setApiData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

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
        <section>
          <div className="row mt-3 mb-4">
            <div className="col-lg-7">
              <div className="d-flex  mb-3">
                <img
                  src={Star}
                  alt="homestar"
                  style={{ width: "30px", height: "30px" }}
                />
                <p className="subhead ml-2">Start Learning Today</p>
              </div>
              <div className="text-start">
                <h1 className="display-4 fw-bold">{apiData?.title}</h1>
                <p className="mt-4 paraContent">{apiData?.description}</p>
                <div className="mt-4">
                  <button type="button" className="btn btn-primary btn-lg mr-3">
                    Get Started
                  </button>
                  <button
                    type="button"
                    className="mx-2 btn btn-outline-primary btn-lg"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <img
                src={`${ImageURL}${apiData?.image_path}`}
                style={{ maxWidth: "100%", height: "auto" }}
                className="d-inline-block align-top"
                alt="ECS Training"
              />
            </div>
          </div>
          {/* Card */}
          <div className="card homeCard mb-5">
            <div className="card-body">
              <div className="row d-flex pt-3">
                <div className="col-md-4 d-flex justify-content-center">
                  <img
                    src={BookImg}
                    alt="BookImg"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <p className="mx-2">{apiData?.subcontent_1}</p>
                </div>
                <div className="col-md-4 d-flex justify-content-center">
                  <img
                    src={Duration}
                    alt="DurationImg"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <p>{apiData?.subcontent_2}</p>
                </div>
                <div className="col-md-4 d-flex justify-content-center">
                  <img
                    src={CourseDuration}
                    alt="CourseImg"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <p className="mx-2">{apiData?.subcontent_3}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Section1;
