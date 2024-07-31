import React from "react";
import { Link } from "react-router-dom";

const Course = () => {
  return (
    <div className="container-fluid shadow py-2">
      <div className="row">
        <Link to={"/courseadd"}>
          <button className="btn btn-primary">Add</button>
        </Link>
      </div>
    </div>
  );
};

export default Course;
