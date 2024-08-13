import React, { useEffect, useState } from "react";
import SunIcon from "../../../assets/client/pointsImg.png";
import api from "../../../config/BaseUrl";

function Section4() {
  const [coursesData, setCourseData] = useState([]);

  useEffect(() => {
    const getCourseData = async () => {
      try {
        const response = await api.get("home/courses");

        const formattedCourses = response.data.data.map((category) => ({
          title: category.title,
          items: category.courses.map((course) => course.title),
          icon: category.logo_path,
        }));

        setCourseData(formattedCourses);
        //  console.log(formattedCourses);
      } catch (e) {
        console.error("Failed to fetch courses", e);
      }
    };

    getCourseData();
  }, []);

  return (
    <section>
      <div className="Courses mt-3">
        <h1 className="secondheading text-start mb-3">10+ Courses</h1>
        <div className="row">
          {coursesData && coursesData.map((course, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card" style={{ minHeight: "250px" }}>
                <h5 className="card-header text-center">{course.title}</h5>
                <div className="card-body">
                  {course.items ? (
                    <ul className="list-unstyled">
                      {course?.items?.map((item, i) => (
                        <li key={i} className="d-flex align-items-center mb-2">
                          <img
                            src={SunIcon}
                            alt="icon"
                            style={{ width: "25px", height: "20px" }}
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
