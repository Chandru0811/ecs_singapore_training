import React, { useEffect, useState } from "react";
import ContactUs from "../../../assets/client/phoneImg.png";
import CirclePoints from "../../../assets/client/circlePoint.png";
import api from "../../../config/BaseUrl";

function Section5() {
  const [apiData, setApiData] = useState({});
  const [loader, setLoader] = useState(true);

  const getData = async () => {
    setLoader(true);
    try {
      const response = await api.get("homesection3");
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
          <div className="trainingOverview mt-3">
            <div className="row d-flex">
              <h1 className="secondheading text-start mb-3">
                {apiData?.title}
              </h1>
              <div className="col-md-8">
                <p className="text-start paraContent">{apiData?.description}</p>
              </div>
              <div className="col-md-4 card p-4">
                <div className="row d-flex">
                  <div className="col-md-8">
                    <p>CONTACT US</p>
                    <h3>{apiData?.contact_no}</h3>
                    <p>Toll Free No</p>
                  </div>
                  <div className="col-md-4 pt-4">
                    <img
                      src={ContactUs}
                      alt="ContactImg"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* {/ Points   /} */}
            <div className="PointsSection py-4">
              <div className="points-container row">
                {apiData?.key_points &&
                  apiData.key_points.map((point, index) => (
                    <div
                      className="point-item col-md-3 mb-3 d-flex align-items-center"
                      key={index}
                    >
                      <img
                        src={CirclePoints}
                        alt="circleImg"
                        style={{ width: "30px", height: "30px" }}
                      />
                      <span className="mx-2 point-text">{point}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Section5;
