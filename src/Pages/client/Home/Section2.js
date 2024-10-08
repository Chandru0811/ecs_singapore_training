import React, { useEffect, useState } from "react";
import api from "../../../config/BaseUrl";
import ImageURL from "../../../config/ImageURL";

function Section2() {
  const [datas, setDatas] = useState([]);
  const [showAll, setShowALL] = useState(false);
  const [loader, setLoader] = useState(true);

  const getData = async () => {
    setLoader(true);
    try {
      const response = await api.get("joinwithus");
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

  const toggleView = () => {
    setShowALL((prve) => !prve);
  };
  const displayCards = showAll ? datas : datas.slice(0, 6);

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
          <div className="whyjoinus mb-5">
            <div className="d-flex justify-content-between align-items center mb-4">
              <div>
                <h1 className="secondheading text-start mb-3">
                  Why Join with Us
                </h1>
              </div>
              <div>
                {datas.length > 8 && (
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={toggleView}
                  >
                    {showAll ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>
            </div>
            <div className="row">
              {displayCards.map((data) => (
                <div key={data.id} className="col-md-4 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <img
                          src={`${ImageURL}${data?.image_path}`}
                          alt={data?.image_path}
                          style={{ width: "10%", height: "10%" }}
                        />
                        <p className="pt-2 mx-2 fw-bold fs-5">{data?.title}</p>
                      </div>
                      <p className="text-start subpara paraContent mt-2">
                        {data?.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Section2;
