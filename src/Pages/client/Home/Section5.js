import React from "react";
import ContactUs from "../../../assets/client/phoneImg.png";
import CirclePoints from "../../../assets/client/circlePoint.png";

function Section5() {
  const pointsData = [
    "Comprehensive ECS Solutions",
    "Certified Professional",
    "Advanced Security and Compliance",
    "Expert Team",
    "Performance Optimization",
    "Certified Professional",
    "Seamless Integration and Automation",
    "24/7 Support",
  ];

  return (
    <section>
      <div className="trainingOverview mt-3">
        <div className="row d-flex">
          <h1 className="secondheading text-start mb-3">
            Cloud Ecs Training Overview
          </h1>
          <div className="col-md-8">
            <p className="text-start paraContent">
              Welcome to our comprehensive Cloud ECS (Elastic Container Service)
              Training Program! This course is designed to equip you with the
              essential knowledge and skills needed to effectively manage and
              deploy containerized applications using ECS, one of the most
              powerful container orchestration services available today.
            </p>
          </div>
          <div className="col-md-4 card p-4">
            <div className="row d-flex">
              <div className="col-md-8">
                <p>CONTACT US</p>
                <h3>1800-212-7688</h3>
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
            {pointsData.map((point, index) => (
              <div className="point-item col-md-3 mb-3" key={index}>
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
  );
}

export default Section5;
