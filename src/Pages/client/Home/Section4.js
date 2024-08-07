import React from "react";
import SunIcon from "../../../assets/client/pointsImg.png";

function Section4() {

    const coursesData = [
        {
          title: "Programming Languages",
          items: ["Python", "Java", "JavaScript", "C++", "Ruby"],
          icon: SunIcon,
        },
        {
          title: "Web Development",
          items: [
            "Full-Stack Web Development",
            "Front-End Development",
            "Back-End Development",
          ],
          icon: SunIcon,
        },
        {
          title: "Mobile App Development",
          items: [
            "Android Development:",
            "iOS Development",
            "Cross-Platform Development",
          ],
          icon: SunIcon,
        },
        {
          title: "Data Science and ML",
          items: [
            "Android Development:",
            "iOS Development",
            "Cross-Platform Development",
          ],
          icon: SunIcon,
        },
        {
          title: "Cloud Computing and DevOps",
          items: ["Cloud Fundamentals", "DevOps Essentials", "AWS Certification"],
          icon: SunIcon,
        },
        {
          title: "Cybersecurity",
          items: [
            "Cybersecurity Fundamentals",
            "Ethical Hacking and Penetration Testing",
            "Secure Coding Practices",
          ],
          icon: SunIcon,
        },
      ];

  return (
    <section>
      <div className="Courses mt-3">
        <h1 className="secondheading text-start mb-3">10+ Courses</h1>
        <div className="row">
          {coursesData.map((course, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card" style={{ height: "250px" }}>
                <h5 className="card-header text-center">{course.title}</h5>
                <div className="card-body">
                  {course.items ? (
                    <ul className="list-unstyled">
                      {course.items.map((item, i) => (
                        <li key={i} className="d-flex align-items-center mb-2">
                          <img
                            src={course.icon}
                            alt="icon"
                            style={{ width: "20px", height: "20px" }}
                            className="mr-2"
                          />
                          <span className="mx-2">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>
                      <div className="d-flex align-items-center mb-2">
                        <img
                          src={course.icon}
                          alt="cardImg"
                          style={{ width: "30px", height: "30px" }}
                        />
                        <p className="pt-2 mx-2">
                          <b>{course.title}</b>
                        </p>
                      </div>
                      <p className="text-start">{course.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Section4;
