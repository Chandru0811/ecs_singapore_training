import React, { useRef, useEffect, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { FaEdit, FaEye, FaTimes, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const tableData = [
  {
    id: 1,
    course: "test",
    title: "Java",
    description: "Full Stack Master Programme",
  },
  {
    id: 2,
    course: "test",
    title: "Python",
    description: "Data Science Programme",
  },
  {
    id: 3,
    course: "test",
    title: "JavaScript",
    description: "Web Development Programme",
  },
];
const Course = () => {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    $(tableRef.current).DataTable({
      responsive: true,
    });
    return () => {
      destroyDataTable();
    };
  }, [loading]);

  const destroyDataTable = () => {
    const table = $(tableRef.current).DataTable();
    if (table && $.fn.DataTable.isDataTable(tableRef.current)) {
      table.destroy();
    }
  };
  return (
    <div className="container-fluid shadow px-0 ">
      <div className="card-header d-flex align-items-center p-2 bg-light">
        <h3 className="fw-bold">Course</h3>
        <div className="container-fluid d-flex justify-content-end">
          <Link to={"/courseadd"}>
          <button className="btn btn-primary">Add</button>
        </Link>
          <button className="btn btn-sm btn-danger mx-2">Publish</button>
        </div>
      </div>
      <div>
        <div className="table-responsive p-2">
          <table ref={tableRef} className="display">
            <thead className="thead-light">
              <tr className="text-start">
                <th
                  scope="col"
                  className="text-center"
                  style={{ whiteSpace: "nowrap" }}
                >
                  S.NO
                </th>
                <th scope="col">Course</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col" className="text-center">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((data, index) => (
                <tr key={data.id} className="text-start">
                  <td className="text-center">{index + 1}</td>
                  <td>
                    {"test"}
                  </td>
                  <td>{data.title}</td>
                  <td>{data.description}</td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <Link to={"/courseView"}> 
                     <button className="btn btn-light border-2 btn-sm mx-1">
                        <FaEye />
                      </button></Link>
                      <Link to={"/courseEdit"}> <button className="btn btn-light border-2 btn-sm mx-1">
                        <FaEdit  />
                      </button></Link>
                      <button className="btn btn-light border-2 btn-sm mx-1">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Course;
