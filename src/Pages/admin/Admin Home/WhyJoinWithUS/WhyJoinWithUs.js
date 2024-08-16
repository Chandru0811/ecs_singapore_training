import React, { useState, useEffect } from "react";
import DeleteModel from "../../../../components/DeleteModel";
import api from "../../../../config/BaseUrl";
import ImageURL from "../../../../config/ImageURL";
import AddWhyJoinWithUs from "./AddWhyJoinWithUs";
import toast from "react-hot-toast";
import EditWhyJoinWithUs from "./EditWhyJoinWithUs";

function WhyJoinWithUs() {
  const [datas, setDatas] = useState([]);
  const [loader, setLoader] = useState(true);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const getData = async () => {
    setLoader(true);
    try {
      const response = await api.get("homesection2");
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

  const handlePublish = async () => {
    setLoadIndicator(true);
    try {
      const response = await api.post("publish/homesection2");
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      getData();
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    } finally {
      setLoadIndicator(false);
    }
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
        <section>
          <div className="card-header d-flex align-items-center justify-content-between p-2 bg-light">
            <h3 className="fw-bold">Why Join With Us</h3>
            <div>
              <AddWhyJoinWithUs onSuccess={getData} />
              <button
                className="btn btn-danger mx-2"
                onClick={handlePublish}
                disabled={loadIndicator}
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
          <div className="container-fluid whyjoinus mb-5">
            <div className="row">
              {datas.map((data) => (
                <div key={data.id} className="col-md-4 mt-5 mb-3">
                  <div className="card h-100">
                    <div className="card-body text-start">
                      <div className="d-flex justify-content-between">
                        <EditWhyJoinWithUs id={data.id} onSuccess={getData} />
                        <DeleteModel
                          className="text-danger"
                          onSuccess={getData}
                          path={`homesection2/${data.id}`}
                        />
                      </div>
                      <div className="d-flex align-items-center">
                        <img
                          src={`${ImageURL}${data.image_path}`}
                          alt={data.image_path}
                          style={{ width: "10%", height: "10%" }}
                        />
                        <p className="ms-2 fw-bold fs-5 pt-2">{data.title}</p>
                      </div>
                      <p className="text-start subpara paraContent mt-2">
                        {data.description}
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

export default WhyJoinWithUs;
