import React from "react";
import AsianStudent from "../../../assets/client/About-Aisian-student-scaled.jpeg";
import { TbMessage2Exclamation } from "react-icons/tb";

function Section2() {
  return (
    <section>
        {/* Accordion */}
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
              <div
                className="accordion-item mb-3"
                style={{ paddingLeft: "10px" }}
              >
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                  >
                    Lorem Ipsum is simply dummy text of the prin....?
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body text-start">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,
                  </div>
                </div>
              </div>
              <div
                className="accordion-item mb-3"
                style={{ paddingLeft: "10px" }}
              >
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Lorem Ipsum is simply dummy text of the prin....?
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body text-start">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,
                  </div>
                </div>
              </div>
              <div
                className="accordion-item mb-3"
                style={{ paddingLeft: "10px" }}
              >
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Lorem Ipsum is simply dummy text of the prin....?
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body text-start">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,{" "}
                  </div>
                </div>
              </div>
              <div
                className="accordion-item mb-3"
                style={{ paddingLeft: "10px" }}
              >
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    Lorem Ipsum is simply dummy text of the prin....?
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body text-start">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,{" "}
                  </div>
                </div>
              </div>
              <div
                className="accordion-item mb-3"
                style={{ paddingLeft: "10px" }}
              >
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                  >
                    Lorem Ipsum is simply dummy text of the prin....?
                  </button>
                </h2>
                <div
                  id="collapseFive"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body text-start">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section2;
