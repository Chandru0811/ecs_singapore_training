import React, { useState, useEffect } from "react";
import AsianStudent from "../../../assets/client/About-Aisian-student-scaled.jpeg";
import { TbMessage2Exclamation } from "react-icons/tb";
import api from "../../../config/BaseUrl";

function Section2() {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true); // Initial state to true

  const fetchDatas = async () => {
    try {
      const response = await api.get("about");
      setDatas(response.data.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  return (
    <section>
      <div className="container mb-4">
        <div className="row">
          <div className="col-md-6 col-12 mb-3 d-flex align-items-center justify-content-center">
            <div className="imgDesign">
              <img src={AsianStudent} alt="img" className="img-fluid"></img>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="d-flex text-start">
              <div className="d-flex align-items-center justify-content-center">
                <div
                  className="p-1 mx-2 mb-3"
                  style={{ backgroundColor: "#ec9fc2", borderRadius: "5px" }}
                >
                  <TbMessage2Exclamation color="#AA205E" size={30} />
                </div>
                <p className="fw-medium">FAQ Question</p>
              </div>
            </div>
            <div className="text-start">
              <h3 className="fw-bold mb-3">Frequently Asked Questions</h3>
            </div>
            <div className="accordion" id="accordionExample">
              {loading ? (
                <div>Loading...</div>
              ) : (
                datas.faq &&
                datas.faq.map((faq, index) => (
                  <div
                    className="accordion-item mb-3"
                    style={{ paddingLeft: "10px" }}
                    key={index}
                  >
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${index}`}
                        aria-expanded="false"
                        aria-controls={`collapse${index}`}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div
                      id={`collapse${index}`}
                      className="accordion-collapse collapse show"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body text-start">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section2;
